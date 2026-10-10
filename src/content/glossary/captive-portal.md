---
term: "Captive Portal"
slug: "captive-portal"
definition: "A web page that forces users to interact with it before granting internet access, commonly used in hotel, airport, and cafe WiFi networks."
category: "Networking"
relatedTerms:
  - "vpn"
  - "dns-leak"
  - "man-in-the-middle"
---

Captive portals intercept your traffic and redirect you to a login or acceptance page. They're ubiquitous in public WiFi.

## Privacy Concerns

- Often require personal information (email, phone number, social media login)
- Can inject tracking scripts into your browsing session
- Your device sends probe requests that can be tracked
- Some portals install tracking cookies

## Security Risks

- Traffic before authentication is completely unencrypted
- Fake captive portals can be used for phishing (evil twin attacks)
- The portal operator can monitor all traffic on the network

## Protection

1. Use cellular data instead of public WiFi when possible
2. Connect to your VPN immediately after portal authentication
3. Never enter real personal information in captive portals
4. Use a burner email address for WiFi signup
5. Forget the network when you leave
