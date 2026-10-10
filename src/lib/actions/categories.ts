"use server"

/**
 * Category Management Server Actions
 * CRUD operations for the normalized categories system.
 */

import { eq, isNull, asc, sql, inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db, isDatabaseConfigured } from "@/lib/db"
import { categories, toolsToCategories } from "@/lib/db/schema"

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type CategoryFormData = {
  name: string
  slug?: string
  label?: string
  description?: string
  parentId?: string | null
  sortOrder?: number
}

export type CategoryWithCounts = {
  id: string
  name: string
  slug: string
  label: string | null
  description: string | null
  parentId: string | null
  sortOrder: number
  createdAt: Date
  updatedAt: Date
  toolCount: number
  children?: CategoryWithCounts[]
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getAdminCategories(): Promise<CategoryWithCounts[]> {
  if (!isDatabaseConfigured) return []

  try {
    // Get all categories with tool counts
    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        label: categories.label,
        description: categories.description,
        parentId: categories.parentId,
        sortOrder: categories.sortOrder,
        createdAt: categories.createdAt,
        updatedAt: categories.updatedAt,
        toolCount: sql<number>`(
          SELECT count(*) FROM tools_to_categories 
          WHERE tools_to_categories.category_id = ${categories.id}
        )`,
      })
      .from(categories)
      .orderBy(asc(categories.sortOrder), asc(categories.name))

    // Build tree structure
    const rootCategories: CategoryWithCounts[] = []
    const childMap = new Map<string, CategoryWithCounts[]>()

    for (const cat of result) {
      const category: CategoryWithCounts = {
        ...cat,
        toolCount: Number(cat.toolCount),
        children: [],
      }

      if (cat.parentId) {
        const siblings = childMap.get(cat.parentId) || []
        siblings.push(category)
        childMap.set(cat.parentId, siblings)
      } else {
        rootCategories.push(category)
      }
    }

    // Attach children to parents
    for (const root of rootCategories) {
      root.children = childMap.get(root.id) || []
    }

    return rootCategories
  } catch (error) {
    console.error("[getAdminCategories] Failed:", error)
    return []
  }
}

export async function getCategoryById(id: string) {
  if (!isDatabaseConfigured) return null

  try {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error("[getCategoryById] Failed:", error)
    return null
  }
}

export async function getParentCategories() {
  if (!isDatabaseConfigured) return []

  try {
    return await db
      .select({ id: categories.id, name: categories.name, slug: categories.slug })
      .from(categories)
      .where(isNull(categories.parentId))
      .orderBy(asc(categories.sortOrder), asc(categories.name))
  } catch (error) {
    console.error("[getParentCategories] Failed:", error)
    return []
  }
}

/**
 * Get all categories as a flat list with parent name for select dropdowns.
 */
export async function getAllCategoriesFlat() {
  if (!isDatabaseConfigured) return []

  try {
    const allCats = await db
      .select()
      .from(categories)
      .orderBy(asc(categories.sortOrder), asc(categories.name))

    const parentMap = new Map(allCats.filter(c => !c.parentId).map(c => [c.id, c.name]))

    return allCats.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
      parentName: cat.parentId ? parentMap.get(cat.parentId) || null : null,
      displayName: cat.parentId
        ? `${parentMap.get(cat.parentId) || "?"} > ${cat.name}`
        : cat.name,
    }))
  } catch (error) {
    console.error("[getAllCategoriesFlat] Failed:", error)
    return []
  }
}

/**
 * Get category IDs assigned to a specific tool.
 */
export async function getToolCategoryIds(toolId: string): Promise<string[]> {
  if (!isDatabaseConfigured) return []

  try {
    const result = await db
      .select({ categoryId: toolsToCategories.categoryId })
      .from(toolsToCategories)
      .where(eq(toolsToCategories.toolId, toolId))

    return result.map(r => r.categoryId)
  } catch (error) {
    console.error("[getToolCategoryIds] Failed:", error)
    return []
  }
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export async function createCategory(data: CategoryFormData) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const slug = data.slug || slugify(data.name)

  // Check for duplicate slug
  const existing = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1)

  if (existing.length > 0) {
    throw new Error("A category with this slug already exists")
  }

  const [category] = await db
    .insert(categories)
    .values({
      name: data.name,
      slug,
      label: data.label || null,
      description: data.description || null,
      parentId: data.parentId || null,
      sortOrder: data.sortOrder ?? 0,
    })
    .returning()

  revalidatePath("/admin/categories")
  revalidatePath("/directory")
  return category
}

