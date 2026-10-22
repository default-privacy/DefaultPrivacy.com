import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { PARTNER_REVENUE_SECTION_ID } from "@/components/common/partner-revenue-disclosure"
import { SHOP_LIVE, SHOP_URL } from "@/lib/shop"

export const metadata: Metadata = {
  title: "Transparency | Default Privacy",
  description:
    "How this site earns (and doesn't), and where our bias is.",
}

// The target of every "How we earn" disclosure link on the site. Keep the claims here
// checkable.
export default function TransparencyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pb-24 pt-14">
        <h1 className="text-3xl font-extralight tracking-[var(--tracking-cinematic)]">
          Transparency
        </h1>

        <section id={PARTNER_REVENUE_SECTION_ID} className="mt-12 space-y-4 scroll-mt-24">
          <h2 className="text-xs font-medium tracking-[var(--tracking-cinematic-wide)] text-muted-foreground">
            HOW WE EARN
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-foreground-soft">
            <p>
              <strong className="font-medium text-foreground">The directory takes no money.</strong>{" "}
              Listings aren&apos;t paid placements, rankings aren&apos;t for sale, and there are no
              affiliate links — in the directory or anywhere else on this site. No vendor pays us
              anything when you choose their tool.
            </p>
            {SHOP_LIVE ? (
              <p>
                <strong className="font-medium text-foreground">We sell products, first-party.</strong>{" "}
                We run a{" "}
                <a href={SHOP_URL} rel="noopener" className="underline hover:text-foreground">
                  shop
                </a>{" "}
                that buys vouchers and goods from vendors already in our directory, and resells them. When we
                stock a vendor, its directory listing says so plainly, and nothing else on the listing
                changes because of it.
              </p>
            ) : (
              <p>
                Today this site sells nothing: no ads, no subscriptions, no checkout. The free tools
                are free, the guides are free, the agent API is free.
              </p>
            )}
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-xs font-medium tracking-[var(--tracking-cinematic-wide)] text-muted-foreground">
            WHERE OUR BIAS ACTUALLY IS
          </h2>
          <p className="text-sm leading-relaxed text-foreground-soft">
            We do have opinions. We prefer open source. We think jurisdiction matters more than most
            reviewers do. We think a company that can be compelled is different from one that
            cannot, even when both are behaving well today. Those judgments shape what we include
            and how we describe it — that is a viewpoint you should weigh, and it is a different
            thing from being paid to say something.
          </p>
          <p className="text-sm leading-relaxed text-foreground-soft">
            How we choose our picks, and what a pick does not mean, is on{" "}
            <Link href="/how-we-pick" className="underline underline-offset-2 hover:text-foreground">
              How we pick
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
