---
term: "Website Privacy Score"
slug: "website-privacy-score"
definition: "A rating that evaluates how well a website respects visitor privacy, based on trackers, cookies, security headers, third-party requests, and fingerprinting."
category: "Data Protection"
relatedTerms:
  - "third-party-tracking"
  - "content-security-policy"
  - "browser-fingerprinting"
---

A website privacy score quantifies how much a website tracks and exposes its visitors.

## What's Evaluated

- **Trackers**: Google Analytics, Facebook Pixel, and other tracking scripts
- **Cookies**: How many, from whom, and how long they persist
- **Security headers**: CSP, HSTS, X-Frame-Options, Permissions-Policy
- **Third-party requests**: How many external domains are contacted
- **HTTPS**: Is the connection properly encrypted?
- **Fingerprinting**: Does the site use canvas fingerprinting or other techniques?

## Grading

Scores typically range from A (excellent privacy) to F (severe privacy concerns):
- **A**: Minimal trackers, strong security headers, no fingerprinting
- **B**: Few trackers, decent headers
- **C**: Average — some trackers, missing some headers
- **D**: Multiple trackers, weak security
- **F**: Extensive tracking, poor security, fingerprinting

## How to Check

Use Default Privacy's scanner (/scanner) to audit any website's privacy score. Enter a URL and get a detailed breakdown of trackers, cookies, headers, and an overall grade.
