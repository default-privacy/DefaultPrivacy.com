/**
 * Targeted rescue of tools that are accidentally archived-only after the
 * V4 -> V1 category overhaul.
 *
 * Why this exists:
 *   The directory overhaul filters published tools by category visibility,
 *   so tools linked only to archived categories (FOSS image editors, etc.)
 *   are hidden from the public directory. The bulk backfill script would
 *   resurrect 29 currently-archived-only tools by matching their backup
 *   `mainCategory` against the V1 parent names. Of those 29:
 *     - ~23 are real privacy tools (Wyoming agents, offshore protection,
 *       de-Googled app stores, privacy-respecting laptops, privacy podcasts)
 *       that should be public.
 *     - ~6 are generic FOSS (Calibre, WordPress, Ghost, etc.) that match
 *       the "not a privacy tool" archive intent and should stay archived.
 *
 *   Auto-running the bulk backfill would un-archive the wrong ones too.
 *   This script applies only an explicit, slug-by-slug allow list.
 *
 * Usage:
 *   bun --env-file=.env --env-file=.env.local scripts/rescue-misarchived-tools.ts
 *   bun --env-file=.env --env-file=.env.local scripts/rescue-misarchived-tools.ts --apply
 */

import { and, eq, ilike, inArray } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { categories, tools, toolsToCategories } from "../src/lib/db/schema"

const args = process.argv.slice(2)
const apply = args.includes("--apply")

/**
 * Slug -> target V1 parent slug.
 * Each entry is a deliberate decision: the tool is privacy-aligned and
 * should be visible under the listed parent category. The script adds a
 * tools_to_categories row pointing at the parent; sub-category curation
 * is a separate, manual step.
 */
const RESCUE_PLAN: Record<string, string> = {
  // De-Googled / FOSS app stores — App Stores under De-Google
  accrescent: "app-stores",
  "aurora-store": "app-stores",
  "droid-ify": "app-stores",
  obtainium: "app-stores",

  // Privacy services / legal shields / offshore — Protection
  "belize-bank-international": "protection",
  "blake-harris-law": "protection",
  "business-setup-worldwide": "protection",
  "caye-international-bank": "protection",
  "destination-freedom": "protection",
  "global-wealth-protection": "protection",
  "law-4-small-business": "protection",
  layroots: "protection",
  "nomad-capitalist": "protection",
  "offshore-citizen": "protection",
  "offshore-protection": "protection",
  "trust-and-will": "protection",
  "wyoming-agents": "protection",

  // Privacy education content — Resources
  "escape-the-technocracy": "resources",
  "go-incognito": "resources",
  "privacy-academy": "resources",
  "privacy-and-security-brainiacs": "resources",

  // Privacy-respecting hardware vendors — Hardware
  "system76-thelio": "hardware",
  "tuxedo-computers": "hardware",
}

/**
 * Slugs intentionally left in the archived-only bucket. Documented so future
 * runs do not "rescue" them by accident. These match the AlternativeTo-style
 * FOSS-but-not-privacy-core rationale (image/PDF readers, generic blogging).
 */
const INTENTIONALLY_ARCHIVED: string[] = [
  "calibre",
  "okular",
  "sumatrapdf",
  "wordpress",
  "ghost",
  "write-as",
]

