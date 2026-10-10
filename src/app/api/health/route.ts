import { db, isDatabaseConfigured } from "@/lib/db"
import { sql } from "drizzle-orm"

export const dynamic = "force-dynamic"

/**
 * GET /api/health
 * Liveness + DB reachability probe. Non-throwing: a failed DB check
 * degrades the response rather than erroring the route.
 */
export async function GET(): Promise<Response> {
  let dbStatus: "ok" | "off" | "degraded"

  if (!isDatabaseConfigured) {
    dbStatus = "off"
  } else {
    try {
      await db.execute(sql`SELECT 1`)
      dbStatus = "ok"
    } catch {
      dbStatus = "degraded"
    }
  }

  const status = dbStatus === "degraded" ? "degraded" : "ok"

  return Response.json({
    status,
    db: dbStatus,
    ts: new Date().toISOString(),
  })
}
