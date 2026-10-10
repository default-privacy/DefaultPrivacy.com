import { NextResponse } from "next/server"
import { countAttributes, type AttributePair } from "@/lib/analytics/attributes"

// Never cache — this is a write-only telemetry sink, per-request.
export const dynamic = "force-dynamic"

/**
 * Aggregate browser-attribute corpus write sink.
 *
 * Accepts a curated set of {attribute, value} pairs from the /exposed detector and
 * increments a flat (attribute, value, count) tally for each. It stores NO IP, NO
 * per-visitor id, and NO raw fingerprint — the request IP is never read or written.
 * The client owns the guarantee that only coarse, enum-like attributes are sent.
 *
 * Fire-and-forget by design: it always returns 204 and never blocks on the DB, so a
 * DB hiccup can never surface in the UI.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { attributes?: unknown }
    const raw = Array.isArray(body?.attributes) ? body.attributes : []

    // Defensive: keep only well-formed, non-empty string pairs and cap the batch so
    // a hostile caller can't fan out unbounded rows in one request.
    const pairs: AttributePair[] = raw
      .filter(
        (p): p is AttributePair =>
          typeof p === "object" &&
          p !== null &&
          typeof (p as AttributePair).attribute === "string" &&
          typeof (p as AttributePair).value === "string" &&
          (p as AttributePair).attribute.length > 0 &&
          (p as AttributePair).value.length > 0,
      )
      .slice(0, 32)

    countAttributes(pairs)
  } catch {
    // Malformed body — swallow; telemetry must never error into the client.
  }

  return new NextResponse(null, { status: 204, headers: { "cache-control": "no-store" } })
}
