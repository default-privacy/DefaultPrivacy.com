/**
 * Every MCP address goes through this before the transport: refuse oversized batches and
 * bodies that aren't JSON, then count each JSON-RPC method, the protocol revision, the
 * Accept header's shape, the kind of software sending it and, on connect, the app's name.
 * Connects and tool calls are also counted by kind of sender, so tool calls from scripts
 * and probes can be told apart from apps. Counting never blocks or fails the request.
 */

import { countUsage } from "@/lib/analytics/usage"

import { oversizedBatch } from "./batch-limit"
import { acceptBucket, mcpRequestCounts, protocolBucket, userAgentBucket } from "./request-counts"

// mcp-handler 1.x never answers a JSON body it can't parse, so the request hangs until the
// 60s function limit. Answer with JSON-RPC's own parse error instead.
const parseError = () =>
  Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400 })

export function withMcpGate(handler: (request: Request) => Promise<Response>) {
  return async (request: Request): Promise<Response> => {
    if (request.method !== "POST") return handler(request)
    const sender = userAgentBucket(request.headers.get("user-agent"))
    const countSender = () => {
      countUsage("mcp_accept", acceptBucket(request.headers.get("accept")))
      countUsage("mcp_ua", sender)
    }

    let body: unknown
    try {
      body = await request.clone().json()
    } catch {
      if (sender !== "bot-declared") countSender()
      return parseError()
    }
    const refused = oversizedBatch(body)
    if (refused) return refused

    const { methods, client } = mcpRequestCounts(body)
    // A self-declared bot that isn't calling a tool is a liveness probe (one checks every few
    // minutes). Counting it is the only database work its visit causes, and that alone kept
    // the database from ever idling. Its tool calls are still counted.
    if (sender === "bot-declared" && !methods.includes("tools/call")) return handler(request)

    countSender()
    for (const method of methods) countUsage("mcp_method", method)
    if (client) countUsage("mcp_client", client)
    if (methods.includes("initialize")) countUsage("mcp_sender", `connect:${sender}`)
    if (methods.includes("tools/call")) countUsage("mcp_sender", `call:${sender}`)
    countUsage("mcp_protocol", protocolBucket(request.headers.get("mcp-protocol-version"), body))
    return handler(request)
  }
}
