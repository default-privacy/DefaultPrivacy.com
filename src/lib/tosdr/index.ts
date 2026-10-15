/**
 * ToS;DR terms reviews, read from the committed snapshot (scripts/sync-tosdr.ts). No network.
 */

import snapshot from "@/data/tosdr-snapshot.json"
import type { TosdrService } from "./services"

export { tosdrServiceForName, tosdrServiceForSlug, TOSDR_SERVICES } from "./services"

type SnapshotService = (typeof snapshot.services)[keyof typeof snapshot.services]

export const TOSDR_ATTRIBUTION = `${snapshot.source}, ${snapshot.licence} (${snapshot.licence_url})`
export const TOSDR_COPIED_ON = snapshot.copied_on

/** A review whose newest point is older than this many months is flagged stale. */
export const STALE_MONTHS = 18

export type TermsReview = {
  by: "ToS;DR"
  service: string
  rating: string | null
  rating_scale: string
  reviewed_fully: boolean
  newest_point: string | null
  stale: boolean
  counts: { blocker: number; bad: number; neutral: number; good: number }
  points: { title: string; class: string; source: string | null; updated: string | null }[]
  url: string
  attribution: string
  copied_on: string
}

function isStale(newest: string | null, copiedOn: string): boolean {
  if (!newest) return true
  const cutoff = new Date(copiedOn)
  cutoff.setMonth(cutoff.getMonth() - STALE_MONTHS)
  return new Date(newest) < cutoff
}

export function snapshotFor(service: TosdrService): SnapshotService | null {
  return (snapshot.services as Record<string, SnapshotService>)[String(service.id)] ?? null
}

export function termsReview(service: TosdrService): TermsReview | null {
  const s = snapshotFor(service)
  if (!s) return null
  return {
    by: "ToS;DR",
    service: s.name,
    rating: s.rating,
    rating_scale: "A (best) to E (worst), ToS;DR's grade of the terms of service and privacy policy; null means ToS;DR has not graded it",
    reviewed_fully: s.reviewed_fully,
    newest_point: s.newest_point,
    stale: isStale(s.newest_point, snapshot.copied_on),
    counts: s.counts,
    points: s.points,
    url: s.url,
    attribution: TOSDR_ATTRIBUTION,
    copied_on: snapshot.copied_on,
  }
}
