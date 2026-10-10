import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { getPublicDirectoryStats } from "@/lib/directory-stats"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  FileText,
  Scale,
  Shield,
  UserCheck,
  XCircle,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Terms of Service | Default Privacy",
  description:
    "Terms and conditions for using Default Privacy. Clear, fair, and user-friendly — no hidden clauses.",
  alternates: {
    canonical: "https://defaultprivacy.com/terms",
  },
}

export default async function TermsOfServicePage() {
  const { toolsLabel } = await getPublicDirectoryStats()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-[15%] top-[-20%] h-[min(60vw,400px)] w-[min(60vw,400px)] rounded-full bg-primary/10 opacity-50 blur-[80px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>

          <div className="container relative py-12 md:py-16">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-10 md:px-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_oklch,var(--brand-blueprint)_6%,transparent),transparent_55%)]" aria-hidden />
              <div className="relative z-10">
                <span className="mb-4 inline-flex items-center rounded-full border border-primary/25 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/90">
                  Legal Document
                </span>
                <h1 className="mb-4 text-3xl font-extralight tracking-tight text-foreground/92 md:text-4xl">
                  Terms of Service
                </h1>
                <p className="mb-2 text-lg leading-relaxed text-foreground/58">
                  Clear, fair terms with no hidden clauses. We believe legal documents should be readable.
                </p>
                <p className="text-sm text-foreground/45">Last updated: July 8, 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR */}
        <section className="container pb-12">
          <div className="group mx-auto max-w-3xl rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:bg-foreground/[0.03]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                <FileText className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
              </div>
              <div>
                <h2 className="mb-3 text-lg font-medium tracking-tight text-foreground/88">TL;DR — The Short Version</h2>
                <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/56">
                  <li>• Everything here is <strong className="text-foreground/78">free, with no accounts</strong></li>
                  <li>• Use the tools and directory <strong className="text-foreground/78">responsibly and legally</strong></li>
                  <li>• The directory links to <strong className="text-foreground/78">third-party tools we don&apos;t operate</strong> — verify before you rely on them</li>
                  <li>• We provide everything <strong className="text-foreground/78">&quot;as is&quot;</strong> and it&apos;s <strong className="text-foreground/78">not professional advice</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="container pb-16">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* 1 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Scale className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">1. Acceptance of Terms</h2>
              </div>
              <p className="text-foreground/58">
                By accessing or using Default Privacy (&quot;the Service&quot;), you agree to these Terms of Service.
                If you don&apos;t agree, please don&apos;t use the Service. These terms apply to everyone who uses the
                directory and free tools.
              </p>
            </div>

            {/* 2 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <FileText className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">2. What We Provide</h2>
              </div>
              <p className="mb-4 text-foreground/58">Default Privacy is a free, independent privacy resource:</p>
              <ul className="space-y-1 text-foreground/58">
                <li>• <strong className="text-foreground/75">Privacy Tools Directory</strong> — a vetted directory of {toolsLabel} privacy tools, ranked on merit, no paid placements</li>
                <li>• <strong className="text-foreground/75">Password Strength Analyzer</strong> — client-side password strength + breach check</li>
                <li>• <strong className="text-foreground/75">Website Privacy Scanner</strong> — trackers, cookies, and fingerprinting on any URL</li>
                <li>• <strong className="text-foreground/75">Account Breach Check</strong> — guided check against Have I Been Pwned</li>
                <li>• <strong className="text-foreground/75">Email Security Checker</strong> — SPF, DKIM, and DMARC for a domain</li>
                <li>• <strong className="text-foreground/75">WHOIS Privacy Check</strong> — what a domain&apos;s public record exposes</li>
                <li>• <strong className="text-foreground/75">Guides &amp; Glossary</strong> — practical privacy guides and a privacy-term glossary</li>
              </ul>
            </div>

            {/* 3 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <UserCheck className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">3. Acceptable Use</h2>
              </div>
              <div className="mb-4 rounded-xl border border-success/20 bg-success/10 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-medium text-success">
                  <CheckCircle className="h-4 w-4" aria-hidden /> You MAY:
                </h4>
                <ul className="space-y-1 text-sm text-foreground/58">
                  <li>• Use the free tools for personal privacy assessment</li>
                  <li>• Share results from the tools (they&apos;re yours)</li>
                  <li>• Access the Service via VPN, Tor, or other privacy tools</li>
                </ul>
              </div>
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-medium text-destructive">
                  <XCircle className="h-4 w-4" aria-hidden /> You MAY NOT:
                </h4>
                <ul className="space-y-1 text-sm text-foreground/58">
                  <li>• Use the Service for illegal activities</li>
                  <li>• Abuse the free tools (excessive automated requests)</li>
                  <li>• Attempt to hack, breach, or disrupt the Service</li>
                  <li>• Scrape or resell the directory without authorization</li>
                </ul>
              </div>
            </div>

            {/* 4 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Shield className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">4. Free Tools &amp; the Directory</h2>
              </div>
              <ul className="space-y-1 text-foreground/58">
                <li>• The tools are provided &quot;as is,&quot; may have usage limits, and may change or be discontinued at any time</li>
                <li>• Results are for informational purposes and are not professional advice</li>
                <li>• The directory lists <strong className="text-foreground/75">third-party tools we don&apos;t operate</strong> — we don&apos;t warrant their availability, security, or claims; verify before you rely on them</li>
                <li>• Outbound links carry no affiliate or referral codes, and no vendor pays us when you choose their tool</li>
              </ul>
            </div>

            {/* 5 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Shield className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">5. Privacy &amp; Data</h2>
              </div>
              <p className="text-foreground/58">
                Our data practices are governed by our{" "}
                <Link href="/privacy" className="brand2-focus text-foreground/80 underline underline-offset-2 hover:text-foreground">
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms. In short: no accounts, no tracking, minimal collection.
              </p>
            </div>

            {/* 6 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-caution/25 bg-caution/8">
                  <AlertTriangle className="h-5 w-5 text-caution" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">6. Disclaimers &amp; Limitations</h2>
              </div>
              <div className="mb-4 rounded-xl border border-caution/20 bg-caution/10 p-4">
                <ul className="space-y-1 text-sm text-foreground/58">
                  <li>• The Service is provided &quot;AS IS&quot; without warranties of any kind</li>
                  <li>• We&apos;re not responsible for third-party tools listed in the directory or their actions</li>
                  <li>• Tool results are algorithmic and may be incomplete or inaccurate</li>
                </ul>
              </div>
              <p className="text-foreground/58">
                We are not a law firm, accounting firm, or licensed privacy consultant. The tools and guides are
                educational. For legal, tax, or compliance advice, consult an appropriate professional.
              </p>
            </div>

            {/* 7 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Scale className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">7. Changes, Governing Law &amp; Contact</h2>
              </div>
              <p className="mb-3 text-foreground/58">
                We may modify these Terms from time to time; the &quot;Last updated&quot; date reflects the latest
                revision, and continued use constitutes acceptance. These Terms are governed by the laws of the State
                of Wyoming, USA, without regard to conflict-of-law principles.
              </p>
              <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
                <p className="text-sm text-foreground/58">
                  <strong className="text-foreground/75">Email:</strong>{" "}
                  <a
                    href="mailto:legal@defaultprivacy.com"
                    className="brand2-focus text-foreground/80 underline underline-offset-2 hover:text-foreground"
                  >
                    legal@defaultprivacy.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="container pb-16">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-success/20 bg-gradient-to-br from-success/8 to-transparent p-8 text-center shadow-[0_4px_24px_oklch(0_0_0/0.10)]">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute left-[50%] top-[30%] h-[180px] w-[280px] -translate-x-1/2 rounded-full bg-success/10 blur-[70px]" />
            </div>
            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-success/20 bg-success/10">
                <CheckCircle className="h-6 w-6 text-success" aria-hidden />
              </div>
              <p className="mb-2 font-medium tracking-tight text-foreground/88">Fair Terms, No Tricks</p>
              <p className="mb-5 text-sm text-foreground/55">
                Designed to be clear and fair. No hidden clauses, no predatory practices.
              </p>
              <Link
                href="/privacy"
                className="group inline-flex items-center gap-1 text-sm text-foreground/70 brand2-focus hover:text-foreground"
              >
                Read our Privacy Policy
                <ArrowRight className="h-3.5 w-3.5 brand2-arrow-nudge" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
