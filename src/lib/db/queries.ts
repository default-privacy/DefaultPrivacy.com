/**
 * Database Queries
 * Reusable query functions for tools, categories, etc.
 */

import { unstable_cache } from "next/cache"
import { type SQL, and, asc, desc, eq, ilike, inArray, isNotNull, or, sql } from "drizzle-orm"
import { db, isDatabaseConfigured } from "./index"
import { picksRankSql } from "@/lib/picks-order"
import { categories, tags, tools, toolPrivacyAudits, toolsToCategories, toolsToTags } from "./schema"

/**
 * Data-cache TTLs for the directory read path (unstable_cache).
 *
 * Both `/` and `/directory` read `searchParams` (filters + pagination), so the ROUTES
 * are inherently dynamic and cannot be plain ISR. Caching the DATA layer instead lets a
 * dynamically-rendered page resolve its DB reads from the Next data cache — cutting
 * redundant round-trips on hot paths (the filter-independent category tree + tag list run
 * on every directory render, regardless of filters).
 *
 * Directory data changes only via manual admin scripts, so a stale read is bounded and
 * safe: an edit surfaces after the TTL lapses, or immediately on the next deploy (a fresh
 * deployment starts with an empty data cache). Scripts run outside the Next runtime and
 * cannot call `revalidateTag`; DIRECTORY_CACHE_TAG is here so an in-app route could.
 */
const TAXONOMY_TTL = 3600 // category tree + public tags: near-static
const LISTING_TTL = 600 // tool lists + counts: reflect an edit within 10 min
const DIRECTORY_CACHE_TAG = "directory"

/**
 * Data-layer error contract (N6):
 * A query returns []/null/0/empty ONLY when the database is unconfigured — the
 * intentional no-DB build case, guarded by `!isDatabaseConfigured` at the top of each fn.
 * A real DB error is RETHROWN so the App-Router error boundary (src/app/error.tsx,
 * global-error.tsx) can render a branded error state, instead of silently rendering a
 * fake-empty 200 (or a false 404 on a detail page) that Googlebot then indexes.
 */
function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '))
  } catch {
    return value
  }
}

/** Legacy display names / slugs → current category slug. */
const LEGACY_CATEGORY_ALIASES: Record<string, string> = {
  alternatives: "de-google",
  "privacy-frontends": "de-google",
  frontend: "web-frontends",
}

function normalizeCategoryFilterInput(decoded: string): string {
  const key = decoded.trim().toLowerCase()
  return LEGACY_CATEGORY_ALIASES[key] ?? decoded
}

/** Strip ILIKE wildcards so user input cannot broaden the pattern. */
function sanitizeSearchToken(raw: string): string {
  return raw.replace(/[%_\\]/g, "").trim()
}

/** Escape a user token for embedding in a PostgreSQL POSIX regular expression (case-insensitive ~*). */
function escapePosixRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Match `word` as a **standalone token** (not inside a longer word like "protocol").
 * Uses non-alnum boundaries so "proto" matches "proto VPN" but not "protocol" or "Proton".
 */
function descriptionOrTaglineWholeWordMatch(word: string) {
  const pattern = `(^|[^[:alnum:]])${escapePosixRegex(word)}([^[:alnum:]]|$)`
  return sql`(
    coalesce(${tools.tagline}, '') ~* ${pattern}
    OR coalesce(${tools.description}, '') ~* ${pattern}
  )`
}

/**
 * Directory search: short tokens (1–2 chars) match **prefix** of name or tagline only
 * so "w" surfaces Wire, Web… not 1Password (via "…w…" in description).
 * Longer tokens: **substring on name** (so "proto" still finds Proton / ProtonVPN) plus **whole-word**
 * match on tagline and description so "proto" does not match "protocol".
 * Multiple words are ANDed.
 */
export function toolsDirectorySearchCondition(searchParam: string | undefined) {
  if (!searchParam) return undefined
  const q = decodeParam(searchParam).trim()
  if (!q) return undefined

  const words = q
    .split(/\s+/)
    .map(sanitizeSearchToken)
    .filter(Boolean)

  if (words.length === 0) return undefined

  const wordClause = (word: string) => {
    if (word.length <= 2) {
      return or(
        ilike(tools.name, `${word}%`),
        ilike(tools.tagline, `${word}%`),
      )
    }
    return or(ilike(tools.name, `%${word}%`), descriptionOrTaglineWholeWordMatch(word))
  }

  const clauses = words.map(wordClause)
  return clauses.length === 1 ? clauses[0] : and(...clauses)
}

