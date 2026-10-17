import { describe, expect, it } from "vitest"
import { toolCard } from "./compact"
import { findSection, guideSections, stackOutline } from "@/lib/guide-outline"
import type { PrivacyProtocolTool } from "@/lib/privacy-protocol/types"

const tool = (over: Partial<PrivacyProtocolTool> = {}): PrivacyProtocolTool => ({
  pp_version: "1.1", id: "x", name: "X", slug: "x", tagline: "A thing", description: "Longer", website_url: "https://x.example",
  favicon_url: "https://img/f.png", screenshot_url: "https://img/s.png", category: "c", categories: ["c"],
  privacy: { jurisdiction: "CH", jurisdiction_risk: "low", data_retention: { logs_ip: null, logs_metadata: false }, encryption: { e2ee: true, zero_knowledge: null }, requires_pii: { email: null, phone: null, real_name: null } },
  trust: { is_open_source: true, source_code_url: null }, payment: { has_free_tier: null }, platforms: [],
  pick: null, meta: { last_verified: null, created_at: "2026", updated_at: "2026" }, deprecated: null, dp_url: "https://dp/directory/x", citation: "c",
  ...over,
})

describe("tool card", () => {
  it("keeps checked facts, drops unchecked ones and the noise", () => {
    const c = toolCard(tool())
    expect(c.facts).toEqual({ jurisdiction: "CH", e2ee: true, logs_metadata: false, open_source: true })
    expect(JSON.stringify(c)).not.toMatch(/favicon|screenshot|created_at|pp_version/)
  })
  it("keeps false (a checked no) and never invents a value for null", () => {
    expect(toolCard(tool()).facts).toHaveProperty("logs_metadata", false)
    expect(toolCard(tool()).facts).not.toHaveProperty("logs_ip")
  })
  it("carries the pick reason and is much smaller than the record", () => {
    const t = tool({ pick: { reason: "Because", category: "c" } })
    expect(toolCard(t).pick).toBe(true)
    expect(toolCard(t).summary).toBe("Because")
    expect(toolCard(tool()).summary).toBe("A thing")
    expect(JSON.stringify(toolCard(t)).length).toBeLessThan(JSON.stringify(t).length / 2)
  })
})

describe("guide sections", () => {
  const md = "Intro\n\n## Step one\nDo A.\n\n## Questions people ask\n**Q?**\n\nA.\n"
  it("splits on ## headings", () => {
    expect(guideSections(md).map((s) => s.heading)).toEqual(["Step one", "Questions people ask"])
  })
  it("finds a section by exact or partial heading, else null", () => {
    expect(findSection(md, "step one")?.text).toBe("Do A.")
    expect(findSection(md, "questions")?.heading).toBe("Questions people ask")
    expect(findSection(md, "nope")).toBeNull()
  })
})

describe("stack outline", () => {
  it("lists each layer with the tool names under it, links stripped", () => {
    const md = "## Layer 1\n### [Signal](/directory/signal)\nWhy.\n### Briar\n## Tradeoffs\nText."
    expect(stackOutline(md)).toEqual([{ heading: "Layer 1", tools: ["Signal", "Briar"] }, { heading: "Tradeoffs" }])
  })
})
