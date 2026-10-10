---
term: "Distributed Denial of Service"
slug: "ddos"
definition: "An attack that overwhelms a service with traffic from many sources simultaneously, making it unavailable to legitimate users."
category: "Attacks"
relatedTerms:
  - "botnet"
aliases:
  - "DDoS"
---

DDoS attacks use distributed resources to flood a target with more traffic than it can handle.

## Types

- **Volumetric**: Overwhelm bandwidth (DNS amplification, NTP reflection)
- **Protocol**: Exploit protocol weaknesses (SYN floods, Ping of Death)
- **Application**: Target specific services (HTTP floods, Slowloris)

## Scale

- Modern DDoS attacks exceed 1 Tbps
- Botnets of millions of devices can be rented for ~$50/hour
- Cloud-based amplification increases attack volume 50-100x

## Privacy Connection

- DDoS attacks are used to silence privacy advocates and independent media
- Tor entry nodes face constant DDoS attempts
- Privacy-focused services need robust DDoS protection
- Cloudflare and Bunny CDN provide DDoS protection for privacy-respecting sites
