import { ConnectAiCard } from "@/components/ai/connect-ai-card"
import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { PageViewTracker } from "@/components/common/page-view-tracker"
import { PartnerRevenueDisclosure } from "@/components/common/partner-revenue-disclosure"
import {
  DirectoryBrowser,
  type DirectorySearchParams,
} from "@/components/directory/directory-browser"
import { DirectoryToolSearch } from "@/components/tools/directory-tool-search"
import { getCanonicalSiteUrl, getOgImageUrl } from "@/lib/site-url"
import { getPublicDirectoryStats } from "@/lib/directory-stats"
import { getAllGuides } from "@/lib/guides"
import { getAllStacks } from "@/lib/stacks"
import { HeroConnectPanel } from "@/components/home/agents-section"
import { Suspense } from "react"

// The homepage IS the directory (filters + pagination via searchParams)
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Default Privacy — Vetted Privacy Tools Directory & Free Tools",
  description:
    "An independent, vetted directory of privacy tools — plus free tools to check your exposure and guides to take back your privacy. No paid placements, nothing tracked.",
  keywords: [
    "privacy tools",
    "privacy tools directory",
    "vetted privacy tools",
    "open source privacy",
    "VPN",
    "encrypted email",
    "password manager",
    "free privacy tools",
    "digital privacy",
  ],
  openGraph: {
    title: "Default Privacy — Vetted Privacy Tools Directory",
    description:
      "An independent, vetted directory of privacy tools, plus free tools and guides. No paid placements.",
    url: getCanonicalSiteUrl(),
    type: "website",
    siteName: "Default Privacy",
    images: [
      {
        url: getOgImageUrl(),
        width: 1200,
        height: 630,
        alt: "Default Privacy — Vetted Privacy Tools Directory",
      },
    ],
  },
  alternates: {
    canonical: getCanonicalSiteUrl(),
  },
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<DirectorySearchParams>
}) {
  const [params, directoryStats, guides, stacks] = await Promise.all([
    searchParams,
    getPublicDirectoryStats(),
    getAllGuides(),
    getAllStacks(),
  ])
  const stats = [
    [directoryStats.toolsLabel, "tools"],
    [String(guides.length), "guides"],
    [String(stacks.length), "stacks"],
  ] as const

  return (
    <div className="brand2-grain flex min-h-screen flex-col bg-background">
      <Header />
      <PageViewTracker event={{ name: "directory_view", surface: "home" }} />

      {/* ═══════════════════════════════════════════════════════════════════════
          SEARCH-FIRST HERO — the search is the entry point into the directory
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-foreground/8">
        {/* Blueprint grid + radial glow (from the approved mockup) */}
        <div className="hero-blueprint pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-1/2 top-[-16%] h-[min(52vw,380px)] w-[min(100vw,900px)] -translate-x-1/2 rounded-full bg-primary/14 opacity-60 blur-[120px]" />
        </div>

        <div className="container relative grid gap-10 py-14 md:py-[4.5rem] xl:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] xl:items-center xl:gap-14">
          <div className="max-w-3xl">
            <h1 className="brand2-hero-animate text-balance text-4xl font-light leading-[1.06] tracking-cinematic text-foreground/90 md:text-[4.25rem]">
              No Freedom Without <span className="hero-shout">Privacy.</span>
            </h1>

            <p className="brand2-hero-animate-delay-1 mt-6 max-w-[60ch] text-lg leading-relaxed text-foreground/65 md:text-[19px]">
              <span className="font-medium text-foreground/90">Written for people, served to AI agents.</span> A vetted
              directory of {directoryStats.toolsLabel} privacy tools, {guides.length} guides and {stacks.length} stacks,
              every fact sourced and dated. No account, no paid placements.
            </p>

            {/* The search is the primary action; the agent door sits beside it */}
            <div className="brand2-hero-animate-delay-2 mt-7 flex flex-wrap items-stretch gap-2.5">
              <div className="min-w-0 flex-1 max-w-xl">
                <Suspense>
                  <DirectoryToolSearch
                    size="prominent"
                    placeholder={`Search ${directoryStats.toolsLabel} vetted privacy tools…`}
                  />
                </Suspense>
              </div>
            </div>

            <p className="brand2-hero-animate-delay-3 mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[14px] text-foreground/60">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/40">Start here</span>
              <Link href="#directory" className="rounded-sm brand2-focus hover:text-primary">→ Browse all {directoryStats.toolsLabel} tools</Link>
              <Link href="/start" className="rounded-sm brand2-focus hover:text-primary">→ Start with a situation</Link>
              <Link href="/guides" className="rounded-sm brand2-focus hover:text-primary">→ Field Guide and stacks</Link>
              <Link href="/tools" className="rounded-sm brand2-focus hover:text-primary">→ Free tools: what a site or domain leaks</Link>
            </p>

            <p className="brand2-hero-animate-delay-3 mt-7 flex flex-wrap font-mono text-[13px] text-foreground/45">
              {stats.map(([n, label], i) => (
                <span key={label} className={i > 0 ? "border-l border-foreground/15 px-4" : "pr-4"}>
                  <span className="text-primary/90">{n}</span> {label}
                </span>
              ))}
              <span className="border-l border-foreground/15 px-4">no account</span>
              <span className="border-l border-foreground/15 px-4">no paid placements</span>
            </p>
          </div>
          <HeroConnectPanel />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          THE DIRECTORY — the homepage body
      ═══════════════════════════════════════════════════════════════════════ */}
      <main id="directory" className="container flex-1 scroll-mt-24 pb-16 pt-10">
        <DirectoryBrowser searchParams={params} basePath="/" showSearch={false} />
        <ConnectAiCard size="slim" className="mt-10" />
        <PartnerRevenueDisclosure className="mt-10" />
      </main>

      <Footer />
    </div>
  )
}
