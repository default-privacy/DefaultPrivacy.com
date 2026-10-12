---
term: "Secure WiFi Setup"
slug: "secure-wifi-setup"
definition: "Best practices for configuring your home WiFi network to prevent unauthorized access, reduce surveillance, and protect all connected devices — including router hardening, encryption settings, DNS configuration, and network segmentation."
category: "Networking"
relatedTerms:
  - "public-wifi-safety"
  - "dns-over-https"
  - "vpn"
  - "network-segmentation"
  - "iot-security"
aliases:
  - "Home WiFi Security"
  - "Router Security"
  - "WiFi Privacy Setup"
keywords:
  - "secure WiFi setup"
  - "home WiFi security"
  - "secure router settings"
  - "WiFi privacy"
  - "home network security"
  - "router security settings"
  - "WiFi security best practices"
---

Your home WiFi router is the **front door** to your digital life. An insecure router exposes every device in your home — computers, phones, smart devices, security cameras — to potential surveillance and attack.

## Essential Setup Steps

### 1. Change Default Credentials
- **Router admin password**: Change from "admin/admin" immediately
- Use a strong, unique password (20+ characters)
- Default passwords are publicly listed for every router model

### 2. Use WPA3 Encryption
| Protocol | Security | Status |
|----------|----------|--------|
| WEP | Broken | Never use |
| WPA | Broken | Never use |
| WPA2 | Adequate | Minimum acceptable |
| **WPA3** | **Strong** | **Use if available** |

- Set encryption to **WPA3-Personal** (or WPA2/WPA3 transitional if some devices don't support WPA3)
- Use a strong WiFi password (12+ characters)

### 3. Update Router Firmware
- Check your router manufacturer's website for updates
- Many critical vulnerabilities are patched through firmware updates
- Enable automatic updates if available
- Consider replacing routers that no longer receive updates

### 4. Change Default Network Name (SSID)
- Don't use your name, address, or router model in the SSID
- A generic name prevents targeted attacks based on known router vulnerabilities
- You can disable SSID broadcast, but this provides minimal real security

### 5. Configure Private DNS
Replace your ISP's DNS (which logs all your browsing) with a privacy-focused alternative. See [Private DNS and ad blocking](/guides/private-dns-and-ad-blocking).

Set this at the router level so **all devices** benefit.

## Advanced Security

### Network Segmentation
- Create a **separate guest network** for IoT devices (smart TVs, cameras, speakers)
- IoT devices are notoriously insecure — isolating them prevents a compromised smart bulb from accessing your computer
- Use the guest network for visitors instead of sharing your main WiFi password

### Disable WPS
- WiFi Protected Setup (WPS) has known vulnerabilities
- It can be brute-forced to reveal your WiFi password
- Disable it in router settings

### Disable Remote Management
- Turn off remote administration (access from outside your network)
- If you need remote access, use a VPN to your home network

### MAC Address Filtering
- Optional: Only allow known devices to connect
- Not foolproof (MAC addresses can be spoofed) but adds a layer

### Router-Level VPN
- Some routers support running a VPN at the router level
- All traffic from all devices is automatically encrypted
- Eliminates the need to install VPN apps on individual devices

## When to Replace Your Router

- **No firmware updates** in 12+ months — the manufacturer has abandoned it
- **Only supports WPA2** — no WPA3 capability
- **Provided by your ISP** — ISP routers are often outdated and may have backdoors for remote access
- **Known vulnerabilities** listed on CVE databases
