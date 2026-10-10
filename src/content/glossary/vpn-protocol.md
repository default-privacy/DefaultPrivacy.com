---
term: "VPN Protocol"
slug: "vpn-protocol"
definition: "The set of rules and encryption methods that determine how a VPN tunnel is established and how data is transmitted through it."
category: "Networking"
relatedTerms:
  - "vpn"
  - "tls"
  - "encryption"
---

Different VPN protocols offer different trade-offs between speed, security, and compatibility.

## Common Protocols

- **WireGuard**: Modern, fast, minimal code (~4,000 lines). Uses ChaCha20 encryption. Recommended.
- **OpenVPN**: Mature, widely supported, open source. Can use TCP or UDP. Slower than WireGuard.
- **IKEv2/IPsec**: Fast, good for mobile (handles network switching well). Built into most OS.
- **L2TP/IPsec**: Older, slower. Generally not recommended.
- **PPTP**: Obsolete and broken. Never use.

## What to Look For

- **WireGuard** is the best choice for most users
- If WireGuard isn't available, OpenVPN on UDP is the next best
- Avoid any VPN that only offers PPTP or L2TP

## Privacy Note

The protocol determines the encryption, but the VPN provider determines the privacy. A trustworthy provider with an older protocol is better than an untrustworthy provider with WireGuard.
