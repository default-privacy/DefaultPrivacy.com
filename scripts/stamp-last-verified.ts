#!/usr/bin/env bun
/**
 * Stamp lastVerified = now for published tools that we now hold structured
 * trust signal on but that still have a null lastVerified (i.e. the
 * deterministic tag-backfill set; anchors were stamped at enrichment time).
 *
 * "Has structured signal" = any typed trust/privacy column carries a real
 * value. Tools with no structured data keep lastVerified = null → freshness 0.
 *
 *   bun run scripts/stamp-last-verified.ts           # dry-run
 *   bun run scripts/stamp-last-verified.ts --apply   # write
 */
import { and, eq, isNull, inArray } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { tools } from "../src/lib/db/schema"

const APPLY = process.argv.includes("--apply")

function hasSignal(r: typeof tools.$inferSelect): boolean {
  return (
    r.isOpenSource === true ||
    r.isSecurityAudited === true ||
    r.e2ee !== null ||
    r.zeroKnowledge !== null ||
    r.logsIp !== null ||
    r.logsMetadata !== null ||
    r.jurisdiction !== null ||
    r.jurisdictionRisk !== null
  )
}

async function run() {
  if (!isDatabaseConfigured) {
    console.error("❌ DATABASE_URL not configured")
    process.exit(1)
  }

  const rows = await db
    .select()
    .from(tools)
    .where(and(eq(tools.status, "Published"), isNull(tools.lastVerified)))

  const targets = rows.filter(hasSignal)
  console.log(`\n=== STAMP lastVerified ${APPLY ? "(APPLY)" : "(DRY-RUN)"} ===`)
  console.log(`published w/ null lastVerified: ${rows.length}`)
  console.log(`of those, have structured signal → stamp: ${targets.length}`)
  console.log(`(remaining ${rows.length - targets.length} keep null → freshness 0)`)

  if (APPLY && targets.length) {
    const now = new Date()
    const ids = targets.map((t) => t.id)
    // chunk to keep the update statement small
    for (let i = 0; i < ids.length; i += 200) {
      const chunk = ids.slice(i, i + 200)
      await db.update(tools).set({ lastVerified: now, updatedAt: now }).where(inArray(tools.id, chunk))
    }
    console.log(`\n✅ stamped ${targets.length} tools.`)
  } else if (!APPLY) {
    console.log("\n(dry-run — no writes.)")
  }
  process.exit(0)
}

run().catch((e) => {
  console.error("💥 stamp failed:", e)
  process.exit(1)
})