export async function updateCategory(id: string, data: CategoryFormData) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const slug = data.slug || slugify(data.name)

  // Check for duplicate slug (different category)
  const existing = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.slug, slug))
    .limit(1)

  if (existing.length > 0 && existing[0].id !== id) {
    throw new Error("A category with this slug already exists")
  }

  // Prevent circular reference (can't be own parent)
  if (data.parentId === id) {
    throw new Error("A category cannot be its own parent")
  }

  const [category] = await db
    .update(categories)
    .set({
      name: data.name,
      slug,
      label: data.label || null,
      description: data.description || null,
      parentId: data.parentId || null,
      sortOrder: data.sortOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(categories.id, id))
    .returning()

  revalidatePath("/admin/categories")
  revalidatePath("/directory")
  return category
}

export async function deleteCategory(id: string) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  // Check if category has children
  const children = await db
    .select({ id: categories.id })
    .from(categories)
    .where(eq(categories.parentId, id))
    .limit(1)

  if (children.length > 0) {
    throw new Error("Cannot delete a category that has subcategories. Delete or reassign subcategories first.")
  }

  // Delete junction entries first (cascade should handle this, but be explicit)
  await db.delete(toolsToCategories).where(eq(toolsToCategories.categoryId, id))
  await db.delete(categories).where(eq(categories.id, id))

  revalidatePath("/admin/categories")
  revalidatePath("/directory")
  return { success: true }
}

export async function deleteCategoriesBulk(ids: string[]) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  // Check for children
  const children = await db
    .select({ parentId: categories.parentId })
    .from(categories)
    .where(inArray(categories.parentId, ids))
    .limit(1)

  if (children.length > 0) {
    throw new Error("Cannot bulk delete: some categories have subcategories.")
  }

  await db.delete(toolsToCategories).where(inArray(toolsToCategories.categoryId, ids))
  await db.delete(categories).where(inArray(categories.id, ids))

  revalidatePath("/admin/categories")
  revalidatePath("/directory")
  return { success: true }
}

/**
 * Set the categories for a tool (replaces all existing assignments).
 */
export async function setToolCategories(toolId: string, categoryIds: string[]) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  // Delete existing assignments
  await db.delete(toolsToCategories).where(eq(toolsToCategories.toolId, toolId))

  // Insert new assignments
  if (categoryIds.length > 0) {
    await db.insert(toolsToCategories).values(
      categoryIds.map(categoryId => ({
        toolId,
        categoryId,
      }))
    )
  }

  revalidatePath("/admin/tools")
  revalidatePath("/directory")
  return { success: true }
}

/**
 * Merge one category into another (reassign all tools, then delete source).
 */
export async function mergeCategories(sourceId: string, targetId: string) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  if (sourceId === targetId) {
    throw new Error("Cannot merge a category into itself")
  }

  // Get all tool IDs from source
  const sourceTools = await db
    .select({ toolId: toolsToCategories.toolId })
    .from(toolsToCategories)
    .where(eq(toolsToCategories.categoryId, sourceId))

  // Get existing tool IDs on target (to avoid duplicates)
  const targetTools = await db
    .select({ toolId: toolsToCategories.toolId })
    .from(toolsToCategories)
    .where(eq(toolsToCategories.categoryId, targetId))

  const targetToolIds = new Set(targetTools.map(t => t.toolId))

  // Insert new assignments (only tools not already on target)
  const newAssignments = sourceTools
    .filter(t => !targetToolIds.has(t.toolId))
    .map(t => ({ toolId: t.toolId, categoryId: targetId }))

  if (newAssignments.length > 0) {
    await db.insert(toolsToCategories).values(newAssignments)
  }

  // Move any children of source to target
  await db
    .update(categories)
    .set({ parentId: targetId, updatedAt: new Date() })
    .where(eq(categories.parentId, sourceId))

  // Delete source category (cascade will clean up junction)
  await db.delete(toolsToCategories).where(eq(toolsToCategories.categoryId, sourceId))
  await db.delete(categories).where(eq(categories.id, sourceId))

  revalidatePath("/admin/categories")
  revalidatePath("/admin/tools")
  revalidatePath("/directory")
  return { success: true, movedTools: newAssignments.length }
}
