---
term: "Privacy Audit"
slug: "privacy-audit"
definition: "A comprehensive assessment of your digital privacy posture, examining browser exposure, website security, email configuration, data broker presence, and overall threat model."
category: "Data Protection"
relatedTerms:
  - "threat-modeling"
  - "digital-footprint"
  - "browser-fingerprinting"
---

A privacy audit answers the question: "How exposed am I, and what should I do about it?"

## What a Privacy Audit Covers

- **Browser exposure**: What does your browser reveal to every website you visit? (IP address, fingerprint, WebRTC leaks, device info)
- **Website security**: If you run a website, what trackers, cookies, and security headers are in place?
- **Email security**: Are your domain's SPF, DKIM, and DMARC records properly configured?
- **Data broker presence**: Is your personal information listed on people search sites?
- **Password security**: Are your passwords strong enough? Have they appeared in breaches?
- **DNS leaks**: Is your VPN actually protecting your DNS queries?
- **Threat model**: Based on your situation, what are the most important threats to address?

## How to Conduct One

You can audit yourself using free tools:
1. Scan a website for trackers at /scanner
2. Test your passwords at /password-check
3. Check email security (SPF/DKIM/DMARC) at /email-security
4. Check domain WHOIS privacy at /whois
5. Check whether a domain appears in breach data at /breach-check

## Taking Action

The audit identifies problems. The action plan fixes them — prioritized by severity and your specific threat model. A comprehensive audit with an AI-generated action plan turns findings into a step-by-step remediation roadmap.
