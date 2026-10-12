/**
 * Domain breach lookup via HIBP breach catalog (domain-level match).
 * Shared by audit pipeline and MCP — no "use server".
 */

import { extractDomain } from "@/lib/whois/rdap"

export type BreachInfo = {
  Name: string
  Title: string
  Domain: string
  BreachDate: string
  PwnCount: number
  Description: string
  DataClasses: string[]
  IsVerified: boolean
  IsSensitive: boolean
}

export type BreachCheckResult = {
  success: boolean
  domain: string
  breaches: BreachInfo[]
  totalExposed: number
  /** Set when success is false. The breach list is then unknown, not empty. */
  error?: string
}

const HIBP_BREACHES_URL = "https://haveibeenpwned.com/api/v3/breaches"

let cachedBreaches: BreachInfo[] | null = null
let cacheExpiry = 0

async function getAllBreaches(): Promise<BreachInfo[]> {
  if (cachedBreaches && Date.now() < cacheExpiry) return cachedBreaches

  const res = await fetch(HIBP_BREACHES_URL, {
    headers: {
      "User-Agent": "DefaultPrivacy-Audit",
    },
    signal: AbortSignal.timeout(5000),
  })

  if (!res.ok) {
    if (cachedBreaches) return cachedBreaches
    throw new Error(`HIBP breaches request failed: ${res.status}`)
  }

  cachedBreaches = await res.json()
  cacheExpiry = Date.now() + 6 * 60 * 60 * 1000
  return cachedBreaches!
}

export async function checkBreaches(domain: string): Promise<BreachCheckResult> {
  try {
    const normalizedDomain = extractDomain(domain)
    // Needs a name and a suffix: a bare "com" would match every .com breach.
    if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(normalizedDomain)) {
      return {
        success: false,
        domain,
        breaches: [],
        totalExposed: 0,
        error: "Please enter a valid domain name, like example.com.",
      }
    }
    const allBreaches = await getAllBreaches()

    const matches = allBreaches.filter((b) => {
      const breachDomain = b.Domain.toLowerCase()
      return (
        breachDomain === normalizedDomain ||
        breachDomain.endsWith(`.${normalizedDomain}`) ||
        normalizedDomain.endsWith(`.${breachDomain}`)
      )
    })

    const totalExposed = matches.reduce((sum, b) => sum + b.PwnCount, 0)

    return {
      success: true,
      domain: normalizedDomain,
      breaches: matches,
      totalExposed,
    }
  } catch (error) {
    // Signal the failure instead of reporting a false all-clear (0 breaches).
    console.error("[breach-check] Error:", error)
    return {
      success: false,
      domain,
      breaches: [],
      totalExposed: 0,
      error: "The breach catalog could not be reached, so the result is unknown. Try again later.",
    }
  }
}
