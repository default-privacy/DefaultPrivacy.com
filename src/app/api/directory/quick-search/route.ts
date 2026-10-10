import { isDatabaseConfigured } from "@/lib/db"
import { getTools } from "@/lib/db/queries"
import { withRateLimit } from "@/lib/api-rate-limit"
import { countUsage } from "@/lib/analytics/usage"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * GET /api/directory/quick-search?q=wire
 * Lightweight directory search for the ⌘K modal (no x402).
 */
async function handleGet(request: Request): Promise<Response> {
  if (!isDatabaseConfigured) {
    return NextResponse.json({ results: [] })
  }

  const q = new URL(request.url).searchParams.get("q")?.trim() ?? ""

  // No-PII demand telemetry. Bucketing choice: we count ONLY a coarse signature of
  // the search — 'query' (a real ≥2-char search ran) vs 'empty' (too-short/blank) —
  // and NEVER the raw query text. This endpoint takes only free text (no facets), so
  // there is nothing else privacy-safe to bucket on; 'query' vs 'empty' is the
  // simplest safe signal (did people actually search the ⌘K modal?).
  if (q.length < 2) {
    countUsage("directory_search", "empty")
    return NextResponse.json({ results: [] })
  }
  countUsage("directory_search", "query")

  const tools = await getTools({
    search: q,
    publicOnly: true,
    limit: 8,
    sortBy: "name",
    sortOrder: "asc",
  })

  return NextResponse.json({
    results: tools.map((tool) => ({
      slug: tool.slug,
      name: tool.name,
      tagline: tool.tagline,
      faviconUrl: tool.faviconUrl,
    })),
  })
}

export const GET = withRateLimit(handleGet, { resource: "/api/directory/quick-search" })
