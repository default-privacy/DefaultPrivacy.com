"use client"

import { useEffect } from "react"

/**
 * Root error boundary of last resort. Fires when the root layout itself throws,
 * so it must render its own <html>/<body> and cannot rely on globals.css (which is
 * imported by the layout it is replacing). Styling is therefore inline and
 * self-contained, mirroring the Cinematic Silence dark palette.
 *
 * This is the correct home for app-crash telemetry (Sentry.captureException) and
 * the noindex signal — a crashed shell must never be indexed.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO(N29): Sentry.captureException(error) — this is the app-crash capture point.
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex" />
        <title>Something went wrong · Default Privacy</title>
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fdfcfa",
          color: "#191919",
          fontFamily:
            "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
          padding: "1.5rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <div
            aria-hidden
            style={{
              width: "3.5rem",
              height: "3.5rem",
              margin: "0 auto 1.5rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #cbc5bb",
              color: "#3b82f6",
              fontSize: "1.75rem",
              lineHeight: 1,
            }}
          >
            !
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              margin: "0 0 0.75rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              color: "#3e3c39",
              lineHeight: 1.6,
              margin: "0 0 2rem",
            }}
          >
            The site hit an unexpected problem. This is usually temporary &mdash; try
            again in a moment.
          </p>
          <button
            onClick={() => reset()}
            style={{
              cursor: "pointer",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.625rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              backgroundColor: "#191919",
              color: "#fdfcfa",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
