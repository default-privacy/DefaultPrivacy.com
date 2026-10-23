import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { describe, expect, it, vi } from "vitest"

vi.mock("@/lib/analytics/usage", () => ({ countUsage: () => {} }))
vi.mock("@/lib/api-rate-limit", () => ({ checkToolActionRateLimit: async () => ({ allowed: true }) }))
vi.mock("@/lib/breaches/hibp", () => ({
  checkBreaches: async (domain: string) => ({ success: true, domain, breaches: [], totalExposed: 0 }),
}))

const { registerTools, HIBP_SOURCE, PERSONAL_BREACH_CHECK } = await import("./tools")

type Handler = (args: Record<string, unknown>) => Promise<{ content: { text: string }[] }>
const handlers = new Map<string, Handler>()
registerTools({ registerTool: (name: string, _c: unknown, h: Handler) => void handlers.set(name, h) } as unknown as McpServer)

describe("dp_check_domain_breaches", () => {
  it("names Have I Been Pwned as the source (its licence requires it) and hands off the personal check", async () => {
    const res = await handlers.get("dp_check_domain_breaches")!({ domain: "adobe.com" })
    const body = JSON.parse(res.content[0].text)
    expect(body.source).toBe(HIBP_SOURCE)
    expect(body.source).toMatch(/Have I Been Pwned/)
    expect(body.personal_check).toBe(PERSONAL_BREACH_CHECK)
    expect(body.personal_check).toMatch(/https:\/\/haveibeenpwned\.com/)
    expect(body.personal_check).not.toMatch(/connector|\/mcp/)
    expect(body.personal_check).toMatch(/never asks for or sends an email address/)
  })
})
