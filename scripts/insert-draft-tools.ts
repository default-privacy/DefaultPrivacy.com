#!/usr/bin/env bun
/**
 * Insert new directory tools from a new-tools-draft-*.json file.
 *
 * Writes the tool row and its category links only. Sources and caveats are a
 * second step: scripts/load-claims.ts --draft <same file>. Tag links (badges)
 * are a third: scripts/backfill-tool-tag-links.ts.
 *
 *   DRY RUN (default):  bun run scripts/insert-draft-tools.ts --draft <file> [slug...]
 *   APPLY:              ... --apply              rows land as status Draft (hidden)
 *   PUBLISH:            ... --apply --publish    rows land as Published
 *
 *   UPDATE existing:    ... --update [--apply]   rewrite fields of rows that already exist
 *
 * A row is skipped when its slug or website URL already exists, or a category
 * slug is unknown. With --update, only existing rows (matched by slug) are touched;
 * a null in the draft never blanks a filled column, and categories and status are left alone.
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- drizzle query builders differ between neon-http and postgres-js */
import { readFileSync } from "node:fs"
import { eq, inArray, or } from "drizzle-orm"
import { categories, db, tools, toolsToCategories } from "@/lib/db"

const args = process.argv.slice(2)
const APPLY = args.includes("--apply")
const PUBLISH = args.includes("--publish")
const draftIdx = args.indexOf("--draft")
const draftFile = draftIdx >= 0 ? args[draftIdx + 1] : undefined
const onlySlugs = args.filter((a, i) => !a.startsWith("--") && i !== draftIdx + 1)
if (!draftFile) throw new Error("Pass --draft <new-tools-draft-*.json>")

const isNeon = process.env.DATABASE_URL?.includes("neon.tech")

const FIELDS = [
  "name", "slug", "websiteUrl", "tagline", "description", "content", "faviconUrl", "githubUrl", "subreddit",
  "contentType", "isAffiliated", "affiliateUrl", "jurisdiction", "logsIp", "logsMetadata", "e2ee", "zeroKnowledge",
  "requiresEmail", "requiresPhone", "requiresRealName", "hasFreeTier", "acceptsCrypto", "isNoKyc",
  "isOpenSource", "isSecurityAudited", "auditor", "auditUrl", "platforms",
] as const

const raw = JSON.parse(readFileSync(draftFile, "utf8"))
const rows: Record<string, any>[] = (Array.isArray(raw) ? raw : [raw]).filter(
  (r) => !onlySlugs.length || onlySlugs.includes(r.slug),
)

const catSlugs = [...new Set(rows.flatMap((r) => r.categories ?? []))] as string[]
const catRows = catSlugs.length ? await db.select().from(categories).where(inArray(categories.slug, catSlugs)) : []
const catBySlug = new Map(catRows.map((c) => [c.slug, c.id]))

const UPDATE = args.includes("--update")
console.log(`${APPLY ? "APPLY" : "DRY RUN"} · ${isNeon ? "Neon" : "local"} · ${UPDATE ? "update existing" : `insert, status ${PUBLISH ? "Published" : "Draft"}`} · ${rows.length} row(s)`)
let failed = 0

const same = (a: unknown, b: unknown) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null)

if (UPDATE) {
  for (const r of rows) {
    const [cur] = await db.select().from(tools).where(eq(tools.slug, r.slug))
    if (!cur) {
      console.log(`  NO TOOL  ${r.slug}`)
      failed++
      continue
    }
    const set: Record<string, any> = {}
    for (const f of FIELDS) {
      if (f === "slug" || r[f] === undefined) continue
      const was = (cur as any)[f]
      if (r[f] === null && was !== null) {
        console.log(`  KEEP     ${r.slug}.${f}: draft is null, live is ${JSON.stringify(was)}`)
        continue
      }
      if (!same(r[f], was)) {
        set[f] = r[f]
        const show = (v: unknown) => JSON.stringify(v)?.slice(0, 90)
        console.log(`  CHANGE   ${r.slug}.${f}: ${show(was)} → ${show(r[f])}`)
      }
    }
    if (!Object.keys(set).length) {
      console.log(`  SAME     ${r.slug}`)
      continue
    }
    set.lastVerified = r.lastVerified ? new Date(r.lastVerified) : new Date()
    set.updatedAt = new Date()
    if (APPLY) await db.update(tools).set(set).where(eq(tools.slug, r.slug))
  }
  if (!APPLY) console.log("Dry run only. Re-run with --apply to write.")
  process.exit(failed ? 2 : 0)
}

for (const r of rows) {
  const clash = await db
    .select({ slug: tools.slug, websiteUrl: tools.websiteUrl })
    .from(tools)
    .where(or(eq(tools.slug, r.slug), eq(tools.websiteUrl, r.websiteUrl)))
  if (clash.length) {
    console.log(`  SKIP     ${r.slug}: already exists (${clash.map((c) => c.slug).join(", ")})`)
    continue
  }
  const missingCats = (r.categories ?? []).filter((c: string) => !catBySlug.has(c))
  if (!r.categories?.length || missingCats.length) {
    console.log(`  REFUSED  ${r.slug}: unknown or no category ${missingCats.join(", ")}`)
    failed++
    continue
  }

  const now = new Date()
  const values: Record<string, any> = { id: crypto.randomUUID() }
  for (const f of FIELDS) if (r[f] !== undefined) values[f] = r[f]
  if (r.auditDate) values.auditDate = new Date(r.auditDate)
  values.lastVerified = r.lastVerified ? new Date(r.lastVerified) : now
  values.status = PUBLISH ? "Published" : "Draft"
  if (PUBLISH) values.publishedAt = now

  const links = r.categories.map((c: string) => ({ toolId: values.id, categoryId: catBySlug.get(c)! }))
  console.log(`  INSERT   ${r.slug} → ${r.categories.join(", ")}`)
  if (!APPLY) continue

  const d = db as any
  if (isNeon) {
    await d.batch([d.insert(tools).values(values), d.insert(toolsToCategories).values(links)])
  } else {
    await d.transaction(async (tx: any) => {
      await tx.insert(tools).values(values)
      await tx.insert(toolsToCategories).values(links)
    })
  }
}

if (!APPLY) console.log("Dry run only. Re-run with --apply to write.")
process.exit(failed ? 2 : 0)
