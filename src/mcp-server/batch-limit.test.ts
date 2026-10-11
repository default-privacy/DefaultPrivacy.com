import { describe, expect, it } from "vitest"
import { MAX_BATCH, oversizedBatch, withBatchLimit } from "./batch-limit"

const msgs = (n: number) => Array.from({ length: n }, (_, i) => ({ jsonrpc: "2.0", id: i, method: "ping" }))
const post = (body: unknown) =>
  new Request("https://example.test/api/mcp", { method: "POST", body: typeof body === "string" ? body : JSON.stringify(body) })

describe("oversizedBatch", () => {
  it("lets single messages and small batches through", () => {
    expect(oversizedBatch({ jsonrpc: "2.0", id: 1, method: "tools/list" })).toBeNull()
    expect(oversizedBatch(msgs(MAX_BATCH))).toBeNull()
  })

  it("refuses a batch over the limit with a JSON-RPC 400", async () => {
    const res = oversizedBatch(msgs(MAX_BATCH + 1))
    expect(res?.status).toBe(400)
    expect((await res!.json()).error.code).toBe(-32600)
  })
})

describe("withBatchLimit", () => {
  const ok = async () => new Response("handled")

  it("never calls the handler for an oversized batch", async () => {
    let called = false
    const res = await withBatchLimit(async () => ((called = true), new Response("handled")))(post(msgs(130_000)))
    expect(res.status).toBe(400)
    expect(called).toBe(false)
  })

  it("passes small batches, junk bodies and GETs to the handler", async () => {
    for (const req of [post(msgs(3)), post("not json"), new Request("https://example.test/api/mcp")]) {
      expect(await (await withBatchLimit(ok)(req)).text()).toBe("handled")
    }
  })
})
