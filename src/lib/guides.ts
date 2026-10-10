/**
 * Guides Content Loader
 *
 * Loads and parses guide markdown files from /src/content/guides/
 */

import { readdir, readFile } from "fs/promises"
import { join } from "path"
import { parse as parseYaml } from "yaml"

const GUIDES_DIR = join(process.cwd(), "src/content/guides")

export type Guide = {
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
  relatedGuides?: string[]
  relatedTools?: Array<{ name: string; href: string }>
}

type GuideFrontmatter = Omit<Guide, "content">

function parseMarkdownWithFrontmatter(raw: string): {
  frontmatter: GuideFrontmatter
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

  const frontmatter = parseYaml(frontmatterContent) as GuideFrontmatter

  return { frontmatter, body }
}

export async function getAllGuides(): Promise<Guide[]> {
  try {
    const files = await readdir(GUIDES_DIR)
    const mdFiles = files.filter((f) => f.endsWith(".md"))

    const guides: Guide[] = []

    for (const file of mdFiles) {
      const raw = await readFile(join(GUIDES_DIR, file), "utf-8")
      const { frontmatter, body } = parseMarkdownWithFrontmatter(raw)
      guides.push({ ...frontmatter, content: body })
    }

    return guides.sort((a, b) => {
      const aDate = new Date(a.updatedAt ?? a.publishedAt).getTime()
      const bDate = new Date(b.updatedAt ?? b.publishedAt).getTime()
      return bDate - aDate
    })
  } catch {
    return []
  }
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  try {
    const raw = await readFile(join(GUIDES_DIR, `${slug}.md`), "utf-8")
    const { frontmatter, body } = parseMarkdownWithFrontmatter(raw)
    return { ...frontmatter, content: body }
  } catch {
    return null
  }
}

export async function getGuidesByCategory(category: string): Promise<Guide[]> {
  const guides = await getAllGuides()
  return guides.filter((g) => g.category === category)
}

export async function getGuideCategories(): Promise<string[]> {
  const guides = await getAllGuides()
  const categories = new Set(guides.map((g) => g.category))
  return Array.from(categories).sort()
}
