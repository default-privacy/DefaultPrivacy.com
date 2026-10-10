---
term: "Session Hijacking"
slug: "session-hijacking"
definition: "An attack where an attacker steals or predicts a valid session token to gain unauthorized access to a user's authenticated session. Once hijacked, the attacker can act as the legitimate user without knowing their password."
category: "Security"
relatedTerms:
  - "cookie"
  - "two-factor-authentication"
aliases:
  - "Cookie Hijacking"
  - "Session Theft"
keywords:
  - "session token"
  - "cookie theft"
  - "sidejacking"
  - "session fixation"
---

When you log into a website, you get a session token—a digital hall pass that proves you're authenticated. Session hijacking steals that pass, letting attackers impersonate you.

## How Sessions Work

1. You authenticate with username/password
2. Server creates session, issues token (usually cookie)
3. Browser sends token with every request
4. Server validates token, grants access
5. No re-authentication needed until session expires

## Attack Methods

### Network Sniffing (Sidejacking)
- Intercept tokens over unencrypted WiFi
- Tools like Firesheep made this trivial
- HTTPS largely solved this

### Cross-Site Scripting (XSS)
- Inject JavaScript to steal cookies
- `document.cookie` sends tokens to attacker
- Most common modern method

### Session Fixation
- Attacker sets session ID before victim logs in
- Victim authenticates with attacker's ID
- Attacker now shares the authenticated session

### Malware
- Keyloggers capture session data
- Browser extensions with too many permissions
- Token-stealing malware

## Protection Mechanisms

### For Websites
- HTTPS everywhere (encrypt tokens in transit)
- HttpOnly cookies (prevent JavaScript access)
- Secure flag (only send over HTTPS)
- SameSite cookies (prevent CSRF)
- Short session timeouts
- Session binding (IP, user agent)

### For Users
- Use HTTPS only
- Log out when done (destroy session)
- Don't use public WiFi without VPN
- Clear sessions after using public computers
- Watch for session warnings

## Detecting Hijacking

### Signs Your Session Was Hijacked
- Unexpected logouts
- Actions you didn't take
- Location/device alerts
- Security notifications

### Account Recovery
1. Change password immediately
2. Revoke all sessions
3. Enable 2FA if not already
4. Check for unauthorized changes
5. Review connected applications

