---
term: "Third-Party Doctrine"
slug: "third-party-doctrine"
definition: "The third-party doctrine is a United States legal principle stating that individuals lose their Fourth Amendment expectation of privacy for information they voluntarily share with third parties, such as banks, internet service providers, or telecom companies."
category: "Legal"
relatedTerms:
  - "metadata-surveillance"
  - "tech-company-data-requests"
  - "geofence-warrant"
  - "surveillance"
  - "section-702-fisa"
aliases:
  - "third party doctrine"
  - "expectation of privacy"
keywords:
  - "what is the third party doctrine"
  - "fourth amendment third party"
  - "smith v maryland"
  - "carpenter v united states"
  - "warrantless surveillance"
---

The third-party doctrine is a United States legal principle holding that people who voluntarily give information to third parties—such as banks, phone companies, internet service providers, and email servers—have "no reasonable expectation of privacy" in that information. Because there is no expectation of privacy, the Fourth Amendment does not apply, and the government can obtain that data without a warrant.

## Origins of the Doctrine

The doctrine stems from two landmark Supreme Court cases in the 1970s:

- ***United States v. Miller* (1976):** The Court ruled that a suspect had no privacy interest in his bank records because they were the bank's business records, not his private papers.
- ***Smith v. Maryland* (1979):** The Court ruled that police did not need a warrant to install a pen register (a device that records dialed phone numbers) because the caller voluntarily conveyed those numbers to the telephone company to complete the call.

In the analog era, this doctrine had clear boundaries. You shared your financial transactions with your bank and the phone numbers you dialed with the operator, but the contents of your home and personal papers remained private.

## The Digital Age Problem

In the digital era, the third-party doctrine creates a massive loophole in the Fourth Amendment. Today, it is nearly impossible to participate in modern society without sharing vast amounts of highly sensitive data with third parties:

- **ISPs and cell carriers** know your location, browsing history, and app usage
- **Cloud providers** hold your documents, photos, and backups
- **Email providers** hold your private correspondence
- **Wearables and health apps** hold your biometric and medical data

Under a strict interpretation of the 1970s doctrine, none of this information requires a warrant to obtain, because you "voluntarily" handed it over to a tech company by using their service.

## The *Carpenter* Carve-Out

In 2018, the Supreme Court recognized the danger of applying 1970s logic to modern technology in ***Carpenter v. United States***. The Court ruled that police *do* need a warrant to obtain historical cell-site location information (CSLI) from a wireless carrier. 

Chief Justice John Roberts wrote that cell phone location data is so deeply revealing, pervasive, and inescapable that it cannot be compared to a bank record or a dialed phone number. *Carpenter* created a crucial carve-out to the third-party doctrine, establishing that the doctrine does not automatically apply to all digital data just because a third party holds it.

## The Data Broker Loophole

Despite the *Carpenter* ruling, government agencies continue to exploit the spirit of the third-party doctrine through the data broker ecosystem. 

Rather than serving a subpoena or warrant to a tech company, law enforcement and intelligence agencies (including the FBI, DHS, and ICE) frequently purchase location data, communication metadata, and behavioral profiles directly from commercial data brokers. The legal justification often relies on the premise that since users "voluntarily" consented to the data collection (usually buried in a terms of service agreement), the data is commercially available and the government can simply buy it like any other private entity.

## Why It Matters for Privacy Infrastructure

The third-party doctrine is the fundamental reason why "trusting a tech company" is not a viable privacy strategy against state surveillance. If a company holds the encryption keys to your data, the government can compel them to hand it over. 

This is why privacy advocates emphasize **end-to-end encryption**, **zero-knowledge architectures**, and **self-hosting**. If you hold the keys, or if the data never leaves your device, there is no "third party" holding your readable data, and the doctrine cannot be used to bypass your Fourth Amendment rights.
