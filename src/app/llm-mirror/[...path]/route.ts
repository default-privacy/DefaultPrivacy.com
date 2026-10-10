/**
 * Clean-markdown mirrors for AI agents.
 *
 * next.config rewrites `/<path>.md` → `/llm-mirror/<path>`, so appending `.md` to any
 * guide, glossary term, or tool URL (or an index) returns a chrome-free Markdown view:
 *   /guides/anonymous-llc-wyoming.md   /glossary/metadata.md   /directory/proton-mail.md
 *   /guides.md   /glossary.md   /directory.md
 */

import { env } from "@/lib/env"
import { getAllGuides, getGuideBySlug } from "@/lib/guides"
import { getAllGlossaryTerms, getGlossaryTermBySlug } from "@/lib/glossary"
import { getPublicToolPpWithEvidence, searchPublicToolsPp } from "@/lib/privacy-protocol/query"

export const dynamic = "force-dynamic"

const BASE = env.NEXT_PUBLIC_URL.replace(/\/$/, "")
const abs = (p: string) => `${BASE}/${p.replace(/^\//, "")}`

function markdown(body: string, status = 200): Response {
  return new Response(body.endsWith("\n") ? body : `${body}\n`, {
    status,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
    },
  })
}

const notFound = () =>
  markdown("# Not found\n\nNo Markdown mirror exists for this path.", 404)

function meta(pairs: Array<[string, unknown]>): string {
  return pairs
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `- **${k}:** ${v}`)
    .join("\n")
}

async function guideMd(slug: string): Promise<Response> {
  const g = await getGuideBySlug(slug)
  if (!g) return notFound()
  const head = `# ${g.title}\n\n> ${g.description}\n\n${meta([
    ["Category", g.category],
    ["Difficulty", g.difficulty],
    ["Time to complete", g.timeToComplete],
    ["Tags", g.tags?.join(", ")],
    ["Source", abs(`guides/${g.slug}`)],
  ])}`
  return markdown(`${head}\n\n---\n\n${g.content}`)
}

async function glossaryMd(slug: string): Promise<Response> {
  const t = await getGlossaryTermBySlug(slug)
  if (!t) return notFound()
  const head = `# ${t.term}\n\n> ${t.definition}\n\n${meta([
    ["Category", t.category],
    ["Source", abs(`glossary/${t.slug}`)],
  ])}`
  return markdown(`${head}\n\n---\n\n${t.content}`)
}

async function toolMd(slug: string): Promise<Response> {
  const t = await getPublicToolPpWithEvidence(slug)
  if (!t) return notFound()
  const head = `# ${t.name}\n\n> ${t.tagline ?? ""}\n\n${meta([
    ["Website", t.website_url],
    ["Category", t.category],
    ["DP pick", t.pick && `${t.pick.category}: ${t.pick.reason}`],
    ["Open source", t.trust.is_open_source],
    ["Jurisdiction", t.privacy.jurisdiction && `${t.privacy.jurisdiction} (${t.privacy.jurisdiction_risk ?? "n/a"})`],
    ["End-to-end encrypted", t.privacy.encryption.e2ee],
    ["Source", abs(`directory/${t.slug}`)],
  ])}`
  const caveats = t.caveats ?? []
  const urls: string[] = []
  const n = (u: string) => {
    if (!urls.includes(u)) urls.push(u)
    return urls.indexOf(u) + 1
  }
  const refs = (us: string[]) => us.map((u) => `[${n(u)}]`).join("")
  const caveatList = caveats.map((c) => `- ${c.text} ${refs(c.sources)}`).join("\n")
  const sourceEntries = Object.values(t.sources ?? {})
  for (const e of sourceEntries) e.urls.forEach(n)
  const checkedOf = (u: string) =>
    sourceEntries.find((e) => e.urls.includes(u))?.checked ?? caveats.find((c) => c.sources.includes(u))?.checked ?? ""
  const sourceList = urls.map((u, i) => `${i + 1}. ${u} (checked ${checkedOf(u)})`).join("\n")
  const extra = [
    caveats.length ? `## Things to know\n\n${caveatList}` : "",
    urls.length ? `## Sources\n\n${sourceList}` : "",
    "A field that is missing above has not been checked by Default Privacy; it does not mean no.",
  ]
    .filter(Boolean)
    .join("\n\n")
  return markdown(`${head}\n\n---\n\n${t.description ?? ""}\n\n${extra}\n\n_${t.citation}_`)
}

async function guidesIndexMd(): Promise<Response> {
  const guides = await getAllGuides()
  const list = guides.map((g) => `- [${g.title}](${abs(`guides/${g.slug}.md`)}) — ${g.description}`).join("\n")
  return markdown(`# Guides\n\n${guides.length} privacy guides.\n\n${list}`)
}

async function glossaryIndexMd(): Promise<Response> {
  const terms = await getAllGlossaryTerms()
  const list = terms.map((t) => `- [${t.term}](${abs(`glossary/${t.slug}.md`)}) — ${t.definition}`).join("\n")
  return markdown(`# Glossary\n\n${terms.length} defined privacy and security terms.\n\n${list}`)
}

async function directoryIndexMd(): Promise<Response> {
  const { tools, total } = await searchPublicToolsPp({ sort: "picks", limit: 50 })
  const list = tools.map((t) => `- [${t.name}](${abs(`directory/${t.slug}.md`)}) —${t.pick ? " DP pick —" : ""} ${t.tagline ?? ""}`).join("\n")
  return markdown(
    `# Directory\n\n${total} privacy tools. First 50 below, DP picks first then A to Z; browse all at ${abs("directory")}.\n\n${list}`,
  )
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path?: string[] }> },
): Promise<Response> {
  const { path } = await params
  const segs = (path ?? []).filter(Boolean)
  const [type, ...rest] = segs
  const slug = rest.join("/")

  if (!type) return notFound()

  if (!slug) {
    if (type === "guides") return guidesIndexMd()
    if (type === "glossary") return glossaryIndexMd()
    if (type === "directory") return directoryIndexMd()
    return notFound()
  }

  if (type === "guides") return guideMd(slug)
  if (type === "glossary") return glossaryMd(slug)
  if (type === "directory") return toolMd(slug)
  return notFound()
}
