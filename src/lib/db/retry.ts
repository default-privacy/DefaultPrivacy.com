import { DrizzleQueryError } from "drizzle-orm"

/**
 * Runs a counter write, and once more if it fails. On Vercel a reused connection to Neon can be
 * dead after the function sat idle: the write fails in under 300 ms with "fetch failed" (seen
 * 2026-10-28) and a second try gets a fresh connection. Only for counter upserts: if a first try
 * landed but its reply was lost, the counter gains one, which is fine for a counter and not for
 * other writes.
 */
export async function retryOnce(write: () => PromiseLike<unknown>): Promise<void> {
  try {
    await write()
  } catch {
    await write()
  }
}

/**
 * Why a query failed, on one line: each cause's name, code and message. Starts below a query
 * error, whose message lists the query's values. console.error prints two levels deep, which hid
 * the socket error under "fetch failed".
 */
export function failureCause(error: unknown): string {
  const parts: string[] = []
  let e: unknown = error instanceof DrizzleQueryError ? error.cause : error
  for (let depth = 0; e && depth < 5; depth++) {
    const { name, code, message, cause, sourceError } = e as {
      name?: string
      code?: string
      message?: string
      cause?: unknown
      sourceError?: unknown
    }
    parts.push([name, code, message].filter(Boolean).join(" "))
    // Neon's error keeps the fetch error in sourceError, not cause.
    e = cause ?? sourceError
  }
  return parts.join(" <- ") || "unknown error"
}
