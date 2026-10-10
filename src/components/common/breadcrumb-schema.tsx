/**
 * Breadcrumb Schema JSON-LD Component
 *
 * Injects BreadcrumbList structured data for search engines and AI systems.
 * Place alongside a page's other JSON-LD to expose the navigational trail
 * (Home › Section › Page). URLs must be absolute.
 */

type BreadcrumbItem = {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
