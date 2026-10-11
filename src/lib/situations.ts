/**
 * Situations: the groupings behind /start and the dp_route MCP tool. One place, so the page
 * and the tool never disagree. Each item points at an existing guide or stack by slug;
 * situations.test.ts fails if one is missing.
 */
import { keywords } from "@/lib/site-search"

export type SituationItem = { kind: "guide" | "stack"; slug: string }

export type Situation = {
  id: string
  name: string
  blurb: string
  /** Words a person might use to describe this situation; matched against their own words. */
  terms: string[]
  items: SituationItem[]
}

export const BASELINE: SituationItem[] = [
  { kind: "guide", slug: "privacy-where-to-start" },
  { kind: "guide", slug: "how-to-build-your-threat-model" },
  { kind: "stack", slug: "privacy-starter-kit" },
]

export const SITUATIONS: Situation[] = [
  {
    id: "work-or-business",
    name: "I work from home or run a business",
    blurb: "Work and personal life share devices and accounts.",
    terms: ["work", "working", "remote", "business", "owner", "employee", "freelance", "freelancer", "company", "nomad", "office", "laptop", "colleague", "employer"],
    items: [
      { kind: "stack", slug: "remote-worker-privacy-stack" },
      { kind: "stack", slug: "small-business-owner-privacy-stack" },
    ],
  },
  {
    id: "journalist-or-activist",
    name: "I report, research or organise",
    blurb: "Other people depend on your devices staying private.",
    terms: ["journalist", "reporter", "source", "sources", "activist", "protest", "protester", "organiser", "organizer", "researcher", "campaign", "press", "newsroom"],
    items: [
      { kind: "stack", slug: "journalist-privacy-stack" },
      { kind: "stack", slug: "activist-protester-digital-safety" },
    ],
  },
  {
    id: "harassment",
    name: "Someone is watching or harassing me",
    blurb: "Start with safety. Take it at your own pace.",
    terms: ["stalker", "stalking", "harass", "harassed", "harassment", "abuse", "abuser", "abusive", "ex", "partner", "followed", "spyware", "stalkerware", "domestic", "watching", "tracking", "airtag", "airtags", "tile", "tracker", "trackers"],
    items: [
      { kind: "stack", slug: "stalking-abuse-survivor-safety-kit" },
      { kind: "guide", slug: "family-location-apps-and-airtags" },
    ],
  },
  {
    id: "family-location",
    name: "I want to share location with my family",
    blurb: "Life360, Find My, Google and social maps: who can see where your family is.",
    terms: ["family", "kid", "kids", "child", "children", "teen", "teens", "son", "daughter", "parent", "parents", "life360", "location", "sharing", "share", "circle", "snapchat", "instagram"],
    items: [{ kind: "guide", slug: "family-location-apps-and-airtags" }],
  },
  {
    id: "leave-google",
    name: "I want to leave Google",
    blurb: "Mail, search, maps, photos and the phone itself.",
    terms: ["google", "gmail", "youtube", "degoogle", "de-google", "alternative", "alternatives", "leave", "leaving", "switch", "switching", "replace"],
    items: [
      { kind: "guide", slug: "leave-gmail-without-losing-your-accounts" },
      { kind: "stack", slug: "de-google-your-life" },
      { kind: "stack", slug: "escape-gmail-encrypted-email-aliases" },
    ],
  },
  {
    id: "phone",
    name: "I am choosing or changing my phone",
    blurb: "Custom operating systems, app stores and what still works.",
    terms: ["phone", "android", "pixel", "graphene", "grapheneos", "calyx", "calyxos", "play", "store", "apps", "custom", "rom", "operating", "system", "smartphone", "banking"],
    items: [
      { kind: "guide", slug: "grapheneos-vs-calyxos" },
      { kind: "guide", slug: "what-still-works-after-switching-to-grapheneos" },
      { kind: "guide", slug: "apps-without-the-google-play-store" },
      { kind: "stack", slug: "degoogle-android-phone" },
    ],
  },
  {
    id: "browser",
    name: "I want a more private browser",
    blurb: "Firefox, Brave, Mullvad, Tor and what each costs you.",
    terms: ["browser", "browsers", "firefox", "brave", "mullvad", "tor", "librewolf", "chrome", "safari", "fingerprint", "fingerprinting", "extension", "extensions", "browsing"],
    items: [{ kind: "guide", slug: "private-browsers-compared" }],
  },
  {
    id: "accounts",
    name: "I want better accounts and logins",
    blurb: "Passwords, two-factor codes and email addresses.",
    terms: ["password", "passwords", "manager", "2fa", "two-factor", "authenticator", "login", "logins", "account", "accounts", "alias", "aliases", "passkey", "passkeys", "bitwarden", "email"],
    items: [
      { kind: "guide", slug: "how-to-choose-a-password-manager" },
      { kind: "guide", slug: "move-2fa-codes-to-a-new-app-or-phone" },
      { kind: "guide", slug: "email-aliases-simplelogin-vs-addy" },
    ],
  },
  {
    id: "network",
    name: "I want to fix my home network or VPN",
    blurb: "DNS, ad blocking, VPNs and what they break.",
    terms: ["vpn", "dns", "router", "network", "wifi", "adblock", "ad", "ads", "blocking", "pihole", "pi-hole", "filter", "home", "mullvad", "wireguard", "captcha", "captchas"],
    items: [
      { kind: "guide", slug: "private-dns-and-ad-blocking" },
      { kind: "guide", slug: "why-your-vpn-breaks-sites-and-how-to-fix-it" },
      { kind: "guide", slug: "mullvad-vs-proton-vpn" },
    ],
  },
  {
    id: "being-recorded",
    name: "Someone is recording me",
    blurb: "Meeting bots, AI scribes at the doctor, smart glasses, and what consent law says.",
    terms: ["recording", "recorded", "record", "recorder", "notetaker", "notetakers", "otter", "fireflies", "scribe", "scribes", "transcribe", "transcribing", "transcription", "glasses", "ray-ban", "pendant", "wearable", "meeting", "meetings", "zoom", "doctor", "consent", "wiretap", "eavesdropping", "listening"],
    items: [{ kind: "guide", slug: "someones-ai-is-recording-you" }],
  },
  {
    id: "street-cameras",
    name: "Cameras are watching my street",
    blurb: "License plate readers like Flock, Ring doorbells, and a neighbor's camera.",
    terms: ["flock", "alpr", "lpr", "plate", "plates", "license", "reader", "readers", "ring", "doorbell", "doorbells", "camera", "cameras", "cctv", "surveillance", "neighbor", "neighbors", "neighbour", "sidewalk", "police", "car", "street", "yard"],
    items: [
      { kind: "guide", slug: "flock-license-plate-cameras" },
      { kind: "guide", slug: "ring-doorbell-privacy-settings" },
    ],
  },
  {
    id: "ai",
    name: "I want to use AI more privately",
    blurb: "From settings on the big chatbots to running a model yourself.",
    terms: ["ai", "chatbot", "chatbots", "chatgpt", "llm", "claude", "gemini", "copilot", "model", "models", "local", "assistant", "agent", "agents", "mcp", "prompt", "prompts", "ollama", "jan", "connect", "connector", "connectors", "muse", "dots", "openclaw", "comet", "siri", "intelligence", "recall"],
    items: [
      { kind: "guide", slug: "how-to-use-ai-chatbots-privately" },
      { kind: "guide", slug: "private-ai-what-you-have-to-trust" },
      { kind: "guide", slug: "run-an-ai-model-on-your-own-computer" },
      { kind: "guide", slug: "before-you-install-an-ai-agent-app" },
      { kind: "guide", slug: "before-you-connect-an-ai-agent-or-mcp-server" },
      { kind: "guide", slug: "turn-off-ai-on-your-phone" },
      { kind: "guide", slug: "turn-off-ai-on-your-computer" },
    ],
  },
  {
    id: "smart-tv",
    name: "My TV is tracking what I watch",
    blurb: "Smart TVs and streaming sticks that report what's on screen, and how to turn it off.",
    terms: ["tv", "tvs", "television", "smart-tv", "roku", "firestick", "vizio", "hisense", "tcl", "acr", "streaming", "watch"],
    items: [
      { kind: "guide", slug: "turn-off-smart-tv-tracking" },
      { kind: "guide", slug: "private-dns-and-ad-blocking" },
    ],
  },
  {
    id: "clear-online",
    name: "I want to clear what is already online",
    blurb: "Data brokers, public records and your own footprint.",
    terms: ["data", "broker", "brokers", "removal", "remove", "delete", "public", "records", "address", "name", "footprint", "people-search", "opt-out", "exposed", "doxxed", "dox"],
    items: [
      { kind: "guide", slug: "remove-name-from-data-brokers" },
      { kind: "guide", slug: "keep-home-address-off-public-records" },
      { kind: "stack", slug: "delete-yourself-from-the-internet" },
    ],
  },
]

const naive = (w: string) => w.replace(/s$/, "")

/**
 * Situations that match a person's own words, best first (at most `limit`). A situation scores
 * one point for each distinct word in the text that is one of its terms. No match returns [].
 */
export function matchSituations(text: string, limit = 3): Situation[] {
  const words = new Set(keywords(text).map(naive))
  if (words.size === 0) return []
  return SITUATIONS.map((s, index) => ({
    s,
    index,
    score: new Set(s.terms.map(naive).filter((t) => words.has(t))).size,
  }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((x) => x.s)
}
