---
term: "Advertising ID"
slug: "advertising-id"
definition: "A unique identifier assigned to your mobile device by the operating system, used by apps and advertisers to track your behavior across applications."
category: "Surveillance"
relatedTerms:
  - "third-party-tracking"
  - "browser-fingerprinting"
---

Every smartphone has an advertising ID — IDFA on iOS, GAID on Android — that enables cross-app tracking.

## What It Enables

- Apps share your advertising ID with data brokers
- Data brokers combine data from multiple apps to build a profile
- Advertisers target you based on apps you use, places you visit, things you buy
- Your real identity can often be inferred from the behavioral data

## How to Limit It

**iOS:**
- Settings > Privacy > Tracking > Disable "Allow Apps to Request to Track"
- This effectively zeros out your IDFA

**Android:**
- Settings > Privacy > Ads > Delete advertising ID
- On Android 12+, you can opt out entirely

## Beyond the Advertising ID

Even with the advertising ID disabled, apps can use other signals to track you: IP address, WiFi network, device model, installed app list, and more. The advertising ID is just the easiest method.
