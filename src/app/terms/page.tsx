import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { PageNav } from "@/components/common/page-nav"
import { getPublicDirectoryStats } from "@/lib/directory-stats"
import { Check, X } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Terms of Service | Default Privacy",
  description:
    "Terms and conditions for using Default Privacy. Clear, fair, and user-friendly — no hidden clauses.",
  alternates: {
    canonical: "https://defaultprivacy.com/terms",
  },
}

const SECTIONS = [
  { id: "short-version", label: "The short version" },
  { id: "acceptance", label: "Acceptance" },
  { id: "what-we-provide", label: "What we provide" },
  { id: "acceptable-use", label: "Acceptable use" },
  { id: "tools-directory", label: "Tools and directory" },
  { id: "privacy-data", label: "Privacy and data" },
  { id: "disclaimers", label: "Disclaimers" },
  { id: "changes-law-contact", label: "Changes, law, contact" },
]

// Same composition as /ai: mono eyebrow headings, 680px column, quiet cards
const label =
  "flex items-center gap-4 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-foreground/50 after:h-px after:flex-1 after:bg-foreground/10"
const body = "text-[15px] leading-relaxed text-foreground/70"
const list = "list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/70 marker:text-foreground/30"
const card = "rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4"
const em = "font-medium text-foreground/90"

