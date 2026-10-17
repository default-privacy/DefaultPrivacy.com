/**
 * Mainstream consumer products people want to leave, mapped to a hand-picked list of
 * directory tools that replace them. Serves "what replaces WhatsApp?" — the most common
 * question shape in privacy forums — which the curated tracker list (website scripts
 * only) cannot. Free-text directory search is no substitute: "gmail" matches PGP add-ons
 * FOR Gmail, not replacements for it.
 *
 * Lists are hand-picked because a category's ranking is not a list of replacements:
 * categories also file business phone carriers, test sites, to-do apps and OSINT tools.
 * Order within a list is not a ranking. `category` is the directory page to browse more.
 *
 * Keep out anything sold to an unknown buyer, archived, or without a release in years
 * (dropped 2026-10-09: raivo, winauth, tofu, padloc, turtl, aether, rssowl, tiny-rss).
 *
 * `whatChanges` says what the move itself involves. Only statements true of the whole
 * group: no claim about one product that its own docs don't make. `guides` and `stacks`
 * are slugs under src/content; a test checks every one exists.
 */
type Replacement = {
  category: string
  label: string
  products: string[]
  slugs: string[]
  whatChanges: string[]
  guides: string[]
  stacks: string[]
}

const REPLACEMENTS: Replacement[] = [
  {
    category: "encrypted-email",
    label: "encrypted email",
    products: ["gmail", "google mail", "outlook", "hotmail", "yahoo mail", "icloud mail", "aol mail"],
    slugs: ["proton", "tuta", "mailbox-org", "mailfence", "startmail", "fastmail"],
    whatChanges: [
      "Your old address keeps receiving mail until you forward it or close the account.",
      "Accounts that use the old address for sign-in or password resets have to be updated one by one.",
      "Old mail stays in the old inbox unless you import it into the new one.",
    ],
    guides: ["proton-mail-vs-tuta"],
    stacks: ["escape-gmail-encrypted-email-aliases", "de-google-your-life"],
  },
  {
    category: "encrypted-messaging",
    label: "encrypted messaging",
    products: ["whatsapp", "messenger", "facebook messenger", "imessage", "telegram", "sms", "wechat", "snapchat"],
    slugs: ["signal", "simplex-chat", "session", "threema-libre", "element", "briar", "jami", "cwtch"],
    whatChanges: [
      "Your contacts have to install the new app too: messages don't cross between apps.",
      "Chat history stays in the old app, so save anything you need before you delete it.",
      "Some of these apps need a phone number to sign up and some don't.",
    ],
    guides: ["signal-vs-simplex", "get-a-second-phone-number"],
    stacks: ["secure-messaging-stack"],
  },
  {
    category: "browsers",
    label: "browsers",
    products: ["chrome", "google chrome", "edge", "microsoft edge", "safari", "opera"],
    slugs: ["firefox", "librewolf", "mullvad-browser", "tor-browser", "brave-browser", "vivaldi", "zen-browser"],
    whatChanges: [
      "Most browsers can import your bookmarks and saved passwords when you first open them.",
      "Extensions have to be installed again; Firefox-based browsers use Firefox add-ons, not Chrome's.",
      "Expect to sign back in to your sites; Tor Browser, Mullvad Browser and LibreWolf forget logins every time they close.",
    ],
    guides: [],
    stacks: ["privacy-starter-kit", "de-google-your-life"],
  },
  {
    category: "private-search",
    label: "private search",
    products: ["google", "google search", "bing", "yahoo", "yahoo search"],
    slugs: ["duckduckgo", "brave-search", "startpage", "searxng", "mojeek", "kagi", "qwant", "metager-privacy-protected-search"],
    whatChanges: [
      "Usually nothing to install: change the default search engine in your browser's settings; Safari only offers a short list.",
      "Results can differ from Google's, most often for local searches like shops and maps.",
    ],
    guides: [],
    stacks: ["de-google-your-life"],
  },
  {
    category: "encrypted-cloud-storage",
    label: "encrypted cloud storage",
    products: ["google drive", "dropbox", "icloud", "icloud drive", "onedrive", "google photos", "icloud photos", "box"],
    slugs: ["filen", "ente", "tresorit", "internxt", "peergos", "nextcloud", "pcloud", "icedrive"],
    whatChanges: [
      "Files don't move by themselves: download them from the old service and upload them to the new one.",
      "Links and folders you shared from the old service stop working once you delete the files there.",
      "With end-to-end encrypted storage, a lost password can mean lost files, so keep the recovery key somewhere safe.",
    ],
    guides: [],
    stacks: ["de-google-your-life"],
  },
  {
    category: "password-managers",
    label: "password managers",
    products: ["lastpass", "dashlane", "keeper", "google password manager", "icloud keychain"],
    slugs: ["bitwarden", "protonpass", "keepass-xc", "1password", "keepassium", "keepass", "pass"],
    whatChanges: [
      "Export your passwords from the old manager and import the file into the new one.",
      "That export file holds every password in plain text, so delete it as soon as the import is done.",
    ],
    guides: ["bitwarden-vs-proton-pass"],
    stacks: ["privacy-starter-kit"],
  },
  {
    category: "digital-notes",
    label: "notes",
    products: ["evernote", "google keep", "onenote", "notion", "apple notes"],
    slugs: ["joplin", "standard-notes", "notesnook", "obsidian", "logsec", "cryptee", "affine"],
    whatChanges: [
      "Most note apps import an export from the old app, but formatting, attachments and tags don't always survive.",
    ],
    guides: [],
    stacks: [],
  },
  {
    category: "office-suites",
    label: "office suites",
    products: ["google docs", "google workspace", "microsoft office", "microsoft 365", "office 365", "word"],
    slugs: ["cryptpad", "libreoffice", "onlyoffice", "nextcloud", "disroot"],
    whatChanges: [
      "Download your documents in standard formats like .docx, .xlsx or .odt and open them in the new suite.",
      "Complex formatting, macros and shared editing may not carry over exactly.",
    ],
    guides: [],
    stacks: [],
  },
  {
    category: "team-collaboration",
    label: "team and community chat",
    products: ["slack", "discord"],
    slugs: ["element", "matrix", "mattermost", "rocket-chat"],
    whatChanges: [
      "Everyone in the group has to move: channels and members don't carry over on their own.",
      "Message history stays in the old workspace unless you export it first.",
      "Self-hosting means you run the server, its updates and its backups.",
    ],
    guides: [],
    stacks: [],
  },
  {
    category: "voip-calls",
    label: "calls and video meetings",
    products: ["zoom", "google meet", "microsoft teams", "teams", "skype", "facetime"],
    slugs: ["jitsi", "signal", "brave-talk", "element", "jami", "linphone", "mumble"],
    whatChanges: [
      "Everyone on the call needs the new tool, though some run in a web browser with nothing to install.",
      "Work calls often have to stay on whatever your employer or the other side uses.",
    ],
    guides: [],
    stacks: ["secure-messaging-stack"],
  },
  {
    category: "social-networks",
    label: "social networks",
    products: ["facebook", "instagram", "twitter", "x", "tiktok", "reddit", "threads"],
    slugs: ["mastodon", "diaspora", "minds", "discourse", "brax-me"],
    whatChanges: [
      "Your followers don't come with you; you build your audience again on the new network.",
      "Networks like Mastodon are split across many servers: you pick one and can still follow people on the others.",
    ],
    guides: [],
    stacks: [],
  },
  {
    category: "video-platforms",
    label: "video platforms",
    products: ["youtube"],
    slugs: ["peertube", "freetube", "newpipe", "invidious"],
    whatChanges: [
      "FreeTube, NewPipe and Invidious play the same YouTube videos without a Google account; PeerTube is a separate network with its own, smaller catalogue.",
      "Apps that play YouTube videos can stop working for a while when YouTube changes its site.",
    ],
    guides: [],
    stacks: [],
  },
  {
    category: "mobile-os",
    label: "mobile operating systems",
    products: ["android", "stock android", "ios", "iphone"],
    slugs: ["grapheneos", "calyxos", "lineageos", "e-os", "ubuntutouch", "pureos"],
    whatChanges: [
      "Each of these runs only on certain phone models, and installing one erases the phone, so back up first.",
      "Some banking and payment apps refuse to run, and Google Wallet tap-to-pay doesn't work.",
      "Leaving an iPhone means getting a supported phone and moving your data across.",
    ],
    guides: ["what-still-works-after-switching-to-grapheneos"],
    stacks: ["degoogle-android-phone"],
  },
  {
    category: "desktop-os",
    label: "desktop operating systems",
    products: ["windows", "microsoft windows", "macos", "mac os"],
    slugs: ["linux-mint", "fedora", "ubuntu", "qubes-os", "tails", "whonix"],
    whatChanges: [
      "Installing a new operating system usually erases the drive, so back up first; Tails instead runs from a USB stick and leaves the computer's own system alone.",
      "Some Windows and Mac programs, including many games and professional apps, don't run on these systems.",
    ],
    guides: [],
    stacks: ["windows-privacy-hardening"],
  },
  {
    category: "auth-2fa",
    label: "2FA apps",
    products: ["google authenticator", "authy", "microsoft authenticator"],
    slugs: ["ente-auth", "aegis-authenticator", "2fas"],
    whatChanges: [
      "Move every account before deleting the old app: export the codes if it allows that, or set up 2FA again account by account.",
      "Keep each site's backup codes somewhere safe; they get you back in if you lose your phone.",
    ],
    guides: [],
    stacks: ["privacy-starter-kit"],
  },
  {
    category: "private-ai",
    label: "private AI",
    products: ["chatgpt", "gemini", "google gemini", "copilot", "microsoft copilot"],
    slugs: ["jan-ai", "gpt4all", "privatellm", "venice"],
    whatChanges: [
      "Apps that run the model on your own computer keep prompts on it, but need a capable machine and run smaller models than the big hosted ones.",
      "A hosted service still receives your prompts, so check what it keeps.",
      "Your chat history stays with the old service.",
    ],
    guides: ["how-to-use-ai-chatbots-privately"],
    stacks: [],
  },
  {
    category: "rss-news-readers",
    label: "news readers",
    products: ["google news", "feedly", "apple news"],
    slugs: ["netnewswire", "feeder", "feedbro"],
    whatChanges: [
      "Most feed readers import and export subscriptions as an OPML file.",
      "A feed reader shows only the sites you follow that publish a feed; nothing picks stories for you.",
    ],
    guides: [],
    stacks: [],
  },
]

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim()

const BY_PRODUCT = new Map(REPLACEMENTS.flatMap((r) => r.products.map((p) => [norm(p), r] as const)))

/** The hand-picked replacements for a mainstream product, or null. Exact name match only. */
export function replacementCategory(product: string): Omit<Replacement, "products"> | null {
  const r = BY_PRODUCT.get(norm(product))
  if (!r) return null
  const { category, label, slugs, whatChanges, guides, stacks } = r
  return { category, label, slugs, whatChanges, guides, stacks }
}

/** Every mapping, for tests. */
export const REPLACEMENT_LISTS = REPLACEMENTS
