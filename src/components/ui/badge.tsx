import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide underline-offset-2 w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none outline-none geist-focus transition-[color,box-shadow,background-color] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary/92 text-primary-foreground [a&]:hover:bg-primary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground/95 [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 dark:bg-destructive/55",
        outline:
          "border-foreground/10 text-foreground/85 bg-transparent [a&]:hover:bg-foreground/[0.04]",
        heritage:
          "border-heritage/35 bg-heritage/12 text-heritage [a&]:hover:bg-heritage/18",
        success:
          "border-success/35 bg-success/12 text-success [a&]:hover:bg-success/18",
        caution:
          "border-caution/35 bg-caution/12 text-caution [a&]:hover:bg-caution/16",
        attention:
          "border-attention/35 bg-attention/12 text-attention [a&]:hover:bg-attention/18",
        technical:
          "border-technical/35 bg-technical/12 text-technical [a&]:hover:bg-technical/18",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
