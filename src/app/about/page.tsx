import { Button } from "@/components/ui/button"
import { LogoBlueprint } from "@/components/branding/logo-blueprint"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { getPublicDirectoryStats } from "@/lib/directory-stats"

export const metadata: Metadata = {
  title: "About Default Privacy | The Vetted Privacy Tools Directory",
  description:
    "Default Privacy is an independent, vetted directory of privacy tools — no paid placements — plus free tools to check your exposure and practical privacy guides.",
  alternates: {
    canonical: "https://defaultprivacy.com/about",
  },
  openGraph: {
    title: "About Default Privacy",
    description:
      "An independent, vetted privacy-tools directory. No paid placements. Plus free tools and guides.",
  },
}

// Same composition as /ai and the legal pages
const label =
  "flex items-center gap-4 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-foreground/50 after:h-px after:flex-1 after:bg-foreground/10"
const body = "text-[15px] leading-relaxed text-foreground/70"
const card = "rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4"
const link = "text-foreground/80 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm"

export default async function AboutPage() {
  const { toolsLabel } = await getPublicDirectoryStats()

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Default Privacy",
    description: `Default Privacy is an independent privacy-tools directory: ${toolsLabel} tools vetted with no paid placements, free tools to check your own exposure, a privacy glossary, and practical privacy guides.`,
    url: "https://defaultprivacy.com/about",
    mainEntity: { "@id": "https://defaultprivacy.com/#organization" },
  }

  const pillars = [
    {
      n: "01",
      h: "The Directory",
      p: `${toolsLabel} privacy tools, independently vetted — filter by what actually matters: open-source, jurisdiction, and encryption.`,
      note: "Listed on merit. No paid placements, ever.",
    },
    {
      n: "02",
      h: "Free Tools",
      p: "Check your own exposure — password strength, website trackers, breach history, email security, and WHOIS. No account, nothing tied to you.",
      note: "See where you stand before you change a thing.",
    },
    {
      n: "03",
      h: "Guides & Glossary",
      p: "Practical, no-fluff privacy guides and a privacy glossary that explains the jargon in plain language.",
      note: "Learn the why, not just the what.",
    },
  ]

  const principles = [
    {
      h: "Collect nothing we don't need",
      p: "No email capture on the free tools. Nothing you check is stored. If we can't justify keeping it, we don't.",
    },
    {
      h: "The directory stays independent",
      p: "Tools are listed on merit — never paid placement, and no affiliate links.",
    },
    {
      h: "Say what a tool can and can't do",
      p: "No tool makes you invisible. We'd rather be honest about limits than oversell a fix.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <main className="container flex-1 pb-28 pt-12">
        <article className="mx-auto max-w-[680px]">
          <div className="mb-10 aspect-[380.6/382.3] w-full">
            <LogoBlueprint />
          </div>
          <p className="mb-7 flex flex-wrap gap-y-1 border-b border-foreground/15 pb-3.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-foreground/50">
            <span className="font-semibold text-foreground">File DP · About</span>
            <span className="before:mx-2.5 before:content-['·']">{toolsLabel} tools</span>
            <span className="before:mx-2.5 before:content-['·']">No paid placements</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-[var(--tracking-cinematic)] text-foreground md:text-[42px] md:leading-[1.1]">
            A privacy directory that money can&apos;t move.
          </h1>
          <p className="mt-4 text-[19px] leading-relaxed text-foreground/70">
            Most &ldquo;best privacy tool&rdquo; lists are paid placements. Default Privacy is an
            independent, vetted directory of {toolsLabel} privacy tools — ranked on merit, never on who
            pays — plus free tools to check your own exposure and guides to take your privacy back.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="brand2-btn-primary brand2-focus group">
              <Link href="/directory">
                Browse the directory
                <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-foreground/14 brand2-focus">
              <Link href="/tools">Free tools</Link>
            </Button>
          </div>

          <section className="mt-16 space-y-4">
            <h2 className={label}>What you get</h2>
            <p className="text-[20px] font-semibold tracking-tight text-foreground">
              The knowledge and tools to defend your own privacy.
            </p>
            <div className="space-y-3">
              {pillars.map((c) => (
                <div key={c.n} className={card}>
                  <p className="mb-1.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-foreground/50">
                    <span className="font-semibold text-foreground">{c.n}</span>
                    <span className="before:mx-2 before:content-['·']">{c.h}</span>
                  </p>
                  <p className={body}>{c.p}</p>
                  <p className="mt-2 text-[13.5px] text-foreground/50">{c.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 space-y-4">
            <h2 className={label}>How we operate</h2>
            <div className="space-y-3">
              {principles.map((pr) => (
                <div key={pr.h} className={card}>
                  <p className="font-medium text-foreground">{pr.h}</p>
                  <p className={`mt-1 ${body}`}>{pr.p}</p>
                </div>
              ))}
            </div>
            <p id="contact" className={`scroll-mt-24 ${body}`}>
              Questions, corrections or a tool to suggest? Email{" "}
              <a
                href="mailto:privacy@defaultprivacy.com"
                className="brand2-focus rounded-sm text-foreground underline underline-offset-2 hover:text-foreground"
              >
                privacy@defaultprivacy.com
              </a>
              .
            </p>
          </section>

          <div className="mt-14 border-t border-foreground/10 pt-5 text-[14px] text-foreground/50">
            <p className="font-medium text-foreground/80">Find the tools that keep you private.</p>
            <p className="mt-1">
              {toolsLabel} vetted privacy tools, no paid placements —{" "}
              <Link href="/directory" className={link}>start browsing</Link>, or{" "}
              <Link href="/tools" className={link}>run a free check</Link> on your own exposure.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
