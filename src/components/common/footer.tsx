import Image from "next/image"
import Link from "next/link"

const footerLinks = {
  services: [
    { href: "/directory", label: "Browse Directory" },
    { href: "/stacks", label: "Stacks" },
    { href: "/ai", label: "Use in your AI" },
  ],
  tools: [
    { href: "/privacy-score", label: "Privacy Score" },
    { href: "/password-check", label: "Password Analyzer" },
    { href: "/scanner", label: "Privacy Scanner" },
    { href: "/breach-check", label: "Breach Check" },
    { href: "/email-security", label: "Email Security" },
    { href: "/whois", label: "WHOIS Privacy" },
    { href: "/dns-leak", label: "DNS Leak Test" },
    { href: "/exposed", label: "Exposure Check" },
  ],
  learn: [
    { href: "/start", label: "Start here" },
    { href: "/guides", label: "Field Guide" },
    { href: "/glossary", label: "Glossary" },
  ],
  legal: [
    { href: "/about", label: "About" },
    { href: "/methodology", label: "Methodology" },
    { href: "/how-we-pick", label: "How we pick" },
    { href: "/editorial-policy", label: "Editorial policy" },
    { href: "https://github.com/default-privacy/DefaultPrivacy.com", label: "Source code" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms" },
  ],
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 bg-muted/20 py-16 md:py-20">
      <div className="container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12">
          <div>
            <p className="text-[10px] font-mono text-foreground/65 uppercase tracking-[0.35em] mb-5 font-extralight">
              Directory
            </p>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-sm text-foreground/72 transition-colors brand2-focus hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono text-foreground/65 uppercase tracking-[0.35em] mb-5 font-extralight">
              Free Tools
            </p>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-sm text-foreground/72 transition-colors brand2-focus hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono text-foreground/65 uppercase tracking-[0.35em] mb-5 font-extralight">
              Learn
            </p>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-sm text-foreground/72 transition-colors brand2-focus hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono text-foreground/65 uppercase tracking-[0.35em] mb-5 font-extralight">
              Legal
            </p>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-sm text-sm text-foreground/72 transition-colors brand2-focus hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-foreground/10 pt-10 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-icon.svg"
              alt="Default Privacy"
              width={20}
              height={20}
              className="h-5 w-5 opacity-60"
            />
            <span className="text-sm text-foreground/62">© 2026 Default Privacy</span>
          </div>
          <p className="flex flex-wrap justify-center gap-y-1 font-mono text-[11.5px] uppercase tracking-[0.08em] text-foreground/50 md:justify-end">
            {["No paid placements", "No cookies", "No tracking pixels", "No account"].map((f, i) => (
              <span key={f} className={i > 0 ? "before:mx-2.5 before:content-['·']" : undefined}>
                {f}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}
