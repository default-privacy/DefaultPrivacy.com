---
term: "WireGuard"
slug: "wireguard"
definition: "A modern, lightweight VPN protocol with approximately 4,000 lines of code, designed for simplicity, speed, and strong cryptography."
category: "Networking"
relatedTerms:
  - "vpn-protocol"
  - "vpn"
  - "chacha20-poly1305"
---

WireGuard has become the preferred VPN protocol, replacing OpenVPN and IPsec for most use cases.

## Key Features

- **Minimal codebase**: ~4,000 lines (OpenVPN: ~100,000). Easier to audit.
- **Fast**: Uses ChaCha20-Poly1305 and Curve25519. Very low overhead.
- **Simple**: Configuration is a few lines. No complex certificate management.
- **Built into Linux kernel**: First-class OS support.

## Cryptographic Primitives

- ChaCha20 for symmetric encryption
- Poly1305 for authentication
- Curve25519 for key exchange
- BLAKE2s for hashing
- SipHash24 for hashtable keys

## Privacy Consideration

WireGuard stores the last-seen IP of connected peers. Some VPN providers (Mullvad, IVPN) have modified their WireGuard implementation to delete this data, improving privacy.

## Adoption

Mullvad, IVPN, Proton VPN, NordVPN (NordLynx), and Surfshark all support WireGuard.
