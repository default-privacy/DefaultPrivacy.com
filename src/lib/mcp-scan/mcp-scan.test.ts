import { describe, expect, it } from "vitest"
import { ALLOWED_METHODS, parseRpcBody, probeServer } from "./probe"
import { vetUrl } from "./pinned-fetch"
import { reachOf } from "./reach"

type Sent = { method: string; headers: Record<string, string> }
type Msg = { method: string; id?: number; params?: { cursor?: string } }
function fakeServer(handler: (m: Msg) => { status: number; body: string; headers?: Record<string, string> }) {
  const sent: Sent[] = []
  const send = async (_u: string, init: { headers: Record<string, string>; body: string }) => {
    const m = JSON.parse(init.body) as Msg
    sent.push({ method: m.method, headers: init.headers })
    const r = handler(m)
    return { status: r.status, headers: r.headers ?? {}, body: r.body }
  }
  return { sent, send }
}
const ok = (id: number, result: unknown) => ({ status: 200, body: JSON.stringify({ jsonrpc: "2.0", id, result }) })

describe("probe never calls a tool", () => {
  it("allows only initialize, initialized and tools/list", () => {
    expect([...ALLOWED_METHODS].sort()).toEqual(["initialize", "notifications/initialized", "tools/list"])
  })
  it("a full probe sends nothing outside the allowlist", async () => {
    const { sent, send } = fakeServer((m) =>
      m.method === "initialize" ? ok(1, { protocolVersion: "2025-06-18", serverInfo: { name: "x" } })
      : m.method === "tools/list" ? ok(m.id!, { tools: [{ name: "send_email", description: "Send an email" }] })
      : { status: 202, body: "" })
    const r = await probeServer("https://x.test/mcp", send)
    expect(r.outcome).toBe("listed")
    expect(sent.map((s) => s.method)).toEqual(["initialize", "notifications/initialized", "tools/list"])
    expect(sent.every((s) => ALLOWED_METHODS.has(s.method))).toBe(true)
  })
})

describe("probe outcomes", () => {
  it("401 on initialize is sign_in", async () => {
    const { send } = fakeServer(() => ({ status: 401, body: "" }))
    expect((await probeServer("https://x.test", send)).outcome).toBe("sign_in")
  })
  it("reads a server-sent-events reply and carries the session id", async () => {
    const { sent, send } = fakeServer((m) =>
      m.method === "initialize"
        ? { status: 200, headers: { "mcp-session-id": "abc" }, body: `event: message\ndata: ${JSON.stringify({ jsonrpc: "2.0", id: 1, result: { protocolVersion: "2025-06-18" } })}\n\n` }
        : m.method === "tools/list" ? { status: 200, body: `data: ${JSON.stringify({ jsonrpc: "2.0", id: m.id!, result: { tools: [{ name: "a", description: "" }] } })}\n` }
        : { status: 202, body: "" })
    const r = await probeServer("https://x.test", send)
    expect(r.tools?.map((t) => t.name)).toEqual(["a"])
    expect(sent[2].headers["mcp-session-id"]).toBe("abc")
  })
  it("follows nextCursor pages", async () => {
    const { send } = fakeServer((m) =>
      m.method === "initialize" ? ok(1, {})
      : m.method === "tools/list" ? ok(m.id!, m.params?.cursor ? { tools: [{ name: "b", description: "" }] } : { tools: [{ name: "a", description: "" }], nextCursor: "p2" })
      : { status: 202, body: "" })
    expect((await probeServer("https://x.test", send)).tools?.map((t) => t.name)).toEqual(["a", "b"])
  })
  it("a JSON-RPC auth error on initialize is sign_in", async () => {
    const { send } = fakeServer(() => ({ status: 200, body: JSON.stringify({ jsonrpc: "2.0", id: 1, error: { code: -32001, message: "Unauthorized: missing API key" } }) }))
    expect((await probeServer("https://x.test", send)).outcome).toBe("sign_in")
  })
  it("a non-MCP page is not_mcp", async () => {
    const { send } = fakeServer(() => ({ status: 404, body: "<html>" }))
    expect((await probeServer("https://x.test", send)).outcome).toBe("not_mcp")
  })
  it("parseRpcBody ignores replies with another id", () => {
    expect(parseRpcBody(JSON.stringify({ id: 9, result: {} }), 1)).toBeNull()
  })
})

