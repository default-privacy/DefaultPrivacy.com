---
term: "Threat Model"
slug: "threat-model"
definition: "A systematic analysis of what you're trying to protect, from whom, the consequences of failure, and what resources you can apply. Threat modeling helps prioritize security efforts by focusing on realistic threats rather than theoretical ones."
category: "Security"
relatedTerms:
  - "operational-security"
  - "privacy"
aliases:
  - "Threat Assessment"
  - "Risk Assessment"
keywords:
  - "security planning"
  - "risk analysis"
  - "adversary"
  - "attack surface"
---

"What are you protecting, from whom, and what happens if you fail?" Your answers determine what security measures actually make sense for your situation.

## Key Questions

### What Do You Want to Protect?
- Communications
- Location/movement
- Identity
- Financial information
- Relationships/network
- Activities

### Who Are Your Adversaries?
- Corporations (tracking, advertising)
- Criminals (fraud, theft)
- Government (surveillance, law enforcement)
- Personal (stalkers, abusers)
- Employers (monitoring)

### What Are Their Capabilities?
- Technical sophistication
- Legal powers
- Resources
- Motivation level

### What Are the Consequences?
- Embarrassment
- Financial loss
- Legal trouble
- Physical safety
- Job loss
- Relationship damage

## Threat Model Examples

### Average Person
**Protect**: Personal data, browsing habits
**From**: Advertisers, data brokers, hackers
**Effort**: Low-medium

### Journalist
**Protect**: Sources, communications, research
**From**: Government, corporations, criminals
**Effort**: High

### Activist in Authoritarian Country
**Protect**: Identity, activities, associates
**From**: Government surveillance, informants
**Effort**: Very high, life-or-death

## Common Mistakes

### Over-Engineering
- Nuclear bunker security for email
- Wasted effort on unlikely threats
- Missing actual vulnerabilities

### Under-Engineering
- "I have nothing to hide"
- Ignoring realistic threats
- False sense of security

### Wrong Threat Focus
- Worrying about NSA, ignoring phishing
- Military-grade encryption, weak passwords
- Missing the obvious attacks

## Building Your Threat Model

1. **List assets** (what you're protecting)
2. **List adversaries** (who wants it)
3. **Assess capabilities** (what can they do)
4. **Evaluate consequences** (what if they succeed)
5. **Identify vulnerabilities** (how could they succeed)
6. **Select countermeasures** (proportional to threat)
7. **Review regularly** (threats change)

For what to use, see [How to build your threat model](/guides/how-to-build-your-threat-model).
