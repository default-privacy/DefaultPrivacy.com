import { NextResponse } from "next/server"
import { headers } from "next/headers"

// Never cache — this returns the caller's own IP, must be per-request and never
// baked into a shared/CDN response.
export const dynamic = "force-dynamic"

/**
 * First-party "what does the connection reveal" endpoint.
 *
 * Reads the visitor's IP + coarse geo straight off the request — on Vercel these
 * arrive as `x-vercel-ip-*` headers, so there's NO third-party geolocation call.
 * That's the on-brand privacy story: we read it off your connection, no middleman.
 */
export async function GET() {
  const h = await headers()

  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    null

  const rawCity = h.get("x-vercel-ip-city")
  const city = rawCity ? decodeURIComponent(rawCity) : null
  const country = h.get("x-vercel-ip-country") // ISO 3166-1 alpha-2
  const region = h.get("x-vercel-ip-country-region")
  const latitude = h.get("x-vercel-ip-latitude")
  const longitude = h.get("x-vercel-ip-longitude")
  const timezone = h.get("x-vercel-ip-timezone")

  return NextResponse.json(
    {
      ip,
      city,
      region,
      country,
      latitude: latitude ? Number(latitude) : null,
      longitude: longitude ? Number(longitude) : null,
      timezone,
      // Vercel geo headers only exist on real deploys, not localhost dev.
      geoAvailable: Boolean(country),
    },
    { headers: { "cache-control": "no-store, max-age=0" } },
  )
}
