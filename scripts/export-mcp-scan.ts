/**
 * Export one scan for publication: a gzipped CSV (public/data/mcp-scan-<scan>.csv.gz, one
 * row per registry entry, no tool-name guesses, no raw error text, no checked_at: that
 * column is the time the row was written, and a --resume run rewrites it) and the summary the
 * /mcp-scan page reads (src/data/mcp-scan-summary.json).
 *
 *   bun run scripts/export-mcp-scan.ts [--scan YYYY-MM]
 */

import { mkdirSync, writeFileSync } from "node:fs"
import { gzipSync } from "node:zlib"
import { eq } from "drizzle-orm"
import { db, mcpScanResults } from "@/lib/db"
import { summarizeScan } from "@/lib/mcp-scan/summary"

const i = process.argv.indexOf("--scan")
const SCAN = i >= 0 ? process.argv[i + 1] : new Date().toISOString().slice(0, 7)

const COLUMNS = ["scan_id", "server_name", "registry_version", "url", "host", "outcome", "http_status", "protocol_version",
  "tool_count", "tool_names", "read_only_tools", "destructive_tools", "unlabelled_tools"] as const

function cell(v: unknown): string {
  if (v === null || v === undefined) return ""
  const s = v instanceof Date ? v.toISOString() : Array.isArray(v) ? v.join(" ") : String(v)
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

async function main() {
  const rows = await db.select().from(mcpScanResults).where(eq(mcpScanResults.scanId, SCAN))
  if (rows.length === 0) throw new Error(`no rows for scan ${SCAN}`)
  rows.sort((a, b) => a.serverName.localeCompare(b.serverName))
  const lines = [COLUMNS.join(",")]
  for (const r of rows) {
    lines.push([r.scanId, r.serverName, r.registryVersion, r.url, r.host, r.outcome, r.httpStatus, r.protocolVersion,
      r.toolCount, r.toolNames, r.readOnlyTools, r.destructiveTools, r.unlabelledTools].map(cell).join(","))
  }
  mkdirSync("public/data", { recursive: true })
  const gz = gzipSync(lines.join("\n") + "\n")
  const csvPath = `public/data/mcp-scan-${SCAN}.csv.gz`
  writeFileSync(csvPath, gz)
  const summary = { ...summarizeScan(rows), download: `/data/mcp-scan-${SCAN}.csv.gz`, downloadBytes: gz.length }
  writeFileSync("src/data/mcp-scan-summary.json", JSON.stringify(summary, null, 2) + "\n")
  console.log(`${rows.length} rows -> ${csvPath} (${(gz.length / 1024 / 1024).toFixed(2)} MB)`)
  console.log(JSON.stringify(summary, null, 2))
}

main().then(() => process.exit(0), (e) => { console.error(e); process.exit(1) })
