// ⚠️ PRERENDERED — see the note in src/app/guides/[slug]/page.tsx. A countUsage()
// here counts builds and ISR regenerations, not visits. Per-slug demand is counted
// on the dynamic MCP path (kind "glossary_read"), agent traffic only.
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import {
  getAllGlossaryTerms,
  getGlossaryTermBySlug,
  getRelatedTerms,
} from "@/lib/glossary"
import { marked } from "marked"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, BookOpen, ExternalLink, Wrench } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

const META_DESC_MAX = 155

function truncateMeta(desc: string, max = META_DESC_MAX) {
  if (desc.length <= max) return desc
  const cut = desc.lastIndexOf(" ", max - 3)
  return (cut > max * 0.7 ? desc.slice(0, cut) : desc.slice(0, max - 3)) + "..."
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const term = await getGlossaryTermBySlug(slug)

  if (!term) {
    return {
      title: "Term Not Found | Default Privacy",
    }
  }

  const whatIsTitle = `What is ${term.term}?`
  const whatIsDesc = `What is ${term.term}? ${term.definition}`
  const metaDesc = truncateMeta(whatIsDesc)

  return {
    title: `${whatIsTitle} | Privacy Glossary | Default Privacy`,
    description: metaDesc,
    alternates: {
      canonical: `https://defaultprivacy.com/glossary/${term.slug}`,
    },
    openGraph: {
      title: `${whatIsTitle} - Privacy Glossary`,
      description: metaDesc,
    },
  }
}

// Content changes only with a deploy: regenerate at most weekly (keeps ISR writes and CPU down).
export const revalidate = 604800

// Only prerendered slugs exist. Without this, every unknown URL renders a 404 that the
// host caches as its own page, which counts against the ISR write limit.
export const dynamicParams = false

export async function generateStaticParams() {
  const terms = await getAllGlossaryTerms()
  return terms.map((term) => ({ slug: term.slug }))
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params
  const term = await getGlossaryTermBySlug(slug)

  if (!term) {
    notFound()
  }

  const relatedTerms = await getRelatedTerms(term)

  const contentHtml = await marked(term.content)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    url: `https://defaultprivacy.com/glossary/${term.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Default Privacy Glossary",
      url: "https://defaultprivacy.com/glossary",
    },
    ...(term.aliases && term.aliases.length > 0 && {
      alternateName: term.aliases,
    }),
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${term.term}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: term.definition,
        },
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Privacy Glossary", url: "https://defaultprivacy.com/glossary" },
          { name: `What is ${term.term}?`, url: `https://defaultprivacy.com/glossary/${term.slug}` },
        ]}
      />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Back link */}
          <Link
            href="/glossary"
            className="brand2-focus inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Glossary
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-foreground/[0.06] border border-foreground/10">
                <BookOpen className="h-5 w-5 text-foreground-soft" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] border border-foreground/10 rounded-full px-2.5 py-1">
                {term.category}
              </span>
            </div>
            <h1 className="text-4xl font-medium tracking-cinematic text-foreground mb-4">
              What is {term.term}?
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {term.definition}
            </p>
          </div>

          {/* Aliases */}
          {term.aliases && term.aliases.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Also known as:{" "}
                {term.aliases.map((alias, i) => (
                  <span key={alias}>
                    <span className="text-foreground">{alias}</span>
                    {i < term.aliases!.length - 1 && ", "}
                  </span>
                ))}
              </p>
            </div>
          )}

          <div className="border-t border-foreground/10 my-8" />

          {/* Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Related terms */}
          {relatedTerms.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-medium text-foreground mb-4">Related Terms</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedTerms.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/glossary/${related.slug}`}
                    className="brand2-focus group block rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all"
                  >
                    <h3 className="font-medium text-sm text-foreground group-hover:text-foreground mb-1 transition-colors">
                      {related.term}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {related.definition}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* See also (tools) */}
          {term.seeAlso && term.seeAlso.length > 0 && (
            <section className="mt-12">
              <h2 className="text-sm font-medium text-foreground-soft flex items-center gap-2 mb-3">
                <Wrench className="h-4 w-4" aria-hidden="true" />
                Related Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {term.seeAlso.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/directory/${tool.slug}`}
                    className="brand2-focus inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-foreground-soft hover:text-foreground hover:border-foreground/20 transition-colors"
                  >
                    {tool.name}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}
