/**
 * URL normalization for duplicate detection.
 * Strips protocol, www, trailing slashes, and query params
 * so that different representations of the same site match.
 */

export function normalizeUrl(raw: string): string {
  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`)
    return url.hostname.replace(/^www\./, "") + url.pathname.replace(/\/+$/, "")
  } catch {
    return raw.toLowerCase().trim()
  }
}

export function extractDomain(raw: string): string {
  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`)
    return url.hostname.replace(/^www\./, "")
  } catch {
    return raw.toLowerCase().trim()
  }
}

export function ensureProtocol(raw: string): string {
  if (/^https?:\/\//i.test(raw)) return raw
  return `https://${raw}`
}
