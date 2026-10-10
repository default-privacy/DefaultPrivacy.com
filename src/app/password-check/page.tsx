import type { Metadata } from "next"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { ToolPageSchema } from "@/components/common/tool-page-schema"
import { PasswordChecker } from "@/components/password-check/password-checker"
import { RelatedLinks } from "@/components/common/related-links"
import { PASSWORD_BREACHED } from "@/lib/cross-sell"

export const metadata: Metadata = {
  title: "Password Strength Analyzer | Default Privacy",
  description: "Check how strong your password is with crack time estimates, pattern detection, and breach checking. Your password never leaves your browser.",
  alternates: {
    canonical: "https://defaultprivacy.com/password-check",
  },
}

export default function PasswordCheckPage() {
  return (
    <>
      <Header />
      <ToolPageSchema
        name="Password Strength Analyzer"
        description="Check password strength with crack time estimates, pattern detection, and breach checking without sending the password to the server."
        url="https://defaultprivacy.com/password-check"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Free Tools", url: "https://defaultprivacy.com/tools" },
          { name: "Password Strength Analyzer", url: "https://defaultprivacy.com/password-check" },
        ]}
      />
      <main className="container py-12 max-w-2xl mx-auto" style={{ touchAction: "manipulation" }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-cinematic text-foreground/90 mb-3">
            Password Strength Analyzer
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            See how long it would take to crack your password. Get specific feedback on patterns, weaknesses, and improvements.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 rounded-full bg-success/10 border border-success/20 px-4 py-1.5 text-sm text-success">
            <div className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Your password never leaves your browser
          </div>
        </div>

        <PasswordChecker />

        <div className="mt-8">
          <RelatedLinks
            title="Never reuse a breached password"
            description="A password manager makes every login unique; 2FA blocks the ones that leak."
            targets={PASSWORD_BREACHED}
          />
        </div>

        <div className="mt-12 space-y-6 text-sm text-muted-foreground">
          <div className="rounded-lg border border-foreground/10 p-4 space-y-2">
            <h3 className="font-medium text-foreground">How this works</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                Analysis runs entirely in your browser using the{" "}
                <a
                  href="https://github.com/dropbox/zxcvbn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand2-focus text-foreground/80 hover:text-foreground underline underline-offset-2"
                >
                  zxcvbn
                </a>{" "}
                library by Dropbox
              </li>
              <li>Your password is never sent to any server — check the network tab in DevTools to verify</li>
              <li>
                Breach checking uses the{" "}
                <a
                  href="https://haveibeenpwned.com/API/v3#PwnedPasswords"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand2-focus text-foreground/80 hover:text-foreground underline underline-offset-2"
                >
                  Have I Been Pwned
                </a>{" "}
                k-anonymity API — only the first 5 characters of the SHA-1 hash are sent, never the full password
              </li>
              <li>Crack time estimates assume a determined attacker with modern hardware</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
