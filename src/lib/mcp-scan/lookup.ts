/**
 * What DP's monthly read-only scan saw for one MCP server, for dp_check_mcp_server.
 *
 * Exact matches only: the registry name a reference maps to, or the exact server URL.
 * Never a host-level or fuzzy match, because one host can serve many unrelated servers.
 * Tool names are written by the server's publisher and go straight to an AI client, so
 * only names in MCP's own name format pass (letters, digits, _ - .), cut to 64 characters.
 */

import { cleanThirdParty } from "@/lib/third-party-text"
import { and, eq, inArray } from "drizzle-orm"
import { db, isDatabaseConfigured, mcpScanResults } from "@/lib/db"
import { registryNameFor } from "@/lib/mcp-registry"
import summary from "@/data/mcp-scan-summary.json"

type Row = typeof mcpScanResults.$inferSelect

const OUTCOME_WORDS: Record<string, string> = {
  listed: "showed its tool list without a sign-in",
  sign_in: "asked for a sign-in before showing its tools",
  not_mcp: "answered, but not as an MCP server",
  unreachable: "did not answer within 15 seconds",
  error: "greeted the scan but returned no tool list",
  refused_url: "not scanned: not https on port 443",
  refused_address: "not scanned: points at a private network address",
  host_capped: "not scanned: its host has more than three servers, and we scan three per host",
  no_remote: "not scanned: a package you run yourself, with no hosted address",
  opted_out: "not scanned: its owner asked us not to",
}

export const SCAN_CAVEAT =
  "What this server showed Default Privacy's read-only scan on the scan date: we asked for its tool list and used no tool. Not a review or a verdict; servers change."
export const HINT_CAVEAT =
  "Guessed from tool names only. An independent check found such guesses right about 3 times in 4, so check what each named tool does before relying on it."

const TOOL_NAME = /^[A-Za-z0-9_.-]{1,64}$/
const MAX_TOOLS = 40
const safeNames = (names: unknown): string[] =>
  (Array.isArray(names) ? names : []).filter((n): n is string => typeof n === "string" && TOOL_NAME.test(n)).slice(0, MAX_TOOLS)

export function scanFactsFrom(row: Row, methodUrl: string) {
  const listed = row.outcome === "listed"
  const evidence = (row.reachEvidence ?? {}) as Record<string, unknown>
  const hints = Object.fromEntries(
    Object.entries(evidence).map(([flag, names]) => [flag, safeNames(names)]).filter(([, names]) => names.length > 0),
  )
  return {
    state: "found" as const,
    scan: row.scanId,
    registry_name: row.serverName === null ? null : cleanThirdParty(row.serverName, 200),
    url: row.url === null ? null : cleanThirdParty(row.url, 300),
    result: OUTCOME_WORDS[row.outcome] ?? row.outcome,
    ...(listed
      ? {
          tool_count: row.toolCount,
          tool_names: safeNames(row.toolNames),
          labels: {
            read_only: row.readOnlyTools,
            destructive: row.destructiveTools,
            unlabelled: row.unlabelledTools,
            note: "The server's own labels for its tools; we cannot verify them from outside.",
          },
          ...(Object.keys(hints).length ? { name_hints: hints, name_hints_caveat: HINT_CAVEAT } : {}),
        }
      : {}),
    caveat: SCAN_CAVEAT,
    method: methodUrl,
  }
}

function urlVariants(ref: string): string[] {
  try {
    const u = new URL(ref.trim())
    if (u.protocol !== "https:" && u.protocol !== "http:") return []
    const base = `https://${u.host.toLowerCase()}${u.pathname}`.replace(/\/+$/, "")
    return [base, `${base}/`]
  } catch {
    return []
  }
}

export async function lookupScan(ref: string, methodUrl: string) {
  if (!isDatabaseConfigured) return { state: "unavailable" as const }
  const scanId = summary.scanId
  // The registry-name helper only knows domain-shaped names; registry names are often
  // reverse-DNS ("dev.0bridge/0bridge"), so also try the reference exactly as written.
  // Both are exact matches against the primary key, so no lookalike can come back.
  const asWritten = ref.trim()
  const names = [registryNameFor(ref), /^[A-Za-z0-9.-]+\/[A-Za-z0-9._-]+$/.test(asWritten) ? asWritten : null]
    .filter((x): x is string => !!x)
  let row: Row | undefined
  if (names.length) {
    ;[row] = await db.select().from(mcpScanResults).where(and(eq(mcpScanResults.scanId, scanId), inArray(mcpScanResults.serverName, names))).limit(1)
  }
  const urls = urlVariants(ref)
  if (!row && urls.length) {
    const rows = await db.select().from(mcpScanResults).where(and(eq(mcpScanResults.scanId, scanId), inArray(mcpScanResults.url, urls))).limit(5)
    row = rows.find((r) => r.outcome === "listed") ?? rows[0]
  }
  if (!row) return { state: "not_scanned" as const, scan: scanId, method: methodUrl }
  return scanFactsFrom(row, methodUrl)
}
