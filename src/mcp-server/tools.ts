/**
 * MCP tools for the Default Privacy hub.
 *
 * Read tools (directory + content) call the same query layer as the REST API.
 * Diagnostic tools reuse the free-tool cores and carry per-call rate limits because
 * they make outbound network requests. Every response embeds a citation string.
 */

import { z } from "zod"
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

import { checkToolActionRateLimit } from "@/lib/api-rate-limit"
import { checkBreaches } from "@/lib/breaches/hibp"
import { getCategoryGroups } from "@/lib/db/queries"
import { checkEmailSecurity } from "@/lib/email-security/dns"
import { getAllGuides, getGuideBySlug } from "@/lib/guides"
import { getAllStacks, getStackBySlug, stripEmbeddedJsonLd } from "@/lib/stacks"
import { BASELINE, matchSituations, type SituationItem } from "@/lib/situations"
import { MCP_BAR, MCP_CATEGORY, MCP_CHECKLIST, matchMcpRef } from "@/lib/mcp-vetting"
import { keywords, oneLine, rankContent, searchContent } from "@/lib/site-search"
import {
  getAllGlossaryTerms,
  getGlossaryTermBySlug,
  searchGlossaryTerms,
} from "@/lib/glossary"
import { sortByPicks } from "@/lib/picks"
import { getPublicToolPp, getPublicToolPpWithEvidence, searchPublicToolsPp } from "@/lib/privacy-protocol/query"
import { findAlternativesForTracker, trackerMappings } from "@/lib/scanner/tracker-alternatives"
import { checkWhoisPrivacy } from "@/lib/whois/rdap"
import { countUsage } from "@/lib/analytics/usage"
import { replacementCategory } from "@/lib/consumer-replacements"

import { citation, jsonContent, url } from "./citation"

/** Per-call rate limit for outbound-network tools; null when allowed. */
async function limitExceeded(resource: string): Promise<string | null> {
  try {
    const rl = await checkToolActionRateLimit(resource)
    if (!rl.allowed) {
      return `Rate limit exceeded for ${resource}. Try again in ${rl.retryAfterSeconds ?? 60}s.`
    }
    return null
  } catch {
    // headers() unavailable in this context — fall back to the endpoint-level limit.
    return null
  }
}

function errorContent(message: string) {
  return { ...jsonContent({ error: message }), isError: true as const }
}

