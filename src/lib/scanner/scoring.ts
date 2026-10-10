/**
 * Privacy Scoring Algorithm
 * Ported from V2 lib/services/privacy-scoring.ts
 * 
 * Calculates privacy scores based on scan results.
 * Weighted scoring system with clear criteria for each category.
 */

import type {
  CookieInfo,
  FingerprintDetection,
  HeaderInfo,
  PrivacyGrade,
  PrivacyScoreInput,
  PrivacyScoreResult,
  ThirdPartyRequest,
  TrackerInfo,
} from "./types"

// Score weights (must sum to 100)
const WEIGHTS = {
  tracker: 30, // 30% - Most important
  cookie: 20, // 20%
  security: 20, // 20%
  thirdParty: 15, // 15%
  fingerprint: 15, // 15%
}

// Grade thresholds
const GRADE_THRESHOLDS = {
  A: 90, // Privacy Champion
  B: 80, // Privacy Verified
  C: 70, // Privacy Aware
  D: 60, // Privacy Concerns
  F: 0, // Privacy Hostile
}

/**
 * Calculate tracker score (0-100)
 * - 100: No trackers
 * - -15 for each analytics tracker
 * - -25 for each advertising tracker
 * - -10 for each social tracker
 */
function calculateTrackerScore(trackers: TrackerInfo[]): {
  score: number
  recommendations: string[]
} {
  let score = 100
  const recommendations: string[] = []

  const analyticTrackers = trackers.filter(t => t.category === "analytics")
  const adTrackers = trackers.filter(t => t.category === "advertising")
  const socialTrackers = trackers.filter(t => t.category === "social")

  // Deduct for analytics (less severe)
  score -= analyticTrackers.length * 15
  if (analyticTrackers.length > 0) {
    recommendations.push(
      `Remove ${analyticTrackers.length} analytics tracker(s): ${analyticTrackers.map(t => t.name).join(", ")}`,
    )
  }

  // Deduct for advertising (more severe)
  score -= adTrackers.length * 25
  if (adTrackers.length > 0) {
    recommendations.push(
      `Remove ${adTrackers.length} advertising tracker(s): ${adTrackers.map(t => t.name).join(", ")}`,
    )
  }

  // Deduct for social tracking
  score -= socialTrackers.length * 10
  if (socialTrackers.length > 0) {
    recommendations.push(
      `Consider removing social trackers: ${socialTrackers.map(t => t.name).join(", ")}`,
    )
  }

  // Special penalties for specific bad actors
  if (trackers.some(t => t.name.includes("google-analytics"))) {
    score -= 5 // Extra penalty for GA
    recommendations.push("Consider privacy-friendly analytics like Plausible or Fathom")
  }

  if (trackers.some(t => t.name.includes("facebook"))) {
    score -= 10 // Extra penalty for FB
    recommendations.push("Facebook tracking is particularly invasive - strongly consider removal")
  }

  return { score: Math.max(0, score), recommendations }
}

/**
 * Calculate cookie score (0-100)
 * - 100: No cookies or only essential first-party cookies
 * - -10 for each third-party cookie
 * - -20 for each tracking cookie
 * - Bonus for secure, httpOnly cookies
 */
function calculateCookieScore(cookies: CookieInfo[]): { score: number; recommendations: string[] } {
  let score = 100
  const recommendations: string[] = []

  const thirdPartyCookies = cookies.filter(c => c.isThirdParty)
  const trackingCookies = cookies.filter(c => c.isTracking)
  const insecureCookies = cookies.filter(c => !c.secure || !c.httpOnly)
  const longLivedCookies = cookies.filter(
    c => c.expires && c.expires > Date.now() / 1000 + 365 * 24 * 60 * 60,
  )

  // Deduct for third-party cookies
  score -= thirdPartyCookies.length * 10
  if (thirdPartyCookies.length > 0) {
    recommendations.push(`Remove ${thirdPartyCookies.length} third-party cookie(s)`)
  }

  // Deduct for tracking cookies
  score -= trackingCookies.length * 20
  if (trackingCookies.length > 0) {
    recommendations.push(`Remove tracking cookies: ${trackingCookies.map(c => c.name).join(", ")}`)
  }

  // Minor deduction for insecure cookies
  if (insecureCookies.length > 0) {
    score -= Math.min(10, insecureCookies.length * 2)
    recommendations.push("Set HttpOnly and Secure flags on all cookies")
  }

  // Deduct for long-lived cookies (>1 year)
  if (longLivedCookies.length > 0) {
    score -= longLivedCookies.length * 5
    recommendations.push("Reduce cookie expiration times to under 1 year")
  }

  // Bonus for zero cookies
  if (cookies.length === 0) {
    score = 100
    recommendations.length = 0 // Clear recommendations if no cookies
  }

  return { score: Math.max(0, Math.min(100, score)), recommendations }
}

