/**
 * Claims: the sources and caveats behind a tool's facts (table tool_claims).
 *
 * Pure helpers only (no database), shared by the loader, the invariants check, the
 * directory page, the REST API and the MCP server. DB access lives in ./evidence.ts.
 */

export const CLAIM_ATTRIBUTES = [
  "description",
  "githubUrl",
  "jurisdiction",
  "logsIp",
  "logsMetadata",
  "e2ee",
  "zeroKnowledge",
  "requiresEmail",
  "requiresPhone",
  "requiresRealName",
  "hasFreeTier",
  "acceptsCrypto",
  "isNoKyc",
  "isOpenSource",
  "isSecurityAudited",
  "platforms",
] as const

export type ClaimAttribute = (typeof CLAIM_ATTRIBUTES)[number]

/** A gated value shows only while a claim with the same value exists. */
/** Retired from display 2026-10-09: rows stay in tool_claims, but sources are never returned or rendered. */
const RETIRED_ATTRIBUTES = new Set<string>(["acceptsCrypto", "isNoKyc", "isSecurityAudited"])

export const GATED_ATTRIBUTES = ["isNoKyc", "acceptsCrypto", "isSecurityAudited"] as const

/** Attribute to its path in the Privacy Protocol record (keys of `sources`). */
export const ATTRIBUTE_PATH: Record<ClaimAttribute, string> = {
  description: "description",
  githubUrl: "trust.source_code_url",
  jurisdiction: "privacy.jurisdiction",
  logsIp: "privacy.data_retention.logs_ip",
  logsMetadata: "privacy.data_retention.logs_metadata",
  e2ee: "privacy.encryption.e2ee",
  zeroKnowledge: "privacy.encryption.zero_knowledge",
  requiresEmail: "privacy.requires_pii.email",
  requiresPhone: "privacy.requires_pii.phone",
  requiresRealName: "privacy.requires_pii.real_name",
  hasFreeTier: "payment.has_free_tier",
  acceptsCrypto: "payment.accepts_crypto",
  isNoKyc: "payment.no_kyc_purchase",
  isOpenSource: "trust.is_open_source",
  isSecurityAudited: "trust.security_audit",
  platforms: "platforms",
}

const ATTRIBUTE_SET = new Set<string>(CLAIM_ATTRIBUTES)
export const isClaimAttribute = (a: string): a is ClaimAttribute => ATTRIBUTE_SET.has(a)

export const SOURCE_SAYS = "Source says: "

export type AuditFields = { auditor?: string | null; auditUrl?: string | null; auditDate?: string | null }

/** A claim ready to write: one attribute row (sortOrder 0) or one caveat (attribute 'caveat'). */
export type ClaimInput = {
  attribute: ClaimAttribute | "caveat"
  sortOrder: number
  value: unknown
  note: string | null
  sources: string[]
  checked: string
  audit?: AuditFields
}

export type ConvertResult = {
  slug: string
  claims: ClaimInput[]
  /** Attribute claims whose value is null (not checked): no row is written. */
  unchecked: { attribute: string; note: string | null }[]
  /** Claims refused before touching the DB (bad attribute, no source, non-http source). */
  refused: { what: string; reason: string }[]
  /** True when the file defines its caveat list (so it replaces the stored one). */
  hasCaveats: boolean
}

export function isHttpUrl(u: unknown): u is string {
  if (typeof u !== "string") return false
  try {
    const p = new URL(u)
    return p.protocol === "http:" || p.protocol === "https:"
  } catch {
    return false
  }
}

/** Returns a refusal reason, or null when the sources are acceptable. */
export function sourceProblem(sources: unknown): string | null {
  if (!Array.isArray(sources) || sources.length === 0) return "no source"
  const bad = sources.find((u) => !isHttpUrl(u))
  return bad === undefined ? null : `non-http(s) source: ${String(bad).slice(0, 80)}`
}

/** Compare a claim value with a tool column value (platforms compare as sets). */
export function valuesEqual(attribute: string, a: unknown, b: unknown): boolean {
  if (a == null || b == null) return a == null && b == null
  if (attribute === "platforms" && Array.isArray(a) && Array.isArray(b)) {
    return JSON.stringify([...a].map(String).sort()) === JSON.stringify([...b].map(String).sort())
  }
  return JSON.stringify(a) === JSON.stringify(b)
}

const str = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null)

