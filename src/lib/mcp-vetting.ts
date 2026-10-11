/**
 * The vetted MCP-server list: directory listings in the "mcp-servers" category. The bar for a
 * listing is the category description (set when the category was created); a
 * listing is not a security audit. Used by the dp_check_mcp_server MCP tool.
 */
import { keywords } from "@/lib/site-search"

export const MCP_CATEGORY = "mcp-servers"

export const MCP_BAR =
  "Open source, maintained in the last six months, clear about what it can read or change, and unable to move money by default. A server that can send messages, run code or act on devices is listed only if it is official and narrowly scoped, and its listing says what it can do. A listing is not a security audit."

export const MCP_CHECKLIST = [
  "Who runs it? Connect only servers built and hosted by organisations you trust.",
  "What permissions does it ask for? Limit scopes and deny ones it does not need.",
  "Can it only read, or can it also change data and send things out? Prefer read-only.",
  "Where does what it reads go? A server that calls an outside service hands that service whatever it reads.",
  "Can strangers put content in front of it (email, web pages, shared files)? That is how prompt injection gets in.",
  "Is it connected to something you cannot afford to lose? Keep main email, banking and password managers out.",
]

type Listing = { slug: string; name: string; website_url: string | null; trust: { source_code_url: string | null } }

/** A server reference as written by a person or agent, reduced to a comparable form. */
export function normalizeRef(ref: string): string {
  return ref
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "")
    .replace(/\.git$/, "")
    .replace(/\/+$/, "")
}

/**
 * The listing a reference points to exactly (slug, name, website or source URL), plus any
 * listings that share a word with it, for "did you mean". Exact match only counts as vetted.
 */
export function matchMcpRef<T extends Listing>(ref: string, listings: T[]): { exact: T | null; similar: T[] } {
  const n = normalizeRef(ref)
  if (!n) return { exact: null, similar: [] }
  const forms = (l: T) => [l.slug, l.name, l.website_url, l.trust.source_code_url].filter((x): x is string => !!x).map(normalizeRef)
  const exact = listings.find((l) => forms(l).includes(n)) ?? null
  const words = new Set(keywords(ref.replace(/[/.:_-]+/g, " ")).filter((w) => w.length > 2 && !["github", "com", "mcp", "server"].includes(w)))
  const similar = exact
    ? []
    : listings.filter((l) => keywords(`${l.name} ${l.slug}`.replace(/[/.:_-]+/g, " ")).some((w) => words.has(w)))
  return { exact, similar }
}
