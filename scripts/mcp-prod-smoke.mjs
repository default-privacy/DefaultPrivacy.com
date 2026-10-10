#!/usr/bin/env bun
/**
 * Production MCP contract smoke for the formation-free hub.
 * Compares live discovery + tools/resources/prompts lists against the
 * checked-in public/.well-known/mcp-server.json.
 *
 *   BASE_URL=https://defaultprivacy.com bun run smoke:mcp:prod
 *   bun scripts/mcp-prod-smoke.mjs --base https://preview-xxx.vercel.app
 */

import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const MANIFEST_PATH = join(ROOT, "public/.well-known/mcp-server.json")

function parseBase(argv) {
  let base = process.env.BASE_URL ?? "https://defaultprivacy.com"
  for (let i = 0; i < argv.length; i++) {
    if ((argv[i] === "--base" || argv[i] === "--url") && argv[i + 1]) {
      base = argv[++i]
    }
  }
  return base.replace(/\/$/, "")
}

function assertSortedEqual(actual, expected, label) {
  const a = [...actual].sort()
  const e = [...expected].sort()
  if (a.length !== e.length) {
    throw new Error(`${label}: expected ${e.length}, got ${a.length}\n  expected: ${e.join(", ")}\n  actual:   ${a.join(", ")}`)
  }
  for (let i = 0; i < e.length; i++) {
    if (a[i] !== e[i]) {
      throw new Error(`${label} mismatch at ${i}: expected ${e[i]}, got ${a[i]}`)
    }
  }
}

const expected = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
const base = parseBase(process.argv.slice(2))
const mcpUrl = new URL(`${base}/api/mcp`)

console.log(`[smoke:mcp:prod] base=${base}`)
console.log("================================")

const discoveryRes = await fetch(`${base}/.well-known/mcp-server.json`)
if (!discoveryRes.ok) {
  throw new Error(`mcp-server.json returned ${discoveryRes.status}`)
}
const discovery = await discoveryRes.json()

assertSortedEqual(discovery.tool_names ?? [], expected.tool_names, "discovery tool_names")
assertSortedEqual(discovery.resource_uris ?? [], expected.resource_uris, "discovery resource_uris")
assertSortedEqual(discovery.prompt_names ?? [], expected.prompt_names, "discovery prompt_names")

const liveMcp = discovery.transports?.streamable_http?.url
if (liveMcp !== `${base}/api/mcp`) {
  throw new Error(`discovery streamable_http.url mismatch: expected ${base}/api/mcp, got ${liveMcp}`)
}
console.log("OK  discovery  /.well-known/mcp-server.json parity")

const client = new Client({ name: "mcp-prod-smoke", version: "1.0.0" })
const transport = new StreamableHTTPClientTransport(mcpUrl)

try {
  await client.connect(transport)

  const { tools } = await client.listTools()
  assertSortedEqual(
    tools.map((t) => t.name),
    expected.tool_names,
    "tools/list"
  )
  console.log(`OK  tools/list  ${tools.length} tools`)

  const { resources } = await client.listResources()
  assertSortedEqual(
    resources.map((r) => r.uri),
    expected.resource_uris,
    "resources/list"
  )
  console.log(`OK  resources/list  ${resources.length} resources`)

  const { prompts } = await client.listPrompts()
  assertSortedEqual(
    prompts.map((p) => p.name),
    expected.prompt_names,
    "prompts/list"
  )
  console.log(`OK  prompts/list  ${prompts.length} prompts`)

  console.log("")
  console.log("All MCP production smoke probes passed.")
} catch (error) {
  console.error("")
  console.error("[smoke:mcp:prod] FAIL:", error instanceof Error ? error.message : error)
  process.exitCode = 1
} finally {
  await client.close().catch(() => {})
}
