/**
 * API Rate Limiter
 *
 * Tiered rate limiting for the Privacy Protocol API.
 * Uses in-memory storage (acceptable for single-instance; upgrade to Redis for multi-instance).
 *
 * Tiers:
 * - free: 100 requests/day (identified by IP)
 * - developer: 10,000 requests/day (future: API key or x402 receipt)
 * - unlimited: no limit (enterprise / x402 paid)
 */

import { headers } from "next/headers"

export type RateLimitTier = "free" | "developer" | "unlimited"

type TierConfig = {
  maxRequests: number
  windowMs: number
}

const TIER_CONFIGS: Record<RateLimitTier, TierConfig> = {
  free: {
    maxRequests: 100,
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
  },
  developer: {
    maxRequests: 10_000,
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
  },
  unlimited: {
    maxRequests: Infinity,
    windowMs: 0,
  },
}

type Entry = {
  count: number
  resetAt: number
  tier: RateLimitTier
}

const store = new Map<string, Entry>()

function prune() {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key)
  }
}

if (typeof setInterval !== "undefined") {
  setInterval(prune, 5 * 60 * 1000)
}

export type RateLimitResult = {
  allowed: boolean
  tier: RateLimitTier
  remaining: number
  resetAt: number
  retryAfterSeconds?: number
}

/**
 * Check rate limit for an API request.
 * Returns headers to include in response.
 */
export function checkApiRateLimit(
  identifier: string,
  tier: RateLimitTier = "free"
): RateLimitResult {
  if (tier === "unlimited") {
    return { allowed: true, tier, remaining: Infinity, resetAt: 0 }
  }

  const config = TIER_CONFIGS[tier]
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry || entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + config.windowMs, tier })
    return {
      allowed: true,
      tier,
      remaining: config.maxRequests - 1,
      resetAt: now + config.windowMs,
    }
  }

  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      tier,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  entry.count++
  return {
    allowed: true,
    tier,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Get client identifier from request headers.
 * Vercel sets X-Forwarded-For / X-Real-IP itself and overwrites client-sent values.
 * CF-Connecting-IP is NOT read: no Cloudflare sits in front, so a client could send
 * any value and get a fresh rate-limit bucket per request.
 */
export async function getClientIdentifier(): Promise<string> {
  const h = await headers()
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  )
}

/**
 * Rate-limit helper for server actions (which aren't Request-based, so `withRateLimit`
 * doesn't apply). Per-IP, per-resource. In-memory / single-instance — upgrade to a shared
 * store (e.g. Upstash) for multi-instance correctness. See the note at the top of this file.
 */
export async function checkToolActionRateLimit(
  resource: string,
  tier: RateLimitTier = "free"
): Promise<RateLimitResult> {
  const identifier = await getClientIdentifier()
  return checkApiRateLimit(`${identifier}:${resource}`, tier)
}

/**
 * Build rate limit headers for response.
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const h: Record<string, string> = {
    "X-RateLimit-Limit": String(TIER_CONFIGS[result.tier].maxRequests),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.floor(result.resetAt / 1000)),
  }

  if (result.retryAfterSeconds) {
    h["Retry-After"] = String(result.retryAfterSeconds)
  }

  return h
}

/**
 * Higher-order function to wrap API route handlers with rate limiting and analytics.
 */
export function withRateLimit(
  handler: (request: Request) => Promise<Response>,
  options: { tier?: RateLimitTier; resource?: string } = {}
): (request: Request) => Promise<Response> {
  return async (request: Request) => {
    const startTime = Date.now()
    const identifier = await getClientIdentifier()
    const tier = options.tier ?? "free"
    const key = options.resource ? `${identifier}:${options.resource}` : identifier

    const result = checkApiRateLimit(key, tier)

    if (!result.allowed) {
      const responseTimeMs = Date.now() - startTime

      // Log rate-limited request (fire and forget)
      import("@/lib/api-analytics").then(({ logApiRequest, updateDailyStats }) => {
        logApiRequest({
          endpoint: options.resource ?? "unknown",
          method: request.method,
          statusCode: 429,
          responseTimeMs,
          rateLimitTier: tier,
          rateLimitRemaining: 0,
        })
        updateDailyStats(options.resource ?? "unknown", 429, responseTimeMs)
      })

      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: `You have exceeded the ${tier} tier limit. Please try again later.`,
          retry_after_seconds: result.retryAfterSeconds,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            ...rateLimitHeaders(result),
          },
        }
      )
    }

    const response = await handler(request)
    const responseTimeMs = Date.now() - startTime

    // Log successful request (fire and forget)
    import("@/lib/api-analytics").then(({ logApiRequest, updateDailyStats }) => {
      const url = new URL(request.url)
      logApiRequest({
        endpoint: options.resource ?? url.pathname,
        method: request.method,
        statusCode: response.status,
        responseTimeMs,
        rateLimitTier: tier,
        rateLimitRemaining: result.remaining,
      })
      updateDailyStats(options.resource ?? url.pathname, response.status, responseTimeMs)
    })

    // Clone response to add rate limit headers
    const newHeaders = new Headers(response.headers)
    for (const [headerKey, value] of Object.entries(rateLimitHeaders(result))) {
      newHeaders.set(headerKey, value)
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    })
  }
}
