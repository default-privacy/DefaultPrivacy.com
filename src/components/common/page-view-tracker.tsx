"use client"

import { useEffect } from "react"
import { track, type AnalyticsEvent } from "@/lib/analytics"

/**
 * Fires one analytics event when the page mounts — for funnel stage views
 * (directory_view, protect_view). Serialize the event so the effect keys on
 * content, not object identity, and fires exactly once per distinct event.
 */
export function PageViewTracker({ event }: { event: AnalyticsEvent }) {
  const eventKey = JSON.stringify(event)

  useEffect(() => {
    track(JSON.parse(eventKey) as AnalyticsEvent)
  }, [eventKey])

  return null
}
