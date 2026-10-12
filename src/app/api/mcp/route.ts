/**
 * Default Privacy MCP server — remote Streamable HTTP transport.
 *
 * POST /api/mcp  → JSON-RPC (tools/list, tools/call, resources/*, prompts/*).
 * Stateless (SSE disabled → no Redis needed). The tool/resource/prompt layer lives in
 * `@/mcp-server` and is transport-agnostic. A coarse per-IP limit guards the endpoint;
 * outbound-network tools carry their own per-call limits.
 */

import { createMcpHandler } from "mcp-handler"

import { withRateLimit } from "@/lib/api-rate-limit"
import { withMcpGate } from "@/mcp-server/gate"
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

async function routed(request: Request): Promise<Response> {
  // On mcp.defaultprivacy.com the root is rewritten to this route, but the library matches
  // the ORIGINAL request path. Hand it the path it expects.
  const url = new URL(request.url)
  if (url.pathname !== "/api/mcp") {
    url.pathname = "/api/mcp"
    return handler(new Request(url, request))
  }
  return handler(request)
}

const rateLimited = withRateLimit(withMcpGate(routed), { resource: "/api/mcp", tier: "developer" })

export { rateLimited as GET, rateLimited as POST, rateLimited as DELETE }
