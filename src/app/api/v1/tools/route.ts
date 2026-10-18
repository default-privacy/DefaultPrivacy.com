/**
 * GET /api/v1/tools
 *
 * Privacy Protocol search endpoint. Returns PP-formatted tool data
 * for AI agents and developers querying the Default Privacy directory.
 */

import { isDatabaseConfigured } from "@/lib/db"
import { searchPublicToolsPp } from "@/lib/privacy-protocol/query"
import { toolSearchParamsSchema, JURISDICTION_RISK_VALUES } from "@/lib/privacy-protocol/params"
import type { PpToolListResponse, PrivacyProtocolTool } from "@/lib/privacy-protocol/types"
import { withRateLimit } from "@/lib/api-rate-limit"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

async function handleGet(request: Request) {
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)

  // Extract params — array fields need getAll() before Zod validation
  const rawParams: Record<string, unknown> = Object.fromEntries(searchParams)

  const jurisdictionRisk = searchParams.getAll("jurisdiction_risk").filter(
    (v): v is typeof JURISDICTION_RISK_VALUES[number] =>
      (JURISDICTION_RISK_VALUES as readonly string[]).includes(v)
  )
  if (jurisdictionRisk.length > 0) rawParams.jurisdiction_risk = jurisdictionRisk

  if (searchParams.has("min_ado_score")) {
    return NextResponse.json(
      { error: "min_ado_score was removed. Tool records no longer carry a score; results list DP picks first, then A to Z." },
      { status: 400 }
    )
  }

  const parseResult = toolSearchParamsSchema.safeParse(rawParams)
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parseResult.error.flatten() },
      { status: 400 }
    )
  }

  const params = parseResult.data

  const { tools: data, total } = await searchPublicToolsPp({
    q: params.q,
    category: params.category,
    isOpenSource: params.is_open_source,
    hasFreeTier: params.has_free_tier,
    e2ee: params.e2ee,
    jurisdictionRisk: params.jurisdiction_risk,
    sort: params.sort,
    limit: params.limit,
    offset: params.offset,
  })

  return buildListResponse(params, data, total)
}

function buildListResponse(
  params: ReturnType<typeof toolSearchParamsSchema.parse>,
  data: PrivacyProtocolTool[],
  total: number
): Response {
  const now = new Date().toISOString()
  const page = Math.floor(params.offset / params.limit) + 1

  const body: PpToolListResponse = {
    pp_version: "1.1",
    query: {
      q: params.q,
      category: params.category,
      filters: {
        is_open_source: params.is_open_source,
        has_free_tier: params.has_free_tier,
        e2ee: params.e2ee,
        jurisdiction_risk: params.jurisdiction_risk,
      },
      sort: params.sort,
      limit: params.limit,
      offset: params.offset,
    },
    data,
    pagination: {
      total,
      page,
      per_page: params.limit,
      has_more: params.offset + params.limit < total,
    },
    meta: {
      retrieved_at: now,
      citation: "Default Privacy (https://defaultprivacy.com/directory)",
    },
  }

  return NextResponse.json(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-PP-Version": "1.1",
    },
  })
}

// Rate-limited public endpoint
export const GET = withRateLimit(handleGet, { resource: "/api/v1/tools" })
