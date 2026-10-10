/**
 * Tracker → Directory Alternatives Mapping
 *
 * Maps detected trackers to privacy-friendly alternatives from our directory.
 * This is the key differentiator: "We don't just show problems, we show solutions."
 *
 * Ported from V2 config/tracker-alternatives.ts
 */

export type TrackerMapping = {
  /** Tracker identifier patterns (matches scanner output) */
  patterns: string[]
  /** Human-readable name */
  name: string
  /** Category for grouping */
  category: "analytics" | "advertising" | "social" | "fingerprinting"
  /** Tool slugs from our directory that are alternatives */
  alternativeSlugs: string[]
  /** Why this tracker is problematic */
  issue: string
  /** Priority for display (1 = show first) */
  priority: number
}

export const trackerMappings: TrackerMapping[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // ANALYTICS TRACKERS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    patterns: ["google-analytics.com", "analytics.google.com", "gtag/js", "ga.js"],
    name: "Google Analytics",
    category: "analytics",
    alternativeSlugs: ["plausible", "fathom", "simple-analytics", "matomo"],
    issue: "Sends visitor data to Google, enables cross-site tracking and user profiling",
    priority: 1,
  },
  {
    patterns: ["googletagmanager.com"],
    name: "Google Tag Manager",
    category: "analytics",
    alternativeSlugs: ["plausible", "fathom", "simple-analytics"],
    issue: "Container for multiple trackers, often loads additional tracking scripts",
    priority: 1,
  },
  {
    patterns: ["hotjar.com"],
    name: "Hotjar",
    category: "analytics",
    alternativeSlugs: ["plausible"],
    issue: "Session recording captures detailed user behavior and interactions",
    priority: 2,
  },
  {
    patterns: ["fullstory.com"],
    name: "FullStory",
    category: "analytics",
    alternativeSlugs: ["plausible"],
    issue: "Session replay and behavioral analytics with detailed user tracking",
    priority: 2,
  },
  {
    patterns: ["mixpanel.com"],
    name: "Mixpanel",
    category: "analytics",
    alternativeSlugs: ["plausible"],
    issue: "Detailed user tracking and behavioral profiling",
    priority: 2,
  },
  {
    patterns: ["amplitude.com"],
    name: "Amplitude",
    category: "analytics",
    alternativeSlugs: ["plausible"],
    issue: "Behavioral analytics with user identification and tracking",
    priority: 2,
  },
  {
    patterns: ["segment.com", "segment.io"],
    name: "Segment",
    category: "analytics",
    alternativeSlugs: ["plausible"],
    issue: "Data pipeline that sends user data to multiple third-party services",
    priority: 2,
  },
  {
    patterns: ["heap.io", "heapanalytics.com"],
    name: "Heap",
    category: "analytics",
    alternativeSlugs: ["plausible"],
    issue: "Auto-captures all user interactions without explicit consent",
    priority: 2,
  },
  {
    patterns: ["mouseflow.com"],
    name: "Mouseflow",
    category: "analytics",
    alternativeSlugs: ["plausible"],
    issue: "Session recording and heatmap tracking",
    priority: 3,
  },
  {
    patterns: ["crazyegg.com"],
    name: "Crazy Egg",
    category: "analytics",
    alternativeSlugs: ["plausible"],
    issue: "Heatmap and scroll tracking with session recordings",
    priority: 3,
  },
  {
    patterns: ["luckyorange.com"],
    name: "Lucky Orange",
    category: "analytics",
    alternativeSlugs: ["plausible"],
    issue: "Session recording and visitor tracking",
    priority: 3,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ADVERTISING TRACKERS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    patterns: ["facebook.com/tr", "connect.facebook.net", "fbevents"],
    name: "Facebook Pixel",
    category: "advertising",
    alternativeSlugs: [],
    issue: "Used for cross-site ad targeting and conversion tracking",
    priority: 1,
  },
  {
    patterns: ["doubleclick.net"],
    name: "Google DoubleClick",
    category: "advertising",
    alternativeSlugs: [],
    issue: "Google's advertising network with extensive cross-site tracking",
    priority: 1,
  },
  {
    patterns: ["googlesyndication.com", "googleadservices.com", "adservice.google.com"],
    name: "Google Ads",
    category: "advertising",
    alternativeSlugs: [],
    issue: "Tracks users for personalized advertising across the web",
    priority: 1,
  },
  {
    patterns: ["criteo.com"],
    name: "Criteo",
    category: "advertising",
    alternativeSlugs: [],
    issue: "Retargeting network with extensive cross-site tracking",
    priority: 2,
  },
  {
    patterns: ["taboola.com"],
    name: "Taboola",
    category: "advertising",
    alternativeSlugs: [],
    issue: "Content recommendation network with user tracking",
    priority: 2,
  },
  {
    patterns: ["outbrain.com"],
    name: "Outbrain",
    category: "advertising",
    alternativeSlugs: [],
    issue: "Content recommendation network with user tracking",
    priority: 2,
  },
  {
    patterns: ["adsrvr.org"],
    name: "The Trade Desk",
    category: "advertising",
    alternativeSlugs: [],
    issue: "Programmatic advertising with user tracking",
    priority: 2,
  },
  {
    patterns: ["twitter.com/i/adsct", "ads-twitter.com"],
    name: "Twitter/X Ads",
    category: "advertising",
    alternativeSlugs: [],
    issue: "Twitter advertising pixel for conversion tracking",
    priority: 2,
  },
  {
    patterns: ["linkedin.com/px", "snap.licdn.com"],
    name: "LinkedIn Ads",
    category: "advertising",
    alternativeSlugs: [],
    issue: "LinkedIn advertising pixel for B2B targeting",
    priority: 2,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SOCIAL WIDGETS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    patterns: ["platform.twitter.com"],
    name: "Twitter/X Widgets",
    category: "social",
    alternativeSlugs: [],
    issue: "Tracks visitors even without interaction, enables cross-site tracking",
    priority: 3,
  },
  {
    patterns: ["platform.linkedin.com"],
    name: "LinkedIn Widgets",
    category: "social",
    alternativeSlugs: [],
    issue: "Professional network tracking across websites",
    priority: 3,
  },
  {
    patterns: ["apis.google.com/js/platform"],
    name: "Google Platform",
    category: "social",
    alternativeSlugs: [],
    issue: "Google social widgets with tracking capabilities",
    priority: 3,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FINGERPRINTING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    patterns: ["fingerprintjs.com", "fpjs.io"],
    name: "FingerprintJS",
    category: "fingerprinting",
    alternativeSlugs: [],
    issue: "Browser fingerprinting for device identification without cookies",
    priority: 1,
  },
  {
    patterns: ["ipify.org", "ipinfo.io", "ipapi.co"],
    name: "IP Detection Services",
    category: "fingerprinting",
    alternativeSlugs: [],
    issue: "IP-based geolocation and user identification",
    priority: 3,
  },
]

