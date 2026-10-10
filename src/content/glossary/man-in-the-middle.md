---
term: "Man-in-the-Middle Attack"
slug: "man-in-the-middle"
definition: "An attack where the adversary secretly intercepts and potentially alters communications between two parties who believe they're communicating directly with each other. MITM attacks can capture credentials, inject malware, or modify data."
category: "Security"
relatedTerms:
  - "tls"
  - "encryption"
  - "vpn"
aliases:
  - "MITM"
  - "MitM Attack"
  - "On-Path Attack"
keywords:
  - "interception"
  - "eavesdropping"
  - "SSL stripping"
  - "ARP spoofing"
---

In a MITM attack, the attacker positions themselves between you and whoever you're trying to communicate with. They can read everything, modify messages, or impersonate either party.

## How MITM Attacks Work

### Normal Communication
```
You ←→ Server
```

### With MITM
```
You ←→ Attacker ←→ Server
```

Both you and the server think you're talking to each other, but the attacker sees everything.

## Attack Techniques

### ARP Spoofing
- Attacker claims to be the router
- All traffic routes through attacker
- Common on local networks

### DNS Spoofing
- Redirect domain to attacker's server
- Fake version of real website
- Capture credentials

### SSL Stripping
- Downgrade HTTPS to HTTP
- User sees no padlock
- All traffic unencrypted

### Rogue Access Points
- Fake "Free WiFi" hotspot
- All traffic passes through attacker
- Common in coffee shops, airports

### BGP Hijacking
- Redirect internet traffic at routing level
- Nation-state level attack
- Can affect entire regions

## Protection Mechanisms

### HTTPS
- Encrypts connection
- Validates server identity
- Look for padlock in browser

### HSTS (HTTP Strict Transport Security)
- Forces HTTPS
- Prevents SSL stripping
- Browser remembers HTTPS-only

### Certificate Pinning
- App expects specific certificate
- Rejects impersonation attempts
- Used in banking apps

### VPN
- Encrypts all traffic
- Bypasses local MITM
- Doesn't protect against compromised VPN

## Detecting MITM

### Warning Signs
- Certificate warnings in browser
- Unexpected HTTP instead of HTTPS
- Slow or unusual network behavior
- Unknown certificates in system

### Prevention
- Don't ignore certificate warnings
- Use VPN on public WiFi
- Verify HTTPS before entering credentials
- Keep software updated

