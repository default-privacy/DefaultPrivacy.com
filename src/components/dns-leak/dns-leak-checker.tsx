"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Globe,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Clock3,
  Play,
} from "lucide-react"

type Resolver = {
  ip: string
  isp?: string | null
  country?: string | null
  queryCount: number
}

type StartResponse = {
  token: string
  subdomains: string[]
  mode: "infrastructure" | "fallback"
}

type ResultsResponse = {
  mode: "infrastructure" | "fallback"
  token: string
  resolvers: Resolver[]
  resolverCount: number
  isLeaking: boolean | null
}

type Status = "idle" | "testing" | "done" | "inconclusive" | "fallback" | "error"

export function DnsLeakChecker() {
  const [status, setStatus] = useState<Status>("idle")
  const [resolvers, setResolvers] = useState<Resolver[]>([])
  const [isLeaking, setIsLeaking] = useState<boolean | null>(null)

  async function run() {
    setStatus("testing")
    setResolvers([])
    setIsLeaking(null)

    let start: StartResponse
    try {
      start = await fetch("/api/dns-leak/start", { method: "POST" }).then((r) => r.json())
    } catch {
      setStatus("error")
      return
    }

    // Fire the 5 subdomain lookups. These fetches are MEANT to fail (there is no
    // web server on those hosts) — we only need the browser's DNS resolver to
    // resolve them, which our authoritative nameserver logs. Do not await success.
    await Promise.allSettled(
      start.subdomains.map((s) =>
        fetch(`https://${s}/?t=${Date.now()}`, { mode: "no-cors", cache: "no-store" }).catch(() => {}),
      ),
    )

    if (start.mode === "fallback") {
      setStatus("fallback")
      return
    }

    // Resolver logs land asynchronously — poll a few times before giving up.
    for (let i = 0; i < 6; i++) {
      await new Promise((r) => setTimeout(r, 1200))
      try {
        const res: ResultsResponse = await fetch(`/api/dns-leak/results/${start.token}`, {
          cache: "no-store",
        }).then((r) => r.json())
        if (res.resolverCount > 0) {
          setResolvers(res.resolvers)
          setIsLeaking(res.isLeaking)
          setStatus("done")
          return
        }
      } catch {
        // transient — keep polling
      }
    }

    setStatus("inconclusive")
  }

  return (
    <div className="space-y-6">
      <p className="sr-only" role="status" aria-live="polite">
        {status === "testing"
          ? "Running DNS leak test…"
          : status === "done"
            ? isLeaking
              ? "Possible DNS leak detected."
              : "No DNS leak detected."
            : status === "inconclusive"
              ? "Couldn't capture your resolver. Try running the test again."
              : status === "fallback"
                ? "Live resolver detection is offline."
                : ""}
      </p>
      {(status === "idle" || status === "error") && (
        <div className="text-center">
          <Button onClick={run} className="h-12 px-6">
            <Play className="mr-2 h-4 w-4" aria-hidden="true" />
            Test my DNS
          </Button>
          {status === "error" && (
            <p role="alert" className="mt-3 text-sm text-destructive">
              Couldn&apos;t start the test. Check your connection and try again.
            </p>
          )}
        </div>
      )}

      {status === "testing" && (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <Spinner />
          <p className="text-sm text-muted-foreground">
            Resolving test hostnames and checking which DNS servers answered…
          </p>
        </div>
      )}

      {status === "done" && (
        <div className="space-y-6">
          {/* Verdict */}
          <div
            className={`flex items-start gap-3 rounded-lg border p-4 ${
              isLeaking
                ? "border-destructive/40 bg-destructive/5"
                : "border-success/40 bg-success/5"
            }`}
          >
            {isLeaking ? (
              <ShieldAlert className="h-6 w-6 shrink-0 text-destructive" aria-hidden="true" />
            ) : (
              <ShieldCheck className="h-6 w-6 shrink-0 text-success" aria-hidden="true" />
            )}
            <div>
              <p className={`font-medium ${isLeaking ? "text-destructive" : "text-success"}`}>
                {isLeaking ? "Possible DNS leak detected" : "No DNS leak detected"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {isLeaking
                  ? "Your DNS queries were answered by more than one distinct resolver. If you're on a VPN, some queries may be bypassing its tunnel and going to your ISP."
                  : "Your DNS queries were answered by a single resolver — consistent with your VPN or resolver handling all of them."}
              </p>
            </div>
          </div>

          {/* Resolver table */}
          <div className="rounded-lg border">
            <div className="border-b px-4 py-2.5">
              <p className="text-sm font-medium">
                DNS servers that answered ({resolvers.length})
              </p>
            </div>
            <div className="divide-y">
              {resolvers.map((r) => (
                <div key={r.ip} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm text-foreground/85">{r.ip}</p>
                    {r.isp && (
                      <p className="truncate text-xs text-muted-foreground">{r.isp}</p>
                    )}
                  </div>
                  {r.country && (
                    <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {r.country}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Button variant="outline" size="sm" onClick={run}>
              Run again
            </Button>
          </div>
        </div>
      )}

      {status === "inconclusive" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-caution/40 bg-caution/5 p-4">
            <Clock3 className="h-6 w-6 shrink-0 text-caution" aria-hidden="true" />
            <div>
              <p className="font-medium text-caution">Couldn&apos;t capture your resolver</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The test hostnames didn&apos;t reach our nameserver in time — often because a resolver
                cached them or the lookups were blocked. Try running it again.
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button variant="outline" size="sm" onClick={run}>
              Run again
            </Button>
          </div>
        </div>
      )}

      {status === "fallback" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-foreground/15 bg-foreground/[0.03] p-4">
            <AlertTriangle className="h-6 w-6 shrink-0 text-foreground/60" aria-hidden="true" />
            <div>
              <p className="font-medium text-foreground/85">Live resolver detection is coming online</p>
              <p className="mt-1 text-sm text-muted-foreground">
                The measurement server that identifies which DNS resolvers answered your queries
                isn&apos;t connected yet, so we can&apos;t show your resolvers right now. Everything below
                explains what a DNS leak is and how to check manually in the meantime.
              </p>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <h3 className="text-sm font-medium">Check manually</h3>
            </div>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Connect to your VPN, then visit a dedicated DNS-leak checker and note the servers shown.</li>
              <li>If any server belongs to your ISP rather than your VPN provider, DNS is leaking.</li>
              <li>Fix it by enabling your VPN&apos;s built-in DNS and its kill switch / leak protection.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
