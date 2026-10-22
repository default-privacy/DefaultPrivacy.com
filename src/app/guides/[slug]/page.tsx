// ⚠️ This route is PRERENDERED (generateStaticParams below, no `dynamic`
// export). A countUsage() call in this component body would fire at
// BUILD time and on ISR regeneration — NOT once per visitor — producing a counter
// that looks alive while measuring nothing real. Per-slug demand is counted on the
// dynamic MCP path instead (src/mcp-server/tools.ts, kind "guide_read"), which sees
// agent reads only. Human page views are deliberately not counted anywhere.
import { ConnectAiCard } from "@/components/ai/connect-ai-card"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import { parseGuideFaqsFromContent } from "@/lib/guide-faq"
import { getAllGuides, getGuideBySlug } from "@/lib/guides"
import { renderReadingHtml } from "@/lib/reading-html"
import { fileNumber } from "@/lib/reading-file-number"
import { ReadingFrame, formatReadingDate } from "@/components/reading/reading-frame"
import { ReadingLayout } from "@/components/reading/reading-layout"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Layers, Shield } from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

const difficultyLabel = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
} as const

/**
 * Convert a human "time to complete" (e.g. "10 minutes", "1-2 hours", "1 afternoon")
 * into a valid ISO-8601 duration for schema.org `timeRequired`. Returns PT{n}M / PT{n}H
 * when a number + unit is parseable, else undefined so the field is omitted rather than
 * emitting invalid data (was "PT10MINUTES", which Google rejects — N1).
 */
function iso8601Duration(raw: string): string | undefined {
  const num = raw.match(/\d+/)?.[0]
  if (!num) return undefined
  if (/hour/i.test(raw)) return `PT${num}H`
  if (/min/i.test(raw)) return `PT${num}M`
  return undefined
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) {
    return { title: "Guide Not Found | Default Privacy" }
  }

  const ogPath = `/guides/${slug}/opengraph-image`

  return {
    title: `${guide.title} | Field Guide | Default Privacy`,
    description: guide.description,
    alternates: {
      canonical: `https://defaultprivacy.com/guides/${slug}`,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      url: `/guides/${slug}`,
      siteName: "Default Privacy",
      publishedTime: guide.publishedAt,
      ...(guide.updatedAt && { modifiedTime: guide.updatedAt }),
      authors: [guide.author],
      tags: guide.tags,
      images: [
        {
          url: ogPath,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [ogPath],
    },
  }
}

// Content changes only with a deploy: regenerate at most weekly (keeps ISR writes and CPU down).
export const revalidate = 604800

// Only prerendered slugs exist. Without this, every unknown URL renders a 404 that the
// host caches as its own page, which counts against the ISR write limit.
export const dynamicParams = false

export async function generateStaticParams() {
  const guides = await getAllGuides()
  return guides.map((g) => ({ slug: g.slug }))
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) notFound()

  const { html: contentHtml, headings } = renderReadingHtml(guide.content)
  const file = fileNumber("G", await getAllGuides(), slug)
  const timeRequired = iso8601Duration(guide.timeToComplete)

  const guideUrl = `https://defaultprivacy.com/guides/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${guideUrl}#article`,
    url: guideUrl,
    mainEntityOfPage: guideUrl,
    isPartOf: { "@id": "https://defaultprivacy.com/#website" },
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    ...(guide.updatedAt && { dateModified: guide.updatedAt }),
    author: { "@id": "https://defaultprivacy.com/#organization" },
    publisher: { "@id": "https://defaultprivacy.com/#organization" },
    proficiencyLevel: guide.difficulty,
    ...(timeRequired && { timeRequired }),
    keywords: guide.tags.join(", "),
  }

  // A guide's visible "## FAQ" block, mirrored as FAQPage markup (only when it has one).
  const faqs = parseGuideFaqsFromContent(guide.content)
  const faqJsonLd = faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Field Guide", url: "https://defaultprivacy.com/guides" },
          { name: guide.title, url: `https://defaultprivacy.com/guides/${slug}` },
        ]}
      />

      <main className="flex-1">
        <ReadingLayout
          headings={headings}
          header={
            <>
              <Link href="/guides" className="reading-back brand2-focus rounded">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Field Guide
              </Link>
              <ReadingFrame
                file={file}
                title={guide.title}
                dek={guide.description}
                fields={[
                  `Published ${formatReadingDate(guide.publishedAt)}`,
                  ...(guide.updatedAt ? [`Updated ${formatReadingDate(guide.updatedAt)}`] : []),
                  guide.timeToComplete,
                ]}
                right={`${guide.category} · ${difficultyLabel[guide.difficulty]}`}
              />
            </>
          }
        >

          {/* Related tools — renders the guide's relatedTools frontmatter (mirrors the
              stack page's "Tools in this stack" block) */}
          {guide.relatedTools && guide.relatedTools.length > 0 && (
            <div className="mb-8 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4 text-foreground-soft" aria-hidden="true" />
                <h2 className="text-sm font-medium text-foreground">Related tools</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {guide.relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="brand2-focus group flex items-center justify-between gap-2 rounded-lg border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground-soft hover:border-foreground/20 hover:text-foreground transition-colors"
                  >
                    <span>{tool.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground brand2-arrow-nudge" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="prose-reading" dangerouslySetInnerHTML={{ __html: contentHtml }} />

          {/* Tags */}
          {guide.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-foreground/10">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-muted-foreground border border-foreground/10 rounded-full px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA — neutral tools CTA (no formation funnel) */}
            <div className="mt-12 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-foreground/[0.06] border border-foreground/10 shrink-0">
                  <Shield className="h-5 w-5 text-foreground-soft" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">Check what a site leaks</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Run the free privacy scanner to see any site&apos;s trackers, cookies, and fingerprinting.
                  </p>
                  <Button variant="outline" size="sm" asChild className="brand2-focus">
                    <Link href="/scanner">Run the scanner</Link>
                  </Button>
                </div>
              </div>
            </div>
          <ConnectAiCard size="slim" className="mt-10" />
        </ReadingLayout>
      </main>

      <Footer />
    </div>
  )
}
