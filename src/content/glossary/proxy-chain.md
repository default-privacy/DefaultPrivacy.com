---
term: "Proxy Chain"
slug: "proxy-chain"
definition: "A technique of routing traffic through multiple proxy servers in sequence, making it harder to trace the connection back to the original source."
category: "Networking"
relatedTerms:
  - "proxy-server"
  - "tor-network"
  - "vpn"
---

Proxy chaining adds layers of indirection between you and your destination.

## How It Works

- Traffic passes through Proxy A → Proxy B → Proxy C → Destination
- Each proxy only knows the previous and next hop
- No single proxy sees both the source and destination

## Compared to Tor

- Tor is essentially an automated, encrypted proxy chain with 3 relays
- Manual proxy chains require you to trust each proxy operator
- Tor adds encryption at each layer; manual chains may not

## Tools

- **ProxyChains**: Linux tool that forces any application through a chain of proxies
- **Tor**: The most robust proxy chain implementation
- **VPN + Tor**: Route through VPN first, then Tor for additional protection

## Limitations

- Each hop adds latency
- If all proxies are operated by the same entity, chaining provides no benefit
- Timing correlation can potentially link entry and exit traffic
