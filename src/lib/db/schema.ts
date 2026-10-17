/**
 * Drizzle ORM Schema for Default Privacy v5
 * The formation-free hub: directory (tools/categories/tags), free-tool scans, and usage counters.
 */

import { relations } from "drizzle-orm"
import {
  boolean,
  date,
  index,
  integer,
  json,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core"

// ═══════════════════════════════════════════════════════════════════════════
// ENUMS
// ═══════════════════════════════════════════════════════════════════════════

export const toolStatusEnum = pgEnum("tool_status", ["Draft", "Scheduled", "Published", "Pending"])
export const privacyGradeEnum = pgEnum("privacy_grade", ["A", "B", "C", "D", "F"])
// Privacy Protocol Enums
export const jurisdictionRiskEnum = pgEnum("jurisdiction_risk", ["low", "medium", "high", "five_eyes", "fourteen_eyes"])
export const categoryVisibilityEnum = pgEnum("category_visibility", ["public", "archived", "review"])

// ═══════════════════════════════════════════════════════════════════════════
// TOOLS & DIRECTORY (Ported from V2)
// ═══════════════════════════════════════════════════════════════════════════

export const tools = pgTable("tools", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  websiteUrl: text("website_url").notNull().unique(),
  affiliateUrl: text("affiliate_url"),
  tagline: text("tagline"),
  description: text("description"),
  content: text("content"),
  faviconUrl: text("favicon_url"),
  screenshotUrl: text("screenshot_url"),

  lastAuditedAt: timestamp("last_audited_at"),
  
  // Deprecation
  isDeprecated: boolean("is_deprecated").default(false).notNull(),
  deprecatedReason: text("deprecated_reason"),
  deprecatedAt: timestamp("deprecated_at"),
  alternativeToolId: text("alternative_tool_id"),
  
  // Social
  githubUrl: text("github_url"),
  subreddit: text("subreddit"),
  
  // Status
  status: toolStatusEnum("status").default("Draft").notNull(),

  // Entry kind — 'tool' is a real app/service; non-tool values (list/book/guide/
  // podcast/channel/course/org) are content/orgs that must NOT rank in the agent feed
  // (searchPublicToolsPp) but stay browsable in the human directory. Backfilled by
  // category via scripts/backfill-content-type.ts (N16). Enum-lite text; default 'tool'.
  contentType: text("content_type").default("tool").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isAffiliated: boolean("is_affiliated").default(false).notNull(),
  isUrlValid: boolean("is_url_valid").default(true).notNull(),
  
  // Privacy score (from scanner)
  latestPrivacyScore: integer("latest_privacy_score"),

  // ── Privacy Protocol (PP) fields ──────────────────────────────────────────
  // Identity / jurisdiction
  jurisdiction: text("jurisdiction"),               // ISO 3166-1 alpha-2 (e.g. "CH", "US")
  jurisdictionRisk: jurisdictionRiskEnum("jurisdiction_risk"),

  // Data retention
  logsIp: boolean("logs_ip"),
  logsMetadata: boolean("logs_metadata"),

  // Encryption
  e2ee: boolean("e2ee"),
  zeroKnowledge: boolean("zero_knowledge"),

  // PII requirements (null = unknown)
  requiresEmail: boolean("requires_email"),
  requiresPhone: boolean("requires_phone"),
  requiresRealName: boolean("requires_real_name"),

  // Payment
  hasFreeTier: boolean("has_free_tier"),
  acceptsCrypto: boolean("accepts_crypto"),
  isNoKyc: boolean("is_no_kyc"),

  // Trust
  isOpenSource: boolean("is_open_source"),
  isSecurityAudited: boolean("is_security_audited"),
  auditDate: timestamp("audit_date"),
  auditor: text("auditor"),
  auditUrl: text("audit_url"),

  // Platform availability
  platforms: json("platforms").$type<string[]>(),

  // PP metadata
  lastVerified: timestamp("last_verified"),
  // Retired 2026-10: nothing reads or writes this. Drop the column and index in a later migration.
  adoScore: integer("ado_score"),

  // Submitter
  submitterName: text("submitter_name"),
  submitterEmail: text("submitter_email"),
  submitterNote: text("submitter_note"),
  ownerId: text("owner_id"),
  
  // Timestamps
  publishedAt: timestamp("published_at"),
  lastContentGeneratedAt: timestamp("last_content_generated_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("tools_slug_idx").on(table.slug),
  index("tools_name_idx").on(table.name),
  index("tools_status_idx").on(table.status),
  index("tools_privacy_score_idx").on(table.latestPrivacyScore),
  index("tools_ado_score_idx").on(table.adoScore),
  index("tools_jurisdiction_risk_idx").on(table.jurisdictionRisk),
  index("tools_last_verified_idx").on(table.lastVerified),
])

export const categories = pgTable("categories", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  label: text("label"),
  description: text("description"),
  parentId: text("parent_id"),
  visibility: categoryVisibilityEnum("visibility").default("public").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("categories_slug_idx").on(table.slug),
  index("categories_parent_id_idx").on(table.parentId),
  index("categories_visibility_idx").on(table.visibility),
  index("categories_sort_order_idx").on(table.sortOrder),
])

