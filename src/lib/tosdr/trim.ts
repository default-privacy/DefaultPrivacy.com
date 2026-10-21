/**
 * Turns one raw ToS;DR service (api.tosdr.org/service/v3) into the compact record the snapshot
 * keeps. Used by scripts/sync-tosdr.ts; pure, so it is unit-tested.
 *
 * ToS;DR can file the same finding once per document (terms and privacy policy), so findings
 * are merged by title, keeping the newest. Titles are trimmed: some carry stray spaces.
 */

export const MAX_POINTS = 8

export type RawPoint = {
  id: number
  title: string
  source: string | null
  status: string
  document_id: number | null
  updated_at: string | null
  case: { classification: string; weight: number | null } | null
}
export type RawService = {
  id: number
  name: string
  rating: string | null
  is_comprehensively_reviewed: boolean
  documents: { id: number; name: string; url: string }[]
  points: RawPoint[]
}

const ORDER: Record<string, number> = { blocker: 0, bad: 1, good: 2, neutral: 3 }
const clean = (s: string) => s.replace(/\s+/g, " ").trim()

export const MAX_QUOTE = 300

const ENTITIES: Record<string, string> = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“" }

/**
 * ToS;DR's quote of the policy text a point rests on, cut at a word near MAX_QUOTE.
 * Quotes are pasted page markup, so tags, entities and table pipes go before the cut.
 */
export function clipQuote(q: string | null | undefined): string | null {
  const s = clean(
    (q ?? "")
      .replace(/<[^>]*>/g, " ")
      .replace(/^\s*[a-z0-9]*>|<\/?[a-z0-9]*\s*$/gi, "")
      .replace(/&(nbsp|amp|lt|gt|quot|#39|rsquo|lsquo|rdquo|ldquo)[;.]?/g, (_, e: string) => ENTITIES[e])
      .replace(/\|/g, " "),
  )
  if (!s) return null
  if (s.length <= MAX_QUOTE) return s
  const cut = s.slice(0, MAX_QUOTE)
  return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : MAX_QUOTE)}…`
}

export function trimService(raw: RawService) {
  const byTitle = new Map<string, RawPoint>()
  for (const p of raw.points) {
    if (p.status !== "approved" || !p.case) continue
    const key = clean(p.title).toLowerCase()
    const kept = byTitle.get(key)
    if (!kept || (p.updated_at ?? "") > (kept.updated_at ?? "")) byTitle.set(key, p)
  }
  const points = [...byTitle.values()]

  const counts = { blocker: 0, bad: 0, neutral: 0, good: 0 }
  for (const p of points) {
    const c = p.case!.classification as keyof typeof counts
    if (c in counts) counts[c]++
  }
  const dated = points.map((p) => (p.updated_at ?? "").slice(0, 10)).filter(Boolean).sort()
  // Concerns first (blockers, then bad), up to five; then good points; heaviest case first.
  const ranked = [...points].sort(
    (a, b) =>
      (ORDER[a.case!.classification] ?? 9) - (ORDER[b.case!.classification] ?? 9) ||
      (b.case!.weight ?? 0) - (a.case!.weight ?? 0),
  )
  const concerns = ranked.filter((p) => ["blocker", "bad"].includes(p.case!.classification)).slice(0, 5)
  const good = ranked.filter((p) => p.case!.classification === "good").slice(0, MAX_POINTS - concerns.length)
  const policy = raw.documents.find((d) => /privacy/i.test(d.name))
  return {
    id: raw.id,
    name: clean(raw.name),
    rating: raw.rating && raw.rating !== "N/A" ? raw.rating : null,
    reviewed_fully: raw.is_comprehensively_reviewed,
    newest_point: dated.at(-1) ?? null,
    counts,
    // Some points carry an empty source; fall back to the document ToS;DR filed them under.
    points: [...concerns, ...good].map((p) => ({
      id: p.id,
      title: clean(p.title),
      class: p.case!.classification,
      source: p.source || raw.documents.find((d) => d.id === p.document_id)?.url || null,
      quote: null as string | null,
      updated: (p.updated_at ?? "").slice(0, 10) || null,
    })),
    privacy_policy_url: policy?.url ?? null,
    url: `https://tosdr.org/en/service/${raw.id}`,
  }
}
