import type { MetadataRoute } from "next"
import { getAllGuides } from "@/lib/guides"
import { getAllStacks } from "@/lib/stacks"
import { getAllGlossaryTerms } from "@/lib/glossary"
import { getToolSlugs } from "@/lib/db/queries"
import { getCanonicalSiteUrl } from "@/lib/site-url"

const BASE_URL = getCanonicalSiteUrl()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // No lastModified on these: they change per deploy, not on a known date. Stamping
  // build-time `now` on every deploy is fabricated freshness (crawlers discount it) —
  // omit it and let changeFrequency/priority carry the hint. Content routes below use
  // real dates (guide/stack frontmatter, tool.updatedAt).
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/directory`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/tools`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/start`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/guides`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/stacks`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/glossary`, changeFrequency: "weekly", priority: 0.7 },
    // Free tools
    { url: `${BASE_URL}/scanner`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/password-check`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/breach-check`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE_URL}/dns-leak`, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE_URL}/email-security`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/whois`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy-score`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/exposed`, changeFrequency: "monthly", priority: 0.6 },
    // Company
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/methodology`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/how-we-pick`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/editorial-policy`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/transparency`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/ai`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/mcp-scan`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ]

  const [guides, stacks, glossaryTerms, toolSlugs] = await Promise.all([
    getAllGuides(),
    getAllStacks(),
    getAllGlossaryTerms(),
    getToolSlugs(),
  ])

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt ?? guide.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const stackPages: MetadataRoute.Sitemap = stacks.map((stack) => ({
    url: `${BASE_URL}/stacks/${stack.slug}`,
    lastModified: new Date(stack.updatedAt ?? stack.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Glossary terms carry no date (no frontmatter date field) — omit lastModified
  // rather than stamp a fabricated build-time value on all ~575 entries.
  const glossaryPages: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${BASE_URL}/glossary/${term.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map(({ slug, updatedAt }) => ({
    url: `${BASE_URL}/directory/${slug}`,
    lastModified: updatedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  return [...staticPages, ...guidePages, ...stackPages, ...glossaryPages, ...toolPages]
}
