/**
 * Data step for "show a flag only when a source backs it".
 *
 * Snapshots the flag columns into tools_flags_snapshot_2026_10 (CREATE TABLE IF NOT EXISTS,
 * so a re-run never overwrites the first snapshot), then sets to NULL every isNoKyc,
 * acceptsCrypto and isSecurityAudited value (plus auditor, audit_url, audit_date for the
 * last) that has no tool_claims row with the same value. isOpenSource is left alone.
 * Roll back with scripts/restore-flags-from-snapshot.ts.
 *
 *   DRY RUN (default):  DATABASE_URL=... bun run scripts/gate-unsourced-flags.ts
 *   APPLY:              DATABASE_URL=... bun run scripts/gate-unsourced-flags.ts --apply
 */
import { sql } from "drizzle-orm"
import { db } from "@/lib/db"

const APPLY = process.argv.includes("--apply")

const rowsOf = (r: unknown): Record<string, unknown>[] =>
  Array.isArray(r) ? r : ((r as { rows?: Record<string, unknown>[] })?.rows ?? [])

const unsourced = (attr: string, col: string) => `
  NOT EXISTS (SELECT 1 FROM public.tool_claims c
              WHERE c.tool_id = t.id AND c.attribute = '${attr}' AND c.value = to_jsonb(t.${col}))`

async function counts(label: string) {
  const r = rowsOf(
    await db.execute(
      sql.raw(`SELECT
        count(*) FILTER (WHERE t.is_no_kyc IS NOT NULL) AS no_kyc_set,
        count(*) FILTER (WHERE t.is_no_kyc IS NOT NULL AND ${unsourced("isNoKyc", "is_no_kyc")}) AS no_kyc_unsourced,
        count(*) FILTER (WHERE t.accepts_crypto IS NOT NULL) AS crypto_set,
        count(*) FILTER (WHERE t.accepts_crypto IS NOT NULL AND ${unsourced("acceptsCrypto", "accepts_crypto")}) AS crypto_unsourced,
        count(*) FILTER (WHERE t.is_security_audited IS NOT NULL) AS audited_set,
        count(*) FILTER (WHERE t.is_security_audited IS NOT NULL AND ${unsourced("isSecurityAudited", "is_security_audited")}) AS audited_unsourced,
        count(*) FILTER (WHERE t.auditor IS NOT NULL) AS auditor_set,
        count(*) FILTER (WHERE t.audit_url IS NOT NULL) AS audit_url_set,
        count(*) FILTER (WHERE t.audit_date IS NOT NULL) AS audit_date_set,
        count(*) FILTER (WHERE t.is_open_source IS NOT NULL) AS open_source_set,
        count(*) FILTER (WHERE t.is_open_source = false AND ${unsourced("isOpenSource", "is_open_source")}) AS open_source_false_unsourced
      FROM public.tools t`),
    ),
  )[0]
  console.log(`${label}:`, JSON.stringify(r))
}

async function main() {
  await counts("before")
  const snap = rowsOf(await db.execute(sql`select to_regclass('public.tools_flags_snapshot_2026_10') as t`))[0]
  console.log("snapshot table exists:", snap?.t ?? "no")

  if (!APPLY) {
    console.log("\nDRY RUN: no changes made. Re-run with --apply. (xxx_unsourced above = values that would become NULL)")
    return
  }

  await db.execute(sql.raw(`CREATE TABLE IF NOT EXISTS public.tools_flags_snapshot_2026_10 AS
    SELECT id, slug, is_open_source, accepts_crypto, is_no_kyc, is_security_audited,
           auditor, audit_date, audit_url, now() AS taken_at FROM public.tools`))

  await db.execute(sql.raw(`UPDATE public.tools t SET is_no_kyc = NULL, updated_at = now()
    WHERE t.is_no_kyc IS NOT NULL AND ${unsourced("isNoKyc", "is_no_kyc")}`))
  await db.execute(sql.raw(`UPDATE public.tools t SET accepts_crypto = NULL, updated_at = now()
    WHERE t.accepts_crypto IS NOT NULL AND ${unsourced("acceptsCrypto", "accepts_crypto")}`))
  await db.execute(sql.raw(`UPDATE public.tools t
    SET is_security_audited = NULL, auditor = NULL, audit_url = NULL, audit_date = NULL, updated_at = now()
    WHERE (t.is_security_audited IS NOT NULL OR t.auditor IS NOT NULL OR t.audit_url IS NOT NULL OR t.audit_date IS NOT NULL)
      AND ${unsourced("isSecurityAudited", "is_security_audited")}`))

  // The old schema defaulted is_open_source to false, so a bare "false" is "never checked".
  // Unsourced TRUE values stay (they were set from repositories); only unsourced FALSE is cleared.
  await db.execute(sql.raw(`UPDATE public.tools t SET is_open_source = NULL, updated_at = now()
    WHERE t.is_open_source = false AND ${unsourced("isOpenSource", "is_open_source")}`))

  await counts("after")
  console.log("\nApplied. Roll back with scripts/restore-flags-from-snapshot.ts.")
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("GATE FAILED:", e)
    process.exit(1)
  })
