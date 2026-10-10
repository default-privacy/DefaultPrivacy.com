/**
 * Parse visible FAQ blocks from guide markdown for FAQPage JSON-LD.
 * Headings: ## FAQ, ## Questions people ask, ## Questions people actually ask
 */

export type GuideFaqItem = {
  question: string
  answer: string
}

const FAQ_HEADING = /^## (?:FAQ|Questions people (?:actually )?ask)\s*$/im

/** Strip markdown for schema `text` — keep readable plain language. */
export function faqAnswerToPlainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\n+/g, " ")
    .trim()
}

export function parseGuideFaqsFromContent(content: string): GuideFaqItem[] {
  const headingMatch = content.match(FAQ_HEADING)
  if (!headingMatch || headingMatch.index === undefined) return []

  const afterHeading = content.slice(headingMatch.index + headingMatch[0].length)
  const endIdx = afterHeading.search(/\n## |\n---\s*\n/)
  const block = (endIdx === -1 ? afterHeading : afterHeading.slice(0, endIdx)).trim()
  if (!block) return []

  const items: GuideFaqItem[] = []
  const chunks = block.split(/\n+(?=\*\*[^*]+\?\*\*)/)

  for (const chunk of chunks) {
    const m = chunk.match(/^\*\*([^*]+\?)\*\*\s*\n+([\s\S]*)$/s)
    if (!m) continue
    const question = m[1].trim()
    const answer = faqAnswerToPlainText(m[2])
    if (question && answer) {
      items.push({ question, answer })
    }
  }

  return items
}
