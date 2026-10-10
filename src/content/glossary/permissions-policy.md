---
term: "Permissions Policy"
slug: "permissions-policy"
definition: "An HTTP header that allows websites to control which browser features (camera, microphone, geolocation, etc.) can be used on the page."
category: "Browsers"
relatedTerms:
  - "content-security-policy"
  - "browser-fingerprinting"
---

Permissions Policy (formerly Feature Policy) lets websites disable browser APIs they don't need, reducing their attack surface and fingerprinting potential.

## Controllable Features

- Camera and microphone access
- Geolocation
- Fullscreen mode
- Payment request API
- Autoplay
- Accelerometer and gyroscope
- USB and Bluetooth access

## Privacy Benefits

- Prevents embedded third-party content from accessing sensitive APIs
- Reduces the browser fingerprinting surface
- Signals to users that the site respects privacy

## Example

`Permissions-Policy: camera=(), microphone=(), geolocation=()`

This header says: no one (not even the site itself) can access the camera, microphone, or geolocation. Embedded iframes are also blocked from these features.

## Connection to Privacy Scanning

Privacy scanners (like Default Privacy's scanner) check for Permissions Policy as an indicator of a site's privacy posture.
