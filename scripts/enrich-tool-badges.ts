#!/usr/bin/env bun
// NOTE (2026-10-09): accepts_crypto, no_kyc and security_audited are retired from display (site, API, MCP); this script may still write the columns but they must not be shown.

/**
 * Badge enrichment script
 *
 * Pulls data from external sources (kycnot.me, awesome-privacy, GitHub),
 * matches tools by domain/name, and updates badge flags in the database.
 *
 * Usage:
 *   bun run scripts/enrich-tool-badges.ts
 */

import { mkdir, writeFile } from "fs/promises"
import { eq } from "drizzle-orm"
import YAML from "yaml"
import { db, isDatabaseConfigured } from "../src/lib/db"
import { tools } from "../src/lib/db/schema"

type ToolRow = {
  id: string
  name: string
  websiteUrl: string
  githubUrl: string | null
  description: string | null
  isOpenSource: boolean
  acceptsCrypto: boolean
  isNoKyc: boolean
}

type MatchResult = {
  tool: ToolRow | null
  reason: string
}

type AwesomeItem = {
  name: string
  url: string
  github?: string
  openSource?: boolean
  acceptsCrypto?: boolean
  android?: string
  ios?: string
  description?: string
}

type KycnotItem = {
  name: string
  urls: string[]
  kycLevel?: number
  attributes?: string[]
}

type Report = {
  summary: {
    toolsScanned: number
    updatesApplied: number
    sources: Record<string, number>
    unmatched: number
    ambiguous: number
  }
  updates: Array<{
    toolId: string
    toolName: string
    changes: Record<string, boolean | string>
    sources: string[]
  }>
  unmatched: Array<{ source: string; name: string; url?: string }>
  ambiguous: Array<{ source: string; name: string; candidates: string[] }>
  notes: string[]
}

const AWESOME_URL =
  "https://raw.githubusercontent.com/Lissy93/awesome-privacy/main/awesome-privacy.yml"

const KYCNOT_ENDPOINTS = [
  "https://kycnot.me/api/v1/services",
  "https://kycnot.me/api/v1/service/list",
  "https://kycnot.me/api/v1/service/all",
]

const REPORT_DIR = new URL("./reports/", import.meta.url)

const aliasDomains: Record<string, string> = {
  // Add known mismatches here, e.g. "protonmail.com": "proton.me",
}

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\b(app|tools|tool|service|platform|privacy)\b/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function normalizeDomain(value: string) {
  return value.replace(/^www\./, "").toLowerCase()
}

function getDomain(url: string | null | undefined) {
  if (!url) return null
  try {
    const normalized = url.startsWith("http") ? url : `https://${url}`
    return normalizeDomain(new URL(normalized).hostname)
  } catch {
    return null
  }
}

function parseGithubSlug(input: string) {
  const trimmed = input.trim()
  if (trimmed.startsWith("http")) {
    const url = new URL(trimmed)
    return url.pathname.replace(/^\/+/, "").replace(/\.git$/, "")
  }
  return trimmed.replace(/^\/+/, "").replace(/\.git$/, "")
}

function collectAwesomeItems(node: unknown, items: AwesomeItem[] = []) {
  if (!node) return items

  if (Array.isArray(node)) {
    node.forEach((entry) => collectAwesomeItems(entry, items))
    return items
  }

  if (typeof node === "object") {
    const record = node as Record<string, unknown>
    if (typeof record.name === "string" && typeof record.url === "string") {
      items.push({
        name: record.name,
        url: record.url,
        github: typeof record.github === "string" ? record.github : undefined,
        openSource: typeof record.openSource === "boolean" ? record.openSource : undefined,
        acceptsCrypto:
          typeof record.acceptsCrypto === "boolean" ? record.acceptsCrypto : undefined,
        android: typeof record.android === "string" ? record.android : undefined,
        ios: typeof record.ios === "string" ? record.ios : undefined,
        description: typeof record.description === "string" ? record.description.trim() : undefined,
      })
    }

    Object.values(record).forEach((value) => collectAwesomeItems(value, items))
  }

  return items
}

async function fetchAwesomePrivacy() {
  const response = await fetch(AWESOME_URL)
  if (!response.ok) throw new Error(`awesome-privacy fetch failed: ${response.status}`)
  const yamlText = await response.text()
  const parsed = YAML.parse(yamlText)
  return collectAwesomeItems(parsed)
}

function extractKycnotUrls(item: Record<string, unknown>) {
  const urls: string[] = []
  const push = (value?: unknown) => {
    if (typeof value === "string") urls.push(value)
  }

  push(item.serviceUrl)
  push(item.url)
  push(item.websiteUrl)
  push(item.website)
  push(item.domain)

  if (Array.isArray(item.urls)) {
    item.urls.forEach((value) => push(value))
  }

  return urls.filter(Boolean)
}

