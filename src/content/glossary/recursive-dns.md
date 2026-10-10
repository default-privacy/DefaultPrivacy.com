---
term: "Recursive DNS"
slug: "recursive-dns"
definition: "A DNS server that resolves domain names on behalf of clients by querying the DNS hierarchy, creating a log of every website you visit."
category: "Networking"
relatedTerms:
  - "dns-over-https"
  - "dns-over-tls"
  - "dns-poisoning"
---

Your recursive DNS resolver is one of the most privacy-sensitive services you use — it sees every domain name you look up.

## The Default Problem

- By default, your ISP provides your recursive DNS
- Your ISP logs every domain lookup
- This creates a complete browsing profile even with HTTPS
- ISPs may sell this data or share it with government

## Privacy-Focused Alternatives

- **Quad9** (9.9.9.9): Non-profit, blocks malware domains, no logging
- **NextDNS**: Customizable filtering, minimal logging, Swiss-based
- **Cloudflare** (1.1.1.1): Fast, logs purged after 24 hours
- **Mullvad DNS**: No logging, available over DoH and DoT

## Best Practice

Use DNS-over-HTTPS or DNS-over-TLS to encrypt your DNS queries. Without encryption, even a privacy-focused DNS provider can have your queries intercepted in transit.
