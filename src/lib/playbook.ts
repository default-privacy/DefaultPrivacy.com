/**
 * Playbook Content Loader
 *
 * Loads and parses playbook chapter markdown files from /src/content/playbook/
 */

import { readdir, readFile } from "fs/promises"
import { join } from "path"
import { parse as parseYaml } from "yaml"

const PLAYBOOK_DIR = join(process.cwd(), "src/content/playbook")

export type PlaybookFaq = {
  question: string
  answer: string
}

export type PlaybookChapter = {
  title: string
  slug: string
  chapterNumber: number
  description: string
  excerpt: string
  publishedAt: string
  updatedAt?: string
  author: string
  readingTime: string
  tags: string[]
  content: string
  faqs: PlaybookFaq[]
  relatedChapters?: string[]
  relatedGuides?: string[]
  nextStep?: {
    label: string
    href: string
    description: string
  }
}

type ChapterFrontmatter = Omit<PlaybookChapter, "content">

function parseMarkdownWithFrontmatter(raw: string): {
  frontmatter: ChapterFrontmatter
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

  const frontmatter = parseYaml(frontmatterContent) as ChapterFrontmatter

  return { frontmatter, body }
}

export async function getAllChapters(): Promise<PlaybookChapter[]> {
  try {
    const files = await readdir(PLAYBOOK_DIR)
    const mdFiles = files.filter((f) => f.endsWith(".md"))

    const chapters: PlaybookChapter[] = []

    for (const file of mdFiles) {
      const raw = await readFile(join(PLAYBOOK_DIR, file), "utf-8")
      const { frontmatter, body } = parseMarkdownWithFrontmatter(raw)
      chapters.push({ ...frontmatter, content: body })
    }

    return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber)
  } catch {
    return []
  }
}

export async function getChapterBySlug(
  slug: string
): Promise<PlaybookChapter | null> {
  try {
    const raw = await readFile(join(PLAYBOOK_DIR, `${slug}.md`), "utf-8")
    const { frontmatter, body } = parseMarkdownWithFrontmatter(raw)
    return { ...frontmatter, content: body }
  } catch {
    return null
  }
}

export async function getAdjacentChapters(currentNumber: number): Promise<{
  prev: PlaybookChapter | null
  next: PlaybookChapter | null
}> {
  const chapters = await getAllChapters()
  const currentIndex = chapters.findIndex(
    (c) => c.chapterNumber === currentNumber
  )

  return {
    prev: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    next:
      currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null,
  }
}

export async function getRelatedChapters(
  slugs: string[]
): Promise<PlaybookChapter[]> {
  const chapters = await getAllChapters()
  return chapters.filter((c) => slugs.includes(c.slug))
}
