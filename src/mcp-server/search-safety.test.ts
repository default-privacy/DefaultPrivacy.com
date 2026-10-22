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

  it.each(["airtag", "harassment", "stalkerware"])("carries it for '%s'", async (q) => {
    expect((await search(q)).safety).toContain("1-800-799-7233")
  })

  it.each(["vpn", "tracking pixel", "browser tracking"])("leaves it out for '%s'", async (q) => {
    expect((await search(q)).safety).toBeUndefined()
  })
})
