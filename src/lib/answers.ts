/**
 * The answer map, v0: every FAQ answer in the guides, served short with its sources.
 * A question that matches one gets a few hundred characters and the vendor's own page
 * instead of a whole guide. No fetch happens at question time; an answer is as current
 * as its guide's last check (`checked`). New answers are added as guide FAQs.
 */

import { getAllGuides } from "./guides"
import { parseGuideFaqsFromContent } from "./guide-faq"
import { rankContent, stemmedKeywords } from "./site-search"

export type Answer = {
  question: string
  answer: string
  sources: { label: string; url: string }[]
  guide: { slug: string; title: string }
  checked: string | null
}

let cache: Answer[] | null = null

export async function getAllAnswers(): Promise<Answer[]> {
  if (cache) return cache
  const guides = await getAllGuides()
  cache = guides.flatMap((g) =>
    parseGuideFaqsFromContent(g.content).map((f) => ({
      question: f.question,
      answer: f.answer,
      sources: f.sources,
      guide: { slug: g.slug, title: g.title },
      checked: (g.updatedAt ?? g.publishedAt ?? null) as string | null,
    })),
  )
  return cache
}

/**
 * Answers whose own question contains every keyword. The answer text is not searched: a keyword
 * in a body is how off-topic answers came back (10-16 test). A whole sentence rarely matches
 * every word, so when nothing does, an answer still counts if at least 3 of its question's
 * keywords, and 75% of them, appear in the query.
 */
export async function searchAnswers(query: string, limit: number): Promise<Answer[]> {
  const all = await getAllAnswers()
  const ranked = rankContent(
    all.map((a) => ({ a, title: a.question, description: "" })),
    query,
  )
  if (ranked.length > 0) return ranked.slice(0, limit).map((r) => r.a)
  const asked = stemmedKeywords(query)
  if (asked.size < 4) return []
  return all
    .map((a) => {
      const own = [...stemmedKeywords(a.question)]
      const hit = own.filter((w) => asked.has(w)).length
      return { a, hit, share: own.length ? hit / own.length : 0 }
    })
    .filter((x) => x.hit >= 3 && x.share >= 0.75)
    .sort((x, y) => y.share - x.share || y.hit - x.hit)
    .slice(0, limit)
    .map((x) => x.a)
}