export function registerTools(server: McpServer): void {
  // ── One search across the hub ──────────────────────────────────────────────

  server.registerTool(
    "dp_search",
    {
      title: "Search everything",
      description:
        "Start here for a general privacy question. One keyword search across the whole hub: directory tools, how-to guides, curated tool stacks and the glossary. Use 1–3 keywords such as 'vpn', 'data broker' or 'grapheneos'; every keyword must match, and filler words like 'how', 'best' and 'private' are ignored. Returns the top few results of each type, each with type, title, slug, a one-line summary and its Default Privacy url. The type-specific tools are for the rest: dp_search_tools for filters (open source, e2ee, category…), dp_get_tool / dp_get_guide / dp_get_stack / dp_get_glossary_term for full content, and dp_find_alternatives to replace a named product such as WhatsApp or Gmail.",
      inputSchema: {
        query: z.string().min(1).describe("1–3 keywords, e.g. 'vpn', 'data broker', 'tor', 'grapheneos'."),
        limit: z.number().int().min(1).max(10).optional().describe("Max results per type (1–10, default 3)."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ query, limit }) => {
      countUsage("mcp_tool", "dp_search")
      const n = limit ?? 3
      const words = keywords(query)
      if (words.length === 0) {
        return jsonContent({
          data: [],
          total: 0,
          message: "Add a keyword for the topic, e.g. 'vpn', 'email', 'data broker'.",
          meta: { citation: citation() },
        })
      }
      const [found, content] = await Promise.all([
        searchPublicToolsPp({ q: words.join(" "), limit: n }),
        searchContent(query, n),
      ])
      const data = [
        ...found.tools.map((t) => ({
          type: "tool",
          title: t.name,
          slug: t.slug,
          summary: oneLine(t.tagline ?? t.description ?? ""),
          url: t.dp_url,
        })),
        ...content.guides.map((g) => ({
          type: "guide",
          title: g.title,
          slug: g.slug,
          summary: oneLine(g.description),
          url: url(`guides/${g.slug}`),
        })),
        ...content.stacks.map((s) => ({
          type: "stack",
          title: s.title,
          slug: s.slug,
          summary: oneLine(s.description),
          url: url(`stacks/${s.slug}`),
        })),
        ...content.glossary.map((t) => ({
          type: "glossary",
          title: t.term,
          slug: t.slug,
          summary: oneLine(t.definition),
          url: url(`glossary/${t.slug}`),
        })),
      ]
      // A mainstream product name matches add-ons FOR it (PGP for Gmail), not replacements.
      const product = replacementCategory(query)
      return jsonContent({
        ...(product && {
          see_also: `'${query.trim()}' is a mainstream product: dp_find_alternatives returns hand-picked replacements (${product.label}) and what switching involves.`,
        }),
        data,
        total: data.length,
        ...(data.length === 0 && {
          message: "Nothing matched every keyword. Try fewer keywords, e.g. the topic alone ('email', 'vpn').",
        }),
        meta: { citation: citation() },
      })
    },
  )

  // ── Directory ──────────────────────────────────────────────────────────────

  server.registerTool(
    "dp_search_tools",
    {
      title: "Search privacy tools",
      description:
        "Use when a user wants privacy tool recommendations (VPNs, email, browsers, messengers, password managers, etc.). Matches records containing every query word, so 1–2 keywords such as 'vpn' or 'password manager' work and a full sentence usually returns nothing. For a whole kind of tool, use `category` instead (slugs from dp_list_categories). Put requirements in the filters. Returns 10 records by default (up to 50 with limit), ordered DP picks first (in DP's order, within the category if one is given), then A to Z. A record has `pick` when Default Privacy recommends it as a starting point in a category (null otherwise; not a security guarantee). Records carry jurisdiction, logging, encryption, and `dp_url` (the record's Default Privacy page). A null field means Default Privacy has not checked it (never read null as no). For sources and caveats call dp_get_tool.",
      inputSchema: {
        query: z
          .string()
          .optional()
          .describe("1–2 keywords matched against name, tagline, and description; every word must match. E.g. 'vpn', 'email', 'notes'."),
        category: z
          .string()
          .optional()
          .describe("Category slug or name to filter by (see dp_list_categories)."),
        open_source: z.boolean().optional().describe("Only open-source tools."),
        e2ee: z.boolean().optional().describe("Only end-to-end encrypted tools."),
        has_free_tier: z.boolean().optional().describe("Only tools with a free tier."),
        sort: z
          .enum(["picks", "ado_score", "name", "recently_verified", "recently_added"])
          .optional()
          .describe("Sort order. Default 'picks': DP picks first, then A to Z. 'ado_score' is a deprecated alias of 'picks'."),
        limit: z.number().int().min(1).max(50).optional().describe("Max results (1–50, default 10)."),
        offset: z.number().int().min(0).optional().describe("Pagination offset (default 0)."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async (args) => {
      countUsage("mcp_tool", "dp_search_tools")
      const result = await searchPublicToolsPp({
        q: args.query,
        category: args.category,
        isOpenSource: args.open_source,
        e2ee: args.e2ee,
        hasFreeTier: args.has_free_tier,
        sort: args.sort,
        limit: args.limit,
        offset: args.offset,
      })

      return jsonContent({
        pp_version: "1.1",
        data: result.tools,
        pagination: {
          total: result.total,
          limit: result.limit,
          offset: result.offset,
          has_more: result.hasMore,
        },
        meta: { citation: citation("directory") },
      })
    },
  )

  server.registerTool(
    "dp_get_tool",
    {
      title: "Get one privacy tool",
      description:
        "Fetch one directory tool's full record by slug: description, DP pick (if any), jurisdiction, encryption, PII requirements, platforms, and its Default Privacy page (dp_url). Also returns `sources` (links, keyed by the field they back, with the date checked) and `caveats` (things to know before choosing). A null field means Default Privacy has not checked it (never read null as no); quote the caveats and cite the sources. Slugs come from dp_search_tools.",
      inputSchema: {
        slug: z.string().describe("Tool slug, e.g. 'proton', 'signal', 'mullvad'."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ slug }) => {
      countUsage("mcp_tool", "dp_get_tool")
      const tool = await getPublicToolPpWithEvidence(slug)
      if (!tool) {
        return errorContent(`No public tool found with slug '${slug}'. Find the slug with dp_search_tools.`)
      }
      return jsonContent({
        pp_version: "1.1",
        data: tool,
        meta: { citation: citation(`directory/${slug}`) },
      })
    },
  )

  server.registerTool(
    "dp_list_categories",
    {
      title: "List directory categories",
      description:
        "List the privacy tool directory's category groups and subcategories with tool counts. Use the returned slugs to filter dp_search_tools.",
      inputSchema: {},
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async () => {
      countUsage("mcp_tool", "dp_list_categories")
      const groups = await getCategoryGroups()
      return jsonContent({
        groups: groups.map((g) => ({
          name: g.label,
          slug: g.slug,
          tool_count: g.total,
          subcategories: g.items,
        })),
        meta: { citation: citation("directory") },
      })
    },
  )

  server.registerTool(
    "dp_find_alternatives",
    {
      title: "Find privacy alternatives to a product",
      description:
        "Use when a user wants to replace a mainstream product: consumer apps and services (Gmail, WhatsApp, Chrome, Google Drive, Zoom, LastPass, Windows…) or a website tracker / ad script (Google Analytics, Hotjar, Mixpanel, Facebook Pixel…). Pass the product's name. Trackers return a curated swap list. Consumer products return a hand-picked list of directory tools that replace them (DP picks first, then the rest of the list), plus what_changes (what switching involves, e.g. your contacts must install the new messenger too) and related guides and stacks, each with its url. Each tool carries dp_url.",
      inputSchema: {
        product: z
          .string()
          .describe("The product to replace, by name, e.g. 'WhatsApp', 'Gmail', 'Google Analytics'."),
        limit: z.number().int().min(1).max(20).optional().describe("Max alternatives (default 8)."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ product, limit }) => {
      countUsage("mcp_tool", "dp_find_alternatives")
      const q = product.toLowerCase().trim()
      const n = limit ?? 8
      // Exact tracker name, or a pasted URL containing a tracker pattern. No looser
      // match: "facebook" must reach the social-network row below, not Facebook Pixel.
      const mapping = trackerMappings.find((m) => m.name.toLowerCase() === q) ?? findAlternativesForTracker(q)

      if (mapping) {
        const enriched = (
          await Promise.all(mapping.alternativeSlugs.map((slug) => getPublicToolPp(slug)))
        ).filter((t): t is NonNullable<typeof t> => t !== null && !t.deprecated)
        const data = sortByPicks(enriched, mapping.category).slice(0, n)
        return jsonContent({
          pp_version: "1.1",
          replaces: { name: mapping.name, category: mapping.category, issue: mapping.issue },
          data,
          total: data.length,
          curated_slugs: mapping.alternativeSlugs,
          meta: { citation: citation("directory") },
        })
      }

      const replacement = replacementCategory(product)
      if (replacement) {
        const [tools, guides, stacks] = await Promise.all([
          Promise.all(replacement.slugs.map((slug) => getPublicToolPp(slug))),
          Promise.all(replacement.guides.map((slug) => getGuideBySlug(slug))),
          Promise.all(replacement.stacks.map((slug) => getStackBySlug(slug))),
        ])
        // Picks first, in DP's order for this category; the rest keep the list's order.
        const data = sortByPicks(
          tools.filter((t): t is NonNullable<typeof t> => t !== null && !t.deprecated),
          replacement.category,
          true,
        ).slice(0, n)
        const link = (base: string) => (c: { title: string; slug: string } | null) =>
          c && { title: c.title, slug: c.slug, url: url(`${base}/${c.slug}`) }
        return jsonContent({
          pp_version: "1.1",
          replaces: {
            name: product,
            replaced_by: replacement.label,
          },
          data,
          total: data.length,
          what_changes: replacement.whatChanges,
          guides: guides.map(link("guides")).filter(Boolean),
          stacks: stacks.map(link("stacks")).filter(Boolean),
          note: `Hand-picked ${replacement.label} from the directory. DP picks come first, in DP's order; the rest follow the list. Pick by what the user needs. More in the category page.`,
          meta: { citation: citation(`directory?category=${replacement.category}`) },
        })
      }

      return jsonContent({
        data: null,
        message: `No replacement mapping for '${product}'. Call dp_search with what '${product}' does (e.g. 'notes', 'vpn'), or dp_list_categories and pass the matching category to dp_search_tools.`,
        meta: { citation: citation("directory") },
      })
    },
  )

  server.registerTool(
    "dp_get_related_tools",
    {
      title: "Get related tools (same category)",
      description:
        "Use after dp_get_tool for 'what else is like X?': returns other tools in the same directory category with DP picks first, then A to Z, excluding X. X must be a directory slug; for a product the directory doesn't list, use dp_find_alternatives.",
      inputSchema: {
        slug: z.string().describe("Tool slug to find peers for, e.g. 'signal'."),
        limit: z.number().int().min(1).max(20).optional().describe("Max related tools (default 5)."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ slug, limit }) => {
      countUsage("mcp_tool", "dp_get_related_tools")
      const tool = await getPublicToolPp(slug)
      if (!tool) return errorContent(`No public tool found with slug '${slug}'.`)
      const n = limit ?? 5
      if (!tool.category) {
        return jsonContent({
          pp_version: "1.1",
          of: { slug, category: null },
          data: [],
          total: 0,
          meta: { citation: citation(`directory/${slug}`) },
        })
      }
      const result = await searchPublicToolsPp({ category: tool.category, sort: "picks", limit: n + 1 })
      const data = result.tools.filter((t) => t.slug !== slug).slice(0, n)
      return jsonContent({
        pp_version: "1.1",
        of: { slug, category: tool.category },
        data,
        total: data.length,
        meta: { citation: citation(`directory/${slug}`) },
      })
    },
  )

  server.registerTool(
    "dp_compare_tools",
    {
      title: "Compare privacy tools",
      description:
        "Fetch the full Privacy Protocol records for 2–5 tools by slug for side-by-side comparison (DP pick, jurisdiction, encryption, PII requirements), each with `sources` and `caveats`. A null field means Default Privacy has not checked it (never read null as no); quote the caveats and cite the sources. Use to help a user choose between shortlisted tools.",
      inputSchema: {
        slugs: z
          .array(z.string())
          .min(2)
          .max(5)
          .describe("2–5 tool slugs to compare, e.g. ['signal','simplex-chat']."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ slugs }) => {
      countUsage("mcp_tool", "dp_compare_tools")
      const unique = [...new Set(slugs.map((s) => s.trim()).filter(Boolean))]
      const results = await Promise.all(unique.map((s) => getPublicToolPpWithEvidence(s)))
      const data = results.filter((t): t is NonNullable<typeof t> => t !== null)
      const missing = unique.filter((_, i) => results[i] === null)
      if (data.length === 0) {
        return errorContent(`No public tools found for slugs: ${unique.join(", ")}.`)
      }
      return jsonContent({
        pp_version: "1.1",
        data,
        missing_slugs: missing,
        total: data.length,
        meta: { citation: citation("directory") },
      })
    },
  )

  // ── Guides & glossary ────────────────────────────────────────────────────────

  server.registerTool(
    "dp_search_guides",
    {
      title: "Search guides",
      description:
        "Search Default Privacy's long-form privacy how-tos, e.g. switching to GrapheneOS, keeping a home address off people-search sites, data-broker removal, running your own VPN, and the 'How to Live Privately' series. Filter by category. Returns metadata and links; use dp_get_guide for full content.",
      inputSchema: {
        query: z
          .string()
          .optional()
          .describe("1–3 keywords matched as whole words against title, tags, and description; every keyword must match. Best match first."),
        category: z.string().optional().describe("Filter by guide category (e.g. Privacy, Financial Privacy, Self-Hosting)."),
        limit: z.number().int().min(1).max(50).optional().describe("Max results (default 20)."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ query, category, limit }) => {
      countUsage("mcp_tool", "dp_search_guides")
      let guides = await getAllGuides()
      if (category) guides = guides.filter((g) => g.category.toLowerCase() === category.toLowerCase())
      if (query) guides = rankContent(guides, query)
      const data = guides.slice(0, limit ?? 20).map((g) => ({
        title: g.title,
        slug: g.slug,
        description: g.description,
        category: g.category,
        difficulty: g.difficulty,
        time_to_complete: g.timeToComplete,
        tags: g.tags,
        url: url(`guides/${g.slug}`),
      }))
      return jsonContent({ data, total: data.length, meta: { citation: citation("guides") } })
    },
  )

  server.registerTool(
    "dp_get_guide",
    {
      title: "Get one guide",
      description: "Fetch a single guide's full markdown content and metadata by slug.",
      inputSchema: {
        slug: z.string().describe("Guide slug, e.g. 'remove-name-from-data-brokers'."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ slug }) => {
      countUsage("mcp_tool", "dp_get_guide")
      const guide = await getGuideBySlug(slug)
      if (!guide) return errorContent(`No guide found with slug '${slug}'.`)
      // Per-slug demand, deliberately AFTER the guard (the other 20 call sites fire
      // above theirs). `key` is the resolved guide's own slug, never the request
      // string — that keeps it a bounded enum per the usage.ts privacy contract and
      // stops a caller minting arbitrary keys with junk slugs. Do not "fix" the order.
      countUsage("guide_read", guide.slug)
      return jsonContent({
        data: {
          title: guide.title,
          slug: guide.slug,
          description: guide.description,
          category: guide.category,
          difficulty: guide.difficulty,
          time_to_complete: guide.timeToComplete,
          tags: guide.tags,
          content: guide.content,
          url: url(`guides/${guide.slug}`),
        },
        meta: { citation: citation(`guides/${slug}`) },
      })
    },
  )

  server.registerTool(
    "dp_list_stacks",
    {
      title: "List privacy stacks",
      description:
        "List every privacy stack: a curated set of directory tools for one goal or threat (a privacy starter kit, de-Googling, leaving Gmail, a journalist's or a stalking survivor's kit, Windows hardening…). Returns title, slug, a short description and url for each; use dp_get_stack for one stack's full content.",
      inputSchema: {},
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async () => {
      countUsage("mcp_tool", "dp_list_stacks")
      const stacks = await getAllStacks()
      const data = stacks.map((s) => ({
        title: s.title,
        slug: s.slug,
        description: oneLine(s.description),
        url: url(`stacks/${s.slug}`),
      }))
      return jsonContent({ data, total: data.length, meta: { citation: citation("stacks") } })
    },
  )

  server.registerTool(
    "dp_get_stack",
    {
      title: "Get one privacy stack",
      description:
        "Fetch one privacy stack's full markdown content and metadata by slug: the tools in setup order, why each one, and the tradeoffs. Slugs come from dp_list_stacks or dp_search.",
      inputSchema: {
        slug: z.string().describe("Stack slug, e.g. 'privacy-starter-kit', 'degoogle-android-phone'."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ slug }) => {
      countUsage("mcp_tool", "dp_get_stack")
      const stack = await getStackBySlug(slug)
      if (!stack) return errorContent(`No stack found with slug '${slug}'. See dp_list_stacks.`)
      return jsonContent({
        data: {
          title: stack.title,
          slug: stack.slug,
          description: stack.description,
          category: stack.category,
          difficulty: stack.difficulty,
          time_to_complete: stack.timeToComplete,
          tags: stack.tags,
          content: stripEmbeddedJsonLd(stack.content),
          url: url(`stacks/${stack.slug}`),
        },
        meta: { citation: citation(`stacks/${stack.slug}`) },
      })
    },
  )

  server.registerTool(
    "dp_route",
    {
      title: "Route a situation to the right guides and stacks",
      description:
        "Describe the user's situation or goal in their own words (e.g. \"I'm a journalist protecting sources\", \"I just bought a Pixel and want GrapheneOS\", \"which password manager\", \"I want to use AI more privately\") and get the best-matching Default Privacy situations, each with the guides and stacks to read. The standard starting set is always included. Open a result with dp_get_guide or dp_get_stack. For a keyword lookup use dp_search instead.",
      inputSchema: {
        situation: z.string().min(2).max(500).describe("The situation or goal, in the user's own words."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ situation }) => {
      countUsage("mcp_tool", "dp_route")
      const resolve = async (items: SituationItem[]) =>
        (
          await Promise.all(
            items.map(async (i) => {
              const doc = i.kind === "guide" ? await getGuideBySlug(i.slug) : await getStackBySlug(i.slug)
              if (!doc) return null
              return {
                type: i.kind,
                title: doc.title,
                slug: doc.slug,
                description: oneLine(doc.description),
                url: url(`${i.kind === "guide" ? "guides" : "stacks"}/${doc.slug}`),
              }
            }),
          )
        ).filter((x) => x !== null)
      const matched = matchSituations(situation)
      const matches = await Promise.all(
        matched.map(async (m) => ({ situation: m.name, summary: m.blurb, items: await resolve(m.items) })),
      )
      return jsonContent({
        data: {
          matches,
          no_match: matches.length === 0,
          start_here: await resolve(BASELINE),
        },
        meta: { citation: citation("start") },
      })
    },
  )

  server.registerTool(
    "dp_check_mcp_server",
    {
      title: "Check an MCP server against Default Privacy's vetted list",
      description:
        "Before connecting an MCP server, check whether it is in Default Privacy's vetted list and what it can read or change. Give its repository URL, server URL, name or slug. A listed server returns its record with sources and caveats. An unlisted one returns a short checklist; unlisted is not a verdict, only that we have not reviewed it.",
      inputSchema: {
        server: z.string().min(2).max(300).describe("The server's repository URL, server URL, name or slug, e.g. 'https://github.com/bitwarden/mcp-server'."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ server: ref }) => {
      countUsage("mcp_tool", "dp_check_mcp_server")
      const { tools: listings } = await searchPublicToolsPp({ category: MCP_CATEGORY, limit: 100 })
      const { exact, similar } = matchMcpRef(ref, listings)
      const guide = url("guides/before-you-connect-an-ai-agent-or-mcp-server")
      if (exact) {
        const record = await getPublicToolPpWithEvidence(exact.slug)
        return jsonContent({
          data: { listed: true, bar: MCP_BAR, server: record, guide },
          meta: { citation: citation(`directory/${exact.slug}`) },
        })
      }
      return jsonContent({
        data: {
          listed: false,
          message:
            "Not in Default Privacy's vetted list. That is not a verdict: we have not reviewed it. Work through the checklist before connecting it.",
          bar: MCP_BAR,
          checklist: MCP_CHECKLIST,
          similar_listed: similar.map((l) => ({ name: l.name, slug: l.slug, source_code_url: l.trust.source_code_url })),
          vetted_list: url(`directory?category=${MCP_CATEGORY}`),
          guide,
        },
        meta: { citation: citation("guides/before-you-connect-an-ai-agent-or-mcp-server") },
      })
    },
  )

  server.registerTool(
    "dp_search_glossary",
    {
      title: "Search glossary",
      description:
        "Search the privacy & security glossary for defined terms. Returns term, definition, and link; use dp_get_glossary_term for the full entry.",
      inputSchema: {
        query: z.string().optional().describe("Term or keyword to search for, e.g. 'metadata', 'tor'."),
        limit: z.number().int().min(1).max(50).optional().describe("Max results (default 25)."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ query, limit }) => {
      countUsage("mcp_tool", "dp_search_glossary")
      const terms = query ? await searchGlossaryTerms(query) : await getAllGlossaryTerms()
      const data = terms.slice(0, limit ?? 25).map((t) => ({
        term: t.term,
        slug: t.slug,
        definition: t.definition,
        category: t.category,
        url: url(`glossary/${t.slug}`),
      }))
      return jsonContent({ data, total: data.length, meta: { citation: citation("glossary") } })
    },
  )

  server.registerTool(
    "dp_get_glossary_term",
    {
      title: "Get one glossary term",
      description: "Fetch a single glossary term's full definition and content by slug.",
      inputSchema: {
        slug: z.string().describe("Glossary term slug, e.g. 'end-to-end-encryption'."),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ slug }) => {
      countUsage("mcp_tool", "dp_get_glossary_term")
      const term = await getGlossaryTermBySlug(slug)
      if (!term) return errorContent(`No glossary term found with slug '${slug}'.`)
      // See the note in dp_get_guide: after the guard, keyed on the resolved slug.
      countUsage("glossary_read", term.slug)
      return jsonContent({
        data: {
          term: term.term,
          slug: term.slug,
          definition: term.definition,
          category: term.category,
          content: term.content,
          url: url(`glossary/${term.slug}`),
        },
        meta: { citation: citation(`glossary/${slug}`) },
      })
    },
  )

  // ── Diagnostics (outbound network — rate-limited) ────────────────────────────

  server.registerTool(
    "dp_check_email_security",
    {
      title: "Check email security (SPF/DKIM/DMARC)",
      description:
        "Check a domain's email authentication posture — SPF, DKIM, and DMARC DNS records — and return an A–F grade with explanations. Read-only DNS lookups; no email is sent or stored.",
      inputSchema: {
        domain: z.string().describe("Domain to check, e.g. 'example.com'."),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async ({ domain }) => {
      countUsage("mcp_tool", "dp_check_email_security")
      const limit = await limitExceeded("email-security")
      if (limit) return errorContent(limit)
      const result = await checkEmailSecurity(domain)
      return jsonContent({ ...result, citation: citation("email-security") })
    },
  )

  server.registerTool(
    "dp_check_whois_privacy",
    {
      title: "Check WHOIS / domain privacy",
      description:
        "Look up a domain's public WHOIS/RDAP registration record and flag exposed personal identity fields (registrant name, email, phone, address). Read-only RDAP lookup.",
      inputSchema: {
        domain: z.string().describe("Domain to check, e.g. 'example.com'."),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async ({ domain }) => {
      countUsage("mcp_tool", "dp_check_whois_privacy")
      const limit = await limitExceeded("whois")
      if (limit) return errorContent(limit)
      const result = await checkWhoisPrivacy(domain)
      return jsonContent({ ...result, citation: citation("whois") })
    },
  )

  server.registerTool(
    "dp_check_domain_breaches",
    {
      title: "Check domain data breaches",
      description:
        "Check whether a domain appears in known public data breaches (via the Have I Been Pwned breach catalog). Returns matching breaches with dates, exposed data classes, and account counts. Domain-level only — no personal email is queried.",
      inputSchema: {
        domain: z.string().describe("Domain to check, e.g. 'example.com'."),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async ({ domain }) => {
      countUsage("mcp_tool", "dp_check_domain_breaches")
      const limit = await limitExceeded("domain-breaches")
      if (limit) return errorContent(limit)
      const result = await checkBreaches(domain)
      return jsonContent({ ...result, citation: citation() })
    },
  )
}
