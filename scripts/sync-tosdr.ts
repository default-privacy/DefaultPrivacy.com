/**
 * Copies ToS;DR's reviews for the hand-checked services in src/lib/tosdr/services.ts into
 * src/data/tosdr-snapshot.json, the only place the MCP reads them from. Run about weekly and
 * commit the file; the nightly Directory Health run reports when it is older than 10 days.
 *
 *   bun run sync:tosdr
 *
 * The server never calls ToS;DR, so ToS;DR never learns which product anyone asked about.
 * ToS;DR allows 5 requests per 10 seconds, so this paces itself at one request every 2.5 s.
 * It refuses to write if a service id now returns a different name than the hand-checked one.
 * Data licence: CC BY-SA 3.0 (with an exception for AGPL-3.0 programs), attribution in every reply.
 */

import { writeFile, readFile } from "node:fs/promises"
import { join } from "node:path"
import { TOSDR_SERVICES } from "../src/lib/tosdr/services"
import { trimService, type RawService } from "../src/lib/tosdr/trim"

const OUT = join(import.meta.dir, "..", "src", "data", "tosdr-snapshot.json")
const UA = "DefaultPrivacy-sync/1.0 (+https://defaultprivacy.com/ai)"
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function fetchService(id: number): Promise<RawService> {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(`https://api.tosdr.org/service/v3/?id=${id}`, {
      headers: { "user-agent": UA, accept: "application/json" },
      signal: AbortSignal.timeout(15_000),
    })
    if (res.status === 429) {
      await sleep(11_000)
      continue
    }
    if (!res.ok) throw new Error(`ToS;DR service ${id}: HTTP ${res.status}`)
    return (await res.json()) as RawService
  }
  throw new Error(`ToS;DR service ${id}: still rate-limited after 6 tries`)
}

async function main() {
  const previous = await readFile(OUT, "utf8").then(JSON.parse).catch(() => null)
  const ids = [...new Set(TOSDR_SERVICES.map((s) => s.id))]
  const services: Record<string, ReturnType<typeof trimService>> = {}
  for (const [i, id] of ids.entries()) {
    if (i > 0) await sleep(2_500)
    const expected = TOSDR_SERVICES.find((s) => s.id === id)!.name
    const raw = await fetchService(id)
    if (raw.name.trim() !== expected) {
      throw new Error(`ToS;DR service ${id} is now named "${raw.name.trim()}", not "${expected}". Re-check the row in src/lib/tosdr/services.ts by hand.`)
    }
    services[id] = trimService(raw)
    const was = previous?.services?.[id]?.rating ?? null
    const now = services[id].rating
    console.log(`${id}\t${expected}\t${now ?? "unrated"}${previous && was !== now ? `\t(was ${was ?? "unrated"})` : ""}`)
  }
  const snapshot = {
    source: "ToS;DR (https://tosdr.org)",
    licence: "CC BY-SA 3.0",
    licence_url: "https://creativecommons.org/licenses/by-sa/3.0/",
    copied_on: new Date().toISOString().slice(0, 10),
    services,
  }
  await writeFile(OUT, `${JSON.stringify(snapshot, null, 2)}\n`)
  console.log(`wrote ${Object.keys(services).length} services to ${OUT}`)
}

main().catch((e) => {
  console.error(String(e?.message ?? e))
  process.exit(1)
})