/**
 * Calculate security header score (0-100)
 * - Points for each security header present
 */
function calculateSecurityScore(headers: HeaderInfo[]): {
  score: number
  recommendations: string[]
} {
  let score = 0
  const recommendations: string[] = []

  const headerPoints: Record<string, number> = {
    "strict-transport-security": 25,
    "content-security-policy": 25,
    "x-frame-options": 15,
    "x-content-type-options": 10,
    "referrer-policy": 15,
    "permissions-policy": 10,
  }

  for (const header of headers) {
    const points = headerPoints[header.name.toLowerCase()] ?? 0
    if (header.present) {
      if (header.grade === "good") {
        score += points
      } else if (header.grade === "warn") {
        score += Math.floor(points * 0.6) // Partial credit for weak headers
        recommendations.push(`Improve ${header.name} configuration`)
      }
    } else {
      recommendations.push(`Add ${header.name} header`)
    }
  }

  return { score: Math.min(100, score), recommendations }
}

/**
 * Calculate third-party request score (0-100)
 * - 100: 0-3 third-party requests (likely just CDN)
 * - Deduct for each additional request
 * - Extra deduction for analytics/advertising requests
 */
function calculateThirdPartyScore(requests: ThirdPartyRequest[]): {
  score: number
  recommendations: string[]
} {
  let score = 100
  const recommendations: string[] = []

  const cdnRequests = requests.filter(r => r.purpose === "cdn")
  const analyticsRequests = requests.filter(r => r.purpose === "analytics")
  const adRequests = requests.filter(r => r.purpose === "advertising")
  const otherRequests = requests.filter(
    r => !["cdn", "analytics", "advertising"].includes(r.purpose),
  )

  // CDN requests are acceptable (up to a point)
  if (cdnRequests.length > 5) {
    score -= (cdnRequests.length - 5) * 2
    recommendations.push("Consider self-hosting some CDN assets")
  }

  // Analytics requests are bad
  score -= analyticsRequests.length * 10

  // Advertising requests are worse
  score -= adRequests.length * 15

  // Other third-party requests
  score -= otherRequests.length * 3

  const totalThirdParty = requests.length
  if (totalThirdParty > 20) {
    recommendations.push(
      `High number of third-party requests (${totalThirdParty}) - consider auditing external dependencies`,
    )
  }

  // Unique domains count
  const uniqueDomains = new Set(requests.map(r => r.domain)).size
  if (uniqueDomains > 10) {
    score -= 10
    recommendations.push(`Data sent to ${uniqueDomains} different domains - consider consolidating`)
  }

  return { score: Math.max(0, score), recommendations }
}

/**
 * Calculate fingerprinting score (0-100)
 * - 100: No fingerprinting detected
 * - Deductions based on API type
 */
function calculateFingerprintScore(detections: FingerprintDetection[]): {
  score: number
  recommendations: string[]
} {
  let score = 100
  const recommendations: string[] = []

  const highRisk = detections.filter(d => d.detected && d.risk === "high")
  const mediumRisk = detections.filter(d => d.detected && d.risk === "medium")
  const lowRisk = detections.filter(d => d.detected && d.risk === "low")

  // High risk (Canvas, WebGL) - often used for fingerprinting
  score -= highRisk.length * 25
  if (highRisk.length > 0) {
    recommendations.push(
      `High-risk fingerprinting APIs detected: ${highRisk.map(d => d.api).join(", ")}`,
    )
  }

  // Medium risk
  score -= mediumRisk.length * 15
  if (mediumRisk.length > 0) {
    recommendations.push(
      `Medium-risk APIs detected: ${mediumRisk.map(d => d.api).join(", ")} - ensure these are used for legitimate purposes only`,
    )
  }

  // Low risk
  score -= lowRisk.length * 5

  return { score: Math.max(0, score), recommendations }
}

/**
 * Determine grade from score
 */
