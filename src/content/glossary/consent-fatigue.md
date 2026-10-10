---
term: "Consent Fatigue"
slug: "consent-fatigue"
definition: "The exhaustion and desensitization that occurs from being bombarded with privacy consent requests — cookie banners, terms of service, app permissions — leading people to blindly accept everything just to make the prompts stop."
category: "Data Protection"
relatedTerms:
  - "dark-patterns"
  - "cookie-consent"
  - "consent-management"
  - "terms-of-service"
aliases:
  - "Privacy Fatigue"
  - "Cookie Fatigue"
  - "Notification Fatigue"
keywords:
  - "consent fatigue"
  - "privacy fatigue"
  - "too many cookie popups"
  - "tired of privacy notices"
---

Consent fatigue is by design. When you're presented with 50 cookie banners per day, each requiring 5+ clicks to reject, the rational response is to stop reading and click "Accept All." Companies know this.

## The Numbers

- Average user encounters **10+ cookie consent banners per day**
- **Only 3%** of users manually configure cookie preferences when presented with complex options
- **95%+** of users click "Accept All" when it's the most prominent button
- The average privacy policy is **4,000+ words** — reading every policy you encounter would take **76 working days per year**

## Why It Exists

Consent fatigue is not an accident. It serves the data collection industry:

1. **Legal cover**: Companies can claim you "consented" even though the system is designed to exhaust you
2. **Default to surveillance**: When tired, people choose the default — and the default is always maximum data collection
3. **Regulatory compliance theater**: Cookie banners let companies technically comply with GDPR while practically circumventing it
4. **Dark patterns amplify fatigue**: Accept buttons are bright and prominent; reject options are buried

## The Consent Paradox

Privacy regulations (GDPR, CCPA) were meant to give people control over their data. Instead, they created a system where:
- Users are forced to make hundreds of micro-decisions about data collection per day
- Each decision requires reading pages of legal text to make informed
- The friction of making privacy-preserving choices is much higher than just accepting
- Companies weaponize this friction to get "consent" that isn't truly informed

## Breaking Through Consent Fatigue

### Technology Solutions
1. **Use a consent auto-manager** — Browser extensions like Consent-O-Matic automatically reject cookies
2. **Use Brave Browser** — Blocks consent banners entirely by blocking the underlying trackers
3. **Install uBlock Origin** — Filter lists can block cookie consent scripts
4. **Use Global Privacy Control (GPC)** — A browser signal that legally communicates your preference to opt out
5. **Use DNS-level blocking** — NextDNS or Pi-hole block consent management platforms at the network level

### Behavioral Solutions
1. **Adopt a default posture** — Always reject, never accept (if you're going to be mindless about it, be mindlessly private)
2. **Reduce the number of sites you visit** — Fewer sites = fewer consent decisions
3. **Use privacy-first services** — Services that don't require data collection don't need consent banners
