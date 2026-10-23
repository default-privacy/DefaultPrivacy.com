import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { ReadingCard } from "@/components/reading/reading-card"
import { getAllGuides } from "@/lib/guides"
import { fileNumber } from "@/lib/reading-file-number"
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
    types: { "text/markdown": "https://defaultprivacy.com/guides.md" },
  },
}

const DIFFICULTY = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" } as const

const link = "text-foreground/80 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm"

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
    <div className="flex min-h-screen flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesJsonLd) }}
      />
      <main className="container flex-1 pb-28 pt-12">
        <div className="mx-auto max-w-6xl">
        <header className="max-w-[680px]">
          <p className="mb-7 flex flex-wrap gap-y-1 border-b border-foreground/15 pb-3.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-foreground/50">
            <span className="font-semibold text-foreground">File DP · Guides</span>
            <span className="before:mx-2.5 before:content-['·']">{guides.length} files</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-[var(--tracking-cinematic)] text-foreground md:text-[42px] md:leading-[1.1]">
            Field Guide
          </h1>
          <p className="mt-4 text-[19px] leading-relaxed text-foreground/70">
            Practical how-tos: run your own VPN, get your name off data-broker sites, and keep a home address off people-search listings.
          </p>
        </header>

        {guides.length > 0 ? (
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <ReadingCard
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                file={fileNumber("G", guides, guide.slug)}
                category={guide.category}
                title={guide.title}
                description={guide.description}
                fields={[guide.timeToComplete, DIFFICULTY[guide.difficulty]]}
              />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-foreground/50">Guides coming soon</p>
        )}

        <p className="mt-14 max-w-[680px] border-t border-foreground/10 pt-5 text-[14px] text-foreground/50">
          Put the guides into practice: <Link href="/directory" className={link}>browse the directory</Link> or <Link href="/tools" className={link}>run a free check</Link> on your own exposure.
        </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
