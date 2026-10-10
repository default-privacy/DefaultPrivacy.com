---
term: "What Does My ISP See"
slug: "what-does-my-isp-see"
definition: "A breakdown of exactly what information your internet service provider can monitor about your online activity, and what tools prevent this surveillance."
category: "Surveillance"
relatedTerms:
  - "vpn"
  - "dns-over-https"
  - "packet-inspection"
  - "data-retention-directive"
---

Your ISP has a privileged position — all your internet traffic passes through their network.

## Without Protection (No VPN, No DoH)

Your ISP can see:
- Every website you visit (via DNS queries and IP connections)
- When you visit each site and for how long
- How much data you transfer
- The services you use (Netflix, Zoom, torrents — identified via DPI)
- Your rough location (from your IP assignment)

## With HTTPS Only

Your ISP can see:
- Which domains you visit (via SNI and DNS)
- When and for how long
- How much data
- But NOT the specific pages or content

## With VPN

Your ISP can see:
- That you're using a VPN
- How much total data you transfer
- When you're connected
- But NOT what websites, services, or content

## With VPN + DNS-over-HTTPS

Your ISP can see:
- That you're using a VPN
- Total data volume
- Nothing else

## What ISPs Do With This Data

- Sell browsing data to advertisers (legal in the US since 2017)
- Comply with law enforcement requests
- Throttle specific services
- Build profiles for targeted advertising
- Retain data as required by law (varies by country)

## The Fix

A VPN with DNS leak protection is the single most effective tool for hiding your activity from your ISP.
