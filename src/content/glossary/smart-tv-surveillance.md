---
term: "Smart TV Surveillance"
slug: "smart-tv-surveillance"
definition: "The data collection practices of internet-connected televisions that track what you watch, when you watch, how long you watch, and increasingly capture audio and visual data from your living room."
category: "Emerging Threats"
relatedTerms:
  - "smart-home-surveillance"
  - "ambient-listening"
  - "iot-security"
  - "digital-exhaust"
aliases:
  - "TV Tracking"
  - "Smart TV Spying"
  - "ACR Tracking"
keywords:
  - "smart TV privacy"
  - "TV spying on me"
  - "smart TV data collection"
  - "TV tracking what I watch"
---

Your TV is watching you watch it. Smart TVs are one of the most aggressive data collectors in the average home — and they're in 80%+ of US households.

## How Smart TVs Track You

### Automatic Content Recognition (ACR)
The primary tracking technology. ACR takes periodic screenshots or audio fingerprints of whatever is displayed on your screen — including:
- Streaming content (Netflix, YouTube, etc.)
- Cable/satellite TV
- Blu-ray playback
- Video game content
- Even content from connected devices (laptop, gaming console)

ACR identifies what you're watching and reports it back to the TV manufacturer and their partners.

### Additional Data Collection
- **Microphones**: Voice-enabled remotes and built-in microphones capture voice commands — and sometimes more
- **Cameras**: Some models include cameras for video calling and gesture control
- **App usage**: Which apps you use, when, and for how long
- **Network data**: What other devices are on your WiFi network
- **Advertising ID**: Unique device identifier for targeted advertising

## Who's Doing It

| Manufacturer | Tracking System | Data Use |
|-------------|----------------|----------|
| Samsung | Smart Hub, ACR | Advertising, content recommendations |
| LG | ACR, webOS analytics | Targeted ads on home screen |
| Vizio | Inscape (ACR) | Sold viewing data to advertisers ($17M FTC fine in 2017) |
| Roku | ACR, channel tracking | Core advertising business model |
| Amazon (Fire TV) | Viewing data, Alexa | Amazon advertising ecosystem |
| Google (Android TV) | Viewing data, Google account | Google advertising ecosystem |

## Why It Matters

- Your viewing habits reveal **political beliefs** (news channels), **health concerns** (medical shows), **interests**, and **daily routine**
- Viewing data is combined with other data sources to build comprehensive profiles
- TV advertising is now targeted using the same surveillance infrastructure as online ads
- Smart TV data is sold to data brokers, advertisers, and analytics companies

## How to Protect Yourself

1. **Disable ACR** during setup — Most TVs ask during initial setup (buried in "improve experience" language)
   - Samsung: Settings → General → Privacy → Viewing Information Services → Off
   - LG: Settings → Additional Settings → LivePlus → Off
   - Vizio: Settings → System → Reset & Admin → Viewing Data → Off
   - Roku: Settings → Privacy → Smart TV Experience → Off
2. **Don't connect your TV to WiFi** — Use a separate streaming device (Apple TV, Roku with settings locked down) instead
3. **Disable microphone and camera** — Physical covers for cameras; disable voice features
4. **Block TV tracking at the network level** — Pi-hole or NextDNS can block TV telemetry domains
5. **Use a "dumb" monitor** with a separate streaming device you control
6. **Decline all "personalization" and "improvement" options** during setup
