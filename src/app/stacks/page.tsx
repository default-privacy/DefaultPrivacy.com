import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { ReadingCard } from "@/components/reading/reading-card"
import { getAllStacks } from "@/lib/stacks"
import { fileNumber } from "@/lib/reading-file-number"
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
    types: { "text/markdown": "https://defaultprivacy.com/stacks.md" },
  },
}

const DIFFICULTY = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" } as const

const link = "text-foreground/80 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm"

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
    <div className="flex min-h-screen flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stacksJsonLd) }}
      />
      <main className="container flex-1 pb-28 pt-12">
        <div className="mx-auto max-w-6xl">
        <header className="max-w-[680px]">
          <p className="mb-7 flex flex-wrap gap-y-1 border-b border-foreground/15 pb-3.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-foreground/50">
            <span className="font-semibold text-foreground">File DP · Stacks</span>
            <span className="before:mx-2.5 before:content-['·']">{stacks.length} files</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-[var(--tracking-cinematic)] text-foreground md:text-[42px] md:leading-[1.1]">
            Privacy Stacks
          </h1>
          <p className="mt-4 text-[19px] leading-relaxed text-foreground/70">
            Curated tool bundles for a specific threat model — the exact set of privacy tools for your situation, in setup order, with the tradeoffs spelled out. Start with a stack instead of a blank directory.
          </p>
        </header>

        {stacks.length > 0 ? (
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stacks.map((stack) => (
              <ReadingCard
                key={stack.slug}
                href={`/stacks/${stack.slug}`}
                file={fileNumber("S", stacks, stack.slug)}
                category={stack.category}
                title={stack.title}
                description={stack.description}
                fields={[stack.timeToComplete, DIFFICULTY[stack.difficulty]]}
              />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-foreground/50">Stacks coming soon</p>
        )}

        <p className="mt-14 max-w-[680px] border-t border-foreground/10 pt-5 text-[14px] text-foreground/50">
          Want to go tool by tool? <Link href="/directory" className={link}>Browse the full directory</Link> or <Link href="/guides" className={link}>read the guides</Link> for step-by-step walkthroughs.
        </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
