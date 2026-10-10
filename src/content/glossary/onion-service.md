---
term: "Onion Service"
slug: "onion-service"
definition: "A website or service hosted within the Tor network that is only accessible through Tor, providing anonymity for both the server and its visitors."
category: "Networking"
relatedTerms:
  - "tor-network"
  - "onion-routing"
  - "darknet"
aliases:
  - "Hidden Service"
---

Onion services (.onion addresses) provide end-to-end encryption and mutual anonymity between server and client.

## How They Work

- The server connects to the Tor network and publishes its service descriptor
- Clients connect through Tor, establishing a 6-hop circuit (3 from each side)
- Neither party knows the other's IP address
- The connection never leaves the Tor network

## Legitimate Onion Services

- **Facebook**: facebookwkhpilnemxj7asaniu7vnjjbiltxjqhye3mhbshg7kx5tfyd.onion
- **The New York Times**: nytimesn7cgmftshazwhfgzm37qxb44r64ytbb2dj3x62d2lnez7pyd.onion
- **ProtonMail**: protonmailrmez3lotccipshtkleegetolb73fuirgj7r4o4vfu7ozyd.onion
- **SecureDrop**: Used by many news organizations for whistleblower tips

## Privacy Benefits

- Server location is hidden (no DNS, no IP exposure)
- Traffic never exits the Tor network (no exit node risk)
- Mutual authentication via the .onion address itself
