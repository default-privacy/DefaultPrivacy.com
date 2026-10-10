---
term: "TCP/IP"
slug: "tcp-ip"
definition: "The fundamental protocol suite of the internet that defines how data is addressed, transmitted, routed, and received across networks."
category: "Networking"
relatedTerms:
  - "ip-address"
  - "nat"
---

TCP/IP (Transmission Control Protocol/Internet Protocol) is the backbone of all internet communication.

## The Two Protocols

- **IP (Internet Protocol)**: Handles addressing and routing — getting packets from A to B
- **TCP (Transmission Control Protocol)**: Handles reliability — ensuring all packets arrive in order

## Privacy Implications

- IP addresses are visible to every server you connect to
- TCP headers reveal information about your operating system
- Connection metadata (source/destination IP, ports, timing) is visible to network observers
- Without encryption, TCP payload content is readable by anyone on the network path

## UDP Alternative

- UDP (User Datagram Protocol) is a simpler, faster alternative to TCP
- Used by VPNs (WireGuard), VoIP, gaming, and streaming
- No connection overhead, lower latency