export const tagTypeEnum = pgEnum("tag_type", ["attribute", "platform", "custom"])

export const tags = pgTable("tags", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color").default("#6b7280"),
  type: tagTypeEnum("type").default("custom").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("tags_name_idx").on(table.name),
  index("tags_type_idx").on(table.type),
])

// Many-to-many: tools <-> categories
export const toolsToCategories = pgTable("tools_to_categories", {
  toolId: text("tool_id").notNull().references(() => tools.id, { onDelete: "cascade" }),
  categoryId: text("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
}, (table) => [
  primaryKey({ columns: [table.toolId, table.categoryId] }),
])

// Many-to-many: tools <-> tags
export const toolsToTags = pgTable("tools_to_tags", {
  toolId: text("tool_id").notNull().references(() => tools.id, { onDelete: "cascade" }),
  tagId: text("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (table) => [
  primaryKey({ columns: [table.toolId, table.tagId] }),
])

// ═══════════════════════════════════════════════════════════════════════════
// PRIVACY SCANNER (Ported from V2)
// ═══════════════════════════════════════════════════════════════════════════

export const toolPrivacyAudits = pgTable("tool_privacy_audits", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  toolId: text("tool_id").notNull().references(() => tools.id, { onDelete: "cascade" }),
  
  // Scan metadata
  scannedAt: timestamp("scanned_at").defaultNow().notNull(),
  scanDuration: integer("scan_duration").notNull(), // milliseconds
  targetUrl: text("target_url").notNull(),
  scanVersion: text("scan_version").default("1.0").notNull(),
  
  // Overall results
  overallScore: integer("overall_score").notNull(),
  grade: privacyGradeEnum("grade").notNull(),
  
  // Category scores (0-100)
  trackerScore: integer("tracker_score").notNull(),
  cookieScore: integer("cookie_score").notNull(),
  securityScore: integer("security_score").notNull(),
  thirdPartyScore: integer("third_party_score").notNull(),
  fingerprintScore: integer("fingerprint_score").notNull(),
  
  // Raw data (JSON)
  trackersFound: json("trackers_found"),
  cookiesFound: json("cookies_found"),
  headersFound: json("headers_found"),
  thirdPartyReqs: json("third_party_reqs"),
  fingerprintApis: json("fingerprint_apis"),
  
  // Quick flags
  hasGoogleAnalytics: boolean("has_google_analytics").default(false).notNull(),
  hasFacebookPixel: boolean("has_facebook_pixel").default(false).notNull(),
  hasThirdPartyCookies: boolean("has_third_party_cookies").default(false).notNull(),
  hasFingerprinting: boolean("has_fingerprinting").default(false).notNull(),
  respectsDNT: boolean("respects_dnt").default(false).notNull(),
  hasHTTPS: boolean("has_https").default(true).notNull(),
  hasHSTS: boolean("has_hsts").default(false).notNull(),
  hasCSP: boolean("has_csp").default(false).notNull(),
  hasPrivacyPolicy: boolean("has_privacy_policy").default(false).notNull(),
  
  // Error handling
  scanError: text("scan_error"),
  isPartial: boolean("is_partial").default(false).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("tool_audits_tool_id_idx").on(table.toolId),
  index("tool_audits_scanned_at_idx").on(table.scannedAt),
  index("tool_audits_grade_idx").on(table.grade),
])

export const publicScans = pgTable("public_scans", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  
  // Scan target
  url: text("url").notNull(),
  domain: text("domain").notNull().unique(),
  
  // Scan metadata
  scannedAt: timestamp("scanned_at").defaultNow().notNull(),
  scanDuration: integer("scan_duration").notNull(),
  scanVersion: text("scan_version").default("1.0").notNull(),
  
  // Overall results
  overallScore: integer("overall_score").notNull(),
  grade: privacyGradeEnum("grade").notNull(),
  
  // Category scores
  trackerScore: integer("tracker_score").notNull(),
  cookieScore: integer("cookie_score").notNull(),
  securityScore: integer("security_score").notNull(),
  thirdPartyScore: integer("third_party_score").notNull(),
  fingerprintScore: integer("fingerprint_score").notNull(),
  
  // Raw findings (cached for public results)
  trackersFound: json("trackers_found"),
  cookiesFound: json("cookies_found"),
  headersFound: json("headers_found"),
  thirdPartyReqs: json("third_party_reqs"),
  fingerprintApis: json("fingerprint_apis"),

  // Summary findings
  trackerNames: json("tracker_names").$type<string[]>().default([]),
  trackerCount: integer("tracker_count").default(0).notNull(),
  cookieCount: integer("cookie_count").default(0).notNull(),
  thirdPartyCount: integer("third_party_count").default(0).notNull(),
  
  // Quick flags
  hasGoogleAnalytics: boolean("has_google_analytics").default(false).notNull(),
  hasFacebookPixel: boolean("has_facebook_pixel").default(false).notNull(),
  hasThirdPartyCookies: boolean("has_third_party_cookies").default(false).notNull(),
  hasFingerprinting: boolean("has_fingerprinting").default(false).notNull(),
  respectsDNT: boolean("respects_dnt").default(false).notNull(),
  hasHTTPS: boolean("has_https").default(true).notNull(),
  hasHSTS: boolean("has_hsts").default(false).notNull(),
  hasCSP: boolean("has_csp").default(false).notNull(),
  hasPrivacyPolicy: boolean("has_privacy_policy").default(false).notNull(),
  
  // Generated content
  summary: text("summary"),
  recommendations: json("recommendations").$type<string[]>().default([]),
  
  // Error handling
  scanError: text("scan_error"),
  isPartial: boolean("is_partial").default(false).notNull(),
  
  // Stats
  viewCount: integer("view_count").default(1).notNull(),
  shareCount: integer("share_count").default(0).notNull(),
  
  // Cache expiration
  expiresAt: timestamp("expires_at").notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("public_scans_domain_idx").on(table.domain),
  index("public_scans_grade_idx").on(table.grade),
  index("public_scans_expires_at_idx").on(table.expiresAt),
])

