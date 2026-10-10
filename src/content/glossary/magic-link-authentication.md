---
term: "Magic Link Authentication"
slug: "magic-link-authentication"
definition: "A passwordless login method that sends a unique, time-limited link to your email address, granting access when clicked."
category: "Authentication"
relatedTerms:
  - "passkey"
  - "single-sign-on"
---

Magic links eliminate passwords entirely — you log in by clicking a link sent to your email.

## How It Works

1. User enters their email address
2. Server generates a unique, time-limited token
3. An email with a login link containing the token is sent
4. User clicks the link and is authenticated
5. The token expires after use or after a timeout

## Security Properties

- **No password to crack or phish**: Security depends on email account security
- **Time-limited**: Links expire (typically 5-15 minutes)
- **Single-use**: Each link works only once

## Trade-offs

- Security is only as strong as your email security
- Requires email access to log in (no offline access)
- Adds friction compared to passkeys
- Email delivery can be delayed

## Best Practice

If a service uses magic links, make sure your email account has strong 2FA (hardware key or TOTP, not SMS).
