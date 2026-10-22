import { describe, expect, it } from "vitest"
import { renderReadingHtml, wrapShortAnswer } from "./reading-html"

const md = `# Title

Intro paragraph.

## The Short Answer

Yes. Turn it off.

## Steps

1. Open settings.
2. Turn it off.

## FAQ

> **Watch out.** A callout opens with bold text.

> "A real quote opens with a quote mark."
`

describe("renderReadingHtml", () => {
  const { html, headings } = renderReadingHtml(md)

  it("gives headings GitHub-style ids and lists the h2s", () => {
    expect(html).toContain('<h2 id="the-short-answer">')
    expect(html).toContain('<h2 id="steps">')
    expect(headings).toEqual([
      { id: "the-short-answer", text: "The Short Answer", level: 2 },
      { id: "steps", text: "Steps", level: 2 },
      { id: "faq", text: "FAQ", level: 2 },
    ])
  })

  it("wraps the Short Answer up to the next h2", () => {
    const start = html.indexOf('<section class="short-answer" aria-labelledby="the-short-answer"><h2 id="the-short-answer">')
    const end = html.indexOf("</section>")
    const next = html.indexOf('<h2 id="steps">')
    expect(start).toBeGreaterThan(-1)
    expect(end).toBeGreaterThan(start)
    expect(next).toBe(end + "</section>".length)
    expect(html.slice(start, end)).toContain("Turn it off.")
  })

  it("keeps the callout shape CSS relies on: blockquote > p:first-child > strong:first-child", () => {
    expect(html).toMatch(/<blockquote>\s*<p><strong>Watch out\.<\/strong>/)
    expect(html).toMatch(/<blockquote>\s*<p>(&quot;|")A real quote/)
  })

  it("renders numbered steps as a plain ordered list", () => {
    expect(html).toMatch(/<ol>\s*<li>Open settings\.<\/li>\s*<li>Turn it off\.<\/li>\s*<\/ol>/)
  })

  it("leaves pages without a Short Answer alone", () => {
    const plain = "<h2 id=\"intro\">Intro</h2><p>x</p>"
    expect(wrapShortAnswer(plain)).toBe(plain)
  })

  it("is stable across calls (the heading list resets per parse)", () => {
    const again = renderReadingHtml("## Only one\n\ntext")
    expect(again.headings).toEqual([{ id: "only-one", text: "Only one", level: 2 }])
  })
})
