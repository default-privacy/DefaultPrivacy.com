"use client"

import { MapPin } from "lucide-react"

type Props = {
  latitude: number
  longitude: number
  city?: string | null
  region?: string | null
  country?: string | null
}

/**
 * The "check your pants" moment — a real interactive map (OpenStreetMap embed, no
 * API key, no dependency) zoomed to the visitor's coordinates with a pin dropped on
 * them, derived from IP alone.
 */
export function ExposureMap({ latitude, longitude, city, region, country }: Props) {
  const bbox = `${longitude - 0.05}%2C${latitude - 0.03}%2C${longitude + 0.05}%2C${latitude + 0.03}`
  const tileUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`
  const locationString = [city, region, country].filter(Boolean).join(", ")

  return (
    <div className="overflow-hidden rounded-xl border border-caution/25 bg-caution/[0.03]">
      <div className="relative h-[220px] overflow-hidden bg-foreground/5 md:h-[300px]">
        <iframe
          src={tileUrl}
          className="absolute inset-0 h-full w-full border-0"
          style={{ marginTop: "-30px" }} // nudge the OSM attribution bar out of view
          title="Your approximate location"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center gap-2">
            <div className="rounded-full border border-caution/30 bg-caution/20 p-2">
              <MapPin className="h-4 w-4 text-caution" />
            </div>
            <div>
              <p className="brand2-label-12-mono text-caution">YOUR_LOCATION_EXPOSED</p>
              <p className="font-medium text-foreground">
                {locationString || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-caution/20 bg-caution/[0.04] px-4 py-3">
        <p className="text-[13px] text-foreground/55">
          <span className="font-medium text-caution">Every website you visit</span> can see roughly
          where you are — from your IP alone. No permission required.
        </p>
      </div>
    </div>
  )
}
