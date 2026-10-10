import { getStackBySlug } from "@/lib/stacks"
import { guideOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card"

export const alt = "Default Privacy privacy stack"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const stack = await getStackBySlug(slug)

  if (!stack) {
    return guideOgImage("Privacy Stack", "Default Privacy — curated privacy tool stacks.")
  }

  return guideOgImage(stack.title, stack.description, stack.category)
}
