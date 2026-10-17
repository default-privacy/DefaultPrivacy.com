import { readFile } from "node:fs/promises"
import path from "node:path"
import type { Metadata } from "next"
import { marked } from "marked"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { countUsage } from "@/lib/analytics/usage"
import { reviewChannel } from "@/lib/review-channel"

// Rendered per request so the channel tag on the link can be counted.
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "We reviewed our own MCP server | Default Privacy",
  description:
    "Default Privacy ran its ten-check privacy review on its own MCP server. It failed, then failed again, then passed. The checks, the evidence and a prompt to run the review yourself.",
}

export default async function ReviewPage({ searchParams }: { searchParams: Promise<{ from?: string | string[] }> }) {
  countUsage("review_from", reviewChannel((await searchParams).from))
  const md = await readFile(path.join(process.cwd(), "src/content/reviews/default-privacy.md"), "utf8")
  const html = await marked(md)
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-24 pt-14">
        <div
          className="prose dark:prose-invert max-w-none
            prose-a:text-foreground/85 prose-a:no-underline hover:prose-a:underline
            prose-code:before:content-none prose-code:after:content-none
            prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
            prose-pre:bg-muted prose-pre:border prose-pre:border-foreground/10 prose-pre:rounded-xl
            prose-table:text-sm prose-th:text-left prose-th:font-medium prose-td:py-2 prose-th:py-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
      <Footer />
    </div>
  )
}
