import { describe, expect, it } from "vitest"
import { buildVerdict } from "./verdict"
import type { PrivacyGrade, PrivacyScoreInput, PrivacyScoreResult, ScanResult } from "./types"
import type { TrackerCategory } from "./trackers"

const tracker = (category: TrackerCategory, i = 0) => ({
  url: `https://t${i}.example/x.js`,
  domain: `t${i}.example`,
  category,
  name: `tracker-${i}`,
  blocked: false,
})

const cookie = (over: { isThirdParty?: boolean; isTracking?: boolean } = {}, i = 0) => ({
  name: `c${i}`,
  domain: "example.com",
  path: "/",
  httpOnly: false,
  secure: true,
  sameSite: "Lax",
  expires: null,
  isThirdParty: over.isThirdParty ?? false,
  isTracking: over.isTracking ?? false,
})

const thirdParty = (i = 0) => ({ url: `https://x${i}.io/a`, domain: `x${i}.io`, type: "script", purpose: "unknown" as const, size: 0 })

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
  hasHSTS: true,
  hasCSP: true,
  hasPrivacyPolicy: true,
  scores: { trackerScore: 100, cookieScore: 100, securityScore: 100, thirdPartyScore: 100, fingerprintScore: 100 },
  ...over,
})

const score = (grade: PrivacyGrade, overallScore: number, breakdown: PrivacyScoreInput): PrivacyScoreResult => ({
  overallScore,
  grade,
  breakdown,
  summary: "",
  recommendations: [],
})

const B = (o: Partial<PrivacyScoreInput>): PrivacyScoreInput => ({
  trackerScore: 100,
  cookieScore: 100,
  securityScore: 100,
  thirdPartyScore: 100,
  fingerprintScore: 100,
  ...o,
})

const times = <T,>(n: number, f: (i: number) => T) => Array.from({ length: n }, (_, i) => f(i))

describe("buildVerdict", () => {
  it("cookie-dominant F (the vice.com bug case) leads with cookies, never the lone tracker", () => {
    const result = makeResult({
      trackers: [tracker("analytics")],
      thirdPartyRequests: times(13, thirdParty),
      cookies: times(11, i => cookie({}, i)),
      hasGoogleAnalytics: true,
      hasHSTS: true,
      hasCSP: false,
    })
    const v = buildVerdict({ result, score: score("F", 54, B({ trackerScore: 85, cookieScore: 0, securityScore: 65, thirdPartyScore: 3 })) })
    expect(v.headline).toBe("11 cookies set before you clicked a thing.")
    expect(v.headline).not.toMatch(/tracker/i)
  })

  it("cookie-dominant with tracking cookies leads with the sharpest true cookie fact", () => {
    const result = makeResult({
      trackers: [tracker("analytics")],
      cookies: [...times(6, i => cookie({ isTracking: true }, i)), ...times(5, i => cookie({}, i + 6))],
      thirdPartyRequests: times(13, thirdParty),
      hasCSP: false,
    })
    const v = buildVerdict({ result, score: score("F", 50, B({ trackerScore: 85, cookieScore: 0, securityScore: 65, thirdPartyScore: 3 })) })
    expect(v.headline).toBe("6 tracking cookies set before you clicked a thing.")
  })

  it("clean A stays positive (grade gate returns before ranking)", () => {
    const result = makeResult({ thirdPartyRequests: [thirdParty()] })
    const v = buildVerdict({ result, score: score("A", 96, B({ securityScore: 80 })) })
    expect(v.headline).toBe("Clean — nothing tracked you on this page.")
    expect(v.emphasis).toBe("nothing tracked you")
  })

  it("tracker-dominant F with ad/social uses the invasive framing", () => {
    const result = makeResult({
      trackers: [tracker("advertising", 1), tracker("advertising", 2), tracker("advertising", 3), tracker("social", 4)],
    })
    const v = buildVerdict({ result, score: score("F", 30, B({ trackerScore: 0 })) })
    expect(v.headline).toBe("4 ad & social trackers loaded before you clicked a thing.")
  })

  it("third-party-dominant F leads with third parties", () => {
    const result = makeResult({ thirdPartyRequests: times(13, thirdParty) })
    const v = buildVerdict({ result, score: score("F", 35, B({ thirdPartyScore: 0 })) })
    expect(v.headline).toBe("13 third parties contacted before you clicked a thing.")
  })

  it("security-dominant D uses static phrasing (no 'before you clicked a thing')", () => {
    const result = makeResult({ hasHSTS: false, hasCSP: false })
    const v = buildVerdict({ result, score: score("D", 45, B({ securityScore: 0 })) })
    expect(v.headline).toBe("No HSTS or CSP — this page ships without core browser-security headers.")
    expect(v.headline).not.toMatch(/before you clicked/i)
  })

  it("fingerprinting-dominant F names fingerprinting", () => {
    const result = makeResult({ hasFingerprinting: true })
    const v = buildVerdict({ result, score: score("F", 30, B({ fingerprintScore: 0 })) })
    expect(v.headline).toBe("Browser fingerprinting ran the moment this page loaded.")
  })

  it("C grade softens the verb so it never out-scares its own grade", () => {
    const result = makeResult({ thirdPartyRequests: times(9, thirdParty) })
    const v = buildVerdict({ result, score: score("C", 68, B({ thirdPartyScore: 20 })) })
    expect(v.headline).toBe("9 third parties were contacted as this page loaded.")
  })

  it("near-tie cookie vs third-party breaks to cookie via ORDER, not raw count", () => {
    const result = makeResult({ cookies: times(5, i => cookie({}, i)), thirdPartyRequests: times(20, thirdParty) })
    const v = buildVerdict({ result, score: score("F", 40, B({ cookieScore: 10, thirdPartyScore: 10 })) })
    expect(v.headline).toMatch(/cookie/)
  })

  it("bad grade with no nameable evidence falls back without fabricating a number", () => {
    const v = buildVerdict({ result: makeResult(), score: score("F", 38, B({ trackerScore: 20, cookieScore: 20 })) })
    expect(v.headline).toBe("Multiple privacy gaps showed up on this page.")
  })

  it("headline always equals pre + emphasis + post", () => {
    const result = makeResult({ cookies: times(11, i => cookie({}, i)), hasCSP: false })
    const v = buildVerdict({ result, score: score("F", 54, B({ cookieScore: 0, securityScore: 65 })) })
    expect(v.pre + v.emphasis + v.post).toBe(v.headline)
  })
})
