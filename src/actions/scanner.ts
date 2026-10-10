"use server"

/**
 * Scanner Server Actions
 * 
 * Handles privacy scanning of websites.
 * Runs a real browser — Cloudflare Browser Run over CDP in production, a locally
 * launched Chromium in dev. There is no mock: if no browser is reachable the scan
 * FAILS rather than inventing a grade.
 */

import { and, eq, gt, sql } from "drizzle-orm"
import { db, isDatabaseConfigured } from "@/lib/db"
import { publicScans, toolPrivacyAudits, tools } from "@/lib/db/schema"
import { calculateFullPrivacyScore } from "@/lib/scanner/scoring"
import type { PrivacyScoreResult, ScanResult } from "@/lib/scanner/types"

export type ScanResponse = {
  success: boolean
  error?: string
  domain: string
  scannedAt: string
  cached: boolean
  // Legacy flag. The mock generator that set it is deleted; nothing emits `true`
  // any more. Kept as defence in depth — the cache write and the audit write both
  // still refuse anything flagged simulated, so a future backend that starts
  // emitting fabricated data cannot silently be persisted or re-served.
  simulated?: boolean
  result?: ScanResult
  score?: PrivacyScoreResult
}

import { env, isServiceEnabled } from "@/lib/env"
import { assertSafeScanTarget, UnsafeScanTargetError } from "@/lib/scanner/ssrf-guard"
import { fetchScanFromWorker, isScanWorkerEnabled } from "@/lib/scanner/worker-client"
import { checkToolActionRateLimit } from "@/lib/api-rate-limit"
import { countUsage } from "@/lib/analytics/usage"

const DISABLE_PLAYWRIGHT = env.DISABLE_PLAYWRIGHT_SCANNER
// A browser is reachable if EITHER a remote one is configured (Cloudflare Browser Run,
// used via scanUrl -> getBrowser) OR local Playwright is allowed. Miss the first and a
// fully-configured remote browser reads as "no backend" and every scan fails.
const CAN_SCAN_LOCALLY_OR_REMOTELY = isServiceEnabled.remoteBrowser || !DISABLE_PLAYWRIGHT
const CACHE_TTL_MS = 48 * 60 * 60 * 1000

// In-instance guard against browser-spawn floods (single-instance only; use a shared
// store like Upstash if v5 ever runs multiple instances).
const MAX_CONCURRENT_SCANS = 2
let activeScans = 0

/**
 * Scan a website for privacy issues
 * 
 * Flow:
 * 1. Check cache (publicScans table) for recent scan
 * 2. If cached and < 48hrs old, return cached result
 * 3. Otherwise, run a real browser scan (remote worker, or Cloudflare/local browser)
 * 4. Calculate privacy score
 * 5. Cache result
 * 6. Return result
 */
