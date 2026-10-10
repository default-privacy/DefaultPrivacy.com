"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { ScanSearch } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

export function ScannerForm() {
  const [url, setUrl] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return

    // Extract domain from URL
    let domain = url.trim()
    try {
      const parsed = new URL(domain.startsWith("http") ? domain : `https://${domain}`)
      domain = parsed.hostname
    } catch {
      // If parsing fails, just use the input as-is
      domain = domain.replace(/^https?:\/\//, "").split("/")[0]
    }

    startTransition(() => {
      router.push(`/scanner/results?domain=${encodeURIComponent(domain)}`)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mx-auto">
      <Input
        id="scanner-url"
        type="text"
        aria-label="Website URL to scan"
        placeholder="Enter a website URL (e.g., example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
        disabled={isPending}
      />
      <Button type="submit" className="group brand2-btn-primary brand2-focus" disabled={isPending || !url.trim()}>
        {isPending ? (
          <>
            <Spinner className="mr-2" />
            Scanning...
          </>
        ) : (
          <>
            <ScanSearch className="h-4 w-4 mr-2 brand2-icon-breathe" aria-hidden />
            Scan
          </>
        )}
      </Button>
    </form>
  )
}
