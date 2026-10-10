/**
 * WebMCP bridge: hands the site's own MCP tools (/api/mcp) to an AI agent running in the
 * visitor's browser, so there is one tool list, defined once in src/mcp-server/tools.ts.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/ — `registerTool(tool, { signal })`
 * returns a promise and is undone by aborting the signal; `execute(input, { signal })` may
 * return any JSON-serializable value. Builds from before 2026-03 had `unregisterTool(name)`
 * instead, so it is also called when present.
 */

export type WebMcpTool = {
  name: string
  title?: string
  description: string
  inputSchema?: object
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean }
  execute: (input: object, options?: { signal?: AbortSignal }) => Promise<unknown>
}

export type ModelContextLike = {
  registerTool: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => unknown
  unregisterTool?: (name: string) => unknown
}

type McpTool = {
  name: string
  title?: string
  description?: string
  inputSchema?: object
  annotations?: { readOnlyHint?: boolean; openWorldHint?: boolean }
}

/** A JSON-RPC response body, sent either as plain JSON or as Server-Sent Events. */
export function parseRpcBody(text: string): { result?: unknown; error?: { message?: string } } {
  if (text.trimStart().startsWith("{")) return JSON.parse(text)
  for (const event of text.split(/\r?\n\r?\n/)) {
    const data = event
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).replace(/^ /, ""))
      .join("\n")
    if (!data) continue
    const message = JSON.parse(data)
    if ("result" in message || "error" in message) return message
  }
  throw new Error("No JSON-RPC response in body")
}

async function rpc(
  fetchImpl: typeof fetch,
  mcpUrl: string,
  method: string,
  params: object,
  signal?: AbortSignal,
): Promise<unknown> {
  const response = await fetchImpl(mcpUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    credentials: "omit",
    signal,
  })
  if (!response.ok) throw new Error(`${method}: HTTP ${response.status}`)
  const message = parseRpcBody(await response.text())
  if (message.error) throw new Error(`${method}: ${message.error.message ?? "error"}`)
  return message.result
}

/**
 * Registers every tool /api/mcp lists. Aborting `signal` unregisters them (and cancels a
 * tools/list still in flight). Never throws: a browser without WebMCP, a failed request or a
 * refused registration just means fewer tools. Resolves to the names registered.
 */
export async function registerSiteTools(
  modelContext: ModelContextLike | undefined,
  fetchImpl: typeof fetch,
  mcpUrl: string,
  signal: AbortSignal,
): Promise<string[]> {
  if (typeof modelContext?.registerTool !== "function") return []

  let tools: McpTool[]
  try {
    const listed = (await rpc(fetchImpl, mcpUrl, "tools/list", {}, signal)) as { tools?: McpTool[] }
    tools = listed?.tools ?? []
  } catch {
    return []
  }

  const registered: string[] = []
  const unregisterAll = () => {
    for (const name of registered) {
      try {
        modelContext.unregisterTool?.(name)
      } catch {
        // Already gone.
      }
    }
  }
  signal.addEventListener("abort", unregisterAll)

  for (const tool of tools) {
    if (signal.aborted) break
    try {
      await modelContext.registerTool(
        {
          name: tool.name,
          title: tool.title,
          description: tool.description ?? tool.name,
          inputSchema: tool.inputSchema,
          annotations: {
            readOnlyHint: tool.annotations?.readOnlyHint === true,
            // Open-world tools (the domain checks) return third-party data such as WHOIS
            // and DNS records, which can carry text aimed at the agent.
            untrustedContentHint: tool.annotations?.openWorldHint === true,
          },
          // The MCP result already has the shape the WebMCP explainer returns: { content: [...] }.
          execute: (input, options) =>
            rpc(fetchImpl, mcpUrl, "tools/call", { name: tool.name, arguments: input ?? {} }, options?.signal),
        },
        { signal },
      )
      registered.push(tool.name)
    } catch {
      // Refused (duplicate name, bad schema, aborted): skip this one.
    }
  }
  // An abort during the last registration fired before that name was recorded.
  if (signal.aborted) unregisterAll()
  return registered
}
