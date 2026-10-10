/**
 * MCP smoke test — connects to the running dev server's /api/mcp endpoint via the
 * official SDK client (real initialize handshake), lists tools/resources/prompts, and
 * calls a couple of tools. Throwaway dev utility.
 *
 *   MCP_URL=http://localhost:3000/api/mcp bun scripts/mcp-smoke.mjs
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"

const url = new URL(process.env.MCP_URL || "http://localhost:3000/api/mcp")
const client = new Client({ name: "dp-smoke", version: "1.0.0" })
const transport = new StreamableHTTPClientTransport(url)

async function safe(label, fn) {
  try {
    const r = await fn()
    console.log(`✅ ${label}: ${r}`)
  } catch (e) {
    console.log(`❌ ${label}: ${e?.message || String(e)}`)
  }
}

try {
  await client.connect(transport)
  console.log("✅ connected — serverInfo:", JSON.stringify(client.getServerVersion?.() ?? {}))
  const instr = client.getInstructions?.()
  console.log("   instructions present:", instr ? `${instr.length} chars` : "no")
} catch (e) {
  console.log("❌ connect failed:", e?.message || e)
  process.exit(1)
}

await safe("tools/list", async () => {
  const { tools } = await client.listTools()
  return `${tools.length} tools → ${tools.map((t) => t.name).join(", ")}`
})
await safe("resources/list", async () => {
  const { resources } = await client.listResources()
  return resources.map((r) => r.uri).join(", ")
})
await safe("prompts/list", async () => {
  const { prompts } = await client.listPrompts()
  return prompts.map((p) => p.name).join(", ")
})
await safe("call dp_search_glossary (file-based, no DB)", async () => {
  const r = await client.callTool({ name: "dp_search_glossary", arguments: { limit: 3 } }, undefined, { timeout: 15000 })
  const parsed = JSON.parse(r.content?.[0]?.text || "{}")
  return `isError=${!!r.isError} total=${parsed.total} first="${parsed.data?.[0]?.term ?? "-"}"`
})
await safe("call dp_list_categories (Neon over HTTP)", async () => {
  const r = await client.callTool({ name: "dp_list_categories", arguments: {} }, undefined, { timeout: 8000 })
  const parsed = JSON.parse(r.content?.[0]?.text || "{}")
  return `isError=${!!r.isError} groups=${parsed.groups?.length ?? 0}`
})

await client.close()
process.exit(0)
