---
term: "CAPTCHA"
slug: "captcha"
definition: "A test designed to distinguish humans from bots, which increasingly uses behavioral analysis and tracking that creates privacy concerns."
category: "Browsers"
relatedTerms:
  - "browser-fingerprinting"
  - "third-party-tracking"
---

CAPTCHAs protect websites from automated abuse but come with significant privacy costs.

## The Privacy Problem

- **Google reCAPTCHA**: Tracks users across sites, uses cookies, analyzes browsing behavior
- **hCaptcha**: Collects less data but still tracks behavior
- CAPTCHAs penalize privacy-conscious users (VPNs, Tor, disabled cookies trigger more challenges)

## Alternatives

- **Cloudflare Turnstile**: Minimal data collection, no visual puzzles
- **Proof of Work**: Make clients solve a computational puzzle
- **Privacy Pass**: Cryptographic tokens that prove humanity without tracking

## Impact on Tor Users

Tor users face constant CAPTCHA challenges because Tor exit nodes are flagged. This creates a significant barrier to privacy-focused browsing.
