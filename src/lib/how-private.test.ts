import { describe, expect, it } from "vitest"
import type { PrivacyProtocolTool } from "./privacy-protocol"
import { howPrivate } from "./how-private"

const url = (path: string) => `https://dp.test/${path}`

function tool(slug: string, name: string, pick: PrivacyProtocolTool["pick"] = null): PrivacyProtocolTool {
  return {
    pp_version: "1.1", id: slug, name, slug, tagline: null, description: null, website_url: `https://${slug}.test`,
    favicon_url: null, screenshot_url: null, category: "x", categories: ["x"],
    privacy: {
      jurisdiction: null, jurisdiction_risk: null,
      data_retention: { logs_ip: null, logs_metadata: null },
      encryption: { e2ee: null, zero_knowledge: null },
      requires_pii: { email: null, phone: null, real_name: null },
    },
    trust: { is_open_source: true, source_code_url: null },
    payment: { has_free_tier: null }, platforms: [], pick,
    meta: { last_verified: null, created_at: "2026-01-01", updated_at: "2026-01-01" },
    deprecated: null, dp_url: url(`directory/${slug}`), citation: "x",
  } as unknown as PrivacyProtocolTool
}

/** A fake directory: only the given slugs exist; every lookup is recorded. */
function directory(tools: PrivacyProtocolTool[]) {
  const asked: string[] = []
  const getTool = async (slug: string) => {
    asked.push(slug)
    return tools.find((t) => t.slug === slug) ?? null
  }
  return { asked, deps: { getTool, url } }
}

describe("howPrivate", () => {
  it("a mainstream product: replacements, ToS;DR's dated review and the vendor's policy, no DP record", async () => {
    const { deps } = directory([tool("joplin", "Joplin", { reason: "r", category: "digital-notes" })])
    const r = await howPrivate("Notion", deps)
    expect(r.found).toBe(true)
    if (!r.found) return
    expect(r.dp_record).toBeNull()
    expect(r.replacements?.top.map((t) => t.slug)).toContain("joplin")
    expect(r.replacements!.top.length).toBeLessThanOrEqual(3)
    expect(r.terms_review?.service).toBe("Notion")
    expect(r.terms_review?.attribution).toMatch(/ToS;DR/)
    expect(r.vendor_policy).toMatch(/^https:\/\/www\.notion\.so\//)
    expect(r.picks_note).toBeNull()
    expect(r.not_measured.join(" ")).toMatch(/not in Default Privacy's directory/)
    expect(r.not_measured.join(" ")).toMatch(/how-to-build-your-threat-model/)
  })

  it("a DP pick with a ToS;DR grade: both, with what each measures", async () => {
    const { deps, asked } = directory([tool("proton", "Proton", { reason: "Swiss, audited", category: "encrypted-email" })])
    const r = await howPrivate("Proton Mail", deps)
    expect(asked[0]).toBe("proton")
    if (!r.found) throw new Error("not found")
    expect(r.dp_record?.name).toBe("Proton")
    expect(r.terms_review?.service).toBe("Proton AG")
    expect(r.picks_note).not.toBeNull()
    expect(r.picks_note).toMatch(/Default Privacy picks Proton/)
    expect(r.picks_note).toMatch(/measure different things/)
    expect(r.not_measured.join(" ")).toMatch(/Null never means no/)
  })

  it("a listed tool with no ToS;DR row still answers from the directory", async () => {
    const { deps } = directory([tool("cryptpad", "CryptPad")])
    const r = await howPrivate("CryptPad", deps)
    if (!r.found) throw new Error("not found")
    expect(r.dp_record?.name).toBe("CryptPad")
    expect(r.terms_review).toBeNull()
    expect(r.not_measured[0]).toMatch(/No ToS;DR review/)
  })

  it("an unknown product: an honest miss, never a guess", async () => {
    const { deps } = directory([])
    const r = await howPrivate("Frobnicator 3000", deps)
    expect(r.found).toBe(false)
    if (r.found) return
    expect(r.message).toMatch(/no record, replacement list or terms review/)
    expect(r.threat_model).toBe(url("guides/how-to-build-your-threat-model"))
  })

  it("skips a deprecated directory record", async () => {
    const old = { ...tool("signal", "Signal"), deprecated: { reason: "gone", since: "2026-01-01" } } as PrivacyProtocolTool
    const { deps } = directory([old])
    const r = await howPrivate("Signal", deps)
    if (!r.found) throw new Error("not found")
    expect(r.dp_record).toBeNull()
    expect(r.terms_review?.service).toBe("Signal")
  })
})
