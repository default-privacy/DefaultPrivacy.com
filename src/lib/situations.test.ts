import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { BASELINE, matchSituations, SITUATIONS } from "./situations"

const file = (kind: "guide" | "stack", slug: string) =>
  join(process.cwd(), "src/content", kind === "guide" ? "guides" : "stacks", `${slug}.md`)

describe("situations", () => {
  it("every item points at an existing guide or stack", () => {
    const missing = [...BASELINE, ...SITUATIONS.flatMap((s) => s.items)].filter((i) => !existsSync(file(i.kind, i.slug)))
    expect(missing).toEqual([])
  })

  it("has unique ids and at least one item and term per situation", () => {
    expect(new Set(SITUATIONS.map((s) => s.id)).size).toBe(SITUATIONS.length)
    for (const s of SITUATIONS) {
      expect(s.items.length, s.id).toBeGreaterThan(0)
      expect(s.terms.length, s.id).toBeGreaterThan(0)
    }
  })

  const cases: Array<[string, string]> = [
    ["I am a journalist and I need to protect my sources", "journalist-or-activist"],
    ["I just bought a Pixel and want GrapheneOS", "phone"],
    ["which password manager should I use", "accounts"],
    ["I want to stop using Google", "leave-google"],
    ["my ex is tracking my phone", "harassment"],
    ["how do I run an AI model on my laptop", "ai"],
    ["is it safe to connect Claude to my email", "ai"],
    ["my VPN keeps showing captchas", "network"],
    ["remove my address from people search sites", "clear-online"],
    ["what browser should I use", "browser"],
    ["someone is recording our zoom call with an ai notetaker", "being-recorded"],
    ["my doctor wants to use an AI scribe", "being-recorded"],
    ["can someone record me with smart glasses", "being-recorded"],
    ["are flock cameras tracking my car", "street-cameras"],
    ["how do I make my ring doorbell more private", "street-cameras"],
    ["my neighbor's camera points into my yard", "street-cameras"],
    ["is life360 safe for my kids", "family-location"],
    ["I want to share my location with my family", "family-location"],
    ["I think someone put an airtag on my car", "harassment"],
    ["how do I stop my smart TV tracking what I watch", "smart-tv"],
    ["is my car sharing my driving data with my insurance", "car-data"],
    ["how do I get my LexisNexis driving report", "car-data"],
    ["turn off apple intelligence and siri", "ai"],
    ["how do I turn off copilot and recall in windows", "ai"],
    ["is it safe to open a cloned repo in cursor", "ai"],
  ]
  it.each(cases)("%s -> %s first", (text, id) => {
    expect(matchSituations(text)[0]?.id).toBe(id)
  })

  it("returns nothing for text with no recognised words", () => {
    expect(matchSituations("zzzz qqqq")).toEqual([])
    expect(matchSituations("help")).toEqual([])
    expect(matchSituations("")).toEqual([])
  })

  it("returns at most three matches", () => {
    expect(matchSituations("phone vpn password ai browser google address work").length).toBeLessThanOrEqual(3)
  })
})
