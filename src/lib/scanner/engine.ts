/**
 * Privacy Scanner Engine
 * Ported from V2 privacy-scanner.ts
 *
 * Automated scanning of websites for privacy-related concerns using Playwright.
 * This is the core engine of the Privacy Scanner feature.
 */

import type { Browser, Page, Request, Response } from "playwright"
import { env, isServiceEnabled } from "@/lib/env"
import { calculatePrivacyScore } from "./scoring"
import { KNOWN_TRACKERS, SECURITY_HEADERS, FINGERPRINT_APIS } from "./trackers"
import type { HeaderInfo, ScanResult, ThirdPartyRequest } from "./types"
import type { TrackerCategory } from "./trackers"
import { assertSafeScanTarget, isScanRequestAllowed } from "./ssrf-guard"

/**
 * Extract domain from URL
 */
/**
 * A page we were REFUSED, as opposed to a page that is genuinely minimal.
 *
 * Status alone is NOT enough: stackoverflow.com answers 403 to this user-agent and
 * still renders its full question feed (measured 85 and 143 requests on two runs).
 * What identifies a page nobody actually saw is a refusal status TOGETHER WITH a
 * starved load. Every blocked page in the measured set came in at 19 requests or
 * fewer — reuters 401/8, wsj 401/10, bloomberg "Are you a robot?" 403/19,
 * codeberg 403/1, sr.ht 502/1, gnu.org 429/1 — so the floor sits at 20.
 *
 * ⚠️ The request floor MUST stay inside the >= 400 branch. Applied unconditionally it
 * refuses exactly the privacy-respecting static sites this tool exists to reward:
 * example.com is a correct, fully-observed grade at 1 request, and kernel.org (15),
 * curl.se (14), sqlite.org (8) and suckless.org (4) sit just above it. Across 27
 * measured clean sites, every single one answered 200 — so clause 1 is false for all
 * of them and the floor is never even evaluated.
 *
 * Numbers here are MEASURED, not chosen. If one starts failing, re-measure the site
 * before changing the threshold.
 */
export function isRefusedByServer(status: number, totalRequestsObserved: number): boolean {
  return status >= 400 && totalRequestsObserved < 20
}

function extractDomain(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.hostname
  } catch {
    return url
  }
}

/**
 * Identify tracker category from URL/domain
 */
function identifyTracker(url: string): { category: TrackerCategory; name: string } {
  const urlLower = url.toLowerCase()

  // Check known trackers
  for (const tracker of KNOWN_TRACKERS.analytics) {
    if (urlLower.includes(tracker)) {
      return { category: "analytics", name: tracker }
    }
  }

  for (const tracker of KNOWN_TRACKERS.advertising) {
    if (urlLower.includes(tracker)) {
      return { category: "advertising", name: tracker }
    }
  }

  for (const tracker of KNOWN_TRACKERS.social) {
    if (urlLower.includes(tracker)) {
      return { category: "social", name: tracker }
    }
  }

  for (const tracker of KNOWN_TRACKERS.fingerprinting) {
    if (urlLower.includes(tracker)) {
      return { category: "fingerprinting", name: tracker }
    }
  }

  // Heuristic detection for unknown trackers
  const adPatterns = [
    /\/ads?\//i,
    /\/ad[sv]?[_-]/i,
    /[?&]ad[_-]?id=/i,
    /\/pixel\//i,
    /\/beacon\//i,
    /\/track(ing)?[\/\.]/i,
    /\/collect[\/\?]/i,
    /\/impression/i,
    /\/click[\/\?]/i,
    /[?&]campaign/i,
    /\/rtb\//i,
    /\/bid[\/\?]/i,
    /prebid/i,
    /\/sync\//i,
    /\/usersync/i,
    /\.gif\?.*[&?](id|uid|user|visitor|session)=/i,
    /1x1\.gif/i,
    /pixel\.gif/i,
    /t\.gif/i,
    /b\.gif/i,
  ]

  for (const pattern of adPatterns) {
    if (pattern.test(urlLower)) {
      try {
        const domain = new URL(url).hostname
        return { category: "advertising", name: domain }
      } catch {
        return { category: "advertising", name: "unknown-ad-tracker" }
      }
    }
  }

  // Analytics heuristics
  const analyticsPatterns = [
    /\/analytics[\/\.]/i,
    /\/stats[\/\.]/i,
    /\/metrics[\/\.]/i,
    /\/telemetry[\/\.]/i,
    /[?&]event=/i,
    /[?&]action=/i,
    /\/log[\/\?]/i,
    /\/pageview/i,
    /\/event[\/\?]/i,
  ]

  for (const pattern of analyticsPatterns) {
    if (pattern.test(urlLower)) {
      try {
        const domain = new URL(url).hostname
        return { category: "analytics", name: domain }
      } catch {
        return { category: "analytics", name: "unknown-analytics" }
      }
    }
  }

  return { category: "unknown", name: "unknown" }
}

