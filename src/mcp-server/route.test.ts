import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { describe, expect, it, vi } from "vitest"
import { z } from "zod"

vi.mock("@/lib/analytics/usage", () => ({ countUsage: () => {} }))

const { registerTools } = await import("./tools")
type Handler = (args: Record<string, unknown>) => Promise<{ content: { text: string }[] }>
type Config = { inputSchema: z.ZodRawShape }
const tools = new Map<string, { config: Config; handler: Handler }>()
registerTools({
  registerTool: (name: string, config: Config, handler: Handler) => void tools.set(name, { config, handler }),
} as unknown as McpServer)

const route = tools.get("dp_route")!
const input = z.object(route.config.inputSchema)

// DP promises the user's words never reach its server, so dp_route takes only ids from a fixed list.
describe("dp_route takes situation ids, never free text", () => {
  it("refuses the user's own words", () => {
    expect(input.safeParse({ situations: ["my ex keeps finding my new address"] }).success).toBe(false)
    expect(input.safeParse({ situation: "I'm a journalist protecting sources" }).success).toBe(false)
  })

  it("takes 1 to 3 ids", () => {
    expect(input.safeParse({ situations: [] }).success).toBe(false)
    expect(input.safeParse({ situations: ["harassment"] }).success).toBe(true)
    expect(input.safeParse({ situations: ["phone", "browser", "accounts", "network"] }).success).toBe(false)
  })

  it("answers the picked situations in the order given, plus the starting set", async () => {
    const res = await route.handler({ situations: ["browser", "harassment", "browser"] })
    const { data } = JSON.parse(res.content[0].text)
    expect(data.matches.map((m: { situation: string }) => m.situation)).toHaveLength(2)
    expect(data.matches[0].items.length).toBeGreaterThan(0)
    expect(data.start_here.length).toBe(3)
  })

  it("names the first match's top page to open", async () => {
    const res = JSON.parse((await route.handler({ situations: ["clear-online"] })).content[0].text)
    const top = res.data.matches[0].items[0]
    expect(res.next).toContain(`slug ${top.slug}`)
  })
})

// Hosts can hold old server instructions, so the kit's warning rides in the route reply too.
describe("dp_route safety note", () => {
  const safety = async (situations: string[]) => JSON.parse((await route.handler({ situations })).content[0].text).safety
  it("carries the hotline when a match lists the survivor kit", async () => {
    expect(await safety(["harassment"])).toContain("1-800-799-7233")
  })
  it("stays out of unrelated routes", async () => {
    expect(await safety(["browser"])).toBeUndefined()
  })
})
