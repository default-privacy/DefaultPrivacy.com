---
term: "Port Scanning"
slug: "port-scanning"
definition: "A technique used to discover which network ports are open on a target system, often used in reconnaissance before an attack."
category: "Networking"
relatedTerms:
  - "ip-address"
  - "nat"
---

Port scanning probes a computer or network to find open ports and services. While legitimate for network administration, it's also the first step in many attacks.

## How It Works

- Sends connection requests to a range of port numbers
- Open ports respond, revealing running services
- Different scan types (SYN, UDP, FIN) have different stealth levels

## Privacy Concerns

- Reveals what services you're running (web server, SSH, email, etc.)
- Can identify your operating system through response patterns
- Exposed services increase your attack surface

## Protection

1. Use a firewall to close unnecessary ports
2. Don't expose services to the public internet unless needed
3. Use a VPN or NAT to hide your real IP
4. Tools like fail2ban can detect and block scanning attempts
