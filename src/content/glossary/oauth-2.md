---
term: "OAuth 2.0"
slug: "oauth-2"
definition: "An authorization framework that allows third-party applications to access user accounts without sharing passwords, using access tokens instead."
category: "Authentication"
relatedTerms:
  - "oauth"
  - "saml"
  - "single-sign-on"
---

OAuth 2.0 is the standard protocol behind "Sign in with Google/Apple/GitHub" buttons.

## How It Works

1. App redirects you to the identity provider (Google, etc.)
2. You authenticate and approve the requested permissions
3. The identity provider issues an access token to the app
4. The app uses the token to access your data (limited by permissions)
5. The app never sees your password

## Privacy Considerations

- The identity provider knows every service you sign into
- Apps may request more permissions than they need
- Revoking access doesn't necessarily delete data already collected
- Consider what you're sharing before clicking "Allow"

## Best Practices

- Review and revoke unused app connections regularly
- Prefer services that request minimal permissions
- Consider whether OAuth convenience is worth the tracking trade-off
