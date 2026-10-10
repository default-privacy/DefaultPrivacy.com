---
term: "Bandwidth Throttling"
slug: "bandwidth-throttling"
definition: "The intentional slowing of internet speeds by an ISP, often targeting specific services like streaming or VPN traffic."
category: "Networking"
relatedTerms:
  - "vpn"
  - "packet-inspection"
---

ISPs throttle certain types of traffic to manage network load or pressure users into paying more.

## How It's Done

- Deep packet inspection identifies traffic types (video, torrents, VPN)
- ISP selectively reduces bandwidth for identified traffic
- Speed tests may show normal speeds while actual usage is throttled

## How to Detect

- Run speed tests with and without a VPN
- If VPN speeds are faster for certain services, your ISP is throttling
- Tools like Wehe can detect throttling

## Protection

A VPN encrypts all traffic, making it impossible for ISPs to identify and throttle specific services. This is one of the most practical VPN use cases.
