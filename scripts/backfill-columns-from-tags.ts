#!/usr/bin/env bun
// NOTE (2026-10-09): accepts_crypto, no_kyc and security_audited are retired from display (site, API, MCP); this script may still write the columns but they must not be shown.
/**
 * Deterministic backfill: typed trust columns  <-  curated tag assignments.
 *
 * ONLY high-confidence, semantically-safe mappings live here. Tags whose meaning
 * is ambiguous for a column are DELIBERATELY excluded (see NOTES below) — those
 * facts are left to targeted enrichment, never guessed from a tag.
 *
 * Dry-run by default (reports deltas, writes nothing). Pass --apply to write.
 * Idempotent: only sets a column when its current value differs.
 *
 *   bun run scripts/backfill-columns-from-tags.ts           # dry-run report
 *   bun run scripts/backfill-columns-from-tags.ts --apply   # write
 *
 * NOTES on tags intentionally NOT mapped (semantic traps):
 *   - `crypto`/`cryptocurrency`/`bitcoin`/`monero`  ≠  acceptsCrypto (payment).
 *       These mark crypto *tools/coins*, not "accepts crypto as payment".
 *   - `audit`  ≠  isSecurityAudited. `audit` marks auditing *tools*, not "was audited".
 *   - `anonymous`/`anonymity`  ≠  isNoKyc. Anonymity of use ≠ no-KYC signup.
 */
import { eq, inArray } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { tools, tags, toolsToTags } from "../src/lib/db/schema"

const APPLY = process.argv.includes("--apply")

// tagSlug set -> desired column patch (only applied when current value differs)
type Rule = {
  label: string
  anyTag: string[]                 // tool qualifies if it carries ANY of these slugs
  patch: Partial<typeof tools.$inferInsert>
  // guard: only apply if the current row value warrants it (avoid clobbering)
  needs: (row: typeof tools.$inferSelect) => boolean
}

const RULES: Rule[] = [
  {
    label: "isOpenSource=true  (open-source | foss)",
    anyTag: ["open-source", "foss"],
    patch: { isOpenSource: true },
    needs: (r) => r.isOpenSource !== true,
  },
  {
    label: "e2ee=true  (end-to-end-encryption | encrypted-messaging)",
    anyTag: ["end-to-end-encryption", "encrypted-messaging"],
    patch: { e2ee: true },
    needs: (r) => r.e2ee !== true,
  },
  {
    label: "zeroKnowledge=true  (zero-knowledge)",
    anyTag: ["zero-knowledge"],
    patch: { zeroKnowledge: true },
    needs: (r) => r.zeroKnowledge !== true,
  },
  {
    label: "logsIp=false,logsMetadata=false  (no-logs)",
    anyTag: ["no-logs"],
    patch: { logsIp: false, logsMetadata: false },
    needs: (r) => r.logsIp !== false || r.logsMetadata !== false,
  },
]

async function run() {
  if (!isDatabaseConfigured) {
    console.error("❌ DATABASE_URL not configured")
    process.exit(1)
  }

  const rows = await db.select().from(tools).where(eq(tools.status, "Published"))
  const byId = new Map(rows.map((r) => [r.id, r]))

  // Build tool -> set(tagSlug) for published tools
  const links = await db
    .select({ toolId: toolsToTags.toolId, slug: tags.slug })
    .from(toolsToTags)
    .innerJoin(tags, eq(toolsToTags.tagId, tags.id))
  const tagsByTool = new Map<string, Set<string>>()
  for (const l of links) {
    if (!byId.has(l.toolId)) continue
    if (!tagsByTool.has(l.toolId)) tagsByTool.set(l.toolId, new Set())
    tagsByTool.get(l.toolId)!.add(l.slug)
  }

  // Accumulate a single merged patch per tool (so a tool touched by 2 rules writes once)
  const patches = new Map<string, Partial<typeof tools.$inferInsert>>()
  const ruleHits: Record<string, number> = {}

  for (const rule of RULES) {
    let hits = 0
    for (const [toolId, slugs] of tagsByTool) {
      if (!rule.anyTag.some((t) => slugs.has(t))) continue
      const row = byId.get(toolId)!
      if (!rule.needs(row)) continue
      hits++
      patches.set(toolId, { ...(patches.get(toolId) ?? {}), ...rule.patch })
    }
    ruleHits[rule.label] = hits
  }

  console.log(`\n=== DETERMINISTIC BACKFILL ${APPLY ? "(APPLY)" : "(DRY-RUN)"} ===`)
  console.log(`published tools: ${rows.length}\n`)
  console.log("per-rule tools needing update:")
  for (const [label, n] of Object.entries(ruleHits)) console.log(`  ${String(n).padStart(4)}  ${label}`)
  console.log(`\ndistinct tools to write: ${patches.size}`)

  if (!APPLY) {
    console.log("\n(dry-run — no writes. re-run with --apply to persist.)")
    process.exit(0)
  }

  let written = 0
  for (const [toolId, patch] of patches) {
    await db.update(tools).set({ ...patch, updatedAt: new Date() }).where(eq(tools.id, toolId))
    written++
  }
  console.log(`\n✅ wrote ${written} tools.`)
  process.exit(0)
}

run().catch((e) => {
  console.error("💥 backfill failed:", e)
  process.exit(1)
})
