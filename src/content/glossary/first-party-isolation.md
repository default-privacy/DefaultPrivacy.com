---
term: "First-Party Isolation"
slug: "first-party-isolation"
definition: "A browser feature that separates website data (cookies, cache, storage) so that one website cannot access data set by another."
category: "Browsers"
relatedTerms:
  - "cookie"
  - "browser-fingerprinting"
  - "third-party-tracking"
---

First-Party Isolation (FPI) prevents cross-site tracking by ensuring that data from one website is invisible to another.

## How It Works

- Each website gets its own isolated storage container
- Cookies set by site A are invisible when you visit site B
- Third-party resources (like a Facebook Like button) get a separate container per first-party site
- Prevents cookies from being used to track you across the web

## Browser Support

- **Firefox**: Available via `privacy.firstparty.isolate` or Total Cookie Protection (enabled by default)
- **Tor Browser**: Enabled by default and more aggressive than Firefox
- **Brave**: Similar isolation through partitioned storage

## Trade-offs

- Some legitimate cross-site functionality may break (SSO login, embedded content)
- Websites that embed third-party login buttons may need you to re-authenticate
- The privacy benefit generally outweighs the inconvenience
