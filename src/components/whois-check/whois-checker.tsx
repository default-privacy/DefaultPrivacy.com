"use client"

import { useState, useTransition, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SearchIcon, ShieldCheckIcon, ShieldAlertIcon, AlertTriangleIcon, CalendarIcon, BuildingIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { checkWhoisPrivacy, type WhoisResult } from "@/lib/actions/whois-check"

const scoreConfig = {
  good: { icon: ShieldCheckIcon, color: "text-success", border: "border-success/50 bg-success/5", label: "Privacy Protected", description: "Your registration details are hidden from public view." },
  partial: { icon: AlertTriangleIcon, color: "text-caution", border: "border-caution/50 bg-caution/5", label: "Partially Exposed", description: "Some registration details are visible in public WHOIS records." },
  exposed: { icon: ShieldAlertIcon, color: "text-destructive", border: "border-destructive/50 bg-destructive/5", label: "Information Exposed", description: "Your personal information is publicly visible in WHOIS records." },
}

export function WhoisChecker() {
  const searchParams = useSearchParams()
  const [domain, setDomain] = useState("")
  const [result, setResult] = useState<WhoisResult | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const prefill = searchParams.get("domain")
    if (prefill && !domain) {
      setDomain(prefill)
      startTransition(async () => {
        const res = await checkWhoisPrivacy(prefill)
        setResult(res)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain.trim()) return

    startTransition(async () => {
      const res = await checkWhoisPrivacy(domain)
      setResult(res)
    })
  }

  const config = result ? scoreConfig[result.privacyScore] : null
  const sensitiveFields = result?.fields.filter(f => f.sensitive) || []
  const protectedFields = result?.fields.filter(f => !f.sensitive) || []

  return (
    <div className="space-y-6">
      <form onSubmit={handleCheck} className="flex gap-2">
        <Input
          type="text"
          aria-label="Domain to check"
          placeholder="Enter a domain (e.g., example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="text-base h-12"
        />
        <Button type="submit" aria-label="Check WHOIS privacy" disabled={isPending || !domain.trim()} className="h-12 px-6">
          {isPending ? <Spinner /> : <SearchIcon className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </form>

      <p className="sr-only" role="status" aria-live="polite">
        {isPending
          ? "Checking WHOIS record…"
          : result?.success
            ? `${config?.label ?? "Result ready"} for ${result.domain}.`
            : ""}
      </p>

      {result && (
        <>
          {result.error && (
            <div role="alert" className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
              {result.error}
            </div>
          )}

          {result.success && config && (
            <>
              {/* Privacy status */}
              <div className={`rounded-lg border p-4 flex items-start gap-3 ${config.border}`}>
                <config.icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.color}`} />
                <div>
                  <p className={`font-medium ${config.color}`}>{config.label}</p>
                  <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
                </div>
              </div>

              {/* Domain info */}
              <div className="rounded-lg border p-4 space-y-3">
                <p className="font-medium">{result.domain}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {result.registrar && (
                    <div className="flex items-center gap-2">
                      <BuildingIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Registrar:</span>
                      <span className="truncate">{result.registrar}</span>
                    </div>
                  )}
                  {result.registrationDate && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Registered:</span>
                      <span>{result.registrationDate}</span>
                    </div>
                  )}
                  {result.expirationDate && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">Expires:</span>
                      <span>{result.expirationDate}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Exposed fields */}
              {sensitiveFields.length > 0 && (
                <div className="rounded-lg border border-destructive/30 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlertIcon className="h-4 w-4 text-destructive" />
                    <span className="font-medium text-sm text-destructive">
                      Exposed Information ({sensitiveFields.length} field{sensitiveFields.length !== 1 ? "s" : ""})
                    </span>
                  </div>
                  <div className="space-y-2">
                    {sensitiveFields.map((field, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 text-sm">
                        <span className="text-muted-foreground">{field.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs">{field.value}</span>
                          <Badge variant="destructive" className="text-[10px] px-1.5 py-0">exposed</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Protected fields */}
              {protectedFields.length > 0 && (
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="h-4 w-4 text-success" />
                    <span className="font-medium text-sm">Protected Fields</span>
                  </div>
                  <div className="space-y-2">
                    {protectedFields.map((field, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 text-sm">
                        <span className="text-muted-foreground">{field.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground italic">{field.value}</span>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-success border-success/50">hidden</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.fields.length === 0 && (
                <div className="rounded-lg border p-4 text-sm text-muted-foreground text-center">
                  No contact information returned by the RDAP server. This usually means the registrar has full privacy protection enabled.
                </div>
              )}

              <Separator />

              {/* What to do */}
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-medium text-sm">What to do if your info is exposed</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Enable WHOIS privacy protection through your registrar (many offer it free)</li>
                  <li>Transfer to a privacy-first registrar like Njalla that registers domains under their name</li>
                  <li>Register through a business or mailbox service rather than your personal name</li>
                  <li>Never use your home address — use a business address, mailbox service, or PO box</li>
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
