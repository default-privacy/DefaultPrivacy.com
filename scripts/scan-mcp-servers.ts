/**
 * Monthly read-only scan of hosted MCP servers in the official registry.
 *
 *   bun run scripts/scan-mcp-servers.ts --limit 50          sample: 50 random hosts, local DB
 *   bun run scripts/scan-mcp-servers.ts                     full scan of every hosted server
 *   flags: --scan YYYY-MM (default this month) · --per-host 3 · --concurrency 8
 *          --registry <file.json> (reuse a crawl) · --no-db (raw file + summary only)
 *          --resume <raw.jsonl.gz> (reuse finished probes from an interrupted run; probe the rest)
 *
 * Probes send initialize and tools/list only (src/lib/mcp-scan/probe.ts), one host at a
 * time per worker, at most --per-host distinct URLs per host; servers sharing a URL share
 * one probe. The database row keeps tool names and reach flags; the gzipped raw file in
 * the vault keeps full tool descriptions as evidence.
 */

import { createWriteStream, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import os from "node:os"
import path from "node:path"
import { constants as zc, createGzip, gunzipSync } from "node:zlib"
import { sql } from "drizzle-orm"
import { db, mcpScanResults } from "@/lib/db"
import { crawlRegistry, probeUrlFor, type CrawledServer } from "@/lib/mcp-scan/registry-crawl"
import { probeServer, SCAN_USER_AGENT, type ProbeResult } from "@/lib/mcp-scan/probe"
import { hintCounts, reachOf } from "@/lib/mcp-scan/reach"

const args = process.argv.slice(2)
const opt = (k: string) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined }
const SCAN = opt("--scan") ?? new Date().toISOString().slice(0, 7)
const LIMIT = opt("--limit") ? Number(opt("--limit")) : null
const PER_HOST = Number(opt("--per-host") ?? 3)
const CONCURRENCY = Number(opt("--concurrency") ?? 8)
const NO_DB = args.includes("--no-db")
const RAW_DIR = path.join(os.homedir(), "Documents/defaultprivacy/MCP/scan/raw")

type Row = typeof mcpScanResults.$inferInsert

