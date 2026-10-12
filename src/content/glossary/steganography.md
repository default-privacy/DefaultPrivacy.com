---
term: "Steganography"
slug: "steganography"
definition: "The practice of hiding secret data within ordinary files like images, audio, or text, so that the existence of the hidden data is not apparent."
category: "Encryption"
relatedTerms:
  - "plausible-encryption"
  - "deniable-encryption"
  - "metadata"
---

While encryption makes data unreadable, steganography makes it invisible.

## How It Works in Images

- Digital images contain millions of pixels, each with color values
- Changing the least significant bit of each pixel is imperceptible to the human eye
- These bits can encode hidden data
- A 1920x1080 image can hide ~250KB of data

## Other Media

- **Audio**: Hide data in inaudible frequencies or slight amplitude changes
- **Video**: Spread data across frames
- **Text**: Use whitespace variations, Unicode homoglyphs, or zero-width characters
- **Network**: Hide data in protocol headers or timing patterns

## Detection

Steganalysis can sometimes detect hidden data through statistical analysis of pixel distributions. Always encrypt data before hiding it — steganography provides concealment, not security.
