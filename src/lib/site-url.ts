/**
 * Canonical site URL for og:url, sitemaps, JSON-LD. The apex may still route
 * elsewhere until DNS is fully on Vercel.
 */
export function getCanonicalSiteUrl(): string {
  // Single source of truth for the public base URL (N28). Reads the one declared,
  // prod-required var (NEXT_PUBLIC_URL, validated in env.ts) — not the former phantom
  // NEXT_PUBLIC_APP_URL, which was declared nowhere and always fell back to the apex.
  return process.env.NEXT_PUBLIC_URL?.replace(/\/$/, "") ?? "https://defaultprivacy.com"
}

/**
 * Origin that serves `public/og.png` for Open Graph. Social crawlers must fetch a
 * stable, public URL — not `VERCEL_URL`, which is a **per-deployment** host
 * (e.g. `project-abc123-team.vercel.app`) that often403s, expires, or fails in validators.
 *
 * Prefer `VERCEL_PROJECT_PRODUCTION_URL` (stable `*.vercel.app` production hostname).
 */
export function getDeploymentAssetOrigin(): string {
  const override = process.env.NEXT_PUBLIC_OG_ASSET_ORIGIN?.trim().replace(/\/$/, "")
  if (override) {
    return override.startsWith("http") ? override : `https://${override}`
  }

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(/\/$/, "")
  if (productionHost) {
    return productionHost.startsWith("http") ? productionHost : `https://${productionHost}`
  }

  const vercelUrl = process.env.VERCEL_URL?.trim()
  if (vercelUrl) {
    return `https://${vercelUrl}`
  }

  return getCanonicalSiteUrl()
}

export function getOgImageUrl(): string {
  return `${getDeploymentAssetOrigin()}/og.png`
}
