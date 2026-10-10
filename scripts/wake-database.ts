import postgres from "postgres"

import { getMigrateDatabaseUrl } from "./db-migrate-url"

/**
 * Opens one connection and runs SELECT 1 so Neon wakes compute before
 * `drizzle-kit migrate` (avoids first-connection timeout during migration).
 */
const sql = postgres(getMigrateDatabaseUrl(), { max: 1 })
await sql`select 1 as ok`
await sql.end()
