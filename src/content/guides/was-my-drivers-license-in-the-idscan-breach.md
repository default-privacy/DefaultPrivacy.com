---
title: "Was My Driver's License in the IDScan Breach? What We Know, and What to Do"
slug: was-my-drivers-license-in-the-idscan-breach
description: "A dark-web service claimed to sell scans of more than 153 million US and Canadian driver's licenses from IDScan.net, a company that checks IDs at dispensaries, venues and other counters. IDScan's filing with Oregon lists 13 million people affected. There is no way to check if you're one of them. Here is who may be affected, and the steps that protect you either way."
category: Privacy
difficulty: beginner
timeToComplete: "10 minutes"
publishedAt: "2026-11-04"
updatedAt: "2026-11-04"
author: Default Privacy
tags:
  - data breach
  - driver's license
  - idscan
  - id scanning
  - age verification
  - identity theft
  - credit freeze
relatedGuides:
  - how-to-freeze-your-credit
  - was-my-phone-number-in-a-data-breach
relatedTools:
  - name: Account breach check
    href: /breach-check
  - name: Have I Been Pwned
    href: /directory/have-i-been-pwned
---

**Last checked: November 2026** · US-focused · Each claim links to its source: IDScan's own notice and filing, or the reporting that first documented it. Where we say "we found", it's our own search as of November 4, 2026.

