/**
 * API Usage Analytics
 *
 * Aggregates daily stats (requests, errors, rate limits, average speed) per endpoint for
 * the Privacy Protocol API and the MCP server. Used by the rate limiter. Per-request rows
 * in api_request_logs are no longer written (2026-10-16): nothing read them.
 */

import { db, isDatabaseConfigured } from "@/lib/db"
import { failureCause, retryOnce } from "@/lib/db/retry"
import { apiRequestLogs, apiDailyStats } from "@/lib/db/schema"
import { desc, gte, lte, sql } from "drizzle-orm"

/**
 * Update daily aggregated stats for an endpoint.
 */
export async function updateDailyStats(
  endpoint: string,
  statusCode: number,
  responseTimeMs?: number
): Promise<void> {
  if (!isDatabaseConfigured) return

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isSuccess = statusCode >= 200 && statusCode < 400
  const isRateLimited = statusCode === 429
  const isError = statusCode >= 400 && statusCode !== 429

  try {
    // Upsert daily stats
    await retryOnce(() =>
      db
        .insert(apiDailyStats)
        .values({
          date: today,
          endpoint,
          totalRequests: 1,
          successCount: isSuccess ? 1 : 0,
          errorCount: isError ? 1 : 0,
          rateLimitedCount: isRateLimited ? 1 : 0,
          avgResponseTimeMs: responseTimeMs ?? null,
        })
        .onConflictDoUpdate({
          target: [apiDailyStats.date, apiDailyStats.endpoint],
          set: {
            totalRequests: sql`${apiDailyStats.totalRequests} + 1`,
            successCount: sql`${apiDailyStats.successCount} + ${isSuccess ? 1 : 0}`,
            errorCount: sql`${apiDailyStats.errorCount} + ${isError ? 1 : 0}`,
            rateLimitedCount: sql`${apiDailyStats.rateLimitedCount} + ${isRateLimited ? 1 : 0}`,
            avgResponseTimeMs: responseTimeMs
              ? sql`(COALESCE(${apiDailyStats.avgResponseTimeMs}, 0) * ${apiDailyStats.totalRequests} + ${responseTimeMs}) / (${apiDailyStats.totalRequests} + 1)`
              : apiDailyStats.avgResponseTimeMs,
            updatedAt: new Date(),
          },
        }),
    )
  } catch (error) {
    console.error("[api-analytics] Failed to update daily stats twice:", failureCause(error))
  }
}

/**
 * Get API stats for admin dashboard.
 */
export async function getApiStats(days = 30): Promise<{
  totalRequests: number
  successRate: number
  avgResponseTime: number
  rateLimitedCount: number
  topEndpoints: { endpoint: string; count: number }[]
  dailyTrend: { date: string; requests: number }[]
}> {
  if (!isDatabaseConfigured) {
    return {
      totalRequests: 0,
      successRate: 0,
      avgResponseTime: 0,
      rateLimitedCount: 0,
      topEndpoints: [],
      dailyTrend: [],
    }
  }

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  startDate.setHours(0, 0, 0, 0)

  const stats = await db
    .select({
      totalRequests: sql<number>`sum(${apiDailyStats.totalRequests})`,
      successCount: sql<number>`sum(${apiDailyStats.successCount})`,
      errorCount: sql<number>`sum(${apiDailyStats.errorCount})`,
      rateLimitedCount: sql<number>`sum(${apiDailyStats.rateLimitedCount})`,
      avgResponseTime: sql<number>`avg(${apiDailyStats.avgResponseTimeMs})`,
    })
    .from(apiDailyStats)
    .where(gte(apiDailyStats.date, startDate))

  const topEndpoints = await db
    .select({
      endpoint: apiDailyStats.endpoint,
      count: sql<number>`sum(${apiDailyStats.totalRequests})`,
    })
    .from(apiDailyStats)
    .where(gte(apiDailyStats.date, startDate))
    .groupBy(apiDailyStats.endpoint)
    .orderBy(desc(sql`sum(${apiDailyStats.totalRequests})`))
    .limit(10)

  const dailyTrend = await db
    .select({
      date: apiDailyStats.date,
      requests: sql<number>`sum(${apiDailyStats.totalRequests})`,
    })
    .from(apiDailyStats)
    .where(gte(apiDailyStats.date, startDate))
    .groupBy(apiDailyStats.date)
    .orderBy(apiDailyStats.date)

  const s = stats[0]
  const total = Number(s?.totalRequests) || 0
  const success = Number(s?.successCount) || 0

  return {
    totalRequests: total,
    successRate: total > 0 ? Math.round((success / total) * 100) : 0,
    avgResponseTime: Math.round(Number(s?.avgResponseTime) || 0),
    rateLimitedCount: Number(s?.rateLimitedCount) || 0,
    topEndpoints: topEndpoints.map((e) => ({
      endpoint: e.endpoint,
      count: Number(e.count),
    })),
    dailyTrend: dailyTrend.map((d) => ({
      date: d.date.toISOString().split("T")[0],
      requests: Number(d.requests),
    })),
  }
}

/**
 * Clear old rows from api_request_logs.
 *
 * Rows are no longer written. Run once with daysToKeep = 0 to clear the rows written
 * before 2026-10-16 (or DELETE FROM api_request_logs;), then drop the table in a migration.
 */
export async function pruneOldLogs(daysToKeep = 30): Promise<number> {
  if (!isDatabaseConfigured) return 0

  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

  // Count before delete
  const [countResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(apiRequestLogs)
    .where(lte(apiRequestLogs.createdAt, cutoffDate))

  const count = Number(countResult?.count ?? 0)

  if (count > 0) {
    await db.delete(apiRequestLogs).where(lte(apiRequestLogs.createdAt, cutoffDate))
  }

  return count
}
