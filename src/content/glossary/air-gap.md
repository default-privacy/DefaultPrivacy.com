---
term: "Air Gap"
slug: "air-gap"
definition: "A security measure that physically isolates a computer or network from the internet and other unsecured networks. An air-gapped system has no wired or wireless connections to the outside world, making remote hacking virtually impossible."
category: "Security"
relatedTerms:
  - "cold-storage"
  - "offline-security"
aliases:
  - "Air-Gapped"
  - "Air Wall"
---

An air gap is the ultimate network security measure: complete physical isolation from the internet. If there's no connection, there's no remote attack vector.

## Use Cases

### Cryptocurrency Cold Storage
- Private keys stored on offline computer
- Transactions signed offline, broadcast separately
- Immune to remote wallet theft

### Highly Sensitive Data
- Government classified systems
- Critical infrastructure controls
- Medical research data

### Secure Key Generation
- Creating cryptographic keys
- Generating master passwords
- Setting up hardware wallets

## True Air Gap Requirements

1. **No network interfaces**: WiFi, Ethernet, Bluetooth all disabled/removed
2. **No wireless peripherals**: Wired keyboard and mouse only
3. **No removable media reuse**: USB drives don't go back to connected systems
4. **Physical security**: Locked room, limited access
5. **Faraday consideration**: For extreme cases, block electromagnetic emanations

## Bridging the Air Gap

Data transfer to/from air-gapped systems requires careful protocols:
- **One-way transfers**: Data in via optical media, verified before use
- **QR codes**: For small data like transaction signatures
- **Dedicated transfer machines**: Never connect to both networks

## Attacks Against Air Gaps

Sophisticated attackers have breached air gaps using:
- **USB malware**: Stuxnet famously jumped air gaps via USB
- **Acoustic signals**: Data encoded in sounds
- **Electromagnetic emissions**: Reading data from screen flicker
- **Power line analysis**: Detecting activity through power consumption

## Practical Air Gapping

For most users, a practical "soft" air gap:
1. Old laptop with WiFi hardware removed
2. Fresh OS install, never connected to internet
3. Use for sensitive operations only
4. Transfer data via encrypted USB, used nowhere else