/** Research shape: Directory/claims/<slug>.json */
export function convertResearchFile(file: unknown): ConvertResult {
  const f = (file ?? {}) as Record<string, unknown>
  const slug = str(f.slug) ?? ""
  const checked = str(f.checked) ?? ""
  const out: ConvertResult = { slug, claims: [], unchecked: [], refused: [], hasCaveats: Array.isArray(f.caveats) }
  if (!slug) out.refused.push({ what: "file", reason: "missing slug" })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checked)) out.refused.push({ what: "file", reason: "missing or bad checked date" })
  if (out.refused.length) return out

  for (const c of Array.isArray(f.claims) ? (f.claims as Record<string, unknown>[]) : []) {
    const attribute = String(c.attribute)
    if (!isClaimAttribute(attribute)) {
      out.refused.push({ what: attribute, reason: "unknown attribute" })
      continue
    }
    if (c.value === null || c.value === undefined) {
      out.unchecked.push({ attribute, note: str(c.note) })
      continue
    }
    const problem = sourceProblem(c.sources)
    if (problem) {
      out.refused.push({ what: attribute, reason: problem })
      continue
    }
    const parts: string[] = []
    if (str(c.quote)) parts.push(SOURCE_SAYS + str(c.quote))
    if (str(c.note)) parts.push(str(c.note)!)
    const audit: AuditFields = {}
    for (const k of ["auditor", "auditUrl", "auditDate"] as const) if (str(c[k])) audit[k] = str(c[k])
    out.claims.push({
      attribute,
      sortOrder: 0,
      value: c.value,
      note: parts.length ? parts.join(" | ") : null,
      sources: c.sources as string[],
      checked,
      ...(attribute === "isSecurityAudited" && Object.keys(audit).length ? { audit } : {}),
    })
  }

  addCaveats(out, f.caveats, checked)
  return out
}

function addCaveats(out: ConvertResult, caveats: unknown, checked: string) {
  let n = 0
  for (const cv of Array.isArray(caveats) ? (caveats as Record<string, unknown>[]) : []) {
    const text = str(cv.text)
    const problem = text ? sourceProblem(cv.sources) : "empty caveat text"
    if (problem) {
      out.refused.push({ what: `caveat ${n + 1}`, reason: problem })
      continue
    }
    n += 1
    out.claims.push({
      attribute: "caveat",
      sortOrder: n,
      value: null,
      note: str(cv.quote) ? `${text} | ${SOURCE_SAYS}${str(cv.quote)}` : text,
      sources: cv.sources as string[],
      checked,
    })
  }
}

/** Draft shape: a new-tools-draft row with `sources` (attribute to urls) and `caveats`. */
export function convertDraftRow(row: Record<string, unknown>): ConvertResult {
  const slug = str(row.slug) ?? ""
  const checked = (str(row.lastVerified) ?? "").slice(0, 10)
  const out: ConvertResult = { slug, claims: [], unchecked: [], refused: [], hasCaveats: Array.isArray(row.caveats) }
  if (!slug || !/^\d{4}-\d{2}-\d{2}$/.test(checked)) {
    out.refused.push({ what: "row", reason: "missing slug or lastVerified" })
    return out
  }
  const sources = (row.sources ?? {}) as Record<string, unknown>
  for (const [attribute, urls] of Object.entries(sources)) {
    // jurisdictionRisk is derived from jurisdiction; the audit details ride on isSecurityAudited.
    if (attribute === "jurisdictionRisk" || attribute === "auditor" || attribute === "auditUrl" || attribute === "auditDate") continue
    if (!isClaimAttribute(attribute)) {
      out.refused.push({ what: attribute, reason: "unknown attribute" })
      continue
    }
    const value = row[attribute]
    if (value === null || value === undefined) {
      out.unchecked.push({ attribute, note: "draft has sources but no value" })
      continue
    }
    const problem = sourceProblem(urls)
    if (problem) {
      out.refused.push({ what: attribute, reason: problem })
      continue
    }
    const audit: AuditFields = {}
    if (attribute === "isSecurityAudited") {
      for (const k of ["auditor", "auditUrl", "auditDate"] as const) if (str(row[k])) audit[k] = str(row[k])
    }
    out.claims.push({
      attribute,
      sortOrder: 0,
      value,
      note: null,
      sources: urls as string[],
      checked,
      ...(Object.keys(audit).length ? { audit } : {}),
    })
  }
  addCaveats(out, row.caveats, checked)
  return out
}

// ── evidence (what the page, API and MCP show) ─────────────────────────────

export type ClaimRow = {
  attribute: string
  sortOrder: number
  value: unknown
  note: string | null
  sourceUrls: string[]
  checkedOn: string
}

