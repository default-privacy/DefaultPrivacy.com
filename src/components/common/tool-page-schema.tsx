type ToolPageSchemaProps = {
  name: string
  description: string
  url: string
  applicationCategory?: string
  operatingSystem?: string | string[]
}

export const ToolPageSchema = ({
  name,
  description,
  url,
  applicationCategory = "SecurityApplication",
  operatingSystem = "Web Browser",
}: ToolPageSchemaProps) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
    isAccessibleForFree: true,
    browserRequirements: "Requires a modern web browser with JavaScript enabled",
    publisher: {
      "@id": "https://defaultprivacy.com/#organization",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
