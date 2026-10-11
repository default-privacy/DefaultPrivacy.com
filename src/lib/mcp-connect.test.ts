import { describe, expect, it } from "vitest"
import { AI_APPS, claudeConnectorLink, cursorInstallLink, MCP_NAME, MCP_URL, vscodeInstallLink } from "./mcp-connect"

describe("install links", () => {
  it("Cursor's link carries our name and a base64 config holding only the URL", () => {
    const u = new URL(cursorInstallLink())
    expect(u.protocol).toBe("cursor:")
    expect(u.host).toBe("anysphere.cursor-deeplink")
    expect(u.pathname).toBe("/mcp/install")
    expect(u.searchParams.get("name")).toBe(MCP_NAME)
    expect(JSON.parse(atob(u.searchParams.get("config")!))).toEqual({ url: MCP_URL })
  })

  it("VS Code's link decodes to an http server named default-privacy, nothing else", () => {
    const link = vscodeInstallLink()
    expect(link.startsWith("vscode:mcp/install?")).toBe(true)
    expect(JSON.parse(decodeURIComponent(link.slice("vscode:mcp/install?".length)))).toEqual({
      name: MCP_NAME,
      type: "http",
      url: MCP_URL,
    })
  })

  it("neither link can make the editor run a command", () => {
    const cursor = atob(new URL(cursorInstallLink()).searchParams.get("config")!)
    const vscode = decodeURIComponent(vscodeInstallLink())
    for (const decoded of [cursor, vscode]) expect(decoded).not.toMatch(/"command"|"args"|"env"/)
  })
})

describe("Claude prefill link", () => {
  it("opens the custom connector dialog with our name and address", () => {
    const u = new URL(claudeConnectorLink())
    expect(u.origin + u.pathname).toBe("https://claude.ai/customize/connectors")
    expect(u.searchParams.get("modal")).toBe("add-custom-connector")
    expect(u.searchParams.get("connectorName")).toBe("Default Privacy")
    expect(u.searchParams.get("connectorUrl")).toBe(MCP_URL)
  })
})

describe("AI_APPS", () => {
  it("every app has either a one-click link or steps, and an https source", () => {
    for (const a of AI_APPS) {
      expect(a.install || a.steps, a.id).toBeTruthy()
      expect(a.sources.length, a.id).toBeGreaterThan(0)
      for (const u of a.sources) expect(u.startsWith("https://"), a.id).toBe(true)
    }
  })
  it("ids are unique and usable as page anchors", () => {
    const ids = AI_APPS.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/)
  })
})
