import Link from "next/link"
import { claudeCodeCommand } from "@/lib/mcp-connect"

/** Hero panel: the hosted MCP server and the machine-readable pages, with real addresses only. */
export function HeroConnectPanel({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="connect-heading"
      className={`rounded-xl border border-primary/40 bg-background/70 p-5 backdrop-blur-sm ${className}`}
    >
      <h2
        id="connect-heading"
        className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-foreground/50"
      >
        Built for AI agents
      </h2>
      <p className="mt-2 text-lg font-semibold tracking-tight text-foreground">MCP server</p>
      <code className="mt-3 block rounded-lg border border-foreground/12 bg-background px-3.5 py-2.5 font-mono text-[12.5px] leading-relaxed text-primary [overflow-wrap:anywhere]">
        {claudeCodeCommand()}
      </code>
      <p className="mt-3 text-sm text-foreground/60">
        Search, picks, stacks, guides, glossary and three domain checks, as tools your AI calls. Hosted, no key, no
        account.
      </p>
      <Link
        href="/ai#connect"
        className="brand2-focus mt-3.5 inline-flex items-center rounded-lg border border-primary bg-primary px-3 py-1.5 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Connect your AI →
      </Link>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-foreground/10 pt-3.5 font-mono text-[12px] text-foreground/45">
        <a href="/llms.txt" className="brand2-focus rounded-sm hover:text-primary">/llms.txt</a>
        <span>/llm-mirror/&lt;page&gt;.md</span>
      </p>
    </section>
  )
}
