/**
 * Load sourced claims into tool_claims.
 *
 * Two input shapes:
 *   research: <claims dir>/<slug>.json = {slug, checked, claims:[{attribute,value,sources,quote,note}], caveats:[{text,sources,quote}]}
 *   draft:    new-tools-draft-*.json = array of tool rows with `sources` (attribute to urls) and `caveats`
 *
 *   DRY RUN (default):  bun run scripts/load-claims.ts [--dir <claims dir>] [--draft <file>]... [slug...]
 *   APPLY:              ... --apply            one transaction per tool
 *   Also fix columns:   ... --apply --set-columns   (every sourced privacy field: e2ee, logsIp, logsMetadata,
 *                       zeroKnowledge, jurisdiction, requiresEmail/Phone/RealName, hasFreeTier, isOpenSource,
 *                       plus the retired gated flags). This is how a column cleared by the 2026-10-12
 *                       honesty pass gets a value again: only from a sourced claim, never by hand.
 *
 * A claim is skipped when its value disagrees with the tool column, unless --set-columns
 * (then the column is updated to the claim's value in the same transaction). Claims with a
 * null value (not checked) write no row. Claims with no source or a non-http(s) source are
 * refused. Exit code 2 if anything was refused. `quote` text from research files may be a
 * paraphrase, so it is stored as "Source says: ...", never as a quotation.
 */
/* eslint-disable @typescript-eslint/no-explicit-any -- drizzle query builders differ between neon-http and postgres-js */
import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { and, eq, inArray } from "drizzle-orm"
import { db, toolClaims, tools } from "@/lib/db"
import { getJurisdictionRisk } from "@/lib/privacy-protocol/jurisdiction"
import {
  convertDraftRow,
  convertResearchFile,
  GATED_ATTRIBUTES,
  valuesEqual,
  type ClaimInput,
  type ConvertResult,
} from "@/lib/claims"

// Research claim files live outside the repo; point at them with --dir or CLAIMS_DIR.
const DEFAULT_DIR = process.env.CLAIMS_DIR ?? ""
const SET_COLUMN_ATTRS = new Set([
  "e2ee", "logsIp", "logsMetadata", "zeroKnowledge", "jurisdiction",
  "requiresEmail", "requiresPhone", "requiresRealName", "hasFreeTier",
  "isOpenSource", "acceptsCrypto", "isNoKyc", "isSecurityAudited",
])

const args = process.argv.slice(2)
const APPLY = args.includes("--apply")
const SET_COLUMNS = args.includes("--set-columns")
const flagValues = (flag: string) => args.flatMap((a, i) => (a === flag ? [args[i + 1]] : []))
const drafts = flagValues("--draft")
const dirs = flagValues("--dir")
const valueArgs = new Set([...drafts, ...dirs])
const onlySlugs = args.filter((a) => !a.startsWith("--") && !valueArgs.has(a))

const isNeon = process.env.DATABASE_URL?.includes("neon.tech")

/** Run write queries atomically: db.batch on neon-http (no interactive tx), db.transaction on postgres-js. */
async function atomic(build: (d: any) => any[]) {
  const d = db as any
  if (isNeon) {
    const qs = build(d)
    if (qs.length) await d.batch(qs)
  } else {
    await d.transaction(async (tx: any) => {
      for (const q of build(tx)) await q
    })
  }
}

function loadInputs(): ConvertResult[] {
  const out: ConvertResult[] = []
  const researchDirs = dirs.length || !drafts.length ? (dirs.length ? dirs : [DEFAULT_DIR]) : []
  if (researchDirs.includes("")) throw new Error("No claims directory: pass --dir <path> or set CLAIMS_DIR.")
  for (const dir of researchDirs) {
    for (const f of readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("_")).sort()) {
      try {
        out.push(convertResearchFile(JSON.parse(readFileSync(path.join(dir, f), "utf8"))))
      } catch (e) {
        out.push({ slug: f, claims: [], unchecked: [], refused: [{ what: f, reason: `unreadable: ${(e as Error).message}` }], hasCaveats: false })
      }
    }
  }
  for (const file of drafts) {
    for (const row of JSON.parse(readFileSync(file, "utf8")) as Record<string, unknown>[]) out.push(convertDraftRow(row))
  }
  return onlySlugs.length ? out.filter((r) => onlySlugs.includes(r.slug)) : out
}

