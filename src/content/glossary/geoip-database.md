---
term: "GeoIP Database"
slug: "geoip-database"
definition: "A database that maps IP addresses to geographic locations, used for content localization, fraud detection, and unfortunately, user profiling."
category: "Networking"
relatedTerms:
  - "ip-address"
  - "vpn"
  - "geofencing"
---

GeoIP databases enable websites and services to determine your approximate location from your IP address.

## Accuracy

- Country-level: ~99% accurate
- City-level: ~50-80% accurate
- Street-level: Not possible from IP alone

## How It's Used

- **Content localization**: Showing local language and currency
- **Geo-restrictions**: Blocking access from certain countries
- **Ad targeting**: Location-based advertising
- **Fraud detection**: Flagging logins from unusual locations

## Privacy Impact

Every website you visit can estimate your location. A VPN replaces your real IP with the VPN server's IP, making GeoIP databases report the server's location instead.

## Major Providers

- MaxMind (GeoIP2/GeoLite2)
- IP2Location
- ipapi.co, ipinfo.io
