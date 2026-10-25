// ⚠️ PRERENDERED — see the note in src/app/guides/[slug]/page.tsx. A countUsage()
// here counts builds and ISR regenerations, not visits. Per-slug demand is counted
// on the dynamic MCP path (kind "glossary_read"), agent traffic only.
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import {
  getAllGlossaryTerms,
  getGlossaryTermBySlug,
  getRelatedTerms,
  type GlossaryTerm,
} from "@/lib/glossary"
import { renderReadingHtml } from "@/lib/reading-html"
import { fileNumber } from "@/lib/reading-file-number"
import { ReadingFrame } from "@/components/reading/reading-frame"
import { ReadingLayout } from "@/components/reading/reading-layout"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Wrench } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

const META_DESC_MAX = 155

function truncateMeta(desc: string, max = META_DESC_MAX) {
  if (desc.length <= max) return desc
  const cut = desc.lastIndexOf(" ", max - 3)
  return (cut > max * 0.7 ? desc.slice(0, cut) : desc.slice(0, max - 3)) + "..."
}

// No "What is X?": English needs "a" before some terms (a VPN) and not others
// (encryption, Tor), and the term data can't tell which.
function displayName(term: GlossaryTerm) {
  return term.abbr ? `${term.abbr} (${term.term})` : term.term
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const term = await getGlossaryTermBySlug(slug)

  if (!term) {
    return {
      title: "Term Not Found | Default Privacy",
    }
  }

  const title = `${displayName(term)} explained`
  const metaDesc = truncateMeta(term.definition)

  return {
    title: `${title} | Privacy Glossary | Default Privacy`,
    description: metaDesc,
    alternates: {
      canonical: `https://defaultprivacy.com/glossary/${term.slug}`,
      types: { "text/markdown": `https://defaultprivacy.com/glossary/${term.slug}.md` },
    },
    openGraph: {
      title: `${title} - Privacy Glossary`,
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
  const name = displayName(term)
  const otherAliases = term.aliases?.filter((a) => a !== term.abbr) ?? []

  const { html: contentHtml, headings } = renderReadingHtml(term.content)
  const file = fileNumber("T", await getAllGlossaryTerms(), term.slug)

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
        name: `What does ${name} mean?`,
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
          { name, url: `https://defaultprivacy.com/glossary/${term.slug}` },
        ]}
      />

      <main className="flex-1">
        <ReadingLayout
          headings={headings}
          header={
            <>
              <Link href="/glossary" className="reading-back brand2-focus rounded">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Glossary
              </Link>
              <ReadingFrame
                file={file}
                title={name}
                dek={term.definition}
                fields={otherAliases.length > 0 ? [`Also ${otherAliases.join(", ")}`] : []}
                right={term.category}
              />
            </>
          }
        >
          {/* Content */}
          <div className="prose-reading" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {/* Related terms */}
          {relatedTerms.length > 0 && (
            <section className="mt-12">
              <h2 className="text-lg font-medium text-foreground/85 mb-4">Related Terms</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedTerms.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/glossary/${related.slug}`}
                    className="brand2-focus group block rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all"
                  >
                    <h3 className="font-medium text-sm text-foreground/85 group-hover:text-foreground mb-1 transition-colors">
                      {related.term}
                    </h3>
                    <p className="text-xs text-foreground/55 line-clamp-2">
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
              <h2 className="text-sm font-medium text-foreground/65 flex items-center gap-2 mb-3">
                <Wrench className="h-4 w-4" aria-hidden="true" />
                Related Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {term.seeAlso.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/directory/${tool.slug}`}
                    className="brand2-focus inline-flex items-center gap-1.5 rounded-full border border-foreground/10 px-3 py-1.5 text-xs text-foreground/65 hover:text-foreground hover:border-foreground/20 transition-colors"
                  >
                    {tool.name}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          )}

        </ReadingLayout>
      </main>

      <Footer />
    </div>
  )
}
