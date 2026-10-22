import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { getGuideBySlug } from "@/lib/guides"
import { BASELINE, SITUATIONS, type SituationItem as Item } from "@/lib/situations"
import { getStackBySlug } from "@/lib/stacks"

export const metadata: Metadata = {
  title: "Start here | Default Privacy",
  description:
    "Not sure where to begin? Start with the standard setup that suits most people, or pick the situation that changes the advice: working from home, journalism, leaving Google, a new phone, accounts and logins, your home network, AI, or clearing what is already online.",
  alternates: { canonical: "https://defaultprivacy.com/start" },
}

type Resolved = { href: string; title: string; kind: "Guide" | "Stack" }

async function resolve(item: Item): Promise<Resolved | null> {
  if (item.kind === "guide") {
    const g = await getGuideBySlug(item.slug)
    return g ? { href: `/guides/${g.slug}`, title: g.title, kind: "Guide" } : null
  }
  const s = await getStackBySlug(item.slug)
  return s ? { href: `/stacks/${s.slug}`, title: s.title, kind: "Stack" } : null
}

async function resolveAll(items: Item[]): Promise<Resolved[]> {
  return (await Promise.all(items.map(resolve))).filter((r): r is Resolved => r !== null)
}

const label = "text-xs font-medium tracking-[var(--tracking-cinematic-wide)] text-muted-foreground"
const body = "text-sm leading-relaxed text-foreground-soft"
const link = "underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm"

function ItemList({ items }: { items: Resolved[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((i) => (
        <li key={i.href} className="text-sm leading-relaxed">
          <Link href={i.href} className={`${link} text-foreground`}>
            {i.title}
          </Link>{" "}
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{i.kind}</span>
        </li>
      ))}
    </ul>
  )
}

export default async function StartPage() {
  const baseline = await resolveAll(BASELINE)
  const situations = await Promise.all(
    SITUATIONS.map(async (s) => ({ ...s, resolved: await resolveAll(s.items) })),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pb-24 pt-14">
        <h1 className="text-3xl font-extralight tracking-[var(--tracking-cinematic)]">Start here</h1>
        <p className={`mt-6 ${body}`}>
          Most people need the same first steps. Some situations change the advice. Begin with the
          standard setup, or go straight to the situation that sounds like yours.
        </p>

        <section className="mt-12">
          <h2 className={label}>THE STANDARD SETUP</h2>
          <p className={`mt-3 ${body}`}>
            A calm, practical route that is enough for most people. Do these first.
          </p>
          <ItemList items={baseline} />
        </section>

        <section className="mt-12">
          <h2 className={label}>IF YOUR SITUATION CHANGES THE ADVICE</h2>
          <div className="mt-4 space-y-8">
            {situations.map((s) =>
              s.resolved.length === 0 ? null : (
                <div key={s.name}>
                  <h3 className="text-base font-medium text-foreground">{s.name}</h3>
                  <p className={`mt-1 ${body}`}>{s.blurb}</p>
                  <ItemList items={s.resolved} />
                </div>
              ),
            )}
          </div>
        </section>

        <section className="mt-12">
          <p className={body}>
            Looking for something else? Browse the{" "}
            <Link href="/guides" className={link}>
              Field Guide
            </Link>
            , the{" "}
            <Link href="/stacks" className={link}>
              stacks
            </Link>{" "}
            or the{" "}
            <Link href="/directory" className={link}>
              directory
            </Link>
            . How we write is on the{" "}
            <Link href="/editorial-policy" className={link}>
              editorial policy
            </Link>{" "}
            page.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
