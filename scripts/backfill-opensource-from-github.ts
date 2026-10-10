#!/usr/bin/env bun
/**
 * Heuristic backfill: isOpenSource=true  <-  a code-host signal.
 *
 * A Published tool is treated as open-source when EITHER:
 *   - it carries a non-empty `githubUrl`, OR
 *   - its `websiteUrl` host is a well-known source-code host
 *     (github.com | gitlab.com | codeberg.org | sourceforge.net, incl. subdomains).
 *
 * ⚠️ THIS IS A HEURISTIC, NOT PROOF. A closed-source product can still link a GitHub
 * org (a utility lib, an issues-only repo, a releases repo, a small client wrapper).
 * Running this blindly WILL over-flag proprietary tools (it did — Atomic Wallet, Obsidian,
 * Photopea, Crypton.sh, Notable were all wrongly flagged and had to be corrected). The
 * vetted false positives now live in `OPENSOURCE_FALSE_POSITIVES` (fix-opensource-false-positives.ts)
 * and are HARD-EXCLUDED below. When re-running, eyeball the affected slug list before --apply
 * and add any new proprietary-but-github-linking tool to that exclusion set.
 *
 * This lifts only the isOpenSource column; nothing else is inferred.
 *
 * Dry-run by default (reports how many WOULD change, writes nothing). --apply to write.
 * Idempotent: only writes when isOpenSource is not already true.
 *
 *   bun run scripts/backfill-opensource-from-github.ts           # dry-run report
 *   bun run scripts/backfill-opensource-from-github.ts --apply   # write
 */
import { eq } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { tools } from "../src/lib/db/schema"
import { OPENSOURCE_FALSE_POSITIVES } from "./fix-opensource-false-positives"

const APPLY = process.argv.includes("--apply")

// Source-code hosts whose presence in websiteUrl proves open source.
const CODE_HOSTS = ["github.com", "gitlab.com", "codeberg.org", "sourceforge.net"]

function hostIsCodeHost(url: string | null): boolean {
  if (!url) return false
  let host: string
  try {
    host = new URL(url).hostname.toLowerCase()
  } catch {
    return false
  }
  if (host.startsWith("www.")) host = host.slice(4)
  // exact host or a subdomain of a code host (e.g. pages.github.com)
  return CODE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`))
}

function hasGithubUrl(url: string | null): boolean {
  return typeof url === "string" && url.trim().length > 0
}

async function run() {
  if (!isDatabaseConfigured) {
    console.error("❌ DATABASE_URL not configured")
    process.exit(1)
  }

  const rows = await db.select().from(tools).where(eq(tools.status, "Published"))

  let byGithub = 0
  let byHost = 0
  let excluded = 0
  const toWrite: string[] = []

  for (const row of rows) {
    if (row.isOpenSource === true) continue // idempotent guard
    if (OPENSOURCE_FALSE_POSITIVES[row.slug]) { excluded++; continue } // vetted proprietary — never re-flag
    const github = hasGithubUrl(row.githubUrl)
    const codeHost = hostIsCodeHost(row.websiteUrl)
    if (!github && !codeHost) continue
    if (github) byGithub++
    else if (codeHost) byHost++
    toWrite.push(row.id)
  }

  console.log(`\n=== OPEN-SOURCE BACKFILL ${APPLY ? "(APPLY)" : "(DRY-RUN)"} ===`)
  console.log(`published tools: ${rows.length}\n`)
  console.log("tools needing isOpenSource=true:")
  console.log(`  ${String(byGithub).padStart(4)}  by github_url (non-empty)`)
  console.log(`  ${String(byHost).padStart(4)}  by websiteUrl host (${CODE_HOSTS.join(" | ")})`)
  console.log(`  ${String(excluded).padStart(4)}  EXCLUDED as vetted-proprietary (see OPENSOURCE_FALSE_POSITIVES)`)
  console.log(`\ndistinct tools to write: ${toWrite.length}`)

  if (!APPLY) {
    console.log("\n(dry-run — no writes. re-run with --apply to persist.)")
    process.exit(0)
  }

  let written = 0
  for (const id of toWrite) {
    await db.update(tools).set({ isOpenSource: true, updatedAt: new Date() }).where(eq(tools.id, id))
    written++
  }
  console.log(`\n✅ wrote ${written} tools.`)
  process.exit(0)
}

run().catch((e) => {
  console.error("💥 backfill failed:", e)
  process.exit(1)
})
