import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary/90 selection:text-primary-foreground dark:bg-input/25 border-foreground/10 hover:border-foreground/16 h-10 w-full min-w-0 rounded-md border bg-transparent px-4 py-2 text-base shadow-none transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "geist-focus",
        "aria-invalid:geist-error-field",
        className
      )}
      {...props}
    />
  )
}

export { Input }