const dateOrNull = (s?: string | null) => (s ? new Date(s) : null)

async function main() {
  const inputs = loadInputs()
  console.log(`${APPLY ? "APPLY" : "DRY RUN"}${SET_COLUMNS ? " + set-columns" : ""}: ${inputs.length} input file(s)/row(s)\n`)

  const slugs = inputs.map((i) => i.slug)
  const toolRows = slugs.length ? await db.select().from(tools).where(inArray(tools.slug, slugs)) : []
  const bySlug = new Map(toolRows.map((t) => [t.slug, t]))
  const existing = toolRows.length
    ? await db.select().from(toolClaims).where(inArray(toolClaims.toolId, toolRows.map((t) => t.id)))
    : []

  const stats = { tools: 0, written: 0, unchanged: 0, skippedDisagree: 0, columnsSet: 0, caveats: 0, unchecked: 0, refused: 0, missingTools: 0 }
  const byAttr: Record<string, number> = {}
  const planned: { toolId: string; attribute: string; value: unknown }[] = []
  const lines: string[] = []

  for (const inp of inputs) {
    const tool = bySlug.get(inp.slug)
    for (const r of inp.refused) {
      stats.refused++
      lines.push(`  REFUSED  ${inp.slug} ${r.what}: ${r.reason}`)
    }
    if (!tool) {
      if (inp.claims.length) {
        stats.missingTools++
        lines.push(`  NO TOOL  ${inp.slug}: not in the database, ${inp.claims.length} claim(s) not loaded`)
      }
      continue
    }
    for (const u of inp.unchecked) {
      stats.unchecked++
      lines.push(`  null     ${inp.slug} ${u.attribute}: not checked${u.note ? ` (${u.note})` : ""}`)
    }

    const have = existing.filter((e) => e.toolId === tool.id)
    const rowsToWrite: ClaimInput[] = []
    const colUpdates: Record<string, unknown> = {}

    for (const c of inp.claims) {
      if (c.attribute === "caveat") {
        rowsToWrite.push(c)
        continue
      }
      const col = (tool as Record<string, unknown>)[c.attribute]
      if (!valuesEqual(c.attribute, c.value, col)) {
        if (SET_COLUMNS && SET_COLUMN_ATTRS.has(c.attribute)) {
          colUpdates[c.attribute] = c.value
          // jurisdiction_risk is a stored column derived from the country, so it moves with it.
          if (c.attribute === "jurisdiction") colUpdates.jurisdictionRisk = getJurisdictionRisk(typeof c.value === "string" ? c.value : null)
          lines.push(`  column   ${inp.slug} ${c.attribute}: ${JSON.stringify(col)} -> ${JSON.stringify(c.value)}`)
          stats.columnsSet++
        } else {
          stats.skippedDisagree++
          lines.push(`  SKIP     ${inp.slug} ${c.attribute}: claim ${JSON.stringify(c.value)?.slice(0, 40)} disagrees with column ${JSON.stringify(col)?.slice(0, 40)}`)
          continue
        }
      }
      if (c.attribute === "isSecurityAudited" && c.audit && (SET_COLUMNS || valuesEqual(c.attribute, c.value, col))) {
        if (SET_COLUMNS) {
          if (c.audit.auditor !== undefined) colUpdates.auditor = c.audit.auditor
          if (c.audit.auditUrl !== undefined) colUpdates.auditUrl = c.audit.auditUrl
          if (c.audit.auditDate !== undefined) colUpdates.auditDate = dateOrNull(c.audit.auditDate)
        }
      }
      rowsToWrite.push(c)
    }

    // diff against stored rows
    const attrRows = rowsToWrite.filter((r) => r.attribute !== "caveat")
    const caveatRows = rowsToWrite.filter((r) => r.attribute === "caveat")
    let changed = 0
    for (const r of attrRows) {
      const old = have.find((h) => h.attribute === r.attribute && h.sortOrder === 0)
      const same =
        old &&
        JSON.stringify(old.value) === JSON.stringify(r.value) &&
        (old.note ?? null) === r.note &&
        JSON.stringify(old.sourceUrls) === JSON.stringify(r.sources) &&
        old.checkedOn === r.checked
      if (same) stats.unchanged++
      else {
        changed++
        stats.written++
        byAttr[r.attribute] = (byAttr[r.attribute] ?? 0) + 1
      }
      planned.push({ toolId: tool.id, attribute: r.attribute, value: r.value })
    }
    const oldCaveats = have.filter((h) => h.attribute === "caveat").sort((a, b) => a.sortOrder - b.sortOrder)
    const caveatsSame =
      oldCaveats.length === caveatRows.length &&
      oldCaveats.every((o, i) => o.note === caveatRows[i].note && JSON.stringify(o.sourceUrls) === JSON.stringify(caveatRows[i].sources) && o.checkedOn === caveatRows[i].checked)
    const replaceCaveats = inp.hasCaveats && !caveatsSame
    if (replaceCaveats) {
      changed += caveatRows.length
      stats.caveats += caveatRows.length
    }
    stats.tools++
    lines.push(`  ${changed || Object.keys(colUpdates).length ? "load    " : "same    "} ${inp.slug}: ${attrRows.length} attribute claim(s), ${caveatRows.length} caveat(s), ${changed} to write`)

    if (APPLY && (changed || Object.keys(colUpdates).length)) {
      await atomic((d) => {
        const qs: any[] = []
        for (const r of attrRows) {
          qs.push(
            d
              .insert(toolClaims)
              .values({ toolId: tool.id, attribute: r.attribute, sortOrder: 0, value: r.value, note: r.note, sourceUrls: r.sources, checkedOn: r.checked })
              .onConflictDoUpdate({
                target: [toolClaims.toolId, toolClaims.attribute, toolClaims.sortOrder],
                set: { value: r.value, note: r.note, sourceUrls: r.sources, checkedOn: r.checked, updatedAt: new Date() },
              }),
          )
        }
        if (replaceCaveats) {
          qs.push(d.delete(toolClaims).where(and(eq(toolClaims.toolId, tool.id), eq(toolClaims.attribute, "caveat"))))
          for (const r of caveatRows) {
            qs.push(d.insert(toolClaims).values({ toolId: tool.id, attribute: "caveat", sortOrder: r.sortOrder, value: null, note: r.note, sourceUrls: r.sources, checkedOn: r.checked }))
          }
        }
        if (Object.keys(colUpdates).length) qs.push(d.update(tools).set({ ...colUpdates, updatedAt: new Date() }).where(eq(tools.id, tool.id)))
        return qs
      })
    }
  }

  console.log(lines.join("\n"))

  // Coverage of gated flags, counting the claims planned above.
  const all = await db.select().from(tools)
  const claimKeys = new Set(existing.map((e) => `${e.toolId}|${e.attribute}|${JSON.stringify(e.value)}`))
  for (const p of planned) claimKeys.add(`${p.toolId}|${p.attribute}|${JSON.stringify(p.value)}`)
  console.log("\nCoverage of gated flags (all tools; includes this run's claims" + (APPLY ? "" : " as if applied") + "):")
  for (const attr of GATED_ATTRIBUTES) {
    let nonNull = 0
    let sourced = 0
    for (const t of all) {
      const v = (t as Record<string, unknown>)[attr]
      if (v === null || v === undefined) continue
      nonNull++
      if (claimKeys.has(`${t.id}|${attr}|${JSON.stringify(v)}`)) sourced++
    }
    console.log(`  ${attr}: ${nonNull} non-null values, ${sourced} sourced, ${nonNull - sourced} unsourced`)
  }

  console.log("\nSummary:", JSON.stringify(stats))
  console.log("Attribute claims written/changed by attribute:", JSON.stringify(byAttr))
  if (!APPLY) console.log("\nDRY RUN: nothing written. Re-run with --apply.")
  if (stats.refused) process.exitCode = 2
}

main()
  .then(() => process.exit())
  .catch((e) => {
    console.error("LOAD FAILED:", e)
    process.exit(1)
  })
