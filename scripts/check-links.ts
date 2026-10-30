/**
 * Link check: every published directory listing's website, read from the public API
 * (no database credentials needed, so it runs in CI).
 *
 *   bun run scripts/check-links.ts                                   # defaultprivacy.com
 *   DP_API_URL=http://localhost:3000/api/v1/tools bun run scripts/check-links.ts
 *   LINK_REPORT=report.md bun run scripts/check-links.ts             # also write markdown
 *
 * Exits 1 only on HARD failures, the kind that mean a listing points somewhere it
 * shouldn't: the domain doesn't resolve or refuses connections, the page is gone
 * (404/410), the site redirects to a different domain (sold, hijacked, or rebranded:
 * either way the stored URL is wrong), or the landing page is a parked / for-sale domain.
 * SOFT results (403/429 bot walls, timeouts, 5xx) are listed but don't fail the run:
 * they are usually the checker being blocked, not the link being dead.
 */
import { writeFileSync } from "node:fs"

const API = process.env.DP_API_URL ?? "https://defaultprivacy.com/api/v1/tools"
const TIMEOUT_MS = 15_000
const CONCURRENCY = 12
const MAX_HOPS = 10
const UA = "DefaultPrivacyLinkCheck/1.0 (+https://defaultprivacy.com/ai)"

// Hosts and phrases that mean "this domain is parked or for sale".
const PARKING_HOSTS = ["sedo.com", "dan.com", "afternic.com", "hugedomains.com", "parkingcrew.net", "bodis.com", "godaddy.com/domainsearch", "sav.com", "undeveloped.com", "atom.com"]
const PARKING_TEXT = /domain (is|may be) for sale|buy this domain|this domain is parked|domain has expired|make an offer on this domain/i

// Cross-domain redirects the domain owner made on purpose, checked by hand (slug → the
// registrable domain it is allowed to land on). Keep this list short and sourced.
const INTENDED_REDIRECTS: Record<string, string> = {
  age: "github.com", // age-encryption.org redirects to the official repo (2026-10-09)
  monerujo: "monerujo.app", // the official repo still names monerujo.io, which 308s here (2026-10-09)
}

// Second-level suffixes where the registrable domain is the last THREE labels.
const TWO_LEVEL = new Set(["co.uk", "org.uk", "ac.uk", "com.au", "net.au", "co.nz", "co.jp", "com.br", "co.za", "co.in", "com.mx", "com.tr", "co.kr"])

export function registrableDomain(host: string): string {
  const labels = host.toLowerCase().replace(/^www\./, "").split(".")
  const lastTwo = labels.slice(-2).join(".")
  return TWO_LEVEL.has(lastTwo) ? labels.slice(-3).join(".") : lastTwo
}

type Result = { slug: string; url: string; kind: "ok" | "hard" | "soft"; problem: string; finalUrl?: string }

async function listTools(): Promise<{ slug: string; url: string }[]> {
  const out: { slug: string; url: string }[] = []
  // sort=name: offset paging over a non-unique sort can skip rows.
  for (let offset = 0; ; offset += 50) {
    const res = await fetch(`${API}?sort=name&limit=50&offset=${offset}`)
    if (!res.ok) throw new Error(`${API} → HTTP ${res.status}`)
    const body = (await res.json()) as { data: { slug: string; website_url: string }[]; pagination: { has_more: boolean } }
    out.push(...body.data.map((t) => ({ slug: t.slug, url: t.website_url })))
    if (!body.pagination.has_more) return out
  }
}

