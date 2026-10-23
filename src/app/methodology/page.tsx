import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { PageNav } from "@/components/common/page-nav"
import { getPublicDirectoryStats } from "@/lib/directory-stats"
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

const SECTIONS = [
  { id: "listing", label: "Earning a listing" },
  { id: "free-tools", label: "How the free tools work" },
  { id: "corrections", label: "Corrections" },
  { id: "who", label: "Who's behind this" },
]

// Same composition as /ai and the legal pages
const label =
  "flex items-center gap-4 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-foreground/50 after:h-px after:flex-1 after:bg-foreground/10"
const body = "text-[15px] leading-relaxed text-foreground/70"
const card = "rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4"
const link = "text-foreground/80 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm"

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
      h: "Listed on merit, never paid placement",
      p: "No one can buy a listing, a ranking, or a badge, and there are no affiliate links: no vendor pays us when you choose their tool.",
    },
    {
      h: "Checked against the tool's own record",
      p: "Each entry is built from the tool's public materials — its site, source repository, and documentation. Attributes are set from that evidence, not from marketing claims.",
    },
    {
      h: "Attributes you can filter on",
      p: "We surface the facts that change a privacy decision: open-source, end-to-end encryption, logging, platform, and jurisdiction. We only show what we have checked against a source: each fact links to its source and the date we checked it, and a fact we have not checked is left blank, not marked no.",
    },
    {
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

      <main className="container flex-1 pb-28 pt-12">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,680px)] lg:justify-center lg:gap-16">
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <PageNav items={SECTIONS} back={{ href: "/", label: "Home" }} />
          </aside>
          <article className="min-w-0">
            <p className="mb-7 flex flex-wrap gap-y-1 border-b border-foreground/15 pb-3.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-foreground/50">
              <span className="font-semibold text-foreground">File DP · Methodology</span>
              <span className="before:mx-2.5 before:content-['·']">Last reviewed {LAST_REVIEWED}</span>
            </p>
            <h1 className="text-4xl font-semibold tracking-[var(--tracking-cinematic)] text-foreground md:text-[42px] md:leading-[1.1]">
              How we vet, rank, and stay honest.
            </h1>
            <p className="mt-4 text-[19px] leading-relaxed text-foreground/70">
              Default Privacy lists {toolsLabel} privacy tools. This is how a tool earns a place,
              what our labels mean, how the free checks work — and why money can&apos;t move any of it.
            </p>

            <section id="listing" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>How a tool earns a listing</h2>
              <p className="text-[20px] font-semibold tracking-tight text-foreground">Evidence in, not marketing.</p>
              <div className="space-y-3">
                {standards.map((st) => (
                  <div key={st.h} className={card}>
                    <p className="font-medium text-foreground">{st.h}</p>
                    <p className={`mt-1 ${body}`}>{st.p}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="free-tools" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>How the free tools work</h2>
              <p className="text-[20px] font-semibold tracking-tight text-foreground">
                What each check reads — and what it never touches.
              </p>
              <p className={body}>
                Every free tool runs on public signals or in your own browser. No account, and nothing
                you enter is stored.
              </p>
              <dl className="space-y-3">
                {freeTools.map((t) => (
                  <div key={t.name} className={card}>
                    <dt className="font-medium text-foreground">{t.name}</dt>
                    <dd className={`mt-1 ${body}`}>{t.how}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section id="corrections" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>Found something wrong?</h2>
              <p className={body}>
                Every tool page has a <span className="text-foreground">Suggest Edit</span> and{" "}
                <span className="text-foreground">Report Issue</span> link. Attributes change when the
                evidence does — a maintainer drops open-source, a project is abandoned.
                Tell us and we&apos;ll correct it. Our starting-point recommendations are explained on{" "}
                <Link href="/how-we-pick" className={link}>
                  How we pick
                </Link>
                .
              </p>
            </section>

            <section id="who" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>Who&apos;s behind this</h2>
              <p className={body}>
                Default Privacy is an independent privacy-tools directory — not owned by, or beholden to,
                any tool it lists. We make no money from placements. Default Privacy is not a law firm and
                does not provide legal advice.
              </p>
            </section>

            <p className="mt-14 border-t border-foreground/10 pt-5 text-[14px] text-foreground/50">
              <Link href="/directory" className={link}>Browse the directory</Link>
            </p>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
