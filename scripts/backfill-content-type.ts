#!/usr/bin/env bun
/**
 * Backfill tools.content_type from VETTED content/org categories (N16).
 *
 * Non-tool entries (awesome-lists, books, guides, podcasts, channels, courses, orgs)
 * live in the `tools` table and were ranking in the agent feed as if they were products.
 * This marks them by CATEGORY so the feed (searchPublicToolsPp) can exclude them.
 *
 * WHY category, not keyword (THE TRAP): a keyword sweep false-positives real apps
 * ("eBook Readers" matches "book", "RSS & News Readers" matches "read/news",
 * "Documents" = dangerzone/libreoffice are real tools). The 8 categories below were
 * hand-reviewed and confirmed to hold ONLY content/orgs, and a contamination check
 * proved NONE of their rows also live in a genuine tool category — so marking them is
 * safe (no real tool gets hidden).
 *
 * Dry-run by default (prints every slug it would flip — the review gate). --apply writes.
 * Idempotent: only writes when the current value differs.
 *
 *   bun run scripts/backfill-content-type.ts           # dry-run report (review the slug list)
 *   bun run scripts/backfill-content-type.ts --apply    # write
 */
import { and, eq, inArray } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { categories, tools, toolsToCategories } from "../src/lib/db/schema"

const APPLY = process.argv.includes("--apply")

// VETTED content/org categories -> content_type. Hand-reviewed; excludes the false
// positives (eBook Readers, RSS & News Readers, Documents) which are real apps.
const CATEGORY_CONTENT_TYPE: Record<string, string> = {
  "Frameworks & Collections": "list",
  Books: "book",
  Guides: "guide",
  Podcasts: "podcast",
  Channels: "channel",
  Courses: "course",
  "Advocacy Groups": "org",
  "Policy & Research": "org",
  // "Host Block Lists": left as 'tool' — borderline (a block list is a usable resource).
}

// Hand-review rescues: genuine PRODUCTS miscategorized into an org category in the
// source data. Marking these 'org' would wrongly HIDE a real tool from the feed — the
// exact regression this whole approach guards against. Kept as 'tool'. (Caught by
// eyeballing the dry-run slug list, per N16's review-gate discipline.)
const KEEP_AS_TOOL = new Set<string>([
  "complianz", // WordPress cookie-consent solution — a product, not an advocacy group
  "source-point", // Sourcepoint — commercial consent-management platform
  "ownnothing-index", // AI ToS-scanning tool
])

async function run() {
  if (!isDatabaseConfigured) {
    console.error("❌ DATABASE_URL not configured")
    process.exit(1)
  }

  // Resolve category name -> id
  const wantedNames = Object.keys(CATEGORY_CONTENT_TYPE)
  const catRows = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(inArray(categories.name, wantedNames))

  const foundNames = new Set(catRows.map((c) => c.name))
  const missing = wantedNames.filter((n) => !foundNames.has(n))
  if (missing.length) {
    console.error(`❌ categories not found (name drift?): ${missing.join(", ")}`)
    process.exit(1)
  }
  const catIdToType = new Map(
    catRows.map((c) => [c.id, CATEGORY_CONTENT_TYPE[c.name]] as const),
  )

  // Published tools in those categories -> desired content_type.
  // If a tool appears in two flagged categories, first-seen wins (all are content, so
  // the exact label is cosmetic; the feed excludes on "!= tool" regardless).
  const links = await db
    .select({ toolId: toolsToCategories.toolId, categoryId: toolsToCategories.categoryId })
    .from(toolsToCategories)
    .innerJoin(tools, and(eq(tools.id, toolsToCategories.toolId), eq(tools.status, "Published")))
    .where(inArray(toolsToCategories.categoryId, Array.from(catIdToType.keys())))

  const desired = new Map<string, string>() // toolId -> content_type
  for (const l of links) {
    if (!desired.has(l.toolId)) desired.set(l.toolId, catIdToType.get(l.categoryId)!)
  }

  // Load current values to make it idempotent + printable
  const ids = Array.from(desired.keys())
  const current = await db
    .select({ id: tools.id, slug: tools.slug, contentType: tools.contentType })
    .from(tools)
    .where(inArray(tools.id, ids))
  const slugById = new Map(current.map((r) => [r.id, r.slug]))
  const curById = new Map(current.map((r) => [r.id, r.contentType]))

  // Apply hand-review rescues: drop miscategorized real tools from the write set.
  let rescued = 0
  for (const [id] of desired) {
    if (KEEP_AS_TOOL.has(slugById.get(id) ?? "")) {
      desired.delete(id)
      rescued++
    }
  }
  if (rescued) console.log(`ℹ️  rescued ${rescued} miscategorized tool(s) (kept as 'tool')`)

  // Group the writes we'd make, by target type, for a reviewable report
  const toWrite: { id: string; slug: string; from: string; to: string }[] = []
  for (const [id, to] of desired) {
    const from = curById.get(id) ?? "tool"
    if (from !== to) toWrite.push({ id, slug: slugById.get(id) ?? id, from, to })
  }

  console.log(`\n=== N16 content_type BACKFILL ${APPLY ? "(APPLY)" : "(DRY-RUN)"} ===`)
  console.log(`flagged published rows: ${desired.size}  |  needing a write: ${toWrite.length}\n`)

  const byType = new Map<string, string[]>()
  for (const w of toWrite) {
    if (!byType.has(w.to)) byType.set(w.to, [])
    byType.get(w.to)!.push(w.slug)
  }
  for (const [type, slugs] of byType) {
    console.log(`  ${type}  (${slugs.length}):`)
    console.log(`    ${slugs.sort().join(", ")}\n`)
  }

  if (!APPLY) {
    console.log("(dry-run — no writes. Review the slug list above, then re-run with --apply.)")
    process.exit(0)
  }

  let written = 0
  for (const w of toWrite) {
    await db.update(tools).set({ contentType: w.to, updatedAt: new Date() }).where(eq(tools.id, w.id))
    written++
  }
  console.log(`✅ wrote ${written} rows.`)
  process.exit(0)
}

run().catch((e) => {
  console.error("💥 backfill failed:", e)
  process.exit(1)
})
