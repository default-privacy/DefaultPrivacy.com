---
term: "Browser Isolation"
slug: "browser-isolation"
definition: "A security technique that runs web browsing in an isolated environment, preventing malicious websites from accessing your device or local network."
category: "Browsers"
relatedTerms:
  - "private-browsing"
  - "browser-fingerprinting"
---

Browser isolation prevents web-based threats from reaching your actual device.

## Types

- **Remote browser isolation**: Browsing happens on a remote server; only the visual output is sent to your device
- **Local isolation**: Browser runs in a sandbox/container on your device
- **Disposable browsers**: Temporary browser instances that are destroyed after use

## Tools

- **Qubes OS**: Each browser window runs in a separate virtual machine
- **Whonix**: Isolates Tor browsing in a separate VM
- **Docker-based browsers**: Run browsers in disposable containers
- **Brave**: Strong per-site isolation with partitioned storage

## When to Use

- Visiting untrusted websites
- Researching sensitive topics
- Opening suspicious links
- Separating personal and work browsing
