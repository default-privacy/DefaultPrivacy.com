import { describe, expect, it } from "vitest"
import { matchMcpRef, normalizeRef } from "./mcp-vetting"

const listing = (slug: string, name: string, repo: string) => ({
  slug,
  name,
  website_url: repo,
  trust: { source_code_url: repo },
})
const LISTINGS = [
  listing("bitwarden-mcp-server", "Bitwarden MCP Server", "https://github.com/bitwarden/mcp-server"),
  listing("kagi-mcp-server", "Kagi MCP Server", "https://github.com/kagisearch/kagimcp"),
]

describe("normalizeRef", () => {
  it("drops scheme, www, trailing slash and .git, and lowercases", () => {
    expect(normalizeRef("HTTPS://www.GitHub.com/bitwarden/mcp-server.git/")).toBe("github.com/bitwarden/mcp-server")
  })
})

describe("matchMcpRef", () => {
  it.each([
    ["https://github.com/bitwarden/mcp-server", "bitwarden-mcp-server"],
    ["github.com/kagisearch/kagimcp/", "kagi-mcp-server"],
    ["kagi-mcp-server", "kagi-mcp-server"],
    ["Bitwarden MCP Server", "bitwarden-mcp-server"],
  ])("%s is the vetted listing %s", (ref, slug) => {
    expect(matchMcpRef(ref, LISTINGS).exact?.slug).toBe(slug)
  })

  it("does not call a look-alike vetted, but offers it as similar", () => {
    const r = matchMcpRef("https://github.com/someone-else/bitwarden-mcp", LISTINGS)
    expect(r.exact).toBeNull()
    expect(r.similar.map((l) => l.slug)).toEqual(["bitwarden-mcp-server"])
  })

  it("returns nothing for an unknown server or empty input", () => {
    expect(matchMcpRef("https://github.com/example/weather-mcp", LISTINGS)).toEqual({ exact: null, similar: [] })
    expect(matchMcpRef("   ", LISTINGS)).toEqual({ exact: null, similar: [] })
  })
})
