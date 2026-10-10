/**
 * One-time fix when Postgres already has the full schema but
 * `drizzle.__drizzle_migrations` is empty (or behind). Drizzle's migrator only
 * looks at the single newest `created_at` row; if none exist, it replays 0000
 * and hits "already exists" errors.
 *
 * Run once with DATABASE_URL set (local or CI):
 *   bun run db:baseline
 *
 * Safe to re-run: no-op if a row already has created_at >= latest journal `when`.
 */

import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

import { neon } from "@neondatabase/serverless"

import { getMigrateDatabaseUrl } from "./db-migrate-url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const journalPath = join(__dirname, "../drizzle/meta/_journal.json")

type Journal = {
  entries: { tag: string; when: number }[]
}

const journal = JSON.parse(readFileSync(journalPath, "utf8")) as Journal
const entries = journal.entries
if (entries.length === 0) {
  throw new Error("Journal has no entries")
}

const last = entries[entries.length - 1]!
const migrationPath = join(__dirname, "../drizzle", `${last.tag}.sql`)
const body = readFileSync(migrationPath, "utf8")
const hash = createHash("sha256").update(body).digest("hex")
const when = last.when

const sql = neon(getMigrateDatabaseUrl())

await sql`CREATE SCHEMA IF NOT EXISTS drizzle`

await sql`
  CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
    id SERIAL PRIMARY KEY,
    hash text NOT NULL,
    created_at bigint
  )
`

const rows = await sql`
  SELECT created_at FROM drizzle.__drizzle_migrations
  ORDER BY created_at DESC
  LIMIT 1
`

const top = rows[0] as { created_at: string | number } | undefined
const topWhen = top ? Number(top.created_at) : null

if (topWhen !== null && topWhen >= when) {
  console.log(
    `Baseline skipped: __drizzle_migrations already has created_at >= ${when} (latest journal).`,
  )
  process.exit(0)
}

await sql`
  INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
  VALUES (${hash}, ${when})
`

console.log(
  `Baseline inserted for ${last.tag}: hash prefix ${hash.slice(0, 8)}…, created_at ${when}.`,
)
console.log("Next `bun run db:migrate` will only apply newer migrations than this.")
