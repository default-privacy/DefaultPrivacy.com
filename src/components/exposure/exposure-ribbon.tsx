"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type WhoAmI = {
  ip: string | null
  city: string | null
  region: string | null
  geoAvailable: boolean
}

/**
 * Thin site-wide ribbon at the very top, above the nav (Mullvad-style). Reads the
 * visitor's own IP + location off their connection and shows it back, unprompted —
 * a persistent "this site can already see you" reminder that links to /exposed.
 */
export function ExposureRibbon() {
  const [data, setData] = useState<WhoAmI | null>(null)

  useEffect(() => {
    let alive = true
    fetch("/api/whoami", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: WhoAmI) => alive && setData(d))
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const ip = data?.ip
  const loc = data?.city ? [data.city, data.region].filter(Boolean).join(", ") : null

  return (
    <div className="relative z-50 border-b border-caution/20 bg-caution/[0.06]">
      <div className="container flex items-center justify-center gap-x-4 py-1.5 text-[12px] sm:justify-between">
        <div className="flex items-center gap-2 font-mono">
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caution/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-caution" />
          </span>
          <span className="text-caution/90">
            {ip ? (
              <>
                This site can see you:{" "}
                <span className="text-foreground">{ip}</span>
                {loc ? <span className="text-muted-foreground"> · {loc}</span> : null}
              </>
            ) : (
              <span className="text-caution/70">reading your connection…</span>
            )}
          </span>
        </div>
        <Link
          href="/exposed"
          className="hidden shrink-0 font-mono text-caution/80 underline-offset-4 transition hover:text-foreground hover:underline sm:inline"
        >
          see what you’re leaking →
        </Link>
      </div>
    </div>
  )
}
