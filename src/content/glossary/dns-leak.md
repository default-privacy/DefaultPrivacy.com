---
term: "DNS Leak"
slug: "dns-leak"
definition: "A security flaw where DNS queries bypass your VPN or proxy and are sent through your normal ISP connection, revealing the websites you visit even when your other traffic is protected."
category: "Networking"
relatedTerms:
  - "vpn"
  - "dns"
  - "webrtc-leak"
aliases:
  - "DNS Leakage"
keywords:
  - "VPN leak"
  - "privacy leak"
  - "ISP tracking"
  - "DNS resolver"
  - "DNS security"
---

A DNS leak is like using a VPN for your packages but writing the destination address on the outside of the envelope. Your ISP can see every website you're visiting even though the content is encrypted.

## How DNS Leaks Happen

### Normal VPN Operation
1. You type "example.com"
2. DNS query goes through VPN
3. VPN's DNS server resolves it
4. Traffic flows through VPN
5. ISP sees nothing

### With DNS Leak
1. You type "example.com"
2. DNS query bypasses VPN → Goes to ISP's DNS
3. ISP sees you're visiting example.com
4. Actual traffic goes through VPN
5. ISP knows your destinations

## Common Causes

### Operating System DNS Handling
- Windows "Smart Multi-Homed Name Resolution"
- macOS network prioritization
- Default DNS settings override VPN

### VPN Misconfiguration
- Split tunneling enabled
- DNS settings not forced
- IPv6 DNS not covered

### Network Configuration
- Router DNS settings
- ISP DNS hijacking
- Captive portals

## Testing for DNS Leaks

### Online Tools
- dnsleaktest.com
- browserleaks.com/dns
- ipleak.net

### What to Look For
- DNS servers should be your VPN provider's
- No ISP DNS servers visible
- Check both IPv4 and IPv6

## Preventing DNS Leaks

### VPN-Level
- Use VPN with built-in leak protection
- Enable "DNS leak protection" setting
- Use VPN's DNS servers

### System-Level
- Disable "Smart Multi-Homed Name Resolution" (Windows)
- Configure DNS manually
- Block non-VPN DNS at firewall

### Alternative DNS
- Use encrypted DNS (DoH, DoT)
- Configure to route through VPN
- NextDNS, Cloudflare, Quad9

## Why DNS Leaks Matter

### Privacy Impact
- ISP sees all your browsing
- Can be logged and sold
- Subject to government requests

### Anonymity Impact
- Defeats purpose of VPN/Tor
- Links activity to your connection
- Correlation attacks possible

