---
term: "NAT (Network Address Translation)"
slug: "nat"
definition: "A technique that maps multiple private IP addresses to a single public IP address, providing a basic layer of privacy by hiding internal network structure."
category: "Networking"
relatedTerms:
  - "ip-address"
  - "vpn"
  - "proxy-server"
---

NAT allows multiple devices on a local network to share a single public IP address. While not designed as a privacy tool, it provides incidental privacy benefits.

## How It Works

- Your router maintains a table mapping internal addresses to external connections
- Outgoing traffic appears to come from the router's public IP
- Incoming traffic is directed to the correct internal device based on the mapping

## Privacy Implications

- **Benefit**: Individual devices aren't directly addressable from the internet
- **Benefit**: Multiple users share one public IP, providing some anonymity
- **Limitation**: The public IP still identifies your network
- **Limitation**: NAT is not a substitute for a VPN or proxy

## CGNAT

Carrier-Grade NAT (CGNAT) adds another layer — your ISP shares one public IP among many customers. This can actually help privacy but causes issues with services that track by IP.
