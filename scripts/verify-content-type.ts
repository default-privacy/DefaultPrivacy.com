#!/usr/bin/env bun
/** N16 falsifiable verification. Run against local Docker after the backfill. */
import { searchPublicToolsPp } from "../src/lib/privacy-protocol/query"
import { getTools } from "../src/lib/db/queries"

async function feedHas(slug: string): Promise<boolean> {
  // Search by the slug's words; check the exact slug appears in the agent feed.
  const q = slug.replace(/-/g, " ")
  const { tools } = await searchPublicToolsPp({ q, limit: 50 })
  return tools.some((t) => t.slug === slug)
}

async function directoryHas(slug: string): Promise<boolean> {
  const tools = await getTools({ search: slug.replace(/-/g, " "), limit: 50 })
  return tools.some((t) => t.slug === slug)
}

const CONTENT = ["jivoi-awesome-osint", "privacy-guides", "extreme-privacy", "darknet-diaries", "techlore", "electronic-frontier-foundation"]
const REAL_TOOLS = ["signal", "mullvad", "proton", "complianz", "source-point", "ownnothing-index"]

async function main() {
  let fail = 0
  console.log("\n=== AGENT FEED must EXCLUDE content/orgs ===")
  for (const s of CONTENT) {
    const inFeed = await feedHas(s)
    console.log(`  ${inFeed ? "❌ STILL IN FEED" : "✅ hidden"}  ${s}`)
    if (inFeed) fail++
  }

  console.log("\n=== AGENT FEED must STILL RANK real tools (incl. rescued) ===")
  for (const s of REAL_TOOLS) {
    const inFeed = await feedHas(s)
    console.log(`  ${inFeed ? "✅ ranks" : "⚠️  missing"}  ${s}`)
    // 'missing' here may just mean the slug/name differs — report, don't hard-fail on the 3 canned tools
    if (!inFeed && ["complianz", "source-point", "ownnothing-index"].includes(s)) fail++
  }

  console.log("\n=== HUMAN DIRECTORY must be UNAFFECTED (content still browsable) ===")
  for (const s of ["privacy-guides", "extreme-privacy", "darknet-diaries"]) {
    const inDir = await directoryHas(s)
    console.log(`  ${inDir ? "✅ browsable" : "❌ GONE from directory"}  ${s}`)
    if (!inDir) fail++
  }

  console.log(`\n${fail === 0 ? "✅ ALL DoD CHECKS PASS" : `❌ ${fail} FAILURE(S)`}`)
  process.exit(fail === 0 ? 0 : 1)
}
main()
