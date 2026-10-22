import Link from "next/link"
import { AI_APPS, MCP_URL, claudeCodeCommand } from "@/lib/mcp-connect"
import { SERVER_INFO } from "@/mcp-server/server"

const appHref = (a: (typeof AI_APPS)[number]) => (a.install ? a.install() : `/ai#app-${a.id}`)

const code =
  "block overflow-x-auto whitespace-nowrap rounded-lg border border-foreground/12 bg-background px-3.5 py-2.5 font-mono text-[13px] text-primary"

/** "Built for AI agents": the hosted MCP server and the machine-readable pages, with real addresses only. */
export function AgentsSection({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="agents-heading" className={className}>
      <h2
        id="agents-heading"
        className="mb-4 flex items-center gap-4 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-foreground/50 after:h-px after:flex-1 after:bg-foreground/10"
      >
        Built for AI agents
      </h2>
      <div className="grid gap-3.5 md:grid-cols-2">
        <div className="rounded-xl border border-primary/50 bg-primary/5 p-5">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">MCP server</h3>
          <code className={`${code} mt-3`}>{claudeCodeCommand()}</code>
          <p className="mt-3 text-sm text-foreground/60">
            Search, picks, stacks, guides, glossary and three domain checks, as tools your AI calls. Hosted,
            no key, no account. Version {SERVER_INFO.version}.
          </p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {AI_APPS.map((a, i) => (
              <a
                key={a.id}
                href={appHref(a)}
                className={`brand2-focus inline-flex items-center rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  i === 0
                    ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-foreground/12 text-foreground/75 hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {a.install ? `Add to ${a.name}` : a.name}
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">Machine-readable pages</h3>
          <a href="/llms.txt" className={`${code} mt-3 brand2-focus`}>/llms.txt</a>
          <code className={`${code} mt-2`}>/llm-mirror/&lt;any-page&gt;.md</code>
          <p className="mt-3 text-sm text-foreground/60">
            An index of every surface, plus a Markdown mirror of each guide, stack and glossary entry.{" "}
            <Link href="/ai" className="rounded-sm underline underline-offset-2 brand2-focus hover:text-foreground">
              Everything for agents
            </Link>
            . Address: <span className="font-mono text-[13px] text-foreground/75">{MCP_URL}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
