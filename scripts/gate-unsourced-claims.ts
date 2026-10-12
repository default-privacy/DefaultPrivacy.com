/**
 * Second data step for "show a claim only when a source backs it" (the first was
 * gate-unsourced-flags.ts, 2026-10-09). Covers the claim columns that step left alone.
 *
 * Snapshots the affected columns into tools_claims_snapshot_2026_10_12 (CREATE TABLE IF NOT
 * EXISTS, so a re-run never overwrites the first snapshot), then:
 *   - sets to NULL every e2ee, zero_knowledge, logs_ip, logs_metadata, requires_email,
 *     requires_phone, requires_real_name, has_free_tier and jurisdiction value with no
 *     tool_claims row of the same value (jurisdiction_risk follows jurisdiction, since it is
 *     derived from it);
 *   - sets is_open_source = true to NULL when it is unsourced AND the tool has no repository
 *     link (the bulk backfill marked closed SaaS like Shodan as open source);
 *   - clears last_verified dates stamped by the 2026-07-10 bulk pass, which checked nothing;
 *   - unpublishes (status Draft) listings whose text describes a different product.
 * Roll back with scripts/restore-claims-from-snapshot.ts.
 *
 *   DRY RUN (default):  DATABASE_URL=... bun run scripts/gate-unsourced-claims.ts
 *   APPLY:              DATABASE_URL=... bun run scripts/gate-unsourced-claims.ts --apply
 */
import { sql } from "drizzle-orm"
import { db } from "@/lib/db"
import { allPickSlugs } from "@/lib/picks"

const APPLY = process.argv.includes("--apply")
const SNAPSHOT = "tools_claims_snapshot_2026_10_12"

// Descriptions written about a loading screen or a generic service, not the tool (audit 2026-10-11).
const FILLER_SLUGS = [
  "certificate-search",
  "dkim-verifier",
  "dns-history-lookup",
  "have-i-been-zucked",
  "heartbleed-check",
  "ip-geo-location-lookup",
  "namechk",
  "poodle-check",
  "reverse-domain",
  "reverse-google-adsense",
  "reverse-google-analytics",
  "reverse-ip-lookup",
  "reverse-mx-record",
  "subdomain-finder",
]

// [claim attribute, column]
const BOOLEAN_CLAIMS: [string, string][] = [
  ["e2ee", "e2ee"],
  ["zeroKnowledge", "zero_knowledge"],
  ["logsIp", "logs_ip"],
  ["logsMetadata", "logs_metadata"],
  ["requiresEmail", "requires_email"],
  ["requiresPhone", "requires_phone"],
  ["requiresRealName", "requires_real_name"],
  ["hasFreeTier", "has_free_tier"],
]

const BULK_STAMP_DAY = "2026-07-10"

const rowsOf = (r: unknown): Record<string, unknown>[] =>
  Array.isArray(r) ? r : ((r as { rows?: Record<string, unknown>[] })?.rows ?? [])

const unsourced = (attr: string, col: string) => `
  NOT EXISTS (SELECT 1 FROM public.tool_claims c
              WHERE c.tool_id = t.id AND c.attribute = '${attr}' AND c.value = to_jsonb(t.${col}))`

const OSS_TO_CLEAR = `t.is_open_source = true AND ${unsourced("isOpenSource", "is_open_source")}
  AND (t.github_url IS NULL OR btrim(t.github_url) = '')`
const JURISDICTION_TO_CLEAR = `(t.jurisdiction IS NOT NULL AND ${unsourced("jurisdiction", "jurisdiction")})
  OR (t.jurisdiction IS NULL AND t.jurisdiction_risk IS NOT NULL)`
const STAMP_TO_CLEAR = `t.last_verified::date = DATE '${BULK_STAMP_DAY}'`
const fillerList = FILLER_SLUGS.map((s) => `'${s}'`).join(", ")

