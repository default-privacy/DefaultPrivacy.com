import { NextResponse } from "next/server"
import { countAttributes, type AttributePair } from "@/lib/analytics/attributes"
import { withRateLimit } from "@/lib/api-rate-limit"

// Never cache — this is a write-only telemetry sink, per-request.
export const dynamic = "force-dynamic"

/**
 * Aggregate browser-attribute corpus write sink.
 *
 * Accepts a curated set of {attribute, value} pairs from the /exposed detector and
 * increments a flat (attribute, value, count) tally for each. It stores NO IP, NO
 * per-visitor id, and NO raw fingerprint — the request IP is never read or written.
 * Only the attribute names the /exposed detector sends are accepted, and values are
 * length-capped, so a hostile caller can't write arbitrary rows.
 *
 * Fire-and-forget by design: it always returns 204 and never blocks on the DB, so a
 * DB hiccup can never surface in the UI.
 */
// Must match attributePairs() in src/components/exposure/exposure-readout.tsx.
const ALLOWED_ATTRIBUTES = new Set([
  "webglRenderer",
  "webglVendor",
  "screen",
  "colorDepth",
  "pixelRatio",
  "platform",
  "cores",
  "memory",
  "timezone",
  "languages",
  "touch",
])
const MAX_VALUE_LENGTH = 128

async function handlePost(request: Request) {
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
          ALLOWED_ATTRIBUTES.has((p as AttributePair).attribute) &&
          (p as AttributePair).value.length > 0 &&
          (p as AttributePair).value.length <= MAX_VALUE_LENGTH,
      )
      .slice(0, ALLOWED_ATTRIBUTES.size)

    countAttributes(pairs)
  } catch {
    // Malformed body — swallow; telemetry must never error into the client.
  }

  return new NextResponse(null, { status: 204, headers: { "cache-control": "no-store" } })
}

export const POST = withRateLimit(handlePost, { resource: "/api/attributes" })
