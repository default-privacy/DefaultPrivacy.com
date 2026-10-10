---
term: "IP Address"
slug: "ip-address"
definition: "A unique numerical identifier assigned to every device connected to a computer network. Your IP address reveals your approximate geographic location and can be used to track your online activity, link your actions across websites, and identify your internet service provider."
category: "Networking"
relatedTerms:
  - "vpn"
  - "tor-network"
  - "proxy"
aliases:
  - "Internet Protocol Address"
---

Your IP address is like your home address on the internet. Every website you visit, every service you use, sees this address—and it reveals more about you than you might think.

## What Your IP Reveals

- **Geographic location**: City, region, sometimes neighborhood
- **Internet Service Provider**: Who you pay for internet
- **Organization**: If you're on a company/school network
- **Connection type**: Home, mobile, VPN, etc.

## IPv4 vs IPv6

### IPv4
- Format: `192.168.1.1`
- ~4.3 billion addresses
- Running out, often shared via NAT
- Most common today

### IPv6
- Format: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`
- 340 undecillion addresses
- Each device can have unique address
- Growing adoption

## Privacy Implications

### Tracking
- Websites log your IP with every visit
- Advertisers link activity across sites
- Law enforcement can subpoena ISP records

### Identification
- IP + timestamp = your identity (via ISP records)
- Legal actions (DMCA, lawsuits) start with IP
- Shared IPs (NAT) provide some anonymity

### Geoblocking
- Services restrict access by IP location
- Streaming rights vary by country
- Some content blocked regionally

## Hiding Your IP

### VPN
- Replaces your IP with VPN server's IP
- All traffic routed through VPN
- VPN provider knows your real IP

### Tor
- Routes through multiple nodes
- Exit node's IP is visible to destination
- Strong anonymity, slower speed

### Proxy
- Single intermediate server
- Often not encrypted
- Weaker than VPN/Tor

## Checking Your IP

Visit a site like "whatismyip.com" to see:
- Your current public IP
- Your approximate location
- Whether VPN/Tor is working

