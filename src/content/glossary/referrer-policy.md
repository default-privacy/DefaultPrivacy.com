---
term: "Referrer Policy"
slug: "referrer-policy"
definition: "An HTTP header that controls how much URL information is shared when navigating from one page to another, affecting cross-site tracking."
category: "Browsers"
relatedTerms:
  - "https"
  - "third-party-tracking"
  - "metadata"
---

When you click a link from Site A to Site B, your browser normally sends Site B a "Referer" header containing the full URL of Site A. Referrer Policy controls this behavior.

## Why It Matters

- The referring URL can contain sensitive information (search queries, page titles, user IDs)
- It reveals your browsing path to every site you visit
- Marketers use referrer data to track traffic sources

## Policy Options

- **no-referrer**: Never send referrer information
- **origin**: Send only the domain, not the full URL
- **strict-origin-when-cross-origin**: Full URL for same-site, origin only for cross-site (recommended default)
- **no-referrer-when-downgrade**: Don't send referrer when going from HTTPS to HTTP

## Current Defaults

Most modern browsers default to `strict-origin-when-cross-origin`, which is a reasonable balance between privacy and functionality.