function parseKycnotItem(raw: Record<string, unknown>): KycnotItem {
  const name = typeof raw.name === "string" ? raw.name : "Unknown"
  const urls = extractKycnotUrls(raw)
  const attributes = Array.isArray(raw.attributes)
    ? raw.attributes.filter((attr) => typeof attr === "string") as string[]
    : undefined
  const kycLevel = typeof raw.kycLevel === "number" ? raw.kycLevel : undefined

  return { name, urls, attributes, kycLevel }
}

async function fetchKycnot() {
  for (const endpoint of KYCNOT_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, { headers: { accept: "application/json" } })
      if (!response.ok) continue
      const payload = await response.json()
      const list =
        Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.services)
            ? payload.services
            : Array.isArray(payload?.data)
              ? payload.data
              : null

      if (!list) continue
      return list
        .filter((item) => item && typeof item === "object")
        .map((item: Record<string, unknown>) => parseKycnotItem(item))
    } catch {
      // Try next endpoint
    }
  }
  return []
}

function getAttributeMatches(attributes: string[] | undefined) {
  if (!attributes) return { acceptsCrypto: false }
  const normalized = attributes.map((attr) => attr.toLowerCase())
  const acceptsCrypto = normalized.some((attr) =>
    ["crypto", "bitcoin", "monero", "lightning"].some((term) => attr.includes(term))
  )
  return { acceptsCrypto }
}

function matchTool({
  name,
  urls,
  toolsByDomain,
  toolsByName,
}: {
  name: string
  urls: string[]
  toolsByDomain: Map<string, ToolRow[]>
  toolsByName: Map<string, ToolRow[]>
}): MatchResult {
  for (const url of urls) {
    const domain = getDomain(url)
    if (!domain) continue
    const aliased = aliasDomains[domain] ?? domain
    const matches = toolsByDomain.get(aliased) || []
    if (matches.length === 1) return { tool: matches[0], reason: `domain:${aliased}` }
    if (matches.length > 1) return { tool: null, reason: `ambiguous-domain:${aliased}` }
  }

  const normalized = normalizeName(name)
  const matches = toolsByName.get(normalized) || []
  if (matches.length === 1) return { tool: matches[0], reason: `name:${normalized}` }
  if (matches.length > 1) return { tool: null, reason: `ambiguous-name:${normalized}` }

  return { tool: null, reason: "no-match" }
}

