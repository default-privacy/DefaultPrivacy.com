---
term: "Public WiFi Safety"
slug: "public-wifi-safety"
definition: "Security practices for protecting your data when using public WiFi networks in cafes, airports, hotels, and other shared spaces — where unencrypted traffic can be intercepted, fake hotspots can steal credentials, and your device may be exposed to other users on the network."
category: "Networking"
relatedTerms:
  - "vpn"
  - "man-in-the-middle"
  - "evil-twin-attack"
  - "dns-over-https"
  - "https"
aliases:
  - "Public WiFi Security"
  - "WiFi Safety Tips"
  - "Hotel WiFi Security"
  - "Coffee Shop WiFi Safety"
keywords:
  - "public WiFi safety"
  - "is public WiFi safe"
  - "hotel WiFi security"
  - "coffee shop WiFi safe"
  - "public WiFi VPN"
  - "public WiFi risks"
  - "airport WiFi security"
---

That free coffee shop WiFi is convenient — but it's also a hunting ground for attackers. **Anyone on the same network** can potentially see your traffic, steal your credentials, or infect your device.

## The Risks

### Evil Twin Attacks
- Attacker creates a WiFi hotspot with a name identical to the legitimate one ("Starbucks_WiFi")
- Your device automatically connects to the fake network
- All traffic is routed through the attacker's device
- They can see everything you do and inject malicious content

### Traffic Interception
- On unencrypted networks, anyone with basic tools can **capture packets** from other users
- Login credentials, emails, and browsing activity can be seen in real time
- Even on encrypted (WPA2) networks, shared passwords mean all users can potentially decrypt each other's traffic

### Session Hijacking
- Attackers capture your **session cookies** to impersonate you on websites
- They gain access to your logged-in accounts without needing your password

### Malware Distribution
- Attackers exploit vulnerabilities in other devices on the same network
- Fake captive portals that mimic the "agree to terms" page but install malware
- File-sharing enabled on your device can expose your files to the network

## How to Stay Safe

### Essential (Do These Every Time)
1. **Verify HTTPS** — Only enter sensitive information on HTTPS sites (padlock icon).
2. **Forget the network after use** — Prevent your device from auto-connecting next time

### Recommended
3. **Disable auto-connect** — Turn off automatic WiFi connection in your device settings
4. **Use DNS over HTTPS** — Prevents DNS queries from being intercepted (Firefox: enabled by default; other browsers: manual setting)
5. **Turn off file sharing and AirDrop** — Close any sharing services on your device
6. **Enable your firewall** — Block incoming connections

### Advanced
7. **Use your phone's hotspot instead** — Cellular data is much harder to intercept than WiFi
8. **Check the network name with staff** — Verify the exact SSID before connecting
9. **Use a travel router** — A portable VPN router creates your own encrypted network
10. **Run a DNS leak test** to verify your VPN is working properly on public WiFi

## The VPN Solution

A VPN is effectively a **private tunnel** through the public network:
- All data between your device and the VPN server is encrypted
- Even if someone intercepts your traffic, they see encrypted gibberish
- Your browsing, logins, and activity are hidden from the local network

For what to use, see [Remote worker privacy stack](/stacks/remote-worker-privacy-stack).
