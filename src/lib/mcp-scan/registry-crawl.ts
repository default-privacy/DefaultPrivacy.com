/**
 * Full crawl of the official MCP registry: latest version of every active server.
 * Keyless, cursor-paged. The registry sees only DP's address and the page cursors.
 */

const REGISTRY = "https://registry.modelcontextprotocol.io/v0/servers"

export type CrawledServer = {
  name: string
  version: string | null
  description: string | null
  repository: string | null
  remotes: { type: string; url: string }[]
  packages: { registryType: string; identifier: string; version: string | null }[]
}

export async function crawlRegistry(userAgent: string, onPage?: (n: number, total: number) => void): Promise<CrawledServer[]> {
  const out: CrawledServer[] = []
  let cursor: string | undefined
  for (let page = 1; page <= 5000; page++) {
    const u = `${REGISTRY}?limit=100&version=latest${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`
    let res: Response | undefined
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        res = await fetch(u, { headers: { "user-agent": userAgent, accept: "application/json" }, signal: AbortSignal.timeout(30_000) })
      } catch {
        res = undefined
      }
      if (res?.ok) break
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)))
    }
    if (!res?.ok) throw new Error(`registry page ${page}: HTTP ${res?.status}`)
    type Raw = Record<string, unknown>
    const d = (await res.json()) as { servers?: { server: Raw; _meta?: Record<string, Raw> }[]; metadata?: { nextCursor?: string } }
    for (const e of d.servers ?? []) {
      const meta = (e._meta?.["io.modelcontextprotocol.registry/official"] ?? {}) as Raw
      if (meta.status && meta.status !== "active") continue
      const s = e.server
      const repo = s.repository as Raw | undefined
      const remotes = (Array.isArray(s.remotes) ? s.remotes : []) as Raw[]
      const packages = (Array.isArray(s.packages) ? s.packages : []) as Raw[]
      out.push({
        name: String(s.name),
        version: typeof s.version === "string" ? s.version : null,
        description: typeof s.description === "string" ? s.description.slice(0, 300) : null,
        repository: typeof repo?.url === "string" ? repo.url : null,
        remotes: remotes.filter((r) => typeof r?.url === "string").map((r) => ({ type: String(r.type), url: r.url as string })),
        packages: packages.map((p) => ({ registryType: String(p.registryType), identifier: String(p.identifier), version: typeof p.version === "string" ? p.version : null })),
      })
    }
    onPage?.(page, out.length)
    cursor = d.metadata?.nextCursor
    if (!cursor) break
    await new Promise((r) => setTimeout(r, 200))
  }
  return out
}

/** The URL the hosted scan probes: the first streamable-http remote with no {template} part. */
export function probeUrlFor(s: CrawledServer): string | null {
  const r = s.remotes.find((x) => x.type === "streamable-http" && !x.url.includes("{"))
  return r?.url ?? null
}
