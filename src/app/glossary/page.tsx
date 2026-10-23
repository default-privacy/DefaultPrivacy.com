import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { getAllGlossaryTerms, getGlossaryCategories } from "@/lib/glossary"
import type { Metadata } from "next"
import Link from "next/link"
import { GlossaryCategoryFilter } from "./glossary-category-filter"
import { GlossarySearch } from "./glossary-search"

export const metadata: Metadata = {
  title: "Privacy Glossary | Default Privacy",
  description:
    "Definitions for privacy and security terms. From VPN to GDPR, from doxxing to zero-knowledge proofs — encryption, surveillance, legislation, and digital security.",
  openGraph: {
    title: "Privacy Glossary | Default Privacy",
    description:
      "Definitions for privacy and security terms, from VPN to GDPR.",
  },
  alternates: {
    canonical: "https://defaultprivacy.com/glossary",
    types: { "text/markdown": "https://defaultprivacy.com/glossary.md" },
  },
}

export default async function GlossaryPage() {
  const terms = await getAllGlossaryTerms()
  const categories = await getGlossaryCategories()

  // Group terms by first letter
  const termsByLetter = terms.reduce(
    (acc, term) => {
      const letter = term.term[0].toUpperCase()
      if (!acc[letter]) {
        acc[letter] = []
      }
      acc[letter].push(term)
      return acc
    },
    {} as Record<string, typeof terms>
  )

  const letters = Object.keys(termsByLetter).sort()

  // Group terms by category for the category section
  const termsByCategory = terms.reduce(
    (acc, term) => {
      if (!acc[term.category]) {
        acc[term.category] = []
      }
      acc[term.category].push(term)
      return acc
    },
    {} as Record<string, typeof terms>
  )

  const glossaryJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Default Privacy Glossary",
    description: `${terms.length} individually-authored privacy and security term definitions across ${categories.length} categories covering encryption, surveillance, legislation, data protection, attacks, and more.`,
    url: "https://defaultprivacy.com/glossary",
    inLanguage: "en",
    numberOfItems: terms.length,
    publisher: { "@id": "https://defaultprivacy.com/#organization" },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-foreground/10">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-10 pt-12">
            <div className="max-w-[680px]">
              <p className="mb-7 flex flex-wrap gap-y-1 border-b border-foreground/15 pb-3.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-foreground/50">
                <span className="font-semibold text-foreground">File DP · Glossary</span>
                <span className="before:mx-2.5 before:content-['·']">{terms.length} terms</span>
                <span className="before:mx-2.5 before:content-['·']">{categories.length} categories</span>
              </p>
              <h1 className="text-4xl font-semibold tracking-[var(--tracking-cinematic)] text-foreground md:text-[42px] md:leading-[1.1]">
                Privacy Glossary
              </h1>
              <p className="mb-8 mt-4 text-[19px] leading-relaxed text-foreground/70">
                {terms.length} terms covering encryption, networking, security,
                and digital privacy. Understand the language of online privacy.
              </p>
            </div>
            <GlossarySearch
              terms={terms.map(({ term, slug, definition, category, aliases, keywords }) => ({
                term, slug, definition, category, aliases, keywords,
              }))}
            />
          </div>
        </section>

        {/* Quick jump alphabet */}
        <section className="border-b border-foreground/10 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap gap-1">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="brand2-focus w-8 h-8 flex items-center justify-center rounded font-mono text-sm font-medium text-foreground/65 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Categories overview */}
        <section className="border-b border-foreground/10">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="mb-4 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-foreground/50">Browse by Category</h2>
            <GlossaryCategoryFilter
              categories={categories.map((name) => ({ name, count: termsByCategory[name]?.length ?? 0 }))}
            />
          </div>
        </section>

        {/* Terms by letter */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-11">
              {letters.map((letter) => (
                <div key={letter} id={`letter-${letter}`} data-glossary-letter className="scroll-mt-20">
                  <h2 className="mb-4 flex items-center gap-4 font-mono text-[15px] font-semibold uppercase tracking-[0.18em] text-foreground after:h-px after:flex-1 after:bg-foreground/10">
                    {letter}
                  </h2>
                  <ul className="columns-[220px] gap-x-10">
                    {termsByLetter[letter].map((term) => (
                      <li key={term.slug} data-glossary-cat={term.category} className="break-inside-avoid py-[3px] text-[15px] leading-snug">
                        <Link
                          href={`/glossary/${term.slug}`}
                          className="brand2-focus rounded-sm text-foreground/75 underline-offset-[3px] hover:text-foreground hover:underline"
                        >
                          {term.term}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-14 max-w-[680px] border-t border-foreground/10 pt-5 text-[14px] text-foreground/50">
              Every term has its own page with the full definition. AI agents can add .md to any term
              address for a plain-text copy, or use the glossary tools on our{" "}
              <Link href="/ai" className="text-foreground/80 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                MCP server
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