export const policyAnalyses = pgTable("policy_analyses", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  
  // Input
  url: text("url").notNull(),
  domain: text("domain").notNull(),
  
  // Raw data
  policyText: text("policy_text"),
  policyUrl: text("policy_url"),
  scrapedAt: timestamp("scraped_at"),
  
  // AI Analysis
  summary: text("summary"),
  dataCollected: json("data_collected").$type<string[]>().default([]),
  thirdPartySharing: json("third_party_sharing").$type<string[]>().default([]),
  retentionPeriod: text("retention_period"),
  redFlags: json("red_flags").$type<string[]>().default([]),
  positives: json("positives").$type<string[]>().default([]),
  
  // Scoring
  score: privacyGradeEnum("score"),
  scoreNumeric: integer("score_numeric"),
  scoreRationale: text("score_rationale"),
  
  // Categorization
  serviceType: text("service_type"),
  
  // Metadata
  aiModel: text("ai_model").notNull(),
  promptVersion: text("prompt_version").default("v1").notNull(),
  analysisVersion: integer("analysis_version").default(1).notNull(),
  
  // Error handling
  error: text("error"),
  isPartial: boolean("is_partial").default(false).notNull(),
  
  // Stats
  viewCount: integer("view_count").default(0).notNull(),
  shareCount: integer("share_count").default(0).notNull(),
  
  // Cache
  expiresAt: timestamp("expires_at").notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("policy_analyses_domain_idx").on(table.domain),
  index("policy_analyses_score_idx").on(table.score),
  index("policy_analyses_expires_at_idx").on(table.expiresAt),
])

