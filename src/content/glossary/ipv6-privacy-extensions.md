---
term: "IPv6 Privacy Extensions"
slug: "ipv6-privacy-extensions"
definition: "A feature that generates temporary, randomized IPv6 addresses to prevent tracking based on your device's permanent hardware address."
category: "Networking"
relatedTerms:
  - "ip-address"
  - "vpn"
  - "browser-fingerprinting"
---

Standard IPv6 addresses include your device's MAC address, creating a permanent identifier that can track you across networks. Privacy extensions solve this.

## The Problem

- IPv6 addresses are typically derived from your network interface's MAC address
- This creates a globally unique, permanent identifier
- Websites and trackers can correlate your activity across different networks

## How Privacy Extensions Work

- Generate temporary, random interface identifiers
- Addresses rotate periodically (typically every 24 hours)
- The permanent address still exists but isn't used for outgoing connections

## How to Enable

- **Windows**: Enabled by default since Windows Vista
- **macOS**: Enabled by default
- **Linux**: Add `net.ipv6.conf.all.use_tempaddr = 2` to sysctl
- **Android**: Enabled by default on most devices
