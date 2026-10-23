import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { ToolPageSchema } from "@/components/common/tool-page-schema"
import { WhoisChecker } from "@/components/whois-check/whois-checker"
import { RelatedLinks } from "@/components/common/related-links"
import { WHOIS_EXPOSED } from "@/lib/cross-sell"

export const metadata: Metadata = {
  title: "WHOIS Privacy Checker — Is Your Domain Exposing You? | Default Privacy",
  description:
    "Check whether a domain's public WHOIS record exposes your name, address, email, or phone — or whether privacy protection is in place. No login, nothing stored.",
  alternates: {
    canonical: "https://defaultprivacy.com/whois",
  },
  openGraph: {
    title: "WHOIS Privacy Checker — Is Your Domain Exposing You?",
    description: "Check whether a domain's public WHOIS record exposes your name, address, email, or phone — or whether privacy protection is in place. No login, nothing stored.",
  },
}

export default function WhoisPage() {
  return (
    <>
      <Header />
      <ToolPageSchema
        name="WHOIS Privacy Checker"
        description="Check whether a domain's public WHOIS record exposes personal registrant details or has privacy protection enabled."
        url="https://defaultprivacy.com/whois"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Free Tools", url: "https://defaultprivacy.com/tools" },
          { name: "WHOIS Privacy Checker", url: "https://defaultprivacy.com/whois" },
        ]}
      />
      <main className="container py-12 max-w-2xl mx-auto" style={{ touchAction: "manipulation" }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-cinematic text-foreground/90 mb-3">
            WHOIS Privacy Checker
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Is your domain leaking your name and home address? Enter a domain to see exactly what its
            public WHOIS record exposes — and whether privacy protection is on.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 rounded-full bg-success/10 border border-success/20 px-4 py-1.5 text-sm text-success">
            <div className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Public lookup only — no login, nothing stored
          </div>
        </div>

        <Suspense>
          <WhoisChecker />
        </Suspense>

        <div className="mt-8">
          <RelatedLinks
            title="Lock down an exposed domain"
            description="Hide your registrant details and keep your home address off the record."
            targets={WHOIS_EXPOSED}
          />
        </div>

        <div className="mt-12 space-y-6 text-sm text-muted-foreground">
          <div className="rounded-lg border border-foreground/10 p-4 space-y-2">
            <h3 className="font-medium text-foreground">How this works</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>We run a live WHOIS/RDAP lookup on the domain you enter</li>
              <li>Each registrant field is checked for exposed personal data vs. privacy protection</li>
              <li>You see what&apos;s public and concrete steps to lock it down</li>
              <li>The lookup is the same public query anyone can run — the domain isn&apos;t stored</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