async function fetchGithubRepo(slug: string, token?: string) {
  const response = await fetch(`https://api.github.com/repos/${slug}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  })
  if (!response.ok) return null
  return response.json()
}

async function run() {
  if (!isDatabaseConfigured) {
    console.error("❌ DATABASE_URL is not configured. Exiting.")
    process.exit(1)
  }

  console.log("🔎 Loading tools from database...")
  const toolRows = await db
    .select({
      id: tools.id,
      name: tools.name,
      websiteUrl: tools.websiteUrl,
      githubUrl: tools.githubUrl,
      description: tools.description,
      isOpenSource: tools.isOpenSource,
      acceptsCrypto: tools.acceptsCrypto,
      isNoKyc: tools.isNoKyc,
    })
    .from(tools)

  const toolsByDomain = new Map<string, ToolRow[]>()
  const toolsByName = new Map<string, ToolRow[]>()

  for (const tool of toolRows) {
    const domain = getDomain(tool.websiteUrl)
    if (domain) {
      const list = toolsByDomain.get(domain) || []
      list.push(tool)
      toolsByDomain.set(domain, list)
    }

    const normalized = normalizeName(tool.name)
    const listByName = toolsByName.get(normalized) || []
    listByName.push(tool)
    toolsByName.set(normalized, listByName)
  }

  console.log("🌐 Fetching awesome-privacy data...")
  const awesomeItems = await fetchAwesomePrivacy()

  console.log("🌐 Fetching kycnot data...")
  const kycnotItems = await fetchKycnot()

  const report: Report = {
    summary: {
      toolsScanned: toolRows.length,
      updatesApplied: 0,
      sources: {
        awesome: awesomeItems.length,
        kycnot: kycnotItems.length,
        github: toolRows.filter((tool) => tool.githubUrl).length,
      },
      unmatched: 0,
      ambiguous: 0,
    },
    updates: [],
    unmatched: [],
    ambiguous: [],
    notes: [],
  }

  const updates = new Map<string, { patch: Partial<ToolRow>; sources: Set<string> }>()

  const queueUpdate = (tool: ToolRow, patch: Partial<ToolRow>, source: string) => {
    if (!patch || Object.keys(patch).length === 0) return
    const existing = updates.get(tool.id) ?? { patch: {}, sources: new Set<string>() }
    updates.set(tool.id, {
      patch: { ...existing.patch, ...patch },
      sources: new Set([...existing.sources, source]),
    })
  }

  const markAmbiguous = (source: string, name: string, candidates: ToolRow[]) => {
    report.ambiguous.push({
      source,
      name,
      candidates: candidates.map((tool) => tool.name),
    })
  }

  for (const item of awesomeItems) {
    const match = matchTool({
      name: item.name,
      urls: [item.url],
      toolsByDomain,
      toolsByName,
    })

    if (!match.tool) {
      if (match.reason.startsWith("ambiguous")) {
        const normalized = normalizeName(item.name)
        markAmbiguous("awesome", item.name, toolsByName.get(normalized) || [])
      } else {
        report.unmatched.push({ source: "awesome", name: item.name, url: item.url })
      }
      continue
    }

    const patch: Partial<ToolRow> = {}
    if ((item.openSource || item.github) && !match.tool.isOpenSource) patch.isOpenSource = true
    if (item.acceptsCrypto && !match.tool.acceptsCrypto) patch.acceptsCrypto = true
    // Add description as fallback if tool has no description
    if (item.description && !match.tool.description) patch.description = item.description

    if (Object.keys(patch).length > 0) queueUpdate(match.tool, patch, "awesome-privacy")
  }

  for (const item of kycnotItems) {
    const match = matchTool({
      name: item.name,
      urls: item.urls,
      toolsByDomain,
      toolsByName,
    })

    if (!match.tool) {
      if (match.reason.startsWith("ambiguous")) {
        const normalized = normalizeName(item.name)
        markAmbiguous("kycnot", item.name, toolsByName.get(normalized) || [])
      } else {
        report.unmatched.push({ source: "kycnot", name: item.name, url: item.urls[0] })
      }
      continue
    }

    const patch: Partial<ToolRow> = {}
    const { acceptsCrypto } = getAttributeMatches(item.attributes)

    if (item.kycLevel === 0 && !match.tool.isNoKyc) patch.isNoKyc = true
    if (acceptsCrypto && !match.tool.acceptsCrypto) patch.acceptsCrypto = true

    if (Object.keys(patch).length > 0) queueUpdate(match.tool, patch, "kycnot")
  }

  const githubToken = process.env.GITHUB_TOKEN
  if (!githubToken) {
    report.notes.push("GITHUB_TOKEN not set; GitHub API checks skipped.")
  }

  for (const tool of toolRows) {
    if (!tool.githubUrl) continue
    const repoSlug = parseGithubSlug(tool.githubUrl)
    const patch: Partial<ToolRow> = {}
    let repoExists = true

    if (githubToken) {
      const repo = await fetchGithubRepo(repoSlug, githubToken)
      repoExists = !!repo
    }

    if (repoExists && !tool.isOpenSource) patch.isOpenSource = true
    if (Object.keys(patch).length > 0) queueUpdate(tool, patch, "github")
  }

  console.log(`🧮 Applying ${updates.size} updates...`)
  for (const [toolId, { patch, sources }] of updates.entries()) {
    const tool = toolRows.find((row) => row.id === toolId)
    if (!tool) continue

    const dbPatch: Partial<typeof tools.$inferInsert> = {}
    const changes: Record<string, boolean | string> = {}

    if (patch.isOpenSource) {
      dbPatch.isOpenSource = true
      changes.isOpenSource = true
    }
    if (patch.acceptsCrypto) {
      dbPatch.acceptsCrypto = true
      changes.acceptsCrypto = true
    }
    if (patch.isNoKyc) {
      dbPatch.isNoKyc = true
      changes.isNoKyc = true
    }
    // Apply description fallback from awesome-privacy
    if (patch.description) {
      dbPatch.description = patch.description
      changes.description = "added"
    }

    if (Object.keys(dbPatch).length === 0) continue

    await db.update(tools).set({
      ...dbPatch,
      updatedAt: new Date(),
    }).where(eq(tools.id, toolId))

    report.updates.push({
      toolId,
      toolName: tool.name,
      changes,
      sources: Array.from(sources),
    })
  }

  report.summary.updatesApplied = report.updates.length
  report.summary.unmatched = report.unmatched.length
  report.summary.ambiguous = report.ambiguous.length

  await mkdir(REPORT_DIR, { recursive: true })
  const reportPath = new URL(
    `./badge-enrichment-${new Date().toISOString().slice(0, 10)}.json`,
    REPORT_DIR
  )

  await writeFile(reportPath, JSON.stringify(report, null, 2), "utf-8")

  console.log(`✅ Updates applied: ${report.summary.updatesApplied}`)
  console.log(`📄 Report written to: ${reportPath.pathname}`)
  console.log(`ℹ️  Unmatched: ${report.summary.unmatched} | Ambiguous: ${report.summary.ambiguous}`)
}

run().catch((error) => {
  console.error("💥 Enrichment failed:", error)
  process.exit(1)
})
