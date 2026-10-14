import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { ConnectAiCard } from "@/components/ai/connect-ai-card"
import { AI_APPS, MCP_URL } from "@/lib/mcp-connect"

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
  { name: "Claude Code", code: `claude mcp add --transport http default-privacy ${MCP_URL}` },
  { name: "Cursor (~/.cursor/mcp.json)", code: `{ "mcpServers": { "default-privacy": { "url": "${MCP_URL}" } } }` },
  { name: "VS Code (.vscode/mcp.json)", code: `{ "servers": { "default-privacy": { "type": "http", "url": "${MCP_URL}" } } }` },
]

const label = "text-xs font-medium tracking-[var(--tracking-cinematic-wide)] text-foreground/50"
const body = "space-y-4 text-sm leading-relaxed text-foreground/70"

export default function UseInYourAiPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pb-24 pt-14">
        <h1 className="text-3xl font-extralight tracking-[var(--tracking-cinematic)]">
          Use Default Privacy in your AI
        </h1>
        <p className={`mt-6 ${body}`}>
          Ask your assistant about privacy tools and it answers from this directory: DP picks first, then A to Z,
          with a link back to each listing. Free, no account, no key. How we choose picks is on{" "}
          <Link href="/how-we-pick" className="underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
            How we pick
          </Link>
          .
        </p>

        <ConnectAiCard className="mt-12" />

        <section className="mt-12 space-y-4">
          <h2 className={label}>ADD IT TO YOUR APP</h2>
          <ul className="space-y-5">
            {AI_APPS.filter((a) => a.steps).map((a) => (
              <li key={a.id} id={`app-${a.id}`} className={`scroll-mt-24 ${body}`}>
                <p className="font-medium text-foreground">{a.name}</p>
                <p>
                  {a.steps}
                  {a.note && <> {a.note}</>}{" "}
                  {a.sources.map((u, i) => (
                    <a key={u} href={u} className="mr-2 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
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
          <div className={body}>
            <p>Editors and other tools that accept a remote MCP server URL work the same way:</p>
          </div>
          <div className="space-y-3">
            {CLIENTS.map((c) => (
              <div key={c.name}>
                <p className="mb-1 text-xs text-foreground/50">{c.name}</p>
                <code className="block select-all overflow-x-auto whitespace-pre rounded border border-foreground/10 bg-muted/30 px-4 py-3 font-mono text-xs text-foreground">
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

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT TO ASK</h2>
          <ul className={`list-disc pl-5 ${body}`}>
            {ASK.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>

        <section id="what-we-see" className="mt-12 scroll-mt-24 space-y-4">
          <h2 className={label}>WHAT WE SEE</h2>
          <div className={body}>
            <p>
              Your assistant sends us only the lookup it needs, like a product name, never your
              conversation, and we don&apos;t store it. We keep daily counts of each tool and request
              type, of which kind of app connects (Claude, Cursor and the like; any other name
              counts as &quot;other&quot;), of which version of the MCP protocol each request uses, of which response formats a request says it accepts, and of which broad kind of software sends a request (browser-like, script, self-declared bot or other, never the raw text). Each request also leaves a log line with its
              time, status and speed, but no lookup and no IP. Your IP is held in memory for up to a day
              to enforce rate limits, and our host, Vercel, keeps its own request logs. The domain
              tools look the domain up in public DNS, its registry&apos;s records, and Have I Been
              Pwned&apos;s public breach list (we download the whole list, so the domain isn&apos;t
              sent to them). If you ask us to check an MCP server we don&apos;t list, we look its
              name up in the official MCP registry, which sees that name and our server&apos;s
              address, not yours.
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
      </main>
      <Footer />
    </div>
  )
}
