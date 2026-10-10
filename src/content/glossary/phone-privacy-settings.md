---
term: "Phone Privacy Settings"
slug: "phone-privacy-settings"
definition: "The essential privacy configurations on iOS and Android devices that most people never change — controlling what data apps can access, what your phone broadcasts, and what gets sent to Apple or Google."
category: "Mobile"
relatedTerms:
  - "grapheneos"
  - "calyxos"
  - "degoogled-phone"
  - "location-tracking-defense"
  - "sideloading"
aliases:
  - "Mobile Privacy Settings"
  - "Smartphone Privacy"
  - "iPhone Privacy Settings"
  - "Android Privacy Settings"
keywords:
  - "phone privacy settings"
  - "iPhone privacy settings 2026"
  - "Android privacy settings"
  - "smartphone privacy guide"
  - "phone tracking settings"
---

Your phone is the most intimate surveillance device you own. These settings can significantly reduce what it leaks.

## iPhone Privacy Settings

### Critical Changes
1. **Settings → Privacy → Tracking → Allow Apps to Request to Track**: Turn OFF
2. **Settings → Privacy → Location Services**: Set most apps to "Never" or "While Using"
3. **Settings → Privacy → Analytics**: Turn off "Share iPhone Analytics" and all sub-options
4. **Settings → Apple ID → iCloud → Advanced Data Protection**: Turn ON (end-to-end encrypts backups)
5. **Settings → Safari → Privacy**: Enable "Prevent Cross-Site Tracking", hide IP from trackers
6. **Settings → Privacy → Apple Advertising → Personalized Ads**: Turn OFF
7. **Settings → Passwords → Security Recommendations**: Review and fix compromised passwords

### Lockdown Mode (High-Risk Users)
Settings → Privacy & Security → Lockdown Mode. Significantly restricts device functionality to reduce attack surface. Designed for journalists, activists, and high-risk targets.

## Android Privacy Settings

### Critical Changes
1. **Settings → Privacy → Ads → Delete advertising ID**: Remove your device's ad tracking identifier
2. **Settings → Location → App location permissions**: Audit every app
3. **Settings → Privacy → Permission manager**: Review camera, microphone, contacts, etc.
4. **Settings → Google → Ads → Opt out of Ads Personalization**: Turn ON
5. **Settings → Google → Google Account → Data & Privacy**: Review and restrict data collection
6. **Settings → Connected devices → Connection preferences → Bluetooth**: Turn off when not in use (Bluetooth beaconing tracks location)
7. **Settings → Apps → Special app access**: Review which apps have special permissions

### De-Googled Android
For maximum privacy, replace stock Android with GrapheneOS (Pixel phones) or CalyxOS. These remove Google's data collection entirely while keeping Android functionality.

## Both Platforms

### App Permissions Audit
Go through every installed app and ask:
- Does this camera app need microphone access? (Probably yes)
- Does this flashlight app need location? (Absolutely not)
- Does this game need contacts? (No)
- Does this weather app need to track me always? ("While Using" is sufficient)

### Reduce Attack Surface
- **Delete unused apps** — Every app is a potential data collector
- **Update regularly** — Security patches close known vulnerabilities
- **Use app alternatives** — Replace data-hungry apps with privacy-respecting ones
- **Turn off Wi-Fi and Bluetooth** when not actively using them — both broadcast device identifiers
- **Use a VPN** — Encrypts all traffic from your device

### Notifications
- **Disable lock screen previews** — Messages and emails visible on a locked screen are readable by anyone who glances at your phone
- Settings → Notifications → Show Previews → "When Unlocked" or "Never"

## The Reality Check

These settings reduce tracking significantly, but don't eliminate it. Your phone still communicates with cell towers (revealing location), your carrier logs all metadata, and apps find creative ways to track you. For maximum mobile privacy, consider a de-Googled phone with GrapheneOS.
