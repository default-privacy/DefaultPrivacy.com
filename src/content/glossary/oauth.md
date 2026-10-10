---
term: "OAuth"
slug: "oauth"
definition: "An open standard for authorization that allows users to grant third-party applications limited access to their accounts without sharing passwords. OAuth powers 'Login with Google/Facebook' buttons and API access delegation."
category: "Authentication"
relatedTerms:
  - "single-sign-on"
  - "two-factor-authentication"
aliases:
  - "OAuth 2.0"
  - "Open Authorization"
keywords:
  - "social login"
  - "authorization"
  - "access token"
  - "API authorization"
  - "login with Google"
---

OAuth lets you say "this app can access my photos" without giving the app your password. It's the protocol behind social logins and countless API integrations.

## The Problem OAuth Solves

### Without OAuth
- Give third-party your password
- They have full access to your account
- Can't revoke without changing password
- Password exposed to every app

### With OAuth
- Never share password
- Grant specific permissions
- Revoke access anytime
- Each app gets unique token

## How OAuth Works

1. **App requests authorization** from you
2. **You authenticate** with the service (Google, etc.)
3. **Service asks permission** ("App wants to read your contacts")
4. **You approve** (or deny)
5. **App receives token** (not your password)
6. **App uses token** for allowed actions only

## OAuth Roles

### Resource Owner
- You (the user)
- Owns the data/account

### Client
- The third-party app
- Wants access to your data

### Authorization Server
- Issues tokens
- Verifies your identity
- Manages permissions

### Resource Server
- Holds your data
- Validates tokens
- Provides API access

## Privacy Implications

### Positive
- Don't share passwords with apps
- Fine-grained permissions
- Easy revocation
- Audit trail of access

### Negative
- Identity provider knows all your logins
- Google/Facebook tracking across sites
- Centralized identity = centralized risk
- Provider can revoke your access everywhere

## OAuth Best Practices

### As a User
- Review permissions carefully
- Periodically audit connected apps
- Prefer minimal scope requests
- Consider privacy of identity provider

### Permission Red Flags
- Requesting more access than needed
- "Full account access" for simple features
- No clear explanation of why

