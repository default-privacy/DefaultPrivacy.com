/**
 * Media utilities for fetching favicons
 * 
 * Uses DuckDuckGo's Favicon API - privacy-friendly, no Google tracking.
 * No S3 storage - just returns direct URLs to use.
 */

/**
 * Get a favicon URL for a website using DuckDuckGo's Favicon API
 * 
 * @param websiteUrl - The full URL of the website
 * @returns The favicon URL
 */
export function getFaviconUrl(websiteUrl: string): string {
  try {
    // Extract domain from URL
    const url = new URL(websiteUrl)
    const domain = url.hostname
    
    // Use DuckDuckGo's favicon service (privacy-friendly)
    return `https://icons.duckduckgo.com/ip3/${encodeURIComponent(domain)}.ico`
  } catch {
    // If URL parsing fails, try using the raw input
    return `https://icons.duckduckgo.com/ip3/${encodeURIComponent(websiteUrl)}.ico`
  }
}

/**
 * Fetch and validate a favicon URL
 * 
 * @param websiteUrl - The full URL of the website
 * @returns Object with favicon URL and validation status
 */
export async function fetchFavicon(websiteUrl: string): Promise<{
  url: string
  isValid: boolean
  error?: string
}> {
  const faviconUrl = getFaviconUrl(websiteUrl)
  
  try {
    // Verify the favicon is accessible
    const response = await fetch(faviconUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
    
    if (!response.ok) {
      return {
        url: faviconUrl,
        isValid: false,
        error: `Favicon fetch failed: ${response.status}`,
      }
    }
    
    return {
      url: faviconUrl,
      isValid: true,
    }
  } catch (error) {
    return {
      url: faviconUrl,
      isValid: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Alternative favicon sources to try if DuckDuckGo fails
 */
export function getAlternativeFaviconUrls(websiteUrl: string): string[] {
  try {
    const url = new URL(websiteUrl)
    const domain = url.hostname
    const origin = url.origin
    
    return [
      // DuckDuckGo (primary)
      `https://icons.duckduckgo.com/ip3/${domain}.ico`,
      // Direct favicon.ico
      `${origin}/favicon.ico`,
      // Direct favicon.png
      `${origin}/favicon.png`,
      // Apple touch icon
      `${origin}/apple-touch-icon.png`,
    ]
  } catch {
    return []
  }
}
