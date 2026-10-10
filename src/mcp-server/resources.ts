/**
 * MCP resources for the Default Privacy hub — browsable read-only collections
 * under `defaultprivacy://` URIs. Tools are for parameterized queries; resources
 * are for whole-collection reads an agent can enumerate.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

import { getCategoryGroups, getToolIdsInPublicCategories } from "@/lib/db/queries"
import { getAllGuides } from "@/lib/guides"
import { getAllGlossaryTerms } from "@/lib/glossary"
import { getAllStacks } from "@/lib/stacks"

import { url } from "./citation"

function jsonResource(uri: URL, payload: unknown) {
  return {
    contents: [
      {
        uri: uri.href,
        mimeType: "application/json",
        text: JSON.stringify(payload, null, 2),
      },
    ],
  }
}

export function registerResources(server: McpServer): void {
  server.registerResource(
    "categories",
    "defaultprivacy://categories",
    {
      title: "Directory categories",
      description: "All privacy tool category groups and subcategories with tool counts.",
      mimeType: "application/json",
    },
    async (uri) => {
      const groups = await getCategoryGroups()
      return jsonResource(uri, {
        groups: groups.map((g) => ({
          name: g.label,
          slug: g.slug,
          tool_count: g.total,
          subcategories: g.items,
        })),
      })
    },
  )

  server.registerResource(
    "guides",
    "defaultprivacy://guides",
    {
      title: "Guides index",
      description:
        "Index of long-form privacy how-tos, e.g. switching to GrapheneOS, data-broker removal, home address, running your own VPN.",
      mimeType: "application/json",
    },
    async (uri) => {
      const guides = await getAllGuides()
      return jsonResource(uri, {
        guides: guides.map((g) => ({
          title: g.title,
          slug: g.slug,
          description: g.description,
          category: g.category,
          difficulty: g.difficulty,
          time_to_complete: g.timeToComplete,
          url: url(`guides/${g.slug}`),
        })),
      })
    },
  )

  server.registerResource(
    "stacks",
    "defaultprivacy://stacks",
    {
      title: "Privacy stacks index",
      description: "Index of privacy stacks: curated sets of directory tools for one goal or threat.",
      mimeType: "application/json",
    },
    async (uri) => {
      const stacks = await getAllStacks()
      return jsonResource(uri, {
        stacks: stacks.map((s) => ({
          title: s.title,
          slug: s.slug,
          description: s.description,
          category: s.category,
          difficulty: s.difficulty,
          time_to_complete: s.timeToComplete,
          url: url(`stacks/${s.slug}`),
        })),
      })
    },
  )

  server.registerResource(
    "glossary",
    "defaultprivacy://glossary",
    {
      title: "Glossary index",
      description: "Index of all defined privacy and security terms.",
      mimeType: "application/json",
    },
    async (uri) => {
      const terms = await getAllGlossaryTerms()
      return jsonResource(uri, {
        terms: terms.map((t) => ({
          term: t.term,
          slug: t.slug,
          definition: t.definition,
          category: t.category,
          url: url(`glossary/${t.slug}`),
        })),
      })
    },
  )

  server.registerResource(
    "stats",
    "defaultprivacy://stats",
    {
      title: "Directory stats",
      description: "Aggregate counts for the public directory.",
      mimeType: "application/json",
    },
    async (uri) => {
      const [publicToolIds, groups] = await Promise.all([
        getToolIdsInPublicCategories(),
        getCategoryGroups(),
      ])
      return jsonResource(uri, {
        public_tools: publicToolIds.length,
        category_groups: groups.length,
        subcategories: groups.reduce((sum, g) => sum + g.items.length, 0),
      })
    },
  )
}
