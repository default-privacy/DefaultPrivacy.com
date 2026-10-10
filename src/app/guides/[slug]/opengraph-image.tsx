import { getGuideBySlug } from "@/lib/guides"
import { guideOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card"

export const alt = "Default Privacy privacy guide"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)

  if (!guide) {
    return guideOgImage("Privacy Guide", "Default Privacy — business privacy guides and tools.")
  }

  return guideOgImage(guide.title, guide.description, guide.category)
}
