"use server"

import { revalidatePath } from "next/cache"
import { eq, ilike, or } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/lib/db"
import { tools } from "@/lib/db/schema"
import { getFaviconUrl } from "@/lib/media"
import { ensureProtocol, extractDomain } from "@/lib/url-utils"
import { setToolCategories } from "@/lib/actions/categories"
import { setToolTags } from "@/lib/actions/tags"
import { getJurisdictionRisk } from "@/lib/privacy-protocol/jurisdiction"

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export type ToolFormData = {
  id?: string
  name: string
  slug?: string
  websiteUrl: string
  affiliateUrl?: string
  tagline?: string
  description?: string
  content?: string
  faviconUrl?: string
  screenshotUrl?: string

  // Deprecation
  isDeprecated?: boolean
  deprecatedReason?: string
  alternativeToolId?: string
  
  // Normalized categories & tags
  categoryIds?: string[]
  tagIds?: string[]

  // Social
  githubUrl?: string
  subreddit?: string
  
  // Status
  status?: "Draft" | "Scheduled" | "Published" | "Pending"
  isFeatured?: boolean
  isAffiliated?: boolean

  // Privacy Protocol fields
  jurisdiction?: string
  logsIp?: boolean
  logsMetadata?: boolean
  e2ee?: boolean
  zeroKnowledge?: boolean
  requiresEmail?: boolean
  requiresPhone?: boolean
  requiresRealName?: boolean
  hasFreeTier?: boolean
  acceptsCrypto?: boolean
  isNoKyc?: boolean
  isOpenSource?: boolean
  isSecurityAudited?: boolean
  auditDate?: Date | null
  auditor?: string
  auditUrl?: string
  platforms?: string[]
}

export async function createTool(data: ToolFormData) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const slug = data.slug || slugify(data.name)

  // Check if slug already exists
  const existing = await db
    .select({ id: tools.id })
    .from(tools)
    .where(eq(tools.slug, slug))
    .limit(1)

  if (existing.length > 0) {
    throw new Error("A tool with this slug already exists")
  }

  const [tool] = await db
    .insert(tools)
    .values({
      name: data.name,
      slug,
      websiteUrl: data.websiteUrl,
      affiliateUrl: data.affiliateUrl || null,
      tagline: data.tagline || null,
      description: data.description || null,
      content: data.content || null,
      faviconUrl: data.faviconUrl || null,
      screenshotUrl: data.screenshotUrl || null,
      isDeprecated: data.isDeprecated ?? false,
      deprecatedReason: data.deprecatedReason || null,
      alternativeToolId: data.alternativeToolId || null,
      githubUrl: data.githubUrl || null,
      subreddit: data.subreddit || null,
      status: data.status || "Draft",
      isFeatured: data.isFeatured ?? false,
      isAffiliated: data.isAffiliated ?? false,
      publishedAt: data.status === "Published" ? new Date() : null,
    })
    .returning()

  // Sync normalized categories & tags if provided
  if (data.categoryIds !== undefined) {
    await setToolCategories(tool.id, data.categoryIds)
  }
  if (data.tagIds !== undefined) {
    await setToolTags(tool.id, data.tagIds)
  }

  revalidatePath("/admin/tools")
  revalidatePath("/directory")
  
  return tool
}

