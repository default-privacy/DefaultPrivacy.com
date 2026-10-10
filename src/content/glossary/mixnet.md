---
term: "Mixnet"
slug: "mixnet"
definition: "A routing protocol that mixes messages from multiple users, making it extremely difficult to trace which input corresponds to which output. Mixnets provide stronger anonymity than onion routing by adding delays and shuffling."
category: "Anonymity"
relatedTerms:
  - "tor"
  - "anonymity"
aliases:
  - "Mix Network"
  - "Mixing Network"
keywords:
  - "message mixing"
  - "traffic analysis"
  - "Nym"
  - "Loopix"
  - "anonymous routing"
---

Mixnets take the concept of onion routing further by actually mixing messages together. Instead of just encrypting the route, they shuffle messages to break the connection between senders and receivers.

## How Mixnets Work

1. **Collect**: Mix node gathers messages from multiple users
2. **Delay**: Hold messages for random time periods
3. **Shuffle**: Reorder messages randomly
4. **Forward**: Send to next mix or destination

Even if an attacker controls some nodes, mixing breaks traffic analysis.

## Mixnets vs Tor

| Feature | Tor | Mixnet |
|---------|-----|--------|
| Latency | Low (sub-second) | High (seconds to minutes) |
| Traffic analysis resistance | Moderate | Strong |
| Message ordering | Preserved | Shuffled |
| Timing attacks | Vulnerable | Resistant |
| Use case | Web browsing | Messaging, transactions |

## Types of Mixnets

### Threshold Mixing
- Wait for N messages before forwarding
- Fixed batch sizes
- Predictable delays

### Timed Mixing
- Forward after time period
- Variable batch sizes
- Random delays

### Continuous Mixing
- Ongoing mixing process
- Cover traffic added
- Strongest anonymity

## Modern Mixnet Projects

### Nym
- Incentivized mixnet
- Cryptocurrency rewards for nodes
- General-purpose anonymity layer

### Loopix
- Academic mixnet design
- Continuous mixing with cover traffic
- Strong provable anonymity

### Katzenpost
- Messaging-focused mixnet
- Mix of threshold and timed mixing

## Trade-offs

### Pros
- Strongest traffic analysis resistance
- Even global adversaries struggle
- Provable anonymity guarantees

### Cons
- High latency (not for real-time)
- More complex than onion routing
- Requires many users for anonymity set