async function counts(label: string) {
  const cols = BOOLEAN_CLAIMS.map(
    ([attr, col]) =>
      `count(*) FILTER (WHERE t.${col} IS NOT NULL) AS ${col}_set,
       count(*) FILTER (WHERE t.${col} IS NOT NULL AND ${unsourced(attr, col)}) AS ${col}_unsourced`,
  ).join(",\n")
  const r = rowsOf(
    await db.execute(
      sql.raw(`SELECT ${cols},
        count(*) FILTER (WHERE t.jurisdiction IS NOT NULL OR t.jurisdiction_risk IS NOT NULL) AS jurisdiction_set,
        count(*) FILTER (WHERE ${JURISDICTION_TO_CLEAR}) AS jurisdiction_unsourced,
        count(*) FILTER (WHERE t.is_open_source = true) AS open_source_true,
        count(*) FILTER (WHERE t.is_open_source = true AND ${unsourced("isOpenSource", "is_open_source")}) AS open_source_true_unsourced,
        count(*) FILTER (WHERE ${OSS_TO_CLEAR}) AS open_source_true_unsourced_no_repo,
        count(*) FILTER (WHERE ${STAMP_TO_CLEAR}) AS bulk_last_verified,
        count(*) FILTER (WHERE t.slug IN (${fillerList}) AND t.status = 'Published') AS filler_published
      FROM public.tools t`),
    ),
  )[0]
  console.log(`\n${label}:`)
  for (const [k, v] of Object.entries(r ?? {})) console.log(`  ${k.padEnd(36)} ${v}`)
}

async function listAffected() {
  const picks = new Set(allPickSlugs())
  const oss = rowsOf(
    await db.execute(sql.raw(`SELECT t.slug FROM public.tools t WHERE ${OSS_TO_CLEAR} ORDER BY t.slug`)),
  ).map((r) => String(r.slug))
  console.log(`\nOpen source cleared (${oss.length}): ${oss.join(", ")}`)

  const anyCleared = BOOLEAN_CLAIMS.map(([attr, col]) => `(t.${col} IS NOT NULL AND ${unsourced(attr, col)})`)
    .concat([`(${JURISDICTION_TO_CLEAR})`, `(${OSS_TO_CLEAR})`])
    .join(" OR ")
  const touched = rowsOf(
    await db.execute(sql.raw(`SELECT t.slug FROM public.tools t WHERE ${anyCleared} ORDER BY t.slug`)),
  ).map((r) => String(r.slug))
  const touchedPicks = touched.filter((s) => picks.has(s))
  console.log(`\nDP picks that lose at least one unsourced value (${touchedPicks.length}): ${touchedPicks.join(", ")}`)

  const filler = rowsOf(
    await db.execute(
      sql.raw(`SELECT t.slug, t.status, left(coalesce(t.tagline, ''), 60) AS tagline
               FROM public.tools t WHERE t.slug IN (${fillerList}) ORDER BY t.slug`),
    ),
  )
  console.log(`\nFiller listings (${filler.length} of ${FILLER_SLUGS.length} found):`)
  for (const f of filler) console.log(`  ${String(f.slug).padEnd(26)} ${f.status}  "${f.tagline}"`)
}

async function main() {
  await counts("before")
  await listAffected()
  const snap = rowsOf(await db.execute(sql.raw(`select to_regclass('public.${SNAPSHOT}') as t`)))[0]
  console.log("\nsnapshot table exists:", snap?.t ?? "no")

  if (!APPLY) {
    console.log("\nDRY RUN: no changes made. Re-run with --apply.")
    return
  }

  await db.execute(
    sql.raw(`CREATE TABLE IF NOT EXISTS public.${SNAPSHOT} AS
      SELECT id, slug, status, e2ee, zero_knowledge, logs_ip, logs_metadata, requires_email,
             requires_phone, requires_real_name, has_free_tier, jurisdiction, jurisdiction_risk,
             is_open_source, last_verified, now() AS taken_at
      FROM public.tools`),
  )

  for (const [attr, col] of BOOLEAN_CLAIMS) {
    await db.execute(
      sql.raw(`UPDATE public.tools t SET ${col} = NULL, updated_at = now()
               WHERE t.${col} IS NOT NULL AND ${unsourced(attr, col)}`),
    )
  }
  await db.execute(
    sql.raw(`UPDATE public.tools t SET jurisdiction = NULL, jurisdiction_risk = NULL, updated_at = now()
             WHERE ${JURISDICTION_TO_CLEAR}`),
  )
  await db.execute(sql.raw(`UPDATE public.tools t SET is_open_source = NULL, updated_at = now() WHERE ${OSS_TO_CLEAR}`))
  await db.execute(sql.raw(`UPDATE public.tools t SET last_verified = NULL WHERE ${STAMP_TO_CLEAR}`))
  await db.execute(
    sql.raw(`UPDATE public.tools t SET status = 'Draft', updated_at = now()
             WHERE t.slug IN (${fillerList}) AND t.status = 'Published'`),
  )

  await counts("after")
  console.log("\nApplied. Redeploy (vercel --prod) so prerendered pages pick it up.")
  console.log("Roll back with scripts/restore-claims-from-snapshot.ts.")
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("GATE FAILED:", e)
    process.exit(1)
  })
