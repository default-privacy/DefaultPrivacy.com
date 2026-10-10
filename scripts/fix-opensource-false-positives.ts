#!/usr/bin/env bun
/**
 * Correct isOpenSource FALSE POSITIVES introduced by the naive
 * `backfill-opensource-from-github.ts` (which flags isOpenSource=true for ANY
 * non-empty github_url, with no check that the repo is the actual product source).
 *
 * These tools are proprietary/closed-source products that merely LINK a GitHub
 * org (a utility lib, an issues-only repo, a releases repo, or a small client
 * wrapper). Badging them "open source" in the directory is misinformation that
 * agents and users read as fact. Each verdict below was web-verified 2026-07-11.
 *
 * NOT included (deliberately KEPT open-source — the product itself is open):
 *   - cryptee  : client app fully OSS; only the backend is closed (Proton/Bitwarden standard)
 *   - coldcard : firmware fully MIT-licensed, reproducible builds — the repo IS the source
 *
 * Sets isOpenSource=false (an ASSERTION they are not open source, not null "unknown").
 * Dry-run by default (writes nothing). --apply to persist. Idempotent.
 *
 *   bun run scripts/fix-opensource-false-positives.ts           # dry-run report
 *   bun run scripts/fix-opensource-false-positives.ts --apply   # write
 */
import { inArray } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { tools } from "../src/lib/db/schema"

/**
 * Vetted proprietary tools the naive github_url heuristic wrongly flagged OSS.
 * Exported so the backfill script imports it and can never re-flag them.
 */
export const OPENSOURCE_FALSE_POSITIVES: Record<string, string> = {
  "atomic-wallet": "Closed-source wallet (own KB confirms); repo Atomicwallet/bip38 is a utility lib, not the wallet.",
  obsidian: "Proprietary, closed-source app; repo obsidianmd/obsidian-releases is releases/plugin-list, not source.",
  photopea: "Proprietary; the photopea/photopea repo is issues-only — the source is not published.",
  "crypton-sh": "Proprietary commercial service; only a small client-side encryption wrapper is open, not the service.",
  notable: "Transitioned to closed-source after v1.5.1; the current app is not open-source (older forks aside).",
}

const APPLY = process.argv.includes("--apply")

async function run() {
  if (!isDatabaseConfigured) {
    console.error("❌ DATABASE_URL not configured")
    process.exit(1)
  }

  const slugs = Object.keys(OPENSOURCE_FALSE_POSITIVES)
  const rows = await db.select().from(tools).where(inArray(tools.slug, slugs))
  const bySlug = new Map(rows.map((r) => [r.slug, r]))

  console.log(`\n=== OPEN-SOURCE FALSE-POSITIVE FIX ${APPLY ? "(APPLY)" : "(DRY-RUN)"} ===\n`)
  console.log("REVIEW GATE — each tool below is being asserted NOT open-source:")
  const toWrite: string[] = []
  for (const slug of slugs) {
    const r = bySlug.get(slug)
    if (!r) {
      console.log(`  ⚠️  ${slug.padEnd(16)} NOT FOUND in this DB — skipping`)
      continue
    }
    const willChange = r.isOpenSource === true
    console.log(
      `  ${willChange ? "→" : "·"} ${slug.padEnd(16)} isOpenSource ${String(r.isOpenSource).padEnd(5)}` +
        `${willChange ? " ⇒ false" : " (already not-true, no-op)"}`,
    )
    console.log(`      ${OPENSOURCE_FALSE_POSITIVES[slug]}`)
    if (willChange) toWrite.push(r.id)
  }

  console.log(`\ntools to change: ${toWrite.length} / ${slugs.length}`)

  if (!APPLY) {
    console.log("\n(dry-run — no writes. re-run with --apply to persist.)")
    process.exit(0)
  }

  let written = 0
  for (const id of toWrite) {
    await db.update(tools).set({ isOpenSource: false, updatedAt: new Date() }).where(inArray(tools.id, [id]))
    written++
  }
  console.log(`\n✅ set isOpenSource=false on ${written} tools.`)
  process.exit(0)
}

run().catch((e) => {
  console.error("💥 fix failed:", e)
  process.exit(1)
})
