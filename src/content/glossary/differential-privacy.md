---
term: "Differential Privacy"
slug: "differential-privacy"
definition: "A mathematical framework for sharing aggregate information about a dataset while provably protecting the privacy of individual entries."
category: "Data Protection"
relatedTerms:
  - "data-minimization"
  - "pseudonymity"
---

Differential privacy adds carefully calibrated noise to data queries, allowing useful statistical analysis while making it impossible to identify any individual's contribution.

## How It Works

- Random noise is added to query results
- The noise is large enough to hide any individual's data
- But small enough that aggregate statistics remain accurate
- Provides a mathematical guarantee of privacy (epsilon parameter)

## Real-World Uses

- **Apple**: Uses differential privacy in iOS to collect usage statistics
- **Google**: RAPPOR system for Chrome usage data
- **US Census**: Applied differential privacy to 2020 Census data

## The Epsilon Problem

- Epsilon (ε) measures the privacy guarantee — smaller is more private
- There's no universal agreement on what epsilon value is "private enough"
- Apple uses ε = 4-8, while academic researchers often recommend ε < 1
- Companies may claim differential privacy while using loose parameters
