import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import {
  ArrowRight,
  GaugeIcon,
  GlobeIcon,
  KeyRoundIcon,
  MailIcon,
  ScanLineIcon,
  ShieldAlertIcon,
  WifiIcon,
} from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { getPublicDirectoryStats } from "@/lib/directory-stats"

export const metadata: Metadata = {
  title: "Free Privacy Tools | Default Privacy",
  description:
    "Free privacy tools to check your exposure — test password strength, scan websites for trackers, check for DNS leaks, check breach history, grade a domain's email security, and see what WHOIS reveals. No signup, no account.",
  alternates: {
    canonical: "https://defaultprivacy.com/tools",
  },
}

type ToolItem = {
  href: string
  icon: React.ComponentType<{ className?: string }>
  concern: string
  tool: string
  summary: string
}

const tools: ToolItem[] = [
  {
    href: "/privacy-score",
    icon: GaugeIcon,
    concern: "I want one score for my domain's exposure",
    tool: "Privacy Score",
    summary: "Grade email spoofing, website trackers, and WHOIS exposure, then roll them into a single 0–100 privacy score.",
  },
  {
    href: "/password-check",
    icon: KeyRoundIcon,
    concern: "My passwords may be compromised",
    tool: "Password Analyzer",
    summary: "Check crack time and whether your password has appeared in known breaches — all in your browser.",
  },
  {
    href: "/scanner",
    icon: ScanLineIcon,
    concern: "Websites I use are tracking me",
    tool: "Privacy Scanner",
    summary: "Scan any URL for third-party trackers, cookies, and fingerprinting scripts.",
  },
  {
    href: "/dns-leak",
    icon: WifiIcon,
    concern: "My VPN might be leaking my browsing",
    tool: "DNS Leak Test",
    summary: "See which DNS servers actually answered your device — and whether queries are escaping your VPN.",
  },
  {
    href: "/breach-check",
    icon: ShieldAlertIcon,
    concern: "My personal email may have been breached",
    tool: "Account Breach Check",
    summary: "Step-by-step recovery — check your inbox on Have I Been Pwned (we never see your email).",
  },
  {
    href: "/email-security",
    icon: MailIcon,
    concern: "My domain can be spoofed by phishers",
    tool: "Email Security Checker",
    summary: "Grade a domain's SPF, DKIM, and DMARC records A–F with plain-English fixes.",
  },
  {
    href: "/whois",
    icon: GlobeIcon,
    concern: "My domain registration exposes my name",
    tool: "WHOIS Privacy Checker",
    summary: "See what a domain's public WHOIS record reveals — and whether privacy protection is on.",
  },
]

function ToolCard({ item }: { item: ToolItem }) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className="brand2-focus group flex items-start gap-4 rounded-xl border border-foreground/10 bg-foreground/[0.01] p-5 transition-colors hover:border-foreground/15 hover:bg-foreground/[0.02]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.02] transition-colors group-hover:border-foreground/15">
        <Icon className="h-5 w-5 text-foreground/50" aria-hidden />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium leading-snug text-foreground/85">{item.concern}</p>
        <p className="mt-1 text-[12px] text-foreground/50">{item.tool}</p>
        <p className="mt-2 text-[13px] leading-relaxed text-foreground/45">{item.summary}</p>
      </div>

      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-foreground/25 brand2-arrow-nudge" aria-hidden />
    </Link>
  )
}

export default async function ToolsPage() {
  const directoryStats = await getPublicDirectoryStats()

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <section className="container py-12 md:py-20">
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full border border-foreground/10 bg-foreground/[0.02] px-3 py-1 text-[11px] font-medium text-foreground/50">
            Free Tools
          </span>
          <h1 className="mb-3 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Free Privacy Tools
          </h1>
          <p className="mx-auto max-w-lg text-[15px] text-foreground/55">
            Pick a concern. Check it yourself. No signup, no account, nothing tied to you.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 lg:grid-cols-2">
          {tools.map((item) => (
            <ToolCard key={item.href} item={item} />
          ))}
        </div>
      </section>

      {/* Trust Stats */}
      <section className="border-t border-foreground/10 bg-foreground/[0.01]">
        <div className="container py-10">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="space-y-1">
              <div className="text-2xl font-medium tabular-nums tracking-tight text-foreground">7</div>
              <div className="text-[11px] text-foreground/45">Free Tools</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-medium tabular-nums tracking-tight text-foreground">0</div>
              <div className="text-[11px] text-foreground/45">Data Stored</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-medium tabular-nums tracking-tight text-foreground">{directoryStats.toolsLabel}</div>
              <div className="text-[11px] text-foreground/45">Tools Listed</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-medium tabular-nums tracking-tight text-foreground">500+</div>
              <div className="text-[11px] text-foreground/45">Glossary Terms</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
