import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import { getAllStacks } from "@/lib/stacks"
import {
  Layers,
  Clock,
  Signal,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Stacks | Default Privacy",
  description:
    "Curated, threat-model-based tool bundles — the exact set of privacy tools for a specific situation, from a beginner starter kit to a journalist or activist stack, with setup order and tradeoffs.",
  openGraph: {
    title: "Privacy Stacks | Default Privacy",
    description:
      "Curated, threat-model-based privacy tool bundles — the right set of tools for a specific situation, with setup order and tradeoffs.",
  },
  alternates: {
    canonical: "https://defaultprivacy.com/stacks",
  },
}

const difficultyConfig = {
  beginner: { label: "Beginner", color: "text-success", bg: "bg-success/10 border-success/20" },
  intermediate: { label: "Intermediate", color: "text-caution", bg: "bg-caution/10 border-caution/20" },
  advanced: { label: "Advanced", color: "text-destructive", bg: "bg-destructive/10 border-destructive/20" },
} as const

export default async function StacksPage() {
  const stacks = await getAllStacks()

  const stacksJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Privacy Stacks",
    description: "Curated, threat-model-based privacy tool bundles — the right set of tools for a specific situation, with setup order and tradeoffs.",
    url: "https://defaultprivacy.com/stacks",
    isPartOf: { "@id": "https://defaultprivacy.com/#website" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: stacks.length,
      itemListElement: stacks.map((stack, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://defaultprivacy.com/stacks/${stack.slug}`,
        name: stack.title,
      })),
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stacksJsonLd) }}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-3xl rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-10 md:px-10">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground mb-4">
              Privacy Stacks
            </h1>
            <p className="text-lg text-muted-foreground">
              Curated tool bundles for a specific threat model — the exact set of privacy tools for
              your situation, in setup order, with the tradeoffs spelled out. Start with a stack instead
              of a blank directory.
            </p>
          </div>
        </section>

        {/* Stack Cards */}
        <section className="container pb-16">
          {stacks.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stacks.map((stack) => {
                const diff = difficultyConfig[stack.difficulty]
                return (
                  <Link
                    key={stack.slug}
                    href={`/stacks/${stack.slug}`}
                    className="brand2-focus group block rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-mono text-muted-foreground border border-foreground/10 rounded-full px-2.5 py-1">
                        {stack.category}
                      </span>
                      <span className={`text-[10px] font-mono border rounded-full px-2.5 py-1 ${diff.bg} ${diff.color}`}>
                        {diff.label}
                      </span>
                    </div>

                    <h2 className="text-base font-medium text-foreground group-hover:text-foreground transition-colors mb-2">
                      {stack.title}
                    </h2>

                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {stack.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-foreground/10">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          {stack.timeToComplete}
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
                <Layers className="h-8 w-8" aria-hidden="true" />
              </div>
              <p className="geist-empty-title">Stacks coming soon</p>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="container pb-16">
          <div className="mx-auto max-w-3xl rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 text-center">
            <Layers className="h-7 w-7 text-foreground-soft mx-auto mb-3" aria-hidden="true" />
            <p className="font-medium text-foreground mb-2">Want to go tool by tool?</p>
            <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
              Browse the full vetted directory to compare every option, or read the guides for step-by-step walkthroughs.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild className="brand2-btn-primary brand2-focus group">
                <Link href="/directory">
                  Browse the directory
                  <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="brand2-focus">
                <Link href="/guides">Read the guides</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
