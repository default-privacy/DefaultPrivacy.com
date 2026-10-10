import { existsSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { REPLACEMENT_LISTS, replacementCategory } from "./consumer-replacements"

describe("replacementCategory", () => {
  it("maps mainstream products to the replacing category", () => {
    expect(replacementCategory("WhatsApp")?.category).toBe("encrypted-messaging")
    expect(replacementCategory("Google Drive")?.category).toBe("encrypted-cloud-storage")
    expect(replacementCategory("facebook")?.category).toBe("social-networks")
  })

  it("matches whole names only", () => {
    expect(replacementCategory("Google Analytics")).toBeNull()
    expect(replacementCategory("chromebook")).toBeNull()
  })
})

describe("replacement lists", () => {
  it("are hand-picked, not the category's ranking", () => {
    expect(replacementCategory("Facebook")?.slugs).toContain("mastodon")
    expect(replacementCategory("Facebook")?.slugs).not.toContain("snscrape")
    expect(replacementCategory("Zoom")?.slugs).not.toContain("nextiva")
    expect(replacementCategory("Chrome")?.slugs).not.toContain("privacytests-org")
    expect(replacementCategory("Windows")?.slugs).toContain("linux-mint")
    expect(replacementCategory("Twitch")).toBeNull()
  })

  it("leave out sold, archived or long-abandoned apps", () => {
    const all = REPLACEMENT_LISTS.flatMap((r) => r.slugs)
    for (const s of ["raivo", "winauth", "tofu", "padloc", "turtl", "aether", "rssowl", "tiny-rss"])
      expect(all).not.toContain(s)
  })

  it("never offer a replaced product as its own replacement", () => {
    const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")
    for (const r of REPLACEMENT_LISTS) {
      expect(r.slugs.length).toBeGreaterThan(0)
      expect(new Set(r.slugs).size).toBe(r.slugs.length)
      for (const p of r.products) expect(r.slugs.map(key)).not.toContain(key(p))
    }
  })
})

describe("what switching involves", () => {
  it("every group says it in 1–3 short, plain sentences", () => {
    for (const r of REPLACEMENT_LISTS) {
      expect(r.whatChanges.length, r.category).toBeGreaterThanOrEqual(1)
      expect(r.whatChanges.length, r.category).toBeLessThanOrEqual(3)
      for (const s of r.whatChanges) {
        expect(s, r.category).toMatch(/^[A-Z].*\.$/)
        expect(s.length, s).toBeLessThanOrEqual(160)
        expect(s, s).not.toMatch(/—/)
      }
    }
  })

  it("links only guides and stacks that exist", () => {
    const content = join(process.cwd(), "src/content")
    for (const r of REPLACEMENT_LISTS) {
      for (const g of r.guides) expect(existsSync(join(content, "guides", `${g}.md`)), `guide ${g}`).toBe(true)
      for (const s of r.stacks) expect(existsSync(join(content, "stacks", `${s}.md`)), `stack ${s}`).toBe(true)
    }
  })
})

// Golden answers: the Techlore test questions that name a product to leave
// (our research notes on former Techlore forum topics, by number).
describe("Techlore questions that name a product to leave", () => {
  const cases: [question: string, product: string, category: string, guide?: string, stack?: string][] = [
    ["5 private email provider to move to from Gmail", "Gmail", "encrypted-email", "proton-mail-vs-tuta", "escape-gmail-encrypted-email-aliases"],
    ["12/13 most private browser (leaving Chrome)", "Chrome", "browsers", undefined, "privacy-starter-kit"],
    ["15 private search engine in place of Google", "Google", "private-search", undefined, "de-google-your-life"],
    ["16 my family is on WhatsApp", "WhatsApp", "encrypted-messaging", "signal-vs-simplex", "secure-messaging-stack"],
    ["17 Discord without my real phone number", "Discord", "encrypted-messaging", "get-a-second-phone-number"],
    ["18 YouTube without being tracked", "YouTube", "video-platforms"],
    ["19 which password manager (leaving LastPass)", "LastPass", "password-managers", "bitwarden-vs-proton-pass", "privacy-starter-kit"],
    ["21 which 2FA app", "Google Authenticator", "auth-2fa", undefined, "privacy-starter-kit"],
    ["22 make my iPhone more private", "iPhone", "mobile-os", "what-still-works-after-switching-to-grapheneos"],
    ["24 iCloud", "iCloud", "encrypted-cloud-storage"],
    ["25/26 de-Googled phone", "Android", "mobile-os", "what-still-works-after-switching-to-grapheneos", "degoogle-android-phone"],
    ["28/29 leave Windows", "Windows", "desktop-os", undefined, "windows-privacy-hardening"],
    ["32 replacement for Google Photos", "Google Photos", "encrypted-cloud-storage"],
    ["33 replace Google Drive or Dropbox", "Dropbox", "encrypted-cloud-storage"],
    ["37 private way to use an AI chatbot", "ChatGPT", "private-ai", "how-to-use-ai-chatbots-privately"],
  ]

  it.each(cases)("%s", (_q, product, category, guide, stack) => {
    const r = replacementCategory(product)
    expect(r?.category).toBe(category)
    expect(r?.slugs.length).toBeGreaterThan(0)
    if (guide) expect(r?.guides).toContain(guide)
    if (stack) expect(r?.stacks).toContain(stack)
  })

  it("16: says the contacts have to move too", () => {
    expect(replacementCategory("WhatsApp")?.whatChanges.join(" ")).toMatch(/contacts have to install/)
  })

  it("5: says the old address keeps receiving mail", () => {
    expect(replacementCategory("Gmail")?.whatChanges.join(" ")).toMatch(/old address keeps receiving mail/)
  })

  it("20: a privacy tool is not a product to leave", () => {
    expect(replacementCategory("Bitwarden")).toBeNull()
    expect(replacementCategory("Proton Pass")).toBeNull()
  })
})
