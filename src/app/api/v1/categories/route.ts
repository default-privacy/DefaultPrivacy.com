/**
 * GET /api/v1/categories
 *
 * Returns public Privacy Protocol categories with published tool counts.
 * AI agents call this to discover what types of tools are available
 * before issuing a search_privacy_tools query.
 *
 * Free endpoint (no x402) but rate limited.
 */

import { db, isDatabaseConfigured } from "@/lib/db"
import { PUBLIC_CATEGORY_VISIBILITY } from "@/lib/db/queries"
import { categories, tools, toolsToCategories } from "@/lib/db/schema"
import type { PpCategoriesResponse, PrivacyProtocolCategory } from "@/lib/privacy-protocol/types"
import { withRateLimit } from "@/lib/api-rate-limit"
import { and, asc, eq, sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

async function handleGet(_request: Request) {
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  const rows = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      description: categories.description,
      parentId: categories.parentId,
      sortOrder: categories.sortOrder,
      toolCount: sql<number>`count(distinct ${toolsToCategories.toolId})`,
    })
    .from(categories)
    .leftJoin(toolsToCategories, eq(categories.id, toolsToCategories.categoryId))
    .leftJoin(
      tools,
      and(
        eq(toolsToCategories.toolId, tools.id),
        eq(tools.status, "Published"),
      ),
    )
    .where(eq(categories.visibility, PUBLIC_CATEGORY_VISIBILITY))
    .groupBy(
      categories.id,
      categories.name,
      categories.slug,
      categories.description,
      categories.parentId,
      categories.sortOrder
    )
    .orderBy(asc(categories.sortOrder), asc(categories.name))

  const data: PrivacyProtocolCategory[] = rows.map((row) => ({
    pp_version: "1.0",
    id: row.slug,
    name: row.name,
    slug: row.slug,
    description: row.description ?? null,
    parent_id: row.parentId ?? null,
    sort_order: row.sortOrder,
    tool_count: Number(row.toolCount),
  }))

  const body: PpCategoriesResponse = {
    pp_version: "1.0",
    data,
    meta: {
      retrieved_at: new Date().toISOString(),
      total: data.length,
    },
  }

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      "X-PP-Version": "1.0",
    },
  })
}

// Rate limited but free (no x402)
export const GET = withRateLimit(handleGet, { resource: "/api/v1/categories" })
