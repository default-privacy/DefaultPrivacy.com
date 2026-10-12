import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { ToolPageSchema } from "@/components/common/tool-page-schema"
import { PrivacyScoreReport } from "@/components/privacy-score/privacy-score-report"

export const metadata: Metadata = {
  title: "Privacy Score — One Domain, Three Checks | Default Privacy",
  description:
    "Get a single 0–100 privacy score for any domain. We combine email-spoofing (SPF/DKIM/DMARC), website-tracker, and WHOIS-exposure checks into one exposure band. No login, no account.",
  alternates: {
    canonical: "https://defaultprivacy.com/privacy-score",
  },
}

export default function PrivacyScorePage() {
  return (
    <>
      <Header />
      <ToolPageSchema
        name="Privacy Score"
        description="Combine email-security, website-tracker, and WHOIS-privacy checks into one 0–100 privacy exposure score for any domain."
        url="https://defaultprivacy.com/privacy-score"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Free Tools", url: "https://defaultprivacy.com/tools" },
          { name: "Privacy Score", url: "https://defaultprivacy.com/privacy-score" },
        ]}
      />
      <main className="container py-12 max-w-2xl mx-auto" style={{ touchAction: "manipulation" }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-cinematic text-foreground/90 mb-3">
            Privacy Score
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            One domain, three checks. We grade email spoofability, website trackers, and WHOIS
            exposure, then roll them into a single privacy score.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 rounded-full bg-success/10 border border-success/20 px-4 py-1.5 text-sm text-success">
            <div className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Public lookups only — no login, no account
          </div>
        </div>

        <Suspense>
          <PrivacyScoreReport />
        </Suspense>

        <div className="mt-12 space-y-6 text-sm text-muted-foreground">
          <div className="rounded-lg border border-foreground/10 p-4 space-y-2">
            <h3 className="font-medium text-foreground">How this works</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>We run three public checks on the domain: email spoofing, site trackers, and WHOIS exposure</li>
              <li>Each result is scored 0–100, then weighted into one overall privacy score</li>
              <li>The score maps to an exposure band — lower exposure means better protection</li>
              <li>Nothing is stored. If you request your report by email, we save only the band — never the domain</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
