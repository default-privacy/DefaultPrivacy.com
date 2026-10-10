---
term: "Transfer Impact Assessment"
slug: "transfer-impact-assessment"
definition: "A Transfer Impact Assessment (TIA) is a legal analysis required under GDPR to evaluate whether a cross-border data transfer to a country outside the EEA adequately protects personal data despite the destination country's laws and surveillance practices."
category: "Legal"
relatedTerms:
  - "gdpr"
  - "standard-contractual-clauses"
  - "data-sovereignty"
  - "data-localization-laws"
  - "eu-data-act"
aliases:
  - "TIA"
  - "transfer risk assessment"
  - "cross-border transfer assessment"
keywords:
  - "what is a transfer impact assessment"
  - "TIA GDPR"
  - "Schrems II assessment"
  - "cross-border data transfer assessment"
---

A Transfer Impact Assessment (TIA) is a legal and technical analysis that organizations must conduct before transferring personal data from the European Economic Area (EEA) to a country that does not have an adequacy decision from the European Commission. The obligation to perform TIAs was established by the European Court of Justice's landmark Schrems II ruling in July 2020.

## Why TIAs Exist: The Schrems II Ruling

Before Schrems II, EU organizations could transfer data to the United States using the EU-US Privacy Shield framework — a certification program that US companies opted into to signal compliance with EU data protection standards. The ECJ invalidated Privacy Shield, finding that US surveillance law (particularly Section 702 of the Foreign Intelligence Surveillance Act and Executive Order 12333) allowed US intelligence agencies to access personal data of EU residents in ways that could not be challenged under EU law.

The ruling established that simply having a contract (like Standard Contractual Clauses) is not enough. Organizations must verify that the destination country's legal environment actually allows those contractual protections to be honored. If surveillance law or government access powers override the contractual commitments, the transfer cannot legally proceed — or must be protected with additional technical measures.

## What a TIA Involves

A TIA analyzes:

**1. The destination country's legal framework**
- Does the country have laws that compel organizations to hand over data to government authorities?
- Are those authorities limited by meaningful oversight and judicial control?
- Can EU data subjects enforce their rights in that country's courts?
- What surveillance powers exist (bulk collection, targeted access, metadata programs)?

**2. The nature of the data transfer**
- What categories of data are being transferred?
- How sensitive is the data? (Health data, financial data, and communications content carry higher risk than general contact information)
- Is the data likely to be of interest to the destination country's intelligence agencies?

**3. The transfer mechanism in use**
- SCCs, BCRs, or another mechanism?
- Do supplementary technical measures (encryption, pseudonymization) reduce risk?

**4. Whether the transfer can proceed**
Based on the analysis, one of three outcomes:
- **Transfer can proceed** — The destination country's laws don't meaningfully undermine the contractual protections
- **Transfer can proceed with supplementary measures** — Additional technical or organizational safeguards (e.g., end-to-end encryption with keys held in the EEA) reduce risk to an acceptable level
- **Transfer cannot proceed** — The legal framework in the destination country fundamentally undermines the contract; the organization must find an alternative (use an EEA-based vendor, localize the data, or anonymize before transfer)

## TIAs for US Transfers

US transfers are the most common scenario for TIA requirements, and they involve the most regulatory complexity.

The EU-US Data Privacy Framework (DPF), adopted in 2023, provides a new adequacy decision for transfers to certified US companies. If a US company is DPF-certified, EU organizations can transfer data to them without an SCC or TIA. However, privacy advocates have already filed legal challenges against the DPF, arguing that US surveillance law still does not meet EU standards. A third "Schrems III" case could invalidate the DPF as it did Privacy Shield.

For transfers to non-DPF-certified US companies, TIAs remain required. The most common conclusion under a carefully conducted TIA is: transfer can proceed only with supplementary measures (typically: encrypt the data such that the US vendor holds only encrypted ciphertext and the encryption keys remain in the EEA, so US government access to the vendor's servers yields nothing readable).

## Practical Approaches

**Reputable SCC templates include TIA guidance.** The European Data Protection Board (EDPB) published recommendations on supplementary measures that serve as a practical TIA framework. Many law firms and DPA-recommended tools include TIA templates.

**Document everything.** A TIA is only useful if documented. Data protection authorities expect to see a written analysis demonstrating that the risk was considered and addressed — not a checkbox stating "TIA completed."

**Reassess when circumstances change.** If the destination country's laws change, or if the volume or sensitivity of the transferred data changes significantly, the TIA should be reviewed.

## TIA vs. DPIA

A TIA is distinct from a Data Protection Impact Assessment (DPIA), though both are GDPR-mandated analyses:

- A **DPIA** assesses the privacy risks of a new processing activity overall — any high-risk processing may require one
- A **TIA** specifically assesses whether a cross-border transfer is safe — it is scoped to the destination country and transfer mechanism

Both may be required for the same transfer: a DPIA for the overall processing activity and a TIA for the cross-border transfer element.
