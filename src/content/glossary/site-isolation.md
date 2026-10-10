---
term: "Site Isolation"
slug: "site-isolation"
definition: "A browser security feature that runs each website in its own process, preventing malicious sites from accessing data from other open sites."
category: "Browsers"
relatedTerms:
  - "first-party-isolation"
  - "content-security-policy"
  - "browser-isolation"
---

Site isolation protects against Spectre-class attacks and cross-site data leaks by giving each site its own process.

## How It Works

- Each site (defined by scheme + eTLD+1) gets its own renderer process
- Cross-site iframes are also isolated in separate processes
- Process boundaries prevent Spectre-style memory reads between sites
- CORB (Cross-Origin Read Blocking) prevents sensitive data leaks

## Browser Support

- **Chrome**: Strict site isolation enabled by default since Chrome 67
- **Firefox**: Project Fission provides site isolation
- **Brave**: Inherits Chrome's site isolation

## Privacy Connection

Site isolation complements first-party isolation. While first-party isolation separates storage (cookies, cache), site isolation separates memory and processing. Together they provide strong cross-site protection.
