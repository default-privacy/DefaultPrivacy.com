---
term: "Browser Fingerprinting"
slug: "browser-fingerprinting"
definition: "A tracking technique that collects information about your browser, device, and settings to create a unique identifier. Unlike cookies, fingerprints are nearly impossible to delete and can track you across websites without your knowledge or consent."
category: "Browsers"
relatedTerms:
  - "tracking"
  - "cookies"
  - "privacy-by-design"
aliases:
  - "Device Fingerprinting"
  - "Canvas Fingerprinting"
seeAlso:
  - name: "Tor Browser"
    slug: "tor-browser"
  - name: "Brave Browser"
    slug: "brave"
---

Browser fingerprinting identifies you based on your device's unique characteristics—no cookies required. Even in "private" browsing mode, your fingerprint can follow you across the web.

## What Gets Fingerprinted

- **Browser type and version**
- **Operating system**
- **Installed fonts**
- **Screen resolution and color depth**
- **Timezone and language settings**
- **Installed plugins and extensions**
- **Canvas rendering** (how your GPU draws graphics)
- **WebGL capabilities**
- **Audio context fingerprint**
- **Hardware specifications**

## Why It's Dangerous

- **Persistent**: Can't be cleared like cookies
- **Invisible**: Happens silently in the background
- **Cross-site**: Works across different websites
- **Resilient**: Survives browser resets and VPN changes

## How Unique Is Your Fingerprint?

Studies show that 99%+ of browsers have unique fingerprints. Even small changes in your setup create a distinct signature.

## Protection Strategies

1. **Tor Browser**: Designed to make all users look identical
2. **Firefox with resistFingerprinting**: `privacy.resistFingerprinting = true`
3. **Brave Browser**: Built-in fingerprinting protection
4. **Browser extensions**: Canvas Blocker, uBlock Origin

## The Irony of Protection

Adding anti-fingerprinting extensions can make you *more* unique. The best approach is using a browser designed from the ground up for fingerprint resistance.

