---
term: "Network Forensics"
slug: "network-forensics"
definition: "The capture, recording, and analysis of network traffic to detect intrusions, investigate incidents, and monitor for data exfiltration."
category: "Attacks"
relatedTerms:
  - "packet-inspection"
  - "traffic-analysis"
  - "forensic-analysis"
---

Network forensics examines the data flowing across networks rather than data stored on devices.

## What's Captured

- Full packet captures (PCAP) of all network traffic
- Network flow data (who talked to whom, when, how much)
- DNS queries
- HTTP/HTTPS metadata
- Email headers

## Tools

- **Wireshark**: Packet capture and analysis
- **tcpdump**: Command-line packet capture
- **Zeek (Bro)**: Network security monitor
- **NetworkMiner**: Network forensic analysis tool

## Privacy Defense

1. VPN encrypts traffic, making packet content unreadable
2. Tor obscures traffic patterns and destinations
3. DNS-over-HTTPS prevents DNS query monitoring
4. End-to-end encryption ensures content is protected even if captured
