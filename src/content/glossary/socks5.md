---
term: "SOCKS5"
slug: "socks5"
definition: "The latest version of the SOCKS protocol, which routes network traffic through a proxy server. SOCKS5 supports authentication, UDP traffic, and IPv6, making it more versatile and secure than previous versions or HTTP proxies."
category: "Networking"
relatedTerms:
  - "proxy-server"
  - "vpn"
aliases:
  - "SOCKS Proxy"
  - "SOCKS v5"
keywords:
  - "proxy protocol"
  - "UDP proxy"
  - "network proxy"
  - "shadowsocks"
---

SOCKS5 is the Swiss Army knife of proxies. Unlike HTTP proxies that only handle web traffic, SOCKS5 can route any type of TCP or UDP traffic, making it useful for applications beyond browsers.

## SOCKS5 Features

### Protocol Agnostic
- Works with any TCP/UDP application
- Email, gaming, streaming, torrenting
- Not limited to HTTP/HTTPS

### Authentication
- Username/password support
- Prevents unauthorized use
- Required by most paid services

### UDP Support
- Voice, video, gaming
- DNS queries
- Real-time applications

### IPv6 Compatible
- Modern IP addressing
- Future-proof

## SOCKS5 vs SOCKS4

| Feature | SOCKS4 | SOCKS5 |
|---------|--------|--------|
| TCP Support | ✓ | ✓ |
| UDP Support | ✗ | ✓ |
| Authentication | ✗ | ✓ |
| IPv6 | ✗ | ✓ |
| Remote DNS | ✗ | ✓ |

## SOCKS5 vs HTTP Proxy

| Aspect | SOCKS5 | HTTP Proxy |
|--------|--------|------------|
| Protocols | Any TCP/UDP | HTTP/HTTPS only |
| Speed | Generally faster | Protocol overhead |
| Versatility | High | Low |
| Setup | Per-application | Browser settings |

## Common Use Cases

### Torrenting
- Route BitTorrent through proxy
- Hide IP from peers
- Bypass ISP throttling

### Gaming
- Lower latency routes
- Bypass geo-restrictions
- Reduce DDoS exposure

### Application Tunneling
- SSH over SOCKS
- Database connections
- Development/testing

### Circumvention
- Bypass firewalls
- Access restricted content
- Shadowsocks uses SOCKS5

## Security Considerations

### SOCKS5 Doesn't Encrypt
- Traffic visible to proxy operator
- Traffic visible on network
- Use with SSH tunnel for encryption

### DNS Leaks
- Configure remote DNS resolution
- Otherwise DNS reveals destinations
- Most clients support this

### Proxy Trust
- Proxy sees all your traffic
- Choose reputable providers
- Consider running your own

