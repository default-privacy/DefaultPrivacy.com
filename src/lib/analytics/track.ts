"use client"

import type { AnalyticsEvent } from "./events"

/**
 * Track an analytics event.
 * 
 * Currently logs to console in development.
 * Wire to Plausible, Umami, or another privacy-respecting provider.
 * 
 * Usage:
 *   import { track } from "@/lib/analytics"
 *   track({ name: "protect_view" })
 *   track({ name: "protect_tier_select", tier: "Phantom" })
 */
export function track(event: AnalyticsEvent): void {
  // Development logging
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics]", event.name, event)
  }

  // TODO: Wire to analytics provider
  // 
  // Plausible example:
  // if (typeof window !== "undefined" && window.plausible) {
  //   const { name, ...props } = event
  //   window.plausible(name, { props })
  // }
  //
  // Umami example:
  // if (typeof window !== "undefined" && window.umami) {
  //   const { name, ...data } = event
  //   window.umami.track(name, data)
  // }
  //
  // PostHog example:
  // if (typeof window !== "undefined" && window.posthog) {
  //   const { name, ...properties } = event
  //   window.posthog.capture(name, properties)
  // }
}

/**
 * Track a page view.
 * Most analytics providers auto-track page views.
 * Use this for SPA navigation or manual tracking.
 */
export function trackPageView(path: string): void {
  if (process.env.NODE_ENV === "development") {
    console.log("[analytics] pageview", path)
  }

  // TODO: Wire to analytics provider
}
