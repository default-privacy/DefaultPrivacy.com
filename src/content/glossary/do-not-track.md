---
term: "Do Not Track (DNT)"
slug: "do-not-track"
definition: "An HTTP header that requests websites not to track the user, which is almost universally ignored and can actually make you more identifiable."
category: "Browsers"
relatedTerms:
  - "third-party-tracking"
  - "browser-fingerprinting"
  - "cookie"
---

Do Not Track was a well-intentioned privacy signal that became a failure in practice.

## History

- Proposed in 2009 by the FTC
- Implemented in all major browsers
- No enforcement mechanism
- Almost no websites honor it
- W3C working group disbanded in 2019

## The Irony

- Only ~25% of users enable DNT
- Having DNT enabled makes your browser MORE unique for fingerprinting
- It tells trackers you care about privacy — making you a more interesting target
- It's now a fingerprinting signal, not a privacy protection

## What Replaced It

- **Global Privacy Control (GPC)**: A newer signal with legal backing under CCPA/GDPR
- **Browser-level blocking**: Brave, Firefox, and Safari block trackers directly
- **Regulations**: GDPR and CCPA provide legal enforcement that DNT never had

## Recommendation

Leave DNT off (it only helps fingerprinters). Use a browser that blocks trackers directly instead.
