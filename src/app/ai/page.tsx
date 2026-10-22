import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { ConnectAiCard } from "@/components/ai/connect-ai-card"
import { PageNav } from "@/components/common/page-nav"
import { SERVER_INFO } from "@/mcp-server/server"
import { AI_APPS, MCP_URL, claudeCodeCommand } from "@/lib/mcp-connect"
import { TOSDR_COPIED_ON } from "@/lib/tosdr"

export const metadata: Metadata = {
  title: "Use Default Privacy in your AI | Default Privacy",
  description:
    "Connect Claude, ChatGPT, Gemini, Grok, Perplexity, Mistral, Cursor or VS Code to the Default Privacy directory: tool picks in order and links back to each listing. Free, no account.",
}


const ASK = [
  "I'm new to privacy. Where do I start?",
  "What should I replace WhatsApp with, and what changes when I switch?",
  "A VPN with a no-logs policy that has a clear jurisdiction?",
  "Compare Signal and SimpleX.",
  "Does example.com have SPF, DKIM and DMARC set up?",
]

const CLIENTS = [
  { name: "Claude Code", code: claudeCodeCommand() },
  { name: "Cursor (~/.cursor/mcp.json)", code: `{ "mcpServers": { "default-privacy": { "url": "${MCP_URL}" } } }` },
  { name: "VS Code (.vscode/mcp.json)", code: `{ "servers": { "default-privacy": { "type": "http", "url": "${MCP_URL}" } } }` },
]

const SECTIONS = [
  { id: "connect", label: "Connect your AI" },
  { id: "add-it", label: "Add it to your app" },
  { id: "editors", label: "Editors and tools" },
  { id: "what-to-ask", label: "What to ask" },
  { id: "what-we-see", label: "What we see" },
]

// A section heading: mono eyebrow with a rule running to the column's edge
const label =
  "flex items-center gap-4 font-mono text-[12.5px] font-medium uppercase tracking-[0.18em] text-foreground/50 after:h-px after:flex-1 after:bg-foreground/10"
const body = "space-y-4 text-[15px] leading-relaxed text-foreground/70"
const card = "rounded-xl border border-foreground/10 bg-foreground/[0.02] p-4"

