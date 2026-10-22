/**
 * Paper theme guard.
 *
 * The site is light only: warm paper under ink. Text takes one of three solid
 * roles (text-foreground, text-foreground-soft, text-muted-foreground). Opacity
 * text classes were tuned for the old dark canvas and fail WCAG AA on paper, so
 * this test fails the build if one creeps back, and it checks the token values
 * themselves against the 4.5:1 floor.
 */
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { describe, expect, it } from "vitest"

const ROOT = process.cwd()
const SRC = join(ROOT, "src")

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(tsx|ts|css)$/.test(name) && !/\.test\.tsx?$/.test(name)) out.push(p)
  }
  return out
}

const BANNED: Array<{ re: RegExp; why: string }> = [
  { re: /\btext-foreground\/\d/, why: "opacity ink fails contrast on paper; use text-foreground, text-foreground-soft or text-muted-foreground" },
  { re: /\btext-primary\/\d/, why: "opacity primary fails contrast on paper; use text-primary or text-link" },
  { re: /\btext-muted-foreground\/\d/, why: "muted is already the faintest text role" },
  { re: /\bdark:prose-invert\b/, why: "the site is light only" },
]

describe("paper theme: no opacity text classes", () => {
  it("source tree has none", () => {
    const hits: string[] = []
    for (const file of walk(SRC)) {
      const text = readFileSync(file, "utf8")
      for (const { re, why } of BANNED) {
        const m = text.match(re)
        if (m) hits.push(`${relative(ROOT, file)}: ${m[0]} (${why})`)
      }
    }
    expect(hits).toEqual([])
  })
})

// WCAG 2.x relative luminance and contrast ratio
function luminance(hex: string): number {
  const ch = (c: number) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  const n = parseInt(hex.slice(1), 16)
  return 0.2126 * ch((n >> 16) & 255) + 0.7152 * ch((n >> 8) & 255) + 0.0722 * ch(n & 255)
}
export function contrast(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

function rootTokens(): Record<string, string> {
  const css = readFileSync(join(SRC, "app/globals.css"), "utf8")
  const root = css.slice(css.indexOf(":root {"))
  const out: Record<string, string> = {}
  for (const m of root.matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) out[m[1]] = m[2].toLowerCase()
  return out
}

describe("paper theme: token contrast", () => {
  const t = rootTokens()
  const pairs: Array<[string, string]> = [
    ["foreground", "background"],
    ["foreground-soft", "background"],
    ["muted-foreground", "background"],
    ["link", "background"],
    ["primary-foreground", "primary"],
    ["foreground", "muted"],
    ["muted-foreground", "muted"],
  ]
  for (const [fg, bg] of pairs) {
    it(`${fg} on ${bg} is at least 4.5:1`, () => {
      expect(t[fg], `--${fg} must be a hex token in :root`).toMatch(/^#/)
      expect(t[bg], `--${bg} must be a hex token in :root`).toMatch(/^#/)
      expect(contrast(t[fg], t[bg])).toBeGreaterThanOrEqual(4.5)
    })
  }
})
