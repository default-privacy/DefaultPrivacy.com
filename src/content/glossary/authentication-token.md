---
term: "Authentication Token"
slug: "authentication-token"
definition: "A piece of data that proves a user's identity to a system, typically issued after successful login and used for subsequent requests."
category: "Authentication"
relatedTerms:
  - "oauth-2"
  - "totp"
  - "session-hijacking"
---

Tokens replace passwords for ongoing sessions — you authenticate once, then use the token.

## Types

- **Session tokens**: Server-stored, referenced by cookie
- **JWT (JSON Web Tokens)**: Self-contained, signed, stateless
- **Bearer tokens**: Whoever possesses the token is authenticated
- **Refresh tokens**: Long-lived tokens used to obtain new access tokens

## Security

- Tokens should be transmitted over HTTPS only
- Set appropriate expiration times
- Store tokens securely (HttpOnly cookies, not localStorage)
- Implement token revocation for logout and compromise
