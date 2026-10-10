---
term: "MAC Address"
slug: "mac-address"
definition: "A unique hardware identifier assigned to every network interface, which can be used to track devices across WiFi networks."
category: "Networking"
relatedTerms:
  - "ipv6-privacy-extensions"
  - "browser-fingerprinting"
---

A MAC (Media Access Control) address is a 48-bit identifier burned into your network hardware. Every WiFi adapter, Ethernet port, and Bluetooth chip has one.

## Privacy Risk

- WiFi probe requests broadcast your MAC address to nearby access points
- Retailers use MAC tracking to monitor foot traffic in stores
- Your device can be tracked across locations if the MAC is consistent

## MAC Randomization

Modern operating systems randomize MAC addresses to counter tracking:

- **iOS 14+**: Random MAC per network by default
- **Android 10+**: Random MAC per network by default
- **Windows 10+**: Optional random hardware addresses
- **macOS**: Randomizes during WiFi scanning

## Limitations

- Some devices still send the real MAC during connection
- Connected devices may reveal their true MAC through other means
- MAC randomization doesn't help once you're authenticated on a network
