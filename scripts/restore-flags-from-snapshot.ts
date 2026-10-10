/**
 * Rollback for scripts/gate-unsourced-flags.ts: copies the flag columns back from
 * tools_flags_snapshot_2026_10 (written by the first gate run).
 *
 *   DRY RUN (default):  DATABASE_URL=... bun run scripts/restore-flags-from-snapshot.ts
 *   APPLY:              DATABASE_URL=... bun run scripts/restore-flags-from-snapshot.ts --apply
 *
 * Restores is_open_source, accepts_crypto, is_no_kyc, is_security_audited, auditor,
 * audit_date, audit_url for every tool in the snapshot. Tools added after the snapshot are
 * untouched; a flag set by hand after the snapshot is overwritten, so check the dry-run count.
 */
import { sql } from "drizzle-orm"
import { db } from "@/lib/db"

const APPLY = process.argv.includes("--apply")

const rowsOf = (r: unknown): Record<string, unknown>[] =>
  Array.isArray(r) ? r : ((r as { rows?: Record<string, unknown>[] })?.rows ?? [])

const DIFFERS = `(t.is_open_source, t.accepts_crypto, t.is_no_kyc, t.is_security_audited, t.auditor, t.audit_date, t.audit_url)
  IS DISTINCT FROM (s.is_open_source, s.accepts_crypto, s.is_no_kyc, s.is_security_audited, s.auditor, s.audit_date, s.audit_url)`

async function main() {
  const exists = rowsOf(await db.execute(sql`select to_regclass('public.tools_flags_snapshot_2026_10') as t`))[0]?.t
  if (!exists) throw new Error("tools_flags_snapshot_2026_10 does not exist; nothing to restore")

  const n = rowsOf(await db.execute(sql.raw(`SELECT count(*) AS n FROM public.tools t JOIN public.tools_flags_snapshot_2026_10 s ON s.id = t.id WHERE ${DIFFERS}`)))[0]?.n
  console.log(`tools whose flags differ from the snapshot: ${n}`)

  if (!APPLY) {
    console.log("DRY RUN: no changes made. Re-run with --apply.")
    return
  }

  await db.execute(sql.raw(`UPDATE public.tools t SET
      is_open_source = s.is_open_source, accepts_crypto = s.accepts_crypto, is_no_kyc = s.is_no_kyc,
      is_security_audited = s.is_security_audited, auditor = s.auditor, audit_date = s.audit_date,
      audit_url = s.audit_url, updated_at = now()
    FROM public.tools_flags_snapshot_2026_10 s WHERE s.id = t.id AND ${DIFFERS}`))
  const left = rowsOf(await db.execute(sql.raw(`SELECT count(*) AS n FROM public.tools t JOIN public.tools_flags_snapshot_2026_10 s ON s.id = t.id WHERE ${DIFFERS}`)))[0]?.n
  console.log(`restored. differing after: ${left}`)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("RESTORE FAILED:", e)
    process.exit(1)
  })
