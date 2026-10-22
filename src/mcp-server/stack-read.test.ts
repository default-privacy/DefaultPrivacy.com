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
