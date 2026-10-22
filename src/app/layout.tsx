import type { Metadata } from "next"
import localFont from "next/font/local"
import { Geist_Mono } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { SiteShell } from "@/components/providers/site-shell"
import { SkipLink } from "@/components/common/skip-link"
import { ExposureRibbon } from "@/components/exposure/exposure-ribbon"
import { WebMcpBridge } from "@/components/common/webmcp-bridge"
import { env } from "@/lib/env"
import { getCanonicalSiteUrl, getOgImageUrl } from "@/lib/site-url"
import { getPublicDirectoryStats } from "@/lib/directory-stats"
import "./globals.css"

const canonicalSiteUrl = getCanonicalSiteUrl()
const ogImageUrl = getOgImageUrl()

// Plus Jakarta Sans - self-hosted from @fontsource-variable
const plusJakarta = localFont({
  src: "../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
})

// Source Serif 4 - self-hosted from @fontsource-variable; reading-page body text only
const sourceSerif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-source-serif",
  display: "swap",
})

// Keep Geist Mono for code blocks
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(canonicalSiteUrl),
  title: "Default Privacy — Vetted Privacy Tools Directory",
  description:
    "An independent, vetted directory of privacy tools — plus free tools to check your exposure and guides to take back your privacy. No paid placements, nothing tracked.",
  keywords: [
    "privacy",
    "privacy tools",
    "privacy tools directory",
    "vetted privacy tools",
    "open source privacy",
    "VPN",
    "encrypted email",
    "password manager",
    "digital privacy",
    "free privacy tools",
  ],
  icons: {
    icon: "/logo-icon.svg",
    apple: "/logo-icon.svg",
  },
  openGraph: {
    title: "Default Privacy — Vetted Privacy Tools Directory",
    description:
      "An independent, vetted directory of privacy tools, plus free tools and guides. No paid placements.",
    type: "website",
    url: canonicalSiteUrl,
    siteName: "Default Privacy",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Default Privacy — Vetted Privacy Tools Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Default Privacy — Vetted Privacy Tools Directory",
    description:
      "An independent, vetted directory of privacy tools, plus free tools and guides. No paid placements.",
    images: [ogImageUrl],
  },
}

function buildSiteJsonLd(toolsLabel: string) {
  return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://defaultprivacy.com/#organization",
      name: "Default Privacy",
      url: "https://defaultprivacy.com",
      logo: "https://defaultprivacy.com/logo-blueprint.svg",
      description:
        `Default Privacy is an independent privacy-tools directory. It vets ${toolsLabel} privacy tools with no paid placements, and offers free tools to check your own exposure, a privacy glossary, and practical privacy guides.`,
      foundingDate: "2024",
      sameAs: [],
      knowsAbout: [
        "Digital Privacy",
        "Privacy Tools",
        "Open Source Software",
        "Online Security",
        "Identity Protection",
        "Surveillance Countermeasures",
        "Self-Hosting",
        "End-to-End Encryption",
        "Encrypted Email",
        "VPN",
        "Password Managers",
        "Threat Modeling",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://defaultprivacy.com/#website",
      url: "https://defaultprivacy.com",
      name: "Default Privacy",
      publisher: { "@id": "https://defaultprivacy.com/#organization" },
      description:
        `Privacy infrastructure for everyone. Seven free tools to check your exposure, ${toolsLabel} privacy tools, a privacy glossary, and practical privacy guides.`,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://defaultprivacy.com/directory?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { toolsLabel } = await getPublicDirectoryStats()
  const jsonLd = buildSiteJsonLd(toolsLabel)

  return (
    <html lang="en">
      <head>
        {env.NEXT_PUBLIC_WEBMCP_OT_TOKEN && (
          <meta httpEquiv="origin-trial" content={env.NEXT_PUBLIC_WEBMCP_OT_TOKEN} />
        )}
        <link rel="llms-txt" href="/llms.txt" />
        <link rel="llms-full-txt" href="/llms-full.txt" />
        <link rel="alternate" type="application/json" href="/api/openapi.json" title="OpenAPI Specification" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${sourceSerif.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <SkipLink />
        <WebMcpBridge />
        <ExposureRibbon />
        <NuqsAdapter>
          <SiteShell>{children}</SiteShell>
        </NuqsAdapter>
      </body>
    </html>
  )
}
