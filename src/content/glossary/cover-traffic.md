---
term: "Cover Traffic"
slug: "cover-traffic"
definition: "Dummy data transmitted alongside real communications to prevent traffic analysis from revealing when you're actually communicating."
category: "OpSec"
relatedTerms:
  - "traffic-analysis"
  - "operational-security"
  - "metadata"
---

Cover traffic defeats surveillance that watches for patterns in when and how much you communicate.

## The Problem

- Even with encrypted communications, an observer can see WHEN you send messages
- Traffic patterns reveal relationships (Alice always messages Bob at 9pm)
- Sudden spikes in encrypted traffic correlate with real events
- Silence is also a signal (no traffic after an event = you might have been involved)

## How Cover Traffic Works

- Constant stream of data is transmitted regardless of real activity
- Real messages are hidden within the noise
- Traffic volume and timing remain consistent

## Implementations

- **Tor**: Sends fixed-size cells to prevent size-based analysis
- **Some VPNs**: Offer padding to obscure traffic patterns
- **Briar**: Generates cover traffic when connected to contacts

## Trade-offs

Cover traffic increases bandwidth usage and power consumption. Most people don't need it — it's primarily relevant for high-risk individuals under active surveillance.
