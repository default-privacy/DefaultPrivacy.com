import { beforeEach, describe, expect, it, vi } from "vitest"

const stats: [string, number][] = []
vi.mock("next/headers", () => ({ headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }) }))
vi.mock("@/lib/api-analytics", () => ({
  updateDailyStats: (endpoint: string, status: number) => stats.push([endpoint, status]),
}))

const { withRateLimit } = await import("./api-rate-limit")

const get = (userAgent: string) => new Request("https://example.test/api/mcp", { headers: { "user-agent": userAgent } })
const wrapped = withRateLimit(async () => new Response("ok"), { resource: "/api/mcp", tier: "developer" })
// The stats write is a fire-and-forget dynamic import; let it settle.
const settle = () => new Promise((resolve) => setTimeout(resolve, 20))

beforeEach(() => {
  stats.length = 0
})

describe("withRateLimit daily stats", () => {
  it("counts an app's request", async () => {
    await wrapped(get("claude-code/2.1"))
    await settle()
    expect(stats).toEqual([["/api/mcp", 200]])
  })

  it("leaves out a self-declared bot, which still gets its answer", async () => {
    const res = await wrapped(get("SentinelOracle/0.1 (+https://glimind.com/opt-out; liveness-only, never invokes tools)"))
    await settle()
    expect(await res.text()).toBe("ok")
    expect(stats).toEqual([])
  })
})
