"use client"

import { useEffect, useState } from "react"

// Generic PHASES of a scan — never a fabricated finding. No numbers, no company
// names, no grade appear here; the sweep bar is indeterminate. This reads as
// "working", never "we found X", and the last stage is never marked done (Suspense
// unmounts us the moment the real result is ready).
const STAGES = [
  { key: "load", label: "Loading the page" },
  { key: "network", label: "Catching third-party requests" },
  { key: "cookies", label: "Reading cookies" },
  { key: "headers", label: "Checking security headers" },
  { key: "grade", label: "Grading" },
]

export function ScanProgress({ domain }: { domain: string }) {
  const [current, setCurrent] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const rm = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (rm) {
      setReduced(true)
      return
    }
    const timers: ReturnType<typeof setTimeout>[] = []
    for (let i = 1; i < STAGES.length; i++) {
      timers.push(setTimeout(() => setCurrent(i), i * 900))
    }
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="overflow-hidden rounded-xl border border-foreground/12 bg-card"
      style={{ boxShadow: "0 20px 60px oklch(0 0 0 / 0.35)" }}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 border-b border-foreground/10 bg-foreground/[0.02] px-3 py-2.5 sm:px-4 sm:py-3">
        <span className="h-3 w-3 rounded-full bg-destructive/70" />
        <span className="h-3 w-3 rounded-full bg-caution/70" />
        <span className="h-3 w-3 rounded-full bg-success/70" />
        <span className="ml-2 truncate font-mono text-[12.5px] text-muted-foreground">scan://{domain}</span>
        <span className="ml-auto font-mono text-[11px] tracking-[0.14em] text-muted-foreground">RUNNING</span>
      </div>

      <div className="space-y-6 p-4 font-mono sm:p-8">
        <div className="break-all text-[12px] text-muted-foreground sm:text-[13px]">
          <span className="text-primary">$</span> privacy scan <span className="text-foreground">{domain}</span> --with-dnt --gpc
          <span className="ml-1 inline-block h-[15px] w-2 translate-y-[2px] animate-pulse bg-primary align-middle" />
        </div>

        <div className="h-1 overflow-hidden rounded-full bg-foreground/8">
          <div className="scan-progress-sweep h-full w-1/3 rounded-full bg-primary/70" />
        </div>

        <span className="sr-only">Scanning {domain}. This can take a few seconds.</span>

        {reduced ? (
          <div className="flex items-center gap-2.5 text-[12.5px]">
            <span className="w-4 shrink-0 text-center text-primary">›</span>
            <span className="text-foreground-soft">
              Scanning {domain} — loading the page, checking requests, cookies, headers, then grading.
            </span>
          </div>
        ) : (
          <ol className="space-y-2.5">
            {STAGES.map((stage, i) => {
              const state = i < current ? "done" : i === current ? "active" : "pending"
              if (state === "pending") return null
              return (
                <li key={stage.key} className="flex items-center gap-2.5 text-[12.5px]">
                  <span className="w-4 shrink-0 text-center">
                    {state === "done" ? <span className="text-success/70">✓</span> : <span className="text-primary">›</span>}
                  </span>
                  <span className={state === "done" ? "text-muted-foreground" : "text-foreground-soft"}>{stage.label}</span>
                  {state === "active" && (
                    <span className="geist-loading-dots ml-1 text-primary" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        )}
      </div>
    </div>
  )
}
