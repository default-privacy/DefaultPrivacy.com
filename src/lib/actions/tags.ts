"use server"

/**
 * Tag Management Server Actions
 * CRUD operations for the normalized tags system.
 * Replaces the old boolean flags (isOpenSource, acceptsCrypto, etc.)
 */

import { eq, asc, sql, inArray } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db, isDatabaseConfigured } from "@/lib/db"
import { tags, toolsToTags } from "@/lib/db/schema"

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type TagFormData = {
  name: string
  slug?: string
  description?: string
  color?: string
  type?: "attribute" | "platform" | "custom"
  sortOrder?: number
}

export type TagWithCounts = {
  id: string
  name: string
  slug: string
  description: string | null
  color: string | null
  type: "attribute" | "platform" | "custom"
  sortOrder: number
  toolCount: number
  createdAt: Date
  updatedAt: Date
}

// ─── Predefined tags that map to old boolean flags ───────────────────────────

// Predefined tags that map to old boolean flags — used by migration script
// Exported as async to comply with "use server" constraints
export async function getBooleanFlagTags() {
  return [
    { name: "Open Source", slug: "open-source", type: "attribute" as const, color: "#10b981", booleanField: "isOpenSource" },
    { name: "Accepts Crypto", slug: "accepts-crypto", type: "attribute" as const, color: "#f59e0b", booleanField: "acceptsCrypto" },
    { name: "No KYC", slug: "no-kyc", type: "attribute" as const, color: "#8b5cf6", booleanField: "isNoKyc" },
    { name: "Security Audited", slug: "security-audited", type: "attribute" as const, color: "#3b82f6", booleanField: "isSecurityAudited" },
    { name: "Android App", slug: "android-app", type: "platform" as const, color: "#22c55e", booleanField: "hasAndroidApp" },
    { name: "iOS App", slug: "ios-app", type: "platform" as const, color: "#6366f1", booleanField: "hasIosApp" },
  ]
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getAdminTags(): Promise<TagWithCounts[]> {
  if (!isDatabaseConfigured) return []

  try {
    const result = await db
      .select({
        id: tags.id,
        name: tags.name,
        slug: tags.slug,
        description: tags.description,
        color: tags.color,
        type: tags.type,
        sortOrder: tags.sortOrder,
        createdAt: tags.createdAt,
        updatedAt: tags.updatedAt,
        toolCount: sql<number>`(
          SELECT count(*) FROM tools_to_tags 
          WHERE tools_to_tags.tag_id = ${tags.id}
        )`,
      })
      .from(tags)
      .orderBy(asc(tags.type), asc(tags.sortOrder), asc(tags.name))

    return result.map(r => ({
      ...r,
      toolCount: Number(r.toolCount),
    }))
  } catch (error) {
    console.error("[getAdminTags] Failed:", error)
    return []
  }
}

export async function getTagById(id: string) {
  if (!isDatabaseConfigured) return null

  try {
    const result = await db
      .select()
      .from(tags)
      .where(eq(tags.id, id))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error("[getTagById] Failed:", error)
    return null
  }
}

/**
 * Get all tags as a flat list for select/multi-select dropdowns.
 */
export async function getAllTagsFlat() {
  if (!isDatabaseConfigured) return []

  try {
    return await db
      .select({
        id: tags.id,
        name: tags.name,
        slug: tags.slug,
        type: tags.type,
        color: tags.color,
      })
      .from(tags)
      .orderBy(asc(tags.type), asc(tags.sortOrder), asc(tags.name))
  } catch (error) {
    console.error("[getAllTagsFlat] Failed:", error)
    return []
  }
}

/**
 * Get tag IDs assigned to a specific tool.
 */
export async function getToolTagIds(toolId: string): Promise<string[]> {
  if (!isDatabaseConfigured) return []

  try {
    const result = await db
      .select({ tagId: toolsToTags.tagId })
      .from(toolsToTags)
      .where(eq(toolsToTags.toolId, toolId))

    return result.map(r => r.tagId)
  } catch (error) {
    console.error("[getToolTagIds] Failed:", error)
    return []
  }
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export async function createTag(data: TagFormData) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const slug = data.slug || slugify(data.name)

  // Check for duplicate slug
  const existing = await db
    .select({ id: tags.id })
    .from(tags)
    .where(eq(tags.slug, slug))
    .limit(1)

  if (existing.length > 0) {
    throw new Error("A tag with this slug already exists")
  }

  const [tag] = await db
    .insert(tags)
    .values({
      name: data.name,
      slug,
      description: data.description || null,
      color: data.color || "#6b7280",
      type: data.type || "custom",
      sortOrder: data.sortOrder ?? 0,
    })
    .returning()

  revalidatePath("/admin/tags")
  revalidatePath("/directory")
  return tag
}

export async function updateTag(id: string, data: TagFormData) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const slug = data.slug || slugify(data.name)

  // Check for duplicate slug (different tag)
  const existing = await db
    .select({ id: tags.id })
    .from(tags)
    .where(eq(tags.slug, slug))
    .limit(1)

  if (existing.length > 0 && existing[0].id !== id) {
    throw new Error("A tag with this slug already exists")
  }

  const [tag] = await db
    .update(tags)
    .set({
      name: data.name,
      slug,
      description: data.description || null,
      color: data.color || "#6b7280",
      type: data.type || "custom",
      sortOrder: data.sortOrder ?? 0,
      updatedAt: new Date(),
    })
    .where(eq(tags.id, id))
    .returning()

  revalidatePath("/admin/tags")
  revalidatePath("/directory")
  return tag
}

