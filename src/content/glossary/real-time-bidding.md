---
term: "Real-Time Bidding"
slug: "real-time-bidding"
definition: "An automated auction system where your personal data is broadcast to hundreds of advertisers in milliseconds every time you load a webpage — creating the largest data leak most people have never heard of."
category: "Surveillance"
relatedTerms:
  - "ad-tech-ecosystem"
  - "cross-device-tracking"
  - "surveillance-capitalism"
  - "digital-exhaust"
aliases:
  - "RTB"
  - "Programmatic Advertising"
  - "Ad Auction"
keywords:
  - "real time bidding privacy"
  - "RTB data leak"
  - "programmatic advertising privacy"
  - "how ads track you"
---

Every time you visit a webpage with ads, your personal data is broadcast to hundreds of companies in an auction that takes 100 milliseconds. This isn't a hypothetical — it's happening billions of times per day.

## How It Works

1. You load a webpage
2. The site's ad server sends a **bid request** to an ad exchange
3. The bid request contains your data: IP address, location, browsing history, device info, inferred demographics, interests
4. The ad exchange broadcasts this data to **hundreds of advertisers** simultaneously
5. Advertisers bid on the right to show you an ad
6. The winning advertiser's ad loads — the entire process takes ~100 milliseconds
7. **All bidders received your data**, not just the winner

## The Scale

- **Hundreds of billions** of bid requests per day globally
- Each request broadcasts personal data to **100-300+ companies**
- Major exchanges: Google Ad Exchange, Microsoft Xandr, The Trade Desk, Amazon
- Your data is broadcast an estimated **747 times per day** per user (Irish Council for Civil Liberties study)

## What Data Is Broadcast

- **Location**: Often precise GPS coordinates from mobile devices
- **Browsing history**: What sites you've visited (via cookies and tracking pixels)
- **Device information**: Device type, OS, browser, screen size
- **Inferred demographics**: Age range, gender, income bracket
- **Interest categories**: What topics you've shown interest in (health, politics, finance, etc.)
- **IAB categories**: Standardized labels like "Incest/Abuse Support", "Substance Abuse", "Debt", "Political Beliefs"

## Why It's the Biggest Data Leak

- **Volume**: More data broadcasted than any other system in history
- **No consent**: Cookie consent banners are the thin legal fiction covering this system
- **No security**: Bid stream data is routinely resold and used for surveillance
- **Government access**: Intelligence agencies have purchased RTB data to track individuals without warrants
- **Permanent**: Once data is broadcast, there's no taking it back

## What's Being Done

- **IAB Europe TCF** deemed GDPR-non-compliant by Belgian DPA (2022)
- **Google** is slowly deprecating third-party cookies (but replacing them with Topics API)
- **ICCL** has filed complaints in multiple EU countries
- **US Senator Ron Wyden** called RTB "the biggest data breach nobody talks about"

## How to Protect Yourself

1. **Use an ad blocker** — uBlock Origin blocks ad auction scripts entirely
2. **Use Brave Browser** — Blocks ads and trackers by default
3. **Use a VPN** — Masks your real IP address in bid requests
4. **Disable third-party cookies** — Reduces tracking data available
5. **Use DNS-level blocking** — Pi-hole or NextDNS block ad domains network-wide
6. **Opt out of ad personalization** — On Google, Facebook, and other platforms (limited effectiveness)
