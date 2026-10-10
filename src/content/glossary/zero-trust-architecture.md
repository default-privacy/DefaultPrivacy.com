---
term: "Zero-Trust Architecture"
slug: "zero-trust-architecture"
definition: "A security model that assumes no user, device, or network is inherently trusted, requiring continuous verification for every access request."
category: "Cloud"
relatedTerms:
  - "vpn"
  - "two-factor-authentication"
---

Zero trust replaces the traditional "castle and moat" security model where everything inside the network perimeter is trusted.

## Core Principles

1. **Never trust, always verify**: Every request is authenticated and authorized
2. **Least privilege**: Users get minimum access needed
3. **Assume breach**: Design as if attackers are already inside
4. **Micro-segmentation**: Break the network into small, isolated zones

## Why It Matters

- VPNs create a trusted perimeter — once inside, you have broad access
- Zero trust means even internal users must prove their identity for each resource
- A compromised device or account has limited blast radius

## Privacy Implications

- **Positive**: Better protection against data breaches
- **Concern**: Requires extensive monitoring and logging of user behavior
- **Concern**: User activity tracking is necessary for "continuous verification"

## Adoption

Google's BeyondCorp was the first major zero-trust implementation. Microsoft, Cloudflare, and Zscaler now offer zero-trust products.
