---
term: "Mobile Ad ID"
slug: "mobile-ad-id"
definition: "A resettable identifier assigned by mobile operating systems that enables cross-app tracking for targeted advertising."
category: "Mobile"
relatedTerms:
  - "advertising-id"
  - "third-party-tracking"
  - "browser-fingerprinting"
aliases:
  - "IDFA"
  - "GAID"
---

The Mobile Ad ID (IDFA on iOS, GAID on Android) is the primary mechanism advertisers use to track you across apps.

## How It Enables Tracking

1. Every app on your phone can read the same Ad ID
2. Apps send the Ad ID to their analytics and ad SDKs
3. Data brokers collect Ad IDs from thousands of apps
4. They combine the data to build a comprehensive profile: apps used, places visited, purchases made
5. Advertisers buy access to target specific profiles

## The $200 Billion Industry

Mobile advertising revenue depends on this tracking. When Apple introduced App Tracking Transparency (ATT) in iOS 14.5, requiring opt-in consent, Facebook estimated it would lose $10 billion in annual revenue.

## How to Disable

- **iOS**: Settings > Privacy > Tracking > Turn off "Allow Apps to Request to Track"
- **Android 12+**: Settings > Privacy > Ads > Delete advertising ID

Disabling the Ad ID significantly reduces cross-app tracking but doesn't eliminate it entirely.
