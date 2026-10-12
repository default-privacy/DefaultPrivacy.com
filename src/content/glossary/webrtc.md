---
term: "WebRTC"
slug: "webrtc"
definition: "A browser technology for real-time communication (video calls, file sharing) that can accidentally reveal your real IP address even when using a VPN."
category: "Browsers"
relatedTerms:
  - "webrtc-leak"
  - "vpn"
  - "browser-fingerprinting"
---

WebRTC (Web Real-Time Communication) enables peer-to-peer communication directly in the browser, but its IP discovery mechanism is a privacy risk.

## How WebRTC Leaks Your IP

- WebRTC needs to discover your network interfaces to establish peer connections
- It uses STUN servers to find your public IP
- This happens at the browser level, bypassing VPN routing
- Your real IP can be exposed even with an active VPN

## How to Check

- BrowserLeaks.com has a dedicated WebRTC test

## How to Fix

- **Firefox**: Set `media.peerconnection.enabled` to false in about:config

## Trade-offs

Disabling WebRTC breaks video calling in the browser (Google Meet, Jitsi). If you need browser-based video calls, use a browser profile with WebRTC enabled and your VPN carefully configured.

For what to use, see [Private browsers compared](/guides/private-browsers-compared).
