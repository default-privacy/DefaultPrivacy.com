/**
 * Every MCP address goes through this before the transport: refuse oversized batches,
 * then count each JSON-RPC method, the protocol revision, the Accept header's shape, the
 * kind of software sending it and, on connect, the app's name. Connects and tool calls are
 * also counted by kind of sender, so tool calls from scripts and probes can be told apart
 * from apps. Counting never blocks or fails the request.
 */

import { countUsage } from "@/lib/analytics/usage"

import { oversizedBatch } from "./batch-limit"
import { acceptBucket, mcpRequestCounts, protocolBucket, userAgentBucket } from "./request-counts"

export function withMcpGate(handler: (request: Request) => Promise<Response>) {
  return async (request: Request): Promise<Response> => {
    if (request.method === "POST") {
      countUsage("mcp_accept", acceptBucket(request.headers.get("accept")))
      const sender = userAgentBucket(request.headers.get("user-agent"))
      countUsage("mcp_ua", sender)
      try {
        const body = await request.clone().json()
        const refused = oversizedBatch(body)
        if (refused) return refused
        const { methods, client } = mcpRequestCounts(body)
        for (const method of methods) countUsage("mcp_method", method)
        if (client) countUsage("mcp_client", client)
        if (methods.includes("initialize")) countUsage("mcp_sender", `connect:${sender}`)
        if (methods.includes("tools/call")) countUsage("mcp_sender", `call:${sender}`)
        countUsage("mcp_protocol", protocolBucket(request.headers.get("mcp-protocol-version"), body))
      } catch {
        // Unparseable body: the transport answers it with a JSON-RPC parse error.
      }
    }
    return handler(request)
  }
}
