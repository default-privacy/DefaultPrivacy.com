---
term: "Standard Contractual Clauses"
slug: "standard-contractual-clauses"
definition: "Standard Contractual Clauses (SCCs) are pre-approved contract terms issued by the European Commission that allow organizations to legally transfer personal data from the EU to countries that lack an adequacy decision, by binding the recipient to EU-level data protection obligations."
category: "Legal"
relatedTerms:
  - "gdpr"
  - "data-sovereignty"
  - "data-localization-laws"
  - "eu-data-act"
  - "privacy-by-design"
aliases:
  - "SCCs"
  - "Model Clauses"
  - "EU Standard Contractual Clauses"
keywords:
  - "what are standard contractual clauses"
  - "SCCs GDPR"
  - "EU data transfer mechanism"
  - "cross-border data transfer"
---

Standard Contractual Clauses (SCCs) are legally binding contracts pre-approved by the European Commission that allow organizations to transfer personal data from the European Economic Area (EEA) to countries that do not offer an equivalent level of data protection. They are one of the most widely used mechanisms for cross-border data transfers under the GDPR.

## Why SCCs Exist

The GDPR prohibits transferring personal data outside the EEA unless the destination country provides an "adequate" level of protection — essentially equivalent to the EU's standards. Most countries, including the United States, do not have an adequacy decision. Organizations that need to send data to vendors, subsidiaries, or partners in those countries must use a lawful transfer mechanism. SCCs are the most practical of those mechanisms for most businesses.

## What SCCs Actually Do

SCCs bind the data importer (the non-EU recipient) to a specific set of data protection obligations. By signing the clauses, the recipient contractually agrees to:

- Process the data only for the purposes specified
- Implement appropriate security measures
- Cooperate with data subject rights requests (access, deletion, portability)
- Notify the EU sender of any data breaches
- Not transfer the data further without additional safeguards
- Comply with GDPR-equivalent standards regardless of local law

The clauses cannot be modified — they are used as-is or not at all. Organizations can add supplemental obligations but cannot weaken the pre-approved terms.

## The Three SCC Modules

The European Commission updated the standard clauses in 2021 to cover more transfer scenarios. There are now four module types:

- **Module 1 — Controller to Controller:** An EU company sends data to a non-EU company, and both act as independent data controllers. Common for B2B data sharing.
- **Module 2 — Controller to Processor:** An EU company (controller) sends data to a non-EU vendor (processor) — the most common scenario for cloud services, SaaS tools, and third-party analytics.
- **Module 3 — Processor to Processor:** A processor in the EU sub-contracts data processing to a processor outside the EU.
- **Module 4 — Processor to Controller:** Less common; a non-EU processor sends data back to an EU controller.

## Transfer Impact Assessments (TIAs)

Following the 2020 Schrems II ruling (which invalidated the previous EU-US Privacy Shield framework), organizations cannot simply rely on SCCs alone. They must also conduct a **Transfer Impact Assessment (TIA)** — an analysis of whether the destination country's laws and surveillance practices undermine the protections the SCCs are supposed to guarantee.

For transfers to the United States, TIAs became significantly more complex after Schrems II due to U.S. bulk surveillance programs. The EU-US Data Privacy Framework (2023) partially addressed this for certified U.S. companies, but critics note it may face further legal challenges.

## Who Uses SCCs

In practice, virtually every EU-based company that uses U.S. software products (AWS, Google Cloud, Salesforce, HubSpot, etc.) relies on SCCs. The major cloud providers include pre-signed SCC addendums in their data processing agreements (DPAs).

For smaller businesses, this means SCCs are often already in place through the DPA you accepted when signing up for a cloud service — even if you never read them.

## Enforcement and Risk

Data protection authorities have issued significant fines for inadequate transfer mechanisms. Ireland's DPC fined Meta €1.2 billion in 2023 specifically for transferring EU user data to the U.S. under SCCs that were deemed insufficient given U.S. surveillance law. This is the largest GDPR fine to date.

For businesses, the practical risk is that SCCs alone may not be enough for transfers to jurisdictions with aggressive government surveillance — particularly when combined with a weak TIA.

## SCCs vs. Other Transfer Mechanisms

| Mechanism | Best For | Notes |
|-----------|----------|-------|
| **SCCs** | Most organizations transferring to non-adequate countries | Most flexible, widely accepted |
| **Adequacy decision** | Transfers to approved countries (UK, Japan, Switzerland, etc.) | No extra contracts needed — destination country already approved |
| **Binding Corporate Rules (BCRs)** | Large multinationals transferring within their corporate group | Expensive to implement, requires DPA approval |
| **EU-US Data Privacy Framework** | Transfers to certified U.S. companies | Currently valid; potentially challengeable |
| **Derogations** | One-off transfers in specific limited circumstances | Not a substitute for systematic transfers |