/**
 * Determine purpose of third-party request
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- domain reserved for future use
function determinePurpose(url: string, domain: string): ThirdPartyRequest["purpose"] {
  const urlLower = url.toLowerCase()

  // CDN patterns
  const cdnPatterns = ["cdn", "cloudflare", "cloudfront", "fastly", "akamai", "jsdelivr", "unpkg", "cdnjs"]
  if (cdnPatterns.some(p => urlLower.includes(p))) {
    return "cdn"
  }

  // Analytics
  if (KNOWN_TRACKERS.analytics.some(t => urlLower.includes(t))) {
    return "analytics"
  }

  // Advertising
  if (KNOWN_TRACKERS.advertising.some(t => urlLower.includes(t))) {
    return "advertising"
  }

  // Social
  if (KNOWN_TRACKERS.social.some(t => urlLower.includes(t))) {
    return "social"
  }

  // API patterns
  const apiPatterns = ["api.", "/api/", ".api.", "graphql"]
  if (apiPatterns.some(p => urlLower.includes(p))) {
    return "api"
  }

  return "unknown"
}

/**
 * Evaluate security header value
 */
function evaluateHeader(name: string, value: string | null): HeaderInfo["grade"] {
  if (!value) return "bad"

  switch (name.toLowerCase()) {
    case "strict-transport-security":
      if (value.includes("max-age=31536000") || value.includes("max-age=63072000")) {
        return "good"
      }
      return value.includes("max-age=") ? "warn" : "bad"

    case "content-security-policy":
      if (value.includes("'unsafe-inline'") && value.includes("'unsafe-eval'")) {
        return "warn"
      }
      return value.length > 20 ? "good" : "warn"

    case "x-frame-options":
      if (value.toUpperCase() === "DENY" || value.toUpperCase() === "SAMEORIGIN") {
        return "good"
      }
      return "warn"

    case "x-content-type-options":
      return value.toLowerCase() === "nosniff" ? "good" : "warn"

    case "referrer-policy":
      const goodPolicies = ["no-referrer", "same-origin", "strict-origin", "strict-origin-when-cross-origin"]
      return goodPolicies.includes(value.toLowerCase()) ? "good" : "warn"

    case "permissions-policy":
      return value.length > 0 ? "good" : "warn"

    default:
      return value ? "good" : "bad"
  }
}

/**
 * Main scanning function
 */
