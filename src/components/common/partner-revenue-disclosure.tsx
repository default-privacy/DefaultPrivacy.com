import Link from "next/link"
import { cn } from "@/lib/utils"

/** Anchor on /transparency — link here from inline disclosures */
export const PARTNER_REVENUE_SECTION_ID = "directory-and-partners"

const transparencyHref = `/transparency#${PARTNER_REVENUE_SECTION_ID}`

export function PartnerRevenueDisclosure({ className }: { className?: string }) {
  return (
    <p className={cn("text-[13px] leading-relaxed text-foreground/50", className)}>
      Listings aren&apos;t paid placements — we don&apos;t use affiliate links in the directory.{" "}
      <Link href={transparencyHref} className="text-foreground/70 underline underline-offset-2 hover:text-foreground brand2-focus rounded-sm">
        How we earn
      </Link>
    </p>
  )
}
