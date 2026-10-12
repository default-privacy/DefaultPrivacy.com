/**
 * Rollback for scripts/gate-unsourced-claims.ts: copies the gated columns and status back
 * from tools_claims_snapshot_2026_10_12 (written by the first gate run).
 *
 *   DRY RUN (default):  DATABASE_URL=... bun run scripts/restore-claims-from-snapshot.ts
 *   APPLY:              DATABASE_URL=... bun run scripts/restore-claims-from-snapshot.ts --apply
 *
 * Tools added after the snapshot are untouched; a value set by hand after the snapshot is
 * overwritten, so check the dry-run count.
 */
import { sql } from "drizzle-orm"
import { db } from "@/lib/db"

const APPLY = process.argv.includes("--apply")
const SNAPSHOT = "tools_claims_snapshot_2026_10_12"
const COLUMNS = [
  "status",
  "e2ee",
  "zero_knowledge",
  "logs_ip",
  "logs_metadata",
  "requires_email",
  "requires_phone",
  "requires_real_name",
  "has_free_tier",
  "jurisdiction",
  "jurisdiction_risk",
  "is_open_source",
  "last_verified",
]

const rowsOf = (r: unknown): Record<string, unknown>[] =>
  Array.isArray(r) ? r : ((r as { rows?: Record<string, unknown>[] })?.rows ?? [])

const DIFFERS = `(${COLUMNS.map((c) => `t.${c}`).join(", ")}) IS DISTINCT FROM (${COLUMNS.map((c) => `s.${c}`).join(", ")})`

async function differing(): Promise<unknown> {
  return rowsOf(
    await db.execute(
      sql.raw(`SELECT count(*) AS n FROM public.tools t JOIN public.${SNAPSHOT} s ON s.id = t.id WHERE ${DIFFERS}`),
    ),
  )[0]?.n
}

async function main() {
  const exists = rowsOf(await db.execute(sql.raw(`select to_regclass('public.${SNAPSHOT}') as t`)))[0]?.t
  if (!exists) throw new Error(`${SNAPSHOT} does not exist; nothing to restore`)

  console.log(`tools that differ from the snapshot: ${await differing()}`)
  if (!APPLY) {
    console.log("DRY RUN: no changes made. Re-run with --apply.")
    return
  }

  await db.execute(
    sql.raw(`UPDATE public.tools t SET ${COLUMNS.map((c) => `${c} = s.${c}`).join(", ")}, updated_at = now()
             FROM public.${SNAPSHOT} s WHERE s.id = t.id AND ${DIFFERS}`),
  )
  console.log(`restored. differing after: ${await differing()}`)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("RESTORE FAILED:", e)
    process.exit(1)
  })
