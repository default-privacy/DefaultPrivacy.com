---
term: "QR Code Phishing"
slug: "qr-code-phishing"
definition: "A phishing technique (also called 'quishing') that uses malicious QR codes to redirect victims to fake websites, trigger malware downloads, or steal credentials — exploiting the fact that people can't visually verify where a QR code leads before scanning."
category: "Attacks"
relatedTerms:
  - "phishing"
  - "social-engineering"
  - "credential-harvesting"
  - "man-in-the-middle"
aliases:
  - "Quishing"
  - "QR Phishing"
  - "Malicious QR Code"
keywords:
  - "QR code phishing"
  - "quishing"
  - "malicious QR code"
  - "QR code scam"
  - "fake QR code"
  - "QR code safety"
---

QR codes are everywhere — restaurant menus, parking meters, package deliveries, event tickets. Criminals exploit this ubiquity by replacing legitimate QR codes with malicious ones that steal your data.

## How It Works

- Attacker creates a QR code that links to a **phishing site, malware download, or credential harvester**
- The malicious QR code is placed over a legitimate one (sticker on a parking meter, poster, menu)
- Victim scans the code, sees what looks like a normal login page or payment form
- Victim enters credentials or payment information, which goes directly to the attacker

## Real-World Attack Vectors

### Parking Meters
- Fake QR code stickers placed on parking meters in **30+ US cities** (2022-2024)
- Victims think they're paying for parking; instead, credit card details are stolen

### Package Delivery
- Fake "missed delivery" notices left at doors with a QR code to "reschedule"
- Code leads to a phishing site harvesting personal information

### Email Quishing
- Phishing emails contain QR codes instead of clickable links
- **Bypasses email security filters** that scan URLs but can't read QR codes
- Often impersonates Microsoft 365, DocuSign, or banking login pages

### Restaurant Menus
- Replaced QR codes on tables redirect to sites that request unnecessary permissions or install malware

### EV Charging Stations
- Fake QR codes on electric vehicle charging stations redirect payments to scammers

## Why QR Phishing Is Effective

1. **You can't see the URL** before scanning — unlike a link you can hover over
2. **Mobile phones** have weaker security than computers — fewer phishing protections
3. **Trust in QR codes** has increased since COVID-era contactless adoption
4. **Bypasses email security** — security tools scan text links but not embedded QR images
5. **Physical placement** adds legitimacy — a QR code on a parking meter seems official

## How to Protect Yourself

1. **Preview the URL** before opening — most phone cameras show the URL; check it before tapping
2. **Look for tampering** — stickers placed over existing QR codes are a red flag
3. **Don't enter credentials** on sites reached via QR code — navigate to the site directly instead
4. **Use a QR scanner app** that checks URLs against phishing databases
5. **Be skeptical of urgency** — "Scan NOW to avoid a fine" is a social engineering tactic
6. **Never scan QR codes from emails** — go to the website directly instead