export async function scanWebsite(url: string, browser: Browser): Promise<ScanResult> {
  const startTime = Date.now()
  const result: ScanResult = {
    success: false,
    url,
    scanDuration: 0,
    trackers: [],
    cookies: [],
    headers: [],
    thirdPartyRequests: [],
    fingerprintDetections: [],
    hasGoogleAnalytics: false,
    hasFacebookPixel: false,
    hasThirdPartyCookies: false,
    hasFingerprinting: false,
    respectsDNT: false,
    hasHTTPS: url.startsWith("https://"),
    hasHSTS: false,
    hasCSP: false,
    hasPrivacyPolicy: false,
    scores: {
      trackerScore: 100,
      cookieScore: 100,
      securityScore: 100,
      thirdPartyScore: 100,
      fingerprintScore: 100,
    },
  }

  let page: Page | null = null

  try {
    // SSRF guard (defense-in-depth): refuse private/loopback/reserved targets even if a
    // caller reached the engine without validating first.
    await assertSafeScanTarget(url)

    // Create a new context with DNT header to test if site respects it
    const context = await browser.newContext({
      extraHTTPHeaders: {
        DNT: "1",
        "Sec-GPC": "1", // Global Privacy Control
      },
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    })

    page = await context.newPage()

    // SSRF defense-in-depth (N5): assertSafeScanTarget above only vetted the INITIAL URL.
    // Re-validate EVERY request the page makes — redirects and subresources included — and
    // abort anything that isn't a TLS scheme to a public host. This blocks a 3xx or a
    // subresource pointed at http://169.254.169.254/ (cloud metadata) or an internal address.
    // Decisions are memoized per-origin so we don't re-resolve DNS on every request.
    const originAllowCache = new Map<string, Promise<boolean>>()
    await page.route("**/*", async (route) => {
      const reqUrl = route.request().url()
      let allowed = false
      try {
        let key: string
        try {
          key = new URL(reqUrl).origin
        } catch {
          key = reqUrl
        }
        let decision = originAllowCache.get(key)
        if (!decision) {
          decision = isScanRequestAllowed(reqUrl)
          originAllowCache.set(key, decision)
        }
        allowed = await decision
      } catch {
        allowed = false // fail closed
      }
      try {
        if (allowed) {
          await route.continue()
        } else {
          await route.abort("blockedbyclient")
        }
      } catch {
        // Route already handled or the page is closing — nothing to do.
      }
    })

    const targetDomain = extractDomain(url)
    const requestMap = new Map<string, { size: number; type: string }>()

    // Every request the page makes, first- and third-party. This is the OBSERVATION
    // signal, not a metric: it is the only way to tell "this site is genuinely clean"
    // apart from "we never actually saw this site". See the refusal gate after load.
    let totalRequestsObserved = 0

    // Intercept all requests
    page.on("request", (request: Request) => {
      const reqUrl = request.url()
      const reqDomain = extractDomain(reqUrl)
      totalRequestsObserved++

      // Track third-party requests
      if (reqDomain !== targetDomain) {
        requestMap.set(reqUrl, { size: 0, type: request.resourceType() })

        // Check for known trackers
        const { category, name } = identifyTracker(reqUrl)
        if (category !== "unknown") {
          result.trackers.push({
            url: reqUrl,
            domain: reqDomain,
            category,
            name,
            blocked: false,
          })

          // Set flags based on tracker name AND URL patterns
          const urlLower = reqUrl.toLowerCase()

          // Google Analytics detection
          if (
            name.includes("google-analytics") ||
            name.includes("gtag") ||
            urlLower.includes("google-analytics.com") ||
            urlLower.includes("googletagmanager.com") ||
            urlLower.includes("/gtag/js") ||
            urlLower.includes("/analytics.js") ||
            urlLower.includes("/ga.js") ||
            urlLower.includes("collect?v=")
          ) {
            result.hasGoogleAnalytics = true
          }

          // Facebook Pixel detection
          if (
            name.includes("facebook") ||
            name.includes("fbevents") ||
            urlLower.includes("facebook.com/tr") ||
            urlLower.includes("connect.facebook.net") ||
            urlLower.includes("fbevents.js") ||
            urlLower.includes("pixel.facebook.com")
          ) {
            result.hasFacebookPixel = true
          }
        }
      }

      // Also check ALL third-party requests for GA/FB patterns
      const reqUrlLower = reqUrl.toLowerCase()

      if (
        reqUrlLower.includes("google-analytics.com") ||
        reqUrlLower.includes("googletagmanager.com") ||
        reqUrlLower.includes("/gtag/js") ||
        reqUrlLower.includes("/analytics.js") ||
        reqUrlLower.includes("/g/collect") ||
        reqUrlLower.includes("collect?v=")
      ) {
        result.hasGoogleAnalytics = true
      }

      if (
        reqUrlLower.includes("facebook.com/tr") ||
        reqUrlLower.includes("fbevents.js") ||
        reqUrlLower.includes("connect.facebook.net")
      ) {
        result.hasFacebookPixel = true
      }
    })

    // Intercept responses to get sizes and headers
    page.on("response", async (response: Response) => {
      const respUrl = response.url()
      if (requestMap.has(respUrl)) {
        try {
          const body = await response.body().catch(() => null)
          const size = body?.length ?? 0
          const existing = requestMap.get(respUrl)
          if (existing) {
            requestMap.set(respUrl, { ...existing, size })
          }
        } catch {
          // Ignore errors
        }
      }
    })

    // Navigate to the page. goto() follows redirects and returns the FINAL response,
    // so security headers are read from it. A string match on the requested URL missed
    // them on any apex->www or http->https redirect, wrongly scoring reputable sites 0.
    //
    // ⚠️ waitUntil is "domcontentloaded", NOT "networkidle", and that is deliberate.
    // networkidle needs 500ms with no more than 2 in-flight requests — a bar that an
    // ad-and-analytics-heavy page NEVER clears, because the beacons and pollers that
    // make it interesting to us are exactly what keeps the network busy. So goto() threw
    // after 30s and the whole scan failed. Measured on forbes, washingtonpost,
    // weather.com, theverge, cnet, ebay, etsy, patreon, indeed, zillow and expedia:
    // the scanner could not grade its worst offenders AT ALL, which is the opposite of
    // the job. The tracker-heaviest sites were the ones it silently refused.
    const navResponse = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    })

    // Now TRY for quiet, but never depend on it. Fast, clean sites settle in well under
    // this and we move on; noisy sites burn the budget and we continue anyway with
    // whatever we observed. The fixed settle further down is what guarantees late
    // trackers get seen either way.
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {})

    // Capture security headers from the final navigation response.
    if (navResponse) {
      const navHeaders = navResponse.headers()
      for (const headerName of SECURITY_HEADERS) {
        const value = navHeaders[headerName] ?? null
        result.headers.push({
          name: headerName,
          value,
          present: !!value,
          grade: evaluateHeader(headerName, value),
        })
        if (headerName === "strict-transport-security" && value) {
          result.hasHSTS = true
        }
        if (headerName === "content-security-policy" && value) {
          result.hasCSP = true
        }
      }
    }

    // Try to accept cookie consent banners
    try {
      const consentSelectors = [
        '[data-testid="GDPR-accept"]',
        '[data-testid="accept-cookies"]',
        'button[id*="accept"]',
        'button[id*="consent"]',
        'button[class*="accept"]',
        'button[class*="consent"]',
        "#onetrust-accept-btn-handler",
        ".onetrust-accept-btn-handler",
        "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll",
        "#cookie-accept",
        ".cookie-accept",
        "#accept-cookies",
        ".accept-cookies",
        '[data-gdpr-consent="accept"]',
        ".cc-allow",
        ".cc-accept",
      ]

      for (const selector of consentSelectors) {
        try {
          const button = page.locator(selector).first()
          if (await button.isVisible({ timeout: 500 })) {
            await button.click({ timeout: 1000 })
            await page.waitForTimeout(2000)
            await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {})
            break
          }
        } catch {
          // Continue to next selector
        }
      }
    } catch {
      // Consent handling failed, continue anyway
    }

    // Wait longer for delayed scripts
    await page.waitForTimeout(3000)

    // ── REFUSAL GATE ────────────────────────────────────────────────────────────
    // Refuse to GRADE a page we did not actually observe.
    //
    // Why this is load-bearing: four of the five scoring dimensions measure ABSENCE
    // (no trackers, no cookies, no third-party requests, no fingerprinting), and each
    // returns 100 when it finds nothing. So a page that failed to load, was blocked,
    // or returned nothing scores 100/100/100/100 and lands at ~80 — a "B". The tool
    // fails TOWARD flattery, which is the wrong direction for a privacy scanner and
    // is invisible to the reader.
    //
    // Throwing here routes into the same catch that already turns a worker outage into
    // "Scan failed" — consistent with the standing rule that this scanner never
    // substitutes a plausible answer for a real one.
    if (!navResponse) {
      throw new Error(
        "scan could not observe the page (no navigation response) — refusing to grade"
      )
    }
    if (totalRequestsObserved === 0) {
      throw new Error(
        "scan observed no network activity — refusing to grade"
      )
    }

    // Turned away at the door: a refusal status with a starved load means we graded an
    // error page, not the site. Under the old code reuters (401), wsj (401), bloomberg's
    // "Are you a robot?" (403), codeberg's "Access denied" (403) and a rate-limited
    // gnu.org (429) all scored 100 on all four absence dimensions. See isRefusedByServer.
    const navStatus = navResponse.status()
    if (isRefusedByServer(navStatus, totalRequestsObserved)) {
      throw new Error(
        `scan was refused by the site (HTTP ${navStatus}, ${totalRequestsObserved} requests observed) — refusing to grade`
      )
    }

    // Get cookies
    const cookies = await context.cookies()
    for (const cookie of cookies) {
      const isThirdParty =
        !cookie.domain.includes(targetDomain) && !targetDomain.includes(cookie.domain.replace(/^\./, ""))
      const isTracking =
        cookie.name.toLowerCase().includes("_ga") ||
        cookie.name.toLowerCase().includes("_fbp") ||
        cookie.name.toLowerCase().includes("_gid") ||
        cookie.name.toLowerCase().includes("tracking") ||
        cookie.name.toLowerCase().includes("_gcl")

      result.cookies.push({
        name: cookie.name,
        domain: cookie.domain,
        path: cookie.path,
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        expires: cookie.expires > 0 ? cookie.expires : null,
        isThirdParty,
        isTracking,
      })

      if (isThirdParty) {
        result.hasThirdPartyCookies = true
      }
    }

    // Process third-party requests
    for (const [reqUrl, data] of requestMap) {
      const domain = extractDomain(reqUrl)
      result.thirdPartyRequests.push({
        url: reqUrl,
        domain,
        type: data.type,
        purpose: determinePurpose(reqUrl, domain),
        size: data.size,
      })
    }

    // Check for fingerprinting in page scripts
    const scripts = await page.evaluate(() => {
      const scriptContents: string[] = []
      document.querySelectorAll("script").forEach(script => {
        if (script.textContent) {
          scriptContents.push(script.textContent)
        }
      })
      return scriptContents.join("\n")
    })

    for (const api of FINGERPRINT_APIS) {
      const detected = api.pattern.test(scripts)
      result.fingerprintDetections.push({
        api: api.name,
        detected,
        scriptUrl: null,
        risk: api.name === "Canvas" || api.name === "WebGL" ? "high" : "medium",
      })

      if (detected) {
        result.hasFingerprinting = true
      }
    }

    // Check if any fingerprinting service was loaded via network
    const fingerprintingTrackers = result.trackers.filter(t => t.category === "fingerprinting")
    if (fingerprintingTrackers.length > 0) {
      result.hasFingerprinting = true
      for (const tracker of fingerprintingTrackers) {
        result.fingerprintDetections.push({
          api: `External: ${tracker.name}`,
          detected: true,
          scriptUrl: tracker.url,
          risk: "high",
        })
      }
    }

    // Check for fingerprinting patterns in URLs
    const fingerprintUrlPatterns = [/fingerprint/i, /fpjs/i, /device-?id/i, /browser-?id/i, /visitor-?id/i]

    for (const [reqUrl] of requestMap) {
      for (const pattern of fingerprintUrlPatterns) {
        if (pattern.test(reqUrl)) {
          result.hasFingerprinting = true
          result.fingerprintDetections.push({
            api: `URL pattern: ${pattern.source}`,
            detected: true,
            scriptUrl: reqUrl,
            risk: "high",
          })
          break
        }
      }
    }

    // Check for privacy policy link
    const hasPrivacyLink = await page.evaluate(() => {
      const links = document.querySelectorAll("a")
      for (const link of links) {
        const href = link.href.toLowerCase()
        const text = link.textContent?.toLowerCase() ?? ""
        if (href.includes("privacy") || text.includes("privacy policy")) {
          return true
        }
      }
      return false
    })
    result.hasPrivacyPolicy = hasPrivacyLink

    // We send DNT:1 + Sec-GPC:1, but a single scan cannot verify a site HONORS them.
    // So this flag records only what we can truthfully observe — the site loaded no
    // Google Analytics or Meta Pixel — and is surfaced in the UI as "No Google/Meta
    // trackers", never as an authoritative "respects Do Not Track" claim about the site.
    result.respectsDNT = !result.hasGoogleAnalytics && !result.hasFacebookPixel

    // Calculate scores
    result.scores = calculatePrivacyScore({
      trackers: result.trackers,
      cookies: result.cookies,
      headers: result.headers,
      thirdPartyRequests: result.thirdPartyRequests,
      fingerprintDetections: result.fingerprintDetections,
    })

    result.success = true

    await context.close()
  } catch (error) {
    result.error = error instanceof Error ? error.message : "Unknown error"
  } finally {
    result.scanDuration = Date.now() - startTime
  }

  return result
}

