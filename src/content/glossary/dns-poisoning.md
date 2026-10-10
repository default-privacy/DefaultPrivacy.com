---
term: "DNS Poisoning"
slug: "dns-poisoning"
definition: "An attack that corrupts a DNS resolver's cache, redirecting users to malicious websites even when they type the correct address."
category: "Networking"
relatedTerms:
  - "dns-leak"
  - "dns-over-https"
  - "man-in-the-middle"
---

DNS poisoning (also called DNS cache poisoning or DNS spoofing) tricks DNS resolvers into storing false information, sending users to attacker-controlled servers.

## How It Works

- Attacker sends forged DNS responses to a resolver
- The resolver caches the fake IP address for a domain
- All users of that resolver get sent to the wrong server
- The fake site may look identical to the real one

## Why It's Dangerous

- Users see the correct URL in their browser
- Can be used for phishing, credential theft, or malware distribution
- Hard to detect without DNSSEC validation

## Protection

1. Use DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT)
2. Choose DNS providers that support DNSSEC validation
3. Use a VPN that handles its own DNS resolution