export async function updateTool(id: string, data: ToolFormData) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const slug = data.slug || slugify(data.name)

  // Check if slug already exists (for a different tool)
  const existing = await db
    .select({ id: tools.id })
    .from(tools)
    .where(eq(tools.slug, slug))
    .limit(1)

  if (existing.length > 0 && existing[0].id !== id) {
    throw new Error("A tool with this slug already exists")
  }

  // Get current tool to check status change
  const [current] = await db
    .select({ status: tools.status, publishedAt: tools.publishedAt })
    .from(tools)
    .where(eq(tools.id, id))
    .limit(1)

  // Compute jurisdiction risk if jurisdiction is provided
  const jurisdictionRisk = data.jurisdiction
    ? getJurisdictionRisk(data.jurisdiction)
    : undefined

  const [tool] = await db
    .update(tools)
    .set({
      name: data.name,
      slug,
      websiteUrl: data.websiteUrl,
      affiliateUrl: data.affiliateUrl || null,
      tagline: data.tagline || null,
      description: data.description || null,
      content: data.content || null,
      faviconUrl: data.faviconUrl || null,
      screenshotUrl: data.screenshotUrl || null,
      isDeprecated: data.isDeprecated ?? false,
      deprecatedReason: data.deprecatedReason || null,
      alternativeToolId: data.alternativeToolId || null,
      githubUrl: data.githubUrl || null,
      subreddit: data.subreddit || null,
      status: data.status || "Draft",
      isFeatured: data.isFeatured ?? false,
      isAffiliated: data.isAffiliated ?? false,
      publishedAt:
        data.status === "Published" && current?.status !== "Published"
          ? new Date()
          : current?.publishedAt,
      updatedAt: new Date(),
      // Privacy Protocol fields
      ...(data.jurisdiction !== undefined && { jurisdiction: data.jurisdiction || null }),
      ...(jurisdictionRisk !== undefined && { jurisdictionRisk }),
      ...(data.logsIp !== undefined && { logsIp: data.logsIp }),
      ...(data.logsMetadata !== undefined && { logsMetadata: data.logsMetadata }),
      ...(data.e2ee !== undefined && { e2ee: data.e2ee }),
      ...(data.zeroKnowledge !== undefined && { zeroKnowledge: data.zeroKnowledge }),
      ...(data.requiresEmail !== undefined && { requiresEmail: data.requiresEmail }),
      ...(data.requiresPhone !== undefined && { requiresPhone: data.requiresPhone }),
      ...(data.requiresRealName !== undefined && { requiresRealName: data.requiresRealName }),
      ...(data.hasFreeTier !== undefined && { hasFreeTier: data.hasFreeTier }),
      ...(data.acceptsCrypto !== undefined && { acceptsCrypto: data.acceptsCrypto }),
      ...(data.isNoKyc !== undefined && { isNoKyc: data.isNoKyc }),
      ...(data.isOpenSource !== undefined && { isOpenSource: data.isOpenSource }),
      ...(data.isSecurityAudited !== undefined && { isSecurityAudited: data.isSecurityAudited }),
      ...(data.auditDate !== undefined && { auditDate: data.auditDate }),
      ...(data.auditor !== undefined && { auditor: data.auditor || null }),
      ...(data.auditUrl !== undefined && { auditUrl: data.auditUrl || null }),
      ...(data.platforms !== undefined && { platforms: data.platforms }),
    })
    .where(eq(tools.id, id))
    .returning()

  // Sync normalized categories & tags if provided
  if (data.categoryIds !== undefined) {
    await setToolCategories(id, data.categoryIds)
  }
  if (data.tagIds !== undefined) {
    await setToolTags(id, data.tagIds)
  }

  revalidatePath("/admin/tools")
  revalidatePath(`/admin/tools/${id}`)
  revalidatePath("/directory")
  revalidatePath(`/directory/${slug}`)
  
  return tool
}

export async function deleteTool(id: string) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  // Get tool slug for cache invalidation
  const [tool] = await db
    .select({ slug: tools.slug })
    .from(tools)
    .where(eq(tools.id, id))
    .limit(1)

  await db.delete(tools).where(eq(tools.id, id))

  revalidatePath("/admin/tools")
  revalidatePath("/directory")
  if (tool) {
    revalidatePath(`/directory/${tool.slug}`)
  }

  return { success: true }
}

export async function updateToolStatus(
  id: string,
  status: "Draft" | "Scheduled" | "Published" | "Pending"
) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const [tool] = await db
    .update(tools)
    .set({
      status,
      publishedAt: status === "Published" ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(tools.id, id))
    .returning()

  revalidatePath("/admin/tools")
  revalidatePath(`/admin/tools/${id}`)
  revalidatePath("/directory")
  revalidatePath(`/directory/${tool.slug}`)

  return tool
}

/**
 * Fetch favicon URL for a website
 */
