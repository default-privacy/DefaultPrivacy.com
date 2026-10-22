"use client"

import { useEffect } from "react"
import { Footer } from "@/components/common/footer"
import { Header } from "@/components/common/header"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

/**
 * Root route-segment error boundary. Catches any error thrown while rendering a
 * route that does not have its own nested error.tsx (the /directory segment has
 * one of its own). With the data layer now rethrowing real DB errors (N6), a DB
 * outage surfaces here as a branded 500 — never a fake-empty 200.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Telemetry seam — see global-error.tsx for the app-crash capture point.
    // TODO(N29): forward to Sentry.captureException(error) once wired.
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-16">
        <div className="text-center max-w-md mx-auto">
          <AlertTriangle className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-medium tracking-cinematic text-foreground mb-4">Something Went Wrong</h1>
          <p className="text-muted-foreground mb-8">
            We hit an unexpected problem loading this page. This is usually
            temporary &mdash; try again in a moment.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => reset()}>Try Again</Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
