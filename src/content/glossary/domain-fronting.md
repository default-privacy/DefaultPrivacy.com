---
term: "Domain Fronting"
slug: "domain-fronting"
definition: "A technique that hides the true destination of a network connection by routing it through a major cloud provider, making it appear as traffic to the cloud provider."
category: "Networking"
relatedTerms:
  - "tor-bridge"
  - "obfuscation"
  - "sni"
---

Domain fronting was a powerful censorship circumvention technique that exploited CDN infrastructure.

## How It Worked

- The TLS SNI field shows a legitimate domain (e.g., google.com)
- The HTTP Host header (encrypted inside TLS) specifies the actual destination
- The CDN routes to the real destination based on the Host header
- Censors see traffic to google.com — blocking it would block all Google services

## Current Status

- Google, Amazon, and Microsoft disabled domain fronting in 2018
- Cloudflare never supported it
- This removed a critical tool for censorship circumvention
- Alternative techniques (meek, V2Ray, trojan) have partially replaced it

## Why It Mattered

Domain fronting was used by Signal, Tor, and other privacy tools to reach users in censored countries. Its loss was a significant blow to anti-censorship efforts.
