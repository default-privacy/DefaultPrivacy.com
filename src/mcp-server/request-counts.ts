/**
 * What to count for one MCP HTTP request: each JSON-RPC method it carries, and on
 * `initialize`, the connecting app's self-reported name (clientInfo.name).
 *
 * The server is stateless — every POST builds a fresh server — so the client name is
 * only visible on the initialize request itself and is never written beside a tool
 * call. Counts say which apps connect, not what a given app then asked. (A rare
 * name's updated_at still dates its connect, so at very low traffic timing alone can
 * line it up with other rows. Accepted: no lookup content is stored anywhere.)
 * Nothing else from the request is read.
 *
 * Each distinct method counts once per HTTP request, so a batched body costs at most
 * one upsert per method bucket (≤ 15 with the client name), not one per element.
 *
 * clientInfo.name is free text the connecting software chooses (MCP's user-agent), so
 * it is never stored as typed: it is folded onto a fixed list of known app families,
 * else "other". Only names on that list can become usage_counts keys, so a caller can
 * neither write an email into the table nor mint new rows. It is never stored next to
 * an IP or anything per-request.
 */

const KNOWN_METHODS = new Set([
  "initialize",
  "notifications/initialized",
  "notifications/cancelled",
  "ping",
  "tools/list",
  "tools/call",
  "resources/list",
  "resources/read",
  "resources/templates/list",
  "prompts/list",
  "prompts/get",
  "completion/complete",
  "logging/setLevel",
])

// Matched as substrings of the lowercased name with non-alphanumerics removed, in
// order: the first hit wins ("claude-code" before "claude").
const CLIENT_FAMILIES: [needle: string, bucket: string][] = [
  ["claudecode", "claude-code"],
  ["claude", "claude"],
  ["cursor", "cursor"],
  ["windsurf", "windsurf"],
  ["visualstudiocode", "vscode"],
  ["vscode", "vscode"],
  ["copilot", "copilot"],
  ["chatgpt", "chatgpt"],
  ["openai", "openai"],
  ["codex", "openai"],
  ["gemini", "gemini"],
  ["perplexity", "perplexity"],
  ["cline", "cline"],
  ["continue", "continue"],
  ["goose", "goose"],
  ["lmstudio", "lm-studio"],
  ["inspector", "mcp-inspector"],
  ["mcpremote", "mcp-remote"],
  ["smithery", "smithery"],
  ["postman", "postman"],
  ["n8n", "n8n"],
]

export function clientBucket(name: unknown): string {
  if (typeof name !== "string") return "unknown"
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, "")
  if (!key) return "unknown"
  return CLIENT_FAMILIES.find(([needle]) => key.includes(needle))?.[1] ?? "other"
}

export function mcpRequestCounts(body: unknown): { methods: string[]; client: string | null } {
  const messages = Array.isArray(body) ? body : [body]
  const methods = new Set<string>()
  let client: string | null = null
  for (const message of messages) {
    if (!message || typeof message !== "object") continue
    const { jsonrpc, method, params } = message as {
      jsonrpc?: unknown
      method?: unknown
      params?: { clientInfo?: { name?: unknown } }
    }
    if (jsonrpc !== "2.0" || typeof method !== "string") continue // not a JSON-RPC request
    methods.add(KNOWN_METHODS.has(method) ? method : "other")
    if (method === "initialize") client = clientBucket(params?.clientInfo?.name)
  }
  return { methods: [...methods], client }
}
