---
term: "Obfuscation"
slug: "obfuscation"
definition: "Techniques for disguising encrypted traffic to look like normal, unencrypted traffic, used to bypass censorship systems that block VPNs and Tor."
category: "Encryption"
relatedTerms:
  - "tor-bridge"
  - "vpn"
  - "packet-inspection"
---

Obfuscation makes encrypted traffic look like ordinary web browsing, defeating deep packet inspection censorship.

## Why It's Needed

- China, Iran, Russia, and other countries actively block VPN and Tor traffic
- Deep Packet Inspection can identify encrypted protocols by their traffic patterns
- Even if content is encrypted, the fact that you're using a VPN/Tor is detectable

## Techniques

- **obfs4**: Tor pluggable transport that makes traffic look random
- **meek**: Disguises Tor traffic as connections to cloud services (Google, Amazon)
- **Shadowsocks**: Lightweight SOCKS5 proxy with traffic obfuscation
- **V2Ray/Xray**: Multi-protocol proxy tool popular in China
- **WireGuard over wstunnel**: Tunnels VPN through WebSocket (looks like HTTPS)

## Detection Arms Race

Censors continuously improve detection. Obfuscation tools must evolve to stay ahead. This is an active cat-and-mouse game between privacy tools and state censorship.
