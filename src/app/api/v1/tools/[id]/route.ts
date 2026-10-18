/**
 * GET /api/v1/tools/:id
 *
 * Returns full Privacy Protocol data for a single tool.
 * :id accepts the tool's slug (e.g. "mullvad", "protonmail").
 */

import { isDatabaseConfigured } from "@/lib/db"
import { getPublicToolPpWithEvidence } from "@/lib/privacy-protocol/query"
import type { PpToolResponse } from "@/lib/privacy-protocol/types"
import { withRateLimit } from "@/lib/api-rate-limit"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

async function handleGet(request: Request) {
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  // Extract ID from URL path: /api/v1/tools/[id]
  const url = new URL(request.url)
  const pathParts = url.pathname.split("/")
  const id = pathParts[pathParts.length - 1]

  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Tool ID is required" }, { status: 400 })
  }

  const slug = id.toLowerCase().trim()

  // Same public gate and shape as the list route, plus `sources` and `caveats`.
  const ppTool = await getPublicToolPpWithEvidence(slug)
  if (!ppTool) {
    return NextResponse.json({ error: "Tool not found", id: slug }, { status: 404 })
  }

  const body: PpToolResponse = {
    pp_version: "1.1",
    data: ppTool,
    meta: {
      retrieved_at: new Date().toISOString(),
      cache_ttl: 3600,
      citation: ppTool.citation,
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
