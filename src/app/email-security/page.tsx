import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { ToolPageSchema } from "@/components/common/tool-page-schema"
import { EmailSecurityChecker } from "@/components/email-security/email-security-checker"
import { RelatedLinks } from "@/components/common/related-links"
import { EMAIL_FAIL } from "@/lib/cross-sell"

export const metadata: Metadata = {
  title: "Email Security Checker — SPF, DKIM & DMARC | Default Privacy",
  description:
    "Check whether a domain is protected against email spoofing. We read its public SPF, DKIM, and DMARC records and grade them A–F. No login, nothing stored.",
  alternates: {
    canonical: "https://defaultprivacy.com/email-security",
  },
}

export default function EmailSecurityPage() {
  return (
    <>
      <Header />
      <ToolPageSchema
        name="Email Security Checker"
        description="Check a domain's SPF, DKIM, and DMARC records and grade its protection against email spoofing."
        url="https://defaultprivacy.com/email-security"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Free Tools", url: "https://defaultprivacy.com/tools" },
          { name: "Email Security Checker", url: "https://defaultprivacy.com/email-security" },
        ]}
      />
      <main className="container py-12 max-w-2xl mx-auto" style={{ touchAction: "manipulation" }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-cinematic text-foreground mb-3">
            Email Security Checker
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            See whether a domain can be spoofed by phishers. Enter a domain and we&apos;ll grade its
            SPF, DKIM, and DMARC setup A–F with plain-English fixes.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 rounded-full bg-success/10 border border-success/20 px-4 py-1.5 text-sm text-success">
            <div className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Public DNS lookup only — no login, nothing stored
          </div>
        </div>

        <Suspense>
          <EmailSecurityChecker />
        </Suspense>

        <div className="mt-8">
          <RelatedLinks
            title="Harden your email against spoofing"
            description="Tighten SPF/DKIM/DMARC and move to encrypted email with aliases."
            targets={EMAIL_FAIL}
          />
        </div>

        <div className="mt-12 space-y-6 text-sm text-muted-foreground">
          <div className="rounded-lg border border-foreground/10 p-4 space-y-2">
            <h3 className="font-medium text-foreground">How this works</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>We query the domain&apos;s public DNS for its SPF, DKIM, and DMARC records</li>
              <li>Each record is parsed and scored, then combined into an overall A–F grade</li>
              <li>You get specific, plain-English guidance on what to add or tighten</li>
              <li>The check never touches your mailbox and the domain isn&apos;t stored</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
