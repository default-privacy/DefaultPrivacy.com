import { ConnectAiCard } from "@/components/ai/connect-ai-card"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { QuickExit } from "@/components/common/quick-exit"
import { getAllStacks, getStackBySlug, stripEmbeddedJsonLd } from "@/lib/stacks"
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
} from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

const difficultyConfig = {
  beginner: { label: "Beginner", color: "text-success", bg: "bg-success/10 border-success/20" },
  intermediate: { label: "Intermediate", color: "text-caution", bg: "bg-caution/10 border-caution/20" },
  advanced: { label: "Advanced", color: "text-destructive", bg: "bg-destructive/10 border-destructive/20" },
} as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const stack = await getStackBySlug(slug)

  if (!stack) {
    return { title: "Stack Not Found | Default Privacy" }
  }

  const ogPath = `/stacks/${slug}/opengraph-image`

  return {
    title: `${stack.title} | Privacy Stacks | Default Privacy`,
    description: stack.description,
    alternates: {
      canonical: `https://defaultprivacy.com/stacks/${slug}`,
    },
    openGraph: {
      title: stack.title,
      description: stack.description,
      type: "article",
      url: `/stacks/${slug}`,
      siteName: "Default Privacy",
      publishedTime: stack.publishedAt,
      ...(stack.updatedAt && { modifiedTime: stack.updatedAt }),
      authors: [stack.author],
      tags: stack.tags,
      images: [
        {
          url: ogPath,
          width: 1200,
          height: 630,
          alt: stack.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: stack.title,
      description: stack.description,
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
  const stacks = await getAllStacks()
  return stacks.map((s) => ({ slug: s.slug }))
}

export default async function StackDetailPage({ params }: Props) {
  const { slug } = await params
  const stack = await getStackBySlug(slug)

  if (!stack) notFound()

  const contentHtml = await marked(stripEmbeddedJsonLd(stack.content))
  const diff = difficultyConfig[stack.difficulty]

  const stackUrl = `https://defaultprivacy.com/stacks/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${stackUrl}#article`,
    url: stackUrl,
    mainEntityOfPage: stackUrl,
    isPartOf: { "@id": "https://defaultprivacy.com/#website" },
    headline: stack.title,
    description: stack.description,
    datePublished: stack.publishedAt,
    ...(stack.updatedAt && { dateModified: stack.updatedAt }),
    author: { "@id": "https://defaultprivacy.com/#organization" },
    publisher: { "@id": "https://defaultprivacy.com/#organization" },
    proficiencyLevel: stack.difficulty,
    keywords: stack.tags.join(", "),
  }

  return (
    <div className="min-h-screen flex flex-col">
      {stack.quickExit && <QuickExit />}
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Privacy Stacks", url: "https://defaultprivacy.com/stacks" },
          { name: stack.title, url: `https://defaultprivacy.com/stacks/${slug}` },
        ]}
      />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Back link */}
          <Link
            href="/stacks"
            className="brand2-focus inline-flex items-center gap-1 text-sm text-foreground/55 hover:text-foreground mb-6 rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Privacy Stacks
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-mono text-foreground/45 border border-foreground/10 rounded-full px-2.5 py-1">
                {stack.category}
              </span>
              <span className={`text-[10px] font-mono border rounded-full px-2.5 py-1 ${diff.bg} ${diff.color}`}>
                {diff.label}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-medium tracking-cinematic text-foreground/90 mb-4">
              {stack.title}
            </h1>

            <p className="text-lg text-foreground/58 leading-relaxed mb-6">
              {stack.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/45">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(stack.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {stack.timeToComplete}
              </span>
              <span className="flex items-center gap-1.5">
                <Signal className="h-3.5 w-3.5" aria-hidden="true" />
                {diff.label}
              </span>
            </div>
          </header>

          {/* Tools in this stack */}
          {stack.relatedTools && stack.relatedTools.length > 0 && (
            <div className="mb-8 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-4 w-4 text-foreground/65" aria-hidden="true" />
                <h2 className="text-sm font-medium text-foreground/85">Tools in this stack</h2>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {stack.relatedTools.map((tool) => (
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
          {stack.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-foreground/10">
              <p className="text-[10px] font-mono text-foreground/45 uppercase tracking-[0.3em] mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.tags.map((tag) => (
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

          <ConnectAiCard size="slim" className="mt-10" />
        </article>
      </main>

      <Footer />
    </div>
  )
}
