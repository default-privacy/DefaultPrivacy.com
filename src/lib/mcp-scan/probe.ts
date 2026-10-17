/**
 * Read-only probe of one hosted MCP server: initialize, then tools/list. Nothing else.
 *
 * Calling a tool on someone else's server can have side effects (send a message, spend
 * money), so the probe can only send the methods in ALLOWED_METHODS; `rpc` refuses any
 * other method before a byte leaves this machine.
 */

import { pinnedFetch, PinnedFetchError, type PinnedResponse } from "./pinned-fetch"

export const ALLOWED_METHODS = new Set(["initialize", "notifications/initialized", "tools/list"])
export const PROTOCOL_VERSION = "2025-06-18"
export const SCAN_USER_AGENT =
  "DefaultPrivacy-MCP-scan/0.1 (+https://defaultprivacy.com/mcp-scan; read-only: initialize and tools/list only; opt out: privacy@defaultprivacy.com)"

export type ProbeTool = {
  name: string
  description: string
  annotations?: { readOnlyHint?: boolean; destructiveHint?: boolean; openWorldHint?: boolean; title?: string }
}

export type ProbeOutcome = "listed" | "sign_in" | "refused_url" | "refused_address" | "unreachable" | "not_mcp" | "error"

export type ProbeResult = {
  outcome: ProbeOutcome
  httpStatus: number | null
  protocolVersion: string | null
  serverInfo: { name: string | null; version: string | null } | null
  tools: ProbeTool[] | null
  error: string | null
}

type Send = (url: string, init: { headers: Record<string, string>; body: string }) => Promise<PinnedResponse>

const defaultSend: Send = (url, init) => pinnedFetch(url, { method: "POST", headers: init.headers, body: init.body, timeoutMs: 15_000 })

/** Pull the JSON-RPC reply with `id` out of a JSON or server-sent-events body. */
export function parseRpcBody(body: string, id: number): Record<string, unknown> | null {
  const candidates: string[] = []
  const t = body.trim()
  if (t.startsWith("{") || t.startsWith("[")) candidates.push(t)
  for (const line of body.split(/\r?\n/)) if (line.startsWith("data:")) candidates.push(line.slice(5).trim())
  for (const c of candidates) {
    try {
      const j = JSON.parse(c)
      const list = Array.isArray(j) ? j : [j]
      const hit = list.find((m) => m && typeof m === "object" && m.id === id)
      if (hit) return hit as Record<string, unknown>
    } catch {
      /* not JSON */
    }
  }
  return null
}

const clip = (v: unknown, n: number) => (typeof v === "string" ? v.slice(0, n) : "")

export async function probeServer(url: string, send: Send = defaultSend): Promise<ProbeResult> {
  const base = { protocolVersion: null, serverInfo: null, tools: null } as const
  let session: string | undefined
  let negotiated = PROTOCOL_VERSION

  async function rpc(method: string, id: number | null, params?: unknown): Promise<PinnedResponse> {
    if (!ALLOWED_METHODS.has(method)) throw new Error(`probe refuses to send ${method}`)
    const headers: Record<string, string> = {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      "user-agent": SCAN_USER_AGENT,
      "mcp-protocol-version": negotiated,
    }
    if (session) headers["mcp-session-id"] = session
    const msg = id === null ? { jsonrpc: "2.0", method, params } : { jsonrpc: "2.0", id, method, params }
    return send(url, { headers, body: JSON.stringify(msg) })
  }

  try {
    const init = await rpc("initialize", 1, {
      protocolVersion: PROTOCOL_VERSION,
      capabilities: {},
      clientInfo: { name: "defaultprivacy-scan", version: "0.1" },
    })
    if (init.status === 401 || init.status === 403) return { ...base, outcome: "sign_in", httpStatus: init.status, error: null }
    if (init.status !== 200) return { ...base, outcome: "not_mcp", httpStatus: init.status, error: null }
    const ir = parseRpcBody(init.body, 1)
    const result = ir?.result as Record<string, unknown> | undefined
    if (!result) {
      const err = ir?.error as { code?: number; message?: string } | undefined
      const authish = err && /auth|token|key|unauthori[sz]ed|forbidden/i.test(err.message ?? "")
      return { ...base, outcome: authish ? "sign_in" : "not_mcp", httpStatus: 200, error: clip(err?.message, 200) || null }
    }
    session = init.headers["mcp-session-id"]
    negotiated = typeof result.protocolVersion === "string" ? result.protocolVersion : PROTOCOL_VERSION
    const si = result.serverInfo as Record<string, unknown> | undefined
    const serverInfo = { name: clip(si?.name, 100) || null, version: clip(si?.version, 50) || null }

    await rpc("notifications/initialized", null)

    const tools: ProbeTool[] = []
    let cursor: string | undefined
    for (let page = 0; page < 5; page++) {
      const lr = await rpc("tools/list", 2 + page, cursor ? { cursor } : {})
      if (lr.status === 401 || lr.status === 403) {
        return { outcome: "sign_in", httpStatus: lr.status, protocolVersion: negotiated, serverInfo, tools: null, error: null }
      }
      const lj = parseRpcBody(lr.body, 2 + page)
      const lres = lj?.result as { tools?: unknown[]; nextCursor?: string } | undefined
      if (!lres) {
        const err = lj?.error as { message?: string } | undefined
        const authish = /auth|token|key|unauthori[sz]ed|forbidden/i.test(err?.message ?? "")
        return { outcome: authish ? "sign_in" : "error", httpStatus: lr.status, protocolVersion: negotiated, serverInfo, tools: null, error: clip(err?.message, 200) || "no tools/list result" }
      }
      for (const t of lres.tools ?? []) {
        const o = t as Record<string, unknown>
        const a = (o.annotations ?? {}) as Record<string, unknown>
        tools.push({
          name: clip(o.name, 120),
          description: clip(o.description, 1000),
          annotations: {
            readOnlyHint: typeof a.readOnlyHint === "boolean" ? a.readOnlyHint : undefined,
            destructiveHint: typeof a.destructiveHint === "boolean" ? a.destructiveHint : undefined,
            openWorldHint: typeof a.openWorldHint === "boolean" ? a.openWorldHint : undefined,
          },
        })
      }
      if (!lres.nextCursor || tools.length >= 500) break
      cursor = lres.nextCursor
    }
    return { outcome: "listed", httpStatus: 200, protocolVersion: negotiated, serverInfo, tools, error: null }
  } catch (e) {
    if (e instanceof PinnedFetchError) {
      const outcome: ProbeOutcome = e.code === "URL_BLOCKED" ? "refused_url" : e.code === "ADDRESS_BLOCKED" ? "refused_address" : "unreachable"
      return { ...base, outcome, httpStatus: null, error: `${e.code}: ${clip(e.message, 160)}` }
    }
    return { ...base, outcome: "error", httpStatus: null, error: clip((e as Error).message, 200) }
  }
}
