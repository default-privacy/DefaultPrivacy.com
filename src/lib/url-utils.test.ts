import { describe, expect, it } from "vitest"
import { normalizeUrl, extractDomain, ensureProtocol } from "./url-utils"

describe("normalizeUrl", () => {
  it("strips protocol and www", () => {
    expect(normalizeUrl("https://www.example.com")).toBe("example.com")
    expect(normalizeUrl("http://www.example.com")).toBe("example.com")
  })

  it("strips trailing slashes", () => {
    expect(normalizeUrl("https://example.com/path/")).toBe("example.com/path")
  })

  it("adds https when no protocol", () => {
    expect(normalizeUrl("example.com")).toBe("example.com")
  })

  it("handles invalid URLs gracefully", () => {
    expect(normalizeUrl("not-a-url")).toBe("not-a-url")
  })
})

describe("extractDomain", () => {
  it("extracts domain from full URL", () => {
    expect(extractDomain("https://www.example.com/path")).toBe("example.com")
  })

  it("strips www", () => {
    expect(extractDomain("https://www.sub.example.com")).toBe("sub.example.com")
  })

  it("handles URL without protocol", () => {
    expect(extractDomain("example.com")).toBe("example.com")
  })
})

describe("ensureProtocol", () => {
  it("adds https when missing", () => {
    expect(ensureProtocol("example.com")).toBe("https://example.com")
  })

  it("preserves existing https", () => {
    expect(ensureProtocol("https://example.com")).toBe("https://example.com")
  })

  it("preserves existing http", () => {
    expect(ensureProtocol("http://example.com")).toBe("http://example.com")
  })
})