export async function deleteTag(id: string) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  // Cascade deletes junction entries
  await db.delete(toolsToTags).where(eq(toolsToTags.tagId, id))
  await db.delete(tags).where(eq(tags.id, id))

  revalidatePath("/admin/tags")
  revalidatePath("/directory")
  return { success: true }
}

export async function deleteTagsBulk(ids: string[]) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  await db.delete(toolsToTags).where(inArray(toolsToTags.tagId, ids))
  await db.delete(tags).where(inArray(tags.id, ids))

  revalidatePath("/admin/tags")
  revalidatePath("/directory")
  return { success: true }
}

/**
 * Set the tags for a tool (replaces all existing assignments).
 */
export async function setToolTags(toolId: string, tagIds: string[]) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  // Delete existing assignments
  await db.delete(toolsToTags).where(eq(toolsToTags.toolId, toolId))

  // Insert new assignments
  if (tagIds.length > 0) {
    await db.insert(toolsToTags).values(
      tagIds.map(tagId => ({
        toolId,
        tagId,
      }))
    )
  }

  revalidatePath("/admin/tools")
  revalidatePath("/directory")
  return { success: true }
}

/**
 * Merge one tag into another (reassign all tools, then delete source).
 */
export async function mergeTags(sourceId: string, targetId: string) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  if (sourceId === targetId) {
    throw new Error("Cannot merge a tag into itself")
  }

  // Get all tool IDs from source
  const sourceTools = await db
    .select({ toolId: toolsToTags.toolId })
    .from(toolsToTags)
    .where(eq(toolsToTags.tagId, sourceId))

  // Get existing tool IDs on target
  const targetTools = await db
    .select({ toolId: toolsToTags.toolId })
    .from(toolsToTags)
    .where(eq(toolsToTags.tagId, targetId))

  const targetToolIds = new Set(targetTools.map(t => t.toolId))

  // Insert new assignments
  const newAssignments = sourceTools
    .filter(t => !targetToolIds.has(t.toolId))
    .map(t => ({ toolId: t.toolId, tagId: targetId }))

  if (newAssignments.length > 0) {
    await db.insert(toolsToTags).values(newAssignments)
  }

  // Delete source tag
  await db.delete(toolsToTags).where(eq(toolsToTags.tagId, sourceId))
  await db.delete(tags).where(eq(tags.id, sourceId))

  revalidatePath("/admin/tags")
  revalidatePath("/admin/tools")
  revalidatePath("/directory")
  return { success: true, movedTools: newAssignments.length }
}