export async function scanWebsite(domain: string): Promise<ScanResponse> {
  // Validate domain
  const cleanDomain = domain.toLowerCase().trim()
  if (!cleanDomain || cleanDomain.length < 3) {
    return {
      success: false,
      error: "Invalid domain",
      domain: cleanDomain,
      scannedAt: new Date().toISOString(),
      cached: false,
    }
  }

  // No-PII demand telemetry: count the scan attempt (bounded 'scanner' key, never
  // the domain). Counted before the rate-limit gate so throttled demand still shows.
  countUsage("free_tool", "scanner")

  // Per-IP rate limit (in-memory / single-instance — see api-rate-limit note)
  const rl = await checkToolActionRateLimit("scan")
  if (!rl.allowed) {
    return {
      success: false,
      error: `Rate limit exceeded. Try again in ${rl.retryAfterSeconds ?? 60}s.`,
      domain: cleanDomain,
      scannedAt: new Date().toISOString(),
      cached: false,
    }
  }

  try {
    const cached = await getCachedScan(cleanDomain)
    if (cached) return cached

    let scanResult: ScanResult

    // A real scan, or nothing. Reachable backends: the legacy remote worker, or a
    // browser via scanUrl (Cloudflare Browser Run in prod, local Chromium in dev).
    if (isScanWorkerEnabled || CAN_SCAN_LOCALLY_OR_REMOTELY) {
      // SSRF guard: only scan public https targets (blocks internal / cloud-metadata IPs).
      // The worker re-validates on the box too — this is the caller-side gate.
      let safeUrl: string
      try {
        safeUrl = await assertSafeScanTarget(
          `https://${cleanDomain.replace(/^https?:\/\//i, "")}`
        )
      } catch (guardError) {
        if (guardError instanceof UnsafeScanTargetError) {
          return {
            success: false,
            error: "That address can't be scanned (public https sites only).",
            domain: cleanDomain,
            scannedAt: new Date().toISOString(),
            cached: false,
          }
        }
        throw guardError
      }

      if (isScanWorkerEnabled) {
        // Remote worker. HARD-FAILS on any error (throw → outer catch → success:false):
        // never falls back to mock, so an outage shows "Scan failed", not a fake grade.
        scanResult = await fetchScanFromWorker(safeUrl)
      } else {
        // Browser path: Cloudflare Browser Run in production, locally launched
        // Chromium in dev — see getBrowser() in lib/scanner/engine.ts. The concurrency
        // guard matters most for the local case, where each scan spawns a process.
        if (activeScans >= MAX_CONCURRENT_SCANS) {
          return {
            success: false,
            error: "The scanner is busy right now — please try again in a moment.",
            domain: cleanDomain,
            scannedAt: new Date().toISOString(),
            cached: false,
          }
        }
        activeScans++
        try {
          const { scanUrl } = await import("@/lib/scanner/engine")
          scanResult = await scanUrl(safeUrl)
        } finally {
          activeScans--
        }
      }
    } else {
      // No scan backend at all: no worker configured AND local Playwright disabled.
      // This used to fall through to a mock that derived tracker counts, cookie names
      // and a letter grade from a hash of the domain's characters — it decided whether
      // a site ran Facebook Pixel based on whether its letters summed to a multiple of
      // five. Fabricated findings about named companies have no place on a privacy
      // site, so a missing backend now fails like any other outage.
      throw new Error("no scan backend is configured")
    }
    
    // Calculate privacy score from scan result
    const score = calculateFullPrivacyScore({
      trackers: scanResult.trackers,
      cookies: scanResult.cookies,
      headers: scanResult.headers,
      thirdPartyRequests: scanResult.thirdPartyRequests,
      fingerprintDetections: scanResult.fingerprintDetections,
    })

    const scannedAt = new Date()

    // Never cache simulated/mock results — they would be re-served as a real "cached"
    // score. Mirrors the audit-write gate below (simulated => no durable persistence).
    if (!scanResult.simulated) {
      try {
        await cacheScanResult({
          domain: cleanDomain,
          scanResult,
          score,
          scannedAt,
        })
      } catch (cacheError) {
        console.warn("Failed to cache scan result:", cacheError)
      }
    }

    return {
      success: true,
      domain: cleanDomain,
      scannedAt: scannedAt.toISOString(),
      cached: false,
      simulated: scanResult.simulated ?? false,
      result: scanResult,
      score,
    }
  } catch (error) {
    console.error("Scan error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Scan failed",
      domain: cleanDomain,
      scannedAt: new Date().toISOString(),
      cached: false,
    }
  }
}

/**
 * Get cached scan result for a domain
 */
