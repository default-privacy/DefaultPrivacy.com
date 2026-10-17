/** Opt-outs for the monthly scan: an exact host, or an exact registry name. */

import list from "@/data/mcp-scan-optout.json"

type Entry = { host?: string; name?: string; date: string; via: string }
const entries = (list.entries ?? []) as Entry[]

export function isOptedOut(host: string | null, name: string, from: Entry[] = entries): boolean {
  const h = host?.toLowerCase()
  return from.some((e) => (e.host && h === e.host.toLowerCase()) || (e.name && e.name === name))
}
