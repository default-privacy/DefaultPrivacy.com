---
term: "DNS over HTTPS"
abbr: "DoH"
slug: "dns-over-https"
definition: "A protocol for performing DNS resolution via the HTTPS protocol. It encrypts DNS queries, preventing ISPs, network administrators, and attackers from seeing which websites you're trying to visit."
category: "Networking"
relatedTerms:
  - "dns"
  - "encryption"
  - "https"
aliases:
  - "DoH"
seeAlso:
  - name: "NextDNS"
    slug: "nextdns"
  - name: "Quad9"
    slug: "quad9"
---

DNS over HTTPS (DoH) encrypts your DNS queries, hiding the websites you visit from your ISP and network observers. Traditional DNS queries are sent in plain text, allowing anyone on the network to see your browsing history.

## The DNS Privacy Problem

When you type "protonmail.com" in your browser:

### Without DoH
1. Your device asks a DNS server: "What's the IP for protonmail.com?"
2. This query is sent **unencrypted**
3. Your ISP, network admin, or attacker can see you're visiting ProtonMail
4. Even if the website uses HTTPS, the DNS query reveals your intent

### With DoH
1. Your DNS query is encrypted using HTTPS
2. Only you and the DNS provider can see the query
3. Network observers see encrypted traffic, nothing more

## Benefits

- **Privacy from ISP**: They can't log your DNS queries
- **Protection from DNS hijacking**: Attackers can't redirect you to malicious sites
- **Bypasses some censorship**: DNS-based blocking becomes ineffective

## Considerations

- **Trust shifts to DoH provider**: Choose a privacy-respecting provider
- **Corporate networks**: May conflict with internal DNS/filtering
- **Not complete privacy**: IP addresses can still reveal destinations

## How to Enable

- **Firefox**: Settings → Privacy & Security → Enable DNS over HTTPS
- **Chrome**: Settings → Privacy and Security → Use secure DNS
- **System-wide**: Configure your OS or router to use DoH

