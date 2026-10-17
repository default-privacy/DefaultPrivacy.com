/**
 * A guide's outline and single sections, so dp_get_guide can answer in a few hundred
 * characters instead of the whole guide (~18,000 on average in the 2026-10-16 test).
 * Sections are the guide's "## " headings.
 */

export type GuideSection = { heading: string; text: string }

export function guideSections(content: string): GuideSection[] {
  const parts = content.split(/^## /m)
  return parts.slice(1).map((p) => {
    const nl = p.indexOf("\n")
    return { heading: (nl === -1 ? p : p.slice(0, nl)).trim(), text: (nl === -1 ? "" : p.slice(nl + 1)).trim() }
  })
}

/** The section whose heading matches, case-insensitively: exact first, then a heading that contains it. */
export function findSection(content: string, wanted: string): GuideSection | null {
  const w = wanted.trim().toLowerCase().replace(/^#+\s*/, "")
  const all = guideSections(content)
  return all.find((s) => s.heading.toLowerCase() === w) ?? all.find((s) => s.heading.toLowerCase().includes(w)) ?? null
}

/** A stack's layers with the tools under each ("### [Signal](/directory/signal)" → "Signal"). */
export function stackOutline(content: string): { heading: string; tools?: string[] }[] {
  return guideSections(content).map((s) => {
    const tools = [...s.text.matchAll(/^### +(.+)$/gm)].map((m) => m[1].replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").trim())
    return tools.length ? { heading: s.heading, tools } : { heading: s.heading }
  })
}
