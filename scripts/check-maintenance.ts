/**
 * Maintenance check: for every published listing with a GitHub source repo, is the
 * project archived, gone, or untouched for years? Reads the public directory API and
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
const CONCURRENCY = 8

type Row = { slug: string; repo: string; status: "archived" | "gone" | "stale" | "ok" | "error"; detail: string }

async function listRepos(): Promise<{ slug: string; repo: string }[]> {
  const out: { slug: string; repo: string }[] = []
  for (let offset = 0; ; offset += 50) {
    const res = await fetch(`${API}?sort=name&limit=50&offset=${offset}`)
    if (!res.ok) throw new Error(`${API} → HTTP ${res.status}`)
    const body = (await res.json()) as {
      data: { slug: string; website_url: string; trust: { source_code_url: string | null } }[]
      pagination: { has_more: boolean }
    }
    for (const t of body.data) {
      // source_code_url is a GitHub URL (or, before 2026-10-09, a bare "owner/repo");
      // a listing whose website IS a GitHub repo counts too.
      const m =
        t.trust.source_code_url?.match(/^(?:https?:\/\/github\.com\/)?([\w.-]+)\/([\w.-]+)\/?$/i) ??
        t.website_url.match(/^https?:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/?$/i)
      if (m) out.push({ slug: t.slug, repo: `${m[1]}/${m[2].replace(/\.git$/, "")}` })
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

async function check(slug: string, repo: string): Promise<Row> {
  const res = await gh(`/repos/${repo}`)
  if (res.status === 404) return { slug, repo, status: "gone", detail: "repo not found (deleted, renamed or private)" }
  if (!res.ok) return { slug, repo, status: "error", detail: `GitHub HTTP ${res.status}` }
  const r = (await res.json()) as { archived: boolean; pushed_at: string; full_name: string }
  const moved = r.full_name.toLowerCase() !== repo.toLowerCase() ? ` (now ${r.full_name})` : ""
  if (r.archived) return { slug, repo, status: "archived", detail: `archived; last push ${r.pushed_at.slice(0, 10)}${moved}` }
  if (years(r.pushed_at) >= STALE_YEARS) {
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
        rows.push(await check(r.slug, r.repo))
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
    `${rows.length} listings with a GitHub repo: ${pick("archived").length} archived, ${pick("gone").length} gone, ${pick("stale").length} untouched for ${STALE_YEARS}+ years, ${pick("error").length} errors.`,
    ``,
    `Archived or gone usually means the listing should be marked deprecated; stale needs a look (some tools are simply finished).`,
    ``,
    `## Archived`,
    table(pick("archived")),
    ``,
    `## Gone`,
    table(pick("gone")),
    ``,
    `## Untouched for ${STALE_YEARS}+ years`,
    table(pick("stale")),
    ``,
    ...(pick("error").length ? [`## Errors`, table(pick("error")), ``] : []),
  ].join("\n")
  if (process.env.MAINTENANCE_REPORT) writeFileSync(process.env.MAINTENANCE_REPORT, report)
  console.log(report)
}

if (import.meta.main) await main()
