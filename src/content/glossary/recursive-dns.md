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

## Best Practice

Use DNS-over-HTTPS or DNS-over-TLS to encrypt your DNS queries. Without encryption, even a privacy-focused DNS provider can have your queries intercepted in transit.

For what to use, see [Private DNS and ad blocking](/guides/private-dns-and-ad-blocking).
