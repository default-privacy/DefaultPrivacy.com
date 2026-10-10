---
term: "Device Fingerprinting"
slug: "device-fingerprinting"
definition: "Identifying a device (and thus its user) by collecting unique characteristics—screen size, fonts, plugins, hardware specs, behavior. Unlike cookies, fingerprints can't be easily cleared and persist across sessions."
category: "Tracking"
relatedTerms:
  - "cross-device-tracking"
  - "browser-fingerprinting"
  - "tracking"
aliases:
  - "Device ID"
  - "Fingerprinting"
---

Your device is unique. The combination of hundreds of attributes—many you didn't know your device had—creates a fingerprint that identifies you even without cookies.

## What Gets Fingerprinted

### Browser/Software
- Screen resolution and color depth
- Installed fonts
- Browser plugins and extensions
- Timezone and language
- Canvas and WebGL rendering (subtle hardware differences)
- Audio context (speaker/microphone characteristics)

### Hardware
- CPU cores and memory
- GPU model
- Battery status
- Touch support

### Behavioral
- Typing patterns
- Mouse movements
- Scroll behavior

## Why Fingerprinting Persists

- **No user control**: Unlike cookies, you can't delete a fingerprint
- **Cross-session**: Works in incognito, after clearing data
- **Cross-browser**: Same device, different browsers—often same fingerprint
- **Resistant to regulation**: Harder to define and block than cookies

## Privacy Implications

- **Tracking without consent**: Bypasses cookie consent mechanisms
- **Identification**: 99%+ uniqueness with enough attributes
- **Persistence**: Survives VPN, cookie deletion, browser reset
- **Regulation**: GDPR considers it personal data; browser vendors are adding anti-fingerprinting measures
