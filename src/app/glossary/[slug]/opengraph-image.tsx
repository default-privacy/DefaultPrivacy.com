import { getGlossaryTermBySlug } from "@/lib/glossary"
import { guideOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-card"

export const alt = "Default Privacy glossary term"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const term = await getGlossaryTermBySlug(slug)

  if (!term) {
    return guideOgImage(
      "Privacy Glossary",
      "Default Privacy — plain-English privacy and security definitions.",
    )
  }

  return guideOgImage(term.term, term.definition, "Glossary")
}