export type ToolFilters = {
  search?: string
  category?: string
  subCategory?: string
  tagSlugs?: string[]
  publicOnly?: boolean
  status?: "Draft" | "Scheduled" | "Published" | "Pending"
  /** "picks" = DP picks first (in order within the viewed category), then A to Z. */
  sortBy?: "name" | "createdAt" | "latestPrivacyScore" | "picks"
  sortOrder?: "asc" | "desc"
  limit?: number
  offset?: number
  // ── Typed trust-column facets (directory quality filters) ──
  openSource?: boolean
  e2ee?: boolean
  noLogs?: boolean
  /** Exclude tools whose jurisdictionRisk is explicitly `five_eyes` (null/other kept). */
  excludeFiveEyes?: boolean
}

/**
 * WHERE conditions for the typed trust-column facets. Pure `tools`-table
 * predicates (no joins) so getTools() and getToolsCount() stay in lock-step.
 */
function buildColumnFacetConditions(filters: ToolFilters) {
  const c = []
  if (filters.openSource) c.push(eq(tools.isOpenSource, true))
  if (filters.e2ee) c.push(eq(tools.e2ee, true))
  if (filters.noLogs) c.push(eq(tools.logsIp, false))
  // IS DISTINCT FROM keeps NULL (unknown) jurisdictions in the results.
  if (filters.excludeFiveEyes) c.push(sql`${tools.jurisdictionRisk} is distinct from 'five_eyes'`)
  return c
}

export type CategoryGroup = {
  label: string
  slug?: string
  total: number
  items: {
    name: string
    slug?: string
    count: number
  }[]
}

// Retired from display 2026-10-09: rows still carry these columns, so drop them before a row
// reaches a client component (they would otherwise ride along in the page payload).
const RETIRED_COLUMNS = ["acceptsCrypto", "isNoKyc", "isSecurityAudited", "auditor", "auditUrl", "auditDate"] as const
function stripRetiredAll<T extends object>(rows: T[]): T[] {
  return rows.map((r) => {
    const c = { ...r } as Record<string, unknown>
    for (const k of RETIRED_COLUMNS) delete c[k]
    return c as T
  })
}

export const PUBLIC_CATEGORY_VISIBILITY = "public" as const

/** Published tools linked to at least one public category. */
export async function getToolIdsInPublicCategories(): Promise<string[]> {
  const rows = await db
    .selectDistinct({ toolId: toolsToCategories.toolId })
    .from(toolsToCategories)
    .innerJoin(
      categories,
      and(
        eq(toolsToCategories.categoryId, categories.id),
        eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY),
      ),
    )
  return rows.map((r) => r.toolId)
}

/** Resolve category IDs for directory filtering (parent + children, or leaf only). */
async function resolveCategoryFilterIds(
  decoded: string,
  options: { publicOnly: boolean; expandChildren: boolean },
): Promise<string[] | null> {
  const normalized = normalizeCategoryFilterInput(decoded)
  const nameOrSlug = or(
    ilike(categories.name, normalized),
    ilike(categories.slug, normalized),
  )
  const matchWhere = options.publicOnly
    ? and(nameOrSlug, eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY))
    : nameOrSlug

  const matchingCategory = await db
    .select({ id: categories.id })
    .from(categories)
    .where(matchWhere)
    .limit(1)

  if (matchingCategory.length === 0) return null

  if (!options.expandChildren) {
    return [matchingCategory[0].id]
  }

  const childConditions = [eq(categories.parentId, matchingCategory[0].id)]
  if (options.publicOnly) {
    childConditions.push(eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY))
  }
  const childCategories = await db
    .select({ id: categories.id })
    .from(categories)
    .where(and(...childConditions))

  return [matchingCategory[0].id, ...childCategories.map((c) => c.id)]
}

/** Public category IDs for filters (leaf-only or parent + children). */
export async function resolvePublicCategoryFilterIds(
  decoded: string,
  expandChildren: boolean,
): Promise<string[] | null> {
  return resolveCategoryFilterIds(decoded, { publicOnly: true, expandChildren })
}

