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
import { Fragment, Suspense } from "react"

// The homepage IS the directory (filters + pagination via searchParams)
export const dynamic = "force-dynamic"

// Popular category quick-filters for the hero. Values are category display names,
// normalized by the directory's category filter (see queries.ts).
const HERO_CATEGORIES = [
  "Crypto Wallets",
  "Browser Extensions",
  "Disposable ID",
  "Digital Notes",
  "Mobile Apps",
] as const

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
  const [params, directoryStats] = await Promise.all([
    searchParams,
    getPublicDirectoryStats(),
  ])

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

        <div className="container relative py-14 md:py-[4.75rem]">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="brand2-hero-animate text-balance text-4xl font-light leading-[1.06] tracking-cinematic text-foreground md:text-[3.25rem]">
              No Freedom Without <span className="hero-shout">Privacy.</span>
            </h1>

            {/* The search — the primary way into the directory */}
            <div className="brand2-hero-animate-delay-1 mx-auto mt-8 max-w-xl">
              <Suspense>
                <DirectoryToolSearch
                  size="prominent"
                  placeholder={`Search ${directoryStats.toolsLabel} vetted privacy tools…`}
                />
              </Suspense>
            </div>

            {/* Category quick-filters — light text links, not bulky pills */}
            <div className="brand2-hero-animate-delay-3 mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13px]">
              {HERO_CATEGORIES.map((c, i) => (
                <Fragment key={c}>
                  {i > 0 && <span className="text-muted-foreground" aria-hidden>·</span>}
                  <Link
                    href={{ pathname: "/directory", query: { category: c } }}
                    className="rounded-sm text-foreground-soft transition-colors brand2-focus hover:text-primary"
                  >
                    {c}
                  </Link>
                </Fragment>
              ))}
              <span className="text-muted-foreground" aria-hidden>·</span>
              <Link
                href="#directory"
                className="rounded-sm text-muted-foreground transition-colors brand2-focus hover:text-foreground"
              >
                Browse all ↓
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          THE DIRECTORY — the homepage body
      ═══════════════════════════════════════════════════════════════════════ */}
      <main id="directory" className="container flex-1 scroll-mt-24 pb-16 pt-8">
        <DirectoryBrowser searchParams={params} basePath="/" showSearch={false} />
        <ConnectAiCard size="slim" className="mt-10" />
        <PartnerRevenueDisclosure variant="directory-note" className="mt-10" />
      </main>

      <Footer />
    </div>
  )
}
