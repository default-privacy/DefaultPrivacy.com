/**
 * Shared helpers for the Default Privacy MCP server.
 *
 * Every base URL is derived from `env.NEXT_PUBLIC_URL` so the whole agent surface follows
 * wherever v5 is deployed — the public host is a one-line config change, never hardcoded.
 */

import { env } from "@/lib/env"

export const BASE_URL = env.NEXT_PUBLIC_URL.replace(/\/$/, "")

/** Canonical citation string agents should pass through when quoting the hub. */
export function citation(path = ""): string {
  const clean = path ? `/${path.replace(/^\//, "")}` : ""
  return `Default Privacy (${BASE_URL}${clean})`
}

/** Absolute URL for a site path. */
export function url(path = ""): string {
  const clean = path ? `/${path.replace(/^\//, "")}` : ""
  return `${BASE_URL}${clean}`
}

/** Wrap a JSON payload as an MCP text-content result (agents parse the text as JSON). */
export function jsonContent(payload: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        // Compact, not pretty-printed: indentation was a large share of every reply and a model reads either.
        text: JSON.stringify(payload),
      },
    ],
  }
}
