import { getChapterBySlug } from "@/lib/playbook"
import { guideOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card"

export const alt = "Default Privacy — The Privacy Playbook"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const chapter = await getChapterBySlug(slug)

  if (!chapter) {
    return guideOgImage("The Privacy Playbook", "Default Privacy — privacy as architecture, chapter by chapter.")
  }

  return guideOgImage(chapter.title, chapter.description, `Chapter ${chapter.chapterNumber}`)
}
