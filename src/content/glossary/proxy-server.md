---
term: "Proxy Server"
slug: "proxy-server"
definition: "An intermediary server that sits between your device and the internet, forwarding requests on your behalf. Proxies can provide privacy by hiding your IP address, but unlike VPNs, they typically don't encrypt traffic."
category: "Networking"
relatedTerms:
  - "vpn"
  - "tor"
  - "socks5"
aliases:
  - "Web Proxy"
  - "Proxy"
keywords:
  - "HTTP proxy"
  - "forward proxy"
  - "reverse proxy"
  - "IP masking"
  - "intermediary server"
---

A proxy server acts as a middleman between you and websites. When you use a proxy, websites see the proxy's IP address instead of yours. But proxies vary wildly in privacy and security.

## Types of Proxies

### HTTP Proxy
- Only handles HTTP/HTTPS traffic
- Easy to set up
- No encryption added
- Browser-level configuration

### SOCKS Proxy
- Protocol-agnostic (any TCP/UDP)
- More versatile than HTTP
- SOCKS5 supports authentication
- Application-level configuration

### Transparent Proxy
- No configuration needed
- Often used by ISPs/organizations
- User may not know it exists
- Can intercept and cache

### Reverse Proxy
- Sits in front of web servers
- Load balancing, caching
- Hides server infrastructure
- Not for user privacy

## Proxy vs VPN

| Feature | Proxy | VPN |
|---------|-------|-----|
| Encryption | Usually none | Full traffic encryption |
| Scope | Per-application | System-wide |
| Speed | Generally faster | Some overhead |
| Privacy | IP hiding only | IP hiding + encryption |
| Setup | Per-app configuration | One connection |

## Privacy Considerations

### What Proxies Hide
- Your real IP from websites
- Rough location (based on proxy location)

### What Proxies DON'T Hide
- Traffic from proxy operator
- Traffic from network observers (without encryption)
- Browser fingerprint
- Account logins

## Proxy Anonymity Levels

### Transparent
- Identifies itself as proxy
- Forwards your real IP
- No privacy benefit

### Anonymous
- Identifies as proxy
- Hides your real IP
- Moderate privacy

### Elite/High Anonymity
- Doesn't identify as proxy
- Hides your real IP
- Best privacy

## When to Use Proxies

### Good For
- Quick IP change
- Bypassing geo-restrictions
- Light privacy needs
- Application-specific needs

### Not Recommended For
- Sensitive activities
- Strong anonymity needs
- Protecting from ISP
- Untrusted networks

