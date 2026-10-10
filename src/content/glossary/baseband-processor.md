---
term: "Baseband Processor"
slug: "baseband-processor"
definition: "A separate processor in your phone that handles all cellular communication, runs its own proprietary firmware, and has direct access to the microphone and GPS."
category: "Mobile"
relatedTerms:
  - "imsi-catcher"
  - "imei"
---

The baseband processor is the most privileged and least understood component in your phone. It's a security and privacy black box.

## What It Is

- A separate CPU from the main application processor
- Handles all cellular radio communication (calls, texts, data)
- Runs proprietary, closed-source firmware from Qualcomm, Intel, Samsung, or MediaTek
- Has direct memory access (DMA) to the main processor

## Privacy Concerns

- Baseband firmware has never been fully audited
- Known to have exploitable vulnerabilities
- Has access to microphone, GPS, and potentially all device memory
- Cannot be disabled while maintaining cellular connectivity
- Theoretically could be remotely activated for surveillance

## Mitigation

- **Librem 5 (Purism)**: Hardware kill switches physically disconnect the baseband
- **PinePhone**: Baseband is on a removable M.2 card
- **WiFi-only devices**: No baseband processor at all
- Mainstream phones offer no way to isolate or audit the baseband
