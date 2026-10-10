function migrationHost(raw: string): string | null {
  try {
    const normalized = raw.replace(/^postgres(ql)?:/i, "http:")
    return new URL(normalized).hostname
  } catch {
    return null
  }
}

/**
 * Connection string used only by Drizzle CLI (`db:migrate`, `db:studio`) and
 * `scripts/wake-database.ts`. Neon cold starts and pooler endpoints often cause
 * CONNECT_TIMEOUT with default postgres.js settings — we bump `connect_timeout`.
 * For remote hosts (e.g. Neon), we add `sslmode=require` when absent; local
 * Postgres is left unchanged so `db:migrate` still works on localhost.
 */
/** Which env var supplies the migrate connection string (for logs only). */
export function getMigrateDatabaseUrlSource():
  | "MIGRATE_DATABASE_URL"
  | "DATABASE_URL" {
  return process.env.MIGRATE_DATABASE_URL?.trim()
    ? "MIGRATE_DATABASE_URL"
    : "DATABASE_URL"
}

export function getMigrateDatabaseUrl(): string {
  // GitHub Actions sets missing secrets to "" on the env block, not unset.
  // `"" ?? DATABASE_URL` would keep the empty string — must treat "" as absent.
  const migrateOnly = process.env.MIGRATE_DATABASE_URL?.trim()
  const fallback = process.env.DATABASE_URL?.trim()
  const raw = migrateOnly || fallback
  if (!raw) {
    throw new Error(
      "Set DATABASE_URL in .env (or MIGRATE_DATABASE_URL for migrate-only).",
    )
  }

  let url = raw
  const host = migrationHost(url)
  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "::1"

  if (!/[?&]connect_timeout=/.test(url)) {
    url += (url.includes("?") ? "&" : "?") + "connect_timeout=60"
  }
  if (!isLocal && !/[?&]sslmode=/.test(url)) {
    url += (url.includes("?") ? "&" : "?") + "sslmode=require"
  }

  return url
}
