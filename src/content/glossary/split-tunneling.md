---
term: "Split Tunneling"
slug: "split-tunneling"
definition: "A VPN feature that lets you route some traffic through the VPN while other traffic goes directly to the internet."
category: "Networking"
relatedTerms:
  - "vpn"
  - "dns-leak"
---

Split tunneling gives you control over which apps or websites use the VPN and which connect directly.

## Use Cases

- Route sensitive browsing through VPN, let streaming services use direct connection
- Access local network devices (printers, NAS) while VPN is active
- Reduce VPN bandwidth usage for non-sensitive traffic

## Privacy Risks

- Traffic outside the tunnel is fully exposed to your ISP
- DNS leaks are more likely with split tunneling enabled
- Misconfiguration can expose sensitive traffic
- Apps may make connections you don't expect outside the tunnel

## Recommendation

For maximum privacy, keep all traffic in the VPN tunnel. Only use split tunneling when you have a specific, understood reason and accept the risk.
