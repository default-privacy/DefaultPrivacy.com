---
term: "Browser Extension Security"
slug: "browser-extension-security"
definition: "The risks and considerations of browser extensions, which can access your browsing data and potentially exfiltrate sensitive information."
category: "Browsers"
relatedTerms:
  - "third-party-tracking"
  - "browser-fingerprinting"
---

Browser extensions are one of the most overlooked privacy risks — they can see everything you do in your browser.

## What Extensions Can Access

- All website content you visit
- Cookies and authentication tokens
- Form data including passwords
- Browsing history
- Network requests

## Risks

- Extensions can be sold to new owners who add malicious code
- Legitimate extensions can be compromised via supply chain attacks
- Many free extensions monetize by collecting and selling browsing data
- Chrome extensions don't require a security review

## Safe Extension Practices

1. Install only essential extensions
2. Prefer open-source extensions (uBlock Origin, Privacy Badger)
3. Review permissions before installing
4. Audit installed extensions periodically
5. Use Firefox (stricter extension sandboxing than Chrome)
