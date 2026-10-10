---
term: "Content Security Policy (CSP)"
slug: "content-security-policy"
definition: "An HTTP security header that tells the browser which sources of content are allowed to load on a page, preventing cross-site scripting and data injection attacks."
category: "Browsers"
relatedTerms:
  - "https"
  - "third-party-tracking"
---

Content Security Policy is one of the most powerful browser security mechanisms, giving website operators control over what code runs on their pages.

## What It Prevents

- **Cross-site scripting (XSS)**: Blocks unauthorized scripts from executing
- **Data injection**: Prevents loading content from unauthorized sources
- **Mixed content**: Blocks HTTP resources on HTTPS pages
- **Clickjacking**: Frame-ancestors directive prevents embedding

## Privacy Connection

- A strict CSP blocks third-party tracking scripts
- Prevents malicious extensions from injecting tracking code
- Limits which domains can receive data from the page

## How It Works

The server sends a header like:
`Content-Security-Policy: default-src 'self'; script-src 'self' cdn.example.com`

This tells the browser: only load resources from the same origin and cdn.example.com. Block everything else.

## Why Many Sites Have Weak CSPs

Third-party analytics, ad networks, and social media widgets require permissive CSP rules. Privacy-respecting sites have much tighter CSPs.
