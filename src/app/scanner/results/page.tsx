import { scanWebsite } from "@/actions/scanner"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { ScanProgress } from "@/components/scanner/scan-progress"
import { ScannerForm } from "@/components/scanner/scanner-form"
import { ShareButton } from "@/components/scanner/share-button"
import { Button } from "@/components/ui/button"
import { getGradeMetadata, type PrivacyGrade } from "@/lib/scanner"
import { getToolSlugs } from "@/lib/db/queries"
import { categoryRecommendations, getTrackerMappings } from "@/lib/scanner/tracker-alternatives"
import { buildVerdict } from "@/lib/scanner/verdict"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export const metadata = {
  title: "Scan Results | Privacy Scanner | Default Privacy",
  description: "View the privacy scan results for this website.",
  // Thin, per-scan, query-reflected view (can render simulated results) — keep it out of the index.
  robots: { index: false, follow: true },
}

// Grade → semantic token (kept consistent with the score-breakdown colors).
const GRADE_VAR: Record<PrivacyGrade, string> = {
  A: "var(--success)",
  B: "var(--technical)",
  C: "var(--caution)",
  D: "var(--attention)",
  F: "var(--destructive)",
}
const GRADE_TEXT: Record<PrivacyGrade, string> = {
  A: "text-success",
  B: "text-technical",
  C: "text-caution",
  D: "text-attention",
  F: "text-destructive",
}

const CATEGORY_TAG: Record<string, { label: string; cls: string }> = {
  analytics: { label: "ANALYTICS", cls: "bg-caution/15 text-caution" },
  advertising: { label: "ADVERTISING", cls: "bg-destructive/15 text-destructive" },
  social: { label: "SOCIAL", cls: "bg-foreground/10 text-foreground-soft" },
  fingerprinting: { label: "FINGERPRINT", cls: "bg-technical/20 text-technical" },
  unknown: { label: "OTHER", cls: "bg-foreground/10 text-muted-foreground" },
}

const titleCase = (slug: string) => slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())

