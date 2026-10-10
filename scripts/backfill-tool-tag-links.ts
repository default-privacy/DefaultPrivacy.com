#!/usr/bin/env bun

/**
 * Backfill normalized tool→tag links from the tools table's fact booleans.
 *
 * Why this exists:
 * - The V2 backup carried per-tool fact flags (isOpenSource, isNoKyc,
 *   acceptsCrypto, isSecurityAudited) but no tool↔tag join rows, so
 *   `tools_to_tags` seeded empty.
 * - The directory's facet chips, sidebar tag filters, and card badge pills all
 *   read normalized tags (`getPublicTags` / `getToolCategoryTagMap`) — without
 *   links they render nothing.
 * - This script derives the links from the booleans already in the DB. No
 *   backup file needed.
 *
 * Usage:
 *   bun run scripts/backfill-tool-tag-links.ts --dry-run   (default: dry run)
 *   bun run scripts/backfill-tool-tag-links.ts --apply
 */

import { eq } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { tags, tools, toolsToTags } from "../src/lib/db/schema"

const apply = process.argv.slice(2).includes("--apply")

const FACT_TAGS = [
  { column: "isOpenSource", slug: "open-source", name: "Open Source" },
  { column: "isNoKyc", slug: "no-kyc", name: "No KYC" },
  { column: "acceptsCrypto", slug: "accepts-crypto", name: "Accepts Crypto" },
  { column: "isSecurityAudited", slug: "security-audited", name: "Security Audited" },
] as const

async function ensureTag(slug: string, name: string): Promise<string> {
  const existing = await db.query.tags.findFirst({ where: eq(tags.slug, slug) })
  if (existing) return existing.id

  if (!apply) {
    console.log(`   [dry-run] would create tag "${name}" (${slug})`)
    return `dry-run:${slug}`
  }

  const [created] = await db
    .insert(tags)
    .values({ name, slug, type: "attribute" })
    .returning({ id: tags.id })
  console.log(`   ✚ created tag "${name}" (${slug})`)
  return created.id
}

async function main() {
  if (!isDatabaseConfigured) {
    console.error("❌ DATABASE_URL not configured")
    process.exit(1)
  }

  console.log(apply ? "🔧 APPLY mode — writing links" : "🔍 DRY RUN — no writes (--apply to write)")

  const allTools = await db
    .select({
      id: tools.id,
      isOpenSource: tools.isOpenSource,
      isNoKyc: tools.isNoKyc,
      acceptsCrypto: tools.acceptsCrypto,
      isSecurityAudited: tools.isSecurityAudited,
    })
    .from(tools)

  console.log(`   ${allTools.length} tools loaded`)

  for (const fact of FACT_TAGS) {
    const tagId = await ensureTag(fact.slug, fact.name)
    const matching = allTools.filter((t) => t[fact.column] === true)

    if (!apply) {
      console.log(`   [dry-run] ${fact.slug}: would link ${matching.length} tools`)
      continue
    }

    let linked = 0
    for (const tool of matching) {
      const inserted = await db
        .insert(toolsToTags)
        .values({ toolId: tool.id, tagId })
        .onConflictDoNothing()
        .returning({ toolId: toolsToTags.toolId })
      if (inserted.length > 0) linked++
    }
    console.log(`   ✅ ${fact.slug}: ${linked} new links (${matching.length - linked} already existed)`)
  }

  console.log("Done.")
  process.exit(0)
}

main().catch((error) => {
  console.error("❌ Backfill failed:", error)
  process.exit(1)
})
