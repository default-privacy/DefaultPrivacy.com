---
term: "Network Segmentation"
slug: "network-segmentation"
definition: "Dividing a network into separate zones to contain breaches and limit lateral movement by attackers."
category: "Networking"
relatedTerms:
  - "zero-trust-architecture"
  - "nat"
---

Network segmentation limits the damage an attacker can do after gaining initial access.

## How It Works

- Network is divided into isolated segments (VLANs, subnets)
- Each segment has its own access controls
- Traffic between segments passes through a firewall
- Sensitive systems are isolated from general-purpose systems

## Home Network Segmentation

- **Main network**: Computers and phones
- **IoT network**: Smart home devices (these are often insecure)
- **Guest network**: Visitors (no access to your devices)

## Privacy Benefit

- IoT devices can't snoop on your main network traffic
- A compromised smart TV can't access your computer's files
- Guest devices can't see your network activity