export default function UseInYourAiPage() {
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
          <span className="font-semibold text-foreground">File DP · AI</span>
          <span className="before:mx-2.5 before:content-['·']">MCP {SERVER_INFO.version}</span>
          <span className="before:mx-2.5 before:content-['·']">No account</span>
          <span className="before:mx-2.5 before:content-['·']">No key</span>
        </p>
        <h1 className="text-4xl font-semibold tracking-[var(--tracking-cinematic)] text-foreground md:text-[42px] md:leading-[1.1]">
          Use Default Privacy in your AI
        </h1>
        <p className="mt-4 text-[19px] leading-relaxed text-foreground/70">
          Ask your assistant about privacy tools and it answers from this directory: DP picks first, then A to Z,
          with a link back to each listing. Free, no account, no key. How we choose picks is on{" "}
          <Link href="/how-we-pick" className="underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
            How we pick
          </Link>
          .
        </p>

        <div id="connect" className="scroll-mt-24">
          <ConnectAiCard className="mt-8" />
        </div>

        <section id="add-it" className="mt-14 scroll-mt-24 space-y-4">
          <h2 className={label}>Add it to your app</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {AI_APPS.filter((a) => a.steps).map((a) => (
              <li key={a.id} id={`app-${a.id}`} className={`flex scroll-mt-24 flex-col ${card}`}>
                <p className="mb-1.5 font-medium text-foreground">{a.name}</p>
                <p className="text-[14px] leading-relaxed text-foreground/70">
                  {a.steps}
                  {a.note && <> {a.note}</>}
                </p>
                <p className="mt-auto pt-2.5 text-[12.5px] text-foreground/50">
                  {a.sources.map((u, i) => (
                    <a key={u} href={u} className="mr-3 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                      {a.sources.length > 1 ? `Source ${i + 1}` : "Source"}
                    </a>
                  ))}
                </p>
              </li>
            ))}
          </ul>
          <p className={body}>
            Microsoft&apos;s Copilot app connects only to the services Microsoft lists (OneDrive, Outlook.com, Google
            Drive and Gmail), and its help page shows no way to add your own server, so it can&apos;t connect to us yet{" "}
            (<a href="https://support.microsoft.com/en-us/microsoft-copilot/connecting-microsoft-copilot-to-other-services" className="underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">Microsoft</a>).
          </p>
        </section>

        <section id="editors" className="mt-14 scroll-mt-24 space-y-4">
          <h2 className={label}>Editors and tools</h2>
          <div className={body}>
            <p>Anything that accepts a remote MCP server address works the same way:</p>
          </div>
          <div className="space-y-3">
            {CLIENTS.map((c) => (
              <div key={c.name}>
                <p className="mb-1 text-xs text-foreground/50">{c.name}</p>
                <code className="block select-all whitespace-pre-wrap break-all rounded-lg border border-foreground/12 bg-background px-4 py-3 font-mono text-[13px] leading-relaxed text-primary">
                  {c.code}
                </code>
              </div>
            ))}
          </div>
          <p className={body}>
            Browsers with WebMCP switched on, in Chrome or Edge for now, can use the same tools
            straight from this site.
          </p>
        </section>

        <section id="what-to-ask" className="mt-14 scroll-mt-24 space-y-4">
          <h2 className={label}>What to ask</h2>
          <ul className={`list-disc pl-5 ${body}`}>
            {ASK.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>

        <section id="what-we-see" className="mt-14 scroll-mt-24 space-y-4">
          <h2 className={label}>What we see</h2>
          <div className={body}>
            <p>
              Your assistant decides what to send us. Our tools ask only for what they need, like a
              product name, a domain, or a situation picked from a fixed list, and we don&apos;t
              store it. We keep daily counts of each tool and request type, of which guide, stack or glossary
              entry is opened, of which kind of app connects (Claude, Cursor and the like; any other name
              counts as &quot;other&quot;), of which version of the MCP protocol each request uses, of which response formats a request says it accepts, and of which broad kind of software sends a request (browser-like, script, self-declared bot, an AI company&apos;s app such as Claude or ChatGPT, or other, never the raw text), and of how many connections and tool calls each of those kinds makes. We also keep a daily total per endpoint of
              requests, errors and average speed, with no lookup and no IP. Your IP is held in memory for up to a day
              to enforce rate limits, and our host, Vercel, keeps its own request logs. The domain
              tools look the domain up in public DNS, its registry&apos;s records, and Have I Been
              Pwned&apos;s public breach list (we download the whole list, so the domain isn&apos;t
              sent to them). If you ask us to check an MCP server we don&apos;t list, we look its
              name up in the official MCP registry, which sees that name and our server&apos;s
              address, not yours. When you ask how private a product is, the terms grade comes from{" "}
              <a href="https://tosdr.org" className="underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                ToS;DR
              </a>{" "}
              (CC BY-SA 3.0): we copy their reviews by hand (latest copy: {TOSDR_COPIED_ON}), so they never see what anyone asks.
            </p>
            <p>
              If you add us through{" "}
              <a href="https://smithery.ai/servers/privatebydefault/default-privacy" className="underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                Smithery
              </a>
              , your requests pass through Smithery&apos;s gateway, so Smithery sees them too. That gateway
              shuts down on October 31, 2026 and the connection stops working then. Connect to {MCP_URL}{" "}
              directly instead.
            </p>
            <p>
              You don&apos;t have to take our word for it: the server&apos;s code is open source on{" "}
              <a href="https://github.com/default-privacy/DefaultPrivacy.com" className="underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
                GitHub
              </a>
              .
            </p>
            <p>
              Never type a password into a chat. To check one, use the{" "}
              <a href="/password-check" className="underline hover:text-foreground">
                password checker
              </a>
              , which checks it in your browser.
            </p>
          </div>
        </section>
        </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
