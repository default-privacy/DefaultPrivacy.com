/**
 * The published numbers for one scan, computed from its rows. One host counts once: its
 * best outcome across its addresses, so registry farms cannot swing the figures. Label
 * figures come from the servers' own tool annotations, summed over the host's distinct
 * listed URLs. Tool-name reach guesses are deliberately not part of the summary: an
 * independent check found them right 62 times in 80 (2026-10-16), below the bar to publish.
 */

export type ScanRow = {
  scanId: string
  host: string | null
  url: string | null
  outcome: string
  toolCount: number | null
  readOnlyTools: number | null
  destructiveTools: number | null
  unlabelledTools: number | null
}

const RANK = ["listed", "sign_in", "not_mcp", "error", "unreachable", "refused_address", "refused_url", "host_capped"]

export type ScanSummary = {
  scanId: string
  registryEntries: number
  hostedEntries: number
  packageOnlyEntries: number
  hosts: number
  hostsByOutcome: Record<string, number>
  openHosts: { total: number; allReadOnly: number; someDestructive: number; labelsNoDestructive: number; noLabels: number; noTools: number }
}

export function summarizeScan(rows: ScanRow[]): ScanSummary {
  const best = new Map<string, string>()
  const listedUrls = new Map<string, Map<string, ScanRow>>()
  for (const r of rows) {
    if (!r.host) continue
    const cur = best.get(r.host)
    if (cur === undefined || RANK.indexOf(r.outcome) < RANK.indexOf(cur)) best.set(r.host, r.outcome)
    if (r.outcome === "listed" && r.url) {
      const m = listedUrls.get(r.host) ?? new Map<string, ScanRow>()
      m.set(r.url, r)
      listedUrls.set(r.host, m)
    }
  }
  const hostsByOutcome: Record<string, number> = {}
  for (const o of best.values()) hostsByOutcome[o] = (hostsByOutcome[o] ?? 0) + 1

  const open = { total: 0, allReadOnly: 0, someDestructive: 0, labelsNoDestructive: 0, noLabels: 0, noTools: 0 }
  for (const [host, outcome] of best) {
    if (outcome !== "listed") continue
    open.total++
    let tools = 0, ro = 0, de = 0, un = 0
    for (const r of listedUrls.get(host)?.values() ?? []) {
      tools += r.toolCount ?? 0
      ro += r.readOnlyTools ?? 0
      de += r.destructiveTools ?? 0
      un += r.unlabelledTools ?? 0
    }
    if (tools === 0) open.noTools++
    else if (un === tools) open.noLabels++
    else if (ro === tools) open.allReadOnly++
    else if (de > 0) open.someDestructive++
    else open.labelsNoDestructive++
  }

  const packageOnly = rows.filter((r) => r.outcome === "no_remote").length
  return {
    scanId: rows[0]?.scanId ?? "",
    registryEntries: rows.length,
    hostedEntries: rows.length - packageOnly,
    packageOnlyEntries: packageOnly,
    hosts: best.size,
    hostsByOutcome,
    openHosts: open,
  }
}