/**
 * Find alternatives for a detected tracker
 */
export function findAlternativesForTracker(trackerUrl: string): TrackerMapping | null {
  const urlLower = trackerUrl.toLowerCase()

  for (const mapping of trackerMappings) {
    if (mapping.patterns.some((pattern) => urlLower.includes(pattern))) {
      return mapping
    }
  }

  return null
}

/**
 * Get all unique tracker mappings from a list of tracker URLs
 */
export function getTrackerMappings(trackerUrls: string[]): TrackerMapping[] {
  const seen = new Set<string>()
  const mappings: TrackerMapping[] = []

  for (const url of trackerUrls) {
    const mapping = findAlternativesForTracker(url)
    if (mapping && !seen.has(mapping.name)) {
      seen.add(mapping.name)
      mappings.push(mapping)
    }
  }

  return mappings.sort((a, b) => a.priority - b.priority)
}

/**
 * Category-based fallback recommendations when no specific mapping exists
 */
export const categoryRecommendations: Record<string, { message: string; slugs: string[] }> = {
  analytics: {
    message: "Consider privacy-friendly analytics alternatives",
    slugs: ["plausible", "fathom", "simple-analytics"],
  },
  advertising: {
    message: "Consider removing advertising trackers or using privacy-respecting ad networks",
    slugs: [],
  },
  social: {
    message: "Consider removing social widgets or using privacy-friendly sharing buttons",
    slugs: [],
  },
  fingerprinting: {
    message: "Browser fingerprinting should be removed - there are no privacy-friendly alternatives",
    slugs: [],
  },
}
