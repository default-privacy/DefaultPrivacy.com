---
term: "Session Fixation"
slug: "session-fixation"
definition: "An attack that forces a user to use a known session ID, allowing the attacker to hijack the session after the user authenticates."
category: "Attacks"
relatedTerms:
  - "session-hijacking"
  - "man-in-the-middle"
---

Session fixation tricks you into authenticating with a session the attacker already knows.

## How It Works

1. Attacker creates a session on the target website
2. Tricks the victim into using that session ID (via URL parameter, cookie injection, etc.)
3. Victim logs in, authenticating the attacker's session
4. Attacker now has an authenticated session

## Prevention (Developers)

- Regenerate the session ID after successful authentication
- Don't accept session IDs from URL parameters
- Set proper cookie attributes (HttpOnly, Secure, SameSite)

## Prevention (Users)

- Don't click login links from untrusted sources
- Verify you're on the correct domain before entering credentials
- Use a password manager (it won't auto-fill on the wrong domain)
