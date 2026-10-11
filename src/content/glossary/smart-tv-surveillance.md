---
term: "Smart TV Surveillance"
slug: "smart-tv-surveillance"
definition: "The data collection practices of internet-connected televisions that track what you watch, when and for how long, by fingerprinting whatever is playing, including devices plugged in over HDMI."
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

Your TV is watching you watch it. Texas's 2025 lawsuits say about 68% of US households now own a smart TV.

## How Smart TVs Track You

### Automatic Content Recognition (ACR)
The primary tracking technology. ACR samples the picture or sound several times a second or more, turns it into a short digital fingerprint, and sends that fingerprint to be matched against a library of shows and ads. (Texas's attorney general calls these "screenshots"; the makers and researchers describe fingerprints.) It can fingerprint:
- The maker's own free streaming channels (and on some brands, like Vizio, what you watch in apps)
- Cable/satellite TV
- Blu-ray playback
- Video game content
- Even content from connected devices (laptop, gaming console)

ACR identifies what you're watching and reports it back to the TV manufacturer and their partners.

### Additional Data Collection
- **Microphones**: Voice features send your commands when you use them.
- **Cameras**: Some models include cameras for video calling and gesture control
- **App usage**: Which apps you use, when, and for how long
- **Network data**: Nearby Wi-Fi access points. Vizio collects their hardware addresses, and LG says that with ACR on it may use them to estimate the TV's approximate location
- **Advertising ID**: Unique device identifier for targeted advertising

## Who's Doing It

| Manufacturer | Tracking System | Data Use |
|-------------|----------------|----------|
| Samsung | Smart Hub, ACR | Advertising, content recommendations |
| LG | ACR, webOS analytics | Audience segments, and targeted ads if you opt in (via LG Ad Solutions) |
| Vizio | Viewing Data (ACR) | Licenses viewing data to advertisers and data partners (FTC and New Jersey, $2.2M settlement, 2017) |
| Roku | ACR (off by default) | Core advertising business model |
| Amazon (Fire TV) | Viewing data, Alexa | Amazon advertising ecosystem |
| Google (Google TV) | Advertising ID, Google account activity; ACR only if the TV maker adds it | Google advertising ecosystem |

## Why It Matters

- Your viewing habits reveal **political beliefs** (news channels), **health concerns** (medical shows), **interests**, and **daily routine**
- Viewing data is combined with other data sources to build detailed profiles
- TV advertising is now targeted using the same surveillance infrastructure as online ads
- Some makers license viewing data to advertisers and analytics companies, and combine it with information from data brokers (Vizio says so in its policy)

## How to Protect Yourself

1. **Disable ACR** during setup. Most TVs ask during initial setup (buried in "improve experience" language). Each brand names the switch differently and the menus move between model years, so see [how to turn off smart TV tracking](/guides/turn-off-smart-tv-tracking) for current steps by brand
2. **Don't connect your TV to WiFi**. Use a separate streaming device (Apple TV, Roku with settings locked down) instead
3. **Disable microphone and camera**. Physical covers for cameras; disable voice features
4. **Block TV tracking at the network level**. Pi-hole or NextDNS can block TV tracking domains, but many TVs use their own hard-coded DNS, so your router must force all DNS through the blocker, and encrypted DNS can still slip past ([how to set that up](/guides/private-dns-and-ad-blocking))
5. **Use a "dumb" monitor** with a separate streaming device you control
6. **Decline all "personalization" and "improvement" options** during setup
