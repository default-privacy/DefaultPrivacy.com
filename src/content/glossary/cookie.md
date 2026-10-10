---
term: "Cookie"
slug: "cookie"
definition: "A small piece of data stored in your web browser by websites you visit. While cookies enable useful features like staying logged in, they're also used extensively for tracking your browsing activity across the web for advertising and analytics purposes."
category: "Browsers"
relatedTerms:
  - "browser-fingerprinting"
  - "tracking"
  - "gdpr"
aliases:
  - "HTTP Cookie"
  - "Web Cookie"
  - "Browser Cookie"
---

Cookies are small text files that websites store in your browser. They're essential for modern web functionality but have become a primary tool for tracking your online activity.

## Types of Cookies

### First-Party Cookies
- Set by the site you're visiting
- Enable login sessions, preferences
- Generally useful and privacy-respecting

### Third-Party Cookies
- Set by external domains (advertisers, analytics)
- Track you across multiple websites
- Primary concern for privacy
- Being phased out by browsers

### Session Cookies
- Deleted when you close browser
- Temporary, less privacy concern

### Persistent Cookies
- Remain until expiration or deletion
- Can track long-term behavior

## What Cookies Track

- Login status
- Shopping cart contents
- Language preferences
- Which ads you've seen
- What pages you've visited
- Your browsing history across sites
- Purchase behavior

## The Third-Party Cookie Problem

```
You visit news.com
  → loads ad from ads.com
  → ads.com sets cookie

You visit shopping.com  
  → loads ad from ads.com
  → ads.com reads cookie
  → knows you were at news.com

Pattern builds across thousands of sites
```

## Protection Strategies

### Browser Settings
- Block third-party cookies
- Clear cookies on close
- Use private/incognito mode

### Browser Extensions
- uBlock Origin blocks trackers
- Cookie AutoDelete clears after leaving site

### Privacy Browsers
- Firefox with Enhanced Tracking Protection
- Brave with aggressive blocking
- Tor Browser

## The Cookie Banner Problem

GDPR requires consent for non-essential cookies, leading to ubiquitous cookie banners. Dark patterns make rejecting harder than accepting.

## Beyond Cookies

As cookies get blocked, trackers move to:
- Browser fingerprinting
- Local storage
- First-party tracking (harder to block)

