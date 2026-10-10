---
term: "DNS over TLS"
slug: "dns-over-tls"
definition: "A protocol that encrypts DNS queries using TLS, preventing ISPs and network observers from seeing which websites you're looking up."
category: "Networking"
relatedTerms:
  - "dns-over-https"
  - "dns-leak"
  - "tls"
---

DNS over TLS (DoT) wraps DNS queries in a TLS connection, encrypting them in transit. It serves the same purpose as DNS over HTTPS but uses a dedicated port.

## How It Differs from DoH

- **DoT** uses port 853 — network admins can see you're using encrypted DNS
- **DoH** uses port 443 (same as HTTPS) — encrypted DNS looks like normal web traffic
- DoT is easier to block; DoH is harder to distinguish from regular browsing

## Providers

- Cloudflare (1.1.1.1)
- Quad9 (9.9.9.9)
- Google (8.8.8.8)
- NextDNS (custom filtering)

## Setup

- **Android 9+**: Settings > Network > Private DNS
- **Linux**: systemd-resolved supports DoT natively
- **Router-level**: Some routers support DoT configuration
