import { Button } from "@/components/ui/button"
import { LogoBlueprint } from "@/components/branding/logo-blueprint"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { ArrowRight, Compass, HeartHandshake, Lock, Shield, Wrench } from "lucide-react"
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
      icon: Compass,
      n: "01",
      h: "The Directory",
      p: `${toolsLabel} privacy tools, independently vetted — filter by what actually matters: open-source, jurisdiction, and encryption.`,
      note: "Listed on merit. No paid placements, ever.",
    },
    {
      icon: Wrench,
      n: "02",
      h: "Free Tools",
      p: "Check your own exposure — password strength, website trackers, breach history, email security, and WHOIS. No account, nothing stored.",
      note: "See where you stand before you change a thing.",
    },
    {
      icon: Shield,
      n: "03",
      h: "Guides & Glossary",
      p: "Practical, no-fluff privacy guides and a privacy glossary that explains the jargon in plain language.",
      note: "Learn the why, not just the what.",
    },
  ]

  const principles = [
    {
      icon: Lock,
      h: "Collect nothing we don't need",
      p: "No email capture on the free tools. Nothing you check is stored. If we can't justify keeping it, we don't.",
    },
    {
      icon: HeartHandshake,
      h: "The directory stays independent",
      p: "Tools are listed on merit — never paid placement, and no affiliate links.",
    },
    {
      icon: Shield,
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-[20%] top-[-10%] h-[min(80vw,600px)] w-[min(80vw,600px)] rounded-full bg-primary/15 opacity-60 blur-[100px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        <div className="container relative py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8 h-40 w-40">
              <LogoBlueprint />
            </div>
            <span className="mb-5 inline-flex rounded-full border border-primary/25 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/90">
              About Default Privacy
            </span>
            <h1 className="brand2-hero-animate text-4xl font-extralight tracking-tight text-foreground/92 sm:text-5xl">
              A privacy directory that{" "}
              <span className="font-light text-primary">money can&apos;t move.</span>
            </h1>
            <p className="brand2-hero-animate-delay-1 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground/58">
              Most &ldquo;best privacy tool&rdquo; lists are paid placements. Default Privacy is an
              independent, vetted directory of {toolsLabel} privacy tools — ranked on merit, never on who
              pays — plus free tools to check your own exposure and guides to take your privacy back.
            </p>
            <div className="brand2-hero-animate-delay-2 mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="brand2-btn-primary brand2-focus group">
                <Link href="/directory">
                  Browse the directory
                  <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-foreground/14 brand2-focus">
                <Link href="/tools">Free tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-primary/85">What you get</p>
          <h2 className="max-w-3xl text-balance text-3xl font-extralight tracking-tight text-foreground/88 md:text-4xl">
            The knowledge and tools to defend your own privacy.
          </h2>
          <div className="brand2-stagger mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((c) => {
              const Icon = c.icon
              return (
                <div key={c.n} className="group brand2-surface-interactive flex h-full flex-col p-8">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                      <Icon className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                    </div>
                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-foreground/30">{c.n}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-medium tracking-tight text-foreground/88">{c.h}</h3>
                  <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-foreground/56">{c.p}</p>
                  <p className="mt-4 text-[13px] text-foreground/45">{c.note}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="relative border-t border-foreground/10 bg-foreground/[0.02]">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-primary/85">Principles</p>
            <h2 className="mb-8 text-3xl font-extralight tracking-tight text-foreground/88 md:text-4xl">
              How we operate
            </h2>
            <div className="space-y-5">
              {principles.map((pr) => {
                const Icon = pr.icon
                return (
                  <div
                    key={pr.h}
                    className="group flex items-start gap-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                      <Icon className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                    </div>
                    <div>
                      <p className="text-base font-medium tracking-tight text-foreground/88">{pr.h}</p>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/56">{pr.p}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative container py-16 md:py-24">
        <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-gradient-to-br from-card to-background p-10 text-center md:p-14">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-[50%] top-[30%] h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-primary/12 blur-[100px]" />
          </div>
          <div className="relative z-10">
            <h2 className="mb-4 text-3xl font-extralight tracking-tight text-foreground/90 md:text-4xl">
              Find the tools that keep you private.
            </h2>
            <p className="mx-auto mb-8 max-w-xl leading-relaxed text-foreground/56">
              {toolsLabel} vetted privacy tools, no paid placements — start browsing, or run a free check on
              your own exposure.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="brand2-btn-primary brand2-focus group">
                <Link href="/directory">
                  Browse the directory
                  <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-foreground/14 brand2-focus">
                <Link href="/tools">Free tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
