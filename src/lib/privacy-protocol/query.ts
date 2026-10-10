/**
 * Shared Privacy Protocol query helpers.
 *
 * These return fully-shaped Privacy Protocol tool objects (public-gated) from a single
 * code path so the MCP server and the REST API don't drift. Both `/api/v1/tools` and the
 * MCP `dp_search_tools` tool call `searchPublicToolsPp` — one query, one behavior.
 */

import { and, asc, desc, eq, inArray, sql } from "drizzle-orm"
import type { InferSelectModel } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/lib/db"
import { categories, tools, toolsToCategories } from "@/lib/db/schema"
import {
  getPublicPublishedToolBySlug,
  getToolIdsInPublicCategories,
  PUBLIC_CATEGORY_VISIBILITY,
  resolvePublicCategoryFilterIds,
  toolsDirectorySearchCondition,
} from "@/lib/db/queries"
import { getToolEvidence } from "@/lib/claims/evidence"
import { picksRankSql } from "@/lib/picks-order"
import { transformToPrivacyProtocol } from "./transform"
import type { JurisdictionRisk, PrivacyProtocolTool } from "./types"

type ToolRow = InferSelectModel<typeof tools>

/** "ado_score" is a deprecated alias of "picks" (the default). */
export type PpSort = "picks" | "ado_score" | "name" | "recently_verified" | "recently_added"

export type PpSearchParams = {
  q?: string
  category?: string
  isOpenSource?: boolean
  hasFreeTier?: boolean
  e2ee?: boolean
  jurisdictionRisk?: JurisdictionRisk[]
  sort?: PpSort
  limit?: number
  offset?: number
}

export type PpSearchResult = {
  tools: PrivacyProtocolTool[]
  total: number
  limit: number
  offset: number
  hasMore: boolean
}

/** Attach public categories to tool rows, then map to Privacy Protocol shape. */
async function attachCategoriesAndTransform(rows: ToolRow[]): Promise<PrivacyProtocolTool[]> {
  if (rows.length === 0) return []

  const toolIds = rows.map((r) => r.id)
  const categoryRows = await db
    .select({
      toolId: toolsToCategories.toolId,
      name: categories.name,
      slug: categories.slug,
    })
    .from(toolsToCategories)
    .innerJoin(
      categories,
      and(
        eq(toolsToCategories.categoryId, categories.id),
        eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY),
      ),
    )
    .where(inArray(toolsToCategories.toolId, toolIds))

  const map = new Map<string, { name: string; slug: string }[]>()
  for (const row of categoryRows) {
    const arr = map.get(row.toolId) ?? []
    arr.push({ name: row.name, slug: row.slug })
    map.set(row.toolId, arr)
  }

  return rows.map((r) => transformToPrivacyProtocol({ ...r, categories: map.get(r.id) ?? [] }))
}

/** Public directory search returning Privacy Protocol tool objects + pagination. */
export async function searchPublicToolsPp(params: PpSearchParams = {}): Promise<PpSearchResult> {
  const limit = Math.min(Math.max(params.limit ?? 10, 1), 50)
  const offset = Math.max(params.offset ?? 0, 0)
  const empty: PpSearchResult = { tools: [], total: 0, limit, offset, hasMore: false }

  if (!isDatabaseConfigured) return empty

  const publicToolIds = await getToolIdsInPublicCategories()
  if (publicToolIds.length === 0) return empty

  // Only real tools rank/appear in the agent feed. Content & orgs (list/book/guide/
  // podcast/channel/course/org) are excluded here but remain browsable in the human
  // directory via getTools (which does NOT apply this filter). See N16.
  const conditions = [
    eq(tools.status, "Published"),
    eq(tools.contentType, "tool"),
    // Retired listings stay reachable by slug (their page explains why) but are never
    // offered as a recommendation.
    eq(tools.isDeprecated, false),
    inArray(tools.id, publicToolIds),
  ]

  if (params.q) {
    // Delegate to the shared directory predicate so the agent (/api/v1/tools + MCP)
    // and human directory surfaces return identical matches. The helper self-sanitizes
    // wildcards and splits multi-word queries.
    const searchCond = toolsDirectorySearchCondition(params.q)
    if (searchCond) conditions.push(searchCond)
  }

  if (params.isOpenSource !== undefined) conditions.push(eq(tools.isOpenSource, params.isOpenSource))
  if (params.hasFreeTier !== undefined) conditions.push(eq(tools.hasFreeTier, params.hasFreeTier))
  if (params.e2ee !== undefined) conditions.push(eq(tools.e2ee, params.e2ee))
  if (params.jurisdictionRisk?.length) {
    conditions.push(inArray(tools.jurisdictionRisk, params.jurisdictionRisk))
  }

  if (params.category) {
    const categoryIds = await resolvePublicCategoryFilterIds(params.category, true)
    if (!categoryIds) return empty

    const catToolIds = await db
      .selectDistinct({ toolId: toolsToCategories.toolId })
      .from(toolsToCategories)
      .where(inArray(toolsToCategories.categoryId, categoryIds))

    if (catToolIds.length === 0) return empty
    conditions.push(inArray(tools.id, catToolIds.map((t) => t.toolId)))
  }

  const where = and(...conditions)

  const [{ total }] = await db
    .select({ total: sql<number>`count(*)` })
    .from(tools)
    .where(where)

  const isPicksSort = !params.sort || params.sort === "picks" || params.sort === "ado_score"
  const orderBy = (() => {
    switch (params.sort) {
      case "name":
        return asc(tools.name)
      case "recently_verified":
        return sql`${tools.lastVerified} desc nulls last`
      case "recently_added":
        return desc(tools.createdAt)
      default:
        // Picks first (DP's order within the viewed category), then A to Z.
        return picksRankSql(params.category)
    }
  })()

  const rows = await db
    .select()
    .from(tools)
    .where(where)
    // Name then id close the order: offset paging over ties returns overlapping pages
    // that silently skip tools.
    .orderBy(...(isPicksSort ? [orderBy, asc(tools.name), asc(tools.id)] : [orderBy, asc(tools.id)]))
    .limit(limit)
    .offset(offset)

  const ppTools = await attachCategoriesAndTransform(rows)
  return {
    tools: ppTools,
    total: Number(total),
    limit,
    offset,
    hasMore: offset + limit < Number(total),
  }
}

/** Single public tool as a Privacy Protocol object (by slug), or null if not public. */
export async function getPublicToolPp(slug: string): Promise<PrivacyProtocolTool | null> {
  const row = await getPublicPublishedToolBySlug(slug)
  if (!row) return null
  const [pp] = await attachCategoriesAndTransform([row])
  return pp ?? null
}

/** Single public tool plus its `sources` and `caveats`: what the single-tool API and MCP return. */
export async function getPublicToolPpWithEvidence(slug: string): Promise<PrivacyProtocolTool | null> {
  const [tool, evidence] = await Promise.all([getPublicToolPp(slug), getToolEvidence(slug)])
  return tool ? { ...tool, sources: evidence.sources, caveats: evidence.caveats } : null
}
