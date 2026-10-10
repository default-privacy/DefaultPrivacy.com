---
term: "Onion Routing"
slug: "onion-routing"
definition: "A technique for anonymous communication over a computer network where messages are encapsulated in layers of encryption, analogous to layers of an onion. Each relay decrypts one layer to reveal the next destination, but no single relay knows both the origin and final destination."
category: "Anonymity"
relatedTerms:
  - "tor-network"
  - "encryption"
  - "anonymity"
aliases:
  - "Onion Network"
---

Onion routing wraps your data in multiple layers of encryption, like an onion. As your data passes through each relay, one layer is "peeled off," revealing only the next step—never the complete journey.

## How It Works

1. **Client selects path**: Your device chooses multiple relays (typically 3)
2. **Layered encryption**: Message is encrypted in layers, one for each relay
3. **Entry node**: First relay decrypts outer layer, sees only middle relay
4. **Middle relay**: Decrypts its layer, sees only exit node
5. **Exit node**: Final decryption, sends to destination
6. **No single point knows everything**: Entry knows you, exit knows destination, middle knows neither

## The Key Insight

Each relay only knows:
- Where the message came from (previous hop)
- Where it's going next (next hop)

No relay can determine both:
- The original sender
- The final destination

## Visual Analogy

```
[Your Message]
    ↓ Encrypt for Exit
[Layer 3: Exit instructions]
    ↓ Encrypt for Middle  
[Layer 2: Middle instructions + encrypted Layer 3]
    ↓ Encrypt for Entry
[Layer 1: Entry instructions + encrypted Layer 2]
```

## Applications

- **Tor Browser**: Most common onion routing implementation
- **I2P**: Alternative anonymous network
- **Onion services (.onion sites)**: End-to-end encrypted hidden services

## Limitations

- **Slower speeds**: Multiple hops add latency
- **Exit node visibility**: Unencrypted traffic visible to exit
- **Traffic analysis**: Timing correlation attacks possible
- **Trust assumptions**: Relies on diverse, honest relay operators