/** Published tool visible in the public directory (by slug). */
export async function getPublicPublishedToolBySlug(slug: string) {
  if (!isDatabaseConfigured) {
    return null
  }

  try {
    const publicToolIds = await getToolIdsInPublicCategories()
    if (publicToolIds.length === 0) return null

    const result = await db
      .select()
      .from(tools)
      .where(and(
        ilike(tools.slug, slug),
        eq(tools.status, "Published"),
        inArray(tools.id, publicToolIds),
      ))
      .limit(1)

    return result[0] ?? null
  } catch (error) {
    console.error("[getPublicPublishedToolBySlug] Query failed:", error instanceof Error ? error.message : error)
    throw error
  }
}

/**
 * Build the shared WHERE conditions for the directory list + count queries.
 *
 * getTools() and getToolsCount() MUST filter identically or the UI count desyncs from
 * the listing, so both call THIS one builder (see queries.parity.test.ts). Returns the
 * accumulated `tools`-table conditions plus an `empty` flag: when a filter resolves to
 * "no possible match" (publicOnly with no public tools, an unknown category, a tag that
 * matches nothing), `empty` is true and the caller short-circuits — getTools -> [],
 * getToolsCount -> 0 — without running the final query. Real DB errors rethrow (N6).
 */
async function buildToolListConditions(
  filters: ToolFilters,
): Promise<{ conditions: SQL[]; empty: boolean }> {
  const {
    search,
    category,
    subCategory,
    tagSlugs,
    publicOnly = false,
    status = "Published",
  } = filters

  const conditions: SQL[] = []

  if (status) {
    conditions.push(eq(tools.status, status))
  }

  const searchCond = toolsDirectorySearchCondition(search)
  if (searchCond) {
    conditions.push(searchCond)
  }

  if (publicOnly) {
    const publicToolIds = await getToolIdsInPublicCategories()
    if (publicToolIds.length === 0) return { conditions, empty: true }
    conditions.push(inArray(tools.id, publicToolIds))
  }

  // Category filter via the normalized categories table (parent + children, or leaf).
  if (category || subCategory) {
    const decoded = normalizeCategoryFilterInput(decodeParam(subCategory || category || ""))
    const expandChildren = !subCategory
    try {
      const allCategoryIds = await resolveCategoryFilterIds(decoded, { publicOnly, expandChildren })
      if (!allCategoryIds) return { conditions, empty: true }

      const catToolIds = await db
        .selectDistinct({ toolId: toolsToCategories.toolId })
        .from(toolsToCategories)
        .where(inArray(toolsToCategories.categoryId, allCategoryIds))

      if (catToolIds.length > 0) {
        conditions.push(inArray(tools.id, catToolIds.map((t) => t.toolId)))
      } else {
        return { conditions, empty: true }
      }
    } catch (error) {
      console.error("[buildToolListConditions] category filter query failed:", error instanceof Error ? error.message : error)
      throw error
    }
  }

  // Tag filter — resolve tag IDs from slugs, then filter by the junction table.
  if (tagSlugs && tagSlugs.length > 0) {
    try {
      const matchingTags = await db
        .select({ id: tags.id })
        .from(tags)
        .where(inArray(tags.slug, tagSlugs))

      if (matchingTags.length === 0) return { conditions, empty: true }

      const tagToolIds = await db
        .selectDistinct({ toolId: toolsToTags.toolId })
        .from(toolsToTags)
        .where(inArray(toolsToTags.tagId, matchingTags.map((t) => t.id)))

      if (tagToolIds.length === 0) return { conditions, empty: true }
      conditions.push(inArray(tools.id, tagToolIds.map((t) => t.toolId)))
    } catch (error) {
      console.error("[buildToolListConditions] tag filter query failed:", error instanceof Error ? error.message : error)
      throw error
    }
  }

  // Typed trust-column facets (open-source, e2ee, no-logs, …).
  conditions.push(...buildColumnFacetConditions(filters))

  return { conditions, empty: false }
}

