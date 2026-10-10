/**
 * API Usage Analytics
 *
 * Logs API requests and aggregates daily stats for the Privacy Protocol API.
 * Used by the rate limiter to track usage patterns.
 */

import { db, isDatabaseConfigured } from "@/lib/db"
import { apiRequestLogs, apiDailyStats } from "@/lib/db/schema"
import { gte, lte, sql, desc } from "drizzle-orm"

export type ApiLogEntry = {
  endpoint: string
  method: string
  statusCode: number
  responseTimeMs?: number
  rateLimitTier?: string
  rateLimitRemaining?: number
}

/**
 * Log an API request (fire-and-forget, doesn't block response).
 */
export async function logApiRequest(entry: ApiLogEntry): Promise<void> {
  if (!isDatabaseConfigured) return

  try {
    // Privacy: we deliberately do NOT persist client IP, user-agent, or query params.
    // Endpoint + status + timing is enough for operational stats; the raw-PII columns on
    // api_request_logs are no longer written (kept nullable pending a drop migration).
    await db.insert(apiRequestLogs).values({
      endpoint: entry.endpoint,
      method: entry.method,
      statusCode: entry.statusCode,
      responseTimeMs: entry.responseTimeMs,
      rateLimitTier: entry.rateLimitTier,
      rateLimitRemaining: entry.rateLimitRemaining,
    })
  } catch (error) {
    console.error("[api-analytics] Failed to log request:", error)
  }
}

/**
 * Update daily aggregated stats for an endpoint.
 * Called after logging individual requests.
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
    await db
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
      })
  } catch (error) {
    console.error("[api-analytics] Failed to update daily stats:", error)
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
 * Get recent request logs for debugging.
 */
export async function getRecentLogs(limit = 100): Promise<{
  id: string
  endpoint: string
  method: string
  statusCode: number
  responseTimeMs: number | null
  createdAt: Date
}[]> {
  if (!isDatabaseConfigured) return []

  return db
    .select({
      id: apiRequestLogs.id,
      endpoint: apiRequestLogs.endpoint,
      method: apiRequestLogs.method,
      statusCode: apiRequestLogs.statusCode,
      responseTimeMs: apiRequestLogs.responseTimeMs,
      createdAt: apiRequestLogs.createdAt,
    })
    .from(apiRequestLogs)
    .orderBy(desc(apiRequestLogs.createdAt))
    .limit(limit)
}

/**
 * Prune old request logs (keep last N days).
 *
 * MANUAL / OPS UTILITY — v5 runs no cron, so nothing calls this automatically and
 * api_request_logs grows unbounded. Prune on demand by invoking this, or run the
 * equivalent SQL directly against the DB:
 *   DELETE FROM api_request_logs WHERE created_at < now() - interval '30 days';
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