export async function fetchToolFavicon(websiteUrl: string): Promise<{
  success: boolean
  faviconUrl?: string
  error?: string
}> {
  if (!websiteUrl) {
    return { success: false, error: "No website URL provided" }
  }

  try {
    const faviconUrl = getFaviconUrl(websiteUrl)
    return { success: true, faviconUrl }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get favicon",
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PUBLIC TOOL SUBMISSION
// ═══════════════════════════════════════════════════════════════════════════

export type ToolLookupResult =
  | { found: true; tool: { id: string; name: string; slug: string; faviconUrl: string | null; tagline: string | null } }
  | { found: false }

/**
 * Look up a tool by URL with fuzzy domain matching.
 */
export async function lookupToolByUrl(rawUrl: string): Promise<ToolLookupResult> {
  if (!isDatabaseConfigured) {
    return { found: false }
  }

  const domain = extractDomain(rawUrl)

  try {
    const result = await db
      .select({
        id: tools.id,
        name: tools.name,
        slug: tools.slug,
        faviconUrl: tools.faviconUrl,
        tagline: tools.tagline,
      })
      .from(tools)
      .where(
        or(
          ilike(tools.websiteUrl, `%${domain}%`),
          ilike(tools.websiteUrl, `%www.${domain}%`)
        )
      )
      .limit(1)

    if (result.length > 0) {
      return { found: true, tool: result[0] }
    }
    return { found: false }
  } catch (error) {
    console.error("[lookupToolByUrl] Query failed:", error)
    return { found: false }
  }
}

export type UrlMetadata = {
  title: string | null
  description: string | null
  faviconUrl: string | null
}

/**
 * Fetch metadata from a URL (title, description, favicon) for pre-filling the submit form.
 */
export async function fetchUrlMetadata(rawUrl: string): Promise<UrlMetadata> {
  const url = ensureProtocol(rawUrl)
  const result: UrlMetadata = { title: null, description: null, faviconUrl: null }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "DefaultPrivacy/1.0 (tool-submit)" },
      redirect: "follow",
    })
    clearTimeout(timeout)

    if (!response.ok) return result

    const html = await response.text()

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    if (titleMatch) {
      result.title = titleMatch[1].trim().replace(/\s*[|\-–—].*$/, "")
    }

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
      ?? html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i)
    if (descMatch) {
      result.description = descMatch[1].trim()
    }

    result.faviconUrl = getFaviconUrl(url)
  } catch {
    try {
      result.faviconUrl = getFaviconUrl(url)
    } catch { /* ignore */ }
  }

  return result
}

export type SubmitToolInput = {
  websiteUrl: string
  name: string
  tagline?: string
  description?: string
  submitterNote?: string
  submitterName?: string
  submitterEmail?: string
  clientId?: string
  publishDirectly?: boolean
}

/**
 * Public tool submission. Creates a tool with status "Pending" (or "Published" if admin).
 */
export async function submitTool(input: SubmitToolInput) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const url = ensureProtocol(input.websiteUrl)
  const domain = extractDomain(url)
  const slug = slugify(input.name)

  const existingBySlug = await db
    .select({ id: tools.id })
    .from(tools)
    .where(eq(tools.slug, slug))
    .limit(1)

  const finalSlug = existingBySlug.length > 0
    ? `${slug}-${Date.now().toString(36)}`
    : slug

  const existingByUrl = await db
    .select({ id: tools.id })
    .from(tools)
    .where(ilike(tools.websiteUrl, `%${domain}%`))
    .limit(1)

  if (existingByUrl.length > 0) {
    throw new Error("A tool with this URL already exists in our directory")
  }

  const status = input.publishDirectly ? "Published" as const : "Pending" as const

  const faviconUrl = getFaviconUrl(url)

  const [tool] = await db
    .insert(tools)
    .values({
      name: input.name,
      slug: finalSlug,
      websiteUrl: url,
      tagline: input.tagline || null,
      description: input.description || null,
      faviconUrl,
      submitterName: input.submitterName || null,
      submitterEmail: input.submitterEmail || null,
      submitterNote: input.submitterNote || null,
      ownerId: input.clientId || null,
      status,
      publishedAt: status === "Published" ? new Date() : null,
    })
    .returning()

  revalidatePath("/admin/tools")
  revalidatePath("/directory")

  return tool
}

/**
 * Approve a pending tool submission (admin only).
 */
export async function approveSubmission(id: string) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const [tool] = await db
    .update(tools)
    .set({
      status: "Published",
      publishedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(tools.id, id))
    .returning()

  revalidatePath("/admin/tools")
  revalidatePath("/directory")
  if (tool) revalidatePath(`/directory/${tool.slug}`)

  return tool
}

/**
 * Reject a pending tool submission (admin only).
 */
export async function rejectSubmission(id: string) {
  if (!isDatabaseConfigured) {
    throw new Error("Database not configured")
  }

  const [tool] = await db
    .update(tools)
    .set({
      status: "Draft",
      updatedAt: new Date(),
    })
    .where(eq(tools.id, id))
    .returning()

  revalidatePath("/admin/tools")

  return tool
}

