---
term: "Tor Bridge"
slug: "tor-bridge"
definition: "An unlisted Tor relay that helps users in censored regions connect to the Tor network when direct access is blocked."
category: "Networking"
relatedTerms:
  - "tor-network"
  - "onion-routing"
  - "traffic-analysis"
---

Tor bridges are entry points to the Tor network that aren't publicly listed, making them harder for censors to block.

## Why Bridges Exist

- Some countries block connections to known Tor relays
- ISPs can see you're connecting to Tor if you use public relays
- Bridges provide a way around these blocks

## Types of Bridges

- **obfs4**: Disguises Tor traffic to look like random data
- **meek**: Makes Tor traffic look like connections to major cloud services
- **Snowflake**: Uses WebRTC to create temporary bridges through volunteers' browsers

## How to Get Bridges

1. Request from bridges.torproject.org
2. Email bridges@torproject.org from a Gmail or Riseup address
3. Use the built-in bridge option in Tor Browser

## Limitations

Bridges add latency and can eventually be discovered. They're a cat-and-mouse game between the Tor Project and censors.
