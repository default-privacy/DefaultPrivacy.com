/**
 * Markdown → HTML for the reading pages (guides, stacks, glossary, playbook).
 *
 * Presentation only. The markdown in src/content, shortAnswer() in site-search.ts
 * and the MCP tools never see this output; they read the markdown directly.
 *
 * - Headings get GitHub-style ids (marked-gfm-heading-id), so the contents list
 *   and in-page anchors work.
 * - The "## The Short Answer" block is wrapped in <section class="short-answer">
 *   so CSS can frame it with the READ FIRST tag. The wrap runs to the next h2.
 */
import { Marked } from "marked"
import { getHeadingList, gfmHeadingId } from "marked-gfm-heading-id"

export type ReadingHeading = { id: string; text: string; level: number }

export const SHORT_ANSWER_ID = "the-short-answer"

const reader = new Marked(gfmHeadingId())

export function renderReadingHtml(markdown: string): { html: string; headings: ReadingHeading[] } {
  // Sync parse: the heading list is module-level in the extension, so read it right after.
  const html = reader.parse(markdown, { async: false })
  const headings = getHeadingList()
    .filter((h) => h.level === 2)
    .map((h) => ({ id: h.id, text: h.raw, level: h.level }))
  return { html: wrapShortAnswer(html), headings }
}

export function wrapShortAnswer(html: string): string {
  const open = `<h2 id="${SHORT_ANSWER_ID}">`
  const start = html.indexOf(open)
  if (start === -1) return html
  const next = html.indexOf("<h2 ", start + open.length)
  const end = next === -1 ? html.length : next
  return (
    html.slice(0, start) +
    `<section class="short-answer" aria-labelledby="${SHORT_ANSWER_ID}">` +
    html.slice(start, end) +
    "</section>" +
    html.slice(end)
  )
}