export async function check(slug: string, url: string): Promise<Result> {
  let current = url
  try {
    const startDomain = registrableDomain(new URL(url).hostname)
    for (let hop = 0; hop < MAX_HOPS; hop++) {
      const res = await fetch(current, {
        redirect: "manual",
        headers: { "user-agent": UA, accept: "text/html,*/*" },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      })
      const location = res.headers.get("location")
      if (res.status >= 300 && res.status < 400 && location) {
        const next = new URL(location, current)
        const nextDomain = registrableDomain(next.hostname)
        // Google sends datacenter IPs to its captcha page, e.g. Blogger-hosted sites like gmer.net.
        if (nextDomain === "google.com" && next.pathname.startsWith("/sorry/")) {
          await res.body?.cancel()
          return { slug, url, kind: "soft", problem: "Google captcha page", finalUrl: next.toString() }
        }
        if (nextDomain !== startDomain && INTENDED_REDIRECTS[slug] !== nextDomain) {
          await res.body?.cancel()
          return { slug, url, kind: "hard", problem: `redirects to another domain (${next.hostname})`, finalUrl: next.toString() }
        }
        await res.body?.cancel()
        current = next.toString()
        continue
      }
      if (PARKING_HOSTS.some((h) => current.includes(h))) {
        await res.body?.cancel()
        return { slug, url, kind: "hard", problem: "lands on a domain-parking page", finalUrl: current }
      }
      if (res.status === 404 || res.status === 410) {
        await res.body?.cancel()
        return { slug, url, kind: "hard", problem: `HTTP ${res.status}`, finalUrl: current }
      }
      if (res.status >= 400) {
        await res.body?.cancel()
        return { slug, url, kind: "soft", problem: `HTTP ${res.status}`, finalUrl: current }
      }
      const text = (await res.text()).slice(0, 65_536)
      if (PARKING_TEXT.test(text)) return { slug, url, kind: "hard", problem: "page says the domain is parked or for sale", finalUrl: current }
      return { slug, url, kind: "ok", problem: "", finalUrl: current }
    }
    return { slug, url, kind: "soft", problem: `more than ${MAX_HOPS} redirects`, finalUrl: current }
  } catch (error) {
    // Bun puts the reason on error.code (DNS failures also surface as ConnectionRefused);
    // Node puts it on error.cause.code.
    const e = error as { code?: string | number; name?: string; cause?: { code?: string } }
    const cause = String(e.cause?.code ?? (typeof e.code === "string" ? e.code : e.name))
    const dead = ["ConnectionRefused", "FailedToOpenSocket", "ENOTFOUND", "ECONNREFUSED", "ERR_INVALID_URL", "CERT_HAS_EXPIRED", "ERR_TLS_CERT_ALTNAME_INVALID"].includes(cause)
    return dead
      ? { slug, url, kind: "hard", problem: `unreachable (${cause})` }
      : { slug, url, kind: "soft", problem: `failed (${cause})` }
  }
}

async function main() {
  const tools = await listTools()
  const results: Result[] = []
  let next = 0
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < tools.length) {
        const t = tools[next++]
        results.push(await check(t.slug, t.url))
      }
    }),
  )
  results.sort((a, b) => a.slug.localeCompare(b.slug))
  const hard = results.filter((r) => r.kind === "hard")
  const soft = results.filter((r) => r.kind === "soft")

  const row = (r: Result) => `| ${r.slug} | ${r.url} | ${r.problem} | ${r.finalUrl && r.finalUrl !== r.url ? r.finalUrl : ""} |`
  const report = [
    `# Directory link check`,
    ``,
    `${results.length} listings checked: ${results.length - hard.length - soft.length} ok, **${hard.length} broken**, ${soft.length} could not be checked.`,
    ``,
    `## Broken (fix the URL or unpublish the listing)`,
    hard.length ? `| slug | url | problem | ends at |\n|---|---|---|---|\n${hard.map(row).join("\n")}` : "None.",
    ``,
    `## Could not be checked (usually bot walls or timeouts; look only if one persists)`,
    soft.length ? `| slug | url | problem | ends at |\n|---|---|---|---|\n${soft.map(row).join("\n")}` : "None.",
    ``,
  ].join("\n")

  if (process.env.LINK_REPORT) writeFileSync(process.env.LINK_REPORT, report)
  console.log(report)
  process.exit(hard.length ? 1 : 0)
}

if (import.meta.main) await main()
