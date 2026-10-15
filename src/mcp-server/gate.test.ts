import { beforeEach, describe, expect, it, vi } from "vitest"

const counted: [string, string][] = []
vi.mock("@/lib/analytics/usage", () => ({ countUsage: (kind: string, key: string) => counted.push([kind, key]) }))

const { withMcpGate } = await import("./gate")

const msgs = (n: number) => Array.from({ length: n }, (_, i) => ({ jsonrpc: "2.0", id: i, method: "ping" }))
const post = (body: unknown, headers: Record<string, string> = {}) =>
  new Request("https://example.test/api/mcp", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  })
const ok = async () => new Response("handled")

beforeEach(() => {
  counted.length = 0
})

describe("withMcpGate", () => {
  it("never calls the handler for an oversized batch", async () => {
    let called = false
    const res = await withMcpGate(async () => ((called = true), new Response("handled")))(post(msgs(130_000)))
    expect(res.status).toBe(400)
    expect(called).toBe(false)
  })

  it("passes small batches, junk bodies and GETs to the handler", async () => {
    for (const req of [post(msgs(3)), post("not json"), new Request("https://example.test/api/mcp")]) {
      expect(await (await withMcpGate(ok)(req)).text()).toBe("handled")
    }
  })

  it("counts method, app, protocol and Accept shape on a connect", async () => {
    const init = { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", clientInfo: { name: "Cursor" } } }
    await withMcpGate(ok)(post(init, { accept: "*/*", "user-agent": "curl/8.5.0" }))
    expect(counted).toEqual(
      expect.arrayContaining([
        ["mcp_accept", "any"],
        ["mcp_ua", "script"],
        ["mcp_method", "initialize"],
        ["mcp_client", "cursor"],
        ["mcp_protocol", "2025-06-18"],
        ["mcp_sender", "connect:script"],
      ]),
    )
  })

  it("counts a tool call by kind of sender, and only connects and tool calls", async () => {
    const call = { jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "dp_search", arguments: { query: "vpn" } } }
    await withMcpGate(ok)(post(call, { "user-agent": "Claude-User/1.0" }))
    await withMcpGate(ok)(post(msgs(1), { "user-agent": "curl/8.5.0" }))
    const senders = counted.filter(([kind]) => kind === "mcp_sender")
    expect(senders).toEqual([["mcp_sender", "call:anthropic"]])
  })

  it("counts the Accept shape even when the body can't be parsed", async () => {
    await withMcpGate(ok)(post("not json"))
    expect(counted).toEqual([["mcp_accept", "none"], ["mcp_ua", "none"]])
  })

  it("counts nothing for a GET", async () => {
    await withMcpGate(ok)(new Request("https://example.test/api/mcp", { headers: { accept: "*/*" } }))
    expect(counted).toEqual([])
  })
})

describe("every MCP address", () => {
  it("goes through the gate, so none is uncounted or unlimited", async () => {
    const { readFileSync } = await import("node:fs")
    for (const route of ["src/app/api/mcp/route.ts", "src/app/api/privacy/mcp/route.ts"]) {
      expect(readFileSync(route, "utf8"), route).toMatch(/withRateLimit\(withMcpGate\(/)
    }
  })
})
