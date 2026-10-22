import { ConnectAiCard } from "@/components/ai/connect-ai-card"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { PageViewTracker } from "@/components/common/page-view-tracker"
import { PartnerRevenueDisclosure } from "@/components/common/partner-revenue-disclosure"
import {
  DirectoryBrowser,
  type DirectorySearchParams,
} from "@/components/directory/directory-browser"
import { getPublicDirectoryStats } from "@/lib/directory-stats"
import type { Metadata } from "next"
import Link from "next/link"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const { toolsLabel } = await getPublicDirectoryStats()
  return {
    title: "Privacy Tools Directory | Default Privacy",
    description: `Browse ${toolsLabel} privacy tools, each with its privacy attributes and the vendor's own links. Filter by category, open source, encryption, jurisdiction, and more.`,
    alternates: {
      canonical: "https://defaultprivacy.com/directory",
    },
  }
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<DirectorySearchParams>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <PageViewTracker event={{ name: "directory_view", surface: "directory" }} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Page Header - clean like Vercel Templates */}
        <div className="container pb-6 pt-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium tracking-tight text-foreground md:text-[28px]">Privacy Tools Directory</h1>
          </div>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Browse our curated collection of privacy-focused tools and services.
          </p>
          <PartnerRevenueDisclosure variant="directory-note" className="mt-3 max-w-2xl" />
        </div>

        {/* Content Area */}
        <div className="container pb-12">
          <DirectoryBrowser searchParams={params} basePath="/directory" />
          <ConnectAiCard size="slim" className="mt-10" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
