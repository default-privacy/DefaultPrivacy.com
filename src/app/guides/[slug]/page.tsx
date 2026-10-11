// ⚠️ This route is PRERENDERED (generateStaticParams below, no `dynamic` or
// `revalidate` export). A countUsage() call in this component body would fire at
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
import { marked } from "marked"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Signal,
  Calendar,
  Layers,
  Shield,
} from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

const difficultyConfig = {
  beginner: { label: "Beginner", color: "text-success", bg: "bg-success/10 border-success/20" },
  intermediate: { label: "Intermediate", color: "text-caution", bg: "bg-caution/10 border-caution/20" },
  advanced: { label: "Advanced", color: "text-destructive", bg: "bg-destructive/10 border-destructive/20" },
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

export async function generateStaticParams() {
  const guides = await getAllGuides()
  return guides.map((g) => ({ slug: g.slug }))
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) notFound()

  const contentHtml = await marked(guide.content)
  const diff = difficultyConfig[guide.difficulty]
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
        <article className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Back link */}
          <Link
            href="/guides"
            className="brand2-focus inline-flex items-center gap-1 text-sm text-foreground/55 hover:text-foreground mb-6 rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Field Guide
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-mono text-foreground/45 border border-foreground/10 rounded-full px-2.5 py-1">
                {guide.category}
              </span>
              <span className={`text-[10px] font-mono border rounded-full px-2.5 py-1 ${diff.bg} ${diff.color}`}>
                {diff.label}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-medium tracking-cinematic text-foreground/90 mb-4">
              {guide.title}
            </h1>

            <p className="text-lg text-foreground/58 leading-relaxed mb-6">
              {guide.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/45">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {guide.timeToComplete}
              </span>
              <span className="flex items-center gap-1.5">
                <Signal className="h-3.5 w-3.5" aria-hidden="true" />
                {diff.label}
              </span>
            </div>
          </header>

          {/* Related tools — renders the guide's relatedTools frontmatter (mirrors the
              stack page's "Tools in this stack" block) */}
          {guide.relatedTools && guide.relatedTools.length > 0 && (
            <div className="mb-8 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4 text-foreground/65" aria-hidden="true" />
                <h2 className="text-sm font-medium text-foreground/85">Related tools</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {guide.relatedTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="brand2-focus group flex items-center justify-between gap-2 rounded-lg border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground/75 hover:border-foreground/20 hover:text-foreground transition-colors"
                  >
                    <span>{tool.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-foreground/40 brand2-arrow-nudge" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-foreground/10 my-8" />

          {/* Content */}
          <div
            className="prose dark:prose-invert max-w-none
              prose-headings:scroll-mt-20
              prose-a:text-foreground/85 prose-a:no-underline hover:prose-a:underline
              prose-code:before:content-none prose-code:after:content-none
              prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
              prose-pre:bg-muted prose-pre:border prose-pre:border-foreground/10 prose-pre:rounded-xl
              prose-table:text-sm
              prose-th:text-left prose-th:font-medium
              prose-td:py-2 prose-th:py-2"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Tags */}
          {guide.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-foreground/10">
              <p className="text-[10px] font-mono text-foreground/45 uppercase tracking-[0.3em] mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-foreground/55 border border-foreground/10 rounded-full px-2.5 py-1"
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
                  <Shield className="h-5 w-5 text-foreground/65" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground/85 mb-1">Check what a site leaks</h3>
                  <p className="text-sm text-foreground/55 mb-3">
                    Run the free privacy scanner to see any site&apos;s trackers, cookies, and fingerprinting.
                  </p>
                  <Button variant="outline" size="sm" asChild className="brand2-focus">
                    <Link href="/scanner">Run the scanner</Link>
                  </Button>
                </div>
              </div>
            </div>
          <ConnectAiCard size="slim" className="mt-10" />
        </article>
      </main>

      <Footer />
    </div>
  )
}
