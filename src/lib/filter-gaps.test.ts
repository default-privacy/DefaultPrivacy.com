import { describe, expect, it } from "vitest"
import type { PrivacyProtocolTool } from "./privacy-protocol"
import { picksLeftOutUnchecked } from "./filter-gaps"

function tool(slug: string, e2ee: boolean | null, open: boolean | null = true): PrivacyProtocolTool {
  return {
    slug, name: slug.toUpperCase(), dp_url: `https://dp.test/directory/${slug}`, deprecated: null,
    privacy: { encryption: { e2ee, zero_knowledge: null } },
    trust: { is_open_source: open, source_code_url: null },
    payment: { has_free_tier: null },
  } as unknown as PrivacyProtocolTool
}
const dir = (tools: PrivacyProtocolTool[]) => async (slug: string) => tools.find((t) => t.slug === slug) ?? null

describe("picksLeftOutUnchecked", () => {
  // encrypted-messaging picks are signal, then simplex-chat (src/lib/picks.ts).
  it("names picks an e2ee filter dropped only because the field is unchecked", async () => {
    const out = await picksLeftOutUnchecked("encrypted-messaging", { e2ee: true }, ["molly"], dir([tool("signal", null), tool("simplex-chat", null)]))
    expect(out.map((p) => p.slug)).toEqual(["signal", "simplex-chat"])
    expect(out[0].unchecked).toEqual(["e2ee"])
  })

  it("does not name a pick that was returned, or one checked as a no", async () => {
    const out = await picksLeftOutUnchecked("encrypted-messaging", { e2ee: true }, ["signal"], dir([tool("signal", true), tool("simplex-chat", false)]))
    expect(out).toEqual([])
  })

  it("does nothing without an active filter or a category with picks", async () => {
    const d = dir([tool("signal", null)])
    expect(await picksLeftOutUnchecked("encrypted-messaging", {}, [], d)).toEqual([])
    expect(await picksLeftOutUnchecked("encrypted-messaging", { e2ee: false }, [], d)).toEqual([])
    expect(await picksLeftOutUnchecked(undefined, { e2ee: true }, [], d)).toEqual([])
  })

  it("lists only the unchecked fields when several filters are on", async () => {
    const out = await picksLeftOutUnchecked("encrypted-messaging", { e2ee: true, open_source: true }, [], dir([tool("signal", null, true)]))
    expect(out[0].unchecked).toEqual(["e2ee"])
  })
})
