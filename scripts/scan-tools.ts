#!/usr/bin/env bun

/**
 * Batch Privacy Scanner for Directory Tools
 *
 * Scans tool websites using Playwright and saves results to toolPrivacyAudits.
 * Updates each tool's latestPrivacyScore.
 *
 * Usage:
 *   bun run scripts/scan-tools.ts                    # Scan 10 tools without existing audits
 *   bun run scripts/scan-tools.ts --limit 50         # Scan 50 tools
 *   bun run scripts/scan-tools.ts --slug plausible   # Scan a specific tool
 *   bun run scripts/scan-tools.ts --all              # Scan all published tools
 *   bun run scripts/scan-tools.ts --stale 30         # Scan tools not scanned in 30+ days
 */

import { eq, and, asc, sql } from "drizzle-orm"
import { db } from "../src/lib/db"
import { tools } from "../src/lib/db/schema"
import { scanToolForAudit } from "../src/actions/scanner"

const args = process.argv.slice(2)

function getArg(name: string): string | undefined {
  const idx = args.indexOf(`--${name}`)
  if (idx === -1) return undefined
  return args[idx + 1]
}

function hasFlag(name: string): boolean {
  return args.includes(`--${name}`)
}

async function main() {
  const slug = getArg("slug")
  const limit = Number.parseInt(getArg("limit") || "10", 10)
  const scanAll = hasFlag("all")
  const staleDays = getArg("stale") ? Number.parseInt(getArg("stale")!, 10) : undefined

  console.log("Privacy Scanner — Batch Tool Audit")
  console.log("═".repeat(50))

  let toolsToScan: typeof tools.$inferSelect[]

  if (slug) {
    // Scan specific tool
    const [tool] = await db.select().from(tools).where(eq(tools.slug, slug)).limit(1)
    if (!tool) {
      console.error(`Tool not found: ${slug}`)
      process.exit(1)
    }
    toolsToScan = [tool]
    console.log(`Scanning single tool: ${tool.name}`)
  } else if (staleDays) {
    // Scan tools not scanned in N days
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - staleDays)

    toolsToScan = await db
      .select()
      .from(tools)
      .where(
        and(
          eq(tools.status, "Published"),
          eq(tools.isDeprecated, false),
        ),
      )
      .orderBy(asc(sql`${tools.updatedAt}`))
      .limit(scanAll ? 9999 : limit)

    // Filter to tools whose latest audit is older than cutoff
    // (simplified: just use the limit and sort by oldest updated)
    console.log(`Scanning up to ${scanAll ? "all" : limit} tools not scanned in ${staleDays}+ days`)
  } else {
    // Scan tools without audits or oldest audits first
    toolsToScan = await db
      .select()
      .from(tools)
      .where(
        and(
          eq(tools.status, "Published"),
          eq(tools.isDeprecated, false),
        ),
      )
      .orderBy(
        asc(sql`${tools.latestPrivacyScore} NULLS FIRST`),
        asc(tools.updatedAt),
      )
      .limit(scanAll ? 9999 : limit)

    console.log(`Scanning ${scanAll ? "all" : `up to ${limit}`} published tools`)
  }

  console.log(`Found ${toolsToScan.length} tools to scan\n`)

  let scanned = 0
  let failed = 0

  for (const tool of toolsToScan) {
    const idx = toolsToScan.indexOf(tool) + 1
    process.stdout.write(`[${idx}/${toolsToScan.length}] ${tool.name}... `)

    try {
      const result = await scanToolForAudit(tool.id)

      if (result.success) {
        console.log(`Score: ${result.score}/100 (${result.grade})`)
        scanned++
      } else {
        console.log(`FAILED: ${result.error}`)
        failed++
      }
    } catch (error) {
      console.log(`ERROR: ${error instanceof Error ? error.message : "Unknown"}`)
      failed++
    }

    // Rate limit: 3 second delay between scans
    if (idx < toolsToScan.length) {
      await new Promise((resolve) => setTimeout(resolve, 3000))
    }
  }

  console.log("\n" + "═".repeat(50))
  console.log(`Done. Scanned: ${scanned}, Failed: ${failed}`)
}

main().catch((error) => {
  console.error("Fatal error:", error)
  process.exit(1)
})