describe("vetUrl", () => {
  const pub = async () => ["93.184.215.14"]
  it.each(["http://x.test/", "https://x.test:8443/", "https://u:p@x.test/", "https://localhost/", "https://box.internal/"])("refuses %s", async (u) => {
    await expect(vetUrl(new URL(u), pub)).rejects.toMatchObject({ code: "URL_BLOCKED" })
  })
  it("refuses a host with any private address", async () => {
    await expect(vetUrl(new URL("https://x.test/"), async () => ["93.184.215.14", "192.168.1.1"])).rejects.toMatchObject({ code: "ADDRESS_BLOCKED" })
  })
  it("refuses an IPv4-mapped loopback written in hex", async () => {
    await expect(vetUrl(new URL("https://x.test/"), async () => ["::ffff:7f00:1"])).rejects.toMatchObject({ code: "ADDRESS_BLOCKED" })
  })
  it("passes a public host", async () => {
    await expect(vetUrl(new URL("https://x.test/mcp"), pub)).resolves.toEqual(["93.184.215.14"])
  })
})

describe("reach flags", () => {
  const t = (name: string, description = "") => ({ name, description })
  it("flags each kind from the tool name", () => {
    const r = reachOf([t("read_file"), t("sendEmail"), t("submit_payment"), t("distill_webpage"), t("run_shell_command")])
    expect(r.reach).toEqual(["files", "messages", "money", "browse", "code"])
    expect(r.evidence.messages).toEqual(["sendEmail"])
  })
  it("ignores descriptions, so a denial cannot raise a flag (first-sample false positives)", () => {
    const r = reachOf([
      t("submit_enquiry", "Submits an enquiry NOT a purchase, NOT a guaranteed quote"),
      t("get_product", "price, size, buy link and price history"),
      t("check_api_key_status", "send an email to request a key"),
      t("get_national_fha_stats", "how many payments were denied"),
    ])
    expect(r.reach).toEqual([])
  })
  it("needs a verb and an object together", () => {
    expect(reachOf([t("payment_docs"), t("list_orders")]).reach).toEqual([])
    expect(reachOf([t("place_order")]).reach).toEqual(["money"])
  })
  it("does not flag the second sample's false positives", () => {
    const r = reachOf([t("get_page"), t("read_page"), t("browse_topics"), t("musicbrainz_browse_entities"), t("get_booking_url"), t("get_terminal_logs"), t("sendgrid_search_contacts_by_email")])
    expect(r.reach).toEqual([])
  })
  it("does not flag the independent check's wrong patterns", () => {
    const wrong = ["search_swiss_directory", "dub_list_folders", "get_font_files", "billomat_create_draft_invoice", "send_invoice",
      "record_purchase", "analyze_purchase", "create_buy_request", "draft_email", "list_redactable_line_text",
      "fetch_cometchat_doc_page", "shell_escape", "generate_no_shell_prompt"]
    for (const name of wrong) expect(reachOf([t(name)]).reach, name).toEqual([])
  })
  it("still flags the plain cases", () => {
    expect(reachOf([t("buy_course")]).reach).toEqual(["money"])
    expect(reachOf([t("upload_file")]).reach).toEqual(["files"])
    expect(reachOf([t("read_webpage")]).reach).toEqual(["browse"])
    expect(reachOf([t("execute_python")]).reach).toEqual(["code"])
  })
  it("catches the first sample's missed money tools", () => {
    expect(reachOf([t("request_paid_access")]).reach).toEqual(["money"])
    expect(reachOf([t("create_checkout_link")]).reach).toEqual(["money"])
  })
})
