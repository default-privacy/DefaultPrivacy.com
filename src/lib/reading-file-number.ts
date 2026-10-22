/**
 * Case-file number for the reading frame, e.g. "G-012".
 *
 * Numbered by publishedAt ascending (oldest = 001), slug as the tie-break, so an
 * edit never renumbers a page; a new page only appends. Lists without dates
 * (the glossary) fall through to slug order, which reads like an index.
 */
export type Numbered = { slug: string; publishedAt?: string }

export function fileNumber(prefix: string, items: readonly Numbered[], slug: string): string {
  const order = [...items].sort(
    (a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? "") || a.slug.localeCompare(b.slug),
  )
  const i = order.findIndex((x) => x.slug === slug)
  return `${prefix}-${String(i + 1).padStart(3, "0")}`
}
