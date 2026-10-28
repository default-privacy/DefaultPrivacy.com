import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { describe, expect, it, vi } from "vitest"

const counted: [string, string][] = []
vi.mock("@/lib/analytics/usage", () => ({ countUsage: (k: string, v: string) => void counted.push([k, v]) }))

const { registerTools } = await import("./tools")
type Handler = (args: Record<string, unknown>) => Promise<unknown>
const handlers = new Map<string, Handler>()
registerTools({ registerTool: (name: string, _c: unknown, h: Handler) => void handlers.set(name, h) } as unknown as McpServer)

// stack_read keys must stay a bounded set of real slugs (usage.ts privacy contract).
describe("dp_get_stack per-slug demand", () => {
  it("counts the resolved slug, and nothing for an unknown one", async () => {
    counted.length = 0
    await handlers.get("dp_get_stack")!({ slug: "privacy-starter-kit" })
    await handlers.get("dp_get_stack")!({ slug: "no-such-stack" })
    expect(counted.filter(([k]) => k === "stack_read")).toEqual([["stack_read", "privacy-starter-kit"]])
  })
})

// A plain page read should cost one call for most pages (2026-10-28: section-by-section reads crowded out web search).
describe("one-call page reads", () => {
  const read = async (tool: string, args: Record<string, unknown>) =>
    JSON.parse(((await handlers.get(tool)!(args)) as { content: { text: string }[] }).content[0].text).data
  it("returns a short guide whole", async () => {
    const d = await read("dp_get_guide", { slug: "keep-home-address-off-public-records" })
    expect(d.content).toContain("## ")
    expect(d.sections).toBeUndefined()
  })
  it("returns a short stack whole", async () => {
    const d = await read("dp_get_stack", { slug: "stalking-abuse-survivor-safety-kit" })
    expect(d.content).toContain("800-799-7233")
  })
  it("still outlines a long page, and section still returns one part", async () => {
    const d = await read("dp_get_stack", { slug: "start-over-privately" })
    expect(d.content).toBeUndefined()
    expect(d.sections.length).toBeGreaterThan(3)
    const s = await read("dp_get_guide", { slug: "keep-home-address-off-public-records", section: "FAQ" })
    expect(s.content).toBeUndefined()
  })
})
