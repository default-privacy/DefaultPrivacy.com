/**
 * Facts the official MCP registry holds for one server, for dp_check_mcp_server.
 *
 * Everything returned is what the publisher declared when they listed the server. The
 * registry is not a review, so nothing here is a score or a safety verdict.
 *
 * Exact-name lookup only. The registry's search is a slow substring match on names
 * (4 to 14 seconds in testing) and returns lookalikes: searching "bitwarden" returns one
 * stranger's server, not Bitwarden's. Showing that as an answer for "is Bitwarden's MCP
 * server OK" would be wrong, so a reference that does not map to one exact registry name
 * gets no lookup.
 */

const REGISTRY = "https://registry.modelcontextprotocol.io/v0/servers"
const TIMEOUT_MS = 2500

export type RegistryFacts = {
  name: string
  status: string | null
  published_at: string | null
  source_repository: string | null
  remotes: { url: string; https: boolean }[]
  packages: { registry: string; identifier: string }[]
}

export type RegistryLookup =
  | { state: "found"; facts: RegistryFacts }
  | { state: "not_found"; name: string }
  | { state: "unavailable"; name: string }
  | { state: "no_candidate" }

/**
 * The one registry name a reference maps to. A GitHub repository URL maps to
 * io.github.<owner>/<repo> (the registry's convention for GitHub-verified publishers); a
 * reverse-DNS name is used as written. Anything else has no exact name.
 */
export function registryNameFor(ref: string): string | null {
  const t = ref.trim().replace(/\/+$/, "").replace(/\.git$/, "")
  const gh = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([A-Za-z0-9-]+)\/([A-Za-z0-9._-]+)(?:\/.*)?$/i.exec(t)
  if (gh) return `io.github.${gh[1].toLowerCase()}/${gh[2]}`
  if (!t.includes("://") && /^[a-z0-9][a-z0-9.-]*\.[a-z]{2,}\/[A-Za-z0-9._-]+$/i.test(t)) return t
  return null
}

type RegistryEntry = {
  server?: {
    name?: string
    repository?: { url?: string }
    remotes?: { url?: string }[]
    packages?: { registryType?: string; identifier?: string }[]
  }
  _meta?: Record<string, { status?: string; publishedAt?: string } | undefined>
}

// Every string here is publisher-written and goes straight to an AI client, so each is
// cut to one short line and the lists to a few entries. Enough to identify a server,
// too little to carry instructions.
const MAX_CHARS = 200
const MAX_ITEMS = 5
const clip = (v: unknown): string | null => (typeof v === "string" ? v.slice(0, MAX_CHARS) : null)

export function factsFrom(entry: RegistryEntry): RegistryFacts | null {
  const s = entry.server
  if (!s || typeof s.name !== "string") return null
  const meta = entry._meta?.["io.modelcontextprotocol.registry/official"]
  return {
    name: s.name.slice(0, MAX_CHARS),
    status: clip(meta?.status),
    published_at: clip(meta?.publishedAt),
    source_repository: clip(s.repository?.url),
    remotes: (s.remotes ?? [])
      .flatMap((r) => (typeof r.url === "string" ? [{ url: r.url.slice(0, MAX_CHARS), https: r.url.startsWith("https://") }] : []))
      .slice(0, MAX_ITEMS),
    packages: (s.packages ?? [])
      .flatMap((p) =>
        typeof p.identifier === "string"
          ? [{ registry: clip(p.registryType) ?? "unknown", identifier: p.identifier.slice(0, MAX_CHARS) }]
          : [],
      )
      .slice(0, MAX_ITEMS),
  }
}

export async function lookupRegistry(ref: string, fetcher: typeof fetch = fetch): Promise<RegistryLookup> {
  const name = registryNameFor(ref)
  if (!name) return { state: "no_candidate" }
  try {
    const res = await fetcher(`${REGISTRY}/${encodeURIComponent(name)}/versions/latest`, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (res.status === 404) return { state: "not_found", name }
    if (!res.ok) return { state: "unavailable", name }
    const facts = factsFrom((await res.json()) as RegistryEntry)
    return facts ? { state: "found", facts } : { state: "unavailable", name }
  } catch {
    return { state: "unavailable", name }
  }
}

export const REGISTRY_CAVEAT =
  "Declared by the publisher when they listed the server. The registry is not a review, and a missing entry says little: many servers are not listed. Not a safety verdict."