export async function getCachedScan(domain: string): Promise<ScanResponse | null> {
  if (!isDatabaseConfigured) return null

  const now = new Date()
  const [cached] = await db
    .select()
    .from(publicScans)
    .where(and(eq(publicScans.domain, domain), gt(publicScans.expiresAt, now)))
    .limit(1)

  if (!cached || cached.scanError) return null

  await db
    .update(publicScans)
    .set({
      viewCount: sql`${publicScans.viewCount} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(publicScans.id, cached.id))

  const result: ScanResult = {
    success: true,
    url: cached.url,
    scanDuration: cached.scanDuration,
    trackers: (cached.trackersFound ?? []) as ScanResult["trackers"],
    cookies: (cached.cookiesFound ?? []) as ScanResult["cookies"],
    headers: (cached.headersFound ?? []) as ScanResult["headers"],
    thirdPartyRequests: (cached.thirdPartyReqs ?? []) as ScanResult["thirdPartyRequests"],
    fingerprintDetections: (cached.fingerprintApis ?? []) as ScanResult["fingerprintDetections"],
    hasGoogleAnalytics: cached.hasGoogleAnalytics,
    hasFacebookPixel: cached.hasFacebookPixel,
    hasThirdPartyCookies: cached.hasThirdPartyCookies,
    hasFingerprinting: cached.hasFingerprinting,
    respectsDNT: cached.respectsDNT,
    hasHTTPS: cached.hasHTTPS,
    hasHSTS: cached.hasHSTS,
    hasCSP: cached.hasCSP,
    hasPrivacyPolicy: cached.hasPrivacyPolicy,
    scores: {
      trackerScore: cached.trackerScore,
      cookieScore: cached.cookieScore,
      securityScore: cached.securityScore,
      thirdPartyScore: cached.thirdPartyScore,
      fingerprintScore: cached.fingerprintScore,
    },
  }

  const score: PrivacyScoreResult = {
    overallScore: cached.overallScore,
    grade: cached.grade,
    breakdown: {
      trackerScore: cached.trackerScore,
      cookieScore: cached.cookieScore,
      securityScore: cached.securityScore,
      thirdPartyScore: cached.thirdPartyScore,
      fingerprintScore: cached.fingerprintScore,
    },
    summary: cached.summary ?? "",
    recommendations: cached.recommendations ?? [],
  }

  return {
    success: true,
    domain,
    scannedAt: cached.scannedAt.toISOString(),
    cached: true,
    result,
    score,
  }
}

type CachePayload = {
  domain: string
  scanResult: ScanResult
  score: PrivacyScoreResult
  scannedAt: Date
}

async function cacheScanResult({ domain, scanResult, score, scannedAt }: CachePayload) {
  if (!isDatabaseConfigured) return

  const trackerNames = scanResult.trackers.map(tracker => tracker.name)
  const expiresAt = new Date(scannedAt.getTime() + CACHE_TTL_MS)

  await db
    .insert(publicScans)
    .values({
      url: scanResult.url,
      domain,
      scannedAt,
      scanDuration: scanResult.scanDuration,
      scanVersion: "1.0",
      overallScore: score.overallScore,
      grade: score.grade,
      trackerScore: score.breakdown.trackerScore,
      cookieScore: score.breakdown.cookieScore,
      securityScore: score.breakdown.securityScore,
      thirdPartyScore: score.breakdown.thirdPartyScore,
      fingerprintScore: score.breakdown.fingerprintScore,
      trackersFound: scanResult.trackers,
      cookiesFound: scanResult.cookies,
      headersFound: scanResult.headers,
      thirdPartyReqs: scanResult.thirdPartyRequests,
      fingerprintApis: scanResult.fingerprintDetections,
      trackerNames,
      trackerCount: scanResult.trackers.length,
      cookieCount: scanResult.cookies.length,
      thirdPartyCount: scanResult.thirdPartyRequests.length,
      hasGoogleAnalytics: scanResult.hasGoogleAnalytics,
      hasFacebookPixel: scanResult.hasFacebookPixel,
      hasThirdPartyCookies: scanResult.hasThirdPartyCookies,
      hasFingerprinting: scanResult.hasFingerprinting,
      respectsDNT: scanResult.respectsDNT,
      hasHTTPS: scanResult.hasHTTPS,
      hasHSTS: scanResult.hasHSTS,
      hasCSP: scanResult.hasCSP,
      hasPrivacyPolicy: scanResult.hasPrivacyPolicy,
      summary: score.summary,
      recommendations: score.recommendations,
      scanError: null,
      isPartial: false,
      expiresAt,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: publicScans.domain,
      set: {
        url: scanResult.url,
        scannedAt,
        scanDuration: scanResult.scanDuration,
        scanVersion: "1.0",
        overallScore: score.overallScore,
        grade: score.grade,
        trackerScore: score.breakdown.trackerScore,
        cookieScore: score.breakdown.cookieScore,
        securityScore: score.breakdown.securityScore,
        thirdPartyScore: score.breakdown.thirdPartyScore,
        fingerprintScore: score.breakdown.fingerprintScore,
        trackersFound: scanResult.trackers,
        cookiesFound: scanResult.cookies,
        headersFound: scanResult.headers,
        thirdPartyReqs: scanResult.thirdPartyRequests,
        fingerprintApis: scanResult.fingerprintDetections,
        trackerNames,
        trackerCount: scanResult.trackers.length,
        cookieCount: scanResult.cookies.length,
        thirdPartyCount: scanResult.thirdPartyRequests.length,
        hasGoogleAnalytics: scanResult.hasGoogleAnalytics,
        hasFacebookPixel: scanResult.hasFacebookPixel,
        hasThirdPartyCookies: scanResult.hasThirdPartyCookies,
        hasFingerprinting: scanResult.hasFingerprinting,
        respectsDNT: scanResult.respectsDNT,
        hasHTTPS: scanResult.hasHTTPS,
        hasHSTS: scanResult.hasHSTS,
        hasCSP: scanResult.hasCSP,
        hasPrivacyPolicy: scanResult.hasPrivacyPolicy,
        summary: score.summary,
        recommendations: score.recommendations,
        scanError: null,
        isPartial: false,
        expiresAt,
        updatedAt: new Date(),
      },
    })
}


// ─── Tool Privacy Audit ─────────────────────────────────────────────────────
// Scans a tool's website and writes to toolPrivacyAudits table

export type ToolAuditResponse = {
  success: boolean
  error?: string
  toolId: string
  auditId?: string
  score?: number
  grade?: string
}

/**
 * Scan a tool's website and save the audit to the toolPrivacyAudits table.
 * Also updates the tool's latestPrivacyScore field.
 */
export async function scanToolForAudit(toolId: string): Promise<ToolAuditResponse> {
  if (!isDatabaseConfigured) {
    return { success: false, error: "Database not configured", toolId }
  }

  // Fetch tool
  const [tool] = await db
    .select()
    .from(tools)
    .where(eq(tools.id, toolId))
    .limit(1)

  if (!tool) {
    return { success: false, error: "Tool not found", toolId }
  }

  const targetUrl = tool.websiteUrl

  try {
    let scanResult: ScanResult

    if (isScanWorkerEnabled) {
      // Remote worker — hard-fails on error (→ outer catch → success:false). No mock.
      const safeUrl = await assertSafeScanTarget(
        `https://${targetUrl.replace(/^https?:\/\//i, "")}`
      )
      scanResult = await fetchScanFromWorker(safeUrl)
    } else if (CAN_SCAN_LOCALLY_OR_REMOTELY) {
      const { scanUrl } = await import("@/lib/scanner/engine")
      const safeUrl = await assertSafeScanTarget(
        `https://${targetUrl.replace(/^https?:\/\//i, "")}`
      )
      scanResult = await scanUrl(safeUrl)
    } else {
      // No backend. This previously built a mock result and then discarded it two lines
      // below, because the simulated guard refuses to persist fabricated data as a
      // durable audit — so the mock could never do anything but waste 500ms. Fail directly.
      return {
        success: false,
        error: "Live scanner unavailable — refusing to record an audit without a real scan.",
        toolId,
      }
    }

    // Defence in depth: the mock generator is gone, but keep refusing to persist
    // anything flagged simulated in case a backend ever starts emitting it.
    if (scanResult.simulated) {
      return {
        success: false,
        error: "Live scanner unavailable — refusing to record a simulated audit.",
        toolId,
      }
    }

    // Calculate privacy score
    const score = calculateFullPrivacyScore({
      trackers: scanResult.trackers,
      cookies: scanResult.cookies,
      headers: scanResult.headers,
      thirdPartyRequests: scanResult.thirdPartyRequests,
      fingerprintDetections: scanResult.fingerprintDetections,
    })

    // Write to toolPrivacyAudits
    const [audit] = await db
      .insert(toolPrivacyAudits)
      .values({
        toolId,
        targetUrl,
        scanDuration: scanResult.scanDuration || 0,
        overallScore: score.overallScore,
        grade: score.grade,
        trackerScore: score.breakdown.trackerScore,
        cookieScore: score.breakdown.cookieScore,
        securityScore: score.breakdown.securityScore,
        thirdPartyScore: score.breakdown.thirdPartyScore,
        fingerprintScore: score.breakdown.fingerprintScore,
        trackersFound: scanResult.trackers,
        cookiesFound: scanResult.cookies,
        headersFound: scanResult.headers,
        thirdPartyReqs: scanResult.thirdPartyRequests,
        fingerprintApis: scanResult.fingerprintDetections,
        hasGoogleAnalytics: scanResult.hasGoogleAnalytics,
        hasFacebookPixel: scanResult.hasFacebookPixel,
        hasThirdPartyCookies: scanResult.cookies.some((c) => c.isThirdParty),
        hasFingerprinting: scanResult.fingerprintDetections.some((f) => f.detected),
        respectsDNT: scanResult.respectsDNT,
        hasHTTPS: scanResult.hasHTTPS,
        hasHSTS: scanResult.hasHSTS,
        hasCSP: scanResult.hasCSP,
        hasPrivacyPolicy: scanResult.hasPrivacyPolicy,
      })
      .returning()

    // Update tool's latest privacy score
    await db
      .update(tools)
      .set({
        latestPrivacyScore: score.overallScore,
        updatedAt: new Date(),
      })
      .where(eq(tools.id, toolId))

    return {
      success: true,
      toolId,
      auditId: audit.id,
      score: score.overallScore,
      grade: score.grade,
    }
  } catch (error) {
    console.error(`Tool audit error for ${tool.name}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Audit failed",
      toolId,
    }
  }
}
