"use client"

import { useEffect } from "react"
import { registerSiteTools, type ModelContextLike } from "@/lib/webmcp"

type WithModelContext = { modelContext?: ModelContextLike }

/**
 * Offers the site's MCP tools to an agent built into the browser (WebMCP). Renders nothing
 * and does nothing in a browser without it. `navigator.modelContext` is the pre-2026-05 name.
 */
export function WebMcpBridge() {
  useEffect(() => {
    const modelContext =
      (document as WithModelContext).modelContext ?? (navigator as WithModelContext).modelContext
    if (!modelContext) return
    const controller = new AbortController()
    void registerSiteTools(modelContext, fetch, "/api/mcp", controller.signal)
    return () => controller.abort()
  }, [])

  return null
}
