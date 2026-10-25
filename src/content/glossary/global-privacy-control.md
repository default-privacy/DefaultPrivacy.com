---
term: "Global Privacy Control"
abbr: "GPC"
slug: "global-privacy-control"
definition: "A browser signal that tells websites you don't want your personal data sold or shared, legally enforceable under CCPA and recognized by some GDPR implementations."
category: "Browsers"
relatedTerms:
  - "do-not-track"
  - "ccpa"
  - "gdpr"
aliases:
  - "GPC"
---

GPC is the successor to Do Not Track, designed with legal enforcement from the start.

## How It Works

- Your browser sends a `Sec-GPC: 1` header with every request
- Under CCPA, businesses must treat this as a valid opt-out of data sales
- Under GDPR, some interpretations treat it as withdrawal of consent

## Browser Support

- **Brave**: Enabled by default
- **DuckDuckGo**: Enabled by default
- **Chrome**: Not supported natively (requires extension)

## How It Differs from DNT

- DNT had no legal backing — websites could ignore it
- GPC has legal force under CCPA (California Consumer Privacy Act)
- The California AG has confirmed GPC is a valid opt-out mechanism
- Enforcement actions have been taken against companies ignoring GPC

## Limitations

- Only legally binding in jurisdictions that recognize it
- Doesn't prevent tracking — only the sale/sharing of collected data
- Not all websites honor it (enforcement is ongoing)
