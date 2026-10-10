/**
 * In-memory rate limiter for server actions.
 * Uses sliding window per identifier (IP or client ID).
 * Resets on server restart — acceptable for single-instance deployment.
 */

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 5

type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

// Prune stale entries periodically
function prune() {
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key)
  }
}
if (typeof setInterval !== "undefined") {
  setInterval(prune, 5 * 60 * 1000) // every 5 min
}

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const entry = store.get(identifier)

  if (!entry) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true }
  }

  if (entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
  }

  entry.count++
  return { allowed: true }
}
