import { describe, expect, it } from "vitest"
import { parseGuideFaqsFromContent } from "./guide-faq"
import { getAllAnswers, searchAnswers } from "./answers"

describe("guide FAQ sources", () => {
  it("keeps each answer's links as sources, once each, and strips them from the text", () => {
    const md = "## FAQ\n\n**Is X safe?**\n\nIt says \"no logs\" ([X](https://x.example/privacy)), and [X](https://x.example/privacy) again, per ([audit](https://a.example/r.pdf)).\n"
    const [f] = parseGuideFaqsFromContent(md)
    expect(f.sources).toEqual([{ label: "X", url: "https://x.example/privacy" }, { label: "audit", url: "https://a.example/r.pdf" }])
    expect(f.answer).not.toMatch(/https?:/)
  })
})

describe("answer map v0", () => {
  it("serves every guide FAQ, most with a source", async () => {
    const all = await getAllAnswers()
    expect(all.length).toBeGreaterThan(200)
    expect(all.filter((a) => a.sources.length > 0).length / all.length).toBeGreaterThan(0.8)
  })
  it("finds the checked answer for a plain question", async () => {
    const [a] = await searchAnswers("turn off apple intelligence", 2)
    expect(a.question).toMatch(/Apple Intelligence/)
    expect(a.sources.length).toBeGreaterThan(0)
    expect(a.guide.slug).toBe("turn-off-ai-on-your-phone")
  })
  it("returns nothing rather than a loose match", async () => {
    expect(await searchAnswers("zzzz unrelated", 2)).toEqual([])
  })
  it("does not match on words that only appear in an answer body", async () => {
    for (const q of ["veracrypt", "sms", "iran"]) {
      for (const a of await searchAnswers(q, 5)) expect(a.question.toLowerCase(), q).toContain(q)
    }
    const all = await getAllAnswers()
    const body = all.find((a) => /Tor/.test(a.answer) && !/tor/i.test(a.question))
    expect(body).toBeTruthy()
  })
  it("parses every bold question under a guide's FAQ heading (a `---` divider ends the block and hides later ones)", async () => {
    const { getAllGuides } = await import("./guides")
    for (const g of await getAllGuides()) {
      const h = g.content.match(/^## (?:FAQ|Questions people (?:actually )?ask)\s*$/im)
      if (!h || h.index === undefined) continue
      const after = g.content.slice(h.index + h[0].length)
      const end = after.search(/\n## /)
      const section = end === -1 ? after : after.slice(0, end)
      const asked = (section.match(/^\*\*[^*]+\?\*\*\s*$/gm) ?? []).length
      expect(parseGuideFaqsFromContent(g.content).length, g.slug).toBe(asked)
    }
  })
  it("matches a whole question by its FAQ's own words, and never loosely", async () => {
    const [hit] = await searchAnswers("How can I make a Discord account without providing my real phone number?", 2)
    expect(hit?.question).toMatch(/Discord account/)
    expect(await searchAnswers("How i can have more privacy in iran?", 2)).toEqual([])
    expect(await searchAnswers("How do I stop my smart TV from tracking what I watch?", 2)).toEqual([])
  })
})
