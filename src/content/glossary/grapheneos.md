---
term: "GrapheneOS"
slug: "grapheneos"
definition: "A privacy and security-focused mobile operating system based on Android, designed to minimize data collection while maintaining app compatibility."
category: "Mobile"
relatedTerms:
  - "app-permissions"
  - "mobile-ad-id"
---

GrapheneOS is the gold standard for privacy-focused mobile operating systems.

## Key Features

- **Hardened Android**: Additional exploit mitigations beyond stock Android
- **No Google services by default**: Optional, sandboxed Google Play compatibility
- **Network permission toggle**: Control which apps can access the internet
- **Storage scopes**: Apps only see their own files by default
- **Sensor permissions**: Control access to camera, microphone, accelerometer per-app
- **MAC randomization**: Per-connection MAC address randomization

## Supported Devices

Only Google Pixel phones (they have the best hardware security features: Titan M2 chip, verified boot, long update support).

## Trade-offs

- Some apps may not work without Google Play Services
- Banking apps may detect the modified OS
- Requires a Pixel phone (limited hardware choice)

## Compared to Other Privacy ROMs

- **CalyxOS**: Easier to use, includes microG (Google compatibility layer)
- **LineageOS**: Wider device support, fewer privacy features
- **/e/OS**: Focus on de-Googling, less security-focused than GrapheneOS