export default async function TermsOfServicePage() {
  const { toolsLabel } = await getPublicDirectoryStats()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 pb-28 pt-12">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,680px)] lg:justify-center lg:gap-16">
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <PageNav items={SECTIONS} back={{ href: "/", label: "Home" }} />
          </aside>
          <article className="min-w-0">
            <p className="mb-7 flex flex-wrap gap-y-1 border-b border-foreground/15 pb-3.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-foreground/50">
              <span className="font-semibold text-foreground">File DP · Legal</span>
              <span className="before:mx-2.5 before:content-['·']">Last updated July 8, 2026</span>
            </p>
            <h1 className="text-4xl font-semibold tracking-[var(--tracking-cinematic)] text-foreground md:text-[42px] md:leading-[1.1]">
              Terms of Service
            </h1>
            <p className="mt-4 text-[19px] leading-relaxed text-foreground/70">
              Clear, fair terms with no hidden clauses. We believe legal documents should be readable.
            </p>

            <section
              id="short-version"
              className="relative mt-12 scroll-mt-24 rounded-lg border border-foreground/25 bg-foreground/[0.03] px-6 pb-5 pt-6"
            >
              <span className="absolute -top-3 left-5 bg-foreground px-2.5 py-1.5 font-mono text-[11.5px] font-bold uppercase leading-none tracking-[0.14em] text-background">
                Read first
              </span>
              <h2 className="mb-3 text-[20px] font-semibold tracking-tight text-foreground">TL;DR — The Short Version</h2>
              <ul className={list}>
                <li>Everything here is <strong className={em}>free, with no accounts</strong></li>
                <li>Use the tools and directory <strong className={em}>responsibly and legally</strong></li>
                <li>The directory links to <strong className={em}>third-party tools we don&apos;t operate</strong> — verify before you rely on them</li>
                <li>We provide everything <strong className={em}>&quot;as is&quot;</strong> and it&apos;s <strong className={em}>not professional advice</strong></li>
              </ul>
            </section>

            <section id="acceptance" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>1. Acceptance of Terms</h2>
              <p className={body}>
                By accessing or using Default Privacy (&quot;the Service&quot;), you agree to these Terms of Service.
                If you don&apos;t agree, please don&apos;t use the Service. These terms apply to everyone who uses the
                directory and free tools.
              </p>
            </section>

            <section id="what-we-provide" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>2. What We Provide</h2>
              <p className={body}>Default Privacy is a free, independent privacy resource:</p>
              <ul className={list}>
                <li><strong className={em}>Privacy Tools Directory</strong> — a vetted directory of {toolsLabel} privacy tools, ranked on merit, no paid placements</li>
                <li><strong className={em}>Password Strength Analyzer</strong> — client-side password strength + breach check</li>
                <li><strong className={em}>Website Privacy Scanner</strong> — trackers, cookies, and fingerprinting on any URL</li>
                <li><strong className={em}>Account Breach Check</strong> — guided check against Have I Been Pwned</li>
                <li><strong className={em}>Email Security Checker</strong> — SPF, DKIM, and DMARC for a domain</li>
                <li><strong className={em}>WHOIS Privacy Check</strong> — what a domain&apos;s public record exposes</li>
                <li><strong className={em}>Guides &amp; Glossary</strong> — practical privacy guides and a privacy-term glossary</li>
              </ul>
            </section>

            <section id="acceptable-use" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>3. Acceptable Use</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <div className={card}>
                  <h3 className="mb-2 flex items-center gap-2 font-medium text-foreground">
                    <Check className="h-4 w-4" aria-hidden /> You MAY:
                  </h3>
                  <ul className={list}>
                    <li>Use the free tools for personal privacy assessment</li>
                    <li>Share results from the tools (they&apos;re yours)</li>
                    <li>Access the Service via VPN, Tor, or other privacy tools</li>
                  </ul>
                </div>
                <div className={card}>
                  <h3 className="mb-2 flex items-center gap-2 font-medium text-foreground">
                    <X className="h-4 w-4" aria-hidden /> You MAY NOT:
                  </h3>
                  <ul className={list}>
                    <li>Use the Service for illegal activities</li>
                    <li>Abuse the free tools (excessive automated requests)</li>
                    <li>Attempt to hack, breach, or disrupt the Service</li>
                    <li>Scrape or resell the directory without authorization</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="tools-directory" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>4. Free Tools &amp; the Directory</h2>
              <ul className={list}>
                <li>The tools are provided &quot;as is,&quot; may have usage limits, and may change or be discontinued at any time</li>
                <li>Results are for informational purposes and are not professional advice</li>
                <li>The directory lists <strong className={em}>third-party tools we don&apos;t operate</strong> — we don&apos;t warrant their availability, security, or claims; verify before you rely on them</li>
                <li>Outbound links carry no affiliate or referral codes, and no vendor pays us when you choose their tool</li>
              </ul>
            </section>

            <section id="privacy-data" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>5. Privacy &amp; Data</h2>
              <p className={body}>
                Our data practices are governed by our{" "}
                <Link href="/privacy" className="brand2-focus rounded-sm text-foreground underline underline-offset-2 hover:text-foreground">
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms. In short: no accounts, no tracking, minimal collection.
              </p>
            </section>

            <section id="disclaimers" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>6. Disclaimers &amp; Limitations</h2>
              {/* the reading pages' callout: bordered box, circled ! */}
              <div className="relative rounded-[10px] border-[1.5px] border-foreground/25 bg-foreground/[0.03] py-4 pl-[66px] pr-5">
                <span
                  aria-hidden
                  className="absolute left-[18px] top-[18px] grid h-8 w-8 place-items-center rounded-full bg-foreground text-[19px] font-extrabold leading-none text-background"
                >
                  !
                </span>
                <ul className={list}>
                  <li>The Service is provided &quot;AS IS&quot; without warranties of any kind</li>
                  <li>We&apos;re not responsible for third-party tools listed in the directory or their actions</li>
                  <li>Tool results are algorithmic and may be incomplete or inaccurate</li>
                </ul>
              </div>
              <p className={body}>
                We are not a law firm, accounting firm, or licensed privacy consultant. The tools and guides are
                educational. For legal, tax, or compliance advice, consult an appropriate professional.
              </p>
            </section>

            <section id="changes-law-contact" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>7. Changes, Governing Law &amp; Contact</h2>
              <p className={body}>
                We may modify these Terms from time to time; the &quot;Last updated&quot; date reflects the latest
                revision, and continued use constitutes acceptance. These Terms are governed by the laws of the State
                of Wyoming, USA, without regard to conflict-of-law principles.
              </p>
              <p className={body}>
                <strong className={em}>Email:</strong>{" "}
                <a
                  href="mailto:legal@defaultprivacy.com"
                  className="brand2-focus rounded-sm text-foreground underline underline-offset-2 hover:text-foreground"
                >
                  legal@defaultprivacy.com
                </a>
              </p>
            </section>

            <div className="mt-14 border-t border-foreground/10 pt-5 text-[14px] text-foreground/50">
              <p className="font-medium text-foreground/80">Fair Terms, No Tricks</p>
              <p className="mt-1">
                Designed to be clear and fair. No hidden clauses, no predatory practices.{" "}
                <Link href="/privacy" className="text-foreground/80 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                  Read our Privacy Policy
                </Link>
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