// ═══════════════════════════════════════════════════════════════════════════
// RELATIONS
// ═══════════════════════════════════════════════════════════════════════════

export const toolsRelations = relations(tools, ({ many, one }) => ({
  categories: many(toolsToCategories),
  tags: many(toolsToTags),
  privacyAudits: many(toolPrivacyAudits),
  alternativeTool: one(tools, {
    fields: [tools.alternativeToolId],
    references: [tools.id],
  }),
}))

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  tools: many(toolsToCategories),
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: "categoryHierarchy",
  }),
  children: many(categories, { relationName: "categoryHierarchy" }),
}))

export const tagsRelations = relations(tags, ({ many }) => ({
  tools: many(toolsToTags),
}))

export const toolsToCategoriesRelations = relations(toolsToCategories, ({ one }) => ({
  tool: one(tools, {
    fields: [toolsToCategories.toolId],
    references: [tools.id],
  }),
  category: one(categories, {
    fields: [toolsToCategories.categoryId],
    references: [categories.id],
  }),
}))

export const toolsToTagsRelations = relations(toolsToTags, ({ one }) => ({
  tool: one(tools, {
    fields: [toolsToTags.toolId],
    references: [tools.id],
  }),
  tag: one(tags, {
    fields: [toolsToTags.tagId],
    references: [tags.id],
  }),
}))

export const toolPrivacyAuditsRelations = relations(toolPrivacyAudits, ({ one }) => ({
  tool: one(tools, {
    fields: [toolPrivacyAudits.toolId],
    references: [tools.id],
  }),
}))

// ═══════════════════════════════════════════════════════════════════════════
// API USAGE ANALYTICS
// ═══════════════════════════════════════════════════════════════════════════

export const apiRequestLogs = pgTable(
  "api_request_logs",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    endpoint: text("endpoint").notNull(),
    method: text("method").notNull(),
    statusCode: integer("status_code").notNull(),
    responseTimeMs: integer("response_time_ms"),
    rateLimitTier: text("rate_limit_tier"),
    rateLimitRemaining: integer("rate_limit_remaining"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("api_logs_endpoint_idx").on(table.endpoint),
    index("api_logs_created_at_idx").on(table.createdAt),
    index("api_logs_status_code_idx").on(table.statusCode),
  ]
)

export const apiDailyStats = pgTable(
  "api_daily_stats",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    date: timestamp("date").notNull(),
    endpoint: text("endpoint").notNull(),
    totalRequests: integer("total_requests").notNull().default(0),
    successCount: integer("success_count").notNull().default(0),
    errorCount: integer("error_count").notNull().default(0),
    rateLimitedCount: integer("rate_limited_count").notNull().default(0),
    avgResponseTimeMs: integer("avg_response_time_ms"),
    uniqueIps: integer("unique_ips").default(0),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("api_daily_stats_date_endpoint_idx").on(table.date, table.endpoint),
  ]
)