function seededShuffle<T>(a: T[], seed: number): T[] {
  const out = [...a]
  let s = seed
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

async function main() {
  const regFile = opt("--registry")
  const servers: CrawledServer[] = regFile
    ? JSON.parse(readFileSync(regFile, "utf8"))
    : await crawlRegistry(SCAN_USER_AGENT, (p, n) => { if (p % 50 === 0) console.log(`  registry page ${p}, ${n} servers`) })
  if (!regFile) {
    mkdirSync(RAW_DIR, { recursive: true })
    writeFileSync(path.join(RAW_DIR, `${SCAN}-registry.json`), JSON.stringify(servers))
  }
  console.log(`${servers.length} active servers in the registry`)

  // host -> url -> servers
  const byHost = new Map<string, Map<string, CrawledServer[]>>()
  const rows: Row[] = []
  for (const s of servers) {
    const url = probeUrlFor(s)
    if (!url) {
      if (!LIMIT) rows.push({ scanId: SCAN, serverName: s.name, registryVersion: s.version, outcome: "no_remote" })
      continue
    }
    let host: string
    try { host = new URL(url).hostname.toLowerCase() } catch { continue }
    const m = byHost.get(host) ?? new Map<string, CrawledServer[]>()
    m.set(url, [...(m.get(url) ?? []), s])
    byHost.set(host, m)
  }
  let hosts = [...byHost.keys()].sort()
  if (LIMIT) hosts = seededShuffle(hosts, Number(SCAN.replace("-", ""))).slice(0, LIMIT)
  console.log(`${byHost.size} hosts; probing ${hosts.length}${LIMIT ? " (sample)" : ""}, up to ${PER_HOST} URLs each, ${CONCURRENCY} at a time`)

  // Finished probes from an interrupted run, keyed by URL. Read fully before the raw file
  // is reopened for writing (it may be the same path). A cut-off gzip tail is tolerated.
  const resumed = new Map<string, ProbeResult>()
  const resumeFile = opt("--resume")
  if (resumeFile) {
    const text = gunzipSync(readFileSync(resumeFile), { finishFlush: zc.Z_SYNC_FLUSH }).toString("utf8")
    for (const line of text.split("\n")) {
      try {
        const r = JSON.parse(line)
        resumed.set(r.url, { outcome: r.outcome, httpStatus: r.httpStatus, protocolVersion: r.protocolVersion, serverInfo: r.serverInfo, tools: r.tools, error: r.error })
      } catch {
        /* blank or cut-off line */
      }
    }
    console.log(`resuming: ${resumed.size} finished probes reused from ${resumeFile}`)
  }

  mkdirSync(RAW_DIR, { recursive: true })
  const rawPath = path.join(RAW_DIR, `${SCAN}${LIMIT ? `-sample${LIMIT}` : ""}.jsonl.gz`)
  const gz = createGzip()
  gz.pipe(createWriteStream(rawPath))

  let done = 0
  const queue = [...hosts]
  async function worker() {
    for (let host = queue.shift(); host !== undefined; host = queue.shift()) {
      const urls = [...byHost.get(host)!.entries()].sort(([a], [b]) => a.localeCompare(b))
      for (const [i, [url, group]] of urls.entries()) {
        if (i >= PER_HOST) {
          for (const s of group) rows.push({ scanId: SCAN, serverName: s.name, registryVersion: s.version, url, host, outcome: "host_capped" })
          continue
        }
        const r: ProbeResult = resumed.get(url) ?? (await probeServer(url))
        const tools = r.tools ?? []
        const { reach, evidence } = reachOf(tools)
        const hints = hintCounts(tools)
        gz.write(JSON.stringify({ scan: SCAN, url, host, servers: group.map((s) => s.name), at: new Date().toISOString(), ...r }) + "\n")
        for (const s of group) {
          rows.push({
            scanId: SCAN, serverName: s.name, registryVersion: s.version, url, host,
            outcome: r.outcome, httpStatus: r.httpStatus, protocolVersion: r.protocolVersion, serverInfo: r.serverInfo,
            toolCount: r.tools ? tools.length : null, toolNames: r.tools ? tools.map((t) => t.name) : null,
            reach: r.tools ? reach : null, reachEvidence: r.tools ? evidence : null,
            readOnlyTools: r.tools ? hints.readOnly : null, destructiveTools: r.tools ? hints.destructive : null,
            unlabelledTools: r.tools ? hints.undeclared : null,
            error: r.error,
          })
        }
      }
      if (++done % 100 === 0) console.log(`  ${done}/${hosts.length} hosts`)
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
  await new Promise<void>((res) => gz.end(res))

  if (!NO_DB) {
    for (let i = 0; i < rows.length; i += 200) {
      await db
        .insert(mcpScanResults)
        .values(rows.slice(i, i + 200))
        .onConflictDoUpdate({
          target: [mcpScanResults.scanId, mcpScanResults.serverName],
          set: Object.fromEntries(
            ["registryVersion", "url", "host", "outcome", "httpStatus", "protocolVersion", "serverInfo", "toolCount", "toolNames", "reach", "reachEvidence", "readOnlyTools", "destructiveTools", "unlabelledTools", "error"]
              .map((k) => [k, sql.raw(`excluded.${k.replace(/[A-Z]/g, (c) => "_" + c.toLowerCase())}`)]),
          ),
        })
    }
  }

  // Summary by HOST (one vote per host: its best outcome), so registry farms cannot skew it.
  const rank = ["listed", "sign_in", "not_mcp", "error", "unreachable", "refused_address", "refused_url", "host_capped"]
  const best = new Map<string, Row>()
  for (const r of rows) if (r.host && (!best.has(r.host) || rank.indexOf(r.outcome) < rank.indexOf(best.get(r.host)!.outcome))) best.set(r.host, r)
  const tally: Record<string, number> = {}
  for (const r of best.values()) tally[r.outcome] = (tally[r.outcome] ?? 0) + 1
  const listed = [...best.values()].filter((r) => r.outcome === "listed")
  const flagTally: Record<string, number> = {}
  for (const r of listed) for (const f of r.reach ?? []) flagTally[f] = (flagTally[f] ?? 0) + 1
  console.log(`\nScan ${SCAN}: ${rows.length} rows${NO_DB ? " (not written)" : " written"}; raw file ${rawPath}`)
  console.log("Hosts by outcome:", JSON.stringify(tally))
  console.log(`Hosts that listed tools: ${listed.length}; with each reach flag:`, JSON.stringify(flagTally))
  console.log("Hosts declaring readOnlyHint on every tool:", listed.filter((r) => r.toolCount && r.readOnlyTools === r.toolCount).length)
}

main().then(() => process.exit(0), (e) => { console.error(e); process.exit(1) })