Maybe, and nobody can tell you for sure. IDScan.net checks IDs for businesses [from entertainment venues to cannabis dispensaries](https://techcrunch.com/2026/09/10/id-verification-giant-idscan-confirms-data-breach-with-more-than-150-million-drivers-licenses-stolen/). In September 2026 a dark-web service claimed to be selling [scans of more than 153 million US and Canadian driver's licenses](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/) that reporting traced to IDScan. IDScan's [own notice](https://idscan.net/notification-data-security-incident/) says an outsider had access to part of its cloud from April 4 to September 2, 2026, and its [filing with Oregon's Department of Justice](https://justice.oregon.gov/consumer/DataBreach/) lists 13,000,000 people affected. IDScan hasn't published a way to check whether you're one of them, and we found no free service that can.

If a business scanned your license in the past couple of years, act as if it leaked. The steps below cost nothing.

## The Short Answer

Maybe, and no site can check. Treat your license as leaked if a business scanned it in the past couple of years.

1. Freeze your credit at Equifax, Experian and TransUnion. It's free and stops new credit in your name.
2. Freeze your file at ChexSystems too. It's designed to stop bank accounts being opened in your name.
3. Check your credit reports for accounts you don't recognize.
4. If someone has used your identity, report it at IdentityTheft.gov to get a recovery plan.

---

## What happened

- **The listing.** On September 1, 2026, KrebsOnSecurity reported that a new dark-web service called Nexus claimed to have ["more than 153 million drivers licenses for people in the United States and Canada, as well as more than 10 million identification cards; more than three million travel documents and/or international IDs; and at least 579,000 medical cards."](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/) Krebs wrote that the sellers ["are likely not exaggerating about that 153 million number."](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/) Hours after his story ran, the service went offline, replacing its login page with the message ["This service is no longer available."](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/)
- **IDScan's notice.** IDScan first posted a notice on September 4 and updated it on September 29. It now says ["an unauthorized third party gained access to a portion of our cloud environment between April 4, 2026, and September 2, 2026,"](https://idscan.net/notification-data-security-incident/) and that ["the event was limited to the VeriScan platform."](https://idscan.net/notification-data-security-incident/) The information involved ["could include a combination of the full name, contact information, date of birth, driver's license, passport, and/or other government-issued identification numbers,"](https://idscan.net/notification-data-security-incident/) though ["not all information types listed above were necessarily involved for every individual."](https://idscan.net/notification-data-security-incident/) IDScan says it is ["not aware of any misuse of personal information as a result of this event."](https://idscan.net/notification-data-security-incident/) The first version of the notice told search engines [not to index it](https://therecord.media/idscan-data-breach-notice-drivers-licenses), which made it hard to find.
- **How many people.** IDScan's breach filing with Oregon's Department of Justice lists [13,000,000 people affected](https://justice.oregon.gov/consumer/DataBreach/). That is far below the seller's 153 million claim. Earlier, TechCrunch reported that IDScan's website says it holds [over 150 million driver's license records](https://techcrunch.com/2026/09/10/id-verification-giant-idscan-confirms-data-breach-with-more-than-150-million-drivers-licenses-stolen/).
- **Older scans too.** IDScan's dates cover when the intruder had access, not when your license was scanned. Krebs found his own license in the service, and its timestamp [corresponds to a date in June 2025](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/).
- **The investigation.** The FBI [is investigating](https://techcrunch.com/2026/09/10/id-verification-giant-idscan-confirms-data-breach-with-more-than-150-million-drivers-licenses-stolen/).

---

## Who may be affected

IDScan's scanners sit behind other companies' counters, so most people never see its name. Reporting so far points to these:

- **Car rental (Hertz).** IDScan's website lists Hertz among its clients, alongside other big brands ([Krebs](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/)). Krebs found his mother's license in the service as well, with timestamps ["just a few seconds apart"](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/) from his, and they had ["both handed our licenses to the Hertz rental car representative at the same time."](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/) Another person whose license was in the service ["was renting a car from Hertz for several months around the date of their timestamp."](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/) Hertz hasn't confirmed that it uses IDScan. Krebs said he [sought comment from Hertz](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/), and we found no statement from Hertz.
- **Cannabis dispensaries.** IDScan says it processes ID verification for [more than 1,000 marijuana dispensaries in 19 US states](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/), and in 2022 it announced an [exclusive agreement with Planet 13's dispensaries](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/). We found no statement from Planet 13. Krebs found that the records for sale included [marijuana dispensary cards](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/) as well as licenses.
- **Other places that scan IDs** at the door or the counter. If a business scanned your license and you don't know which company it used, you can't rule IDScan out.

**A business being on IDScan's client list doesn't settle it either way.** Two companies it listed have since distanced themselves. A Caesars Entertainment spokesperson told KrebsOnSecurity that Caesars has not been a client of IDScan and has not used its VeriScan software [since February 2025](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/). Yahoo News corrected its coverage after Target said it [was not involved and does not send guest data to IDScan](https://www.yahoo.com/news/us/articles/hertz-target-caesars-more-brands-172014496.html).

---

## Why you can't check

IDScan hasn't published a lookup. Its notice gives a phone line, 1-833-516-2980, for questions and for enrolling in the [free credit monitoring and identity protection services](https://idscan.net/notification-data-security-incident/) it offers. Have I Been Pwned's website no longer searches anything but email addresses: it [dropped username and phone number search](https://www.troyhunt.com/have-i-been-pwned-2-0-is-now-live/) in 2025. We found no free service that checks license numbers.

Be wary of any site that asks you to type in your license number to "check the dark web." You'd be handing your license number to one more database, and a lookup can never prove your license is safe.

---

## What to do

These steps protect you whether or not your license is in the leak. For the FTC's fuller recovery plan, see [IdentityTheft.gov](https://www.identitytheft.gov/databreach).

### 1. Freeze your credit at all three bureaus

A credit freeze is [free by federal law](https://www.ftc.gov/news-events/news/press-releases/2018/09/starting-today-new-federal-law-allows-consumers-place-free-credit-freezes-yearlong-fraud-alerts). The FTC says it means [you, or others, won't be able to open a new credit account](https://consumer.ftc.gov/articles/what-know-about-credit-freezes-and-fraud-alerts) while it's in place. Freeze separately at [Equifax](https://www.equifax.com/personal/credit-report-services/credit-freeze/), [Experian](https://www.experian.com/help/credit-freeze/) and [TransUnion](https://www.transunion.com/credit-freeze). Our [credit freeze guide](/guides/how-to-freeze-your-credit) walks through each one.

### 2. Freeze ChexSystems

ChexSystems collects data on [checking account applications, openings and closures](https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/consumer-reporting-companies/companies-list/). Its freeze is designed to stop [checking, savings and credit accounts](https://www.chexsystems.com/security-freeze/information) being approved in your name without your consent. Place it through its [Consumer Portal, by phone at 800-887-7652, or by mail](https://www.chexsystems.com/security-freeze/place-freeze). Lift it before you open a new bank account yourself.

### 3. Check your credit reports

You can get each bureau's report [free every week](https://consumer.ftc.gov/articles/free-credit-reports) at AnnualCreditReport.com, the only authorized site for the free reports. Look for accounts, loans or debts you don't recognize.

### 4. If someone has used your identity

Report it at [IdentityTheft.gov](https://www.identitytheft.gov/) to get a recovery plan. That report also qualifies you for a [7-year extended fraud alert](https://consumer.ftc.gov/articles/what-know-about-credit-freezes-and-fraud-alerts).

### 5. If IDScan or a business notifies you

IDScan says it is [providing access to free credit monitoring and identity protection services](https://idscan.net/notification-data-security-incident/), and its notice gives 1-833-516-2980 to enroll. Check that a letter is real before you act on it: find the company's contact details yourself rather than using a link or phone number in the message.

---

## FAQ

**Can I check if my license is in the IDScan breach?**

No. As of November 2026, IDScan hasn't published a lookup, and we found no free service that checks license numbers. IDScan's [notice](https://idscan.net/notification-data-security-incident/) gives a phone line, 1-833-516-2980, for questions. Follow the steps above either way.

**I rented a car from Hertz. Am I affected?**

Possibly. IDScan lists Hertz as a client, and Krebs found license scans dated to when his sources rented from Hertz ([Krebs](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/)). Hertz hasn't confirmed that it uses IDScan. Freeze your credit and ChexSystems either way.

**Should I get a new driver's license number?**

Ask your state's motor vehicle agency what it offers after identity theft. We haven't checked every state's rules. A new number doesn't take the old scan out of the leak, so the freezes above still matter more.

**Does a credit freeze stop someone using my license scan?**

It stops new credit accounts being opened in your name ([FTC](https://consumer.ftc.gov/articles/what-know-about-credit-freezes-and-fraud-alerts)), and a ChexSystems freeze is designed to stop new bank accounts ([ChexSystems](https://www.chexsystems.com/security-freeze/information)). Neither one covers accounts you already have, so keep watching those.

**I'm in Canada. Does this apply to me?**

The service claimed to have licenses from [both the United States and Canada](https://krebsonsecurity.com/2026/09/fbi-probes-service-selling-153m-drivers-licenses/). The credit-freeze steps above are US-specific. Ask Canada's credit bureaus, Equifax Canada and TransUnion Canada, what protections they offer.

---

## Keep reading

- [How to freeze your credit](/guides/how-to-freeze-your-credit)
- [Was my phone number in a data breach?](/guides/was-my-phone-number-in-a-data-breach)
- [Remove your name from data brokers](/guides/remove-name-from-data-brokers)
- [Account breach check](/breach-check)
