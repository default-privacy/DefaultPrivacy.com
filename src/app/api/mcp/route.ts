/**
 * Default Privacy MCP server — remote Streamable HTTP transport.
 *
 * POST /api/mcp  → JSON-RPC (tools/list, tools/call, resources/*, prompts/*).
 * Stateless (SSE disabled → no Redis needed). The tool/resource/prompt layer lives in
 * `@/mcp-server` and is transport-agnostic. A coarse per-IP limit guards the endpoint;
 * outbound-network tools carry their own per-call limits.
 */

import { createMcpHandler } from "mcp-handler"

import { countUsage } from "@/lib/analytics/usage"
import { withRateLimit } from "@/lib/api-rate-limit"
import { oversizedBatch } from "@/mcp-server/batch-limit"
import { mcpRequestCounts, protocolBucket } from "@/mcp-server/request-counts"
import { configureServer, SERVER_INFO, SERVER_INSTRUCTIONS } from "@/mcp-server/server"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const handler = createMcpHandler(
  configureServer,
  {
    serverInfo: SERVER_INFO,
    instructions: SERVER_INSTRUCTIONS,
  },
  {
    basePath: "/api",
    disableSse: true,
    verboseLogs: false,
    maxDuration: 60,
  },
)

/**
 * Refuse oversized batches, then count each JSON-RPC method, the protocol revision and,
 * on connect, the app's name. Counting never blocks or fails the request.
 */
async function counted(request: Request): Promise<Response> {
  if (request.method === "POST") {
    try {
      const body = await request.clone().json()
      const refused = oversizedBatch(body)
      if (refused) return refused
      const { methods, client } = mcpRequestCounts(body)
      for (const method of methods) countUsage("mcp_method", method)
      if (client) countUsage("mcp_client", client)
      countUsage("mcp_protocol", protocolBucket(request.headers.get("mcp-protocol-version"), body))
    } catch {
      // Unparseable body: the transport answers it with a JSON-RPC parse error.
    }
  }
  // On mcp.defaultprivacy.com the root is rewritten to this route, but the library matches
  // the ORIGINAL request path. Hand it the path it expects.
  const url = new URL(request.url)
  if (url.pathname !== "/api/mcp") {
    url.pathname = "/api/mcp"
    return handler(new Request(url, request))
  }
  return handler(request)
}

const rateLimited = withRateLimit(counted, { resource: "/api/mcp", tier: "developer" })

export { rateLimited as GET, rateLimited as POST, rateLimited as DELETE }