async function ScanResults({ domain }: { domain: string }) {
  const response = await scanWebsite(domain)

  if (!response.success || !response.result || !response.score) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <h2 className="text-[15px] font-medium">Scan failed</h2>
        </div>
        <p className="mt-2 text-[13px] text-muted-foreground">
          {response.error || "We couldn't scan this website. It may be blocking our scanner or experiencing issues."}
        </p>
        <Button className="brand2-btn-primary mt-4" asChild>
          <Link href="/scanner">Try another site</Link>
        </Button>
      </div>
    )
  }

  const { result, score } = response
  const gradeVar = GRADE_VAR[score.grade]
  const gradeText = GRADE_TEXT[score.grade]
  const pct = Math.max(0, Math.min(100, Math.round(score.overallScore)))
  const gradeInfo = getGradeMetadata(score.grade)
  const trackerCount = result.trackers.length
  const verdict = buildVerdict({ result, score })

  // Verdict meta line — only surface the negatives that are actually true.
  const metaBits: string[] = []
  if (!result.hasHSTS) metaBits.push("no HSTS")
  if (!result.hasCSP) metaBits.push("no CSP")
  if (result.hasFingerprinting) metaBits.push("fingerprinting active")
  metaBits.push(`scanned ${new Date(response.scannedAt).toLocaleDateString()}`)

  // Alternatives: direct swaps + category-level guidance so ad/social/fingerprint
  // trackers show a recommendation instead of the whole block silently vanishing.
  // A slug that leaves the directory must degrade to guidance, not render a 404 link
  // (no-DB dev keeps the unfiltered map: an empty slug set means "can't check", not
  // "nothing exists"). scripts/check-tracker-alternatives.ts is the build-time guard.
  const publishedSlugs = new Set((await getToolSlugs()).map(r => r.slug))
  const rawMappings = getTrackerMappings(result.trackers.map(t => t.url))
  const mappings =
    publishedSlugs.size === 0
      ? rawMappings
      : rawMappings.map(m => ({ ...m, alternativeSlugs: m.alternativeSlugs.filter(s => publishedSlugs.has(s)) }))
  const withAlternatives = mappings.filter(m => m.alternativeSlugs.length > 0)
  const guidanceCategories = [...new Set(mappings.filter(m => m.alternativeSlugs.length === 0).map(m => m.category))]
  const hasFix = withAlternatives.length > 0 || guidanceCategories.length > 0

  const stats = [
    { label: "TRACKERS", value: String(trackerCount), tone: trackerCount > 0 ? "text-destructive" : "text-success" },
    { label: "3RD PARTIES", value: String(result.thirdPartyRequests.length), tone: "text-caution" },
    { label: "COOKIES", value: String(result.cookies.length), tone: "text-caution" },
    { label: "FINGERPRINT", value: result.hasFingerprinting ? "ON" : "off", tone: result.hasFingerprinting ? "text-destructive" : "text-muted-foreground" },
  ]

  const breakdown: { label: string; score: number }[] = [
    { label: "Trackers", score: score.breakdown.trackerScore },
    { label: "Cookies", score: score.breakdown.cookieScore },
    { label: "Security headers", score: score.breakdown.securityScore },
    { label: "Third-party requests", score: score.breakdown.thirdPartyScore },
    { label: "Fingerprinting", score: score.breakdown.fingerprintScore },
  ]

  const checklist: { ok: boolean; label: string }[] = [
    { ok: result.hasHTTPS, label: "Uses HTTPS" },
    { ok: result.hasHSTS, label: "HSTS header" },
    { ok: result.hasCSP, label: "Content Security Policy" },
    { ok: !result.hasGoogleAnalytics, label: "No Google Analytics" },
    { ok: !result.hasFacebookPixel, label: "No Meta Pixel" },
    { ok: !result.hasThirdPartyCookies, label: "No third-party cookies" },
    { ok: !result.hasFingerprinting, label: "No fingerprinting" },
    { ok: result.hasPrivacyPolicy, label: "Has privacy policy" },
  ]

  return (
    <div className="brand2-hero-animate space-y-5">
      {response.simulated && (
        <div className="flex items-start gap-3 rounded-xl border border-caution/30 bg-caution/10 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-caution" />
          <div>
            <h2 className="text-[14px] font-medium text-caution">Simulated result — not a real scan</h2>
            <p className="mt-1 text-[13px] text-foreground-soft">
              Our live measurement server is offline, so these numbers are illustrative — not a real
              measurement of {domain}. Sharing is disabled until a live scan runs.
            </p>
          </div>
        </div>
      )}

      {/* ── Terminal / readout shell ─────────────────────────────────────── */}
      <div
        className="overflow-hidden rounded-xl border border-foreground/12 bg-card"
        style={{ boxShadow: "0 20px 60px oklch(0 0 0 / 0.35)" }}
      >
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-foreground/10 bg-foreground/[0.02] px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="h-3 w-3 rounded-full bg-destructive/70" />
          <span className="h-3 w-3 rounded-full bg-caution/70" />
          <span className="h-3 w-3 rounded-full bg-success/70" />
          <span className="ml-2 truncate font-mono text-[12.5px] text-muted-foreground">scan://{domain}</span>
          <div className="ml-auto flex items-center gap-2">
            {!response.simulated && <ShareButton title={`Privacy scan of ${domain} — grade ${score.grade}`} />}
            <a
              href={`https://${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-[12px] text-muted-foreground hover:text-foreground-soft sm:inline"
            >
              visit ↗
            </a>
          </div>
        </div>

        <div className="space-y-6 p-4 font-mono sm:space-y-8 sm:p-8">
          {/* command line */}
          <div className="break-all text-[12px] text-muted-foreground sm:text-[13px]">
            <span className="text-primary">$</span> privacy scan{" "}
            <span className="text-foreground">{domain}</span> --with-dnt --gpc
            <span className="ml-1 inline-block h-[15px] w-2 translate-y-[2px] animate-pulse bg-primary align-middle" />
          </div>

          {/* gauge + verdict */}
          <div className="grid items-center gap-5 sm:grid-cols-[180px_1fr] sm:gap-7">
            <div className="relative mx-auto h-[140px] w-[140px] shrink-0 sm:mx-0 sm:h-[168px] sm:w-[168px]">
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: `conic-gradient(${gradeVar} 0 ${pct}%, var(--border) ${pct}% 100%)`,
                  WebkitMask: "radial-gradient(farthest-side, transparent 70%, #000 71%)",
                  mask: "radial-gradient(farthest-side, transparent 70%, #000 71%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className={`text-[52px] font-medium leading-none sm:text-[60px] ${gradeText}`}
                  style={{ textShadow: `0 0 30px color-mix(in oklab, ${gradeVar} 45%, transparent)` }}
                >
                  {score.grade}
                </span>
                <span className="mt-1 text-[12px] tabular-nums text-muted-foreground">{pct} / 100</span>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <div className="text-[11px] tracking-[0.18em] text-muted-foreground">[ VERDICT ]</div>
              <h1 className="mt-2 font-sans text-[clamp(1.5rem,6vw,2rem)] font-light leading-[1.1] tracking-tight text-foreground">
                {verdict.pre}
                <span className={`font-medium ${gradeText}`}>{verdict.emphasis}</span>
                {verdict.post}
              </h1>
              <p className="mt-3 text-[12.5px] text-muted-foreground">
                {gradeInfo.label} · {metaBits.join(" · ")}
              </p>
            </div>
          </div>

          {/* stat grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
            {stats.map(s => (
              <div key={s.label} className="rounded-lg border border-foreground/8 bg-foreground/[0.02] p-3 sm:p-4">
                <div className="text-[11px] tracking-wide text-muted-foreground">{s.label}</div>
                <div className={`mt-1.5 text-[26px] font-medium tabular-nums leading-none ${s.tone}`}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* detected ledger */}
          {trackerCount > 0 && (
            <div>
              <div className="mb-3 text-[12px] tracking-[0.14em]">
                <span className="text-primary">[ DETECTED ]</span>{" "}
                {/* the "//" is HUD dressing, not a code comment — braced so
                    react/jsx-no-comment-textnodes doesn't read it as one */}
                <span className="text-muted-foreground">{"// "}{trackerCount} {trackerCount === 1 ? "company" : "companies"} observed</span>
              </div>
              <div className="divide-y divide-foreground/8 overflow-hidden rounded-lg border border-foreground/10">
                {result.trackers.map((t, i) => {
                  const tag = CATEGORY_TAG[t.category] ?? CATEGORY_TAG.unknown
                  return (
                    <div key={i} className="flex items-center gap-2 px-3 py-3 odd:bg-foreground/[0.015] sm:gap-3 sm:px-4">
                      <span className="min-w-0 flex-1 truncate text-[12.5px] text-foreground">{t.name}</span>
                      <span className="hidden min-w-0 max-w-[42%] truncate text-right text-[12px] text-muted-foreground sm:block">
                        {t.domain}
                      </span>
                      <span className={`shrink-0 rounded px-2 py-1 text-[10px] font-medium tracking-wide ${tag.cls}`}>
                        {tag.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* recommended swaps */}
          {hasFix && (
            <div
              className="rounded-xl border border-primary/25 p-4 sm:p-5"
              style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--primary) 6%, transparent), transparent)" }}
            >
              <div className="mb-4 text-[12px] tracking-[0.14em] text-primary">
                [ RECOMMENDED ] <span className="text-muted-foreground">detected → private swap</span>
              </div>
              <div className="space-y-3">
                {withAlternatives.map(m => (
                  <div key={m.name} className="flex flex-col gap-2 border-b border-dashed border-foreground/10 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:gap-3">
                    <span className="text-[12.5px] text-muted-foreground sm:whitespace-nowrap">
                      detected <span className="text-foreground-soft line-through">{m.name}</span>
                    </span>
                    <span className="hidden text-primary sm:inline">→</span>
                    <div className="flex flex-1 flex-wrap gap-2 sm:justify-end">
                      {m.alternativeSlugs.map(slug => (
                        <Link
                          key={slug}
                          href={`/directory/${slug}`}
                          className="rounded-md border border-foreground/12 bg-foreground/[0.03] px-3 py-2 text-[12.5px] text-foreground transition-colors hover:border-primary/50 sm:py-1.5"
                        >
                          {titleCase(slug)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                {guidanceCategories.map(cat => (
                  <div key={cat} className="flex flex-col gap-2 border-b border-dashed border-foreground/10 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center">
                    <span className="text-[12.5px] text-muted-foreground sm:flex-1">
                      <span className="text-foreground-soft">{cat}</span> trackers detected
                    </span>
                    <span className="hidden text-muted-foreground sm:inline">·</span>
                    <span className="text-[12px] text-muted-foreground sm:max-w-[55%] sm:text-right">
                      {categoryRecommendations[cat]?.message}
                    </span>
                  </div>
                ))}
              </div>
              <Button className="brand2-btn-primary mt-5 font-sans" asChild>
                <Link href="/directory">Browse private alternatives →</Link>
              </Button>
            </div>
          )}

          {/* breakdown + checklist */}
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            <div>
              <div className="mb-3 text-[12px] tracking-[0.14em] text-muted-foreground">[ SCORE BREAKDOWN ]</div>
              <div className="space-y-3">
                {breakdown.map(b => (
                  <div key={b.label}>
                    <div className="mb-1 flex items-center justify-between text-[12px]">
                      <span className="text-foreground-soft">{b.label}</span>
                      <span className="tabular-nums text-muted-foreground">{b.score}/100</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-foreground/8">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(0, Math.min(100, b.score))}%`,
                          background: b.score >= 70 ? "var(--success)" : b.score >= 40 ? "var(--caution)" : "var(--destructive)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 text-[12px] tracking-[0.14em] text-muted-foreground">[ CHECKLIST ]</div>
              <div className="grid grid-cols-1 gap-x-4 gap-y-2">
                {checklist.map(c => (
                  <div key={c.label} className="flex items-center gap-2 text-[12.5px]">
                    <span className={c.ok ? "text-success" : "text-muted-foreground"}>{c.ok ? "✓" : "✕"}</span>
                    <span className={c.ok ? "text-muted-foreground" : "text-foreground-soft"}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* disclaimer */}
          <p className="border-t border-foreground/8 pt-5 font-sans text-[12px] leading-relaxed text-muted-foreground">
            Automated informational snapshot of what this site loaded when we visited it — not an audit of the
            company, and not legal or security advice. Trackers, headers, and behavior change over time. Verify
            independently before drawing conclusions.
          </p>
        </div>
      </div>

      {/* scan another */}
      <div className="rounded-xl border border-foreground/8 bg-foreground/[0.01] p-4 sm:p-5">
        <h3 className="mb-4 text-[14px] font-medium text-foreground">Scan another website</h3>
        <ScannerForm />
      </div>
    </div>
  )
}

type SearchParams = Record<string, string | string[] | undefined>

const getDomainFromParams = (params: SearchParams) => {
  const direct = params.domain
  if (typeof direct === "string" && direct.trim()) return direct
  if (Array.isArray(direct) && direct[0]?.trim()) return direct[0]

  const encodedKey = Object.keys(params).find(key => key.startsWith("domain="))
  if (encodedKey) return decodeURIComponent(encodedKey.slice("domain=".length))

  const looseKey = Object.keys(params).find(key => key.includes("domain="))
  if (looseKey) {
    const index = looseKey.indexOf("domain=")
    return decodeURIComponent(looseKey.slice(index + "domain=".length))
  }

  return null
}

export default async function ScannerResultsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const domain = getDomainFromParams(params)

  if (!domain) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="container py-8">
            <div className="rounded-xl border border-foreground/8 bg-foreground/[0.01] p-6">
              <h2 className="text-[15px] font-medium text-foreground">No domain specified</h2>
              <p className="mt-1 text-[13px] text-muted-foreground">Please enter a website URL to scan.</p>
              <Button className="brand2-btn-primary mt-4" asChild>
                <Link href="/scanner">Go to scanner</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-3xl py-8">
          <Link
            href="/scanner"
            className="group mb-6 inline-flex items-center text-[13px] text-muted-foreground transition-colors hover:text-foreground-soft"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to scanner
          </Link>

          <Suspense fallback={<ScanProgress domain={domain} />}>
            <ScanResults domain={domain} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  )
}