export type SourceEntry = { urls: string[]; checked: string; note: string | null }
export type CaveatEntry = { text: string; sources: string[]; checked: string }
export type ToolEvidence = { sources: Record<string, SourceEntry>; caveats: CaveatEntry[] }

export const EMPTY_EVIDENCE: ToolEvidence = { sources: {}, caveats: [] }

/** Strip the "Source says" tail off a caveat note, leaving the caveat text. */
export function caveatText(note: string): string {
  const i = note.indexOf(` | ${SOURCE_SAYS}`)
  return i === -1 ? note : note.slice(0, i)
}

/**
 * Group claim rows into evidence. `current` (the tool's column values) drops an attribute
 * claim whose value no longer matches the column, so a changed column is unsourced again.
 */
export function buildEvidence(rows: ClaimRow[], current?: Record<string, unknown>): ToolEvidence {
  const sources: Record<string, SourceEntry> = {}
  const caveats: CaveatEntry[] = []
  for (const r of [...rows].sort((a, b) => a.sortOrder - b.sortOrder)) {
    if (r.attribute === "caveat") {
      caveats.push({ text: caveatText(r.note ?? ""), sources: r.sourceUrls, checked: r.checkedOn })
      continue
    }
    if (!isClaimAttribute(r.attribute) || RETIRED_ATTRIBUTES.has(r.attribute)) continue
    if (current && !valuesEqual(r.attribute, r.value, current[r.attribute])) continue
    sources[ATTRIBUTE_PATH[r.attribute]] = { urls: r.sourceUrls, checked: r.checkedOn, note: r.note }
  }
  return { sources, caveats }
}

/** "domain/path" label for a source link. */
export function sourceLabel(url: string): string {
  try {
    const u = new URL(url)
    const path = u.pathname.replace(/\/$/, "")
    const label = u.hostname.replace(/^www\./, "") + path
    return label.length > 60 ? label.slice(0, 57) + "..." : label
  } catch {
    return url
  }
}

// ── invariants ─────────────────────────────────────────────────────────────

export type InvariantTool = { id: string; slug: string } & Record<string, unknown>
export type InvariantClaim = { toolId: string; attribute: string; value: unknown; sourceUrls: string[] }

export type InvariantReport = {
  unsourcedGated: { slug: string; attribute: string; value: unknown }[]
  disagreements: { slug: string; attribute: string; claim: unknown; column: unknown }[]
  badSources: { slug: string; attribute: string; url: string }[]
}

export function checkInvariants(tools: InvariantTool[], claims: InvariantClaim[]): InvariantReport {
  const report: InvariantReport = { unsourcedGated: [], disagreements: [], badSources: [] }
  const bySlug = new Map(tools.map((t) => [t.id, t]))
  const byTool = new Map<string, InvariantClaim[]>()
  for (const c of claims) byTool.set(c.toolId, [...(byTool.get(c.toolId) ?? []), c])

  for (const t of tools) {
    for (const attr of GATED_ATTRIBUTES) {
      const v = t[attr]
      if (v === null || v === undefined) continue
      const ok = (byTool.get(t.id) ?? []).some((c) => c.attribute === attr && valuesEqual(attr, c.value, v))
      if (!ok) report.unsourcedGated.push({ slug: t.slug, attribute: attr, value: v })
    }
  }
  for (const c of claims) {
    const t = bySlug.get(c.toolId)
    if (!t) continue
    if (c.attribute !== "caveat" && isClaimAttribute(c.attribute) && !valuesEqual(c.attribute, c.value, t[c.attribute])) {
      report.disagreements.push({ slug: t.slug, attribute: c.attribute, claim: c.value, column: t[c.attribute] ?? null })
    }
    for (const u of c.sourceUrls) {
      if (!isHttpUrl(u)) report.badSources.push({ slug: t.slug, attribute: c.attribute, url: u })
    }
  }
  return report
}

// ── numbering (page and llm-mirror) ────────────────────────────────────────

/** Number every distinct source URL, in order of first use: quick-info rows first, then caveats. */
export function numberSources(evidence: ToolEvidence): { urls: string[]; checked: string[]; index: (url: string) => number } {
  const urls: string[] = []
  const checked: string[] = []
  const add = (u: string, c: string) => {
    if (!urls.includes(u)) {
      urls.push(u)
      checked.push(c)
    }
  }
  for (const s of Object.values(evidence.sources)) for (const u of s.urls) add(u, s.checked)
  for (const c of evidence.caveats) for (const u of c.sources) add(u, c.checked)
  return { urls, checked, index: (u) => urls.indexOf(u) + 1 }
}
