import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

// The worker path must HARD-FAIL, never silently fall back to a fabricated grade.
// These lock that contract: a worker error throws (→ success:false upstream), a
// simulated payload is rejected outright, and only a clean result passes through.
describe("fetchScanFromWorker — hard-fail, never mock", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv("SCAN_WORKER_URL", "http://worker.test")
    vi.stubEnv("SCAN_WORKER_SECRET", "test-secret")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  const jsonResponse = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json" },
    })

  it("throws on a non-OK worker response (no mock fallback)", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("boom", { status: 503 })))
    const { fetchScanFromWorker } = await import("./worker-client")
    await expect(fetchScanFromWorker("https://example.com/")).rejects.toThrow(/503/)
  })

  it("throws if the worker returns a simulated result", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse({ simulated: true, url: "https://example.com" })))
    const { fetchScanFromWorker } = await import("./worker-client")
    await expect(fetchScanFromWorker("https://example.com/")).rejects.toThrow(/simulated/)
  })

  it("throws when the worker is not configured", async () => {
    vi.stubEnv("SCAN_WORKER_URL", "")
    vi.stubEnv("SCAN_WORKER_SECRET", "")
    const { fetchScanFromWorker } = await import("./worker-client")
    await expect(fetchScanFromWorker("https://example.com/")).rejects.toThrow(/not configured/)
  })

  it("returns the worker's ScanResult on success", async () => {
    const payload = { success: true, simulated: false, url: "https://example.com", trackers: [] }
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse(payload)))
    const { fetchScanFromWorker } = await import("./worker-client")
    const result = await fetchScanFromWorker("https://example.com/")
    expect(result.url).toBe("https://example.com")
    expect(result.simulated).toBe(false)
  })
})
