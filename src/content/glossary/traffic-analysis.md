---
term: "Traffic Analysis"
slug: "traffic-analysis"
definition: "The process of examining patterns in communication metadata—who talks to whom, when, how often, and how much—to extract intelligence without accessing content. Even encrypted communications leak metadata that can reveal sensitive information."
category: "Security"
relatedTerms:
  - "metadata"
  - "anonymity"
  - "tor"
aliases:
  - "Metadata Analysis"
  - "Communication Pattern Analysis"
keywords:
  - "metadata surveillance"
  - "communication patterns"
  - "network analysis"
  - "timing attacks"
---

"We kill people based on metadata." - Former NSA Director Michael Hayden

Traffic analysis proves that encryption alone isn't enough. Even when content is perfectly secure, patterns in communication can reveal almost everything.

## What Traffic Analysis Reveals

### Without Reading Any Content
- Who communicates with whom
- Timing and frequency of contact
- Duration of conversations
- Location data
- Network of relationships
- Behavioral patterns

### Real-World Examples
- Doctor's office call → Health issue
- Divorce lawyer call → Marriage trouble
- Late night calls to same number → Relationship
- Regular calls to AA hotline → Substance issues

## Traffic Analysis Techniques

### Network Graph Analysis
- Map who talks to whom
- Identify key individuals
- Find hidden relationships
- Detect organizational structure

### Timing Correlation
- Match message send/receive times
- De-anonymize Tor users
- Identify communication partners

### Volume Analysis
- Large transfer → Important communication
- Patterns indicate activity type
- Sudden changes signal events

### Behavioral Fingerprinting
- Typing cadence
- Response times
- Usage schedules
- Communication habits

## Defending Against Traffic Analysis

### Cover Traffic
- Generate fake traffic
- Constant-rate communication
- Expensive and impractical for most

### Mixnets
- Shuffle messages
- Add delays
- Break timing correlations

### Tor Hidden Services
- End-to-end within Tor
- No exit node observation
- But still vulnerable to some attacks

### Operational Security
- Vary communication patterns
- Use different channels
- Don't establish predictable routines

## Why Encryption Isn't Enough

Encryption protects content. Traffic analysis reveals:
- That you communicate (even if not what)
- With whom (even if content hidden)
- When and how often (patterns)
- Your social graph (relationships)

Truly private communication requires both encryption AND traffic analysis resistance.

