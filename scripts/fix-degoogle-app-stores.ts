/**
 * Move De-Google app store tools under the App Stores subcategory.
 *
 * The rescue script linked Accrescent, Aurora Store, Droid-ify, and Obtainium
 * at the parent level, which made the sidebar show "De-Google > De-Google".
 *
 * Usage:
 *   bun --env-file=.env --env-file=.env.local scripts/fix-degoogle-app-stores.ts
 *   bun --env-file=.env --env-file=.env.local scripts/fix-degoogle-app-stores.ts --apply
 */

import { and, eq, inArray } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { categories, tools, toolsToCategories } from "../src/lib/db/schema"

const APP_STORE_TOOL_SLUGS = ["accrescent", "aurora-store", "droid-ify", "obtainium"]
const apply = process.argv.includes("--apply")

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
    console.error("de-google parent category not found")
    process.exit(1)
  }

  const [appStores] = await db
    .select({ id: categories.id, slug: categories.slug, name: categories.name, visibility: categories.visibility, parentId: categories.parentId })
    .from(categories)
    .where(eq(categories.slug, "app-stores"))
    .limit(1)

  if (!appStores) {
    console.error("app-stores category not found")
    process.exit(1)
  }

  const toolRows = await db
    .select({ id: tools.id, slug: tools.slug, name: tools.name })
    .from(tools)
    .where(inArray(tools.slug, APP_STORE_TOOL_SLUGS))

  const linkRows = await db
    .select({
      toolId: toolsToCategories.toolId,
      categoryId: toolsToCategories.categoryId,
    })
    .from(toolsToCategories)
    .where(
      and(
        inArray(
          toolsToCategories.toolId,
          toolRows.map((t) => t.id),
        ),
        inArray(toolsToCategories.categoryId, [parent.id, appStores.id]),
      ),
    )

  const parentLinks = linkRows.filter((l) => l.categoryId === parent.id)
  const appStoreLinks = linkRows.filter((l) => l.categoryId === appStores.id)

  console.log("De-Google > App Stores fix")
  console.log("═".repeat(60))
  console.log(apply ? "(APPLY MODE)" : "(DRY RUN — pass --apply to execute)")
  console.log("")
  console.log(`Parent:     ${parent.name} (${parent.slug})`)
  console.log(`Subcategory: ${appStores.name} (${appStores.slug})`)
  console.log(`  visibility: ${appStores.visibility} -> public`)
  console.log(`  parent_id:  ${appStores.parentId ?? "null"} -> ${parent.id}`)
  console.log("")
  console.log(`Tools found: ${toolRows.length}/${APP_STORE_TOOL_SLUGS.length}`)
  console.log(`Parent links to remove: ${parentLinks.length}`)
  console.log(`App Stores links to ensure: ${toolRows.length - appStoreLinks.length} missing`)

  for (const tool of toolRows) {
    const hasParent = parentLinks.some((l) => l.toolId === tool.id)
    const hasAppStores = appStoreLinks.some((l) => l.toolId === tool.id)
    console.log(`  ${tool.slug.padEnd(14)} parent=${hasParent ? "yes" : "no"}  app-stores=${hasAppStores ? "yes" : "no"}`)
  }

  if (!apply) {
    console.log("\nDry run complete. Re-run with --apply to execute.")
    return
  }

  await db
    .update(categories)
    .set({
      name: "App Stores",
      label: "App Stores",
      parentId: parent.id,
      visibility: "public",
      updatedAt: new Date(),
    })
    .where(eq(categories.id, appStores.id))

  if (parentLinks.length > 0) {
    await db
      .delete(toolsToCategories)
      .where(
        and(
          inArray(
            toolsToCategories.toolId,
            parentLinks.map((l) => l.toolId),
          ),
          eq(toolsToCategories.categoryId, parent.id),
        ),
      )
  }

  const missingAppStoreLinks = toolRows
    .filter((tool) => !appStoreLinks.some((l) => l.toolId === tool.id))
    .map((tool) => ({ toolId: tool.id, categoryId: appStores.id }))

  if (missingAppStoreLinks.length > 0) {
    await db.insert(toolsToCategories).values(missingAppStoreLinks).onConflictDoNothing()
  }

  console.log("\nDone.")
}

main().catch((err) => {
  console.error("Fix failed:", err)
  process.exit(1)
})
