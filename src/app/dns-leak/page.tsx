import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { ToolPageSchema } from "@/components/common/tool-page-schema"
import { DnsLeakChecker } from "@/components/dns-leak/dns-leak-checker"
import { RelatedLinks } from "@/components/common/related-links"
import { DNS_LEAK } from "@/lib/cross-sell"

export const metadata: Metadata = {
  title: "DNS Leak Test — Is Your VPN Leaking DNS? | Default Privacy",
  description:
    "Check whether your DNS queries are leaking outside your VPN. We see which DNS servers actually answered your device's lookups and flag when more than one resolver answers. No login; resolver data is discarded within minutes.",
  alternates: {
    canonical: "https://defaultprivacy.com/dns-leak",
  },
}

export default function DnsLeakPage() {
  return (
    <>
      <Header />
      <ToolPageSchema
        name="DNS Leak Test"
        description="Check whether your DNS queries are leaking outside your VPN by seeing which DNS servers actually answered your device's lookups."
        url="https://defaultprivacy.com/dns-leak"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Free Tools", url: "https://defaultprivacy.com/tools" },
          { name: "DNS Leak Test", url: "https://defaultprivacy.com/dns-leak" },
        ]}
      />
      <main className="container py-12 max-w-2xl mx-auto" style={{ touchAction: "manipulation" }}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium tracking-cinematic text-foreground/90 mb-3">
            DNS Leak Test
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Even on a VPN, your DNS lookups can quietly go to your ISP — exposing every site you visit.
            Run the test to see which DNS servers actually answered your device.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 rounded-full bg-success/10 border border-success/20 px-4 py-1.5 text-sm text-success">
            <div className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            One-time hostnames — no login, resolver data kept only minutes
          </div>
        </div>

        <Suspense>
          <DnsLeakChecker />
        </Suspense>

        <div className="mt-8">
          <RelatedLinks
            title="Stop DNS from leaking"
            description="Route DNS through a VPN or a private resolver you control."
            targets={DNS_LEAK}
          />
        </div>

        <div className="mt-12 space-y-6 text-sm text-muted-foreground">
          <div className="rounded-lg border border-foreground/10 p-4 space-y-2">
            <h3 className="font-medium text-foreground">How this works</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li>Your browser resolves a few unique one-time hostnames on our domain</li>
              <li>Our authoritative nameserver logs which DNS resolvers asked about them</li>
              <li>More than one distinct resolver answering suggests DNS is bypassing your VPN</li>
              <li>The hostnames never serve a page — only the DNS lookup matters, and resolver data is discarded within minutes</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
