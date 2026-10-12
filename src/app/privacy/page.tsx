import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import {
  ArrowRight,
  Database,
  Eye,
  Globe,
  Lock,
  Mail,
  Shield,
  UserX,
} from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | Default Privacy",
  description:
    "How Default Privacy handles your data. We practice what we preach — no accounts, no tracking, minimal collection, full transparency.",
  alternates: {
    canonical: "https://defaultprivacy.com/privacy",
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-[15%] top-[-20%] h-[min(60vw,400px)] w-[min(60vw,400px)] rounded-full bg-primary/10 opacity-50 blur-[80px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          </div>

          <div className="container relative py-12 md:py-16">
            <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-10 md:px-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_oklch,var(--brand-blueprint)_6%,transparent),transparent_55%)]" aria-hidden />
              <div className="relative z-10">
                <span className="mb-4 inline-flex items-center rounded-full border border-primary/25 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/90">
                  Legal Document
                </span>
                <h1 className="mb-4 text-3xl font-extralight tracking-tight text-foreground/92 md:text-4xl">
                  Privacy Policy
                </h1>
                <p className="mb-2 text-lg leading-relaxed text-foreground/58">
                  We practice what we preach. This policy explains exactly what data we touch, why, and how
                  little of it we keep.
                </p>
                <p className="text-sm text-foreground/45">Last updated: October 11, 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* TL;DR */}
        <section className="container pb-12">
          <div className="group mx-auto max-w-3xl rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:bg-foreground/[0.03]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                <Shield className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
              </div>
              <div>
                <h2 className="mb-3 text-lg font-medium tracking-tight text-foreground/88">TL;DR — The Short Version</h2>
                <ul className="space-y-2.5 text-sm leading-relaxed text-foreground/56">
                  <li>• <strong className="text-foreground/78">No accounts.</strong> You never sign up, log in, or give us your email to use anything here.</li>
                  <li>• The <strong className="text-foreground/78">free tools run in your browser</strong> or check something you type in — nothing tied to you is stored. Website scan results are stored by domain, not linked to you, and expire after 48 hours.</li>
                  <li>• Browsing the <strong className="text-foreground/78">directory is anonymous.</strong> We don&apos;t log your searches.</li>
                  <li>• <strong className="text-foreground/78">No tracking pixels</strong>, no Google Analytics, no ad networks, no data sales — ever.</li>
                  <li>• Outbound links to tools carry <strong className="text-foreground/78">no affiliate or referral codes</strong>. No vendor pays us when you choose their tool.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="container pb-16">
          <div className="mx-auto max-w-3xl space-y-12">
            {/* 1 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Database className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">1. What We Collect</h2>
              </div>
              <p className="mb-4 text-foreground/58">
                Default Privacy has no accounts and no paid services. Here is what each part of the site does with data, and which outside services see what:
              </p>

              <h3 className="mb-3 mt-6 text-base font-medium text-foreground/75">Free tools</h3>
              <div className="space-y-3">
                <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
                  <ul className="space-y-1 text-sm text-foreground/55">
                    <li>• <strong className="text-foreground/70">Password Strength</strong> runs entirely in your browser (zxcvbn). Breach-checking uses the Have I Been Pwned k-anonymity API — only the first 5 characters of a SHA-1 hash are sent, never your password.</li>
                    <li>• <strong className="text-foreground/70">Website Privacy Scanner</strong> loads a URL you provide in a headless browser run by Cloudflare and reports its trackers. The result is stored by domain, not linked to you, for 48 hours so repeat checks are fast. Expired results are deleted the next time anyone runs a scan. The Privacy Score uses the same scanner.</li>
                    <li>• <strong className="text-foreground/70">Breach Check</strong> guides you to check your own email on Have I Been Pwned — we never see or receive your email address.</li>
                    <li>• <strong className="text-foreground/70">Email Security</strong> looks up a domain&apos;s public DNS records (SPF/DKIM/DMARC). The domain isn&apos;t stored.</li>
                    <li>• <strong className="text-foreground/70">WHOIS Privacy</strong> runs a public WHOIS/RDAP query for a domain you provide. The domain isn&apos;t stored.</li>
                    <li>• <strong className="text-foreground/70">Exposure Check</strong> (/exposed) shows your IP address and approximate location, read from our host&apos;s request headers and not stored. In your browser it tests for WebRTC leaks by contacting Google&apos;s public STUN server, which sees your IP, and shows your approximate location on a map loaded from OpenStreetMap, which sees your IP and that location. It adds a few coarse browser settings (screen size, timezone, graphics card name, language and similar) to anonymous counts, with no IP and no ID.</li>
                    <li>• The <strong className="text-foreground/70">banner at the top of every page</strong> shows your IP address and city, read from our host&apos;s request headers. It isn&apos;t stored.</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
                  <h4 className="mb-2 text-sm font-medium text-foreground/80">Privacy Tools Directory</h4>
                  <ul className="space-y-1 text-sm text-foreground/55">
                    <li>• <strong className="text-foreground/70">No personal data collected</strong> — browsing and searching the directory is anonymous.</li>
                    <li>• We don&apos;t log or store your searches. Search words are part of the page address, so our host&apos;s request logs can briefly contain them.</li>
                    <li>• Tool logos load from our storage on Amazon S3 or, for some tools, from the tool&apos;s own website or an image host. Like any image on the web, those servers see your IP address when the logo loads.</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
                  <h4 className="mb-2 text-sm font-medium text-foreground/80">AI assistant connector</h4>
                  <ul className="space-y-1 text-sm text-foreground/55">
                    <li>• We keep daily counts of each tool and request type an assistant uses, of which kind of app connects (Claude, Cursor and the like; any other name counts as &quot;other&quot;), of which MCP protocol version each request uses, and of which response formats a request says it accepts. Lookups aren&apos;t stored. Details on <a href="/ai" className="underline hover:text-foreground">/ai</a>.</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4">
                  <h4 className="mb-2 text-sm font-medium text-foreground/80">Server logs</h4>
                  <ul className="space-y-1 text-sm text-foreground/55">
                    <li>• Like any website, our host records basic request logs (IP address, user agent, and the page address requested) for security and reliability. We don&apos;t use them to profile you.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Eye className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">2. What We Don&apos;t Collect</h2>
              </div>
              <ul className="space-y-2 text-foreground/58">
                <li className="flex items-start gap-2"><UserX className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /><span><strong className="text-foreground/75">No accounts</strong> — nothing here requires signing up or logging in</span></li>
                <li className="flex items-start gap-2"><UserX className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /><span><strong className="text-foreground/75">No tracking pixels</strong> — no Google Analytics, Meta Pixel, or similar surveillance</span></li>
                <li className="flex items-start gap-2"><UserX className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /><span><strong className="text-foreground/75">No third-party ads</strong> and <strong className="text-foreground/75">no data sales</strong> — your information is never sold</span></li>
                <li className="flex items-start gap-2"><UserX className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /><span><strong className="text-foreground/75">No CDN fonts</strong> — fonts are self-hosted, so your browser never phones a font network</span></li>
              </ul>
            </div>

            {/* 3 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Globe className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">3. Third-Party Services</h2>
              </div>
              <p className="mb-4 text-foreground/58">
                We use a minimal set of services, chosen for their privacy practices. There are no affiliate
                links anywhere on this site, and outbound links carry no referral codes.
              </p>
              <div className="overflow-hidden rounded-xl border border-foreground/10">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                        <th className="px-4 py-2.5 text-left font-medium text-foreground/75">Service</th>
                        <th className="px-4 py-2.5 text-left font-medium text-foreground/75">Purpose</th>
                        <th className="px-4 py-2.5 text-left font-medium text-foreground/75">Data Shared</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/10 text-foreground/55">
                      <tr><td className="px-4 py-2.5">Vercel</td><td className="px-4 py-2.5">Hosting</td><td className="px-4 py-2.5">Server logs (IP, user agent, page address)</td></tr>
                      <tr><td className="px-4 py-2.5">Neon</td><td className="px-4 py-2.5">Database (directory data, 48-hour scan results by domain, anonymous counts)</td><td className="px-4 py-2.5">No personal data</td></tr>
                      <tr><td className="px-4 py-2.5">Have I Been Pwned</td><td className="px-4 py-2.5">Password/breach checks</td><td className="px-4 py-2.5">First 5 characters of a password hash, and your IP (the password check runs from your browser)</td></tr>
                      <tr><td className="px-4 py-2.5">Cloudflare</td><td className="px-4 py-2.5">Website scanner (headless browser)</td><td className="px-4 py-2.5">The URL you ask us to scan</td></tr>
                      <tr><td className="px-4 py-2.5">Domain registries (RDAP)</td><td className="px-4 py-2.5">WHOIS Privacy check</td><td className="px-4 py-2.5">The domain you look up</td></tr>
                      <tr><td className="px-4 py-2.5">Google (STUN server)</td><td className="px-4 py-2.5">Exposure Check WebRTC test</td><td className="px-4 py-2.5">Your IP address</td></tr>
                      <tr><td className="px-4 py-2.5">OpenStreetMap</td><td className="px-4 py-2.5">Exposure Check map</td><td className="px-4 py-2.5">Your IP address and the approximate location shown</td></tr>
                      <tr><td className="px-4 py-2.5">Amazon S3, tool websites, image hosts</td><td className="px-4 py-2.5">Tool logos</td><td className="px-4 py-2.5">Your IP address when a logo loads</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 4 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Lock className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">4. How We Protect &amp; Retain Data</h2>
              </div>
              <ul className="space-y-1 text-foreground/58">
                <li>• <strong className="text-foreground/75">Encryption in transit</strong> — all connections use HTTPS/TLS</li>
                <li>• <strong className="text-foreground/75">Minimal retention</strong> — website scan results expire after 48 hours and are deleted at the next scan; Exposure Check keeps anonymous counts of browser settings; nothing else from the tools is stored</li>
                <li>• <strong className="text-foreground/75">No profiles</strong> — because there are no accounts, there is no profile of you to protect or leak</li>
              </ul>
            </div>

            {/* 5 */}
            <div className="group">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04]">
                  <Mail className="h-5 w-5 text-primary brand2-icon-breathe" aria-hidden />
                </div>
                <h2 className="text-xl font-medium tracking-tight text-foreground/88">5. Contact &amp; Changes</h2>
              </div>
              <p className="mb-4 text-foreground/58">
                Questions about this policy or our data practices? Email{" "}
                <a
                  href="mailto:privacy@defaultprivacy.com"
                  className="brand2-focus rounded-sm text-foreground/70 underline underline-offset-2 hover:text-foreground"
                >
                  privacy@defaultprivacy.com
                </a>
                . We may update this policy from time to time; the &quot;Last updated&quot; date above reflects the
                latest revision.
              </p>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="container pb-16">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl border border-foreground/10 bg-gradient-to-br from-card to-background p-8 text-center shadow-[0_4px_24px_oklch(0_0_0/0.15)]">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="absolute left-[50%] top-[20%] h-[200px] w-[300px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />
            </div>
            <div className="relative z-10">
              <p className="mb-4 text-foreground/56">Have questions about how we handle your data?</p>
              <Link
                href="/terms"
                className="group inline-flex items-center gap-1 text-sm text-foreground/70 brand2-focus hover:text-foreground"
              >
                Read our Terms of Service
                <ArrowRight className="h-3.5 w-3.5 brand2-arrow-nudge" aria-hidden />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
