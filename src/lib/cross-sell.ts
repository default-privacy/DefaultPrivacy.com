/**
 * Cross-Sell Map — curated internal links between the free tools, the directory,
 * guides, and stacks.
 *
 * One hand-curated map so every internal link is verified once and kept honest in a
 * single place. Mirrors the proven static-map approach of
 * `src/lib/scanner/tracker-alternatives.ts`: no DB query, no runtime lookup, no chance
 * of an SSR DB hit. Category links use the `/directory?category=<slug>` filter (which
 * resolves by name OR slug — see `resolveCategoryFilterIds`), avoiding the dead
 * per-tool-slug rot that the tracker map suffers from.
 *
 * Every slug below is verified against the live category set and the guide/stack
 * content directories.
 */

export type CrossSellKind = "category" | "guide" | "stack" | "tool"

export type CrossSellTarget = {
  label: string
  href: string
  kind: CrossSellKind
}

const category = (slug: string, label: string): CrossSellTarget => ({
  label,
  href: `/directory?category=${slug}`,
  kind: "category",
})

const guide = (slug: string, label: string): CrossSellTarget => ({
  label,
  href: `/guides/${slug}`,
  kind: "guide",
})

const stack = (slug: string, label: string): CrossSellTarget => ({
  label,
  href: `/stacks/${slug}`,
  kind: "stack",
})

// ─────────────────────────────────────────────────────────────────────────────
// Per-concern bundles — wired into the free-tool result surfaces (C3-a)
// ─────────────────────────────────────────────────────────────────────────────

/** WHOIS record exposes personal registrant details. */
export const WHOIS_EXPOSED: CrossSellTarget[] = [
  category("domain-registrars", "Privacy-first domain registrars"),
  category("identity-protection", "Identity protection tools"),
  guide("keep-home-address-off-public-records", "Keep your home address off public records"),
]

/** Email domain fails SPF/DKIM/DMARC (grade C/D/F). */
export const EMAIL_FAIL: CrossSellTarget[] = [
  category("email-security", "Email security tools"),
  category("encrypted-email", "Encrypted email providers"),
  stack("escape-gmail-encrypted-email-aliases", "Escape Gmail: encrypted email & aliases"),
]

/** DNS is leaking outside the VPN tunnel. */
export const DNS_LEAK: CrossSellTarget[] = [
  category("virtual-private-networks", "VPNs"),
  category("dns", "Private DNS resolvers"),
  guide("run-your-own-vpn-wireguard", "Run your own VPN with WireGuard"),
]

/** Password appears in a known breach. */
export const PASSWORD_BREACHED: CrossSellTarget[] = [
  category("password-managers", "Password managers"),
  category("auth-2fa", "Two-factor authentication"),
]

/** Account/email breach recovery. */
export const BREACH_RECOVERY: CrossSellTarget[] = [
  category("identity-protection", "Identity protection tools"),
  category("data-broker-redaction", "Data broker removal"),
  category("password-managers", "Password managers"),
  stack("delete-yourself-from-the-internet", "Delete yourself from the internet"),
]

// ─────────────────────────────────────────────────────────────────────────────
// Category → content map — tool detail → relevant guides/stacks (C3-b)
//
// Keyed off the tool's already-loaded category *name* (what `getToolCategoryTags`
// returns as `categoryLabel` — the category name, not the slug), so no extra DB
// query. The name↔slug relationship isn't a clean slugify (e.g. "Authentication &
// 2FA" → `auth-2fa`), so we key by the exact name to stay exact. Values are
// `guide:<slug>` / `stack:<slug>` refs resolved by `resolveCategoryContent`.
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORY_TO_CONTENT: Record<string, string[]> = {
  "Encrypted Email": ["stack:escape-gmail-encrypted-email-aliases"],
  "Email Security": ["stack:escape-gmail-encrypted-email-aliases"],
  "Data Broker Redaction": [
    "stack:delete-yourself-from-the-internet",
    "guide:remove-name-from-data-brokers",
  ],
  "Identity Protection": [
    "stack:delete-yourself-from-the-internet",
    "guide:keep-home-address-off-public-records",
  ],
  "Virtual Private Networks": ["guide:run-your-own-vpn-wireguard"],
  "DNS": ["guide:run-your-own-vpn-wireguard"],
  "Domain Registrars": ["guide:keep-home-address-off-public-records"],
  "Password Managers": ["stack:privacy-starter-kit"],
}

/** Human labels for the curated content refs above. */
const CONTENT_LABELS: Record<string, string> = {
  "stack:escape-gmail-encrypted-email-aliases": "Escape Gmail: encrypted email & aliases",
  "stack:delete-yourself-from-the-internet": "Delete yourself from the internet",
  "stack:privacy-starter-kit": "Privacy starter kit",
  "guide:remove-name-from-data-brokers": "Remove your name from data brokers",
  "guide:keep-home-address-off-public-records": "Keep your home address off public records",
  "guide:run-your-own-vpn-wireguard": "Run your own VPN with WireGuard",
}

/**
 * Resolve a tool's category name (the `categoryLabel` from `getToolCategoryTags`) to
 * curated guide/stack cross-links. Returns [] when the category has no mapping. No DB
 * access — pure static lookup.
 */
export function resolveCategoryContent(categoryName: string | null | undefined): CrossSellTarget[] {
  if (!categoryName) return []
  const refs = CATEGORY_TO_CONTENT[categoryName]
  if (!refs) return []

  return refs.map((ref) => {
    const [kind, slug] = ref.split(":") as ["guide" | "stack", string]
    const label = CONTENT_LABELS[ref] ?? slug.replace(/-/g, " ")
    return kind === "stack" ? stack(slug, label) : guide(slug, label)
  })
}
