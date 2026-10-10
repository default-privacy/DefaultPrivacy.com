---
term: "I2P"
slug: "i2p"
definition: "The Invisible Internet Project is an anonymous network layer designed for internal services (eepsites) rather than accessing the regular internet. I2P uses garlic routing to provide strong anonymity for both users and services."
category: "Anonymity"
relatedTerms:
  - "tor"
  - "anonymity"
  - "vpn"
aliases:
  - "Invisible Internet Project"
  - "Eepsite"
keywords:
  - "garlic routing"
  - "anonymous network"
  - "darknet"
  - "hidden services"
  - "eepsites"
---

I2P creates an internet within the internet—a fully encrypted network where both users and services are anonymous. Unlike Tor, which focuses on accessing the regular web anonymously, I2P is designed for its own internal ecosystem.

## I2P vs Tor

| Aspect | I2P | Tor |
|--------|-----|-----|
| Primary use | Internal network | Anonymous browsing |
| Routing | Garlic (bundled) | Onion (layered) |
| Network model | Peer-to-peer | Client-server |
| Hidden services | Primary focus | Secondary feature |
| Outproxies | Limited | Many exit nodes |

## Garlic Routing

I2P bundles multiple messages together (like cloves in a garlic):
- Multiple messages encrypted together
- Harder to analyze than single onion layers
- More efficient use of bandwidth

## I2P Features

### Eepsites
- Websites hosted within I2P
- .i2p addresses
- Anonymous hosting

### I2P Applications
- I2P-Bote: Anonymous email
- I2PSnark: BitTorrent client
- SusiMail: Webmail interface

### Network Architecture
- All users are relays by default
- No central directory (distributed)
- Self-organizing network

## Use Cases

### Anonymous Publishing
- Host content without revealing identity
- Resistant to takedowns
- Strong whistleblower protection

### Secure Communication
- Email, messaging, forums
- Both parties protected
- No metadata leakage

### File Sharing
- Anonymous BitTorrent
- Distributed storage
- Censorship resistance

## Getting Started

1. Download I2P router software
2. Run router (becomes network node)
3. Wait for tunnel building (10-15 minutes)
4. Access .i2p sites through I2P proxy

## Limitations

- Slower than regular internet
- Smaller network than Tor
- Learning curve for new users
- Limited outproxy support

