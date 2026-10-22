import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import {
  getAllChapters,
  getChapterBySlug,
  getAdjacentChapters,
  getRelatedChapters,
} from "@/lib/playbook"
import { marked } from "marked"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  BookOpen,
} from "lucide-react"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const chapter = await getChapterBySlug(slug)

  if (!chapter) {
    return { title: "Chapter Not Found | Default Privacy" }
  }

  const ogPath = `/playbook/${slug}/opengraph-image`

  return {
    title: `${chapter.title} | The Privacy Playbook | Default Privacy`,
    description: chapter.description,
    alternates: {
      canonical: `https://defaultprivacy.com/playbook/${slug}`,
    },
    openGraph: {
      title: chapter.title,
      description: chapter.description,
      type: "article",
      url: `/playbook/${slug}`,
      siteName: "Default Privacy",
      publishedTime: chapter.publishedAt,
      ...(chapter.updatedAt && { modifiedTime: chapter.updatedAt }),
      authors: [chapter.author],
      tags: chapter.tags,
      images: [
        {
          url: ogPath,
          width: 1200,
          height: 630,
          alt: chapter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: chapter.title,
      description: chapter.description,
      images: [ogPath],
    },
  }
}

export async function generateStaticParams() {
  const chapters = await getAllChapters()
  return chapters.map((c) => ({ slug: c.slug }))
}

export default async function PlaybookDetailPage({ params }: Props) {
  const { slug } = await params
  const chapter = await getChapterBySlug(slug)

  if (!chapter) notFound()

  const contentHtml = await marked(chapter.content)
  const { prev, next } = await getAdjacentChapters(chapter.chapterNumber)
  const related = chapter.relatedChapters?.length
    ? await getRelatedChapters(chapter.relatedChapters)
    : []

  const chapterUrl = `https://defaultprivacy.com/playbook/${slug}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${chapterUrl}#article`,
    url: chapterUrl,
    mainEntityOfPage: chapterUrl,
    isPartOf: { "@id": "https://defaultprivacy.com/#website" },
    headline: chapter.title,
    description: chapter.description,
    datePublished: chapter.publishedAt,
    ...(chapter.updatedAt && { dateModified: chapter.updatedAt }),
    author: { "@id": "https://defaultprivacy.com/#organization" },
    publisher: { "@id": "https://defaultprivacy.com/#organization" },
    articleSection: `Chapter ${chapter.chapterNumber}`,
    keywords: chapter.tags.join(", "),
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "The Privacy Playbook", url: "https://defaultprivacy.com/playbook" },
          { name: chapter.title, url: `https://defaultprivacy.com/playbook/${slug}` },
        ]}
      />

      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Back link */}
          <Link
            href="/playbook"
            className="brand2-focus inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 rounded"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            The Privacy Playbook
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] font-mono text-muted-foreground border border-foreground/10 rounded-full px-2.5 py-1">
                Chapter {chapter.chapterNumber}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-medium tracking-cinematic text-foreground mb-4">
              {chapter.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {chapter.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(chapter.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {chapter.readingTime}
              </span>
            </div>
          </header>

          <div className="border-t border-foreground/10 my-8" />

          {/* Content */}
          <div
            className="prose max-w-none
              prose-headings:scroll-mt-20
              prose-a:text-foreground prose-a:no-underline hover:prose-a:underline
              prose-code:before:content-none prose-code:after:content-none
              prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
              prose-pre:bg-muted prose-pre:border prose-pre:border-foreground/10 prose-pre:rounded-xl
              prose-table:text-sm
              prose-th:text-left prose-th:font-medium
              prose-td:py-2 prose-th:py-2"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Frequently asked questions (FAQs come from frontmatter, not the body) */}
          {chapter.faqs.length > 0 && (
            <div className="mt-12 pt-8 border-t border-foreground/10">
              <h2 className="text-xl font-medium tracking-cinematic text-foreground mb-6">
                Frequently asked questions
              </h2>
              <dl className="space-y-6">
                {chapter.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5"
                  >
                    <dt className="font-medium text-foreground mb-2">
                      {faq.question}
                    </dt>
                    <dd className="text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Tags */}
          {chapter.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-foreground/10">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {chapter.tags.map((tag) => (
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

          {/* Related chapters */}
          {related.length > 0 && (
            <div className="mt-12 pt-6 border-t border-foreground/10">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-3">
                Related chapters
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {related.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/playbook/${c.slug}`}
                    className="brand2-focus group flex items-center justify-between gap-2 rounded-lg border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground-soft hover:border-foreground/20 hover:text-foreground transition-colors"
                  >
                    <span>
                      <span className="text-muted-foreground">Chapter {c.chapterNumber}: </span>
                      {c.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground brand2-arrow-nudge shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related guides */}
          {chapter.relatedGuides && chapter.relatedGuides.length > 0 && (
            <div className="mt-8">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-3">
                Related guides
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {chapter.relatedGuides.map((guideSlug) => (
                  <Link
                    key={guideSlug}
                    href={`/guides/${guideSlug}`}
                    className="brand2-focus group flex items-center justify-between gap-2 rounded-lg border border-foreground/10 bg-background px-3 py-2 text-sm text-foreground-soft hover:border-foreground/20 hover:text-foreground transition-colors"
                  >
                    <span>{guideSlug.replace(/-/g, " ")}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground brand2-arrow-nudge shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next chapter navigation */}
          {(prev || next) && (
            <nav className="mt-12 pt-6 border-t border-foreground/10 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/playbook/${prev.slug}`}
                  className="brand2-focus group rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all"
                >
                  <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-1">
                    <ArrowLeft className="h-3 w-3" aria-hidden="true" />
                    Previous
                  </span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-foreground transition-colors">
                    Chapter {prev.chapterNumber}: {prev.title}
                  </span>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
              {next ? (
                <Link
                  href={`/playbook/${next.slug}`}
                  className="brand2-focus group rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4 hover:border-foreground/20 hover:bg-foreground/[0.04] transition-all sm:text-right"
                >
                  <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] mb-1 sm:justify-end">
                    Next
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </span>
                  <span className="block text-sm font-medium text-foreground group-hover:text-foreground transition-colors">
                    Chapter {next.chapterNumber}: {next.title}
                  </span>
                </Link>
              ) : (
                <span aria-hidden="true" />
              )}
            </nav>
          )}

          {/* CTA — chapter nextStep if authored, else neutral tools CTA (no formation funnel) */}
          {chapter.nextStep ? (
            <div className="mt-12 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-foreground/[0.06] border border-foreground/10 shrink-0">
                  <BookOpen className="h-5 w-5 text-foreground-soft" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">{chapter.nextStep.label}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {chapter.nextStep.description}
                  </p>
                  <Button asChild size="sm" className="brand2-btn-primary brand2-focus group">
                    <Link href={chapter.nextStep.href}>
                      {chapter.nextStep.label}
                      <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-12 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-foreground/[0.06] border border-foreground/10 shrink-0">
                  <BookOpen className="h-5 w-5 text-foreground-soft" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">Put this chapter into practice</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Browse the vetted directory to compare every tool, or run a free check on your own exposure.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="sm" className="brand2-btn-primary brand2-focus group">
                      <Link href="/directory">
                        Browse the directory
                        <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild className="brand2-focus">
                      <Link href="/scanner">Run the scanner</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  )
}
