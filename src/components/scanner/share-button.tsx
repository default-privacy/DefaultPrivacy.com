"use client"

import { Check, Share2 } from "lucide-react"
import { useState } from "react"

/**
 * Share affordance for a real scan result. Uses the native share sheet where available,
 * falls back to copying the URL. The PARENT only renders this for non-simulated results,
 * so a fabricated (mock) grade about a named site can never be broadcast.
 */
export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : ""
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // user dismissed or unsupported — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked — nothing we can do silently
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="brand2-focus inline-flex items-center gap-2 rounded-lg border border-foreground/12 px-3 py-1.5 font-mono text-[12px] text-foreground/60 transition-colors hover:border-primary/50 hover:text-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied ? "Copied link" : "Share readout"}
    </button>
  )
}
