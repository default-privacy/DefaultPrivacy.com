import { env, isServiceEnabled } from "@/lib/env"
import { withRateLimit } from "@/lib/api-rate-limit"

type ResolverInfo = {
  ip: string
  firstSeen: number
  queryCount: number
  isp?: string | null
  country?: string | null
}

async function handleGet(request: Request): Promise<Response> {
  // Path param [token] — withRateLimit only forwards `request`, so read it from the URL.
  const token = new URL(request.url).pathname.split("/").pop() ?? ""

  if (!token || !/^[a-z0-9]{8,16}$/.test(token)) {
    return Response.json({ error: "Invalid token" }, { status: 400 })
  }

  // If DNS leak server is configured, query it for real resolver data
  if (isServiceEnabled.dnsLeak && env.DNS_LEAK_SERVER_URL && env.DNS_LEAK_SERVER_SECRET) {
    try {
      const res = await fetch(`${env.DNS_LEAK_SERVER_URL}/results/${token}`, {
        headers: { Authorization: `Bearer ${env.DNS_LEAK_SERVER_SECRET}` },
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      })

      if (!res.ok) {
        return Response.json({ error: "DNS leak server error" }, { status: 502 })
      }

      const data = (await res.json()) as {
        token: string
        resolvers: { ip: string; firstSeen: number; queryCount: number }[]
        resolverCount: number
      }

      // Privacy: we deliberately do NOT enrich resolver IPs via any third-party GeoIP
      // service. Shipping a visitor's DNS-resolver IP to an outside API, on a tool whose
      // whole job is to catch DNS leaks, is exactly the leak this page warns about.
      // ISP/country enrichment belongs on the self-hosted probe using an OFFLINE GeoIP
      // database — do NOT reintroduce a third-party lookup here. Until the probe enriches,
      // return resolvers unenriched and derive the leak signal from the count of distinct
      // resolver IPs (no external lookup).
      const resolvers: ResolverInfo[] = data.resolvers.map((r) => ({ ...r, isp: null, country: null }))

      // Distinct resolver IPs answering for one client = probable leak.
      const uniqueIps = new Set(resolvers.map((r) => r.ip))
      const isLeaking = uniqueIps.size > 1

      return Response.json({
        mode: "infrastructure",
        token: data.token,
        resolvers,
        resolverCount: data.resolverCount,
        isLeaking,
      })
    } catch (err) {
      console.error("[dns-leak/results] Error querying DNS leak server:", err)
      return Response.json({ error: "DNS leak server unreachable" }, { status: 502 })
    }
  }

  // Fallback: no DNS leak server configured
  return Response.json({
    mode: "fallback",
    token,
    resolvers: [],
    resolverCount: 0,
    isLeaking: null,
    message: "DNS leak server not configured. Using client-side fallback.",
  })
}

export const GET = withRateLimit(handleGet, { resource: "/api/dns-leak/results" })
