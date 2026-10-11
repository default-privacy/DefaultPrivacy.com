/**
 * Refuse JSON-RPC batches over MAX_BATCH messages before the transport sees them.
 * A large batch of valid messages pins CPU inside the SDK transport (130k messages held
 * ~150% CPU for 4+ minutes in the 1.0.1 red team). Real clients send one message, or a
 * handful when batching; protocol 2025-06-18 and later don't batch at all.
 */

export const MAX_BATCH = 20

/** The 400 to send for an oversized batch, or null when the body is fine. */
export function oversizedBatch(body: unknown): Response | null {
  if (!Array.isArray(body) || body.length <= MAX_BATCH) return null
  return Response.json(
    { jsonrpc: "2.0", id: null, error: { code: -32600, message: `Batch too large: at most ${MAX_BATCH} messages per request.` } },
    { status: 400 },
  )
}

/** Wrap a route handler so POSTs with an oversized batch are refused. */
export function withBatchLimit(handler: (request: Request) => Promise<Response>) {
  return async (request: Request): Promise<Response> => {
    if (request.method === "POST") {
      try {
        const refused = oversizedBatch(await request.clone().json())
        if (refused) return refused
      } catch {
        // Unparseable body: the transport answers it with a JSON-RPC parse error.
      }
    }
    return handler(request)
  }
}
