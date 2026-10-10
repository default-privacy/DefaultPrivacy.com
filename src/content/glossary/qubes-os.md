---
term: "Qubes OS"
slug: "qubes-os"
definition: "A security-focused desktop operating system that uses hardware virtualization to isolate different activities in separate virtual machines."
category: "Hardware"
relatedTerms:
  - "compartmentalization"
  - "browser-isolation"
  - "air-gapped-computer"
---

Qubes OS achieves security through isolation — if one compartment is compromised, the others remain safe.

## How It Works

- Each activity runs in its own virtual machine (qube)
- A compromised web browser can't access your files or other applications
- Different qubes can have different trust levels
- Copy/paste between qubes requires explicit user action

## Typical Qube Setup

- **Personal**: Email, documents, personal browsing
- **Work**: Work email, office applications
- **Banking**: Only used for financial services
- **Untrusted**: Random web browsing, opening suspicious files
- **Vault**: Offline qube for passwords, keys, sensitive files
- **Whonix**: Tor-routed qube for anonymous browsing

## Who Uses It

- Edward Snowden recommends Qubes
- Journalists, activists, security researchers
- Anyone whose threat model requires strong compartmentalization

## Requirements

- Requires a relatively powerful computer (16GB+ RAM recommended)
- Learning curve is significant
- Not all hardware is compatible (check the Hardware Compatibility List)
