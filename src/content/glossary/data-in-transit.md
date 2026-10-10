---
term: "Data In Transit"
slug: "data-in-transit"
definition: "Data actively moving between locations over a network, protected by transport encryption like TLS/SSL."
category: "Data Protection"
relatedTerms:
  - "tls"
  - "https"
  - "vpn"
---

Data in transit is vulnerable to interception, modification, and eavesdropping.

## Threats

- **Eavesdropping**: Passively reading unencrypted traffic
- **Man-in-the-middle**: Intercepting and potentially modifying traffic
- **DNS hijacking**: Redirecting traffic to malicious servers

## Protection Layers

- **TLS/HTTPS**: Encrypts web traffic (standard)
- **VPN**: Encrypts all network traffic
- **End-to-end encryption**: Protects content even from intermediate servers
- **SSH**: Encrypts terminal and file transfer sessions

## The Unencrypted Gap

DNS queries, SNI headers, and traffic metadata often remain unencrypted even when content is protected. DNS-over-HTTPS and Encrypted Client Hello are closing these gaps.