function getGrade(score: number): PrivacyGrade {
  if (score >= GRADE_THRESHOLDS.A) return "A"
  if (score >= GRADE_THRESHOLDS.B) return "B"
  if (score >= GRADE_THRESHOLDS.C) return "C"
  if (score >= GRADE_THRESHOLDS.D) return "D"
  return "F"
}

/**
 * Generate summary text based on score
 */
function generateSummary(score: number, grade: PrivacyGrade): string {
  switch (grade) {
    case "A":
      return "Excellent privacy practices! This site demonstrates strong commitment to user privacy."
    case "B":
      return "Good privacy practices with minor areas for improvement. Generally trustworthy."
    case "C":
      return "Acceptable privacy practices but some concerns. Use with awareness."
    case "D":
      return "Significant privacy concerns detected. Consider alternatives or use with caution."
    case "F":
      return "Poor privacy practices. Multiple tracking mechanisms and privacy violations detected."
  }
}

/**
 * Calculate privacy score from scan data
 */
export function calculatePrivacyScore(data: {
  trackers: TrackerInfo[]
  cookies: CookieInfo[]
  headers: HeaderInfo[]
  thirdPartyRequests: ThirdPartyRequest[]
  fingerprintDetections: FingerprintDetection[]
}): PrivacyScoreInput {
  const tracker = calculateTrackerScore(data.trackers)
  const cookie = calculateCookieScore(data.cookies)
  const security = calculateSecurityScore(data.headers)
  const thirdParty = calculateThirdPartyScore(data.thirdPartyRequests)
  const fingerprint = calculateFingerprintScore(data.fingerprintDetections)

  return {
    trackerScore: tracker.score,
    cookieScore: cookie.score,
    securityScore: security.score,
    thirdPartyScore: thirdParty.score,
    fingerprintScore: fingerprint.score,
  }
}

/**
 * Calculate full privacy score result with recommendations
 */
export function calculateFullPrivacyScore(data: {
  trackers: TrackerInfo[]
  cookies: CookieInfo[]
  headers: HeaderInfo[]
  thirdPartyRequests: ThirdPartyRequest[]
  fingerprintDetections: FingerprintDetection[]
}): PrivacyScoreResult {
  const tracker = calculateTrackerScore(data.trackers)
  const cookie = calculateCookieScore(data.cookies)
  const security = calculateSecurityScore(data.headers)
  const thirdParty = calculateThirdPartyScore(data.thirdPartyRequests)
  const fingerprint = calculateFingerprintScore(data.fingerprintDetections)

  const breakdown: PrivacyScoreInput = {
    trackerScore: tracker.score,
    cookieScore: cookie.score,
    securityScore: security.score,
    thirdPartyScore: thirdParty.score,
    fingerprintScore: fingerprint.score,
  }

  // Calculate weighted overall score
  const overallScore = Math.round(
    (breakdown.trackerScore * WEIGHTS.tracker +
      breakdown.cookieScore * WEIGHTS.cookie +
      breakdown.securityScore * WEIGHTS.security +
      breakdown.thirdPartyScore * WEIGHTS.thirdParty +
      breakdown.fingerprintScore * WEIGHTS.fingerprint) /
      100,
  )

  const grade = getGrade(overallScore)
  const summary = generateSummary(overallScore, grade)

  // Combine and prioritize recommendations
  const allRecommendations = [
    ...tracker.recommendations,
    ...cookie.recommendations,
    ...security.recommendations,
    ...thirdParty.recommendations,
    ...fingerprint.recommendations,
  ]

  // Limit to top 5 most important
  const recommendations = allRecommendations.slice(0, 5)

  return {
    overallScore,
    grade,
    breakdown,
    summary,
    recommendations,
  }
}

/**
 * Get grade metadata
 */
export function getGradeMetadata(grade: PrivacyGrade) {
  const metadata = {
    A: {
      label: "Privacy Champion",
      color: "emerald",
      description: "Exceptional privacy practices",
      emoji: "🏆",
    },
    B: {
      label: "Privacy Verified",
      color: "green",
      description: "Strong privacy practices",
      emoji: "✅",
    },
    C: {
      label: "Privacy Aware",
      color: "yellow",
      description: "Acceptable with caveats",
      emoji: "⚠️",
    },
    D: {
      label: "High Exposure",
      color: "orange",
      description: "Heavy third-party tracking observed",
      emoji: "🟠",
    },
    F: {
      label: "Severe Exposure",
      color: "red",
      description: "Extensive third-party tracking observed",
      emoji: "🔴",
    },
  }

  return metadata[grade]
}