// Exported (uncached) for direct use + parity testing; the cached export is `getTools`.
export async function getToolsUncached(filters: ToolFilters = {}) {
  if (!isDatabaseConfigured) {
    console.warn("[getTools] Database not configured")
    return []
  }

  const { sortBy = "name", sortOrder = "asc", limit = 50, offset = 0 } = filters

  const { conditions, empty } = await buildToolListConditions(filters)
  if (empty) return []

  const orderByColumn = {
    name: tools.name,
    createdAt: tools.createdAt,
    latestPrivacyScore: tools.latestPrivacyScore,
  }[sortBy as "name" | "createdAt" | "latestPrivacyScore"] || tools.name

  // Picks first, then A to Z, id last so offset paging is stable.
  const orderBy =
    sortBy === "picks"
      ? [picksRankSql(filters.subCategory || filters.category), asc(tools.name), asc(tools.id)]
      : [sortOrder === "desc" ? desc(orderByColumn) : asc(orderByColumn), asc(tools.id)]
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined

  try {
    return await db
      .select()
      .from(tools)
      .where(whereClause)
      .orderBy(...orderBy)
      .limit(limit)
      .offset(offset)
      .then(stripRetiredAll)
  } catch (error) {
    console.error("[getTools] Query failed:", error instanceof Error ? error.message : error)
    throw error
  }
}

/** Directory tool listing — cached at the data layer (see LISTING_TTL). */
export const getTools = unstable_cache(getToolsUncached, ["directory:tools"], {
  revalidate: LISTING_TTL,
  tags: [DIRECTORY_CACHE_TAG],
})

export async function getToolBySlug(slug: string) {
  if (!isDatabaseConfigured) {
    return null
  }

  try {
    // Case-insensitive lookup to support v1 PascalCase slugs
    // (e.g. /directory/GrapheneOS resolves to DB slug "grapheneos")
    const result = await db
      .select()
      .from(tools)
      .where(ilike(tools.slug, slug))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error("Database query failed:", error)
    throw error
  }
}

// Exported (uncached) for direct use + parity testing; the cached export is `getToolsCount`.
export async function getToolsCountUncached(filters: ToolFilters = {}) {
  if (!isDatabaseConfigured) {
    return 0
  }

  const { conditions, empty } = await buildToolListConditions(filters)
  if (empty) return 0

  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(tools)
      .where(conditions.length > 0 ? and(...conditions) : undefined)

    return Number(result[0]?.count || 0)
  } catch (error) {
    console.error("Database query failed:", error)
    throw error
  }
}

/** Directory result count — cached at the data layer (see LISTING_TTL). */
export const getToolsCount = unstable_cache(getToolsCountUncached, ["directory:tools-count"], {
  revalidate: LISTING_TTL,
  tags: [DIRECTORY_CACHE_TAG],
})

export async function getCategories() {
  if (!isDatabaseConfigured) {
    return []
  }

  try {
    return await db.select().from(categories).orderBy(asc(categories.name))
  } catch (error) {
    console.error("Database query failed:", error)
    throw error
  }
}

export async function getTags() {
  if (!isDatabaseConfigured) {
    return []
  }

  try {
    return await db.select().from(tags).orderBy(asc(tags.name))
  } catch (error) {
    console.error("Database query failed:", error)
    throw error
  }
}

async function getCategoryGroupsUncached() {
  if (!isDatabaseConfigured) {
    return []
  }

  try {
    // Try normalized categories first
    const parentCats = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        sortOrder: categories.sortOrder,
      })
      .from(categories)
      .where(and(
        sql`${categories.parentId} IS NULL`,
        eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY),
      ))
      .orderBy(asc(categories.sortOrder), asc(categories.name))

    if (parentCats.length > 0) {
      // Get children for all parent categories
      const childCats = await db
        .select({
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
          parentId: categories.parentId,
          sortOrder: categories.sortOrder,
        })
        .from(categories)
        .where(and(
          isNotNull(categories.parentId),
          eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY),
        ))
        .orderBy(asc(categories.sortOrder), asc(categories.name))

      // Count published tools per category via junction
      const toolCounts = await db
        .select({
          categoryId: toolsToCategories.categoryId,
          count: sql<number>`count(*)`,
        })
        .from(toolsToCategories)
        .innerJoin(categories, and(
          eq(toolsToCategories.categoryId, categories.id),
          eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY),
        ))
        .innerJoin(tools, and(
          eq(toolsToCategories.toolId, tools.id),
          eq(tools.status, "Published")
        ))
        .groupBy(toolsToCategories.categoryId)

      const countMap = new Map(toolCounts.map(r => [r.categoryId, Number(r.count)]))
      const childMap = new Map<string, typeof childCats>()
      for (const child of childCats) {
        const arr = childMap.get(child.parentId!) ?? []
        arr.push(child)
        childMap.set(child.parentId!, arr)
      }

      return parentCats.map(parent => {
        const children = childMap.get(parent.id) ?? []
        const parentCount = countMap.get(parent.id) ?? 0
        const totalCount = parentCount + children.reduce((s, c) => s + (countMap.get(c.id) ?? 0), 0)

        return {
          label: parent.name,
          slug: parent.slug,
          total: totalCount,
          // Groups are containers now: tools live on subcategories, so a group has no
          // "self" item — just its child subcategories (each with >0 tools).
          items: children
            .map(c => ({
              name: c.name,
              slug: c.slug,
              count: countMap.get(c.id) ?? 0,
            }))
            .filter(i => i.count > 0),
        }
      }).filter(g => g.total > 0)
    }

    return []
  } catch (error) {
    console.error("Database query failed:", error)
    throw error
  }
}

