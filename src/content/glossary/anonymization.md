---
term: "Anonymization"
slug: "anonymization"
definition: "The process of permanently removing personally identifiable information from data so that individuals cannot be re-identified, even with additional data."
category: "Data Protection"
relatedTerms:
  - "pseudonymity"
  - "differential-privacy"
  - "pii"
---

True anonymization is extremely difficult to achieve. Most "anonymized" data can be re-identified.

## Anonymization vs Pseudonymization

- **Anonymization**: Irreversible — the data can never be linked back to an individual
- **Pseudonymization**: Reversible — identifiers are replaced but can be restored with a key

## Re-identification Risks

- Netflix "anonymous" movie ratings were de-anonymized using IMDB reviews
- "Anonymous" NYC taxi data was re-identified using pick-up/drop-off locations
- Research shows 87% of Americans identifiable from ZIP code + birth date + gender

## Techniques

- **K-anonymity**: Ensure each record matches at least K-1 other records
- **L-diversity**: Ensure sensitive values are diverse within each group
- **Differential privacy**: Add noise to prevent individual identification
- **Data suppression**: Remove quasi-identifiers entirely

## The Hard Truth

For most practical purposes, if data contains enough attributes to be useful, it contains enough to be re-identified. True anonymization often destroys the utility of the data.
