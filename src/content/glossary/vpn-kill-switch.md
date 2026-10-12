---
term: "Virtual Private Network Kill Switch"
slug: "vpn-kill-switch"
definition: "A VPN feature that blocks all internet traffic if the VPN connection drops, preventing accidental exposure of your real IP address."
category: "Networking"
relatedTerms:
  - "vpn"
  - "dns-leak"
  - "split-tunneling"
---

Without a kill switch, a momentary VPN disconnection exposes your real IP and traffic to your ISP.

## How It Works

- Monitors the VPN connection continuously
- If the connection drops, immediately blocks all internet traffic
- Traffic only resumes when the VPN reconnects
- Prevents any data from leaking outside the tunnel

## Types

- **Application-level**: Kills specific apps when VPN drops
- **System-level**: Blocks ALL internet traffic when VPN drops (more secure)
- **Firewall-based**: Uses OS firewall rules (most robust)

WireGuard can be configured with firewall rules for kill switch behavior.

## Should You Use It?

Yes, always. There's no downside to a kill switch beyond a brief internet interruption when the VPN reconnects.

For what to use, see [Mullvad vs Proton VPN](/guides/mullvad-vs-proton-vpn).
