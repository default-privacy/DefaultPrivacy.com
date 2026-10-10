import { describe, expect, it } from "vitest"
import { clientBucket, mcpRequestCounts } from "./request-counts"

describe("mcpRequestCounts", () => {
  it("counts an initialize and buckets the app name", () => {
    const body = { jsonrpc: "2.0", id: 1, method: "initialize", params: { clientInfo: { name: "claude-ai", version: "1.0" } } }
    expect(mcpRequestCounts(body)).toEqual({ methods: ["initialize"], client: "claude" })
  })

  it("counts every request in a batch and ignores client replies", () => {
    const body = [
      { jsonrpc: "2.0", id: 1, method: "tools/list" },
      { jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "dp_get_tool" } },
      { jsonrpc: "2.0", id: 9, result: {} },
    ]
    expect(mcpRequestCounts(body)).toEqual({ methods: ["tools/list", "tools/call"], client: null })
  })

  it("folds unknown methods into 'other' so callers can't mint keys", () => {
    expect(mcpRequestCounts({ jsonrpc: "2.0", method: "x/".repeat(50) }).methods).toEqual(["other"])
  })

  it("counts each method once per request, however large the batch", () => {
    const batch = Array.from({ length: 130_000 }, (_, i) => ({ jsonrpc: "2.0", id: i, method: i % 2 ? "ping" : "zzz" }))
    expect(mcpRequestCounts(batch).methods).toEqual(["other", "ping"])
  })

  it("skips messages that aren't JSON-RPC 2.0", () => {
    expect(mcpRequestCounts([{ method: "x" }, { jsonrpc: "1.0", method: "ping" }]).methods).toEqual([])
  })

  it("tolerates junk bodies", () => {
    for (const body of [null, 42, "str", [], [null, 1], {}]) {
      expect(mcpRequestCounts(body)).toEqual({ methods: [], client: null })
    }
  })

  it("reads no client name off anything but initialize", () => {
    expect(mcpRequestCounts({ jsonrpc: "2.0", method: "ping", params: { clientInfo: { name: "sneaky" } } }).client).toBeNull()
  })
})

describe("clientBucket", () => {
  it("folds known apps onto a fixed family name", () => {
    expect(clientBucket("claude-ai")).toBe("claude")
    expect(clientBucket("Claude Code")).toBe("claude-code")
    expect(clientBucket("cursor-vscode")).toBe("cursor")
    expect(clientBucket("Visual Studio Code")).toBe("vscode")
    expect(clientBucket("openai-mcp")).toBe("openai")
  })

  it("stores nothing a caller typed: free text becomes 'other'", () => {
    for (const name of ["john@example.com", "+1 555 123 4567", "jane-doe-gmail-com", "x".repeat(500)]) {
      expect(clientBucket(name)).toBe("other")
    }
  })

  it("says 'unknown' for missing or empty names", () => {
    for (const name of [undefined, null, 7, "", "!!!"]) expect(clientBucket(name)).toBe("unknown")
  })
})
