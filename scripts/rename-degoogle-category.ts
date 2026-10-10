/**
 * Rename and reposition the V1 "Privacy Frontends" parent category.
 *
 * Display: "De-Google" | Slug: de-google | sort_order: 35 (alphabetical among parents)
 *
 * Usage:
 *   bun --env-file=.env --env-file=.env.local scripts/rename-degoogle-category.ts
 *   bun --env-file=.env --env-file=.env.local scripts/rename-degoogle-category.ts --apply
 */

import { eq, or } from "drizzle-orm"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { categories } from "../src/lib/db/schema"

const OLD_SLUG1 = "alternatives"
const OLD_SLUG2 = "privacy-frontends"
const NEW_SLUG = "de-google"
const NEW_NAME = "De-Google"
const NEW_DESCRIPTION =
  "De-Googled replacements, app stores, and privacy-friendly frontends."
const NEW_SORT_ORDER = 35

const apply = process.argv.includes("--apply")

async function main() {
  if (!isDatabaseConfigured) {
    console.error("Database not configured")
    process.exit(1)
  }

  const [row] = await db
    .select({
      id: categories.id,
      slug: categories.slug,
      name: categories.name,
      label: categories.label,
      sortOrder: categories.sortOrder,
      description: categories.description,
    })
    .from(categories)
    .where(or(eq(categories.slug, OLD_SLUG1), eq(categories.slug, OLD_SLUG2), eq(categories.slug, NEW_SLUG)))
    .limit(1)

  if (!row) {
    console.error(`Category slug "${OLD_SLUG2}" or "${NEW_SLUG}" not found`)
    process.exit(1)
  }

  console.log("De-Google category reposition")
  console.log("═".repeat(60))
  console.log(apply ? "(APPLY MODE)" : "(DRY RUN — pass --apply to execute)")
  console.log("")
  console.log(`  slug:        ${row.slug} -> ${NEW_SLUG}`)
  console.log(`  name:        ${row.name} -> ${NEW_NAME}`)
  console.log(`  label:       ${row.label ?? row.name} -> ${NEW_NAME}`)
  console.log(`  sort_order:  ${row.sortOrder} -> ${NEW_SORT_ORDER}`)
  console.log(`  description: ${NEW_DESCRIPTION}`)

  const alreadyDone =
    row.slug === NEW_SLUG &&
    row.name === NEW_NAME &&
    (row.label ?? row.name) === NEW_NAME &&
    row.sortOrder === NEW_SORT_ORDER

  if (alreadyDone) {
    console.log("\nAlready applied — nothing to do.")
    return
  }

  if (!apply) {
    console.log("\nDry run complete. Re-run with --apply to update.")
    return
  }

  await db
    .update(categories)
    .set({
      slug: NEW_SLUG,
      name: NEW_NAME,
      label: NEW_NAME,
      description: NEW_DESCRIPTION,
      sortOrder: NEW_SORT_ORDER,
      updatedAt: new Date(),
    })
    .where(eq(categories.id, row.id))

  console.log("\nUpdated.")
}

main().catch((err) => {
  console.error("Rename failed:", err)
  process.exit(1)
})
