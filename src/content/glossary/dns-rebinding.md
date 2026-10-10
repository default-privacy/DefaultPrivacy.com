---
term: "DNS Rebinding"
slug: "dns-rebinding"
definition: "An attack that manipulates DNS responses to make a web browser access resources on a victim's local network, bypassing same-origin security policies."
category: "Attacks"
relatedTerms:
  - "dns-poisoning"
  - "man-in-the-middle"
---

DNS rebinding tricks your browser into thinking a malicious website and your local network devices share the same origin.

## How It Works

1. Victim visits attacker.com
2. attacker.com's DNS initially resolves to the attacker's server
3. After initial page load, the DNS record changes to 192.168.1.1 (your router)
4. The browser thinks it's still talking to attacker.com
5. JavaScript on the page can now access your router's admin interface

## Impact

- Access and modify router configuration
- Interact with IoT devices on your network
- Exfiltrate data from internal services
- Pivot to further attacks on your network

## Protection

1. Use a DNS resolver that blocks private IP ranges in external responses
2. Set strong passwords on all local devices (routers, NAS, cameras)
3. Use network segmentation to isolate IoT devices
4. Keep router firmware updated
