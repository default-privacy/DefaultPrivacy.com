import { describe, expect, it } from "vitest"
import { deriveFingerprint, diffSnapshots, type ScanSnapshot } from "./diff"
import type {
  FingerprintDetection,
  HeaderInfo,
  PrivacyGrade,
  PrivacyScoreResult,
  ScanResult,
  ThirdPartyRequest,
  TrackerInfo,
} from "./types"

const tracker = (domain: string): TrackerInfo => ({
  url: `https://${domain}/x.js`,
  domain,
  category: "analytics",
  name: domain,
  blocked: false,
})

const header = (name: string, present: boolean): HeaderInfo => ({
  name,
  value: present ? "v" : null,
  present,
  grade: present ? "good" : "bad",
})

const fp = (api: string, detected: boolean): FingerprintDetection => ({
  api,
  detected,
  scriptUrl: null,
  risk: "high",
})

const makeResult = (over: Partial<ScanResult> = {}): ScanResult => ({
  success: true,
  url: "https://example.com",
  scanDuration: 100,
  trackers: [],
  cookies: [],
  headers: [],
  thirdPartyRequests: [],
  fingerprintDetections: [],
  hasGoogleAnalytics: false,
  hasFacebookPixel: false,
  hasThirdPartyCookies: false,
  hasFingerprinting: false,
  respectsDNT: true,
  hasHTTPS: true,
  hasHSTS: false,
  hasCSP: false,
  hasPrivacyPolicy: true,
  scores: { trackerScore: 100, cookieScore: 100, securityScore: 100, thirdPartyScore: 100, fingerprintScore: 100 },
  ...over,
})

const makeScore = (grade: PrivacyGrade, overallScore: number): PrivacyScoreResult => ({
  overallScore,
  grade,
  breakdown: { trackerScore: 0, cookieScore: 0, securityScore: 0, thirdPartyScore: 0, fingerprintScore: 0 },
  summary: "",
  recommendations: [],
})

const snap = (result: Partial<ScanResult>, grade: PrivacyGrade, score: number): ScanSnapshot => ({
  result: makeResult(result),
  score: makeScore(grade, score),
})

describe("diffSnapshots", () => {
  it("flags a newly-appeared tracker (and GA) as warning regressions", () => {
    const prev = snap({ trackers: [] }, "A", 95)
    const cur = snap({ trackers: [tracker("google-analytics.com")], hasGoogleAnalytics: true }, "C", 70)
    const d = diffSnapshots(prev, cur)
    expect(d.comparable).toBe(true)
    if (!d.comparable) return
    expect(d.hasRegression).toBe(true)
    expect(d.regressions.some(c => c.kind === "tracker-added")).toBe(true)
    expect(d.regressions.some(c => c.kind === "google-analytics-added")).toBe(true)
    // Never escalates a third-party finding beyond "warning".
    expect(d.changes.every(c => c.severity === "info" || c.severity === "warning")).toBe(true)
  })

  it("records a removed tracker as an improvement, not a regression", () => {
    const prev = snap({ trackers: [tracker("hotjar.com")] }, "C", 70)
    const cur = snap({ trackers: [] }, "A", 95)
    const d = diffSnapshots(prev, cur)
    if (!d.comparable) throw new Error("expected comparable")
    expect(d.hasRegression).toBe(false)
    expect(d.improvements.some(c => c.kind === "tracker-removed")).toBe(true)
  })

  it("flags a lost security header", () => {
    const prev = snap({ headers: [header("strict-transport-security", true)], hasHSTS: true }, "A", 95)
    const cur = snap({ headers: [header("strict-transport-security", false)], hasHSTS: false }, "B", 85)
    const d = diffSnapshots(prev, cur)
    if (!d.comparable) throw new Error("expected comparable")
    expect(d.regressions.some(c => c.kind === "security-header-lost")).toBe(true)
  })

  it("flags newly-detected fingerprinting", () => {
    const prev = snap({ fingerprintDetections: [fp("Canvas", false)] }, "A", 95)
    const cur = snap({ fingerprintDetections: [fp("Canvas", true)], hasFingerprinting: true }, "C", 70)
    const d = diffSnapshots(prev, cur)
    if (!d.comparable) throw new Error("expected comparable")
    expect(d.regressions.some(c => c.kind === "fingerprinting-added")).toBe(true)
  })

  it("detects a grade drop with direction and delta", () => {
    const d = diffSnapshots(snap({}, "A", 95), snap({}, "D", 40))
    if (!d.comparable) throw new Error("expected comparable")
    expect(d.gradeChange).toEqual({ from: "A", to: "D", delta: -3 })
    expect(d.scoreDelta).toBe(-55)
    expect(d.regressions.some(c => c.kind === "grade-dropped")).toBe(true)
  })

  it("refuses to compare simulated results", () => {
    expect(diffSnapshots(snap({ simulated: true }, "A", 95), snap({}, "A", 95)).comparable).toBe(false)
  })

  it("refuses to compare unsuccessful scans", () => {
    expect(diffSnapshots(snap({ success: false }, "A", 95), snap({}, "A", 95)).comparable).toBe(false)
  })

  it("reports no changes for identical scans", () => {
    const base = { trackers: [tracker("hotjar.com")], headers: [header("content-security-policy", true)], hasCSP: true }
    const d = diffSnapshots(snap(base, "B", 85), snap(base, "B", 85))
    if (!d.comparable) throw new Error("expected comparable")
    expect(d.changes).toHaveLength(0)
    expect(d.hasRegression).toBe(false)
  })
})

describe("deriveFingerprint", () => {
  it("normalizes: lowercases, dedupes, and sorts tracker domains", () => {
    const f = deriveFingerprint(snap({ trackers: [tracker("B.com"), tracker("a.com"), tracker("a.com")] }, "C", 70))
    expect(f.trackerDomains).toEqual(["a.com", "b.com"])
  })
})
