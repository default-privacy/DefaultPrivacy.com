/**
 * Usage Counts — first-party, no-PII demand telemetry.
 *
 * A single fire-and-forget primitive, `countUsage(kind, key)`, that increments an
 * aggregate counter keyed by (today-at-midnight, kind, key). Used to measure real
 * demand — which MCP tools, free tools, and directory searches actually get used —
 * without any third party and without storing PII.
 *
 * Privacy contract (do not weaken):
 *   - NEVER pass raw query text, IP, user-agent, email, or domain as `key`.
 *   - `key` MUST be a short, enum-like bucket (a tool name/slug, or a coarse
 *     signature like 'query' / 'empty'). Callers own that guarantee.
 *
 * Operational contract:
 *   - Gated on isDatabaseConfigured (mirrors src/lib/api-analytics.ts) so telemetry
 *     never couples latency or uptime to the hot path.
 *   - Fire-and-forget: callers do NOT await; failures are swallowed with a
 *     console.error and never thrown.
 */

import { db, isDatabaseConfigured } from "@/lib/db"
import { usageCounts } from "@/lib/db/schema"
import { and, desc, gte, notInArray, sql } from "drizzle-orm"

/**
 * Protocol traffic, not demand: one per MCP JSON-RPC message (mcp_method), one per
 * connecting app (mcp_client) and one per request's protocol revision (mcp_protocol) and one per POST's Accept-header shape (mcp_accept). Kept out of dailyTotal so a demand trend isn't drowned
 * by handshakes and tool listings.
 */
export const TRAFFIC_KINDS = ["mcp_method", "mcp_client", "mcp_protocol", "mcp_accept"]

/**
 * Increment the usage counter for (today, kind, key) by 1.
 *
 * Fire-and-forget: this returns void and starts an async upsert without awaiting.
 * Do NOT `await` it from a request handler — that would put DB latency on the hot
 * path, which this primitive exists to avoid.
 */
export function countUsage(kind: string, key: string): void {
  if (!isDatabaseConfigured) return

  const day = new Date()
  day.setHours(0, 0, 0, 0)

  // Fire-and-forget: kick off the upsert, catch everything, never rethrow.
  void db
    .insert(usageCounts)
    .values({ day, kind, key, count: 1 })
    .onConflictDoUpdate({
      target: [usageCounts.day, usageCounts.kind, usageCounts.key],
      set: {
        count: sql`${usageCounts.count} + 1`,
        updatedAt: new Date(),
      },
    })
    .then(
      () => {},
      (error) => {
        console.error("[usage] Failed to count usage:", error)
      },
    )
}

/**
 * Read aggregated usage over the last `days`. Read-only counterpart to countUsage.
 *
 * Returns three roll-ups of the (day, kind, key) counters, all aggregate-only and
 * PII-free by construction (the table stores no PII):
 *   - byKind:     total per channel ('mcp_tool' | 'free_tool' | 'directory_search')
 *   - topKeys:    the most-used buckets (kind + key), highest count first
 *   - dailyTotal: total usage per day, oldest first
 */
export async function getUsageCounts(days = 30): Promise<{
  byKind: { kind: string; total: number }[]
  topKeys: { kind: string; key: string; total: number }[]
  dailyTotal: { date: string; total: number }[]
}> {
  if (!isDatabaseConfigured) {
    return { byKind: [], topKeys: [], dailyTotal: [] }
  }

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  startDate.setHours(0, 0, 0, 0)

  const byKind = await db
    .select({
      kind: usageCounts.kind,
      total: sql<number>`sum(${usageCounts.count})`,
    })
    .from(usageCounts)
    .where(gte(usageCounts.day, startDate))
    .groupBy(usageCounts.kind)
    .orderBy(desc(sql`sum(${usageCounts.count})`))

  const topKeys = await db
    .select({
      kind: usageCounts.kind,
      key: usageCounts.key,
      total: sql<number>`sum(${usageCounts.count})`,
    })
    .from(usageCounts)
    .where(gte(usageCounts.day, startDate))
    .groupBy(usageCounts.kind, usageCounts.key)
    .orderBy(desc(sql`sum(${usageCounts.count})`))
    // 250, not 50: the guide_read / glossary_read kinds key on content slugs (39
    // guides + 575 glossary terms), so a 50-row cap would evict every tool and
    // search bucket from the only reader that exists (scripts/usage-report.ts).
    .limit(250)

  const dailyTotal = await db
    .select({
      day: usageCounts.day,
      total: sql<number>`sum(${usageCounts.count})`,
    })
    .from(usageCounts)
    .where(and(gte(usageCounts.day, startDate), notInArray(usageCounts.kind, TRAFFIC_KINDS)))
    .groupBy(usageCounts.day)
    .orderBy(usageCounts.day)

  return {
    byKind: byKind.map((r) => ({ kind: r.kind, total: Number(r.total) })),
    topKeys: topKeys.map((r) => ({ kind: r.kind, key: r.key, total: Number(r.total) })),
    dailyTotal: dailyTotal.map((r) => ({
      date: r.day.toISOString().split("T")[0],
      total: Number(r.total),
    })),
  }
}
