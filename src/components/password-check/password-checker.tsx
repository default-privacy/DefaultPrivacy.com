"use client"

import { useState, useEffect } from "react"
import type { ZXCVBNResult } from "zxcvbn"
import { EyeIcon, EyeOffIcon, AlertTriangleIcon, CheckCircleIcon, ShieldAlertIcon, ClockIcon, InfoIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

type BreachResult = {
  checked: boolean
  breached: boolean
  count: number
}

const scoreLabels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"]
const scoreTextColors = [
  "text-destructive",
  "text-attention",
  "text-caution",
  "text-primary",
  "text-success",
]

function formatCrackTime(display: string): string {
  if (display === "less than a second") return "instant"
  return display
}

async function checkPwnedPassword(password: string): Promise<BreachResult> {
  try {
    // SHA-1 hash the password
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest("SHA-1", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("").toUpperCase()

    const prefix = hashHex.slice(0, 5)
    const suffix = hashHex.slice(5)

    // k-anonymity: only send first 5 chars of hash
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      signal: AbortSignal.timeout(5000),
    })
    if (!response.ok) return { checked: false, breached: false, count: 0 }

    const text = await response.text()
    const lines = text.split("\n")

    for (const line of lines) {
      const [hashSuffix, countStr] = line.split(":")
      if (hashSuffix.trim() === suffix) {
        return { checked: true, breached: true, count: parseInt(countStr.trim(), 10) }
      }
    }

    return { checked: true, breached: false, count: 0 }
  } catch {
    return { checked: false, breached: false, count: 0 }
  }
}

