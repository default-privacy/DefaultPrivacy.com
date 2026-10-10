import { describe, expect, it, vi } from "vitest"
import { parseRpcBody, registerSiteTools, type ModelContextLike, type WebMcpTool } from "./webmcp"

const MCP_URL = "https://example.test/api/mcp"

const LISTED = [
  {
    name: "dp_search_glossary",
    title: "Search the glossary",
    description: "Search glossary terms.",
    inputSchema: { type: "object", properties: { query: { type: "string" } } },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "dp_get_guide",
    description: "Fetch one guide.",
    inputSchema: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
    annotations: { readOnlyHint: true },
  },
  {
    name: "dp_check_whois_privacy",
    description: "Look up a domain's WHOIS record.",
    inputSchema: { type: "object", properties: { domain: { type: "string" } }, required: ["domain"] },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
]

const CALL_RESULT = { content: [{ type: "text", text: '{"data":[{"term":"Tor"}]}' }] }

/** The current spec: registerTool(tool, { signal }) returns a promise; aborting unregisters. */
function fakeModelContext() {
  const tools = new Map<string, WebMcpTool>()
  const modelContext: ModelContextLike = {
    registerTool: vi.fn(async (tool: WebMcpTool, options?: { signal?: AbortSignal }) => {
      if (tools.has(tool.name)) throw new DOMException("duplicate", "InvalidStateError")
      tools.set(tool.name, tool)
      options?.signal?.addEventListener("abort", () => tools.delete(tool.name))
    }),
  }
  return { modelContext, tools }
}

function jsonResponse(result: unknown) {
  return new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, result }), {
    headers: { "Content-Type": "application/json" },
  })
}

function sseResponse(result: unknown) {
  const body = `event: message\ndata: ${JSON.stringify({ jsonrpc: "2.0", id: 1, result })}\n\n`
  return new Response(body, { headers: { "Content-Type": "text/event-stream" } })
}

function fakeFetch(respond: (result: unknown) => Response = jsonResponse) {
  return vi.fn(async (_url: RequestInfo | URL, init?: RequestInit) => {
    const { method } = JSON.parse(String(init?.body))
    return respond(method === "tools/list" ? { tools: LISTED } : CALL_RESULT)
  })
}

describe("registerSiteTools", () => {
  it("registers one tool per tools/list entry with its name, description, schema and read-only hint", async () => {
    const { modelContext, tools } = fakeModelContext()
    const fetchImpl = fakeFetch()

    const names = await registerSiteTools(modelContext, fetchImpl, MCP_URL, new AbortController().signal)

    expect(names).toEqual(["dp_search_glossary", "dp_get_guide", "dp_check_whois_privacy"])
    for (const listed of LISTED) {
      const tool = tools.get(listed.name)!
      expect(tool.description).toBe(listed.description)
      expect(tool.inputSchema).toEqual(listed.inputSchema)
      expect(tool.annotations).toEqual({
        readOnlyHint: true,
        untrustedContentHint: listed.annotations.openWorldHint === true,
      })
    }
    expect(tools.get("dp_search_glossary")!.title).toBe("Search the glossary")

    const [url, init] = fetchImpl.mock.calls[0]
    expect(url).toBe(MCP_URL)
    expect(init?.method).toBe("POST")
    expect(new Headers(init?.headers).get("accept")).toBe("application/json, text/event-stream")
    expect(JSON.parse(String(init?.body))).toMatchObject({ jsonrpc: "2.0", method: "tools/list" })
  })

  it("execute() sends tools/call and returns the MCP result", async () => {
    const { modelContext, tools } = fakeModelContext()
    const fetchImpl = fakeFetch()
    await registerSiteTools(modelContext, fetchImpl, MCP_URL, new AbortController().signal)

    const result = await tools.get("dp_search_glossary")!.execute({ query: "tor" })

    expect(result).toEqual(CALL_RESULT)
    const [url, init] = fetchImpl.mock.calls[1]
    expect(url).toBe(MCP_URL)
    expect(JSON.parse(String(init?.body))).toMatchObject({
      jsonrpc: "2.0",
      method: "tools/call",
      params: { name: "dp_search_glossary", arguments: { query: "tor" } },
    })
  })

  it("parses SSE-framed responses for both list and call", async () => {
    const { modelContext, tools } = fakeModelContext()
    await registerSiteTools(modelContext, fakeFetch(sseResponse), MCP_URL, new AbortController().signal)

    expect(tools.size).toBe(LISTED.length)
    expect(await tools.get("dp_get_guide")!.execute({ slug: "x" })).toEqual(CALL_RESULT)
  })

  it("does not throw when fetch fails, the server errors, or there is no modelContext", async () => {
    const signal = new AbortController().signal
    const { modelContext, tools } = fakeModelContext()

    const rejecting = vi.fn(async () => {
      throw new TypeError("network down")
    })
    await expect(registerSiteTools(modelContext, rejecting, MCP_URL, signal)).resolves.toEqual([])

    const serverError = vi.fn(async () => new Response("nope", { status: 500 }))
    await expect(registerSiteTools(modelContext, serverError, MCP_URL, signal)).resolves.toEqual([])
    expect(tools.size).toBe(0)

    const unused = fakeFetch()
    await expect(registerSiteTools(undefined, unused, MCP_URL, signal)).resolves.toEqual([])
    expect(unused).not.toHaveBeenCalled()
  })

  it("aborting the signal unregisters every tool", async () => {
    const { modelContext, tools } = fakeModelContext()
    const controller = new AbortController()
    await registerSiteTools(modelContext, fakeFetch(), MCP_URL, controller.signal)
    expect(tools.size).toBe(LISTED.length)

    controller.abort()

    expect(tools.size).toBe(0)
  })

  it("also calls unregisterTool(name) on builds that have it", async () => {
    const unregisterTool = vi.fn()
    const modelContext: ModelContextLike = { registerTool: vi.fn(), unregisterTool }
    const controller = new AbortController()
    await registerSiteTools(modelContext, fakeFetch(), MCP_URL, controller.signal)

    controller.abort()

    expect(unregisterTool.mock.calls.map(([name]) => name)).toEqual(LISTED.map((t) => t.name))
  })
})

describe("parseRpcBody", () => {
  it("reads plain JSON and multi-line SSE data", () => {
    expect(parseRpcBody('{"jsonrpc":"2.0","id":1,"result":{"ok":true}}').result).toEqual({ ok: true })
    const sse = 'event: message\ndata: {"jsonrpc":"2.0",\ndata: "id":1,"result":{"ok":true}}\n\n'
    expect(parseRpcBody(sse).result).toEqual({ ok: true })
  })
})
