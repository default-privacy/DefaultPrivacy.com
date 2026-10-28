import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { describe, expect, it } from "vitest"
import { configureServer, SERVER_INFO, SERVER_INSTRUCTIONS } from "./server"

// Every discovery file must list exactly the tools, resources and prompts the server
// registers. Captured with a stand-in server, so nothing runs.
type ToolConfig = {
  title?: string
  description?: string
  annotations?: { readOnlyHint?: boolean; destructiveHint?: boolean; idempotentHint?: boolean; openWorldHint?: boolean }
}
const tools = new Map<string, ToolConfig>()
const resources: string[] = []
const prompts: string[] = []
configureServer({
  registerTool: (name: string, config: ToolConfig) => void tools.set(name, config),
  registerResource: (_name: string, uri: string) => void resources.push(uri),
  registerPrompt: (name: string) => void prompts.push(name),
} as unknown as McpServer)

const sorted = (xs: Iterable<string>) => [...new Set(xs)].sort()
const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8")
const toolNames = sorted(tools.keys())

/** The body under a markdown heading, up to the next heading. */
function section(text: string, heading: string): string {
  const start = text.indexOf(`\n${heading}\n`)
  if (start === -1) throw new Error(`heading not found: ${heading}`)
  const rest = text.slice(start + heading.length + 2)
  const end = rest.search(/\n#{1,6} /)
  return end === -1 ? rest : rest.slice(0, end)
}
const backtickedTools = (text: string) => sorted([...text.matchAll(/`(dp_[a-z_]+)`/g)].map((m) => m[1]))

describe("discovery files list exactly the registered tools", () => {
  const card = JSON.parse(read("public/.well-known/mcp-server.json"))
  const root = JSON.parse(read("public/.well-known/agentroot.json"))

  it("mcp-server.json", () => {
    expect(sorted(card.tool_names)).toEqual(toolNames)
    expect(sorted(card.resource_uris)).toEqual(sorted(resources))
    expect(sorted(card.prompt_names)).toEqual(sorted(prompts))
  })

  it("agentroot.json", () => {
    expect(sorted(root.capabilities.map((c: { name: string }) => c.name))).toEqual(toolNames)
    expect(sorted(root.discovery.resources)).toEqual(sorted(resources))
  })

  it("llms.txt", () => {
    const mcp = section(read("public/llms.txt"), "## MCP Server")
    expect(backtickedTools(mcp)).toEqual(toolNames)
    expect(sorted([...mcp.matchAll(/`(defaultprivacy:\/\/[a-z]+)`/g)].map((m) => m[1]))).toEqual(sorted(resources))
  })

  it("llms-full.txt", () => {
    expect(backtickedTools(section(read("public/llms-full.txt"), "### MCP server"))).toEqual(toolNames)
  })

  it("agents.md", () => {
    const mcp = section(read("public/agents.md"), "## Use the MCP server")
    expect(backtickedTools(mcp)).toEqual(toolNames)
    const group = mcp.match(/`defaultprivacy:\/\/\{([a-z,]+)\}`/)?.[1] ?? ""
    expect(sorted(group.split(",").map((r) => `defaultprivacy://${r}`))).toEqual(sorted(resources))
  })

  it("one version everywhere", () => {
    expect(card.version).toBe(SERVER_INFO.version)
    expect(JSON.parse(read("server.json")).version).toBe(SERVER_INFO.version)
  })
})

describe("every tool", () => {
  it.each(toolNames)("%s has a title, a description and read-only annotations", (name) => {
    const t = tools.get(name)!
    expect(t.title).toBeTruthy()
    expect(t.description).toBeTruthy()
    expect(t.annotations?.readOnlyHint).toBe(true)
    expect(t.annotations?.destructiveHint).toBe(false)
    expect(t.annotations?.idempotentHint).toBe(true)
    expect(typeof t.annotations?.openWorldHint).toBe("boolean")
  })

  it.each(toolNames)("%s is routed in the server instructions", (name) => {
    expect(SERVER_INSTRUCTIONS).toMatch(new RegExp(`\\b${name}\\b`))
  })
})

describe("picks replaced the ADO score", () => {
  const files = [
    "public/llms.txt",
    "public/llms-full.txt",
    "public/agents.md",
    "public/api/openapi.json",
    "public/.well-known/agentroot.json",
    "public/.well-known/mcp-server.json",
    "server.json",
  ]
  it.each(files)("%s no longer mentions ADO", (f) => {
    expect(read(f)).not.toMatch(/\bADO\b/)
  })
  it("openapi keeps ado_score only as the deprecated sort alias", () => {
    const o = read("public/api/openapi.json")
    expect(o).not.toContain("min_ado_score")
    expect(o).toContain('"picks"')
  })
  it("tool descriptions and instructions describe pick order, not ADO", () => {
    for (const t of tools.values()) expect(t.description ?? "").not.toMatch(/\bADO\b/)
    expect(SERVER_INSTRUCTIONS).not.toMatch(/\bADO\b/)
    expect(SERVER_INSTRUCTIONS).toContain("how-we-pick")
    expect(SERVER_INFO.version).toBe("1.10.6")
  })
})

describe("retired directory flags are gone", () => {
  const RETIRED = /accepts_crypto|no_kyc|is_security_audited|security_audit|audit_url|audit_date|\bauditor\b/
  it("dp_search_tools takes no retired filter and no description names them", () => {
    const schema: Record<string, unknown> = {}
    const t = tools.get("dp_search_tools") as ToolConfig & { inputSchema?: Record<string, unknown> }
    Object.assign(schema, t.inputSchema ?? {})
    expect(Object.keys(schema)).not.toContain("accepts_crypto")
    expect(Object.keys(schema)).not.toContain("no_kyc")
    for (const x of tools.values()) expect(x.description ?? "").not.toMatch(/no kyc|accepts crypto|audit status/i)
    expect(SERVER_INSTRUCTIONS).not.toMatch(/no kyc/i)
  })
  it("the OpenAPI document has none of them except the removal note", () => {
    const o = JSON.parse(read("public/api/openapi.json"))
    const note = o.info.description.split("Removed 2026-10-09:")[1]
    expect(note).toBeTruthy()
    o.info.description = o.info.description.split("Removed 2026-10-09:")[0]
    expect(JSON.stringify(o)).not.toMatch(RETIRED)
  })
  it("other discovery files do not offer them", () => {
    for (const f of ["public/.well-known/mcp-server.json", "public/.well-known/agentroot.json", "public/agents.md", "public/llms-full.txt", "server.json"])
      expect(read(f)).not.toMatch(RETIRED)
  })
})

describe("one MCP address, no hard-coded directory size", () => {
  const files = [
    "public/llms.txt",
    "public/llms-full.txt",
    "public/agents.md",
    "public/api/openapi.json",
    "public/.well-known/agentroot.json",
    "public/.well-known/mcp-server.json",
    "public/.well-known/services.json",
    "server.json",
  ]
  it.each(files)("%s points at mcp.defaultprivacy.com, never the old path", (f) => {
    expect(read(f)).not.toMatch(/\/api\/(privacy\/)?mcp\b/)
  })
  it("the agent-facing descriptors carry the canonical address", () => {
    for (const f of ["server.json", "public/.well-known/mcp-server.json", "public/.well-known/agentroot.json", "public/llms.txt", "public/agents.md"])
      expect(read(f)).toContain("https://mcp.defaultprivacy.com")
  })
  it.each(files)("%s gives no hard-coded tool count (it drifts)", (f) => {
    expect(read(f)).not.toMatch(/\b\d{3,}\+? (privacy )?tools\b/i)
  })
})
