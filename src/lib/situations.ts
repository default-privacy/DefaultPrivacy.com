/**
 * Situations: the groupings behind /start and the dp_route MCP tool. One place, so the page
 * and the tool never disagree. Each item points at an existing guide or stack by slug;
 * situations.test.ts fails if one is missing.
 */

export type SituationItem = { kind: "guide" | "stack"; slug: string }

export type Situation = {
  id: string
  name: string
  blurb: string
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
    items: [
      { kind: "stack", slug: "remote-worker-privacy-stack" },
      { kind: "stack", slug: "small-business-owner-privacy-stack" },
    ],
  },
  {
    id: "journalist-or-activist",
    name: "I report, research or organise",
    blurb: "Other people depend on your devices staying private.",
    items: [
      { kind: "stack", slug: "journalist-privacy-stack" },
      { kind: "stack", slug: "activist-protester-digital-safety" },
    ],
  },
  {
    id: "harassment",
    name: "Someone is watching or harassing me",
    blurb: "Start with safety. Take it at your own pace.",
    items: [
      { kind: "stack", slug: "stalking-abuse-survivor-safety-kit" },
      { kind: "guide", slug: "family-location-apps-and-airtags" },
    ],
  },
  {
    id: "car-data",
    name: "My car is sharing how I drive",
    blurb: "Connected cars, driving scores, data brokers and your insurance rates.",
    items: [{ kind: "guide", slug: "car-driving-data-and-insurance" }],
  },
  {
    id: "family-location",
    name: "I want to share location with my family",
    blurb: "Life360, Find My, Google and social maps: who can see where your family is.",
    items: [{ kind: "guide", slug: "family-location-apps-and-airtags" }],
  },
  {
    id: "leave-google",
    name: "I want to leave Google",
    blurb: "Mail, search, maps, photos and the phone itself.",
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
    items: [{ kind: "guide", slug: "private-browsers-compared" }],
  },
  {
    id: "accounts",
    name: "I want better accounts and logins",
    blurb: "Passwords, two-factor codes and email addresses.",
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
    items: [{ kind: "guide", slug: "someones-ai-is-recording-you" }],
  },
  {
    id: "street-cameras",
    name: "Cameras are watching my street",
    blurb: "License plate readers like Flock, Ring doorbells, and a neighbor's camera.",
    items: [
      { kind: "guide", slug: "flock-license-plate-cameras" },
      { kind: "guide", slug: "ring-doorbell-privacy-settings" },
    ],
  },
  {
    id: "ai",
    name: "I want to use AI more privately",
    blurb: "From settings on the big chatbots to running a model yourself.",
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
    items: [
      { kind: "guide", slug: "turn-off-smart-tv-tracking" },
      { kind: "guide", slug: "private-dns-and-ad-blocking" },
    ],
  },
  {
    id: "clear-online",
    name: "I want to clear what is already online",
    blurb: "Data brokers, public records and your own footprint.",
    items: [
      { kind: "guide", slug: "remove-name-from-data-brokers" },
      { kind: "guide", slug: "keep-home-address-off-public-records" },
      { kind: "stack", slug: "delete-yourself-from-the-internet" },
    ],
  },
]
