import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { getAllGlossaryTerms, getGlossaryCategories } from "@/lib/glossary"
import type { Metadata } from "next"
import Link from "next/link"
import { BookOpen } from "lucide-react"
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
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-foreground/[0.06] border border-foreground/10">
                <BookOpen className="h-5 w-5 text-foreground/65" aria-hidden="true" />
              </div>
              <h1 className="text-3xl font-medium tracking-tight text-foreground/90">
                Privacy Glossary
              </h1>
            </div>
            <p className="text-lg text-foreground/58 max-w-2xl mb-6">
              {terms.length} terms covering encryption, networking, security,
              and digital privacy. Understand the language of online privacy.
            </p>
            <GlossarySearch terms={terms} />
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
                  className="brand2-focus w-8 h-8 flex items-center justify-center rounded text-sm font-medium text-foreground/65 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
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
            <h2 className="text-sm font-medium text-foreground/65 mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`#category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="brand2-focus inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1 text-xs text-foreground/65 hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  {category}
                  <span className="text-foreground/40">
                    {termsByCategory[category]?.length || 0}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Terms by letter */}
        <section>
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-12">
              {letters.map((letter) => (
                <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                  <h2 className="text-2xl font-medium tracking-tight text-foreground/90 mb-4 pb-2 border-b border-foreground/10">
                    {letter}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {termsByLetter[letter].map((term) => (
                      <Link
                        key={term.slug}
                        href={`/glossary/${term.slug}`}
                        className="brand2-focus group block rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-medium text-sm text-foreground/85 group-hover:text-foreground transition-colors">
                            {term.term}
                          </h3>
                          <span className="shrink-0 text-[10px] font-mono text-foreground/45 border border-foreground/10 rounded-full px-2 py-0.5">
                            {term.category}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/55 line-clamp-2">
                          {term.definition}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