/** Category tree with per-category counts — cached at the data layer (see TAXONOMY_TTL). */
export const getCategoryGroups = unstable_cache(getCategoryGroupsUncached, ["directory:category-groups"], {
  revalidate: TAXONOMY_TTL,
  tags: [DIRECTORY_CACHE_TAG],
})

export async function getFeaturedTools(limit = 6) {
  if (!isDatabaseConfigured) {
    return []
  }

  try {
    const publicToolIds = await getToolIdsInPublicCategories()
    if (publicToolIds.length === 0) return []
    return await db
      .select()
      .from(tools)
      .where(and(
        eq(tools.status, "Published"),
        eq(tools.isFeatured, true),
        inArray(tools.id, publicToolIds),
      ))
      .orderBy(desc(tools.createdAt))
      .limit(limit)
      .then(stripRetiredAll)
  } catch (error) {
    console.error("Database query failed:", error)
    throw error
  }
}

export async function getToolsByCategory(category: string, limit = 20) {
  if (!isDatabaseConfigured) {
    return []
  }

  const decoded = decodeParam(category)

  try {
    const allCategoryIds = await resolvePublicCategoryFilterIds(decoded, true)
    if (!allCategoryIds) return []

    const publicToolIds = await getToolIdsInPublicCategories()
    if (publicToolIds.length === 0) return []

    const toolIds = await db
      .selectDistinct({ toolId: toolsToCategories.toolId })
      .from(toolsToCategories)
      .where(inArray(toolsToCategories.categoryId, allCategoryIds))

    if (toolIds.length === 0) return []

    return await db
      .select()
      .from(tools)
      .where(and(
        eq(tools.status, "Published"),
        inArray(tools.id, toolIds.map((t) => t.toolId)),
        inArray(tools.id, publicToolIds),
      ))
      .orderBy(asc(tools.name))
      .limit(limit)
      .then(stripRetiredAll)
  } catch (error) {
    console.error("Database query failed:", error)
    throw error
  }
}

/**
 * Published tools assigned to any of the given category names (parent match by name or slug,
 * including tools in child categories). De-duplicates across categories. Ordered by name.
 */
