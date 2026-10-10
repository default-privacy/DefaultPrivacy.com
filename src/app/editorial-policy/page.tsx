import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"

export const metadata: Metadata = {
  title: "Editorial policy | Default Privacy",
  description:
    "How Default Privacy writes its Field Guide and keeps it honest: sources, facts versus opinion, dates, testing, corrections, independence and the use of AI tools.",
  alternates: { canonical: "https://defaultprivacy.com/editorial-policy" },
}

const label = "text-xs font-medium tracking-[var(--tracking-cinematic-wide)] text-foreground/50"
const body = "space-y-4 text-sm leading-relaxed text-foreground/70"
const strong = "font-medium text-foreground"
const link = "underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm"

const LAST_REVIEWED = "October 10, 2026"

export default function EditorialPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pb-24 pt-14">
        <h1 className="text-3xl font-extralight tracking-[var(--tracking-cinematic)]">Editorial policy</h1>
        <p className={`mt-6 ${body}`}>
          This page says how the Field Guide is written and what you can hold us to. It covers the
          guides. How the directory is built is on{" "}
          <Link href="/methodology" className={link}>
            Methodology
          </Link>{" "}
          and how we choose picks is on{" "}
          <Link href="/how-we-pick" className={link}>
            How we pick
          </Link>
          .
        </p>

        <section className="mt-12 space-y-4">
          <h2 className={label}>SOURCES</h2>
          <div className={body}>
            <p>
              Every factual claim in a guide links to the page it came from: a company&apos;s own
              documentation, a project&apos;s code or release notes, or the text of a law. If we could not
              confirm a claim at its source, we cut it or say we could not confirm it.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>FACT VERSUS OPINION</h2>
          <div className={body}>
            <p>
              When a guide says &ldquo;Mullvad says&rdquo; or &ldquo;Proton states&rdquo;, it is reporting
              what the company claims. It is not a result we measured. Where we give our own view, we label
              it &ldquo;our reading&rdquo; and we say what could make us wrong.
            </p>
            <p>
              <strong className={strong}>We do not run independent tests unless a guide says we did.</strong>{" "}
              Most guides summarise what makers publish about themselves, and each tells you when that is
              all it does.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>DATES</h2>
          <div className={body}>
            <p>
              Every guide shows when it was published. Guides about things that change, such as prices,
              limits, features and company policies, also carry a &ldquo;Last checked&rdquo; date. A nightly
              check lists guides that have gone 90 days without a check, using the &ldquo;Last
              checked&rdquo; date where there is one and otherwise the update or publish date. It is a list
              for a person to act on, not an automatic fix.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>CORRECTIONS</h2>
          <div className={body}>
            <p>
              If a guide is wrong, we change the text and the date. We would rather weaken a claim than
              defend it. Tell us at{" "}
              <a href="mailto:privacy@defaultprivacy.com?subject=Guide%20correction" className={link}>
                privacy@defaultprivacy.com
              </a>{" "}
              and, if you can, send the source.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>INDEPENDENCE</h2>
          <div className={body}>
            <p>
              <strong className={strong}>
                No one pays to be mentioned, and there are no affiliate links.
              </strong>{" "}
              See{" "}
              <Link href="/transparency" className={link}>
                Transparency
              </Link>
              .
            </p>
            <p>
              If we use a service ourselves, we say so on the page that discusses it. For example, our
              email security check uses an AI service as part of its grading, and our{" "}
              <Link href="/privacy" className={link}>
                privacy policy
              </Link>{" "}
              names it.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>HOW GUIDES ARE WRITTEN</h2>
          <div className={body}>
            <p>
              AI tools help us research and draft guides. The claims are then checked against the sources
              they link to, and a person decides what is published and is responsible for it.
            </p>
            <p>
              Using AI does not change the rules above. A claim without a source is cut, whoever or
              whatever drafted it.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT THIS DOES NOT PROMISE</h2>
          <div className={body}>
            <p>
              Guides are general information, not legal or professional advice, and no tool or setting
              makes anyone safe from every threat. Check the date on a page before you rely on it.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>OUR CODE IS PUBLIC</h2>
          <p className={body}>
            The code for this site and our MCP server is open source under the AGPL-3.0 licence, on{" "}
            <a href="https://github.com/default-privacy/DefaultPrivacy.com" className={link}>
              GitHub
            </a>
            . The guides and directory text remain ours; quoting them with a link back is welcome.
          </p>
        </section>

        <p className="mt-12 font-mono text-[11px] text-foreground/40">Last reviewed {LAST_REVIEWED}</p>
      </main>
      <Footer />
    </div>
  )
}
