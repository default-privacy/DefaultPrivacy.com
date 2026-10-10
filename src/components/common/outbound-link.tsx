"use client"

import { forwardRef, type ComponentProps } from "react"
import { cn } from "@/lib/utils"

type OutboundLinkProps = ComponentProps<"a"> & {
  /** When true, omit rel=nofollow (e.g. partner we endorse explicitly). */
  doFollow?: boolean
}

export const OutboundLink = forwardRef<HTMLAnchorElement, OutboundLinkProps>(
  function OutboundLink(
    {
      href,
      target = "_blank",
      doFollow = false,
      rel,
      className,
      children,
      ...props
    },
    ref,
  ) {
  if (!href) {
    return null
  }

  const defaultRel = `noopener noreferrer${doFollow ? "" : " nofollow"}`

    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel ?? defaultRel.trim()}
        className={cn(className)}
        {...props}
      >
        {children}
      </a>
    )
  },
)
