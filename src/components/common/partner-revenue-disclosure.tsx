import Link from "next/link"
import { cn } from "@/lib/utils"

/** Anchor on /transparency — link here from inline disclosures */
export const PARTNER_REVENUE_SECTION_ID = "directory-and-partners"

const transparencyHref = `/transparency#${PARTNER_REVENUE_SECTION_ID}`

type PartnerRevenueDisclosureProps = {
  variant: "canonical" | "inline" | "directory-note" | "partner-cta"
  /** When set, names the vetted partner (e.g. managed erasure) */
  partnerName?: string
  className?: string
}

export function PartnerRevenueDisclosure({
  variant,
  partnerName,
  className,
}: PartnerRevenueDisclosureProps) {
  if (variant === "canonical") {
    return (
      <div className={cn("space-y-4 text-sm leading-relaxed text-foreground/55", className)}>
        <p>
          <strong className="font-medium text-foreground/75">Tools directory.</strong> We don&apos;t put
          affiliate links in our tool directory, and listings aren&apos;t paid placements. Tools are included
          and ranked on Privacy Protocol data — not because a vendor paid us.
        </p>
        <p>
          <strong className="font-medium text-foreground/75">Affiliate links.</strong> Some outbound links to
          tools may be affiliate links. When one is, we&apos;ll tell you next to the link — and you can always
          reach the tool without it.
        </p>
        <p className="text-foreground/50">
          Directory rankings are never for sale — they&apos;re driven by Privacy Protocol data, not payment.
        </p>
      </div>
    )
  }

  if (variant === "directory-note") {
    return (
      <p className={cn("text-[13px] leading-relaxed text-foreground/50", className)}>
        Listings aren&apos;t paid placements — we don&apos;t use affiliate links in the directory.{" "}
        <Link href={transparencyHref} className="text-foreground/70 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
          How we earn
        </Link>
      </p>
    )
  }

  if (variant === "partner-cta") {
    return (
      <p className={cn("text-xs leading-relaxed text-foreground/50", className)}>
        {partnerName ? (
          <>
            Fulfilled with {partnerName}, a vetted partner. We may earn a commission.{" "}
          </>
        ) : (
          <>We may earn a commission on partner links. </>
        )}
        <Link href={transparencyHref} className="text-foreground/65 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
          How we earn
        </Link>
      </p>
    )
  }

  // inline
  return (
    <p className={cn("text-[13px] leading-relaxed text-foreground/50", className)}>
      We don&apos;t put affiliate links in our tool directory. When we recommend a partner on a service
      page, we disclose it next to the link.{" "}
      <Link href={transparencyHref} className="text-foreground/70 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
        How we earn
      </Link>
    </p>
  )
}
