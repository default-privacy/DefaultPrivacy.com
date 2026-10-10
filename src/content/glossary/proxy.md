---
term: "Proxy"
slug: "proxy"
definition: "A server that acts as an intermediary between you and the internet. Your requests go to the proxy, which forwards them to the destination. Proxies can hide your IP, bypass geo-restrictions, or filter content—but the proxy operator sees your traffic."
category: "Networking"
relatedTerms:
  - "ip-address"
  - "vpn"
  - "tor"
aliases:
  - "Proxy server"
  - "HTTP proxy"
  - "SOCKS proxy"
---

A proxy stands between you and the rest of the internet. Whether that protects or exposes you depends on who runs it and whether traffic is encrypted.

## How Proxies Work

1. You configure your device or browser to use a proxy
2. Your traffic goes to the proxy instead of directly to the destination
3. The proxy forwards your request and returns the response
4. To the destination, the request appears to come from the proxy's IP

## Proxy Types

### HTTP/HTTPS Proxy
- Handles web traffic
- Can see unencrypted HTTP (URLs, content)
- HTTPS: Proxy sees domain (SNI) but not full URL or content
- Common in corporate networks, schools

### SOCKS Proxy
- Works with any TCP traffic (not just HTTP)
- Lower level—doesn't understand application protocol
- SOCKS5 supports authentication, UDP

### Transparent Proxy
- Intercepts traffic without your configuration
- You may not know you're using one
- ISPs, corporate networks use for caching, filtering

## Privacy Considerations

- **Proxy sees everything** (unless end-to-end encrypted): Choose trusted operators
- **Free proxies**: Often log and sell your data
- **VPN vs. proxy**: VPN encrypts your entire connection to the VPN server; proxy may not
- **Tor**: Uses a chain of proxies (relays) for stronger anonymity
- **Single point of failure**: Proxy operator can log, modify, or block traffic
