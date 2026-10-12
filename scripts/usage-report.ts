/**
 * Usage report — a local, read-only pulse check on real demand.
 *
 * Reads the first-party, no-PII usage_counts table (which tools / free tools /
 * searches actually get used) plus the operational API stats, and prints a plain
 * terminal report. Nothing is exposed to the web — you run this when you want a
 * pulse. Point it at prod or local purely by which DATABASE_URL you pass:
 *
 *   # local Docker
 *   bun run scripts/usage-report.ts
 *   # prod Neon (from this box, over :443)
 *   DATABASE_URL="$NEON_URL" bun run scripts/usage-report.ts
 *   # window other than 30 days
 *   DATABASE_URL="$NEON_URL" bun run scripts/usage-report.ts --days 7
 */
import { getUsageCounts, TRAFFIC_KINDS } from "@/lib/analytics/usage"
import { getApiStats } from "@/lib/api-analytics"

const daysArg = process.argv.indexOf("--days")
const DAYS = daysArg !== -1 ? Number(process.argv[daysArg + 1]) || 30 : 30

// NOTE: guide_read / glossary_read are a per-slug DRILL-DOWN of mcp_tool, not a
// separate channel — one dp_get_guide call writes both an "mcp_tool" row and a
// "guide_read" row. So the "Demand by channel" bars double-count if you sum them.
// They also only ever see AGENT traffic: a human reading /guides/[slug] in a browser
// is invisible here, because those pages are prerendered and never run this code.
const KIND_LABEL: Record<string, string> = {
  mcp_tool: "MCP tools (agents)",
  free_tool: "Free tools (humans)",
  directory_search: "Directory search",
  guide_read: "→ guides, per slug (agents)",
  glossary_read: "→ glossary, per slug (agents)",
  mcp_method: "MCP messages (protocol)",
  mcp_client: "MCP connections (apps)",
  mcp_protocol: "MCP requests by protocol version",
  mcp_accept: "MCP POSTs by Accept header",
}

const isContentKind = (kind: string) => kind === "guide_read" || kind === "glossary_read"

const bar = (n: number, max: number, width = 24) =>
  max > 0 ? "█".repeat(Math.max(1, Math.round((n / max) * width))) : ""

function section(title: string) {
  console.log(`\n${title}\n${"─".repeat(title.length)}`)
}

async function main() {
  const [usage, api] = await Promise.all([getUsageCounts(DAYS), getApiStats(DAYS)])

  console.log(`\n╔═══ DEFAULT PRIVACY — USAGE REPORT (last ${DAYS} days) ═══╗`)

  section("Demand by channel")
  if (usage.byKind.length === 0) {
    console.log("  (no usage recorded yet)")
  } else {
    const max = Math.max(...usage.byKind.map((k) => k.total))
    for (const k of usage.byKind) {
      const label = (KIND_LABEL[k.kind] ?? k.kind).padEnd(20)
      console.log(`  ${label} ${String(k.total).padStart(6)}  ${bar(k.total, max)}`)
    }
  }

  section(`Top used (tool / search buckets)`)
  const toolKeys = usage.topKeys.filter((k) => !isContentKind(k.kind) && !TRAFFIC_KINDS.includes(k.kind))
  if (toolKeys.length === 0) {
    console.log("  (nothing recorded yet)")
  } else {
    const max = Math.max(...toolKeys.map((k) => k.total))
    for (const k of toolKeys.slice(0, 25)) {
      const label = `${k.key}`.padEnd(28)
      const chan = `[${k.kind}]`.padEnd(19)
      console.log(`  ${label} ${chan} ${String(k.total).padStart(5)}  ${bar(k.total, max, 16)}`)
    }
  }

  section("Top content pulled by agents (guides / glossary, per slug)")
  const contentKeys = usage.topKeys.filter((k) => isContentKind(k.kind))
  if (contentKeys.length === 0) {
    console.log("  (nothing recorded yet — ships empty until the next deploy)")
  } else {
    const max = Math.max(...contentKeys.map((k) => k.total))
    for (const k of contentKeys.slice(0, 25)) {
      const label = `${k.key}`.padEnd(40)
      const chan = `[${k.kind === "guide_read" ? "guide" : "glossary"}]`.padEnd(11)
      console.log(`  ${label} ${chan} ${String(k.total).padStart(5)}  ${bar(k.total, max, 16)}`)
    }
  }

  section("Who connects to the MCP (app name on connect)")
  const clients = usage.topKeys.filter((k) => k.kind === "mcp_client")
  const methods = usage.topKeys.filter((k) => k.kind === "mcp_method")
  if (clients.length === 0) {
    console.log("  (nothing recorded yet)")
  } else {
    const max = Math.max(...clients.map((k) => k.total))
    for (const k of clients.slice(0, 25)) {
      console.log(`  ${k.key.padEnd(34)} ${String(k.total).padStart(6)}  ${bar(k.total, max, 16)}`)
    }
  }
  if (methods.length > 0) {
    console.log("  messages by type:")
    for (const k of methods) console.log(`    ${k.key.padEnd(32)} ${String(k.total).padStart(6)}`)
  }
  const protocols = usage.topKeys.filter((k) => k.kind === "mcp_protocol")
  if (protocols.length > 0) {
    console.log("  requests by protocol version (2026-07-28 = apps with no handshake, so no app name):")
    for (const k of protocols) console.log(`    ${k.key.padEnd(32)} ${String(k.total).padStart(6)}`)
  }
  const accepts = usage.topKeys.filter((k) => k.kind === "mcp_accept")
  if (accepts.length > 0) {
    console.log("  POSTs by Accept header (anything but json+sse gets a 406):")
    for (const k of accepts) console.log(`    ${k.key.padEnd(32)} ${String(k.total).padStart(6)}`)
  }

  section("Daily total (demand, excludes MCP protocol traffic)")
  if (usage.dailyTotal.length === 0) {
    console.log("  (no days recorded yet)")
  } else {
    const max = Math.max(...usage.dailyTotal.map((d) => d.total))
    for (const d of usage.dailyTotal) {
      console.log(`  ${d.date}  ${String(d.total).padStart(6)}  ${bar(d.total, max)}`)
    }
  }

  section("API operations (all /api endpoints)")
  console.log(`  total requests   ${api.totalRequests}`)
  console.log(`  success rate     ${api.successRate}%`)
  console.log(`  avg response     ${api.avgResponseTime} ms`)
  console.log(`  rate-limited     ${api.rateLimitedCount}`)
  if (api.topEndpoints.length > 0) {
    console.log("  top endpoints:")
    for (const e of api.topEndpoints.slice(0, 10)) {
      console.log(`    ${e.endpoint.padEnd(32)} ${String(e.count).padStart(6)}`)
    }
  }

  console.log("")
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
