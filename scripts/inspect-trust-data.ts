#!/usr/bin/env bun
/**
 * READ-ONLY inspection of the directory's trust-data state.
 * Answers: what can the deterministic tags->columns backfill fill, and
 * what is the real null/true/false split per typed column?
 *
 * Usage: bun run scripts/inspect-trust-data.ts
 * (Reads whatever DATABASE_URL points at — here that's prod Neon.)
 */
import { eq } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { tools, tags, toolsToTags } from "../src/lib/db/schema"

function tally(values: (boolean | null)[]) {
  let t = 0, f = 0, n = 0
  for (const v of values) {
    if (v === true) t++
    else if (v === false) f++
    else n++
  }
  return { true: t, false: f, null: n }
}

async function run() {
  if (!isDatabaseConfigured) {
    console.error("❌ DATABASE_URL not configured")
    process.exit(1)
  }

  const rows = await db.select().from(tools).where(eq(tools.status, "Published"))
  const total = rows.length
  console.log(`\n=== PUBLISHED TOOLS: ${total} ===\n`)

  const boolCols = [
    "e2ee", "zeroKnowledge", "logsIp", "logsMetadata",
    "requiresEmail", "requiresPhone", "requiresRealName",
    "hasFreeTier", "acceptsCrypto", "isNoKyc",
    "isOpenSource", "isSecurityAudited",
  ] as const

  console.log("=== BOOLEAN COLUMN POPULATION (true / false / null) ===")
  for (const c of boolCols) {
    const r = tally(rows.map((row) => row[c] as boolean | null))
    console.log(
      `${c.padEnd(18)} true=${String(r.true).padStart(4)}  false=${String(r.false).padStart(4)}  null=${String(r.null).padStart(4)}`,
    )
  }

  console.log("\n=== OTHER TYPED COLUMNS ===")
  const juris = rows.filter((r) => r.jurisdiction).length
  const jurisRisk = rows.filter((r) => r.jurisdictionRisk).length
  const lastVer = rows.filter((r) => r.lastVerified).length
  const auditor = rows.filter((r) => r.auditor).length
  const auditDate = rows.filter((r) => r.auditDate).length
  const platforms = rows.filter((r) => Array.isArray(r.platforms) && r.platforms.length > 0).length
  console.log(`jurisdiction (ISO) set : ${juris}`)
  console.log(`jurisdictionRisk set   : ${jurisRisk}`)
  console.log(`lastVerified set       : ${lastVer}`)
  console.log(`auditor set            : ${auditor}`)
  console.log(`auditDate set          : ${auditDate}`)
  console.log(`platforms non-empty    : ${platforms}`)

  // ── Tag distribution over PUBLISHED tools ─────────────────────────────────
  const publishedIds = new Set(rows.map((r) => r.id))
  const links = await db
    .select({ toolId: toolsToTags.toolId, slug: tags.slug, name: tags.name, type: tags.type })
    .from(toolsToTags)
    .innerJoin(tags, eq(toolsToTags.tagId, tags.id))

  const tagCount: Record<string, { count: number; type: string; name: string }> = {}
  for (const l of links) {
    if (!publishedIds.has(l.toolId)) continue
    const key = l.slug
    if (!tagCount[key]) tagCount[key] = { count: 0, type: l.type, name: l.name }
    tagCount[key].count++
  }

  const sorted = Object.entries(tagCount).sort((a, b) => b[1].count - a[1].count)
  console.log(`\n=== TAG DISTRIBUTION over published tools (${sorted.length} distinct tags) ===`)
  for (const [slug, info] of sorted) {
    console.log(`${String(info.count).padStart(4)}  ${slug.padEnd(28)} [${info.type}]  ${info.name}`)
  }

  process.exit(0)
}

run().catch((e) => {
  console.error("💥 inspection failed:", e)
  process.exit(1)
})
