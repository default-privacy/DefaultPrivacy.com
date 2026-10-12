---
term: "Canvas Fingerprinting"
slug: "canvas-fingerprinting"
definition: "A browser fingerprinting technique that exploits the HTML5 Canvas element to identify users based on how their GPU renders graphics."
category: "Browsers"
relatedTerms:
  - "browser-fingerprinting"
  - "webrtc-leak"
---

Canvas fingerprinting generates a unique identifier by asking your browser to draw an invisible image and analyzing the result.

## How It Works

1. A script creates a hidden Canvas element
2. Draws text and shapes using specific fonts and rendering
3. Reads the pixel data back
4. Different hardware, drivers, and OS produce slightly different outputs
5. The hash of the output serves as a fingerprint

## Why Outputs Differ

- GPU hardware differences affect rendering
- Font rasterization varies across operating systems
- Anti-aliasing algorithms differ
- Sub-pixel rendering settings vary

## Detection and Blocking

- Privacy-focused browsers can notify you when Canvas fingerprinting is attempted

For what to use, see [Private browsers compared](/guides/private-browsers-compared).
