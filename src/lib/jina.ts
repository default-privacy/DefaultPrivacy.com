/**
 * Jina Reader Integration
 *
 * Uses Jina AI's Reader API to scrape and extract clean text from web pages.
 * Used by the Policy Analyzer to extract privacy policy content from any URL.
 *
 * @see https://jina.ai/reader/
 */

export type JinaResult = {
  success: boolean
  content?: string
  title?: string
  url?: string
  error?: string
}

/**
 * Known privacy policy URLs for major services.
 * These bypass URL detection and go straight to the actual policy.
 */
const KNOWN_PRIVACY_URLS: Record<string, string> = {
  "facebook.com": "https://www.facebook.com/privacy/policy/",
  "instagram.com": "https://privacycenter.instagram.com/policy",
  "meta.com": "https://www.facebook.com/privacy/policy/",
  "google.com": "https://policies.google.com/privacy",
  "youtube.com": "https://policies.google.com/privacy",
  "twitter.com": "https://twitter.com/en/privacy",
  "x.com": "https://twitter.com/en/privacy",
  "tiktok.com": "https://www.tiktok.com/legal/privacy-policy",
  "amazon.com": "https://www.amazon.com/gp/help/customer/display.html?nodeId=468496",
  "apple.com": "https://www.apple.com/legal/privacy/",
  "microsoft.com": "https://privacy.microsoft.com/en-us/privacystatement",
  "linkedin.com": "https://www.linkedin.com/legal/privacy-policy",
  "reddit.com": "https://www.reddit.com/policies/privacy-policy",
  "spotify.com": "https://www.spotify.com/us/legal/privacy-policy/",
  "netflix.com": "https://help.netflix.com/legal/privacy",
  "discord.com": "https://discord.com/privacy",
  "twitch.tv": "https://www.twitch.tv/p/en/legal/privacy-notice/",
  "snapchat.com": "https://snap.com/en-US/privacy/privacy-policy",
  "pinterest.com": "https://policy.pinterest.com/en/privacy-policy",
  "whatsapp.com": "https://www.whatsapp.com/legal/privacy-policy",
  "telegram.org": "https://telegram.org/privacy",
  "signal.org": "https://signal.org/legal/#privacy-policy",
  "zoom.us": "https://explore.zoom.us/en/privacy/",
  "slack.com": "https://slack.com/trust/privacy/privacy-policy",
  "dropbox.com": "https://www.dropbox.com/privacy",
  "github.com": "https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement",
  "openai.com": "https://openai.com/policies/privacy-policy",
  "chatgpt.com": "https://openai.com/policies/privacy-policy",
  "anthropic.com": "https://www.anthropic.com/privacy",
  "paypal.com": "https://www.paypal.com/us/legalhub/privacy-full",
  "stripe.com": "https://stripe.com/privacy",
  "airbnb.com": "https://www.airbnb.com/help/article/2855",
  "uber.com": "https://www.uber.com/legal/en/document/?name=privacy-notice",
}

/**
 * Common privacy policy URL patterns to try when given a bare domain
 */
const PRIVACY_POLICY_PATHS = [
  "/privacy",
  "/privacy-policy",
  "/legal/privacy",
  "/about/privacy",
  "/privacy.html",
  "/pages/privacy",
  "/privacypolicy",
  "/legal/privacy-policy",
  "/en/privacy",
  "/policies/privacy",
  "/policy/privacy",
  "/help/privacy",
]

/**
 * Extract the domain from a URL
 */
export function extractDomain(url: string): string {
  try {
    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`
    const parsed = new URL(normalizedUrl)
    return parsed.hostname.replace(/^www\./, "")
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || url
  }
}

/**
 * Check if a URL looks like it points to a privacy policy
 */
export function isPrivacyPolicyUrl(url: string): boolean {
  const lowerUrl = url.toLowerCase()
  return (
    lowerUrl.includes("privacy") ||
    lowerUrl.includes("datenschutz") ||
    lowerUrl.includes("confidentialite") ||
    lowerUrl.includes("privacidad")
  )
}

/**
 * Scrape a URL using Jina Reader API
 */
export async function scrapeWithJina(
  url: string,
  options: {
    timeout?: number
    returnFormat?: "text" | "markdown" | "html"
  } = {},
): Promise<JinaResult> {
  const { timeout = 45, returnFormat = "text" } = options

  try {
    const normalizedUrl = url.startsWith("http") ? url : `https://${url}`

    const headers: Record<string, string> = {
      "X-Return-Format": returnFormat,
      "X-Timeout": timeout.toString(),
    }

    // Add API key if available (provides higher rate limits)
    const jinaKey = process.env.JINA_API_KEY
    if (jinaKey) {
      headers["Authorization"] = `Bearer ${jinaKey}`
    }

    const response = await fetch(`https://r.jina.ai/${encodeURIComponent(normalizedUrl)}`, {
      headers,
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      if (response.status === 402) {
        return { success: false, error: "Jina API rate limit exceeded" }
      }
      if (response.status === 404) {
        return { success: false, error: "Page not found" }
      }
      if (response.status === 403) {
        return { success: false, error: "Access denied by website" }
      }
      return { success: false, error: `Jina API error: ${response.status} ${response.statusText}` }
    }

    const content = await response.text()

    if (content.length < 100) {
      return {
        success: false,
        error: "Content too short - may not be a valid privacy policy page",
      }
    }

    return {
      success: true,
      content,
      url: normalizedUrl,
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to scrape URL",
    }
  }
}

/**
 * Find the privacy policy URL for a given domain
 */
export async function findPrivacyPolicyUrl(input: string): Promise<string | null> {
  const domain = extractDomain(input)

  // Check if we have a known URL for this domain
  if (KNOWN_PRIVACY_URLS[domain]) {
    return KNOWN_PRIVACY_URLS[domain]
  }

  // If input already looks like a privacy policy URL, use it
  const normalizedInput = input.startsWith("http") ? input : `https://${input}`
  if (isPrivacyPolicyUrl(normalizedInput)) {
    return normalizedInput
  }

  // Try common privacy policy paths
  for (const path of PRIVACY_POLICY_PATHS) {
    const testUrl = `https://${domain}${path}`

    try {
      const response = await fetch(testUrl, {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(5000),
      })

      if (response.ok) {
        return testUrl
      }
    } catch {
      continue
    }
  }

  return null
}

/**
 * Scrape a privacy policy with smart URL detection
 */
export async function scrapePrivacyPolicy(input: string): Promise<JinaResult> {
  const domain = extractDomain(input)

  // First, try to find the privacy policy URL
  const policyUrl = await findPrivacyPolicyUrl(input)

  if (policyUrl) {
    const result = await scrapeWithJina(policyUrl)
    if (result.success) {
      result.url = policyUrl
      return result
    }
  }

  // If known URL failed or wasn't found, try the domain directly with /privacy
  const fallbackUrl = `https://${domain}/privacy`
  const fallbackResult = await scrapeWithJina(fallbackUrl)

  if (fallbackResult.success) {
    fallbackResult.url = fallbackUrl
    return fallbackResult
  }

  // Last resort - try the bare domain
  const bareResult = await scrapeWithJina(`https://${domain}`)

  if (bareResult.success && isPrivacyPolicyUrl(bareResult.content || "")) {
    bareResult.url = `https://${domain}`
    return bareResult
  }

  return {
    success: false,
    error: `Could not find privacy policy for ${domain}. Try providing the direct privacy policy URL.`,
  }
}
