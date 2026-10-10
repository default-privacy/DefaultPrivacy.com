import { isServiceEnabled } from "@/lib/env"
import { withRateLimit } from "@/lib/api-rate-limit"

const DNS_LEAK_DOMAIN = "leak.defaultprivacy.com"
const SUBDOMAIN_COUNT = 5

async function handlePost(): Promise<Response> {
  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12)

  const subdomains = Array.from({ length: SUBDOMAIN_COUNT }, (_, i) =>
    `${token}-${i + 1}.${DNS_LEAK_DOMAIN}`
  )

  return Response.json({
    token,
    subdomains,
    mode: isServiceEnabled.dnsLeak ? "infrastructure" : "fallback",
  })
}

export const POST = withRateLimit(handlePost, { resource: "/api/dns-leak/start" })
