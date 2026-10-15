/**
 * Hand-checked map from what people call a product to its ToS;DR service.
 *
 * Never searched at runtime: ToS;DR's name search returns lookalikes ("zoom" finds ZoomInfo,
 * "gmail.com" finds an unrelated app, "microsoft.com" finds the Microsoft Store). Each row was
 * matched on the vendor's own domain in ToS;DR's service list and its name read by hand on
 * 2026-10-15. `name` is ToS;DR's service name exactly; scripts/sync-tosdr.ts refuses to write a
 * snapshot if ToS;DR ever returns a different name for the id. `dpSlugs` ties directory records
 * (mostly DP picks) to the same service.
 */

export type TosdrService = { id: number; name: string; names: string[]; dpSlugs?: string[] }

export const TOSDR_SERVICES: TosdrService[] = [
  // Mainstream products people ask about or leave (the products in consumer-replacements.ts).
  {
    id: 217,
    name: "Google",
    names: [
      "google", "gmail", "google mail", "chrome", "google chrome", "google search", "google drive",
      "google photos", "google keep", "google docs", "google workspace", "google meet", "google maps",
      "google authenticator", "google password manager", "gemini", "google gemini", "google news",
      "android", "stock android",
    ],
  },
  {
    id: 244,
    name: "Microsoft Services",
    names: [
      "microsoft", "outlook", "hotmail", "edge", "microsoft edge", "bing", "onedrive", "onenote",
      "microsoft office", "microsoft 365", "office 365", "word", "microsoft teams", "teams", "skype",
      "windows", "windows 11", "microsoft windows", "microsoft authenticator", "copilot", "microsoft copilot",
    ],
  },
  { id: 158, name: "Apple Services", names: ["apple", "icloud", "icloud mail", "icloud drive", "icloud photos", "icloud keychain", "imessage", "safari", "apple notes", "facetime", "ios", "iphone", "macos", "mac os", "apple news"] },
  { id: 309, name: "Yahoo!", names: ["yahoo", "yahoo mail", "yahoo search", "aol", "aol mail"] },
  { id: 190, name: "Amazon", names: ["amazon", "alexa", "amazon alexa", "echo", "amazon echo"] },
  { id: 198, name: "WhatsApp", names: ["whatsapp"] },
  { id: 182, name: "Facebook", names: ["facebook", "messenger", "facebook messenger", "meta"] },
  { id: 219, name: "Instagram", names: ["instagram", "threads"] },
  { id: 195, name: "X (Twitter)", names: ["x", "twitter"] },
  { id: 1448, name: "TikTok", names: ["tiktok"] },
  { id: 194, name: "Reddit", names: ["reddit"] },
  { id: 311, name: "Snap Inc. (Snapchat)", names: ["snapchat", "snap"] },
  { id: 536, name: "Discord", names: ["discord"] },
  { id: 1946, name: "Telegram", names: ["telegram"] },
  { id: 9563, name: "Wechat (微信)", names: ["wechat"] },
  { id: 2198, name: "Zoom Video Communications", names: ["zoom"] },
  { id: 206, name: "Slack", names: ["slack"] },
  { id: 1817, name: "Notion", names: ["notion"] },
  { id: 207, name: "Evernote", names: ["evernote"] },
  { id: 270, name: "Dropbox", names: ["dropbox"] },
  { id: 3848, name: "Box", names: ["box"] },
  { id: 161, name: "LastPass", names: ["lastpass"] },
  { id: 1574, name: "Dashlane", names: ["dashlane"] },
  { id: 4675, name: "Keeper", names: ["keeper", "keeper security"] },
  { id: 2532, name: "Authy (Twilio)", names: ["authy"] },
  { id: 5630, name: "Opera", names: ["opera"] },
  { id: 7108, name: "OpenAI (ChatGPT)", names: ["chatgpt", "openai"] },
  { id: 405, name: "Feedly", names: ["feedly"] },

  // Directory tools, mostly DP picks, matched by their website_url domain.
  { id: 8201, name: "2FAS", names: ["2fas"], dpSlugs: ["2fas"] },
  { id: 4076, name: "Aegis Authenticator", names: ["aegis", "aegis authenticator"], dpSlugs: ["aegis-authenticator"] },
  { id: 1348, name: "Bitwarden", names: ["bitwarden"], dpSlugs: ["bitwarden"] },
  { id: 1487, name: "Brave", names: ["brave", "brave browser"], dpSlugs: ["brave-browser"] },
  { id: 2558, name: "Calyx Institute", names: ["calyxos", "calyx"], dpSlugs: ["calyxos"] },
  { id: 4403, name: "Cryptomator", names: ["cryptomator"], dpSlugs: ["cryptomator"] },
  { id: 222, name: "DuckDuckGo", names: ["duckduckgo", "ddg"], dpSlugs: ["duckduckgo"] },
  { id: 5256, name: "Ente", names: ["ente", "ente photos", "ente auth"], dpSlugs: ["ente", "ente-auth"] },
  { id: 2875, name: "e-foundation", names: ["/e/os", "e/os", "e-os"], dpSlugs: ["e-os"] },
  { id: 525, name: "Fedora", names: ["fedora", "fedora linux"], dpSlugs: ["fedora"] },
  { id: 530, name: "Mozilla.org", names: ["firefox", "mozilla firefox", "mozilla"], dpSlugs: ["firefox"] },
  { id: 3996, name: "FreeTube", names: ["freetube"], dpSlugs: ["freetube"] },
  { id: 11708, name: "GrapheneOS", names: ["grapheneos"], dpSlugs: ["grapheneos"] },
  { id: 8170, name: "Jami", names: ["jami"], dpSlugs: ["jami"] },
  { id: 2201, name: "Jitsi", names: ["jitsi", "jitsi meet"], dpSlugs: ["jitsi"] },
  { id: 9477, name: "Joplin", names: ["joplin"], dpSlugs: ["joplin"] },
  { id: 3804, name: "KeePassXC", names: ["keepassxc", "keepass xc"], dpSlugs: ["keepass-xc"] },
  { id: 2077, name: "LibreOffice", names: ["libreoffice"], dpSlugs: ["libreoffice"] },
  { id: 7080, name: "Linux Mint", names: ["linux mint"], dpSlugs: ["linux-mint"] },
  { id: 639, name: "Mastodon", names: ["mastodon"], dpSlugs: ["mastodon"] },
  { id: 641, name: "Mullvad", names: ["mullvad", "mullvad vpn", "mullvad browser"], dpSlugs: ["mullvad-browser", "mullvad"] },
  { id: 2568, name: "NewPipe", names: ["newpipe"], dpSlugs: ["newpipe"] },
  { id: 4148, name: "Notesnook", names: ["notesnook"], dpSlugs: ["notesnook"] },
  { id: 1596, name: "PeerTube", names: ["peertube"], dpSlugs: ["peertube"] },
  { id: 491, name: "Proton AG", names: ["proton", "proton mail", "protonmail", "proton drive", "proton pass"], dpSlugs: ["proton", "proton-drive", "protonpass"] },
  { id: 528, name: "Signal", names: ["signal"], dpSlugs: ["signal"] },
  { id: 7638, name: "SimpleX Chat", names: ["simplex", "simplex chat"], dpSlugs: ["simplex-chat"] },
  { id: 157, name: "Tuta", names: ["tuta", "tutanota", "tuta mail"], dpSlugs: ["tuta"] },
  { id: 578, name: "Canonical (Ubuntu)", names: ["ubuntu"], dpSlugs: ["ubuntu"] },
]

const normalize = (s: string) => s.toLowerCase().trim().replace(/\s+/g, " ")

/** The service for a product name, exact match on the hand-checked names only. */
export function tosdrServiceForName(product: string): TosdrService | null {
  const q = normalize(product)
  return TOSDR_SERVICES.find((s) => s.names.includes(q)) ?? null
}

/** The service a directory record (by slug) is tied to, if any. */
export function tosdrServiceForSlug(slug: string): TosdrService | null {
  return TOSDR_SERVICES.find((s) => s.dpSlugs?.includes(slug)) ?? null
}
