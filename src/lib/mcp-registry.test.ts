import { describe, expect, it } from "vitest"
import { factsFrom, lookupRegistry, registryNameFor } from "./mcp-registry"

const entry = {
  server: {
    name: "io.github.mrfentmen/bitwarden-mcp",
    repository: { url: "https://github.com/mrfentmen/awesome-mcps" },
    remotes: [{ url: "https://x.example/mcp" }, { url: "http://y.example/mcp" }],
    packages: [{ registryType: "npm", identifier: "@mrfentmen/bitwarden-mcp" }],
  },
  _meta: { "io.modelcontextprotocol.registry/official": { status: "active", publishedAt: "2026-09-22T19:21:32Z" } },
}

const reply = (status: number, body?: unknown) => (async () => new Response(body ? JSON.stringify(body) : null, { status })) as unknown as typeof fetch

describe("registryNameFor", () => {
  it("maps a GitHub URL to the registry's io.github name, owner lowercased", () => {
    expect(registryNameFor("https://github.com/MrFentmen/bitwarden-mcp")).toBe("io.github.mrfentmen/bitwarden-mcp")
    expect(registryNameFor("github.com/a/b.git")).toBe("io.github.a/b")
    expect(registryNameFor("https://www.github.com/a/b/tree/main/src")).toBe("io.github.a/b")
  })
  it("uses a reverse-DNS name as written", () => {
    expect(registryNameFor("ai.smithery/smithery-ai-github")).toBe("ai.smithery/smithery-ai-github")
  })
  it("gives no name for a bare word, a server URL or an owner-only URL, so nothing is fuzzy-matched", () => {
    expect(registryNameFor("bitwarden")).toBeNull()
    expect(registryNameFor("https://mcp.example.com/sse")).toBeNull()
    expect(registryNameFor("https://github.com/bitwarden")).toBeNull()
  })
})

describe("factsFrom", () => {
  it("reads declared fields and flags non-https remotes", () => {
    const f = factsFrom(entry)!
    expect(f.status).toBe("active")
    expect(f.source_repository).toBe("https://github.com/mrfentmen/awesome-mcps")
    expect(f.remotes.map((r) => r.https)).toEqual([true, false])
    expect(f.packages).toEqual([{ registry: "npm", identifier: "@mrfentmen/bitwarden-mcp" }])
  })
  it("returns null without a server name, and null fields when nothing is declared", () => {
    expect(factsFrom({})).toBeNull()
    expect(factsFrom({ server: { name: "a.b/c" } })).toMatchObject({ status: null, source_repository: null, remotes: [], packages: [] })
  })
})

describe("lookupRegistry", () => {
  it("found / not_found / unavailable, and never throws", async () => {
    expect((await lookupRegistry("ai.smithery/y", reply(200, entry))).state).toBe("found")
    expect(await lookupRegistry("ai.smithery/y", reply(404))).toEqual({ state: "not_found", name: "ai.smithery/y" })
    expect((await lookupRegistry("ai.smithery/y", reply(500))).state).toBe("unavailable")
    const boom = (async () => {
      throw new Error("timeout")
    }) as unknown as typeof fetch
    expect((await lookupRegistry("ai.smithery/y", boom)).state).toBe("unavailable")
  })
  it("makes no request for a reference with no exact name", async () => {
    let calls = 0
    const spy = (async () => void calls++) as unknown as typeof fetch
    expect(await lookupRegistry("bitwarden", spy)).toEqual({ state: "no_candidate" })
    expect(calls).toBe(0)
  })
})
