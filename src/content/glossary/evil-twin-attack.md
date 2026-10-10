---
term: "Evil Twin Attack"
slug: "evil-twin-attack"
definition: "A WiFi attack where an attacker creates a fake access point that mimics a legitimate network, tricking devices into connecting and exposing their traffic."
category: "Attacks"
relatedTerms:
  - "man-in-the-middle"
  - "captive-portal"
  - "vpn"
---

An evil twin is a rogue WiFi access point designed to look identical to a real one. It's one of the easiest wireless attacks to execute.

## How It Works

1. Attacker sets up a WiFi hotspot with the same name (SSID) as a legitimate network
2. Uses a stronger signal to attract connections
3. Optionally jams the real access point to force disconnections
4. Victims connect to the evil twin thinking it's the real network
5. Attacker can see all unencrypted traffic and perform man-in-the-middle attacks

## Common Targets

- Coffee shops, airports, hotels, conferences
- Corporate networks (during physical security assessments)

## Protection

1. **Always use a VPN** on public WiFi
2. Verify the network with staff before connecting
3. Forget networks when you leave (prevents auto-reconnect)
4. Disable auto-join for public networks
5. Use cellular data instead of public WiFi when possible
