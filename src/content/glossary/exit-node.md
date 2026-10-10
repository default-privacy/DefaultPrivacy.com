---
term: "Exit Node"
slug: "exit-node"
definition: "The final relay in a Tor circuit that connects to the destination server, the point where traffic leaves the Tor network and enters the regular internet."
category: "Networking"
relatedTerms:
  - "tor-network"
  - "onion-routing"
  - "tor-bridge"
---

Exit nodes are the most sensitive part of the Tor network — they see the decrypted traffic heading to its destination.

## What Exit Nodes Can See

- The destination website you're visiting
- Unencrypted traffic content (HTTP, not HTTPS)
- Your traffic patterns and timing

## What Exit Nodes Cannot See

- Your real IP address (only the middle relay's address)
- HTTPS-encrypted content
- Who you are

## Risks

- Malicious exit nodes can intercept unencrypted traffic
- Some exit nodes inject malware or modify pages
- Government-operated exit nodes exist for surveillance

## Protection

- Always use HTTPS when browsing through Tor
- Use onion services when possible (traffic never exits Tor)
- Tor Browser warns about unencrypted connections
