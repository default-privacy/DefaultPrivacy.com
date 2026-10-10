---
term: "Supercookie"
slug: "supercookie"
definition: "A tracking mechanism that is more persistent than regular cookies — surviving browser clearing, private browsing mode, and even device resets — including HSTS supercookies, ETags, and ISP-injected tracking headers."
category: "Browsers"
relatedTerms:
  - "browser-fingerprinting"
  - "cross-device-tracking"
  - "ad-tech-ecosystem"
  - "third-party-tracking"
aliases:
  - "Zombie Cookie"
  - "Persistent Tracking"
  - "Evercookie"
keywords:
  - "supercookie tracking"
  - "zombie cookie"
  - "persistent browser tracking"
  - "tracking that survives clearing cookies"
---

Supercookies are tracking technologies designed to be nearly impossible to delete — they survive clearing cookies, using private browsing, and even switching browsers.

## Types of Supercookies

### HSTS Supercookies
- Exploit HTTP Strict Transport Security (HSTS) — a legitimate security feature
- Websites set unique HSTS patterns for different subdomains
- These patterns survive private browsing and cookie clearing
- Each user gets a unique "fingerprint" from their HSTS cache

### ETag Tracking
- ETags are HTTP caching identifiers meant to improve performance
- Trackers assign unique ETags to each visitor
- ETags survive cookie clearing because they're part of the browser cache
- Clearing the cache removes them, but most users only clear cookies

### ISP Tracking Headers
- ISPs like Verizon have injected unique identifiers (UIDH) into HTTP requests
- These "supercookies" are added at the network level — your browser can't block them
- Verizon was fined $1.35 million for this practice but the technology remains
- HTTPS prevents header injection, but not all traffic is HTTPS

### Flash/Silverlight Cookies (Legacy)
- Local Shared Objects (LSOs) stored outside normal cookie storage
- Survived browser cookie clearing
- Largely eliminated as Flash and Silverlight have been deprecated

### Evercookie (Proof of Concept)
- Created by researcher Samy Kamkar to demonstrate tracking persistence
- Stores identifiers in 17+ different browser locations simultaneously
- If any one location survives, the cookie regenerates everywhere
- Demonstrated the futility of simply "clearing cookies"

## Why They're Dangerous

- **Designed to be undeleteable** — They specifically circumvent user privacy controls
- **Invisible** — Users can't see or manage them through normal browser settings
- **Track across modes** — Some survive private/incognito browsing
- **Network-level injection** — ISP supercookies can't be blocked by browser settings

## Protection

1. **Use HTTPS everywhere** — Prevents ISP header injection
2. **Use Brave or Firefox** with enhanced tracking protection — Both mitigate HSTS and ETag tracking
3. **Clear cache, not just cookies** — ETags live in the browser cache
4. **Use a VPN** — Prevents ISP-level tracking injection
5. **Use Tor Browser** — Isolates all state per-site, preventing supercookie techniques
6. **Disable HSTS in privacy-sensitive scenarios** (advanced, breaks security for some sites)
