import { test, expect } from "@playwright/test"
import http from "node:http"
import type { AddressInfo } from "node:net"
import { isScanRequestAllowed } from "../src/lib/scanner/ssrf-guard"

/**
 * N5 negative control — the scanner's per-request route guard must abort a redirect (and any
 * subresource) that targets the cloud-metadata endpoint or an internal host.
 *
 * This reproduces the exact engine mechanism (src/lib/scanner/engine.ts): a
 * page.route("**\/*") interceptor that runs the real isScanRequestAllowed() and abort()s
 * anything unsafe. A local http origin stands in for a "public site" (first hop allowed);
 * it 302-redirects to http://169.254.169.254/. The test proves BOTH that Playwright
 * re-intercepts the redirect hop AND that the guard blocks the metadata target.
 *
 * Requires a real browser (chromium). It does not use the app dev server / baseURL.
 */
test("route guard aborts a redirect to the cloud-metadata endpoint", async ({ page }) => {
  const server = http.createServer((req, res) => {
    if (req.url === "/start") {
      res.writeHead(302, { Location: "http://169.254.169.254/latest/meta-data/" })
      res.end()
    } else {
      res.writeHead(200, { "content-type": "text/html" })
      res.end("<h1>should-not-reach</h1>")
    }
  })
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve))
  const { port } = server.address() as AddressInfo
  const localOrigin = `http://127.0.0.1:${port}`

  const blocked: string[] = []
  try {
    await page.route("**/*", async (route) => {
      const url = route.request().url()
      // The local origin stands in for an allowed "public site" (first hop); the real guard
      // decides every other request — crucially the redirect target.
      const allow = url.startsWith(localOrigin) ? true : await isScanRequestAllowed(url)
      if (allow) {
        await route.continue()
      } else {
        blocked.push(url)
        await route.abort("blockedbyclient")
      }
    })

    // Navigation to the metadata hop is aborted → goto rejects; swallow it.
    await page.goto(`${localOrigin}/start`, { waitUntil: "domcontentloaded" }).catch(() => null)

    // The redirect hop was intercepted AND blocked by the guard...
    expect(blocked.some((u) => u.includes("169.254.169.254"))).toBe(true)
    // ...and the browser never rendered the metadata response.
    const body = await page.content().catch(() => "")
    expect(body).not.toContain("meta-data")
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }
})
