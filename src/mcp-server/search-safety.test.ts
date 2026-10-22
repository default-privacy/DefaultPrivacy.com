import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { describe, expect, it, vi } from "vitest"

vi.mock("@/lib/analytics/usage", () => ({ countUsage: () => {} }))
vi.mock("@/lib/privacy-protocol/query", async (orig) => ({
  ...(await orig<object>()),
  searchPublicToolsPp: async () => ({ tools: [] }),
}))

const { registerTools, SURVIVOR_KIT } = await import("./tools")
type Handler = (args: Record<string, unknown>) => Promise<{ content: { text: string }[] }>
const handlers = new Map<string, Handler>()
registerTools({ registerTool: (name: string, _c: unknown, h: Handler) => void handlers.set(name, h) } as unknown as McpServer)

const search = async (query: string) => JSON.parse((await handlers.get("dp_search")!({ query })).content[0].text)

// Hosts can hold old server instructions for weeks, so the safety pointer rides in the result too.
describe("dp_search safety pointer", () => {
  it("leads with the survivor kit and carries the safety note for 'stalking'", async () => {
    const r = await search("stalking")
    expect(r.data.find((d: { type: string }) => d.type === "guide" || d.type === "stack").slug).toBe(SURVIVOR_KIT)
    expect(r.safety).toContain("1-800-799-7233")
    expect(r.safety).toContain("trained advocate")
  })

  it.each(["airtag", "harassment", "stalkerware", "doxxed", "doxing"])("carries it for '%s'", async (q) => {
    expect((await search(q)).safety).toContain("1-800-799-7233")
  })

  it.each(["vpn", "tracking pixel", "browser tracking"])("leaves it out for '%s'", async (q) => {
    expect((await search(q)).safety).toBeUndefined()
  })
})

describe("dp_search next step", () => {
  it("names the exact call for the top page", async () => {
    expect((await search("doxxed")).next).toContain("dp_get_stack with slug osint-yourself-exposure-check")
  })
})

describe("dp_search short answers", () => {
  it("carries the top page's short answer, so an answer from search still has the steps", async () => {
    const top = (await search("doxxed")).data[0]
    expect(top.slug).toBe("osint-yourself-exposure-check")
    expect(top.short_answer).toMatch(/^Search for yourself/)
  })
})
