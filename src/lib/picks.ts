/**
 * "DP picks": where Default Privacy points an ordinary person first, per category.
 * Position is DP's order. Up to three per category; some categories have none because
 * nothing cleared the bar. Editorial judgment, explained on /how-we-pick.
 *
 * Keys are category slugs from consumer-replacements.ts. Reasons are one plain sentence,
 * no links, no dated claims (they must stay true between re-checks).
 */

export type Pick = { slug: string; reason: string }
export type PickInfo = { category: string; reason: string; position: number }

export const PICKS: Record<string, Pick[]> = {
  "encrypted-email": [
    { slug: "tuta", reason: "German, subscription-funded and open source; it also encrypts subject lines and uses post-quantum keys." },
    { slug: "proton", reason: "A full encrypted mailbox with a free tier, open-source apps and published audit reports, run by a Swiss company funded by subscriptions." },
  ],
  "encrypted-messaging": [
    { slug: "signal", reason: "Nonprofit-run, open source and end-to-end encrypted by default, with usernames so contacts do not need your number." },
    { slug: "simplex-chat", reason: "No phone number or account ID needed, open source, with independent security reviews published." },
  ],
  browsers: [
    { slug: "firefox", reason: "An independent engine (not Chromium), open source, and easy to start with thanks to imports and add-ons." },
    { slug: "brave-browser", reason: "Blocks trackers and ads by default and is open source." },
    { slug: "mullvad-browser", reason: "Built with the Tor Project to resist fingerprinting, Mullvad says it ships without telemetry; it forgets logins when closed." },
  ],
  "private-search": [
    { slug: "duckduckgo", reason: "Familiar results, with a stated no-search-history policy, and it works as the default in every browser." },
    { slug: "brave-search", reason: "Runs its own index instead of reselling Google or Bing results, and says it does not profile you." },
  ],
  "voip-calls": [
    { slug: "signal", reason: "End-to-end encrypted voice and video calls with people who already use it, run by a nonprofit with no ads." },
    { slug: "jitsi", reason: "Free video meetings that run in a browser with nothing to install, which suits people who will not install an app." },
    { slug: "jami", reason: "Peer-to-peer calls with no phone number and no central server." },
  ],
  "social-networks": [
    { slug: "mastodon", reason: "The listed network that replaces Twitter-style posting for ordinary people: nonprofit, no venture capital, and you choose your server." },
  ],
  "video-platforms": [
    { slug: "freetube", reason: "Watch YouTube on Windows, Mac or Linux with no Google account and no ads; history stays on your computer. YouTube can still see your IP address." },
    { slug: "newpipe", reason: "The same idea on Android: watch YouTube without an account or ads. YouTube can still see your IP address." },
    { slug: "peertube", reason: "A real alternative network rather than a front-end: federated video hosting from the French nonprofit Framasoft." },
  ],
  "mobile-os": [
    { slug: "grapheneos", reason: "Hardened Android with a strong security focus, donation-funded, with optional sandboxed Google Play. Runs on Pixel phones only." },
    { slug: "e-os", reason: "Android without Google that fits many phones, with an easy installer, and can be bought preinstalled from Murena." },
    { slug: "calyxos", reason: "Privacy-focused Android from the Calyx Institute, a nonprofit, for Pixel, Fairphone and some Motorola phones." },
  ],
  "desktop-os": [
    { slug: "linux-mint", reason: "The easiest first Linux for someone leaving Windows: a familiar desktop layout and long-term support." },
    { slug: "ubuntu", reason: "The most widely supported Linux, with long-term releases and instructions for most hardware and apps." },
    { slug: "fedora", reason: "Community-built Linux with current software; a good fit if you want newer features and do not mind upgrading about once a year." },
  ],
  "auth-2fa": [
    { slug: "ente-auth", reason: "Works on iPhone, Android, desktop and web, with end-to-end encrypted backup, an offline mode, and import and export so you are not locked in." },
    { slug: "2fas", reason: "Free for iPhone and Android, no account needed, with backup to your own iCloud or Google Drive." },
    { slug: "aegis-authenticator", reason: "Android only, no cloud, open source, with automatic backups to a place you choose and imports from other apps." },
  ],
  "private-ai": [
    { slug: "jan-ai", reason: "A desktop app that runs open models on your own computer, so prompts stay there unless you add an online service." },
  ],
  "rss-news-readers": [
    { slug: "netnewswire", reason: "A free, open-source feed reader for Mac, iPhone and iPad with no tracking or ads." },
    { slug: "feeder", reason: "A free Android reader that keeps everything on the phone, needs no account, and imports and exports OPML." },
  ],
  "encrypted-cloud-storage": [
    { slug: "ente", reason: "End-to-end encrypted photo and file backup, fully open source, with published independent audits and a free tier." },
    { slug: "proton-drive", reason: "End-to-end encrypted file storage with open-source apps and published security reviews, from a Swiss company." },
    { slug: "cryptomator", reason: "Open-source client-side encryption for any cloud folder; it encrypts file contents and file names, but not timestamps, file sizes or the number of files (Cryptomator docs)." },
  ],
  "password-managers": [
    { slug: "bitwarden", reason: "The easiest full-featured manager to start with: a free tier, apps on every platform, public code and published independent audits." },
    { slug: "keepass-xc", reason: "Free and open source, with a local file you control and no company or account." },
    { slug: "protonpass", reason: "A simple end-to-end encrypted manager with open-source apps, built-in email aliases and a free tier." },
  ],
  "digital-notes": [
    { slug: "joplin", reason: "Free, open-source notes on every platform with end-to-end encryption on sync and an Evernote importer." },
    { slug: "notesnook", reason: "Open-source, end-to-end encrypted notes with a free tier and apps on every platform." },
  ],
  "office-suites": [
    { slug: "libreoffice", reason: "A free, open-source desktop suite from a foundation; it runs offline and opens Word and Excel files." },
    { slug: "cryptpad", reason: "Browser-based documents, sheets and slides that are end-to-end encrypted, designed so the host cannot read them." },
  ],
}

