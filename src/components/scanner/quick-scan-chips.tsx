"use client"

import { Spinner } from "@/components/ui/spinner"
import { ScanSearch } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

// Prefilled quick-scan chips that route through the SAME real form path, so a
// chip-triggered scan lands on the real results page with its simulated banner intact.
const DOMAINS = ["nytimes.com", "amazon.com"]

export function QuickScanChips() {
  const [isPending, startTransition] = useTransition()
  const [pending, setPending] = useState<string | null>(null)
  const router = useRouter()

  const scan = (domain: string) => {
    setPending(domain)
    startTransition(() => {
      router.push(`/scanner/results?domain=${encodeURIComponent(domain)}`)
    })
  }

  const focusInput = () => {
    const el = document.getElementById("scanner-url")
    el?.focus()
    el?.scrollIntoView({ block: "center", behavior: "smooth" })
  }

  return (
    <div className="mb-5">
      <div className="mb-3 font-mono text-[11px] tracking-[0.18em] text-primary">[ TRY A SCAN ]</div>
      <div className="flex flex-wrap items-center gap-2">
        {DOMAINS.map(domain => {
          const isThis = isPending && pending === domain
          return (
            <button
              key={domain}
              type="button"
              onClick={() => scan(domain)}
              disabled={isPending}
              className="group brand2-focus inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-foreground/[0.02] px-4 py-1.5 font-mono text-[12.5px] text-foreground/70 transition-colors hover:border-primary/50 hover:text-foreground disabled:opacity-50"
            >
              {isThis ? <Spinner className="h-3.5 w-3.5" /> : <ScanSearch className="h-3.5 w-3.5 brand2-icon-breathe" aria-hidden />}
              {isThis ? "scanning…" : domain}
            </button>
          )
        })}
        <button
          type="button"
          onClick={focusInput}
          disabled={isPending}
          className="brand2-focus inline-flex items-center gap-2 rounded-full border border-primary/30 bg-foreground/[0.02] px-4 py-1.5 font-mono text-[12.5px] text-foreground/80 transition-colors hover:border-primary/60 hover:text-foreground disabled:opacity-50"
        >
          scan your own site
        </button>
      </div>
    </div>
  )
}
