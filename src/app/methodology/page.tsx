import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import { getPublicDirectoryStats } from "@/lib/directory-stats"
import {
  ArrowRight,
  Building2,
  Eye,
  MessageSquarePlus,
  Scale,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

const LAST_REVIEWED = "2026-07-11"

export const metadata: Metadata = {
  title: "Methodology — How We Vet & Rank Privacy Tools | Default Privacy",
  description:
    "How Default Privacy chooses what to list, what our trust attributes mean, how the free tools work, and how we stay independent — ranked on merit, never on who pays.",
  alternates: {
    canonical: "https://defaultprivacy.com/methodology",
  },
  openGraph: {
    title: "How Default Privacy Vets & Ranks Privacy Tools",
    description:
      "Our standards for inclusion, our trust attributes, how the free tools work, and how we stay independent.",
  },
}

export default async function MethodologyPage() {
  const { toolsLabel } = await getPublicDirectoryStats()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://defaultprivacy.com/methodology#webpage",
    name: "Methodology — How Default Privacy Vets & Ranks Privacy Tools",
    description:
      "Default Privacy's standards for listing, ranking, and correcting privacy-tool entries, our trust attributes, and how our free diagnostics work.",
    url: "https://defaultprivacy.com/methodology",
    lastReviewed: LAST_REVIEWED,
    isPartOf: { "@id": "https://defaultprivacy.com/#website" },
    publisher: { "@id": "https://defaultprivacy.com/#organization" },
  }

  // Honest, verifiable statements only — each maps to something the site actually does.
  const standards = [
    {
      icon: Scale,
      h: "Listed on merit, never paid placement",
      p: "No one can buy a listing, a ranking, or a badge, and there are no affiliate links: no vendor pays us when you choose their tool.",
    },
    {
      icon: Search,
      h: "Checked against the tool's own record",
      p: "Each entry is built from the tool's public materials — its site, source repository, and documentation. Attributes are set from that evidence, not from marketing claims.",
    },
    {
      icon: ShieldCheck,
      h: "Attributes you can filter on",
      p: "We surface the facts that change a privacy decision: open-source, end-to-end encryption, logging, platform, and jurisdiction. We only show what we have checked against a source: each fact links to its source and the date we checked it, and a fact we have not checked is left blank, not marked no.",
    },
    {
      icon: Eye,
      h: "Honest about limits",
      p: "No tool makes you invisible. We describe what a tool does and where it stops, and we flag tools that are deprecated or no longer maintained rather than quietly leaving them up.",
    },
  ]

  const freeTools = [
    {
      name: "Password Strength Analyzer",
      how: "Runs entirely in your browser via Dropbox's zxcvbn. Your password is never sent to a server; breach lookups use a k-anonymity hash prefix, never the full password.",
    },
    {
      name: "Privacy Scanner",
      how: "Loads a public URL server-side and reports the trackers, cookies, third-party requests, and security headers it observes — a snapshot of that page at scan time, not a verdict on the company.",
    },
    {
      name: "Breach Check",
      how: "Queries the Have I Been Pwned database for a personal email and returns the known breaches it appears in, with recovery steps.",
    },
    {
      name: "Email Security Checker",
      how: "Reads a domain's public SPF, DKIM, and DMARC DNS records and grades how well they block spoofing. It inspects published records only — it never touches mail content.",
    },
    {
      name: "WHOIS Privacy Checker",
      how: "Reads a domain's public WHOIS record and reports whether registrant details are exposed or privacy-protected.",
    },
    {
      name: "DNS Leak Test",
      how: "Observes which DNS resolvers actually answered your device's lookups, so you can see whether queries are escaping your VPN.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Methodology", url: "https://defaultprivacy.com/methodology" },
        ]}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-[15%] top-[-20%] h-[min(60vw,440px)] w-[min(60vw,440px)] rounded-full bg-primary/12 opacity-55 blur-[90px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>
          <div className="container relative py-20 md:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <span className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/90">
                Methodology
              </span>
              <h1 className="text-4xl font-extralight tracking-tight text-foreground/92 sm:text-5xl">
                How we vet, rank, and{" "}
                <span className="font-light text-primary">stay honest.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground/58">
                Default Privacy lists {toolsLabel} privacy tools. This is how a tool earns a place,
                what our labels mean, how the free checks work — and why money can&apos;t move any of it.
              </p>
            </div>
          </div>
        </section>

        {/* Standards */}
        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-primary/85">
              How a tool earns a listing
            </p>
            <h2 className="max-w-3xl text-balance text-3xl font-extralight tracking-tight text-foreground/88 md:text-4xl">
              Evidence in, not marketing.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {standards.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.h} className="group brand2-surface-interactive flex h-full flex-col p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                      <Icon className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                    </div>
                    <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground/88">{s.h}</h3>
                    <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-foreground/56">{s.p}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Free tools */}
        <section className="relative border-t border-foreground/10 bg-foreground/[0.02]">
          <div className="container py-16 md:py-24">
            <div className="mx-auto max-w-4xl">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-primary/85">
                How the free tools work
              </p>
              <h2 className="mb-4 text-3xl font-extralight tracking-tight text-foreground/88 md:text-4xl">
                What each check reads — and what it never touches.
              </h2>
              <p className="mb-10 max-w-2xl text-sm leading-relaxed text-foreground/56">
                Every free tool runs on public signals or in your own browser. No account, and nothing
                you enter is stored.
              </p>
              <dl className="grid gap-3">
                {freeTools.map((t) => (
                  <div
                    key={t.name}
                    className="rounded-xl border border-foreground/10 bg-background p-5"
                  >
                    <dt className="flex items-center gap-2 text-base font-medium tracking-tight text-foreground/88">
                      <Wrench className="h-4 w-4 text-primary/80" aria-hidden />
                      {t.name}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-foreground/56">{t.how}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Corrections + authorship */}
        <section className="container py-16 md:py-24">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="brand2-surface-interactive flex h-full flex-col p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                <MessageSquarePlus className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground/88">Found something wrong?</h3>
              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-foreground/56">
                Every tool page has a <span className="text-foreground/75">Suggest Edit</span> and{" "}
                <span className="text-foreground/75">Report Issue</span> link. Attributes change when the
                evidence does — a maintainer drops open-source, a project is abandoned.
                Tell us and we&apos;ll correct it. Our starting-point recommendations are explained on{" "}
                <Link href="/how-we-pick" className="text-foreground/75 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                  How we pick
                </Link>
                .
              </p>
              <Button variant="outline" size="sm" asChild className="mt-5 self-start border-foreground/14 brand2-focus">
                <Link href="/directory">
                  Browse the directory
                  <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="brand2-surface-interactive flex h-full flex-col p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                <Building2 className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground/88">Who&apos;s behind this</h3>
              <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-foreground/56">
                Default Privacy is an independent privacy-tools directory — not owned by, or beholden to,
                any tool it lists. We make no money from placements. Default Privacy is not a law firm and
                does not provide legal advice.
              </p>
              <p className="mt-4 font-mono text-[11px] text-foreground/40">
                Last reviewed {LAST_REVIEWED}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
