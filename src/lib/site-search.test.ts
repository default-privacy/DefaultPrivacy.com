import { readdirSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { getAllGuides } from "./guides"
import { getAllStacks, getStackBySlug } from "./stacks"
import { keywords, mergePages, oneLine, rankContent, searchContent, searchGlossary, shortAnswer } from "./site-search"

const mdFiles = (dir: string) =>
  readdirSync(join(process.cwd(), "src/content", dir)).filter((f) => f.endsWith(".md"))

describe("content loads", () => {
  // getAllGuides / getAllStacks return [] when any one file fails to parse, which
  // would empty every guide or stack answer the MCP gives.
  it("every stack file loads, its slug matching the file name", async () => {
    const files = mdFiles("stacks")
    const stacks = await getAllStacks()
    expect(files.length).toBeGreaterThanOrEqual(18)
    expect(stacks.length).toBe(files.length)
    for (const s of stacks) {
      expect(files).toContain(`${s.slug}.md`)
      expect(s.title, s.slug).toBeTruthy()
      expect(s.description, s.slug).toBeTruthy()
      expect(s.content.length, s.slug).toBeGreaterThan(200)
    }
  })

  it("loads one stack by slug, and null for an unknown one", async () => {
    expect((await getStackBySlug("privacy-starter-kit"))?.title).toMatch(/Starter Kit/)
    expect(await getStackBySlug("no-such-stack")).toBeNull()
  })

  it("every guide file loads, its slug matching the file name", async () => {
    const files = mdFiles("guides")
    const guides = await getAllGuides()
    expect(guides.length).toBe(files.length)
    for (const g of guides) {
      expect(files).toContain(`${g.slug}.md`)
      expect(g.title, g.slug).toBeTruthy()
      expect(g.description, g.slug).toBeTruthy()
      expect(Array.isArray(g.tags), g.slug).toBe(true)
    }
  })
})

describe("rankContent", () => {
  it("finds a name that appears only in a guide's text, ranked below title and tag hits", async () => {
    const guides = await getAllGuides()
    expect(rankContent(guides, "spokeo").map((g) => g.slug)).toContain("remove-name-from-data-brokers")
    expect(rankContent(guides, "whitepages").map((g) => g.slug)).toContain("remove-name-from-data-brokers")
    const item = (title: string, content = "") => ({ title, description: "", tags: [], content })
    expect(rankContent([item("A", "a guide about vpn setup"), item("B vpn")], "vpn").map((i) => i.title)).toEqual(["B vpn", "A"])
  })

  const item = (title: string, description = "", tags: string[] = []) => ({ title, description, tags })

  it("matches whole words, so 'tor' doesn't hit 'history'", () => {
    expect(rankContent([item("Browser history"), item("Tor basics")], "tor").map((i) => i.title)).toEqual([
      "Tor basics",
    ])
  })

  it("ignores a trailing s and requires every keyword", () => {
    const items = [item("Data broker removal"), item("Data breach check")]
    expect(rankContent(items, "data brokers").map((i) => i.title)).toEqual(["Data broker removal"])
  })

  it("matches -ed and -ing forms, so 'doxxed' finds the Dox Yourself First stack", async () => {
    const stacks = await getAllStacks()
    for (const q of ["doxxed", "doxing", "doxxing", "dox"]) {
      expect(rankContent(stacks, q).map((s) => s.slug), q).toContain("osint-yourself-exposure-check")
    }
    const items = [item("Is my phone being tracked?"), item("Tracker blockers")]
    expect(rankContent(items, "tracking").map((i) => i.title)).toEqual(["Is my phone being tracked?"])
  })

  it("ranks a title hit over a tag hit over a description hit", () => {
    const items = [item("A", "about vpn"), item("B", "", ["vpn"]), item("C vpn")]
    expect(rankContent(items, "vpn").map((i) => i.title)).toEqual(["C vpn", "B", "A"])
  })

  it("drops filler words, and returns everything when nothing is left", () => {
    expect(keywords("How do I pick the best private email provider?")).toEqual(["email", "provider"])
    const items = [item("One"), item("Two")]
    expect(rankContent(items, "privacy")).toEqual(items)
  })
})

describe("oneLine", () => {
  it("keeps short text and cuts long text at a word", () => {
    expect(oneLine("Short  summary.\nTwo lines.")).toBe("Short summary. Two lines.")
    const cut = oneLine("word ".repeat(100))
    expect(cut.length).toBeLessThanOrEqual(201)
    expect(cut.endsWith("word…")).toBe(true)
  })
})

describe("searchGlossary", () => {
  it("puts the exact term first", async () => {
    expect((await searchGlossary("tor"))[0]?.slug).toBe("tor")
    expect((await searchGlossary("vpn"))[0]?.slug).toBe("vpn")
  })

  it("answers a two-concept question with both definitions", async () => {
    expect((await searchGlossary("tor vpn")).map((t) => t.slug)).toEqual(["tor", "vpn"])
    expect((await searchGlossary("what is tor")).map((t) => t.slug)).toEqual(["tor"])
  })

  it("returns nothing rather than near misses", async () => {
    expect(await searchGlossary("virtual card")).toEqual([])
  })
})

// Golden answers for the Techlore test questions that a guide, stack or glossary term
// answers (our research notes on former Techlore forum topics, by
// number), as the keyword search a model would send to dp_search.
describe("dp_search content for Techlore questions", () => {
  type Expect = { guide?: string; stack?: string; glossary?: string }
  const cases: [question: string, query: string, first: Expect][] = [
    ["1 new to privacy: where do I start", "where to start", { guide: "privacy-where-to-start" }],
    ["1 a starter kit", "starter kit", { stack: "privacy-starter-kit" }],
    ["2 was my phone number in a breach", "phone number breach", { guide: "was-my-phone-number-in-a-data-breach" }],
    ["2 data breach, defined", "data breach", { glossary: "data-breach" }],
    ["3 my digital footprint", "digital footprint", { stack: "metadata-digital-footprint-cleanup", glossary: "digital-footprint" }],
    ["4 data-broker removal", "data broker", { guide: "remove-name-from-data-brokers", stack: "delete-yourself-from-the-internet", glossary: "data-broker" }],
    ["5 email from Gmail", "gmail", { stack: "escape-gmail-encrypted-email-aliases" }],
    ["6 Proton Mail or Tuta", "proton mail tuta", { guide: "proton-mail-vs-tuta" }],
    ["7 email aliases", "email alias", { stack: "escape-gmail-encrypted-email-aliases", glossary: "email-alias" }],
    ["9 VPNs", "vpn", { glossary: "vpn" }],
    ["11 Mullvad or Proton VPN", "mullvad proton vpn", { guide: "mullvad-vs-proton-vpn" }],
    ["12 most private browser", "best privacy browser", { glossary: "best-privacy-browser" }],
    ["15 private search engine", "private search engine", { glossary: "private-search-engine" }],
    ["16 Signal or SimpleX", "signal simplex", { guide: "signal-vs-simplex" }],
    ["19 password managers", "password manager", { stack: "privacy-starter-kit", glossary: "password-manager" }],
    ["20 Bitwarden or Proton Pass", "bitwarden proton pass", { guide: "bitwarden-vs-proton-pass" }],
    ["21 2FA", "2fa", { glossary: "two-factor-authentication" }],
    // Two guides have GrapheneOS in the title and tie; the more recently updated one comes first
    // (since 2026-10-17, "what still works"). The comparison keeps its own case (GrapheneOS vs CalyxOS).
    ["25 GrapheneOS", "grapheneos", { guide: "what-still-works-after-switching-to-grapheneos", stack: "degoogle-android-phone", glossary: "grapheneos" }],
    ["25b GrapheneOS vs CalyxOS", "calyxos", { guide: "grapheneos-vs-calyxos" }],
    ["26 banking apps on a de-Googled phone", "banking apps", { guide: "what-still-works-after-switching-to-grapheneos" }],
    ["27 which phone for privacy", "privacy friendly phone", { glossary: "privacy-friendly-phone" }],
    ["29 Windows 11 telemetry", "windows", { stack: "windows-privacy-hardening" }],
    ["30 DNS", "dns", { glossary: "dns" }],
    ["31 smart TV tracking", "smart tv", { glossary: "smart-tv-surveillance" }],
    ["34 paying online privately", "payments", { stack: "anonymous-payments-financial-privacy" }],
    ["35 Monero", "monero", { glossary: "monero" }],
    ["36 a second phone number", "second phone number", { guide: "get-a-second-phone-number" }],
    ["37 AI chatbots privately", "ai chatbots", { guide: "how-to-use-ai-chatbots-privately" }],
    ["38 opsec", "opsec", { glossary: "operational-security" }],
    ["39 my threat model", "threat model", { guide: "how-to-build-your-threat-model", glossary: "threat-model" }],
    ["40 Tor", "tor", { glossary: "tor" }],
    ["credit freeze", "freeze credit", { guide: "how-to-freeze-your-credit" }],
    ["series: Jack Reacher", "jack reacher", { guide: "how-to-live-privately-jack-reacher" }],
    ["series: Elliot Alderson", "elliot alderson", { guide: "how-to-live-privately-elliot-alderson" }],
  ]

  it.each(cases)("%s", async (_q, query, first) => {
    const r = await searchContent(query, 3)
    if (first.guide) expect(r.guides[0]?.slug).toBe(first.guide)
    if (first.stack) expect(r.stacks[0]?.slug).toBe(first.stack)
    if (first.glossary) expect(r.glossary[0]?.slug).toBe(first.glossary)
  })

  it("40: Tor vs a VPN gets both definitions", async () => {
    expect((await searchContent("tor vs vpn", 3)).glossary.map((t) => t.slug)).toEqual(["tor", "vpn"])
  })

  it("a query of filler words searches nothing", async () => {
    expect(await searchContent("what is the best privacy", 3)).toEqual({ guides: [], stacks: [], glossary: [] })
  })
})

describe("mergePages", () => {
  it("puts the survivor kit first for 'stalking', above guides that only mention it", async () => {
    const pages = mergePages(await searchContent("stalking", 3), "stalking")
    expect(pages[0]?.slug).toBe("stalking-abuse-survivor-safety-kit")
    expect(pages[0]?.kind).toBe("stack")
  })
})

describe("shortAnswer", () => {
  it("takes the section up to the next heading or rule", () => {
    expect(shortAnswer("Intro\n\n## The Short Answer\n\nDo this.\n\n1. One\n\n## Next\nmore")).toBe("Do this.\n\n1. One")
    expect(shortAnswer("## The Short Answer\nShort.\n\n---\n\nrest")).toBe("Short.")
    expect(shortAnswer("## The Short Answer\nLast section.")).toBe("Last section.")
    expect(shortAnswer("## Something else\ntext")).toBeUndefined()
  })

  it("stays short on every page that has one", async () => {
    for (const page of [...(await getAllGuides()), ...(await getAllStacks())]) {
      const text = shortAnswer(page.content)
      if (text) expect(text.split(/\s+/).length, page.slug).toBeLessThanOrEqual(130)
    }
  })
})
