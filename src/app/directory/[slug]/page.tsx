import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { OutboundLink } from "@/components/common/outbound-link"
import { ToolCard } from "@/components/tools/tool-card"
import { Button } from "@/components/ui/button"
import { getPublicPublishedToolBySlug, getToolCategoryTags, getToolSlugs, getToolsByCategory } from "@/lib/db/queries"
import { pickInfo } from "@/lib/picks"
import { SourceRefs } from "@/components/tools/source-refs"
import { getToolEvidence } from "@/lib/claims/evidence"
import { numberSources, sourceLabel } from "@/lib/claims"
import { RelatedLinks } from "@/components/common/related-links"
import { resolveCategoryContent } from "@/lib/cross-sell"
import { isStockedVendor, SHOP_URL } from "@/lib/shop"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ExternalLink as ExternalLinkIcon,
  Flag,
  Github,
  Globe,
  MessageSquarePlus,
  Share2,
  Shield,
  Smartphone,
  Star,
} from "lucide-react"

// Listing data changes through scripts, not visitors: regenerate at most weekly. A deploy
// refreshes every page anyway, and each regeneration rewrites ~9 files, which counts against
// the host's ISR write limit.
export const revalidate = 604800

// Only prerendered slugs exist. Without this, every unknown URL renders a 404 that the
// host caches as its own page, which counts against the ISR write limit.
export const dynamicParams = false

