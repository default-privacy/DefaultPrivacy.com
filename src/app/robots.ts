import type { MetadataRoute } from "next"
import { getCanonicalSiteUrl } from "@/lib/site-url"

const BASE_URL = getCanonicalSiteUrl()

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/api/mcp", "/api/v1/", "/api/directory/"],
        // Block faceted-nav permutations (?search=/category=/tags=/f=/sort=/page=…).
        // Each combo is a fresh dynamic render that wakes the DB; crawlers spidering
        // them keep Neon from scaling to zero. `/*?` blocks all query-string URLs; the
        // explicit /api/* allows above out-rank it (longer match wins) so the agent
        // API surface stays reachable.
        disallow: ["/admin/", "/api/", "/*?"],
      },
      {
        // Live-retrieval / citation bots: they answer a user's question in the
        // moment and cite us with a backlink → referral traffic + brand presence.
        // Keep content + the agent API open to these (this IS the AI-agent-ready
        // thesis); only the facet permutations (/*?) are withheld.
        userAgent: [
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "Claude-Web",
        ],
        allow: [
          "/",
          "/glossary/",
          "/tools/",
          "/directory/",
          "/guides/",
          "/stacks/",
          "/privacy-score",
          "/llms.txt",
          "/llms-full.txt",
          "/api/mcp",
          "/api/v1/",
          "/api/directory/",
        ],
        disallow: ["/admin/", "/api/", "/*?"],
      },
      {
        // Pure training scrapers: bulk-ingest our verified data into model weights
        // and give nothing back (no live query, no citation, no referral). Letting
        // them scrape trains a competitor to answer "recommend a private VPN" from
        // baked-in DP data WITHOUT calling our API — cannibalizing the exact
        // real-time relationship the thesis monetizes. Full disallow.
        userAgent: [
          "GPTBot",
          "Google-Extended",
          "ClaudeBot",
          "anthropic-ai",
          "Applebot-Extended",
          "cohere-ai",
          "Bytespider",
          "Amazonbot",
          "Meta-ExternalAgent",
        ],
        disallow: ["/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
