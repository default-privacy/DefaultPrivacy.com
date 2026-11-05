/**
 * Copies the EasyPrivacy tracker rules into src/data/easyprivacy-snapshot.json, the only
 * place the scanner reads them from. Run about weekly and commit the file; the nightly
 * Directory Health run reports when it is older than 10 days.
 *
 *   bun run sync:easyprivacy
 *
 * The scanner never fetches the list while running. Cosmetic (page-hiding) rules are
 * dropped: the scanner only matches network requests.
 * Licence: GPLv3 or CC BY-SA 3.0, credit "The EasyList authors (https://easylist.to/)".
 */

import { writeFile } from "node:fs/promises"
import { join } from "node:path"

const SOURCE = "https://easylist.to/easylist/easyprivacy.txt"
const OUT = join(import.meta.dir, "..", "src", "data", "easyprivacy-snapshot.json")

async function main() {
  const res = await fetch(SOURCE, {
    headers: { "user-agent": "DefaultPrivacy-sync/1.0 (+https://defaultprivacy.com/ai)" },
    signal: AbortSignal.timeout(30_000),
  })
  if (!res.ok) throw new Error(`EasyPrivacy: HTTP ${res.status}`)
  const text = await res.text()
  const version = /^! Version: (\S+)/m.exec(text)?.[1]
  if (!version) throw new Error("EasyPrivacy: no '! Version:' header, refusing to write")

  const rules = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("!") && !l.startsWith("[") && !l.includes("##") && !l.includes("#@#"))
  if (rules.length < 10_000) throw new Error(`EasyPrivacy: only ${rules.length} rules, refusing to write`)

  await writeFile(
    OUT,
    JSON.stringify({ copied_on: new Date().toISOString().slice(0, 10), version, source: SOURCE, rules }),
  )
  console.log(`Wrote ${rules.length} rules (EasyPrivacy ${version}) to ${OUT}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
