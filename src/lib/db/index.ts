/**
 * Database Connection
 * Supports both Neon (serverless) and standard PostgreSQL
 */

import { neon } from "@neondatabase/serverless"
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http"
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"
import { env, isServiceEnabled } from "@/lib/env"

const connectionString = env.DATABASE_URL

export const isDatabaseConfigured = isServiceEnabled.database

const isNeon = connectionString?.includes("neon.tech")

let dbInstance: ReturnType<typeof drizzleNeon> | ReturnType<typeof drizzlePostgres> | null = null

if (connectionString) {
  dbInstance = isNeon
    ? drizzleNeon(neon(connectionString), { schema })
    : drizzlePostgres(
        // Bound the pool. `next build` spawns one worker process PER CPU, and each
        // imports this module → its own postgres-js client. An unbounded default (10)
        // × N workers exhausts a standard Postgres `max_connections` (100) mid-prerender,
        // which (post-N6) now fails the build loudly instead of silently emptying pages.
        // Neon (serverless HTTP, the Vercel path) has no persistent pool and is unaffected.
        postgres(connectionString, {
          max: 4,
          idle_timeout: 20,
          connect_timeout: 10,
        }),
        { schema },
      )
}

// Queries should check isDatabaseConfigured before using db
export const db = dbInstance as ReturnType<typeof drizzleNeon> | ReturnType<typeof drizzlePostgres>

export type DB = typeof db

export * from "./schema"
