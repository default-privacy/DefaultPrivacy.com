---
term: "Clickjacking"
slug: "clickjacking"
definition: "An attack that tricks users into clicking on something different from what they perceive, by layering transparent or opaque elements over a web page."
category: "Attacks"
relatedTerms:
  - "phishing"
  - "social-engineering"
  - "content-security-policy"
---

Clickjacking uses invisible iframes or overlays to hijack your clicks, making you perform unintended actions.

## How It Works

1. Attacker creates a page with an invisible iframe of a target site
2. The target site's button (like "Delete Account" or "Allow Camera") is positioned under the attacker's button
3. User clicks what appears to be a harmless button
4. The click actually hits the hidden target site's button
5. The action is performed with the user's existing session/cookies

## Protection (Users)

- Use a browser with good clickjacking protection
- Be cautious of pages that seem to require unusual clicking

## Protection (Developers)

- Set `X-Frame-Options: DENY` or `SAMEORIGIN` header
- Use CSP `frame-ancestors` directive
- Implement frame-busting JavaScript as a fallback
