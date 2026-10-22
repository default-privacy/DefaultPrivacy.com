/**
 * Keyword search over the hub's file-based content: guides, stacks and the glossary.
 * Used by the MCP's dp_search (with the directory search beside it) and dp_search_guides.
 * Touches no database, so the ranking is unit-tested.
 *
 * Guides and stacks match whole words (a trailing "s" ignored), so "tor" doesn't hit
 * "history". Every keyword must match, the same rule as the directory search. Words
 * that carry no signal on a privacy site ("how", "best", "private") are dropped first.
 */

import { getAllGlossaryTerms, searchGlossaryTerms, type GlossaryTerm } from "./glossary"
import { getAllGuides, type Guide } from "./guides"
import { getAllStacks, type Stack } from "./stacks"

const STOP_WORDS = new Set(
  (
    "a an and are as at be best by can choose do does for from get good how i if in is it me my need of on or " +
    "pick recommend should so the to use using vs versus want what when where which who why with you your " +
    "privacy private privately"
  ).split(" "),
)

const words = (text: string) => text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)

// "brokers" → "broker"; short words like "ios" are left alone.
const stem = (word: string) => (word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word)

/** Meaningful words, stemmed, for loose matching of a whole sentence. */
export const stemmedKeywords = (text: string) => new Set(keywords(text).map(stem))

/** The query's meaningful words, in order, unstemmed: what the directory search gets. */
export function keywords(query: string): string[] {
  return [...new Set(words(query).filter((w) => !STOP_WORDS.has(w)))]
}

type Searchable = { title: string; description: string; tags?: string[]; content?: string }

/**
 * Items matching every keyword, best first: a keyword scores 3 in the title, 2 in a tag,
 * 1 in the description, 0.5 in the body (a guide or stack's text, so a name it covers, like
 * "spokeo" in the data-broker guide, still finds it). Ties keep the input order. No keywords →
 * items unchanged.
 */
export function rankContent<T extends Searchable>(items: T[], query: string): T[] {
  const terms = keywords(query).map(stem)
  if (terms.length === 0) return items
  const scored: { item: T; score: number; index: number }[] = []
  items.forEach((item, index) => {
    const fields = [
      { words: new Set(words(item.title).map(stem)), weight: 3 },
      { words: new Set(words((item.tags ?? []).join(" ")).map(stem)), weight: 2 },
      { words: new Set(words(item.description).map(stem)), weight: 1 },
      { words: new Set(words(item.content ?? "").map(stem)), weight: 0.5 },
    ]
    let score = 0
    for (const term of terms) {
      const best = fields.find((f) => f.words.has(term))?.weight
      if (!best) return
      score += best
    }
    scored.push({ item, score, index })
  })
  return scored.sort((a, b) => b.score - a.score || a.index - b.index).map((s) => s.item)
}

/**
 * Glossary terms for a query, ranked by searchGlossaryTerms. When the whole query
 * matches nothing ("tor vpn", "what is tor"), each keyword that is itself a term's name
 * or alias is returned instead, so a two-concept question gets both definitions.
 */
export async function searchGlossary(query: string): Promise<GlossaryTerm[]> {
  const whole = await searchGlossaryTerms(query)
  if (whole.length > 0) return whole
  const all = await getAllGlossaryTerms()
  const named = (t: GlossaryTerm, k: string) =>
    t.term.toLowerCase() === k || (t.aliases ?? []).some((a) => a.toLowerCase() === k)
  const hits = keywords(query).map((k) => all.find((t) => named(t, k)))
  return [...new Set(hits.filter((t): t is GlossaryTerm => t !== undefined))]
}

/** The top `limit` guides, stacks and glossary terms for a query. */
export async function searchContent(
  query: string,
  limit: number,
): Promise<{ guides: Guide[]; stacks: Stack[]; glossary: GlossaryTerm[] }> {
  if (keywords(query).length === 0) return { guides: [], stacks: [], glossary: [] }
  const [guides, stacks, glossary] = await Promise.all([getAllGuides(), getAllStacks(), searchGlossary(query)])
  return {
    guides: rankContent(guides, query).slice(0, limit),
    stacks: rankContent(stacks, query).slice(0, limit),
    glossary: glossary.slice(0, limit),
  }
}

/**
 * Guides and stacks as one list, best first. Ranked separately and printed guides-first, a weak
 * guide match ("stalking" in the body of the LLC guide) sat above a strong stack match (the
 * survivor kit's title).
 */
export function mergePages(found: { guides: Guide[]; stacks: Stack[] }, query: string) {
  return rankContent(
    [
      ...found.guides.map((g) => ({ ...g, kind: "guide" as const })),
      ...found.stacks.map((s) => ({ ...s, kind: "stack" as const })),
    ],
    query,
  )
}

/** A summary on one line, cut at a word boundary when longer than `max` characters. */
export function oneLine(text: string, max = 200): string {
  const flat = text.replace(/\s+/g, " ").trim()
  if (flat.length <= max) return flat
  const cut = flat.lastIndexOf(" ", max)
  return `${flat.slice(0, cut > 0 ? cut : max).replace(/[,;:.]$/, "")}…`
}
