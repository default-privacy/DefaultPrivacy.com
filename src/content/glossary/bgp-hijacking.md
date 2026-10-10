---
term: "BGP Hijacking"
slug: "bgp-hijacking"
definition: "An attack where a network falsely announces ownership of IP address ranges, rerouting internet traffic through attacker-controlled infrastructure."
category: "Networking"
relatedTerms:
  - "traffic-analysis"
  - "vpn"
---

BGP (Border Gateway Protocol) is the routing protocol that determines how data travels across the internet. BGP hijacking exploits the trust-based nature of this system.

## How It Works

- BGP relies on networks honestly announcing which IP addresses they control
- An attacker announces routes for IP ranges they don't own
- Other networks accept these announcements and reroute traffic
- The attacker can inspect, modify, or drop the traffic

## Real-World Impact

- Nation-state surveillance of encrypted communications
- Cryptocurrency theft by redirecting mining pool traffic
- Interception of email and web traffic at scale

## Protection

- Use end-to-end encryption for all communications
- VPNs help but can also be affected if the VPN provider's routes are hijacked
- RPKI (Resource Public Key Infrastructure) is being deployed to prevent this
