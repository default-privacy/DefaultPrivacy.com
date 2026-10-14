/**
 * What to count for one MCP HTTP request: each JSON-RPC method it carries, and on
 * `initialize`, the connecting app's self-reported name (clientInfo.name).
 *
 * The server is stateless — every POST builds a fresh server — so the client name is
 * only visible on the initialize request itself and is never written beside a tool
 * call. Counts say which apps connect, not what a given app then asked. (A rare
 * name's updated_at still dates its connect, so at very low traffic timing alone can
 * line it up with other rows. Accepted: no lookup content is stored anywhere.)
 * Besides the body, only two headers are read, each folded to a fixed set: the protocol
 * version and the Accept header's shape.
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

// Protocol revisions, newest last. 2026-07-28 drops the initialize handshake, so a
// rise in its bucket means apps that connect without ever being counted in mcp_client.
const PROTOCOL_VERSIONS = new Set(["2024-11-05", "2025-03-26", "2025-06-18", "2025-11-25", "2026-07-28"])

/**
 * Which protocol revision one HTTP request speaks: the MCP-Protocol-Version header
 * (sent on every request after the handshake, and on every request from 2026-07-28),
 * else the version an initialize asks for, else "none". Unknown values fold to "other".
 */
export function protocolBucket(header: string | null, body: unknown): string {
  const first = Array.isArray(body) ? body[0] : body
  const requested =
    first && typeof first === "object" && (first as { method?: unknown }).method === "initialize"
      ? (first as { params?: { protocolVersion?: unknown } }).params?.protocolVersion
      : undefined
  const version = header ?? (typeof requested === "string" ? requested : null)
  if (version === null) return "none"
  return PROTOCOL_VERSIONS.has(version) ? version : "other"
}

/**
 * What a POST's Accept header allows, folded to a fixed set. The transport answers 406
 * unless both application/json and text/event-stream are listed, so this shows whether
 * the 406s come from clients that send "*\/*", JSON only, or nothing at all.
 */
export function acceptBucket(header: string | null): string {
  if (!header || !header.trim()) return "none"
  const types = header.toLowerCase().split(",").map((part) => part.split(";")[0].trim())
  const json = types.includes("application/json")
  const sse = types.includes("text/event-stream")
  if (json && sse) return "json+sse"
  if (json) return "json"
  if (sse) return "sse"
  if (types.includes("*/*")) return "any"
  return "other"
}

/**
 * What kind of software sent a POST, folded from its User-Agent to a fixed set. The
 * header is read, matched and dropped: only the bucket name is ever counted, so a
 * caller cannot write text into the table, and it is never stored beside an IP.
 * Its one job is to tell people's software from scripts and self-declared probes, so
 * demand numbers can be read without them. A prober that does not say what it is
 * lands in "script" or "other", so this narrows the noise rather than removing it.
 */
const BOT_WORDS = ["bot", "crawl", "spider", "probe", "monitor", "liveness", "uptime"]
const SCRIPT_CLIENTS = ["curl", "wget", "python", "aiohttp", "httpx", "node", "undici", "axios", "go-http", "okhttp", "java", "php", "ruby", "deno", "bun/"]

export function userAgentBucket(header: string | null): string {
  const ua = header?.trim().toLowerCase()
  if (!ua) return "none"
  if (BOT_WORDS.some((word) => ua.includes(word))) return "bot-declared"
  if (ua.startsWith("mozilla/")) return "browser-like"
  if (SCRIPT_CLIENTS.some((name) => ua.startsWith(name))) return "script"
  return "other"
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
