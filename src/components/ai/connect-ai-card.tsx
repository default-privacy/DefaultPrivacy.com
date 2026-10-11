import Link from "next/link"
import { Fragment } from "react"
import { CopyAddress } from "@/components/ai/copy-address"
import { AI_APPS, MCP_URL } from "@/lib/mcp-connect"

// Plain names, no logos: several vendors don't allow theirs on third-party buttons, and
// hosted badge images would make every visitor's browser call the vendor.
const installBtn =
  "brand2-focus inline-flex items-center rounded-lg border border-foreground/12 px-3 py-1.5 font-mono text-[12px] text-foreground/70 transition-colors hover:border-primary/50 hover:text-foreground"
const quietLink = "rounded-sm underline underline-offset-2 brand2-focus hover:text-foreground"

/** One-click install where the vendor documents one, else that app's steps on /ai. */
const appHref = (a: (typeof AI_APPS)[number]) => (a.install ? a.install() : `/ai#app-${a.id}`)

/**
 * "Connect your AI" in two sizes. full: address + copy, one-click installs, trust line.
 * slim: one line for the ends of pages. Static apart from the copy button.
 */
export function ConnectAiCard({ size = "full", className = "" }: { size?: "full" | "slim"; className?: string }) {
  if (size === "slim") {
    return (
      <aside
        aria-label="Connect your AI"
        className={`flex flex-wrap items-center gap-x-2.5 gap-y-2 rounded-xl border border-foreground/10 bg-foreground/[0.02] px-4 py-3 text-sm text-foreground/60 ${className}`}
      >
        <span className="mr-1">Ask your AI assistant, and it answers from this directory. Add it to</span>
        {AI_APPS.map((a, i) => (
          <Fragment key={a.id}>
            {i > 0 && <span className="text-foreground/20" aria-hidden>·</span>}
            <a href={appHref(a)} className={quietLink}>{a.name}</a>
          </Fragment>
        ))}
      </aside>
    )
  }

  return (
    <section
      aria-labelledby="connect-ai-heading"
      className={`space-y-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5 ${className}`}
    >
      <h2 id="connect-ai-heading" className="text-xs font-medium tracking-[var(--tracking-cinematic-wide)] text-foreground/50">
        CONNECT YOUR AI
      </h2>
      <CopyAddress value={MCP_URL} />
      <div className="flex flex-wrap gap-2">
        {AI_APPS.map((a) => (
          <a key={a.id} href={appHref(a)} className={installBtn}>
            {a.install ? `Add to ${a.name}` : a.name}
          </a>
        ))}
      </div>
      <p className="text-sm text-foreground/60">
        No account, no key. The install links only add this web address, with no program to run on your computer.{" "}
        <Link href="/ai#what-we-see" className={quietLink}>What we log</Link>.
      </p>
    </section>
  )
}
