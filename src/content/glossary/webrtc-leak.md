---
term: "WebRTC Leak"
slug: "webrtc-leak"
definition: "A browser vulnerability where WebRTC (used for video calls and peer-to-peer communication) reveals your real IP address even when using a VPN, because WebRTC can access your network interfaces directly."
category: "Browsers"
relatedTerms:
  - "dns-leak"
  - "vpn"
  - "browser-fingerprinting"
aliases:
  - "WebRTC IP Leak"
keywords:
  - "IP leak"
  - "browser leak"
  - "real IP"
  - "STUN server"
  - "video chat leak"
---

WebRTC is a powerful technology that enables browser-based video calls without plugins. But that power comes with a privacy cost: it can expose your real IP address even when you're using a VPN.

## How WebRTC Leaks Work

WebRTC needs to discover your network interfaces to establish peer connections:

1. Browser uses STUN servers to discover IPs
2. Discovers both local and public IPs
3. This bypasses VPN/proxy settings
4. JavaScript on any page can access these IPs
5. Your real IP is exposed

## What Gets Leaked

### Public IP
- Your real internet IP
- Even when connected to VPN
- Geographic location revealed

### Local IPs
- 192.168.x.x, 10.x.x.x addresses
- Reveals network structure
- Can help identify you

## Testing for WebRTC Leaks

### Quick Test
1. Connect to your VPN
2. Visit browserleaks.com/webrtc
3. Check if real IP appears

### What You Should See
- Only VPN's IP address
- Or no IPs at all
- No local network IPs

## Preventing WebRTC Leaks

### Browser Settings

**Firefox:**
```
about:config → media.peerconnection.enabled → false
```

**Brave:**
- Settings → Privacy → "Prevent WebRTC leaks" → enabled

**Safari:**
- Generally safe (limited WebRTC support)

### Browser Extensions
- uBlock Origin (has WebRTC control)
- WebRTC Leak Prevent
- Disable WebRTC

### VPN Features
- Many VPNs include WebRTC protection
- Browser extensions from VPN providers
- Check your VPN's settings

## Trade-offs

### Disabling WebRTC
**Breaks:**
- Video/voice calls in browser
- Some file transfer features
- Screen sharing
- Some games

**Preserves:**
- Real IP privacy
- Location privacy

### Selective Control
- Enable only for trusted sites
- Use separate browser for calls
- Accept some risk vs functionality