export async function getToolsInCategoryNames(
  categoryNames: string[],
  options: { limit?: number } = {},
) {
  const { limit = 48 } = options
  if (!isDatabaseConfigured || categoryNames.length === 0) {
    return []
  }

  try {
    const allCategoryIds = new Set<string>()

    for (const raw of categoryNames) {
      const decoded = decodeParam(raw.trim())
      if (!decoded) continue

      const ids = await resolvePublicCategoryFilterIds(decoded, true)
      if (!ids) continue
      for (const id of ids) allCategoryIds.add(id)
    }

    if (allCategoryIds.size === 0) {
      return []
    }

    const publicToolIds = await getToolIdsInPublicCategories()
    if (publicToolIds.length === 0) return []

    const toolIdsRows = await db
      .selectDistinct({ toolId: toolsToCategories.toolId })
      .from(toolsToCategories)
      .where(inArray(toolsToCategories.categoryId, [...allCategoryIds]))

    if (toolIdsRows.length === 0) {
      return []
    }

    const toolIds = toolIdsRows.map((r) => r.toolId)

    const conditions = [
      eq(tools.status, "Published"),
      inArray(tools.id, toolIds),
      inArray(tools.id, publicToolIds),
    ]

    return await db
      .select()
      .from(tools)
      .where(and(...conditions))
      .orderBy(asc(tools.name))
      .limit(limit)
      .then(stripRetiredAll)
  } catch (error) {
    console.error("[getToolsInCategoryNames] Query failed:", error instanceof Error ? error.message : error)
    throw error
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ADMIN QUERIES
// ═══════════════════════════════════════════════════════════════════════════

export async function getAdminStats() {
  if (!isDatabaseConfigured) {
    return {
      totalTools: 0,
      publishedTools: 0,
      draftTools: 0,
      scheduledTools: 0,
      pendingTools: 0,
      totalCategories: 0,
      totalTags: 0,
      totalAudits: 0,
    }
  }

  try {
    const [
      totalToolsResult,
      publishedToolsResult,
      draftToolsResult,
      scheduledToolsResult,
      pendingToolsResult,
      totalCategoriesResult,
      totalTagsResult,
      totalAuditsResult,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(tools),
      db.select({ count: sql<number>`count(*)` }).from(tools).where(eq(tools.status, "Published")),
      db.select({ count: sql<number>`count(*)` }).from(tools).where(eq(tools.status, "Draft")),
      db.select({ count: sql<number>`count(*)` }).from(tools).where(eq(tools.status, "Scheduled")),
      db.select({ count: sql<number>`count(*)` }).from(tools).where(eq(tools.status, "Pending")),
      db.select({ count: sql<number>`count(*)` }).from(categories),
      db.select({ count: sql<number>`count(*)` }).from(tags),
      db.select({ count: sql<number>`count(*)` }).from(toolPrivacyAudits),
    ])

    return {
      totalTools: Number(totalToolsResult[0]?.count || 0),
      publishedTools: Number(publishedToolsResult[0]?.count || 0),
      draftTools: Number(draftToolsResult[0]?.count || 0),
      scheduledTools: Number(scheduledToolsResult[0]?.count || 0),
      pendingTools: Number(pendingToolsResult[0]?.count || 0),
      totalCategories: Number(totalCategoriesResult[0]?.count || 0),
      totalTags: Number(totalTagsResult[0]?.count || 0),
      totalAudits: Number(totalAuditsResult[0]?.count || 0),
    }
  } catch (error) {
    console.error("Admin stats query failed:", error)
    throw error
  }
}

export async function getAdminTools(filters: ToolFilters & { includeAll?: boolean } = {}) {
  if (!isDatabaseConfigured) {
    return []
  }

  const {
    search,
    status,
    sortBy = "createdAt",
    sortOrder = "desc",
    limit = 50,
    offset = 0,
    includeAll = true,
  } = filters

  const conditions = []

  try {
    if (status && !includeAll) {
      conditions.push(eq(tools.status, status))
    }

    if (search) {
      conditions.push(
        or(
          ilike(tools.name, `%${search}%`),
          ilike(tools.description, `%${search}%`),
          ilike(tools.slug, `%${search}%`),
          ilike(tools.websiteUrl, `%${search}%`)
        )
      )
    }

    // Build order by
    const orderByColumn = {
      name: tools.name,
      createdAt: tools.createdAt,
      updatedAt: tools.updatedAt,
      latestPrivacyScore: tools.latestPrivacyScore,
    }[sortBy as "name" | "createdAt" | "updatedAt" | "latestPrivacyScore"] || tools.createdAt

    const orderBy = sortOrder === "desc" ? desc(orderByColumn) : asc(orderByColumn)

    const result = await db
      .select()
      .from(tools)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(orderBy, asc(tools.id))
      .limit(limit)
      .offset(offset)

    return result
  } catch (error) {
    console.error("Admin tools query failed:", error)
    throw error
  }
}

export async function getToolSlugs() {
  if (!isDatabaseConfigured) {
    return []
  }

  try {
    return await db
      .select({ slug: tools.slug, updatedAt: tools.updatedAt })
      .from(tools)
      .where(eq(tools.status, "Published"))
      .orderBy(asc(tools.slug))
  } catch (error) {
    console.error("Database query failed:", error)
    throw error
  }
}

export type TagInfo = { slug: string; name: string }

export type ToolCategoryTagData = {
  categoryLabel: string | null
  tags: TagInfo[]
}

/**
 * Batch-fetch normalized category + tag data for a set of tool IDs.
 * Returns a Map keyed by toolId. Each value has:
 *   - categoryLabel: name of the primary (lowest sortOrder) category
 *   - tags:          { slug, name } for every assigned tag
 *
 * Used by public listing and detail pages to avoid N+1 queries.
 */
export async function getToolCategoryTagMap(
  toolIds: string[]
): Promise<Map<string, ToolCategoryTagData>> {
  const empty = new Map<string, ToolCategoryTagData>()
  if (!isDatabaseConfigured || toolIds.length === 0) return empty

  try {
    const [catRows, tagRows] = await Promise.all([
      db
        .select({
          toolId: toolsToCategories.toolId,
          categoryName: categories.name,
          sortOrder: categories.sortOrder,
        })
        .from(toolsToCategories)
        .innerJoin(categories, and(
          eq(toolsToCategories.categoryId, categories.id),
          eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY),
        ))
        .where(inArray(toolsToCategories.toolId, toolIds))
        .orderBy(asc(categories.sortOrder), asc(categories.name)),

      db
        .select({
          toolId: toolsToTags.toolId,
          tagSlug: tags.slug,
          tagName: tags.name,
        })
        .from(toolsToTags)
        .innerJoin(tags, eq(toolsToTags.tagId, tags.id))
        .where(inArray(toolsToTags.toolId, toolIds)),
    ])

    const result = new Map<string, ToolCategoryTagData>()

    for (const id of toolIds) {
      result.set(id, { categoryLabel: null, tags: [] })
    }
    for (const row of catRows) {
      const entry = result.get(row.toolId)
      if (entry && !entry.categoryLabel) {
        entry.categoryLabel = row.categoryName
      }
    }
    for (const row of tagRows) {
      const entry = result.get(row.toolId)
      if (entry) {
        entry.tags.push({ slug: row.tagSlug, name: row.tagName })
      }
    }

    return result
  } catch (error) {
    console.error("[getToolCategoryTagMap] Query failed:", error instanceof Error ? error.message : error)
    throw error
  }
}

