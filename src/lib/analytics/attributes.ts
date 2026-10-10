/**
 * Attribute Counts — aggregate browser-attribute frequency corpus.
 *
 * A single fire-and-forget primitive, `countAttributes(pairs)`, that increments an
 * aggregate tally keyed by (attribute, value) for each pair. It warms a corpus of
 * how common each browser-attribute value is across visitors — the raw material a
 * later "1 in N" rarity readout will read from. It stores ONLY tallies.
 *
 * Privacy contract (do not weaken — this is a privacy site):
 *   - The corpus is aggregate-only: (attribute, value, count). There is NO ip, NO
 *     fingerprintId, NO per-visitor id, NO raw-fingerprint blob, and NO join key
 *     linking a visit to its attributes.
 *   - NEVER pass a composite fingerprint id, a user-agent, or any per-visitor value
 *     as an attribute — those turn the corpus into a tracking DB. `attribute` MUST
 *     be a fixed enum-like name and `value` a coarse, non-identifying bucket.
 *     Callers own that guarantee (see the curated ATTRIBUTE list in the client).
 *
 * Operational contract (mirrors src/lib/analytics/usage.ts):
 *   - Gated on isDatabaseConfigured so telemetry never couples latency/uptime to
 *     the hot path.
 *   - Fire-and-forget: callers do NOT await; failures are swallowed with a
 *     console.error and never thrown into the UI.
 */

import { db, isDatabaseConfigured } from "@/lib/db"
import { fpAttributeCounts } from "@/lib/db/schema"
import { sql } from "drizzle-orm"

export type AttributePair = { attribute: string; value: string }

/**
 * Increment the (attribute, value) tally by 1 for each pair.
 *
 * Fire-and-forget: this returns void and starts async upserts without awaiting.
 * Do NOT `await` it from a request handler.
 */
export function countAttributes(pairs: AttributePair[]): void {
  if (!isDatabaseConfigured) return
  if (pairs.length === 0) return

  const now = new Date()

  // One upsert per pair: seed row with count=1 on insert, atomic `count + 1` on
  // conflict. Fire-and-forget: kick it off, swallow everything, never rethrow.
  void db
    .insert(fpAttributeCounts)
    .values(pairs.map((p) => ({ attribute: p.attribute, value: p.value, count: 1 })))
    .onConflictDoUpdate({
      target: [fpAttributeCounts.attribute, fpAttributeCounts.value],
      set: {
        count: sql`${fpAttributeCounts.count} + 1`,
        updatedAt: now,
      },
    })
    .then(
      () => {},
      (error) => {
        console.error("[attributes] Failed to count attributes:", error)
      },
    )
}
