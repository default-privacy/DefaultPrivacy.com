"use client"

import { useState, useTransition, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SearchIcon, MailIcon, ShieldIcon, EyeIcon, GaugeIcon, ExternalLinkIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { checkEmailSecurity, type EmailSecurityResult } from "@/lib/actions/email-security"
import { checkWhoisPrivacy, type WhoisResult } from "@/lib/actions/whois-check"
import { scanWebsite, type ScanResponse } from "@/actions/scanner"

type ScoreState = {
  domain: string
  email: EmailSecurityResult
  whois: WhoisResult
  scan: ScanResponse
}

type Band = "Low" | "Moderate" | "High"

// Pillar sub-scores (0 = fully exposed, 100 = fully protected)
const GRADE_TO_SCORE: Record<EmailSecurityResult["grade"], number> = {
  A: 100,
  B: 80,
  C: 60,
  D: 40,
  F: 15,
}

const WHOIS_TO_SCORE: Record<WhoisResult["privacyScore"], number> = {
  good: 100,
  partial: 55,
  exposed: 15,
}

// Weights — trackers + spoofability dominate; whois is registrant-doxxing risk.
// Trivially tunable: they only need to be positive; the roll re-normalizes.
const WEIGHTS = { email: 35, scan: 40, whois: 25 }

// Exposure band colors (band is exposure-oriented — Low exposure = well protected).
const bandStyle: Record<Band, string> = {
  Low: "text-success border-success/50 bg-success/10",
  Moderate: "text-caution border-caution/50 bg-caution/10",
  High: "text-destructive border-destructive/50 bg-destructive/10",
}

const bandLabel: Record<Band, string> = {
  Low: "Low exposure",
  Moderate: "Moderate exposure",
  High: "High exposure",
}

/** Normalize any user input to a bare hostname, matching ScannerForm's logic. */
function normalizeDomain(input: string): string {
  const trimmed = input.trim()
  try {
    const parsed = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`)
    return parsed.hostname.replace(/^www\./, "")
  } catch {
    return trimmed.replace(/^https?:\/\//i, "").replace(/^www\./, "").split("/")[0]
  }
}

type Pillar = { w: number; v: number }

function pillars(s: ScoreState): { email: Pillar | null; scan: Pillar | null; whois: Pillar | null } {
  return {
    email: s.email.success ? { w: WEIGHTS.email, v: GRADE_TO_SCORE[s.email.grade] } : null,
    // Mock-mode scans return invented tracker counts (simulated:true). Never let fabricated
    // data into the headline score — drop the pillar so composite() re-normalizes to email+whois.
    scan:
      s.scan.success && s.scan.score && !s.scan.simulated
        ? { w: WEIGHTS.scan, v: s.scan.score.overallScore }
        : null,
    whois: s.whois.success ? { w: WEIGHTS.whois, v: WHOIS_TO_SCORE[s.whois.privacyScore] } : null,
  }
}

/** Weighted privacy score (0–100, higher = more private). Failed pillars drop and re-normalize. */
function composite(s: ScoreState): number | null {
  const active = Object.values(pillars(s)).filter((p): p is Pillar => p !== null)
  if (active.length === 0) return null
  const weightSum = active.reduce((sum, p) => sum + p.w, 0)
  return Math.round(active.reduce((sum, p) => sum + p.v * p.w, 0) / weightSum)
}

// Bands invert the privacy score into an exposure reading.
function toBand(score: number): Band {
  if (score >= 75) return "Low"
  if (score >= 45) return "Moderate"
  return "High"
}

function PillarRow({
  icon: Icon,
  title,
  status,
  detail,
  href,
  tone = "muted",
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  status: string
  detail: string
  href?: string
  tone?: "muted" | "good" | "caution" | "bad"
}) {
  const toneColor =
    tone === "good"
      ? "text-success"
      : tone === "caution"
        ? "text-caution"
        : tone === "bad"
          ? "text-destructive"
          : "text-muted-foreground"

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">{title}</span>
        </div>
        <span className={`text-xs font-medium uppercase ${toneColor}`}>{status}</span>
      </div>
      <p className="text-sm text-muted-foreground">{detail}</p>
      {href && (
        <a
          href={href}
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          View full report
          <ExternalLinkIcon className="h-3 w-3" />
        </a>
      )}
    </div>
  )
}

export function PrivacyScoreReport() {
  const searchParams = useSearchParams()
  const [domain, setDomain] = useState("")
  const [state, setState] = useState<ScoreState | null>(null)
  const [isPending, startTransition] = useTransition()

  function runAll(input: string) {
    const host = normalizeDomain(input)
    if (!host) return
    startTransition(async () => {
      // Distinct rate-limit buckets (scan / email-security / whois), so these run in parallel
      // safely; each self-wraps its own errors and never throws for tool-level failures.
      const [email, whois, scan] = await Promise.all([
        checkEmailSecurity(host),
        checkWhoisPrivacy(host),
        scanWebsite(host),
      ])
      setState({ domain: host, email, whois, scan })
    })
  }

  useEffect(() => {
    const prefill = searchParams.get("domain")
    if (prefill && !domain) {
      setDomain(prefill)
      runAll(prefill)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain.trim()) return
    runAll(domain)
  }

  const score = state ? composite(state) : null
  const band = score !== null ? toBand(score) : null
  const allFailed = state !== null && score === null

  return (
    <div className="space-y-6">
      <form onSubmit={handleCheck} className="flex gap-2">
        <Input
          type="text"
          aria-label="Domain to score"
          placeholder="Enter a domain (e.g., example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="text-base h-12"
        />
        <Button type="submit" aria-label="Calculate privacy score" disabled={isPending || !domain.trim()} className="h-12 px-6">
          {isPending ? <Spinner /> : <SearchIcon className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </form>

      <p className="sr-only" role="status" aria-live="polite">
        {isPending
          ? "Calculating privacy score…"
          : state && score !== null && band
            ? `Privacy score ${score} out of 100 — ${bandLabel[band]} — for ${state.domain}.`
            : ""}
      </p>

      {allFailed && (
        <div role="alert" className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
          We couldn&apos;t complete any of the three checks for that domain. Double-check the domain and
          try again in a moment.
        </div>
      )}

      {state && score !== null && band && (
        <>
          {/* Composite exposure band */}
          <div className={`rounded-lg border-2 p-5 flex items-center gap-4 ${bandStyle[band]}`}>
            <div className="flex items-center justify-center h-16 w-16 rounded-lg border-2 border-current bg-background/40 shrink-0">
              <GaugeIcon className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-medium tracking-cinematic">{score}</span>
                <span className="text-sm opacity-70">/ 100 privacy</span>
              </div>
              <p className="font-medium">{bandLabel[band]}</p>
              <p className="text-sm opacity-80 mt-0.5">{state.domain}</p>
            </div>
          </div>

          <Separator />

          {/* Per-tool breakdown */}
          <PillarRow
            icon={MailIcon}
            title="Email spoofing"
            status={state.email.success ? `Grade ${state.email.grade}` : "unavailable"}
            detail={
              state.email.success
                ? state.email.dmarc.details ||
                  "SPF, DKIM, and DMARC assessed for spoofing protection."
                : "We couldn't read this domain's email-authentication records this time — pillar skipped, score not penalized."
            }
            href={state.email.success ? `/email-security?domain=${encodeURIComponent(state.domain)}` : undefined}
            tone={
              !state.email.success
                ? "muted"
                : state.email.grade === "A" || state.email.grade === "B"
                  ? "good"
                  : state.email.grade === "C"
                    ? "caution"
                    : "bad"
            }
          />

          <PillarRow
            icon={EyeIcon}
            title="Site trackers"
            status={
              state.scan.success && state.scan.simulated
                ? "Not counted"
                : state.scan.success && state.scan.score
                  ? `Grade ${state.scan.score.grade}`
                  : "unavailable"
            }
            detail={
              state.scan.success && state.scan.simulated
                ? "Live scanner is offline right now, so this check is illustrative only — it is not counted in your score."
                : state.scan.success && state.scan.result
                  ? `${state.scan.result.trackers.length} tracker${
                      state.scan.result.trackers.length === 1 ? "" : "s"
                    } detected loading on this site${state.scan.cached ? " (cached result)" : ""}.`
                  : "We couldn't scan this site right now (the scanner may be busy) — pillar skipped, score not penalized."
            }
            href={
              state.scan.success && !state.scan.simulated
                ? `/scanner/results?domain=${encodeURIComponent(state.domain)}`
                : undefined
            }
            tone={
              !state.scan.success || state.scan.simulated || !state.scan.score
                ? "muted"
                : state.scan.score.grade === "A" || state.scan.score.grade === "B"
                  ? "good"
                  : state.scan.score.grade === "C"
                    ? "caution"
                    : "bad"
            }
          />

          <PillarRow
            icon={ShieldIcon}
            title="WHOIS privacy"
            status={
              state.whois.success
                ? state.whois.privacyScore === "good"
                  ? "Protected"
                  : state.whois.privacyScore === "partial"
                    ? "Partial"
                    : "Exposed"
                : "unavailable"
            }
            detail={
              state.whois.success
                ? (() => {
                    const leaked = state.whois.fields.filter((f) => f.sensitive).length
                    if (state.whois.privacyScore === "good")
                      return "Registrant details are hidden from public WHOIS records."
                    return `${leaked} registrant field${leaked === 1 ? "" : "s"} publicly visible in WHOIS.`
                  })()
                : "We couldn't read this domain's WHOIS/RDAP record this time — pillar skipped, score not penalized."
            }
            href={state.whois.success ? `/whois?domain=${encodeURIComponent(state.domain)}` : undefined}
            tone={
              !state.whois.success
                ? "muted"
                : state.whois.privacyScore === "good"
                  ? "good"
                  : state.whois.privacyScore === "partial"
                    ? "caution"
                    : "bad"
            }
          />

        </>
      )}
    </div>
  )
}