/**
 * Fetch normalized category + tag data for a single tool.
 * Convenience wrapper around getToolCategoryTagMap.
 */
export async function getToolCategoryTags(toolId: string) {
  const map = await getToolCategoryTagMap([toolId])
  return map.get(toolId) ?? { categoryLabel: null, tags: [] }
}

/**
 * Fetch all tags for public filtering UI, grouped by type.
 * Returns only tags that are assigned to at least one published tool.
 */
async function getPublicTagsUncached() {
  if (!isDatabaseConfigured) return []

  try {
    const rows = await db
      .selectDistinct({
        id: tags.id,
        name: tags.name,
        slug: tags.slug,
        type: tags.type,
        color: tags.color,
      })
      .from(tags)
      .innerJoin(toolsToTags, eq(tags.id, toolsToTags.tagId))
      .innerJoin(tools, and(
        eq(toolsToTags.toolId, tools.id),
        eq(tools.status, "Published")
      ))
      .innerJoin(toolsToCategories, eq(tools.id, toolsToCategories.toolId))
      .innerJoin(categories, and(
        eq(toolsToCategories.categoryId, categories.id),
        eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY),
      ))
      .orderBy(asc(tags.type), asc(tags.name))

    return rows
  } catch (error) {
    console.error("[getPublicTags] Query failed:", error instanceof Error ? error.message : error)
    throw error
  }
}

/** Public tags for filter UI — cached at the data layer (see TAXONOMY_TTL). */
export const getPublicTags = unstable_cache(getPublicTagsUncached, ["directory:public-tags"], {
  revalidate: TAXONOMY_TTL,
  tags: [DIRECTORY_CACHE_TAG],
})

export async function getToolById(id: string) {
  if (!isDatabaseConfigured) {
    return null
  }

  try {
    const result = await db
      .select()
      .from(tools)
      .where(eq(tools.id, id))
      .limit(1)

    return result[0] || null
  } catch (error) {
    console.error("Database query failed:", error)
    throw error
  }
}
