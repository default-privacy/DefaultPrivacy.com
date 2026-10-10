---
term: "QUIC Protocol"
slug: "quic-protocol"
definition: "A modern transport protocol developed by Google that combines features of TCP and TLS into a single encrypted connection, reducing latency."
category: "Networking"
relatedTerms:
  - "tls"
  - "https"
  - "vpn-protocol"
---

QUIC replaces the TCP+TLS stack with a single encrypted protocol that's faster and more privacy-friendly.

## Advantages

- **Faster connections**: Combines transport and encryption handshakes
- **Always encrypted**: No unencrypted QUIC connections are possible
- **Better mobile performance**: Handles network changes (WiFi to cellular) without dropping connections
- **Multiplexed**: Multiple data streams without head-of-line blocking

## Privacy Benefits

- Encryption is mandatory — no downgrade attacks
- Connection migration means less observable network switching
- Fewer metadata leaks during handshake compared to TCP+TLS

## Privacy Concerns

- Google developed it — their implementation prioritizes their services
- Server identification (via SNI) still occurs, though ECH helps
- Connection ID can be used for limited tracking

## Adoption

HTTP/3 is built on QUIC. Chrome, Firefox, Safari, and most major websites support it.
