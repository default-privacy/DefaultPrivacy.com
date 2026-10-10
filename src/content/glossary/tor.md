---
term: "Tor"
slug: "tor"
definition: "The Onion Router—a free network that routes your traffic through multiple layers of encrypted relays. No single relay knows both your identity and your destination. Tor enables anonymous browsing, access to .onion sites, and censorship circumvention."
category: "Networking"
relatedTerms:
  - "anonymity"
  - "onion-routing"
  - "vpn"
aliases:
  - "Tor Network"
  - "Tor Browser"
  - "The Onion Router"
---

Tor is the gold standard for anonymous internet access. Used by journalists, activists, whistleblowers, and ordinary people who value privacy.

## How Tor Works

1. **Tor Browser** (or Tor client) connects to the Tor network
2. Your traffic is encrypted and sent through **three relays** (guard, middle, exit)
3. Each relay only knows the previous and next hop—never the full path
4. **Exit relay** sends your traffic to the destination (sees your destination, not your identity)
5. **Guard relay** sees your IP, but not where you're going (only knows you're using Tor)

No single relay has both your identity and your destination. That's the "onion" — layers of encryption, each peeled by one relay.

## Tor vs. VPN

- **VPN**: One hop. VPN provider sees everything—your IP, your destination, your traffic (if unencrypted). Trust required.
- **Tor**: Three hops. No single party has full picture. Trust distributed across relay operators.
- **Tor over VPN**: VPN sees you're using Tor. Adds one layer of separation from your ISP.
- **VPN over Tor**: Complex. Generally not recommended for most users.

## What Tor Protects

- **Your identity** from the destination (you appear as exit relay's IP)
- **Your destination** from your ISP (they see Tor traffic, not where you're going)
- **Your traffic** from observers (encrypted until exit relay)

## What Tor Doesn't Protect

- **Exit relay** sees your traffic to non-HTTPS sites (can modify, log)
- **Timing** and **volume** analysis can sometimes correlate traffic
- **Behavioral** leaks—logging in, cookies, identifying yourself
- **Tor Browser** fingerprint—still unique enough to track across sessions

## Use Cases

- **Censorship circumvention**: Access blocked sites
- **Anonymous browsing**: Research, activism, privacy
- **.onion services**: Hidden services that don't need to reveal their location
- **Whistleblowing**: SecureDrop and similar use Tor