export function PasswordChecker() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [breach, setBreach] = useState<BreachResult>({ checked: false, breached: false, count: 0 })
  const [isCheckingBreach, setIsCheckingBreach] = useState(false)

  const [debouncedPassword, setDebouncedPassword] = useState("")
  const [result, setResult] = useState<ZXCVBNResult | null>(null)

  // Debounce the password analysis so typing and scrolling stay smooth
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedPassword(password), 150)
    return () => clearTimeout(timer)
  }, [password])

  // Lazy-load zxcvbn (~800KB) only once a password is entered, keeping it out
  // of the /password-check first-load bundle.
  useEffect(() => {
    if (debouncedPassword.length === 0) {
      setResult(null)
      return
    }
    let cancelled = false
    import("zxcvbn").then(({ default: zxcvbn }) => {
      if (cancelled) return
      setResult(zxcvbn(debouncedPassword))
    })
    return () => {
      cancelled = true
    }
  }, [debouncedPassword])

  const score = result?.score ?? 0

  // Derive display breach: when <4 chars show default, otherwise use async result
  const displayBreach =
    password.length < 4 ? { checked: false, breached: false, count: 0 } : breach

  // Debounced breach check — only run when password has 4+ chars
  useEffect(() => {
    if (password.length < 4) return

    let cancelled = false
    const timer = setTimeout(async () => {
      setIsCheckingBreach(true)
      const result = await checkPwnedPassword(password)
      if (cancelled) return // a newer input superseded this request
      setBreach(result)
      setIsCheckingBreach(false)
    }, 500)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [password])

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          aria-label="Password to analyze"
          placeholder="Type a password to analyze..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pr-12 text-lg h-14 font-mono"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOffIcon className="h-4 w-4" aria-hidden="true" /> : <EyeIcon className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {isCheckingBreach
          ? "Checking whether this password appears in known breaches…"
          : displayBreach.breached
            ? `Warning: this password appears in ${displayBreach.count.toLocaleString()} known data breaches.`
            : displayBreach.checked
              ? "This password was not found in known breaches."
              : ""}
      </p>

      {result && password.length > 0 && (
        <>
          {/* Strength meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold ${scoreTextColors[score]}`}>
                {scoreLabels[score]}
              </span>
              <span className="text-sm text-muted-foreground">
                {score}/4
              </span>
            </div>
            <Progress value={(score + 1) * 20} className="h-2" />
          </div>

          {/* Crack time */}
          <div className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Estimated Crack Time</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Online attack</div>
                <div className="text-lg font-medium tracking-cinematic text-foreground/90">
                  {formatCrackTime(result.crack_times_display.online_throttling_100_per_hour as string)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">100 guesses/hour</div>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Online (no throttle)</div>
                <div className="text-lg font-medium tracking-cinematic text-foreground/90">
                  {formatCrackTime(result.crack_times_display.online_no_throttling_10_per_second as string)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">10 guesses/sec</div>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Offline (slow hash)</div>
                <div className="text-lg font-medium tracking-cinematic text-foreground/90">
                  {formatCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second as string)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">10K guesses/sec</div>
              </div>
              <div className="rounded-md bg-muted/50 p-3">
                <div className="text-xs text-muted-foreground mb-1">Offline (fast hash)</div>
                <div className="text-lg font-medium tracking-cinematic text-foreground/90">
                  {formatCrackTime(result.crack_times_display.offline_fast_hashing_1e10_per_second as string)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">10B guesses/sec</div>
              </div>
            </div>
          </div>

          {/* Breach check */}
          <div className={`rounded-lg border p-4 ${
            displayBreach.breached ? "border-destructive/50 bg-destructive/5" :
            displayBreach.checked ? "border-success/50 bg-success/5" :
            ""
          }`}>
            <div className="flex items-center gap-2">
              {isCheckingBreach ? (
                <>
                  <div className="h-4 w-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                  <span className="text-sm text-muted-foreground">Checking breaches...</span>
                </>
              ) : displayBreach.breached ? (
                <>
                  <ShieldAlertIcon className="h-5 w-5 text-destructive" />
                  <div>
                    <span className="text-sm font-medium text-destructive">
                      This password has been seen in {displayBreach.count.toLocaleString()} data breach{displayBreach.count !== 1 ? "es" : ""}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Found via Have I Been Pwned. Do not use this password anywhere.
                    </p>
                  </div>
                </>
              ) : displayBreach.checked ? (
                <>
                  <CheckCircleIcon className="h-5 w-5 text-success" />
                  <div>
                    <span className="text-sm font-medium text-success">Not found in known breaches</span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      This password hasn&apos;t appeared in the Have I Been Pwned database.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Type at least 4 characters to check breaches</span>
                </>
              )}
            </div>
          </div>

          {/* Pattern analysis */}
          {result.sequence.length > 0 && (
            <div className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangleIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Detected Patterns</span>
              </div>

              <div className="space-y-2">
                {result.sequence.map((seq, i) => (
                  <div key={i} className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-background px-1.5 py-0.5 rounded">
                        {seq.token}
                      </code>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {seq.pattern === "dictionary" ? `dictionary (${(seq as unknown as Record<string, unknown>).dictionary_name})` :
                       seq.pattern === "spatial" ? "keyboard pattern" :
                       seq.pattern === "repeat" ? "repeated characters" :
                       seq.pattern === "sequence" ? "sequential" :
                       seq.pattern === "date" ? "date pattern" :
                       seq.pattern === "bruteforce" ? "random" :
                       seq.pattern}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {(result.feedback.warning || result.feedback.suggestions.length > 0) && (
            <div className="rounded-lg border p-4 space-y-3">
              <span className="text-sm font-medium">Suggestions</span>

              {result.feedback.warning && (
                <div className="flex items-start gap-2 text-sm text-caution">
                  <AlertTriangleIcon className="h-4 w-4 shrink-0 mt-0.5" />
                  {result.feedback.warning}
                </div>
              )}

              {result.feedback.suggestions.length > 0 && (
                <ul className="space-y-1.5">
                  {result.feedback.suggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">-</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Stats */}
          <Separator />

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-medium tracking-cinematic text-foreground/90">{password.length}</div>
              <div className="text-xs text-muted-foreground">Characters</div>
            </div>
            <div>
              <div className="text-2xl font-medium tracking-cinematic text-foreground/90">{result.guesses.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Guesses Needed</div>
            </div>
            <div>
              <div className="text-2xl font-medium tracking-cinematic text-foreground/90">{result.sequence.length}</div>
              <div className="text-xs text-muted-foreground">Patterns Found</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
