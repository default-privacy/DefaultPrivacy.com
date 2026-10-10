"use client"

import { useState, useTransition, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SearchIcon, CheckCircleIcon, AlertTriangleIcon, XCircleIcon, MailIcon, ShieldIcon, LockIcon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { checkEmailSecurity, type EmailSecurityResult } from "@/lib/actions/email-security"

const statusIcons = {
  pass: CheckCircleIcon,
  warn: AlertTriangleIcon,
  fail: XCircleIcon,
}

const statusColors = {
  pass: "text-success",
  warn: "text-caution",
  fail: "text-destructive",
}

const gradeColors: Record<string, string> = {
  A: "text-success border-success/50 bg-success/10",
  B: "text-primary border-primary/50 bg-primary/10",
  C: "text-caution border-caution/50 bg-caution/10",
  D: "text-attention border-attention/50 bg-attention/10",
  F: "text-destructive border-destructive/50 bg-destructive/10",
}

function RecordCard({ title, icon: TitleIcon, result }: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  result: { found: boolean; record: string | null; status: "pass" | "warn" | "fail"; details: string }
}) {
  const StatusIcon = statusIcons[result.status]

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TitleIcon className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusIcon className={`h-4 w-4 ${statusColors[result.status]}`} />
          <span className={`text-xs font-medium uppercase ${statusColors[result.status]}`}>
            {result.status}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">{result.details}</p>

      {result.record && (
        <div className="rounded-md bg-muted/50 p-2.5">
          <code className="text-xs font-mono break-all text-muted-foreground">{result.record}</code>
        </div>
      )}
    </div>
  )
}

export function EmailSecurityChecker() {
  const searchParams = useSearchParams()
  const [domain, setDomain] = useState("")
  const [result, setResult] = useState<EmailSecurityResult | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const prefill = searchParams.get("domain")
    if (prefill && !domain) {
      setDomain(prefill)
      startTransition(async () => {
        const res = await checkEmailSecurity(prefill)
        setResult(res)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain.trim()) return

    startTransition(async () => {
      const res = await checkEmailSecurity(domain)
      setResult(res)
    })
  }

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
        <Button type="submit" aria-label="Check email security" disabled={isPending || !domain.trim()} className="h-12 px-6">
          {isPending ? <Spinner /> : <SearchIcon className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </form>

      <p className="sr-only" role="status" aria-live="polite">
        {isPending
          ? "Checking email security…"
          : result?.success
            ? `Email security grade ${result.grade} for ${result.domain}.`
            : ""}
      </p>

      {result && (
        <>
          {result.error && (
            <div role="alert" className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
              {result.error}
            </div>
          )}

          {result.success && (
            <>
              {/* Grade */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{result.domain}</p>
                  <p className="text-sm text-muted-foreground">Email security assessment</p>
                </div>
                <div className={`flex items-center justify-center h-14 w-14 rounded-lg border-2 text-2xl font-medium tracking-cinematic text-foreground/90 ${gradeColors[result.grade]}`}>
                  {result.grade}
                </div>
              </div>

              <Separator />

              {/* Records */}
              <RecordCard
                title="SPF (Sender Policy Framework)"
                icon={MailIcon}
                result={result.spf}
              />
              <RecordCard
                title={`DKIM (DomainKeys Identified Mail)${result.dkim.found ? ` — selector: ${result.dkim.selector}` : ""}`}
                icon={LockIcon}
                result={result.dkim}
              />
              <RecordCard
                title="DMARC (Domain-based Message Authentication)"
                icon={ShieldIcon}
                result={result.dmarc}
              />

              {/* What this means */}
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-medium text-sm">What this means</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong className="text-foreground">SPF</strong> tells receiving servers which IP addresses are allowed to send email for your domain</li>
                  <li><strong className="text-foreground">DKIM</strong> adds a cryptographic signature to outgoing emails, proving they haven&apos;t been tampered with</li>
                  <li><strong className="text-foreground">DMARC</strong> tells receiving servers what to do when SPF or DKIM checks fail (reject, quarantine, or allow)</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  Without all three, attackers can send emails that appear to come from your domain (spoofing/phishing).
                </p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