// ═══════════════════════════════════════════════════════════════════════════
// USAGE COUNTS — first-party, no-PII demand telemetry
// ═══════════════════════════════════════════════════════════════════════════
//
// Aggregate-only usage counting: one row per (day, kind, key), incremented via
// upsert. Deliberately stores NO PII — no IP, user-agent, raw query text, email,
// or domain. `kind` is a coarse channel ('mcp_tool' | 'free_tool' |
// 'directory_search'); `key` is a short, enum-like, caller-supplied bucket
// (e.g. a tool name/slug, 'scanner', or 'query'). Written fire-and-forget by
// src/lib/analytics/usage.ts so telemetry never couples to the hot path.
export const usageCounts = pgTable(
  "usage_counts",
  {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    day: timestamp("day", { mode: "date" }).notNull(),
    kind: text("kind").notNull(),
    key: text("key").notNull(),
    count: integer("count").notNull().default(0),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("usage_counts_day_kind_key_idx").on(table.day, table.kind, table.key),
  ]
)

// ═══════════════════════════════════════════════════════════════════════════
// FP ATTRIBUTE COUNTS — aggregate browser-attribute frequency corpus
// ═══════════════════════════════════════════════════════════════════════════
//
// Pure tallies: one row per (attribute, value), incremented via upsert on each
// visit. This is a corpus of how common each browser attribute value is across
// visitors — NOT a tracking DB. It deliberately has NO ip, NO fingerprintId, NO
// per-visitor id, NO raw-fingerprint blob, and NO join key linking a visit to its
// attributes. There is exactly one write op per (attribute, value): count = count
// + 1. The raw fingerprint is discarded after counting. Written fire-and-forget by
// src/lib/analytics/attributes.ts. (No day dimension on purpose — a flat aggregate
// keeps cardinality/re-identifiability minimal.)
export const fpAttributeCounts = pgTable(
  "fp_attribute_counts",
  {
    attribute: text("attribute").notNull(),
    value: text("value").notNull(),
    count: integer("count").notNull().default(0),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.attribute, table.value] }),
  ]
)

// ═══════════════════════════════════════════════════════════════════════════
// TOOL CLAIMS — sources and caveats behind a tool's facts
// ═══════════════════════════════════════════════════════════════════════════
//
// One row per (tool, attribute) holding the value its sources support, or one row per
// caveat (attribute = 'caveat', sortOrder 1..n, text in `note`). The tools columns stay
// the value of record; a gated flag (isNoKyc, acceptsCrypto, isSecurityAudited) is only
// shown when a claim with the same value exists. CHECK constraints live in
// drizzle/0003_tool_claims.sql.
export const toolClaims = pgTable(
  "tool_claims",
  {
    toolId: text("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    attribute: text("attribute").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    value: jsonb("value"),
    note: text("note"),
    sourceUrls: text("source_urls").array().notNull(),
    checkedOn: date("checked_on", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.toolId, table.attribute, table.sortOrder] })]
)

// ═══════════════════════════════════════════════════════════════════════════
// MCP SCAN — monthly read-only scan of hosted MCP servers in the official registry
// ═══════════════════════════════════════════════════════════════════════════
//
// One row per (scan month, registry server). The probe sends initialize and tools/list
// only (src/lib/mcp-scan/probe.ts). CHECK constraints live in drizzle/0004_mcp_scan_results.sql.
export const mcpScanResults = pgTable(
  "mcp_scan_results",
  {
    scanId: text("scan_id").notNull(),
    serverName: text("server_name").notNull(),
    registryVersion: text("registry_version"),
    url: text("url"),
    host: text("host"),
    outcome: text("outcome").notNull(),
    httpStatus: integer("http_status"),
    protocolVersion: text("protocol_version"),
    serverInfo: jsonb("server_info"),
    toolCount: integer("tool_count"),
    toolNames: text("tool_names").array(),
    reach: text("reach").array(),
    reachEvidence: jsonb("reach_evidence"),
    readOnlyTools: integer("read_only_tools"),
    destructiveTools: integer("destructive_tools"),
    unlabelledTools: integer("unlabelled_tools"),
    error: text("error"),
    // When the row was written, not when the server was asked (a --resume run rewrites it).
    checkedAt: timestamp("checked_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.scanId, table.serverName] }),
    index("mcp_scan_results_scan_host_idx").on(table.scanId, table.host),
  ]
)
