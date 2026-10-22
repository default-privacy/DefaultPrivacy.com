"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

/** The MCP address with a copy button. The only client island in the connect card. */
export function CopyAddress({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked: the address stays selectable
    }
  }

  return (
    <div className="flex items-stretch overflow-hidden rounded border border-foreground/10 bg-muted/30">
      <code className="min-w-0 flex-1 select-all break-all px-4 py-3 font-mono text-sm text-foreground">{value}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Address copied" : "Copy address"}
        className="brand2-focus flex shrink-0 items-center gap-1.5 border-l border-foreground/10 px-3 font-mono text-[12px] text-foreground-soft transition-colors hover:text-foreground"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  )
}
