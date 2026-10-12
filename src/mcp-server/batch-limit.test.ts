import { describe, expect, it } from "vitest"
import { MAX_BATCH, oversizedBatch } from "./batch-limit"

const msgs = (n: number) => Array.from({ length: n }, (_, i) => ({ jsonrpc: "2.0", id: i, method: "ping" }))

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

