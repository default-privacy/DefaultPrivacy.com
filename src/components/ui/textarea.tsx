import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-foreground/10 hover:border-foreground/16 placeholder:text-muted-foreground dark:bg-input/25 flex field-sizing-content min-h-20 w-full rounded-md border bg-transparent px-4 py-3 text-base shadow-none transition-[color,box-shadow,border-color] outline-none geist-focus aria-invalid:geist-error-field disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
