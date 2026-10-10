/**
 * Analytics Event Definitions
 *
 * Type-safe event names for the (privacy-respecting) client analytics seam.
 * Wire to Plausible, Umami, or another no-cookie provider.
 */

export type AnalyticsEvent =
  // directory_view is the only event fired today (see PageViewTracker,
  // mounted on the homepage and /directory).
  | { name: "directory_view"; surface: "home" | "directory" }
