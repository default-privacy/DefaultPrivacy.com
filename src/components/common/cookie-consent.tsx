"use client"

import Link from "next/link"
import { Cookie, Shield, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "cookie-consent"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (consent) return

    const timer = setTimeout(() => setShowBanner(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const dnt =
    showBanner &&
    typeof navigator !== "undefined" &&
    navigator.doNotTrack === "1"

  function persistChoice(value: "accepted" | "rejected") {
    localStorage.setItem(STORAGE_KEY, value)
    localStorage.setItem(`${STORAGE_KEY}-date`, new Date().toISOString())
  }

  function closeBanner() {
    setIsClosing(true)
    setTimeout(() => setShowBanner(false), 300)
  }

  function handleAccept() {
    persistChoice("accepted")
    closeBanner()
  }

  function handleReject() {
    persistChoice("rejected")
    closeBanner()
  }

  if (!showBanner) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[60] p-4 transition-transform duration-300 md:bottom-4 md:left-4 md:right-auto md:max-w-md",
        isClosing ? "translate-y-full" : "translate-y-0",
      )}
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div className="relative rounded-lg border border-foreground/12 bg-background p-5 shadow-2xl brand2-surface">
        <button
          type="button"
          onClick={closeBanner}
          className="absolute top-2 right-2 rounded-md p-1 text-foreground/50 brand2-focus hover:bg-foreground/[0.06] hover:text-foreground"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-4 pr-6">
          <div className="flex items-start gap-3">
            <div className="rounded-full border border-success/25 bg-success/10 p-2">
              <Shield className="h-5 w-5 text-success" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium tracking-tight text-foreground">
                We respect your privacy
              </h3>
              {dnt && (
                <p className="mt-1 text-[12px] text-success">
                  Do Not Track detected — we honor it.
                </p>
              )}
            </div>
          </div>

          <p className="text-[13px] leading-relaxed text-foreground/60">
            We only use essential cookies for sign-in and security. No ad trackers,
            no cross-site profiling.
          </p>

          <div className="flex items-start gap-2 text-[12px] text-foreground/55">
            <Cookie className="mt-0.5 h-4 w-4 shrink-0 text-foreground/45" aria-hidden />
            <span>
              <span className="font-medium text-foreground/70">Essential only:</span>{" "}
              session cookie when you sign in. Browse without an account — no login cookie.
            </span>
          </div>

          <p className="text-[11px] text-foreground/45">
            Details in our{" "}
            <Link href="/privacy" className="underline brand2-focus hover:text-foreground/70">
              Privacy Policy
            </Link>
            .
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 brand2-focus"
              onClick={handleReject}
            >
              Dismiss
            </Button>
            <Button
              type="button"
              size="sm"
              className="flex-1 brand2-btn-primary brand2-focus"
              onClick={handleAccept}
            >
              Got it
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
