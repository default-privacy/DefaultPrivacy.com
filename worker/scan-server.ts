/**
 * DP Toolbox — scanner worker.
 *
 * Runs on a separate server under Bun, not part of the Next build (excluded in tsconfig).
 * Vercel can't launch Chromium, so v5 POSTs a target here and this returns the SAME
 * ScanResult the app scores from — zero drift between the grade measured and the grade
 * shown, because it imports the identical engine.
 *
 *   GET  /health                              -> "ok"
 *   POST /scan  { "url": "https://…" }         (Authorization: Bearer <SCAN_WORKER_SECRET>)
 *
 * Run:  SCAN_WORKER_SECRET=… PORT=8080 bun worker/scan-server.ts
 */
import { chromium, type Browser } from "playwright"
import { scanWebsite } from "../src/lib/scanner/engine"
import { assertSafeScanTarget, UnsafeScanTargetError } from "../src/lib/scanner/ssrf-guard"

const SECRET = process.env.SCAN_WORKER_SECRET
if (!SECRET) throw new Error("SCAN_WORKER_SECRET is required")

const PORT = Number(process.env.PORT ?? 8080)
// Localhost-only by default: the plain-HTTP + Bearer endpoint must never face the
// internet directly — a TLS reverse proxy (Caddy) fronts it. Override with HOST=0.0.0.0
// only if you know the port is firewalled.
const HOST = process.env.HOST ?? "127.0.0.1"

// 2 GB box + Chromium: never render more than one page at a time or it OOMs.
const MAX_CONCURRENT = 1
let active = 0

// Run WITH Chromium's sandbox by default — the worker runs as a non-root user and
// renders attacker-submitted pages, so the sandbox is the primary containment. Only
// set CHROMIUM_NO_SANDBOX=true where the sandbox can't initialize (running as root, or
// a kernel without unprivileged user namespaces).
const NO_SANDBOX = process.env.CHROMIUM_NO_SANDBOX === "true"

// Reuse one browser across requests; relaunch if it died (e.g. OOM-killed).
let browser: Browser | null = null
async function getBrowser(): Promise<Browser> {
  if (browser?.isConnected()) return browser
  browser = await chromium.launch({ args: NO_SANDBOX ? ["--no-sandbox"] : [] })
  return browser
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })
}

Bun.serve({
  hostname: HOST,
  port: PORT,
  idleTimeout: 60, // seconds — a real scan can take a while
  async fetch(req) {
    const { pathname } = new URL(req.url)

    if (pathname === "/health") return new Response("ok")

    if (pathname !== "/scan" || req.method !== "POST") {
      return new Response("not found", { status: 404 })
    }

    if (req.headers.get("authorization") !== `Bearer ${SECRET}`) {
      return new Response("unauthorized", { status: 401 })
    }

    if (active >= MAX_CONCURRENT) {
      return new Response("busy", { status: 503 })
    }

    let url: unknown
    try {
      ;({ url } = await req.json())
    } catch {
      return json({ error: "invalid JSON body" }, 400)
    }
    if (typeof url !== "string") {
      return json({ error: "missing url" }, 400)
    }

    // Re-validate on the box too — load-bearing, not decorative: never trust the caller
    // to have blocked internal / cloud-metadata targets.
    let safeUrl: string
    try {
      safeUrl = await assertSafeScanTarget(url)
    } catch (e) {
      if (e instanceof UnsafeScanTargetError) return json({ error: e.message }, 422)
      throw e
    }

    active++
    try {
      const result = await scanWebsite(safeUrl, await getBrowser())
      return json(result)
    } catch (e) {
      console.error("scan failed:", e)
      return json({ error: `scan failed: ${e instanceof Error ? e.message : e}` }, 500)
    } finally {
      active--
    }
  },
})

console.log(`[scan-worker] listening on ${HOST}:${PORT} (max concurrency ${MAX_CONCURRENT})`)
