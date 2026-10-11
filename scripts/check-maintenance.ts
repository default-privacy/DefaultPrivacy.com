/**
 * Maintenance check: for every published listing with a GitHub source repo, is the
 * project archived, gone, or untouched for years? MCP server listings are held to the
 * vetted-list bar instead: touched within six months, and a server that lives in a folder
 * of a bigger repo (github.com/owner/repo/tree/branch/path) is dated by that folder's
 * last commit. Reads the public directory API and
 * the GitHub REST API. Report only, never fails: "archived" can mean finished, and
 * the call to deprecate a listing is a human one (tools.is_deprecated + deprecated_reason).
 *
 *   GITHUB_TOKEN=... bun run scripts/check-maintenance.ts
 *   DP_API_URL=http://localhost:3000/api/v1/tools GITHUB_TOKEN=... bun run scripts/check-maintenance.ts
 *   MAINTENANCE_REPORT=report.md ...                                 # also write markdown
 *
 * Without a token GitHub allows 60 requests an hour, far too few; CI's built-in token is enough.
 */
import { writeFileSync } from "node:fs"

const API = process.env.DP_API_URL ?? "https://defaultprivacy.com/api/v1/tools"
const TOKEN = process.env.GITHUB_TOKEN
const STALE_YEARS = 2
const MCP_STALE_YEARS = 0.5 // the mcp-servers bar: maintained in the last six months
const CONCURRENCY = 8

type Row = { slug: string; repo: string; status: "archived" | "gone" | "stale" | "ok" | "error"; detail: string }
type Listing = { slug: string; repo: string; branch?: string; path?: string; mcp: boolean }

// owner/repo, optionally /tree/<branch>/<folder>
const GITHUB = /^(?:https?:\/\/github\.com\/)?([\w.-]+)\/([\w.-]+?)(?:\.git)?(?:\/tree\/([\w.-]+)\/([\w./-]+?))?\/?$/i

async function listRepos(): Promise<Listing[]> {
  const out: Listing[] = []
  for (let offset = 0; ; offset += 50) {
    const res = await fetch(`${API}?sort=name&limit=50&offset=${offset}`)
    if (!res.ok) throw new Error(`${API} → HTTP ${res.status}`)
    const body = (await res.json()) as {
      data: { slug: string; website_url: string; categories: string[]; trust: { source_code_url: string | null } }[]
      pagination: { has_more: boolean }
    }
    for (const t of body.data) {
      // source_code_url is a GitHub URL (or, before 2026-10-09, a bare "owner/repo");
      // a listing whose website IS a GitHub repo counts too.
      const m = t.trust.source_code_url?.match(GITHUB) ?? (/^https?:\/\/github\.com\//i.test(t.website_url) ? t.website_url.match(GITHUB) : null)
      if (m) out.push({ slug: t.slug, repo: `${m[1]}/${m[2]}`, branch: m[3], path: m[4], mcp: t.categories.includes("mcp-servers") })
    }
    if (!body.pagination.has_more) return out
  }
}

async function gh(path: string): Promise<Response> {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      accept: "application/vnd.github+json",
      "user-agent": "DefaultPrivacyMaintenanceCheck",
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
    },
  })
}

const years = (iso: string) => (Date.now() - new Date(iso).getTime()) / (365.25 * 24 * 3600 * 1000)

async function check({ slug, repo, branch, path, mcp }: Listing): Promise<Row> {
  const limit = mcp ? MCP_STALE_YEARS : STALE_YEARS
  const where = path ? `${repo}/${path}` : repo
  const res = await gh(`/repos/${repo}`)
  if (res.status === 404) return { slug, repo, status: "gone", detail: "repo not found (deleted, renamed or private)" }
  if (!res.ok) return { slug, repo, status: "error", detail: `GitHub HTTP ${res.status}` }
  const r = (await res.json()) as { archived: boolean; pushed_at: string; full_name: string }
  const moved = r.full_name.toLowerCase() !== repo.toLowerCase() ? ` (now ${r.full_name})` : ""
  if (r.archived) return { slug, repo: where, status: "archived", detail: `archived; last push ${r.pushed_at.slice(0, 10)}${moved}` }
  if (path) {
    const c = await gh(`/repos/${repo}/commits?sha=${encodeURIComponent(branch!)}&path=${encodeURIComponent(path)}&per_page=1`)
    if (!c.ok) return { slug, repo: where, status: "error", detail: `GitHub HTTP ${c.status} reading the folder's commits` }
    const last = ((await c.json()) as { commit: { committer: { date: string } } }[])[0]?.commit.committer.date
    if (!last) return { slug, repo: where, status: "gone", detail: `no commits on ${branch} under ${path} (folder moved or deleted)` }
    if (years(last) >= limit) return { slug, repo: where, status: "stale", detail: `no commit to the folder since ${last.slice(0, 10)}${moved}` }
    return { slug, repo: where, status: "ok", detail: moved }
  }
  if (years(r.pushed_at) >= limit) {
    const rel = await gh(`/repos/${repo}/releases/latest`)
    const latest = rel.ok ? ((await rel.json()) as { published_at: string }).published_at.slice(0, 10) : "none"
    return { slug, repo, status: "stale", detail: `no push since ${r.pushed_at.slice(0, 10)}; latest release ${latest}${moved}` }
  }
  return { slug, repo, status: "ok", detail: moved }
}

async function main() {
  const repos = await listRepos()
  const rows: Row[] = []
  let next = 0
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < repos.length) {
        const r = repos[next++]
        rows.push(await check(r))
      }
    }),
  )
  rows.sort((a, b) => a.slug.localeCompare(b.slug))
  const pick = (s: Row["status"]) => rows.filter((r) => r.status === s)
  const table = (list: Row[]) =>
    list.length ? `| slug | repo | detail |\n|---|---|---|\n${list.map((r) => `| ${r.slug} | ${r.repo} | ${r.detail} |`).join("\n")}` : "None."
  const report = [
    `# Directory maintenance check`,
    ``,
    `${rows.length} listings with a GitHub repo: ${pick("archived").length} archived, ${pick("gone").length} gone, ${pick("stale").length} stale (untouched ${STALE_YEARS}+ years, or 6+ months for MCP servers), ${pick("error").length} errors.`,
    ``,
    `Archived or gone usually means the listing should be marked deprecated; stale needs a look (some tools are simply finished).`,
    ``,
    `## Archived`,
    table(pick("archived")),
    ``,
    `## Gone`,
    table(pick("gone")),
    ``,
    `## Stale (${STALE_YEARS}+ years; MCP servers 6+ months)`,
    table(pick("stale")),
    ``,
    ...(pick("error").length ? [`## Errors`, table(pick("error")), ``] : []),
  ].join("\n")
  if (process.env.MAINTENANCE_REPORT) writeFileSync(process.env.MAINTENANCE_REPORT, report)
  console.log(report)
}

if (import.meta.main) await main()