async function main() {
  if (!isDatabaseConfigured) {
    console.error("Database not configured")
    process.exit(1)
  }

  console.log("Tool Rescue — Targeted Allow-List Backfill")
  console.log("═".repeat(60))
  console.log(apply ? "(APPLY MODE — will write to DB)" : "(DRY RUN — pass --apply to execute)")
  console.log(`Plan size: ${Object.keys(RESCUE_PLAN).length} tools`)
  console.log(`Intentionally archived (skipped): ${INTENTIONALLY_ARCHIVED.length} tools`)
  console.log("")

  const slugs = Object.keys(RESCUE_PLAN)
  const parentSlugs = [...new Set(Object.values(RESCUE_PLAN))]

  const [toolRows, parentRows] = await Promise.all([
    db
      .select({ id: tools.id, slug: tools.slug, name: tools.name, status: tools.status })
      .from(tools)
      .where(inArray(tools.slug, slugs)),
    db
      .select({ id: categories.id, slug: categories.slug, visibility: categories.visibility })
      .from(categories)
      .where(and(inArray(categories.slug, parentSlugs), eq(categories.visibility, "public"))),
  ])

  const toolBySlug = new Map(toolRows.map((t) => [t.slug.toLowerCase(), t]))
  const parentBySlug = new Map(parentRows.map((c) => [c.slug, c]))

  const missingTools: string[] = []
  const missingParents: string[] = []
  const inserts: { toolId: string; categoryId: string; toolSlug: string; parentSlug: string; status: string }[] = []
  const alreadyLinked: { toolSlug: string; parentSlug: string }[] = []

  const existingLinkRows = await db
    .select({ toolId: toolsToCategories.toolId, categoryId: toolsToCategories.categoryId })
    .from(toolsToCategories)
  const existingPairs = new Set(existingLinkRows.map((r) => `${r.toolId}:${r.categoryId}`))

  for (const [toolSlug, parentSlug] of Object.entries(RESCUE_PLAN)) {
    const t = toolBySlug.get(toolSlug.toLowerCase())
    if (!t) {
      // Case-insensitive secondary lookup in case backup slugs use PascalCase
      const ci = await db
        .select({ id: tools.id, slug: tools.slug, name: tools.name, status: tools.status })
        .from(tools)
        .where(ilike(tools.slug, toolSlug))
        .limit(1)
      if (ci.length === 0) {
        missingTools.push(toolSlug)
        continue
      }
      toolBySlug.set(toolSlug.toLowerCase(), ci[0])
    }
    const tool = toolBySlug.get(toolSlug.toLowerCase())!
    const parent = parentBySlug.get(parentSlug)
    if (!parent) {
      missingParents.push(parentSlug)
      continue
    }

    const pairKey = `${tool.id}:${parent.id}`
    if (existingPairs.has(pairKey)) {
      alreadyLinked.push({ toolSlug: tool.slug, parentSlug })
      continue
    }

    inserts.push({
      toolId: tool.id,
      categoryId: parent.id,
      toolSlug: tool.slug,
      parentSlug,
      status: tool.status,
    })
  }

  console.log("PLAN")
  console.log("─".repeat(60))
  for (const i of inserts) {
    const flag = i.status === "Published" ? "[Published]" : `[${i.status}]    `
    console.log(`  ${flag} ${i.toolSlug.padEnd(38)} -> ${i.parentSlug}`)
  }
  if (alreadyLinked.length > 0) {
    console.log("\nALREADY LINKED (no action)")
    for (const a of alreadyLinked) console.log(`  ${a.toolSlug.padEnd(38)} -> ${a.parentSlug}`)
  }
  if (missingTools.length > 0) {
    console.log("\nMISSING TOOLS (slug not found in DB)")
    for (const s of missingTools) console.log(`  ${s}`)
  }
  if (missingParents.length > 0) {
    console.log("\nMISSING PUBLIC PARENT CATEGORIES")
    for (const s of missingParents) console.log(`  ${s}`)
  }

  console.log("")
  console.log(`Links to insert: ${inserts.length}`)
  console.log(`Already linked:  ${alreadyLinked.length}`)
  console.log(`Missing tools:   ${missingTools.length}`)
  console.log(`Missing parents: ${missingParents.length}`)

  if (!apply) {
    console.log("\nDry run complete. Re-run with --apply to insert the links.")
    return
  }

  if (inserts.length === 0) {
    console.log("\nNothing to insert.")
    return
  }

  await db
    .insert(toolsToCategories)
    .values(inserts.map((i) => ({ toolId: i.toolId, categoryId: i.categoryId })))
    .onConflictDoNothing()

  console.log(`\nInserted ${inserts.length} link(s).`)
}

main().catch((err) => {
  console.error("Rescue failed:", err)
  process.exit(1)
})
