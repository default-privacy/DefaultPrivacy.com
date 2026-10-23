import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { PageNav } from "@/components/common/page-nav"
import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | Default Privacy",
  description:
    "How Default Privacy handles your data. We practice what we preach — no accounts, no tracking, minimal collection, full transparency.",
  alternates: {
    canonical: "https://defaultprivacy.com/privacy",
  },
}

const SECTIONS = [
  { id: "short-version", label: "The short version" },
  { id: "collect", label: "What we collect" },
  { id: "dont-collect", label: "What we don't collect" },
  { id: "third-parties", label: "Third-party services" },
  { id: "protect", label: "Protect and retain" },
  { id: "contact", label: "Contact and changes" },
]

// Same composition as /ai: mono eyebrow headings, 680px column, quiet cards
const label =
  "flex items-center gap-4 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-foreground/50 after:h-px after:flex-1 after:bg-foreground/10"
const body = "text-[15px] leading-relaxed text-foreground/70"
const list = "list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/70 marker:text-foreground/30"
const card = "rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4"
const em = "font-medium text-foreground/90"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 pb-28 pt-12">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,680px)] lg:justify-center lg:gap-16">
          <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
            <PageNav items={SECTIONS} back={{ href: "/", label: "Home" }} />
          </aside>
          <article className="min-w-0">
            <p className="mb-7 flex flex-wrap gap-y-1 border-b border-foreground/15 pb-3.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-foreground/50">
              <span className="font-semibold text-foreground">File DP · Legal</span>
              <span className="before:mx-2.5 before:content-['·']">Last updated October 22, 2026</span>
            </p>
            <h1 className="text-4xl font-semibold tracking-[var(--tracking-cinematic)] text-foreground md:text-[42px] md:leading-[1.1]">
              Privacy Policy
            </h1>
            <p className="mt-4 text-[19px] leading-relaxed text-foreground/70">
              We practice what we preach. This policy explains exactly what data we touch, why, and how
              little of it we keep.
            </p>

            <section
              id="short-version"
              className="relative mt-12 scroll-mt-24 rounded-lg border border-foreground/25 bg-foreground/[0.03] px-6 pb-5 pt-6"
            >
              <span className="absolute -top-3 left-5 bg-foreground px-2.5 py-1.5 font-mono text-[11.5px] font-bold uppercase leading-none tracking-[0.14em] text-background">
                Read first
              </span>
              <h2 className="mb-3 text-[20px] font-semibold tracking-tight text-foreground">TL;DR — The Short Version</h2>
              <ul className={list}>
                <li><strong className={em}>No accounts.</strong> You never sign up, log in, or give us your email to use anything here.</li>
                <li>The <strong className={em}>free tools run in your browser</strong> or check something you type in — nothing tied to you is stored. Website scan results are stored by domain, not linked to you, and expire after 48 hours.</li>
                <li>Browsing the <strong className={em}>directory is anonymous.</strong> We don&apos;t log your searches.</li>
                <li><strong className={em}>No tracking pixels</strong>, no Google Analytics, no ad networks, no data sales — ever.</li>
                <li>Outbound links to tools carry <strong className={em}>no affiliate or referral codes</strong>. No vendor pays us when you choose their tool.</li>
              </ul>
            </section>

            <section id="collect" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>1. What We Collect</h2>
              <p className={body}>
                Default Privacy has no accounts and no paid services. Here is what each part of the site does with data, and which outside services see what:
              </p>
              <div className={card}>
                <h3 className="mb-2 text-sm font-medium text-foreground/90">Free tools</h3>
                <ul className={list}>
                  <li><strong className={em}>Password Strength</strong> runs entirely in your browser (zxcvbn). Breach-checking uses the Have I Been Pwned k-anonymity API — only the first 5 characters of a SHA-1 hash are sent, never your password.</li>
                  <li><strong className={em}>Website Privacy Scanner</strong> loads a URL you provide in a headless browser run by Cloudflare and reports its trackers. The result is stored by domain, not linked to you, for 48 hours so repeat checks are fast. Expired results are deleted the next time anyone runs a scan. The Privacy Score uses the same scanner.</li>
                  <li><strong className={em}>Breach Check</strong> guides you to check your own email on Have I Been Pwned — we never see or receive your email address.</li>
                  <li><strong className={em}>Email Security</strong> looks up a domain&apos;s public DNS records (SPF/DKIM/DMARC). The domain isn&apos;t stored.</li>
                  <li><strong className={em}>WHOIS Privacy</strong> runs a public WHOIS/RDAP query for a domain you provide. The domain isn&apos;t stored.</li>
                  <li><strong className={em}>Exposure Check</strong> (/exposed) shows your IP address and approximate location, read from our host&apos;s request headers and not stored. In your browser it tests for WebRTC leaks by contacting Google&apos;s public STUN server, which sees your IP, and shows your approximate location on a map loaded from OpenStreetMap, which sees your IP and that location. It adds a few coarse browser settings (screen size, timezone, graphics card name, language and similar) to anonymous counts, with no IP and no ID.</li>
                  <li>The <strong className={em}>banner at the top of every page</strong> shows your IP address and city, read from our host&apos;s request headers. It isn&apos;t stored.</li>
                </ul>
              </div>
              <div className={card}>
                <h3 className="mb-2 text-sm font-medium text-foreground/90">Privacy Tools Directory</h3>
                <ul className={list}>
                  <li><strong className={em}>No personal data collected</strong> — browsing and searching the directory is anonymous.</li>
                  <li>We don&apos;t log or store your searches. We count how many searches happen each day, never the words. Search words are part of the page address, so our host&apos;s request logs can briefly contain them.</li>
                  <li>Tool logos load from our storage on Amazon S3 or, for some tools, from the tool&apos;s own website or an image host. Like any image on the web, those servers see your IP address when the logo loads.</li>
                </ul>
              </div>
              <div className={card}>
                <h3 className="mb-2 text-sm font-medium text-foreground/90">AI assistant connector</h3>
                <ul className={list}>
                  <li>We keep daily counts of each tool and request type an assistant uses, of which kind of app connects (Claude, Cursor and the like; any other name counts as &quot;other&quot;), of which MCP protocol version each request uses, of which response formats a request says it accepts, and of which broad kind of software sends a request (browser-like, script, self-declared bot, an AI company&apos;s app such as Claude or ChatGPT, or other, never the raw text), and of how many connections and tool calls each of those kinds makes. We also count which guide, stack or glossary entry an assistant opens. What an assistant sends to look something up isn&apos;t stored. Details on <a href="/ai" className="underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">/ai</a>.</li>
                </ul>
              </div>
              <div className={card}>
                <h3 className="mb-2 text-sm font-medium text-foreground/90">Server logs</h3>
                <ul className={list}>
                  <li>Like any website, our host records basic request logs (IP address, user agent, and the page address requested) for security and reliability. We don&apos;t use them to profile you.</li>
                  <li>To enforce rate limits, your IP address is held in memory for up to a day, then dropped. It is never written to our database.</li>
                </ul>
              </div>
            </section>

            <section id="dont-collect" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>2. What We Don&apos;t Collect</h2>
              <ul className={list}>
                <li><strong className={em}>No accounts</strong> — nothing here requires signing up or logging in</li>
                <li><strong className={em}>No tracking pixels</strong> — no Google Analytics, Meta Pixel, or similar surveillance</li>
                <li><strong className={em}>No third-party ads</strong> and <strong className={em}>no data sales</strong> — your information is never sold</li>
                <li><strong className={em}>No CDN fonts</strong> — fonts are self-hosted, so your browser never phones a font network</li>
              </ul>
            </section>

            <section id="third-parties" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>3. Third-Party Services</h2>
              <p className={body}>
                We use a minimal set of services, chosen for their privacy practices. There are no affiliate
                links anywhere on this site, and outbound links carry no referral codes.
              </p>
              <div className="overflow-x-auto rounded-xl border border-foreground/10">
                <table className="w-full text-[14px] leading-relaxed">
                  <thead>
                    <tr className="border-b border-foreground/10 bg-foreground/[0.02] text-left font-mono text-[11.5px] uppercase tracking-[0.1em] text-foreground/50">
                      <th className="px-4 py-2.5 font-medium">Service</th>
                      <th className="px-4 py-2.5 font-medium">Purpose</th>
                      <th className="px-4 py-2.5 font-medium">Data Shared</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/10 align-top text-foreground/70">
                    <tr><td className="px-4 py-2.5 text-foreground/90">Vercel</td><td className="px-4 py-2.5">Hosting (United States, Washington, D.C. region)</td><td className="px-4 py-2.5">Server logs (IP, user agent, page address); on our plan the logs we can see last at most a day, and what Vercel keeps for itself is set by Vercel&apos;s own privacy policy</td></tr>
                    <tr><td className="px-4 py-2.5 text-foreground/90">Neon</td><td className="px-4 py-2.5">Database (United States, Ohio region; directory data, 48-hour scan results by domain, anonymous counts)</td><td className="px-4 py-2.5">No personal data</td></tr>
                    <tr><td className="px-4 py-2.5 text-foreground/90">Have I Been Pwned</td><td className="px-4 py-2.5">Password/breach checks</td><td className="px-4 py-2.5">First 5 characters of a password hash, and your IP (the password check runs from your browser)</td></tr>
                    <tr><td className="px-4 py-2.5 text-foreground/90">Cloudflare</td><td className="px-4 py-2.5">Website scanner (headless browser)</td><td className="px-4 py-2.5">The URL you ask us to scan</td></tr>
                    <tr><td className="px-4 py-2.5 text-foreground/90">Official MCP registry</td><td className="px-4 py-2.5">MCP server check (unlisted servers only)</td><td className="px-4 py-2.5">The server name you ask about, and our server&apos;s address</td></tr>
                    <tr><td className="px-4 py-2.5 text-foreground/90">Domain registries (RDAP)</td><td className="px-4 py-2.5">WHOIS Privacy check</td><td className="px-4 py-2.5">The domain you look up</td></tr>
                    <tr><td className="px-4 py-2.5 text-foreground/90">Google (STUN server)</td><td className="px-4 py-2.5">Exposure Check WebRTC test</td><td className="px-4 py-2.5">Your IP address</td></tr>
                    <tr><td className="px-4 py-2.5 text-foreground/90">OpenStreetMap</td><td className="px-4 py-2.5">Exposure Check map</td><td className="px-4 py-2.5">Your IP address and the approximate location shown</td></tr>
                    <tr><td className="px-4 py-2.5 text-foreground/90">Amazon S3, tool websites, image hosts</td><td className="px-4 py-2.5">Tool logos</td><td className="px-4 py-2.5">Your IP address when a logo loads</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="protect" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>4. How We Protect &amp; Retain Data</h2>
              <ul className={list}>
                <li><strong className={em}>Encryption in transit</strong> — all connections use HTTPS/TLS</li>
                <li><strong className={em}>Minimal retention</strong> — website scan results expire after 48 hours and are deleted at the next scan. We keep anonymous daily counts, with no lookup and no IP: how often the website scanner, WHOIS, breach and email-security checks and directory search are used, a total per API endpoint of requests, errors and average response time, Exposure Check&apos;s counts of browser settings, the connector counts above. Counts are kept until we delete them, and each count also records when it last changed, so the most recent use of a tool can be dated to the second. We don&apos;t copy Vercel&apos;s server logs into our database. Nothing else from the tools is stored.</li>
                <li><strong className={em}>No profiles</strong> — because there are no accounts, there is no profile of you to protect or leak</li>
              </ul>
            </section>

            <section id="contact" className="mt-14 scroll-mt-24 space-y-4">
              <h2 className={label}>5. Contact &amp; Changes</h2>
              <p className={body}>
                Questions about this policy or our data practices? Email{" "}
                <a
                  href="mailto:privacy@defaultprivacy.com"
                  className="brand2-focus rounded-sm text-foreground underline underline-offset-2 hover:text-foreground"
                >
                  privacy@defaultprivacy.com
                </a>
                . We may update this policy from time to time; the &quot;Last updated&quot; date above reflects the
                latest revision.
              </p>
            </section>

            <p className="mt-14 border-t border-foreground/10 pt-5 text-[14px] text-foreground/50">
              Have questions about how we handle your data?{" "}
              <Link href="/terms" className="text-foreground/80 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                Read our Terms of Service
              </Link>
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
