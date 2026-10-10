---
term: "Anonymity Set"
slug: "anonymity-set"
definition: "The group of users among whom an individual cannot be distinguished. The larger the anonymity set, the stronger the anonymity—if you're one of a million identical users, you're hard to identify. If you're one of ten, much easier."
category: "Anonymity"
relatedTerms:
  - "anonymity"
  - "tor"
  - "mixnet"
aliases:
  - "Crowd Size"
keywords:
  - "crowd anonymity"
  - "k-anonymity"
  - "indistinguishability"
  - "anonymity strength"
---

Anonymity isn't binary—it's about the size of the crowd you're hiding in. An anonymity set defines how many people you could potentially be. Larger sets mean stronger privacy.

## Understanding Anonymity Sets

### Small Anonymity Set (Weak)
- 10 people use this VPN server
- You're one of 10 possible users
- 10% chance of identification

### Large Anonymity Set (Strong)
- 2 million daily Tor users
- You're one of 2 million
- 0.00005% chance of identification

## Factors Affecting Anonymity Set Size

### Positive Factors
- Popular, widely-used service
- Homogeneous user behavior
- Strong privacy tools
- Geographic diversity

### Negative Factors (Reducing Your Set)
- Rare browser configuration
- Unique behavior patterns
- Small service user base
- Distinguishing characteristics

## Real-World Examples

### Tor Network
- ~2 million daily users
- But your circuit might have fewer users
- Hidden services have smaller sets

### VPN Services
- Varies by provider
- Shared IP addresses increase set
- Single-user servers = no anonymity

### Cryptocurrency
- All Bitcoin users = huge set
- Users of rare features = smaller set
- Unique amounts = easily tracked

## Preserving Your Anonymity Set

### Blend In
- Use default settings
- Common browser/OS
- Typical behavior patterns

### Avoid Standing Out
- No unique plugins
- Standard fonts
- Common screen resolution
- Typical usage times

### Use Popular Services
- More users = bigger set
- Avoid niche privacy tools
- Mainstream options often better

## When Anonymity Sets Shrink

### Intersection Attacks
- "Tor user" + "In this timezone" + "Speaks this language"
- Each attribute reduces the set
- Eventually may identify you

### Temporal Analysis
- Few users at 3 AM
- First/last user of the day
- Unusual timing patterns

### Behavioral Uniqueness
- Distinctive writing style
- Unique interests
- Rare activities

