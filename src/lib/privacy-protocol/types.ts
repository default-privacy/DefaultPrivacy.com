/**
 * Privacy Protocol (PP) v1.1 — TypeScript types
 *
 * The canonical schema for machine-readable privacy tool data.
 * AI agents consume these types when querying the Default Privacy directory.
 */

export type JurisdictionRisk = "low" | "medium" | "high" | "five_eyes" | "fourteen_eyes"

export type Platform =
  | "web"
  | "ios"
  | "android"
  | "macos"
  | "windows"
  | "linux"
  | "browser_extension"
  | "cli"
  | "self_hostable"

/** Where a fact comes from. Present on single-tool responses only. */
export type PpSource = { urls: string[]; checked: string; note: string | null }
export type PpCaveat = { text: string; sources: string[]; checked: string }

export type PrivacyProtocolTool = {
  pp_version: "1.1"
  id: string           // slug
  name: string
  slug: string
  tagline: string | null
  description: string | null
  website_url: string
  favicon_url: string | null
  screenshot_url: string | null

  // Categorization
  category: string | null        // primary category slug
  categories: string[]           // all category slugs

  privacy: {
    jurisdiction: string | null  // ISO 3166-1 alpha-2
    jurisdiction_risk: JurisdictionRisk | null
    data_retention: {
      logs_ip: boolean | null
      logs_metadata: boolean | null
    }
    encryption: {
      e2ee: boolean | null
      zero_knowledge: boolean | null
    }
    requires_pii: {
      email: boolean | null
      phone: boolean | null
      real_name: boolean | null
    }
  }

  trust: {
    /** null = Default Privacy has not checked it (never read as "no"). */
    is_open_source: boolean | null
    source_code_url: string | null
  }

  payment: {
    has_free_tier: boolean | null
  }

  platforms: Platform[]

  /** Set when Default Privacy recommends this tool as a starting point in a category. */
  pick: { reason: string; category: string } | null

  meta: {
    last_verified: string | null
    created_at: string
    updated_at: string
  }

  /**
   * Single-tool responses only. `sources` is keyed by the field's path in this record (for
   * example "privacy.jurisdiction"); `caveats` are things to know before choosing the tool.
   * Quote the caveats and cite the sources.
   */
  sources?: Record<string, PpSource>
  caveats?: PpCaveat[]

  /** Set when the listing is retired (dead, archived or sold); null otherwise. */
  deprecated: { reason: string | null; since: string | null } | null
  /** This tool's Default Privacy page — the link to cite, not website_url. */
  dp_url: string
  citation: string
}

export type PrivacyProtocolCategory = {
  pp_version: "1.0"
  id: string
  name: string
  slug: string
  description: string | null
  parent_id: string | null
  sort_order: number
  tool_count: number
}

// API response envelopes

export type PpToolResponse = {
  pp_version: "1.1"
  data: PrivacyProtocolTool
  meta: {
    retrieved_at: string
    cache_ttl: number
    citation: string
  }
}

export type PpToolListResponse = {
  pp_version: "1.1"
  query: {
    q?: string
    category?: string
    filters: Record<string, unknown>
    sort: string
    limit: number
    offset: number
  }
  data: PrivacyProtocolTool[]
  pagination: {
    total: number
    page: number
    per_page: number
    has_more: boolean
  }
  meta: {
    retrieved_at: string
    citation: string
  }
}

export type PpCategoriesResponse = {
  pp_version: "1.0"
  data: PrivacyProtocolCategory[]
  meta: {
    retrieved_at: string
    total: number
  }
}
