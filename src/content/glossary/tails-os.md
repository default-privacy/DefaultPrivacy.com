---
term: "Tails OS"
slug: "tails-os"
definition: "A portable operating system that routes all traffic through Tor and leaves no trace on the computer it runs on, designed for maximum anonymity."
category: "Hardware"
relatedTerms:
  - "tor-network"
  - "air-gapped-computer"
  - "operational-security"
---

Tails (The Amnesic Incognito Live System) is designed for situations where anonymity is critical and no trace can be left behind.

## Key Features

- **Amnesic**: Runs from USB, stores nothing on the computer's disk
- **All traffic through Tor**: Every connection is routed through the Tor network
- **Includes privacy tools**: Tor Browser, Thunderbird + OpenPGP, KeePassXC, OnionShare
- **Secure communication**: Pre-installed encrypted messaging and email

## Use Cases

- Whistleblowing and journalistic source protection
- Accessing the internet from untrusted computers
- Sensitive research that shouldn't be linked to your identity
- Communicating in hostile environments

## How to Use

1. Download and verify from tails.net
2. Flash to a USB drive
3. Boot any computer from the USB
4. When done, shut down — no traces remain

## Limitations

- All traffic going through Tor is slow
- Some websites block Tor exit nodes
- Hardware identifiers (MAC address) are randomized but not all leaks are prevented
- Physical surveillance can observe you using Tails
