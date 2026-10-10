import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  ExternalLink,
  KeyRound,
  Mail,
  ShieldAlert,
  UserX,
} from "lucide-react"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { ToolPageSchema } from "@/components/common/tool-page-schema"
import { Button } from "@/components/ui/button"
import { RelatedLinks } from "@/components/common/related-links"
import { BREACH_RECOVERY } from "@/lib/cross-sell"

export const metadata: Metadata = {
  title: "Account Breach Check | Default Privacy",
  description:
    "Find out if your personal email was in a data breach. We don't see your email — check privately on Have I Been Pwned, then follow our recovery steps on Default Privacy.",
  alternates: {
    canonical: "https://defaultprivacy.com/breach-check",
  },
}

const HIBP_URL = "https://haveibeenpwned.com/"

export default function BreachCheckPage() {
  return (
    <>
      <Header />
      <ToolPageSchema
        name="Account Breach Check"
        description="Guide for checking whether a personal email address appeared in known data breaches, with recovery steps and links to password and removal tools."
        url="https://defaultprivacy.com/breach-check"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Free Tools", url: "https://defaultprivacy.com/tools" },
          { name: "Account Breach Check", url: "https://defaultprivacy.com/breach-check" },
        ]}
      />
      <main className="container py-12 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-cinematic text-foreground/90 mb-3">
            Have I Been Breached?
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Check whether your personal email appeared in known data breaches — then follow the recovery
            steps below.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 rounded-full bg-success/10 border border-success/20 px-4 py-1.5 text-sm text-success">
            <div className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Your email is checked on Have I Been Pwned — not on our servers
          </div>
        </div>

        <div className="space-y-4">
          <section className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background">
                <Mail className="h-5 w-5 text-foreground/55" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/45 mb-1">
                  Step 1
                </p>
                <h2 className="text-lg font-medium text-foreground/90">Check your personal email</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open Have I Been Pwned and enter the inbox you use for banking, email, and important
                  accounts. This checks your address — not just the service provider.
                </p>
              </div>
            </div>
            <Button asChild className="w-full brand2-btn-primary brand2-focus group sm:w-auto">
              <a href={HIBP_URL} target="_blank" rel="noopener noreferrer">
                Check my email on Have I Been Pwned
                <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </Button>
          </section>

          <section className="rounded-xl border border-foreground/10 p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background">
                <KeyRound className="h-5 w-5 text-foreground/55" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/45 mb-1">
                  Step 2
                </p>
                <h2 className="text-lg font-medium text-foreground/90">Check password reuse</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  If an account was breached, assume passwords from that site are public. Test whether
                  you reused them — analysis runs in your browser with k-anonymity.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full brand2-focus group sm:w-auto">
              <Link href="/password-check">
                Open password strength & breach check
                <ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden />
              </Link>
            </Button>
          </section>

          <section className="rounded-xl border border-foreground/10 p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background">
                <ShieldAlert className="h-5 w-5 text-foreground/55" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/45 mb-1">
                  Step 3
                </p>
                <h2 className="text-lg font-medium text-foreground/90">Lock down high-value accounts</h2>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>Enable two-factor authentication on email, banking, and crypto accounts</li>
                  <li>Use a unique password for every site — not a variation of an old one</li>
                  <li>Review recovery email and phone numbers on critical accounts</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-foreground/10 p-5">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background">
                <UserX className="h-5 w-5 text-foreground/55" aria-hidden />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-foreground/45 mb-1">
                  Step 4
                </p>
                <h2 className="text-lg font-medium text-foreground/90">Reduce re-exposure</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Breach data often resurfaces on people-search and data broker sites. Removal is a
                  separate layer from breach detection — but it matters if your name and address are
                  showing up again.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8">
          <RelatedLinks
            title="Recover and reduce your exposure"
            description="Rotate passwords, monitor your identity, and scrub your data from broker sites."
            targets={BREACH_RECOVERY}
          />
        </div>

        <div className="mt-10 rounded-lg border border-foreground/10 p-4 space-y-3 text-sm text-muted-foreground">
          <h3 className="font-medium text-foreground">Personal email vs business domain</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-foreground/10 bg-background/50 p-3">
              <p className="font-medium text-foreground/85 text-xs mb-1">Personal email</p>
              <p className="text-xs leading-relaxed">
                you@gmail.com, you@icloud.com — use Step 1 above (Have I Been Pwned).
              </p>
            </div>
            <div className="rounded-md border border-foreground/10 bg-background/50 p-3">
              <p className="font-medium text-foreground/85 text-xs mb-1">Business domain</p>
              <p className="text-xs leading-relaxed">
                yourcompany.com — check your domain&apos;s email security (SPF/DKIM/DMARC) and WHOIS exposure.
              </p>
              <Link
                href="/email-security"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-foreground/75 brand2-focus hover:text-foreground"
              >
                Check email security
                <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-foreground/10 p-4 space-y-2 text-sm text-muted-foreground">
          <h3 className="font-medium text-foreground">How this works</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>
              Default Privacy does not operate a paid Have I Been Pwned API integration — we link you to
              their free browser check instead
            </li>
            <li>We never ask for your email on this page and do not store breach check results</li>
            <li>
              Password checking on{" "}
              <Link href="/password-check" className="brand2-focus underline underline-offset-2">
                /password-check
              </Link>{" "}
              uses HIBP&apos;s Pwned Passwords k-anonymity API in your browser
            </li>
          </ul>
        </div>

      </main>
      <Footer />
    </>
  )
}