export async function generateStaticParams() {
  const toolSlugs = await getToolSlugs()
  return toolSlugs.map(({ slug }) => ({ slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = await getPublicPublishedToolBySlug(slug)

  if (!tool) {
    return {
      title: "Tool Not Found | Default Privacy",
    }
  }

  return {
    title: `${tool.name} | Default Privacy`,
    description: tool.tagline || tool.description?.slice(0, 160),
    alternates: {
      canonical: `https://defaultprivacy.com/directory/${tool.slug}`,
      types: { "text/markdown": `https://defaultprivacy.com/directory/${tool.slug}.md` },
    },
    openGraph: {
      title: tool.name,
      description: tool.tagline || tool.description?.slice(0, 160),
      images: tool.screenshotUrl ? [tool.screenshotUrl] : undefined,
    },
  }
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params
  const tool = await getPublicPublishedToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const pick = pickInfo(tool.slug)
  const { categoryLabel, tags: toolTags } = await getToolCategoryTags(tool.id)
  const tagSlugs = toolTags.map(t => t.slug)

  // Sourced facts and caveats (empty for tools nobody has researched yet).
  const evidence = await getToolEvidence(tool.slug)
  const refs = numberSources(evidence)
  const hasCaveats = evidence.caveats.length > 0
  const showAndroid = tool.platforms?.includes("android") || tagSlugs.includes("android-app")
  const showIos = tool.platforms?.includes("ios") || tagSlugs.includes("ios-app")

  const displayCategory = categoryLabel
  const relatedCategory = categoryLabel
  const relatedTools = relatedCategory
    ? (await getToolsByCategory(relatedCategory, 4)).filter((t) => t.id !== tool.id).slice(0, 3)
    : []

  // Curated guide/stack cross-links keyed off the already-loaded category — no extra query.
  const relatedContent = resolveCategoryContent(categoryLabel)

  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: `https://defaultprivacy.com/directory/${tool.slug}`,
    ...(tool.description && { description: tool.description }),
    ...(tool.tagline && { abstract: tool.tagline }),
    applicationCategory: displayCategory ?? "Privacy & Security",
    ...(tool.faviconUrl && { image: tool.faviconUrl }),
    ...(tool.websiteUrl && {
      offers: {
        "@type": "Offer",
        url: tool.websiteUrl,
        availability: "https://schema.org/OnlineOnly",
      },
    }),
    ...(tool.isOpenSource === true && tool.githubUrl && {
      codeRepository: `https://github.com/${tool.githubUrl}`,
    }),
    ...((showAndroid || showIos) && {
      operatingSystem: [
        ...(showAndroid ? ["Android"] : []),
        ...(showIos ? ["iOS"] : []),
      ],
    }),
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Privacy Tools Directory", url: "https://defaultprivacy.com/directory" },
          { name: tool.name, url: `https://defaultprivacy.com/directory/${tool.slug}` },
        ]}
      />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/directory"
            className="mb-6 inline-flex items-center rounded-md text-[13px] text-foreground/50 transition-colors brand2-focus hover:text-foreground/80"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
            Back to Tools Directory
          </Link>

          {/* Stocked-vendor disclosure (01-BIAS-AND-TRUST): the day we sell a vendor's
              product, its listing says so. */}
          {isStockedVendor(tool.slug) && (
            <p className="mb-6 rounded-md border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-[13px] leading-relaxed text-foreground/60">
              Default Privacy sells {tool.name} in{" "}
              <a href={SHOP_URL} rel="noopener" className="text-foreground/80 underline underline-offset-2 hover:text-foreground">
                its shop
              </a>
              . Nothing else on this listing changes because of it.{" "}
              <Link href="/transparency" className="text-foreground/80 underline underline-offset-2 hover:text-foreground">
                How we earn
              </Link>
            </p>
          )}

          <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Header */}
            <div className="flex items-start gap-4">
              {tool.faviconUrl ? (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-foreground/8 bg-foreground/[0.02]">
                  <Image
                    src={tool.faviconUrl}
                    alt={tool.name}
                    width={48}
                    height={48}
                    className="rounded-md"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-foreground/8 bg-foreground/[0.02]">
                  <Shield className="h-6 w-6 text-foreground/40" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-medium tracking-tight text-foreground/95">{tool.name}</h1>
                  {tool.isDeprecated && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-foreground/12 bg-foreground/[0.04] px-2 py-0.5 text-[11px] font-medium text-foreground/60">
                      Deprecated
                    </span>
                  )}
                  {pick && !tool.isDeprecated && (
                    <Link
                      href="/how-we-pick"
                      title="How Default Privacy chooses its picks"
                      className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-foreground/[0.04] px-2 py-0.5 text-[11px] font-medium text-foreground/70 brand2-focus transition-colors hover:border-foreground/30 hover:text-foreground"
                    >
                      <Star className="h-3 w-3" aria-hidden />
                      DP pick
                    </Link>
                  )}
                </div>
                {displayCategory && (
                  <p className="mt-1 text-[13px] text-foreground/50">
                    {displayCategory}
                  </p>
                )}
                {tool.tagline && (
                  <p className="mt-2 text-[15px] text-foreground/70">{tool.tagline}</p>
                )}
                {pick && !tool.isDeprecated && (
                  <p className="mt-2 text-[13px] text-foreground/60">
                    <span className="font-medium text-foreground/75">Why it is a DP pick:</span> {pick.reason}{" "}
                    <Link href="/how-we-pick" className="underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                      How we pick
                    </Link>
                  </p>
                )}
              </div>
            </div>

            {/* Deprecation notice */}
            {tool.isDeprecated && (
              <div className="rounded-lg border border-caution/20 bg-caution/5 p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-caution" />
                  <div>
                    <p className="text-[13px] font-medium text-caution">This tool has been deprecated</p>
                    {tool.deprecatedReason && (
                      <p className="mt-1 text-[12px] text-foreground/60">
                        {tool.deprecatedReason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy badges from normalized tags */}
            {(() => {
              // Tags that assert a privacy property (encryption, no logs, audits…) came from a bulk
              // import with no source, so they are not shown; topic tags (vpn, password-manager) are.
              const knownSlugs = new Set([
                "open-source", "android-app", "ios-app",
                "accepts-crypto", "no-kyc", "security-audited",
                "foss", "encryption", "end-to-end-encryption", "no-logs", "no-tracking",
                "audit", "anonymous", "zero-knowledge", "gdpr",
              ])
              const extraTags = toolTags.filter(t => !knownSlugs.has(t.slug))

              return (
                <div className="flex flex-wrap gap-1.5">
                  {tool.isOpenSource === true && (
                    <span
                      title="Open source: the software's code is public. For services, the app may be open while the servers are not."
                      className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-[11px] font-medium text-foreground/70"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Open Source
                    </span>
                  )}
                  {(showAndroid || showIos) && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-[11px] font-medium text-foreground/70">
                      <Smartphone className="h-3.5 w-3.5" />
                      {showAndroid && showIos ? "Android & iOS" : showAndroid ? "Android" : "iOS"}
                    </span>
                  )}
                  {extraTags.map(tag => (
                    <span key={tag.slug} className="inline-flex items-center rounded-full border border-foreground/8 bg-transparent px-3 py-1 text-[11px] text-foreground/55">
                      {tag.name}
                    </span>
                  ))}
                </div>
              )
            })()}

            {/* Description */}
            {tool.description && (
              <div className="rounded-lg border border-foreground/8 bg-foreground/[0.01] p-5">
                <h2 className="text-[13px] font-medium text-foreground/90">
                  About
                  <SourceRefs urls={evidence.sources["description"]?.urls} index={refs.index} />
                </h2>
                <p className="mt-3 whitespace-pre-wrap text-[13px] leading-relaxed text-foreground/60">
                  {tool.description}
                </p>
              </div>
            )}

            {/* Things to know: the caveats, each with its sources. Replaces `content`, which
                duplicates them word for word on researched tools. */}
            {hasCaveats && (
              <div className="rounded-lg border border-foreground/8 bg-foreground/[0.01] p-5">
                <h2 className="text-[13px] font-medium text-foreground/90">Things to know</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[13px] leading-relaxed text-foreground/60">
                  {evidence.caveats.map((c, i) => (
                    <li key={i}>
                      {c.text}
                      <SourceRefs urls={c.sources} index={refs.index} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content (if available) */}
            {tool.content && !hasCaveats && (
              <div className="rounded-lg border border-foreground/8 bg-foreground/[0.01] p-5">
                <h2 className="text-[13px] font-medium text-foreground/90">Details</h2>
                <div
                  className="prose prose-sm dark:prose-invert mt-3 max-w-none text-foreground/60"
                  dangerouslySetInnerHTML={{ __html: tool.content }}
                />
              </div>
            )}

            {/* Share & Feedback */}
            <div className="rounded-lg border border-foreground/8 bg-foreground/[0.01] p-5">
              <h2 className="text-[13px] font-medium text-foreground/90">Share & Feedback</h2>
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="h-8 border-foreground/12 text-[12px] brand2-focus" asChild>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${tool.name} - ${tool.tagline || "a privacy tool"} via @DefaultPrivacy`)}&url=${encodeURIComponent(`https://defaultprivacy.com/directory/${tool.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Share2 className="mr-1.5 h-3.5 w-3.5" />
                      Share
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 border-foreground/12 text-[12px] brand2-focus" asChild>
                    <a
                      href={`https://reddit.com/submit?url=${encodeURIComponent(`https://defaultprivacy.com/directory/${tool.slug}`)}&title=${encodeURIComponent(`${tool.name} - ${tool.tagline || "Privacy Tool"}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" />
                      Reddit
                    </a>
                  </Button>
                </div>
                <div className="h-px bg-foreground/8" />
                <div className="space-y-2">
                  <p className="text-[11px] text-foreground/45">
                    Help improve our directory
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="ghost" size="sm" className="h-8 text-[11px] text-foreground/60 brand2-focus hover:text-foreground/80" asChild>
                      <a href={`mailto:privacy@defaultprivacy.com?subject=Suggest Edit: ${encodeURIComponent(tool.name)}&body=${encodeURIComponent(`Tool: ${tool.name}\nURL: https://defaultprivacy.com/directory/${tool.slug}\n\nSuggested change:\n`)}`}>
                        <MessageSquarePlus className="mr-1.5 h-3.5 w-3.5" />
                        Suggest Edit
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-[11px] text-destructive brand2-focus hover:text-destructive" asChild>
                      <a href={`mailto:privacy@defaultprivacy.com?subject=Report Issue: ${encodeURIComponent(tool.name)}&body=${encodeURIComponent(`Tool: ${tool.name}\nURL: https://defaultprivacy.com/directory/${tool.slug}\n\nIssue:\n`)}`}>
                        <Flag className="mr-1.5 h-3.5 w-3.5" />
                        Report Issue
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Actions */}
            <div className="rounded-lg border border-foreground/8 bg-foreground/[0.01] p-4">
              <div className="space-y-3">
                {/* Privacy Score */}
                {tool.latestPrivacyScore !== null && (
                  <div className="border-b border-foreground/8 pb-4 text-center">
                    <p className="mb-1 text-[11px] text-foreground/50">Privacy Score</p>
                    <div
                      className={`text-3xl font-medium tabular-nums tracking-tight ${
                        tool.latestPrivacyScore >= 80
                          ? "text-success"
                          : tool.latestPrivacyScore >= 60
                            ? "text-caution"
                            : "text-destructive"
                      }`}
                    >
                      {tool.latestPrivacyScore}%
                    </div>
                  </div>
                )}

                <Button className="group w-full brand2-btn-primary brand2-focus" size="lg" asChild>
                  <OutboundLink
                    href={tool.websiteUrl}
                    className="inline-flex items-center justify-center"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Website
                    <ExternalLinkIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </OutboundLink>
                </Button>

                {tool.githubUrl && (
                  <Button variant="outline" className="w-full border-foreground/12 brand2-focus" asChild>
                    <a
                      href={`https://github.com/${tool.githubUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Source
                    </a>
                  </Button>
                )}

                {tool.subreddit && (
                  <Button variant="outline" className="w-full border-foreground/12 brand2-focus" asChild>
                    <a
                      href={`https://reddit.com/r/${tool.subreddit}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      r/{tool.subreddit}
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="rounded-lg border border-foreground/8 bg-foreground/[0.01] p-4">
              <h3 className="mb-3 text-[13px] font-medium text-foreground/90">Quick Info</h3>
              <div className="space-y-2">
                <InfoRow label="Open Source" value={tool.isOpenSource === true} type="boolean" urls={evidence.sources["trust.is_open_source"]?.urls} index={refs.index} />
                <div className="h-px bg-foreground/8" />
                <InfoRow label="Android App" value={!!showAndroid} type="boolean" urls={evidence.sources["platforms"]?.urls} index={refs.index} />
                <InfoRow label="iOS App" value={!!showIos} type="boolean" urls={evidence.sources["platforms"]?.urls} index={refs.index} />
                {tool.publishedAt && (
                  <>
                    <div className="h-px bg-foreground/8" />
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="flex items-center gap-1.5 text-foreground/50">
                        <Calendar className="h-3 w-3" />
                        Added
                      </span>
                      <span className="text-foreground/70">
                        {new Date(tool.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Sources */}
            {refs.urls.length > 0 && (
              <>
              <div className="rounded-lg border border-foreground/8 bg-foreground/[0.01] p-4">
                <h3 className="mb-3 text-[13px] font-medium text-foreground/90">Sources</h3>
                <ol className="space-y-1.5 text-[11px] text-foreground/60">
                  {refs.urls.map((u, i) => (
                    <li key={u} id={`source-${i + 1}`} className="break-all">
                      [{i + 1}]{" "}
                      <a href={u} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                        {sourceLabel(u)}
                      </a>{" "}
                      <span className="text-foreground/40">checked {new Date(refs.checked[i] + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="px-1 text-[11px] text-foreground/40">Each sourced fact links to the page we checked it against.</p>
              </>
            )}

            {/* Scan this tool */}
            <div className="rounded-lg border border-foreground/8 bg-foreground/[0.01] p-4">
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-foreground/8 bg-foreground/[0.02]">
                  <Shield className="h-4 w-4 text-foreground/50" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-foreground/90">Privacy Scanner</p>
                  <p className="text-[11px] text-foreground/50">
                    See what trackers this tool uses
                  </p>
                </div>
              </div>
              <Button className="group w-full brand2-btn-primary brand2-focus" asChild>
                <Link href={`/scanner?url=${encodeURIComponent(tool.websiteUrl)}`}>
                  Scan {tool.name}
                  <ArrowUpRight className="ml-2 h-4 w-4 brand2-arrow-nudge" />
                </Link>
              </Button>
            </div>

          </div>
        </div>

          {/* Related guides & stacks */}
          {relatedContent.length > 0 && (
            <section className="mt-12 border-t border-foreground/8 pt-10">
              <RelatedLinks title="Related guides & stacks" targets={relatedContent} />
            </section>
          )}

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <section className="mt-12 border-t border-foreground/8 pt-10">
              <h2 className="mb-6 text-lg font-medium tracking-tight text-foreground/90">
                More in {relatedCategory}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {relatedTools.map((relatedTool) => (
                  <ToolCard key={relatedTool.id} tool={relatedTool} />
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="border-foreground/12 brand2-focus" asChild>
                  <Link href={`/directory?category=${encodeURIComponent(relatedCategory ?? "")}`}>
                    View all {relatedCategory} tools
                  </Link>
                </Button>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

function InfoRow({
  label,
  value,
  type,
  urls,
  index,
  detail,
}: {
  label: string
  value: boolean | string | null
  type: "boolean" | "text"
  urls?: string[]
  index?: (url: string) => number
  detail?: string
}) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="text-foreground/50">
        {label}
        {value && index && <SourceRefs urls={urls} index={index} />}
      </span>
      {detail && value && <span className="mr-1.5 ml-auto text-foreground/60">{detail}</span>}
      {type === "boolean" ? (
        value ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
        ) : (
          // Most records only know when something is true: "no" was never checked, so say so.
          <span className="text-foreground/30" title="Not checked">—</span>
        )
      ) : (
        <span className="text-foreground/70">{value || "—"}</span>
      )}
    </div>
  )
}
