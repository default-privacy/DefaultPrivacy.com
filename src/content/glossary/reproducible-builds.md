---
term: "Reproducible Builds"
slug: "reproducible-builds"
definition: "A software build process that guarantees anyone can independently verify that the compiled binary exactly matches the published source code."
category: "Emerging Threats"
relatedTerms:
  - "open-source"
  - "supply-chain-transparency"
  - "supply-chain-attack"
---

Reproducible builds close the gap between "the source code is open" and "the binary you download matches the source code."

## The Problem

- Open-source code can be reviewed, but how do you know the download matches?
- The build process could introduce backdoors not in the source
- Timestamps, build paths, and compiler differences create non-reproducible builds by default

## How It Works

- Build process is fully documented and deterministic
- Anyone can follow the same steps and get byte-for-byte identical output
- Multiple parties build independently and compare results
- If they match, the binary provably corresponds to the source

## Projects with Reproducible Builds

- **Tor Browser**: Fully reproducible
- **Signal**: Android app is reproducible
- **Tails**: Reproducible ISOs
- **Bitcoin Core**: Reproducible builds via Guix
- **F-Droid**: Working toward reproducible builds for all apps

## Why It Matters

Without reproducible builds, open source provides a false sense of security. You can read the code, but you can't verify that the code you read is what you're running.
