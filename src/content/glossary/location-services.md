---
term: "Location Services"
slug: "location-services"
definition: "A system that determines your device's location using GPS, WiFi, cell towers, and Bluetooth, often shared with apps and service providers."
category: "Mobile"
relatedTerms:
  - "geofencing"
  - "metadata"
  - "ip-address"
---

Your phone knows where you are through multiple overlapping systems, making location one of the hardest things to keep private.

## How Location Is Determined

- **GPS**: Satellite signals — accurate to ~3 meters
- **WiFi positioning**: Known WiFi network locations — accurate to ~15 meters
- **Cell tower triangulation**: Signal strength from nearby towers — accurate to ~300 meters
- **Bluetooth beacons**: Indoor positioning — accurate to ~1 meter
- **IP geolocation**: Rough estimate from your internet connection

## Who Gets Your Location

- Your mobile carrier (always, when the phone is on)
- Google/Apple (unless explicitly disabled)
- Any app you've granted location permission
- Advertising networks (via SDK in apps)

## How to Limit Location Tracking

1. Disable location services when not actively needed
2. Set app permissions to "While Using" instead of "Always"
3. Turn off WiFi and Bluetooth scanning in location settings
4. Use a VPN to obscure IP-based location
5. For complete location privacy: airplane mode or Faraday bag
