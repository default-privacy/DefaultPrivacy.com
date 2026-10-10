import { describe, it, expect } from "vitest"
import { assertSafeScanTarget, isScanRequestAllowed, UnsafeScanTargetError } from "./ssrf-guard"

// All cases use IP literals / localhost / scheme checks so no real DNS lookup happens —
// the suite is fully offline and deterministic. 8.8.8.8 / 1.1.1.1 are public literals.

describe("assertSafeScanTarget (initial-target guard)", () => {
  it("allows a public https target (IP literal, no DNS)", async () => {
    await expect(assertSafeScanTarget("https://8.8.8.8/")).resolves.toBe("https://8.8.8.8/")
  })

  it("rejects non-https schemes", async () => {
    await expect(assertSafeScanTarget("http://8.8.8.8/")).rejects.toBeInstanceOf(UnsafeScanTargetError)
    await expect(assertSafeScanTarget("ftp://8.8.8.8/")).rejects.toBeInstanceOf(UnsafeScanTargetError)
  })

  it("rejects non-standard ports", async () => {
    await expect(assertSafeScanTarget("https://8.8.8.8:8443/")).rejects.toBeInstanceOf(UnsafeScanTargetError)
  })

  it("rejects embedded credentials", async () => {
    await expect(assertSafeScanTarget("https://user:pass@8.8.8.8/")).rejects.toBeInstanceOf(UnsafeScanTargetError)
  })

  it("rejects loopback / private / CGNAT / link-local (metadata) literals", async () => {
    for (const u of [
      "https://127.0.0.1/",
      "https://10.0.0.1/",
      "https://192.168.1.1/",
      "https://172.16.0.1/",
      "https://100.64.0.1/",
      "https://169.254.169.254/", // AWS/GCP cloud metadata
      "https://[::1]/",
      "https://[::ffff:127.0.0.1]/", // IPv4-mapped loopback
    ]) {
      await expect(assertSafeScanTarget(u)).rejects.toBeInstanceOf(UnsafeScanTargetError)
    }
  })

  it("rejects localhost and internal suffixes", async () => {
    await expect(assertSafeScanTarget("https://localhost/")).rejects.toBeInstanceOf(UnsafeScanTargetError)
    await expect(assertSafeScanTarget("https://db.internal/")).rejects.toBeInstanceOf(UnsafeScanTargetError)
  })

  it("rejects malformed URLs", async () => {
    await expect(assertSafeScanTarget("not a url")).rejects.toBeInstanceOf(UnsafeScanTargetError)
  })
})

describe("isScanRequestAllowed (per-request guard — redirects & subresources)", () => {
  it("blocks the cloud-metadata endpoint over BOTH http and https (the N5 negative control)", async () => {
    expect(await isScanRequestAllowed("http://169.254.169.254/latest/meta-data/")).toBe(false)
    expect(await isScanRequestAllowed("https://169.254.169.254/latest/meta-data/")).toBe(false)
  })

  it("blocks loopback, private, and IPv6-reserved hosts", async () => {
    for (const u of [
      "https://127.0.0.1/",
      "https://10.1.2.3/",
      "https://192.168.0.1/",
      "https://172.31.255.255/",
      "https://[::1]/",
      "https://[fd00::1]/", // unique-local
      "https://[fe80::1]/", // link-local
      "https://[::ffff:169.254.169.254]/",
    ]) {
      expect(await isScanRequestAllowed(u)).toBe(false)
    }
  })

  it("blocks non-TLS and exotic schemes outright", async () => {
    expect(await isScanRequestAllowed("http://8.8.8.8/")).toBe(false)
    expect(await isScanRequestAllowed("ws://8.8.8.8/")).toBe(false)
    expect(await isScanRequestAllowed("ftp://8.8.8.8/")).toBe(false)
    expect(await isScanRequestAllowed("file:///etc/passwd")).toBe(false)
    expect(await isScanRequestAllowed("gopher://8.8.8.8/")).toBe(false)
  })

  it("blocks localhost and internal suffixes", async () => {
    expect(await isScanRequestAllowed("https://localhost/")).toBe(false)
    expect(await isScanRequestAllowed("https://redis.internal/")).toBe(false)
  })

  it("allows https/wss to a public host and inert data: schemes", async () => {
    expect(await isScanRequestAllowed("https://8.8.8.8/script.js")).toBe(true)
    expect(await isScanRequestAllowed("wss://1.1.1.1/socket")).toBe(true)
    expect(await isScanRequestAllowed("data:text/html,<h1>x</h1>")).toBe(true)
  })

  it("fails closed on a malformed URL", async () => {
    expect(await isScanRequestAllowed("http://")).toBe(false)
    expect(await isScanRequestAllowed("::::")).toBe(false)
  })
})
