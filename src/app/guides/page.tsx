import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import { getAllGuides } from "@/lib/guides"
import {
  BookOpen,
  Clock,
  Signal,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Field Guide | Default Privacy",
  description:
    "Practical privacy how-tos — run your own VPN, get off data-broker lists, and keep a home address off people-search sites.",
  openGraph: {
    title: "Field Guide | Default Privacy",
    description:
      "Practical privacy how-tos — a VPN you run yourself, data-broker opt-outs, and keeping a home address off people-search sites.",
  },
  alternates: {
    canonical: "https://defaultprivacy.com/guides",
  },
}

const difficultyConfig = {
  beginner: { label: "Beginner", color: "text-success", bg: "bg-success/10 border-success/20" },
  intermediate: { label: "Intermediate", color: "text-caution", bg: "bg-caution/10 border-caution/20" },
  advanced: { label: "Advanced", color: "text-destructive", bg: "bg-destructive/10 border-destructive/20" },
} as const

export default async function GuidesPage() {
  const guides = await getAllGuides()

  const guidesJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Field Guide",
    description: "Practical privacy how-tos — run your own VPN, get off data-broker lists, and keep a home address off people-search sites.",
    url: "https://defaultprivacy.com/guides",
    isPartOf: { "@id": "https://defaultprivacy.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: guides.length,
      itemListElement: guides.map((guide, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://defaultprivacy.com/guides/${guide.slug}`,
        name: guide.title,
      })),
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesJsonLd) }}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-10 md:px-10">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground/90 mb-4">
              Field Guide
            </h1>
            <p className="text-lg text-foreground/58">
              Practical how-tos: run your own VPN, get your name off data-broker sites, and
              keep a home address off people-search listings.
            </p>
          </div>
        </section>

        {/* Guide Cards */}
        <section className="container pb-16">
          {guides.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => {
                const diff = difficultyConfig[guide.difficulty]
                return (
                  <Link
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="brand2-focus group block rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-mono text-foreground/45 border border-foreground/10 rounded-full px-2.5 py-1">
                        {guide.category}
                      </span>
                      <span className={`text-[10px] font-mono border rounded-full px-2.5 py-1 ${diff.bg} ${diff.color}`}>
                        {diff.label}
                      </span>
                    </div>

                    <h2 className="text-base font-medium text-foreground/85 group-hover:text-foreground transition-colors mb-2">
                      {guide.title}
                    </h2>

                    <p className="text-sm text-foreground/55 mb-4 flex-1">
                      {guide.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-foreground/45 pt-3 border-t border-foreground/10">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {guide.timeToComplete}
                        </span>
                        <span className="flex items-center gap-1">
                          <Signal className="h-3 w-3" aria-hidden="true" />
                          {diff.label}
                        </span>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 brand2-arrow-nudge" aria-hidden="true" />
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="geist-empty text-center py-16">
              <div className="geist-empty-icon">
                <BookOpen className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="geist-empty-title">Guides coming soon</p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="container pb-16">
          <div className="mx-auto max-w-3xl rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 text-center">
            <BookOpen className="h-7 w-7 text-foreground/65 mx-auto mb-3" aria-hidden="true" />
            <p className="font-medium text-foreground/85 mb-2">Put the guides into practice</p>
            <p className="text-sm text-foreground/55 mb-4 max-w-lg mx-auto">
              Browse the vetted directory to find the right tools, or run a free check on your own exposure.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild className="brand2-btn-primary brand2-focus group">
                <Link href="/directory">
                  Browse the directory
                  <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="brand2-focus">
                <Link href="/tools">Free tools</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
