/**
 * Apply Drizzle SQL migrations from ./drizzle against the database in DATABASE_URL
 * (or MIGRATE_DATABASE_URL when set — see scripts/db-migrate-url.ts).
 *
 * **Default:** `drizzle-kit migrate` (TCP postgres driver).
 *
 * **Neon HTTP:** `DRIZZLE_USE_NEON_HTTP_MIGRATOR=true` runs pending migrations statement-by-statement
 * (Neon HTTP cannot execute multi-statement migration files in one batch).
 */
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

import { neon } from "@neondatabase/serverless"
import { sql as drizzleSql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/neon-http"

import {
  getMigrateDatabaseUrl,
  getMigrateDatabaseUrlSource,
} from "./db-migrate-url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const migrationsFolder = join(__dirname, "../drizzle")
const journalPath = join(migrationsFolder, "meta/_journal.json")

type JournalEntry = { tag: string; when: number }

function maskDatabaseTarget(raw: string): string {
  try {
    const normalized = raw.replace(/^postgres(ql)?:/i, "http:")
    const u = new URL(normalized)
    const host = u.hostname
    const db = u.pathname.replace(/^\//, "") || "(defaultdb)"
    return `${host} / ${db}`
  } catch {
    return "(could not parse DATABASE_URL)"
  }
}

/** Split migration SQL for Neon HTTP (one statement per request). */
function splitMigrationStatements(body: string): string[] {
  const statements: string[] = []
  let rest = body.replace(/--[^\n]*\n/g, "\n")

  const doBlocks: string[] = []
  rest = rest.replace(/DO\s+\$\$[\s\S]*?END\s+\$\$\s*;/gi, (block) => {
    doBlocks.push(block.trim())
    return "\n"
  })

  for (const block of doBlocks) {
    if (block) statements.push(block)
  }

  for (const part of rest.split(";")) {
    const trimmed = part.trim()
    if (trimmed) statements.push(trimmed)
  }

  return statements
}

async function migrateViaNeonHttp(url: string) {
  const neonSql = neon(url)
  const db = drizzle(neonSql)

  await db.execute(drizzleSql.raw(`CREATE SCHEMA IF NOT EXISTS drizzle`))
  await db.execute(drizzleSql.raw(`
    CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
      id SERIAL PRIMARY KEY,
      hash text NOT NULL,
      created_at bigint
    )
  `))

  const journal = JSON.parse(readFileSync(journalPath, "utf8")) as {
    entries: JournalEntry[]
  }

  const appliedRows = await neonSql`
    SELECT created_at, hash FROM drizzle.__drizzle_migrations
  `
  const appliedHashes = new Set(
    appliedRows.map((r) => (r as { hash: string }).hash),
  )
  const maxAppliedWhen = appliedRows.reduce((max, r) => {
    const when = Number((r as { created_at: string | number }).created_at)
    return when > max ? when : max
  }, 0)

  // Prefer journal `when` ordering (matches drizzle-kit baseline). Hash fallback for re-runs.
  const pending = journal.entries.filter((entry) => {
    if (entry.when <= maxAppliedWhen) return false
    const path = join(migrationsFolder, `${entry.tag}.sql`)
    const body = readFileSync(path, "utf8")
    const hash = createHash("sha256").update(body).digest("hex")
    return !appliedHashes.has(hash)
  })
  if (pending.length === 0) {
    console.log("[db:migrate] No pending migrations (HTTP).")
    return
  }

  for (const entry of pending) {
    const path = join(migrationsFolder, `${entry.tag}.sql`)
    const body = readFileSync(path, "utf8")
    const hash = createHash("sha256").update(body).digest("hex")
    const stmts = splitMigrationStatements(body)

    console.log(`[db:migrate] Applying ${entry.tag} (${stmts.length} statement(s))…`)

    for (let i = 0; i < stmts.length; i++) {
      await db.execute(drizzleSql.raw(stmts[i]!))
      console.log(`[db:migrate]   ${entry.tag} step ${i + 1}/${stmts.length} ok`)
    }

    await neonSql`
      INSERT INTO drizzle.__drizzle_migrations (hash, created_at)
      VALUES (${hash}, ${entry.when})
    `
    console.log(`[db:migrate] Recorded ${entry.tag} in __drizzle_migrations`)
  }
}

const url = getMigrateDatabaseUrl()
const source = getMigrateDatabaseUrlSource()
const host = (() => {
  try {
    return new URL(url.replace(/^postgres(ql)?:/i, "http:")).hostname
  } catch {
    return ""
  }
})()
const endpoint = host.includes("-pooler") ? "pooled" : "direct"
console.log(
  `[db:migrate] ${maskDatabaseTarget(url)} (from ${source}, ${endpoint} host)`,
)

const useNeonHttp =
  process.env.DRIZZLE_USE_NEON_HTTP_MIGRATOR === "true" && url.includes("neon.tech")

try {
  if (useNeonHttp) {
    await migrateViaNeonHttp(url)
    console.log("[db:migrate] Done (Neon HTTP, statement-by-statement).")
  } else {
    const bin = join(process.cwd(), "node_modules/.bin/drizzle-kit")
    const proc = Bun.spawnSync([bin, "migrate"], {
      cwd: process.cwd(),
      env: process.env,
      stdout: "inherit",
      stderr: "inherit",
    })
    if (proc.exitCode !== 0) {
      console.error(
        "\n[db:migrate] drizzle-kit migrate failed. Try:\n" +
          "  • Neon's **direct** (non-pooler) URL in MIGRATE_DATABASE_URL (see .env.example).\n" +
          "  • `bun run db:wake` then retry (cold Neon compute).\n" +
          "  • **HTTP path (recommended when TCP times out):** `bun run db:migrate:http`\n",
      )
      process.exit(proc.exitCode ?? 1)
    }
    console.log("[db:migrate] Done (drizzle-kit / TCP).")
  }
} catch (e) {
  console.error("[db:migrate] Error:", e instanceof Error ? e.message : e)
  process.exit(1)
}