/**
 * Get a browser to scan with.
 *
 * Prefers Cloudflare Browser Run — a remote Chromium reached over CDP — when
 * CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_BROWSER_TOKEN are set. That is the production
 * path: serverless cannot launch Chromium itself, and the previous answer (a
 * self-hosted worker box) died when its IP was reassigned and took the scanner with
 * it. There is no machine here to lose.
 *
 * Falls back to a locally launched Chromium, which is the dev path.
 *
 * Verified against Cloudflare 2026-09-04: connect ~2.5s, and `newContext()` with
 * viewport/userAgent options, `page.route()` interception (the SSRF guard),
 * `page.on("request")`, response headers and `context.cookies()` all work over CDP.
 * `connectOverCDP` attaches to a running browser, so one default context already
 * exists — `newContext()` adds a second rather than being the only one. That only
 * matters if something enumerates `browser.contexts()`; nothing here does.
 *
 * ⚠️ LOCAL DEV: the remote path does NOT work under `bun` on this box — Bun's
 * WebSocket hangs (the same dead-IPv6 family as the Neon `:443` / `curl -4`
 * workarounds). It connects fine under `node`. Production is unaffected: Vercel runs
 * the Node runtime. To exercise the remote browser locally, drive it with node.
 */
async function getBrowser() {
  const { chromium } = await import("playwright")

  if (isServiceEnabled.remoteBrowser) {
    // keep_alive is how long Cloudflare holds the session open after we disconnect, and
    // Browser Run bills by session DURATION — so a 60s keep_alive on a ~15s scan billed
    // roughly 4x what the work cost, and exhausted the daily allowance about four times
    // faster than necessary. 10s is enough slack to survive a brief stall without
    // paying for idle time.
    //
    // Quota reality, worth knowing before pointing anyone at this: the Workers FREE tier
    // is 10 browser-MINUTES per day, i.e. roughly 30 scans at ~20s each, and it returns
    // "Rate limit exceeded" (code 2001) once spent. Fine against measured usage of ~4
    // scans a month; not fine if the tool ever gets real traffic. The upgrade is the $5/mo
    // Workers Paid plan at 10 browser-hours/month, about 1,800 scans.
    const ws =
      `wss://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}` +
      `/browser-rendering/devtools/browser?keep_alive=10000`
    try {
      const browser = await chromium.connectOverCDP(ws, {
        headers: { Authorization: `Bearer ${env.CLOUDFLARE_BROWSER_TOKEN}` },
        timeout: 45_000,
      })
      return { browser, remote: true as const }
    } catch (err) {
      // TWO AUDIENCES, and conflating them leaked the Cloudflare account ID onto a
      // public page. The endpoint URL contains the account id, and scanWebsite() renders
      // `error.message` straight to the visitor — so the diagnostic detail must be
      // LOGGED, never thrown.
      //
      // Node's undici reports connection problems as a bare "fetch failed" with the real
      // reason buried in `cause`, which makes a bad token, blocked egress and a bundling
      // fault look identical. Keep that detail for the server log.
      const e = err as Error & { cause?: unknown }
      const cause =
        e.cause instanceof Error
          ? `${e.cause.name}: ${e.cause.message}`
          : e.cause
            ? String(e.cause)
            : "no cause"
      console.error(`[scanner] remote browser connect failed: ${e.message} (cause: ${cause})`)

      // Quota exhaustion is the expected, recoverable failure — the Workers free tier is
      // 10 browser-minutes/day — so say so plainly rather than making it look broken.
      const detail = `${e.message} ${cause}`
      const rateLimited = detail.includes("429") || /rate limit/i.test(detail)
      throw new Error(
        rateLimited
          ? "The scanner is at capacity right now. Please try again later."
          : "The scanner is temporarily unavailable."
      )
    }
  }

  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-gpu", "--disable-dev-shm-usage", "--disable-setuid-sandbox", "--no-sandbox"],
  })
  return { browser, remote: false as const }
}

/**
 * Single-use scanner - creates browser, scans, and closes
 * Good for one-off scans in server actions
 */
export async function scanUrl(url: string): Promise<ScanResult> {
  const { browser } = await getBrowser()

  try {
    return await scanWebsite(url, browser)
  } finally {
    await browser.close()
  }
}

/**
 * Create a reusable scanner instance
 * Good for scanning multiple URLs (keeps browser open)
 */
export async function createScanner() {
  const { browser } = await getBrowser()

  return {
    scan: (url: string) => scanWebsite(url, browser),
    close: () => browser.close(),
  }
}
