/**
 * HowTo Schema JSON-LD Component
 *
 * Injects HowTo structured data for search engines and AI systems.
 * Use for step-by-step guides and processes.
 */

type HowToStep = {
  name: string
  text: string
  url?: string
  image?: string
}

type HowToSchemaProps = {
  name: string
  description: string
  totalTime?: string
  estimatedCost?: { currency: string; value: string }
  steps: HowToStep[]
  image?: string
  url?: string
}

export function HowToSchema({
  name,
  description,
  totalTime,
  estimatedCost,
  steps,
  image,
  url,
}: HowToSchemaProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && { image: step.image }),
    })),
  }

  if (totalTime) jsonLd.totalTime = totalTime
  if (estimatedCost) {
    jsonLd.estimatedCost = {
      "@type": "MonetaryAmount",
      currency: estimatedCost.currency,
      value: estimatedCost.value,
    }
  }
  if (image) jsonLd.image = image
  if (url) jsonLd.url = url

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
