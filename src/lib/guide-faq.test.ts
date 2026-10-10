import { describe, expect, it } from "vitest"
import { faqAnswerToPlainText, parseGuideFaqsFromContent } from "./guide-faq"

describe("parseGuideFaqsFromContent", () => {
  it("parses ## FAQ blocks with bold questions", () => {
    const content = `## Intro

Some text.

## FAQ

**Will this work?**

Yes, with limits.

**Is it permanent?**

No — interim rule only.

---

*Disclaimer*
`
    const faqs = parseGuideFaqsFromContent(content)
    expect(faqs).toHaveLength(2)
    expect(faqs[0].question).toBe("Will this work?")
    expect(faqs[0].answer).toContain("Yes, with limits")
    expect(faqs[1].question).toBe("Is it permanent?")
  })

  it("parses ## Questions people ask heading", () => {
    const content = `## Questions people ask

**Will BOI return?**

It could, but it has not.

## Keep reading
`
    const faqs = parseGuideFaqsFromContent(content)
    expect(faqs).toHaveLength(1)
    expect(faqs[0].question).toBe("Will BOI return?")
  })

  it("returns empty when no FAQ section", () => {
    expect(parseGuideFaqsFromContent("## Only content\n\nNo faq here.")).toEqual([])
  })
})

describe("faqAnswerToPlainText", () => {
  it("strips markdown links and bold", () => {
    expect(faqAnswerToPlainText("See [pricing](/pricing) for **details**.")).toBe(
      "See pricing for details.",
    )
  })
})
