import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { ToolPageSchema } from "@/components/common/tool-page-schema"
import { ExampleReadout } from "@/components/scanner/example-readout"
import { QuickScanChips } from "@/components/scanner/quick-scan-chips"
import { ScannerForm } from "@/components/scanner/scanner-form"
import {
  Cookie,
  Eye,
  Fingerprint,
  Globe,
  Lock,
} from "lucide-react"

export const metadata = {
  title: "Privacy Scanner | Default Privacy",
  description:
    "Scan any website to discover trackers, cookies, fingerprinting, and security issues. Free privacy audit tool.",
  alternates: {
    canonical: "https://defaultprivacy.com/scanner",
  },
}

function FeatureCell({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/8 bg-foreground/[0.02]">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="text-[13px] font-medium text-foreground">{title}</h3>
      <p className="mt-1 text-[12px] text-muted-foreground">{description}</p>
    </div>
  )
}

export default function ScannerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <ToolPageSchema
        name="Privacy Scanner"
        description="Scan any public website for trackers, cookies, fingerprinting scripts, third-party requests, HTTPS issues, and security headers."
        url="https://defaultprivacy.com/scanner"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Free Tools", url: "https://defaultprivacy.com/tools" },
          { name: "Privacy Scanner", url: "https://defaultprivacy.com/scanner" },
        ]}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Left: Copy */}
              <div>
                <span className="mb-3 inline-block rounded-full border border-foreground/10 bg-foreground/[0.02] px-3 py-1 text-[11px] font-medium text-foreground-soft">
                  Free Tool
                </span>
                <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
                  Privacy Scanner
                </h1>
                <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
                  Discover what trackers, cookies, and fingerprinting techniques websites use
                  to monitor your activity.
                </p>
                <p className="mt-3 text-[13px] text-muted-foreground">
                  No signup required. Results are cached for 48 hours.
                </p>
              </div>

              {/* Right: Form */}
              <div className="rounded-lg border border-foreground/8 bg-foreground/[0.01] p-6">
                <ScannerForm />
              </div>
            </div>

            {/* Teaser — show the payoff + one-tap quick scans */}
            <div className="mt-8 brand2-hero-animate-delay-2">
              <QuickScanChips />
              <ExampleReadout />
            </div>
          </div>
        </section>

        {/* What We Analyze */}
        <section className="border-t border-foreground/8 py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-lg font-medium tracking-tight text-foreground">
                What We Analyze
              </h2>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                <FeatureCell
                  icon={Eye}
                  title="Trackers"
                  description="Google Analytics, Facebook Pixel, and 100+ known trackers"
                />
                <FeatureCell
                  icon={Cookie}
                  title="Cookies"
                  description="First-party, third-party, and tracking cookies"
                />
                <FeatureCell
                  icon={Lock}
                  title="Security"
                  description="HTTPS, HSTS, CSP, and other security headers"
                />
                <FeatureCell
                  icon={Globe}
                  title="Third-Party"
                  description="External requests to CDNs, APIs, and ad networks"
                />
                <FeatureCell
                  icon={Fingerprint}
                  title="Fingerprinting"
                  description="Canvas, WebGL, audio, and font fingerprinting"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-foreground/8 bg-foreground/[0.01] py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-center text-lg font-medium tracking-tight text-foreground">
                How It Works
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-background text-[13px] font-medium tabular-nums text-foreground-soft">
                    1
                  </div>
                  <h3 className="text-[13px] font-medium text-foreground">Enter URL</h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    Paste any website URL you want to analyze
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-background text-[13px] font-medium tabular-nums text-foreground-soft">
                    2
                  </div>
                  <h3 className="text-[13px] font-medium text-foreground">We Scan</h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    Our scanner visits the site and analyzes all requests
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-background text-[13px] font-medium tabular-nums text-foreground-soft">
                    3
                  </div>
                  <h3 className="text-[13px] font-medium text-foreground">Get Results</h3>
                  <p className="mt-1 text-[12px] text-muted-foreground">
                    View a detailed privacy report with grade
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
