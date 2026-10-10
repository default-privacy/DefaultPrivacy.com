/**
 * Privacy Stacks Content Loader
 *
 * Loads and parses threat-model stack markdown files from /src/content/stacks/.
 * Mirrors src/lib/guides.ts — stacks are guide-shaped, curated tool bundles.
 */

import { readdir, readFile } from "fs/promises"
import { join } from "path"
import { parse as parseYaml } from "yaml"

const STACKS_DIR = join(process.cwd(), "src/content/stacks")

export type Stack = {
  title: string
  slug: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  timeToComplete: string
  publishedAt: string
  updatedAt?: string
  author: string
  tags: string[]
  content: string
  relatedStacks?: string[]
  relatedTools?: Array<{ name: string; href: string }>
}

type StackFrontmatter = Omit<Stack, "content">

function parseMarkdownWithFrontmatter(raw: string): {
  frontmatter: StackFrontmatter
  body: string
} {
  const lines = raw.split("\n")

  if (lines[0] !== "---") {
    throw new Error("No frontmatter found")
  }

  let endIndex = -1
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      endIndex = i
      break
    }
  }

  if (endIndex === -1) {
    throw new Error("No closing frontmatter delimiter found")
  }

  const frontmatterContent = lines.slice(1, endIndex).join("\n")
  const body = lines.slice(endIndex + 1).join("\n").trim()

  const frontmatter = parseYaml(frontmatterContent) as StackFrontmatter

  return { frontmatter, body }
}

export async function getAllStacks(): Promise<Stack[]> {
  try {
    const files = await readdir(STACKS_DIR)
    const mdFiles = files.filter((f) => f.endsWith(".md"))

    const stacks: Stack[] = []

    for (const file of mdFiles) {
      const raw = await readFile(join(STACKS_DIR, file), "utf-8")
      const { frontmatter, body } = parseMarkdownWithFrontmatter(raw)
      stacks.push({ ...frontmatter, content: body })
    }

    return stacks.sort((a, b) => {
      const aDate = new Date(a.updatedAt ?? a.publishedAt).getTime()
      const bDate = new Date(b.updatedAt ?? b.publishedAt).getTime()
      return bDate - aDate
    })
  } catch {
    return []
  }
}

export async function getStackBySlug(slug: string): Promise<Stack | null> {
  try {
    const raw = await readFile(join(STACKS_DIR, `${slug}.md`), "utf-8")
    const { frontmatter, body } = parseMarkdownWithFrontmatter(raw)
    return { ...frontmatter, content: body }
  } catch {
    return null
  }
}

/**
 * Strip authored `<script type="application/ld+json">` blocks from a stack body.
 * The detail route emits uniform route-level JSON-LD (TechArticle + FAQPage), so
 * the inline blocks would only duplicate it. The visible prose/FAQ is untouched.
 */
export function stripEmbeddedJsonLd(content: string): string {
  return content.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, "")
}

/**
 * Parse the visible "## Frequently asked questions" section into FAQ items for
 * FAQPage JSON-LD. Stacks use `### Question?` + answer paragraph (unlike guides,
 * which use `## FAQ` + `**bold**` — so guide-faq.ts can't be reused here).
 */
export function parseStackFaqs(content: string): Array<{ question: string; answer: string }> {
  const headingMatch = content.match(/^## Frequently asked questions\s*$/im)
  if (!headingMatch || headingMatch.index === undefined) return []

  const afterHeading = content.slice(headingMatch.index + headingMatch[0].length)
  const endIdx = afterHeading.search(/\n## |\n---\s*\n/)
  const block = (endIdx === -1 ? afterHeading : afterHeading.slice(0, endIdx)).trim()
  if (!block) return []

  const items: Array<{ question: string; answer: string }> = []
  const chunks = block.split(/\n+(?=###\s)/)

  for (const chunk of chunks) {
    const m = chunk.match(/^###\s+(.+?)\s*\n+([\s\S]*)$/)
    if (!m) continue
    const question = m[1].trim()
    const answer = m[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*/g, "")
      .replace(/\n+/g, " ")
      .trim()
    if (question && answer) items.push({ question, answer })
  }

  return items
}
