/**
 * Old address for the MCP plug. Outside lists still send programs to
 * /api/privacy/mcp. Same server as /api/mcp. basePath must be /api/privacy
 * or the handler answers "Not found" — it only serves the path it was given.
 */

import { createMcpHandler } from "mcp-handler"

import { withRateLimit } from "@/lib/api-rate-limit"
import { withBatchLimit } from "@/mcp-server/batch-limit"
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
    basePath: "/api/privacy",
    disableSse: true,
    verboseLogs: false,
    maxDuration: 60,
  },
)

const rateLimited = withRateLimit(withBatchLimit(handler), { resource: "/api/privacy/mcp", tier: "developer" })

export { rateLimited as GET, rateLimited as POST, rateLimited as DELETE }
