import type { Metadata } from "next"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import summary from "@/data/mcp-scan-summary.json"

export const metadata: Metadata = {
  title: "We checked every hosted MCP server | Default Privacy",
  description:
    "A read-only scan of every hosted server in the official MCP registry: how many ask you to sign in before showing what they can do, and how many label which tools only look.",
}

// The exact user agent the October 2026 scan sent (later scans point at this page instead).
const OCTOBER_USER_AGENT =
  "DefaultPrivacy-MCP-scan/0.1 (+https://defaultprivacy.com/ai; read-only: initialize and tools/list only; opt out: privacy@defaultprivacy.com)"

const n = (x: number) => x.toLocaleString("en-US")
const o = summary.openHosts
const by = summary.hostsByOutcome as Record<string, number>
const signIn = by.sign_in ?? 0
const refused = (by.refused_url ?? 0) + (by.refused_address ?? 0)

const label = "text-xs font-medium tracking-[var(--tracking-cinematic-wide)] text-foreground/50"
const body = "space-y-4 text-sm leading-relaxed text-foreground/70"
const link = "underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm"
const th = "py-2 pr-4 text-left font-medium text-foreground/60"
const td = "py-2 pr-4"
const tdNum = "py-2 text-right tabular-nums text-foreground"

function Table({ rows, head }: { head: [string, string]; rows: [string, number][] }) {
  return (
    <table className="w-full border-collapse text-sm text-foreground/70">
      <thead>
        <tr className="border-b border-foreground/10">
          <th className={th}>{head[0]}</th>
          <th className={`${th} text-right`}>{head[1]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k} className="border-b border-foreground/5">
            <td className={td}>{k}</td>
            <td className={tdNum}>{n(v)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function McpScanPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pb-24 pt-14">
        <h1 className="text-3xl font-extralight tracking-[var(--tracking-cinematic)]">
          We checked every hosted MCP server
        </h1>
        <p className={`mt-6 ${body}`}>
          MCP servers are add-ons that let AI assistants act for you: read files, send messages, make payments.
          On 16 October 2026 we asked every hosted server in the{" "}
          <a href="https://registry.modelcontextprotocol.io" className={link}>official MCP registry</a> what it can
          do. We never asked any of them to do anything.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT WE FOUND</h2>
          <div className={body}>
            <p className="text-base text-foreground">
              One in three asks you to sign in before it shows what it can do.
            </p>
            <p>
              {n(signIn)} of the {n(summary.hosts)} hosts we reached asked for a sign-in before they would list their
              tools. A sign-in is not a bad sign: it usually means the server protects an account&apos;s data. It does
              mean that for one server in three, you cannot see what the add-on can do until you have handed over an
              account.
            </p>
            <p className="pt-4 text-base text-foreground">
              One in three of the open ones doesn&apos;t say which tools only look.
            </p>
            <p>
              MCP lets a server label each tool as read-only, or as able to change or delete things. Your AI app can
              use those labels to ask you before a risky step. Of the {n(o.total)} hosts that showed their tools:
            </p>
          </div>
          <Table
            head={["What the server says about its tools", "Hosts"]}
            rows={[
              ["Every tool labelled read-only", o.allReadOnly],
              ["Some tools labelled destructive", o.someDestructive],
              ["Labels some tools, marks none destructive", o.labelsNoDestructive],
              ["No labels at all", o.noLabels],
              ["Listed no tools", o.noTools],
            ]}
          />
          <p className={body}>
            These are the servers&apos; own labels. We report what they say; we cannot check from outside whether a tool
            labelled read-only really is. The labels are a recent addition to MCP, so some servers without them may
            simply not have updated yet.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT WE DID</h2>
          <ol className={`list-decimal pl-5 ${body}`}>
            <li>
              Downloaded the latest version of every active server in the registry: {n(summary.registryEntries)} entries.
            </li>
            <li>
              Kept the {n(summary.hostedEntries)} that list a web address. The other {n(summary.packageOnlyEntries)} are
              packages you download and run yourself; a later scan will cover those.
            </li>
            <li>
              Grouped them by host. Many entries share one host (one host alone has more than 2,000), so we count hosts,
              not entries, and a few publishers cannot swing the numbers. That left {n(summary.hosts)} hosts.
            </li>
            <li>
              Sent each one the standard MCP greeting and the standard request for its tool list. Nothing else.
            </li>
          </ol>
          <p className={body}>Each host gets one result, the best answer any of its addresses gave:</p>
          <Table
            head={["Result", "Hosts"]}
            rows={[
              ["Showed its tools", by.listed ?? 0],
              ["Asked for a sign-in", signIn],
              ["Answered, but not as an MCP server", by.not_mcp ?? 0],
              ["No answer within 15 seconds", by.unreachable ?? 0],
              ["Greeted us but returned no tool list", by.error ?? 0],
              ["Refused by us (not https on port 443, or a private address)", refused],
              ...((by.opted_out ?? 0) > 0 ? [["Opted out by its owner, not contacted", by.opted_out] as [string, number]] : []),
            ]}
          />
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT WE NEVER DID</h2>
          <ul className={`list-disc pl-5 ${body}`}>
            <li>
              We never used a tool. The scanner can send only the greeting and the tool-list request, and a test checks
              that.
            </li>
            <li>We never signed in, used a key, or guessed one.</li>
            <li>
              We contacted at most three addresses per host. Most were asked once; about 440 were also asked during test
              runs the same morning, and three that stopped answering mid-reply were asked again.
            </li>
            <li>We never connected to an address inside a private network.</li>
            <li>
              Every request named Default Privacy. The requests in the October full scan also gave an opt-out address, in exactly this form (later scans point to this page instead of /ai):
            </li>
          </ul>
          <code className="block select-all overflow-x-auto whitespace-pre-wrap rounded border border-foreground/10 bg-muted/30 px-4 py-3 font-mono text-xs text-foreground">
            {OCTOBER_USER_AGENT}
          </code>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT THIS SCAN CANNOT SEE</h2>
          <ul className={`list-disc pl-5 ${body}`}>
            <li>
              What happens after sign-in. The servers most likely to touch personal data, like email, CRM and payment
              tools, are the ones most likely to ask for a login, so the open servers are not a fair sample of the risky
              ones.
            </li>
            <li>What a server actually does. A tool list is what a server says it offers, not a record of what it sends or keeps.</li>
            <li>Servers that are not in the registry.</li>
            <li>Change over time. This is one day; we plan to rerun the scan monthly.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT WE DON&apos;T PUBLISH</h2>
          <p className={body}>
            We also tried guessing what each server can do from its tool names, like &quot;send_email&quot; or
            &quot;create_payment&quot;. An independent reviewer checked a random sample of 80 of those guesses and found
            62 right, 16 wrong and 2 unclear. A tool named &quot;create_sales_order&quot; turned out to make an unsent
            draft, and one named &quot;send_message&quot; passed notes between bots. At that error rate a published count
            would wrongly list real businesses, so we don&apos;t publish counts or lists of these guesses. When you ask our MCP about one exact server, it shows the guess together with the tool name it came from, marked as a guess.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>THE DATA</h2>
          <p className={body}>
            One row per registry entry: the result, the tool count, the tool names and the servers&apos; own labels,
            without our guesses.{" "}
            <a href={summary.download} className={link}>
              Download the {summary.scanId} scan
            </a>{" "}
            (CSV, gzip, {(summary.downloadBytes / 1024 / 1024).toFixed(1)} MB).
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>OPT OUT AND CORRECTIONS</h2>
          <p className={body}>
            Server owners can opt out or report a mistake at{" "}
            <a href="mailto:privacy@defaultprivacy.com" className={link}>privacy@defaultprivacy.com</a>. We will leave
            an opted-out host out of future scans and say so in the data.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
