---
term: "Packet Inspection"
slug: "packet-inspection"
definition: "The practice of examining data packets as they pass through a network checkpoint, ranging from basic header analysis to deep content inspection."
category: "Networking"
relatedTerms:
  - "traffic-analysis"
  - "vpn"
  - "encryption"
---

Packet inspection is used by ISPs, governments, and network administrators to monitor, filter, or manipulate network traffic.

## Types

- **Shallow Packet Inspection (SPI)**: Examines packet headers only — source, destination, protocol
- **Deep Packet Inspection (DPI)**: Examines the actual content/payload of packets
- **Statistical Analysis**: Looks at traffic patterns without reading content

## Who Uses It

- **ISPs**: Traffic shaping, blocking content, complying with government orders
- **Governments**: Censorship (China's Great Firewall uses DPI extensively)
- **Employers**: Monitoring employee internet usage
- **Network security**: Intrusion detection systems

## Protection

1. **VPN**: Encrypts all traffic, making DPI see only encrypted data
2. **Tor**: Multi-layer encryption plus traffic obfuscation
3. **HTTPS**: Encrypts web content (but not DNS queries or destination IPs)
4. **Obfuscation protocols**: Tools like obfs4 make encrypted traffic look like normal traffic
