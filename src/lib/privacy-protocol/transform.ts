/**
 * Privacy Protocol — DB row → PP object transformation
 *
 * Accepts a Drizzle tools row (with categories attached) and returns
 * a fully-shaped PrivacyProtocolTool ready for API responses.
 */

import type { InferSelectModel } from "drizzle-orm"
import type { tools } from "@/lib/db/schema"
import { env } from "@/lib/env"
import { pickInfo } from "@/lib/picks"
import type { Platform, PrivacyProtocolTool } from "./types"

export type ToolRowWithCategories = InferSelectModel<typeof tools> & {
  categories: { name: string; slug: string }[]
}

/** Most rows store github_url as "owner/repo"; the record promises a URL. */
export function sourceCodeUrl(raw: string | null | undefined): string | null {
  if (!raw) return null
  return /^https?:\/\//i.test(raw) ? raw : `https://github.com/${raw.replace(/^\/+/, "")}`
}

export function transformToPrivacyProtocol(row: ToolRowWithCategories): PrivacyProtocolTool {
  const baseUrl = env.NEXT_PUBLIC_URL

  return {
    pp_version: "1.1",
    id: row.slug,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline ?? null,
    description: row.description ?? null,
    website_url: row.websiteUrl,
    favicon_url: row.faviconUrl ?? null,
    screenshot_url: row.screenshotUrl ?? null,

    category: row.categories[0]?.slug ?? null,
    categories: row.categories.map((c) => c.slug),

    privacy: {
      jurisdiction: row.jurisdiction ?? null,
      jurisdiction_risk: row.jurisdictionRisk ?? null,
      data_retention: {
        logs_ip: row.logsIp ?? null,
        logs_metadata: row.logsMetadata ?? null,
      },
      encryption: {
        e2ee: row.e2ee ?? null,
        zero_knowledge: row.zeroKnowledge ?? null,
      },
      requires_pii: {
        email: row.requiresEmail ?? null,
        phone: row.requiresPhone ?? null,
        real_name: row.requiresRealName ?? null,
      },
    },

    trust: {
      is_open_source: row.isOpenSource ?? null,
      source_code_url: sourceCodeUrl(row.githubUrl),
    },

    payment: {
      has_free_tier: row.hasFreeTier ?? null,
    },

    platforms: (row.platforms ?? []) as Platform[],

    pick: (() => {
      const p = pickInfo(row.slug)
      return p ? { reason: p.reason, category: p.category } : null
    })(),

    meta: {
      last_verified: row.lastVerified?.toISOString() ?? null,
      created_at: row.createdAt.toISOString(),
      updated_at: row.updatedAt.toISOString(),
    },

    deprecated: row.isDeprecated
      ? { reason: row.deprecatedReason ?? null, since: row.deprecatedAt?.toISOString().split("T")[0] ?? null }
      : null,
    dp_url: `${baseUrl}/directory/${row.slug}`,
    citation: `Default Privacy (${baseUrl}/directory/${row.slug})`,
  }
}