/** Normalize a category name or slug ("VoIP & Calls", "voip-calls") to a slug-shaped key. */
export function normalizeCategoryKey(input: string): string {
  return input.replace(/\+/g, " ").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

/** Ordered picks for a category (by slug or name); empty when none. */
export function picksForCategory(category: string | undefined | null): Pick[] {
  if (!category) return []
  return PICKS[normalizeCategoryKey(category)] ?? []
}

/** The first category in which this tool is a pick, with its reason; null if not a pick. */
export function pickInfo(slug: string): PickInfo | null {
  for (const [category, list] of Object.entries(PICKS)) {
    const i = list.findIndex((p) => p.slug === slug)
    if (i !== -1) return { category, reason: list[i].reason, position: i + 1 }
  }
  return null
}

export function isPick(slug: string): boolean {
  return pickInfo(slug) !== null
}

/** Every slug that is a pick in any category (stable, sorted). */
export function allPickSlugs(): string[] {
  return [...new Set(Object.values(PICKS).flatMap((l) => l.map((p) => p.slug)))].sort()
}

/**
 * Slugs that rank first for a view, in rank order: the viewed category's picks when it
 * has any, otherwise every pick from any category (all equal; A to Z breaks the tie).
 */
export function rankedPickSlugs(category: string | undefined | null): string[] {
  const own = picksForCategory(category)
  return own.length > 0 ? own.map((p) => p.slug) : allPickSlugs()
}

/**
 * The same order the database uses, for lists already in memory: picks first (DP's order
 * in the category, or any-category picks by name when there is none), then A to Z.
 * `keepOrder` leaves non-picks in their incoming order instead (curated lists).
 */
export function sortByPicks<T extends { slug: string; name: string }>(
  items: T[],
  category: string | undefined | null,
  keepOrder = false,
): T[] {
  const slugs = rankedPickSlugs(category)
  const ranked = picksForCategory(category).length > 0
  const rank = (s: string) => {
    const i = slugs.indexOf(s)
    return i === -1 ? slugs.length : ranked ? i : 0
  }
  return items
    .map((t, i) => ({ t, i }))
    .sort(
      (a, b) =>
        rank(a.t.slug) - rank(b.t.slug) ||
        (keepOrder ? a.i - b.i : a.t.name.localeCompare(b.t.name) || a.i - b.i),
    )
    .map((x) => x.t)
}
