import type { Metadata } from "next"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { ExposureReadout } from "@/components/exposure/exposure-readout"
import { BreadcrumbSchema } from "@/components/common/breadcrumb-schema"
import { ToolPageSchema } from "@/components/common/tool-page-schema"

export const metadata: Metadata = {
  title: "What Are You Leaking? — Browser & Connection Exposure | Default Privacy",
  description:
    "See what your browser and connection reveal to every website you visit — your IP address, location, and more. Read live off your own connection. No signup, and nothing tied to you is stored.",
  alternates: {
    canonical: "https://defaultprivacy.com/exposed",
  },
  openGraph: {
    title: "What Are You Leaking? — Browser & Connection Exposure",
    description: "See what your browser and connection reveal to every website you visit — your IP address, location, and more. Read live off your own connection. No signup, and nothing tied to you is stored.",
  },
}

export default function ExposedPage() {
  return (
    <div className="brand2-grain flex min-h-screen flex-col bg-background">
      <Header />
      <ToolPageSchema
        name="Exposure Check"
        description="See what your browser and connection reveal to every website: IP address, approximate location, WebRTC leaks and browser fingerprint, read live in your own browser."
        url="https://defaultprivacy.com/exposed"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://defaultprivacy.com" },
          { name: "Free Tools", url: "https://defaultprivacy.com/tools" },
          { name: "Exposure Check", url: "https://defaultprivacy.com/exposed" },
        ]}
      />
      <main className="flex-1">
        <section className="container py-12 md:py-16">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <span className="brand2-label-12-mono inline-block rounded-full border border-foreground/10 bg-foreground/[0.02] px-3 py-1 text-foreground/50">
              Exposure Check
            </span>
            <h1 className="text-3xl font-light tracking-cinematic text-foreground/90 md:text-4xl">
              What Are You Leaking?
            </h1>
            <p className="mx-auto max-w-xl text-[15px] text-foreground/55">
              Your IP, location, browser fingerprint, and device — read live in your own browser. No
              signup and no permission asked. This is simply what every website already sees. We keep
              only anonymous counts of a few browser settings, never your IP or anything that links back
              to you. Details in our <a href="/privacy" className="underline hover:text-foreground">privacy policy</a>.
            </p>
          </div>
        </section>

        <section className="container pb-16">
          <div className="mx-auto max-w-4xl">
            <ExposureReadout />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
