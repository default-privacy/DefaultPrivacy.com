/**
 * Apply De-Google subcategory taxonomy:
 *   App Stores, Web Frontends, Media Clients, Voice Assistants
 *
 * Usage:
 *   bun --env-file=.env --env-file=.env.local scripts/setup-degoogle-subcategories.ts
 *   bun --env-file=.env --env-file=.env.local scripts/setup-degoogle-subcategories.ts --apply
 */

import { and, eq, inArray } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { categories, tools, toolsToCategories } from "../src/lib/db/schema"

const apply = process.argv.includes("--apply")

const SUBCATEGORIES = [
  {
    slug: "app-stores",
    name: "App Stores",
    description: "De-Googled app stores and F-Droid clients.",
    sortOrder: 10,
  },
  {
    slug: "web-frontends",
    name: "Web Frontends",
    description: "Privacy-friendly frontends to Big Tech web services.",
    sortOrder: 20,
  },
  {
    slug: "media-clients",
    name: "Media Clients",
    description: "Native apps that replace YouTube and other Big Tech media apps.",
    sortOrder: 30,
  },
  {
    slug: "voice-assistants",
    name: "Voice Assistants",
    description: "Self-hosted and open alternatives to Alexa and Google Assistant.",
    sortOrder: 40,
  },
] as const

/** tool slug -> target subcategory slug */
const TOOL_TARGETS: Record<string, string> = {
  "f-droid": "app-stores",
  accrescent: "app-stores",
  "aurora-store": "app-stores",
  "droid-ify": "app-stores",
  obtainium: "app-stores",
  invidious: "web-frontends",
  nitter: "web-frontends",
  newpipe: "media-clients",
  freetube: "media-clients",
  mycroft: "voice-assistants",
  kalliope: "voice-assistants",
}

/** Old category slugs to remove when re-homing a tool. */
const REMOVE_FROM: Record<string, string[]> = {
  "f-droid": ["mobile-security-apps"],
  invidious: ["proxy-sites"],
  nitter: ["proxy-sites"],
  newpipe: ["streaming-and-media-players"],
  freetube: ["streaming-and-media-players"],
}

async function main() {
  if (!isDatabaseConfigured) {
    console.error("Database not configured")
    process.exit(1)
  }

  const [parent] = await db
    .select({ id: categories.id, slug: categories.slug, name: categories.name })
    .from(categories)
    .where(eq(categories.slug, "de-google"))
    .limit(1)

  if (!parent) {
    console.error("de-google parent not found")
    process.exit(1)
  }

  console.log("De-Google subcategory taxonomy")
  console.log("═".repeat(60))
  console.log(apply ? "(APPLY MODE)" : "(DRY RUN — pass --apply to execute)")
  console.log(`Parent: ${parent.name} (${parent.slug})\n`)

  const categoryBySlug = new Map<string, { id: string; slug: string; name: string }>()

  for (const sub of SUBCATEGORIES) {
    const [existing] = await db
      .select({ id: categories.id, slug: categories.slug, name: categories.name, parentId: categories.parentId, visibility: categories.visibility })
      .from(categories)
      .where(eq(categories.slug, sub.slug))
      .limit(1)

    console.log(`Subcategory: ${sub.name} (${sub.slug})`)
    if (existing) {
      console.log(`  exists: parent=${existing.parentId ?? "null"} vis=${existing.visibility}`)
      console.log(`  -> parent=${parent.id} vis=public sort=${sub.sortOrder}`)
      categoryBySlug.set(sub.slug, { id: existing.id, slug: sub.slug, name: sub.name })

      if (apply) {
        await db
          .update(categories)
          .set({
            name: sub.name,
            label: sub.name,
            description: sub.description,
            parentId: parent.id,
            visibility: "public",
            sortOrder: sub.sortOrder,
            updatedAt: new Date(),
          })
          .where(eq(categories.id, existing.id))
      }
    } else {
      const id = `de-google-${sub.slug}`
      console.log(`  create: id=${id}`)
      categoryBySlug.set(sub.slug, { id, slug: sub.slug, name: sub.name })

      if (apply) {
        await db.insert(categories).values({
          id,
          name: sub.name,
          slug: sub.slug,
          label: sub.name,
          description: sub.description,
          parentId: parent.id,
          visibility: "public",
          sortOrder: sub.sortOrder,
        })
      }
    }
    console.log("")
  }

  const toolSlugs = Object.keys(TOOL_TARGETS)
  const toolRows = await db
    .select({ id: tools.id, slug: tools.slug, name: tools.name })
    .from(tools)
    .where(and(eq(tools.status, "Published"), inArray(tools.slug, toolSlugs)))

  const missingTools = toolSlugs.filter((s) => !toolRows.some((t) => t.slug === s))
  if (missingTools.length > 0) {
    console.log("Missing tools:", missingTools.join(", "))
  }

  console.log("Tool moves:")
  const inserts: { toolId: string; categoryId: string; toolSlug: string; catSlug: string }[] = []
  const deletes: { toolId: string; categoryId: string; toolSlug: string; catSlug: string }[] = []

  for (const tool of toolRows) {
    const targetSlug = TOOL_TARGETS[tool.slug]
    const target = categoryBySlug.get(targetSlug)
    if (!target) {
      console.log(`  SKIP ${tool.slug}: target ${targetSlug} not resolved`)
      continue
    }

    const existingLinks = await db
      .select({ categoryId: toolsToCategories.categoryId, slug: categories.slug })
      .from(toolsToCategories)
      .innerJoin(categories, eq(toolsToCategories.categoryId, categories.id))
      .where(eq(toolsToCategories.toolId, tool.id))

    const hasTarget = existingLinks.some((l) => l.slug === targetSlug)
    const removeSlugs = REMOVE_FROM[tool.slug] ?? []
    const toRemove = existingLinks.filter((l) => removeSlugs.includes(l.slug))

    console.log(
      `  ${tool.slug.padEnd(14)} -> ${targetSlug}${hasTarget ? " (already linked)" : ""}${toRemove.length ? `  remove: ${toRemove.map((r) => r.slug).join(", ")}` : ""}`,
    )

    if (!hasTarget) {
      inserts.push({ toolId: tool.id, categoryId: target.id, toolSlug: tool.slug, catSlug: targetSlug })
    }
    for (const r of toRemove) {
      deletes.push({ toolId: tool.id, categoryId: r.categoryId, toolSlug: tool.slug, catSlug: r.slug })
    }
  }

  console.log(`\nLinks to insert: ${inserts.length}`)
  console.log(`Links to remove: ${deletes.length}`)

  if (!apply) {
    console.log("\nDry run complete. Re-run with --apply to execute.")
    return
  }

  if (inserts.length > 0) {
    await db
      .insert(toolsToCategories)
      .values(inserts.map((i) => ({ toolId: i.toolId, categoryId: i.categoryId })))
      .onConflictDoNothing()
  }

  for (const d of deletes) {
    await db
      .delete(toolsToCategories)
      .where(and(eq(toolsToCategories.toolId, d.toolId), eq(toolsToCategories.categoryId, d.categoryId)))
  }

  console.log("\nDone.")
}

main().catch((err) => {
  console.error("Apply failed:", err)
  process.exit(1)
})
