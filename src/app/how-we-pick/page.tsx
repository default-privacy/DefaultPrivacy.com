import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"

export const metadata: Metadata = {
  title: "How we pick | Default Privacy",
  description:
    "What a DP pick is, what we look at, what a pick does not mean, and how to tell us we got one wrong.",
  alternates: { canonical: "https://defaultprivacy.com/how-we-pick" },
}

const label = "text-xs font-medium tracking-[var(--tracking-cinematic-wide)] text-muted-foreground"
const body = "space-y-4 text-sm leading-relaxed text-foreground-soft"
const strong = "font-medium text-foreground"
const link = "underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm"

const LOOKS_AT = [
  "It fits a real need and works today.",
  "It is maintained: recent releases, someone answering problems.",
  "It is open source where that matters for trust.",
  "It has a published independent audit, when we have opened one and read it.",
  "Its business model is clear: how it pays for itself is no mystery.",
  "It has no unresolved serious incident.",
  "A beginner can use it without help.",
  "It does not depend on a big-tech surveillance business model.",
]

export default function HowWePickPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pb-24 pt-14">
        <h1 className="text-3xl font-extralight tracking-[var(--tracking-cinematic)]">How we pick</h1>
        <p className={`mt-6 ${body}`}>
          A DP pick is where we would send an ordinary person first in a category. It is our
          editorial judgment, and this page says how we make it and what it does not mean.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT A DP PICK IS</h2>
          <div className={body}>
            <p>
              A starting point. Each category has up to three picks, in the order we would suggest
              them. Position is our order: the first pick is the one we would try first.
            </p>
            <p>
              Some categories have fewer than three picks, or none, because nothing cleared the bar.
              We would rather show no pick than a weak one.
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT WE LOOK AT</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground-soft">
            {LOOKS_AT.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>WHAT A PICK IS NOT</h2>
          <div className={body}>
            <p>
              <strong className={strong}>It is not a security guarantee.</strong> No tool is safe
              for everyone. A pick fits most people in its category, not every threat.
            </p>
            <p>
              An audit is not required. We name an audit in a pick's reason only when we opened the
              report; if a reason says nothing about audits, we have not verified one.
            </p>
            <p>
              Picks are our judgment. We review them by hand from time to time and when someone tells
              us about a problem, such as a sale, a serious incident, or a project going quiet.
            </p>
            <p>
              <strong className={strong}>No vendor can pay for or influence a pick.</strong> This
              site takes no affiliate money and no payment for listing. See{" "}
              <Link href="/transparency" className={link}>
                Transparency
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>HOW LISTS ARE ORDERED</h2>
          <p className={body}>
            Picks come first, in our order for the category you are viewing. Everything else follows
            from A to Z. A tool being lower on the list says nothing against it. Many good tools are
            not picks. You can also sort the directory by name.
          </p>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className={label}>IF YOU DISAGREE</h2>
          <p className={body}>
            Tell us at{" "}
            <a href="mailto:privacy@defaultprivacy.com?subject=DP%20pick" className={link}>
              privacy@defaultprivacy.com
            </a>
            . If you have a source we missed, send it and we will look again. More on how we vet
            listings is in the{" "}
            <Link href="/methodology" className={link}>
              methodology
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
