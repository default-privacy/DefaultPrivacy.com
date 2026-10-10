---
term: "DNS"
slug: "dns"
definition: "Domain Name System—the internet's phone book. DNS translates human-readable domain names (example.com) into IP addresses (93.184.216.34) that computers use to connect. Every website visit triggers DNS lookups, which can reveal your browsing to your ISP or DNS provider."
category: "Networking"
relatedTerms:
  - "dns-leak"
  - "dns-over-https"
  - "vpn"
aliases:
  - "Domain Name System"
  - "DNS lookup"
  - "Name resolution"
---

DNS is one of the biggest privacy holes in normal browsing. By default, every site you visit is known to your ISP—because they handle your DNS queries.

## How DNS Works

1. You type "example.com"
2. Your device asks a DNS resolver: "What's the IP for example.com?"
3. Resolver returns the IP address
4. Your device connects to that IP

The resolver (usually your ISP or Google/Cloudflare) sees every domain you look up—your complete browsing history.

## DNS Privacy Problems

- **Unencrypted by default**: Traditional DNS is plaintext—anyone on the path can see it
- **ISP visibility**: Your ISP sees every site you visit via DNS
- **Surveillance**: Governments monitor DNS at scale
- **Manipulation**: DNS can be hijacked, censored, or used for redirects

## Privacy-Preserving DNS

### DNS over HTTPS (DoH)
- Encrypts DNS queries in HTTPS
- Hides queries from ISP (they see connection to DoH provider instead)
- Firefox, Chrome support; Cloudflare 1.1.1.1, Google 8.8.8.8

### DNS over TLS (DoT)
- Similar to DoH, different protocol
- Port 853, sometimes blocked on restrictive networks

### DNS Leaks
- When using VPN, if DNS goes through ISP instead of VPN = leak
- Your real IP can be exposed via DNS leak
- Always verify: dnsleaktest.com
