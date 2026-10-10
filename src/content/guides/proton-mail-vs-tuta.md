---
title: "Proton Mail vs Tuta: Which Private Email Should You Use?"
slug: proton-mail-vs-tuta
description: "Proton Mail and Tuta both store your email so the company can't read it. Tuta encrypts more of your mailbox end to end. Proton works with PGP and, on paid plans, with apps like Thunderbird. Here is how they compare on encryption, audits, law, price and features in October 2026."
category: Privacy
difficulty: beginner
timeToComplete: "12 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - proton mail
  - tuta
  - tutanota
  - encrypted email
  - private email
  - gmail alternative
  - pgp
  - post-quantum encryption
  - custom domain
relatedGuides:
  - privacy-where-to-start
relatedTools:
  - name: Proton
    href: /directory/proton
  - name: Tuta
    href: /directory/tuta
  - name: SimpleLogin
    href: /directory/simplelogin
  - name: Addy
    href: /directory/addy
  - name: Mozilla Thunderbird
    href: /directory/mozilla-thunderbird
  - name: Email security check
    href: /email-security
---

**Last checked: October 2026** · Each claim links to Proton's or Tuta's own documentation, a published paper or the named source. Prices and plans change, so check each pricing page before you pay.

Both store your email so the company can't read it ([Proton](https://proton.me/support/proton-mail-encryption-explained); [Tuta](https://tuta.com/encryption)). [Tuta](/directory/tuta) encrypts more of your mailbox end to end, including subject lines, your whole address book and your calendar ([Tuta](https://tuta.com/encryption)), and every Tuta account now has post-quantum encryption ([Tuta](https://tuta.com/blog/post-quantum-cryptography)). [Proton Mail](/directory/proton) works with standard PGP and, on paid plans, with desktop email apps such as Thunderbird, and it offers more around the inbox, such as built-in aliases and Gmail import ([Proton](https://proton.me/mail/pricing)).

This was one of the most asked comparisons on the former Techlore privacy forum. Below is what each company's own documents say, side by side.

---

## At a glance

| | Proton Mail | Tuta |
|---|---|---|
| Company | Proton AG, Geneva, Switzerland ([Proton](https://proton.me/blog/proton-non-profit-foundation)) | Tutao GmbH, Hanover, Germany ([Tuta](https://tuta.com/imprint)) |
| Subject lines | Encrypted, but not end to end ([Proton](https://proton.me/support/proton-mail-encryption-explained)) | End-to-end encrypted ([Tuta](https://tuta.com/encryption)) |
| Contacts | Names and email addresses readable by Proton. Other details zero-access encrypted ([Proton](https://proton.me/support/proton-contacts)) | Whole address book end-to-end encrypted ([Tuta](https://tuta.com/encryption)) |
| Calendar | Event times visible to Proton. Titles, descriptions, locations and attendees end-to-end encrypted ([Proton](https://proton.me/calendar/privacy-policy)) | Entire calendar, including event notifications ([Tuta](https://tuta.com/encryption)) |
| Post-quantum encryption | Opt-in, rolling out since May 2026 ([Proton](https://proton.me/blog/introducing-post-quantum-encryption)) | On for all accounts since March 2026 ([Tuta](https://tuta.com/blog/post-quantum-cryptography)) |
| PGP with other services | Yes ([Proton](https://proton.me/support/how-to-use-pgp)) | No ([Tuta](https://tuta.com/support#pgp)) |
| Thunderbird, Outlook, Apple Mail | Through Proton Mail Bridge, paid plans only ([Proton](https://proton.me/mail/bridge)) | No IMAP. A Thunderbird add-on opens Tuta's web app in a tab ([Tuta](https://tuta.com/support#imap)) |
| Free mail storage | 500 MB, up to 1 GB after a setup checklist ([Proton](https://proton.me/mail/pricing)) | 1 GB ([Tuta](https://tuta.com/pricing)) |
| Entry paid plan | Mail Plus: $4.99 a month, or $47.88 a year ([Proton](https://proton.me/mail/pricing)) | Revolutionary: €3.60 a month, or €36 a year ([Tuta](https://tuta.com/pricing)) |
| Cash or crypto | Bitcoin, or cash by post ([Proton](https://proton.me/support/payment-options)) | Gift cards from a third-party reseller, bought with Bitcoin, Monero or cash ([Tuta](https://tuta.com/support#cryptocurrency)) |

---

## Encryption: what each company can and can't read

Mail between two Proton users is end-to-end encrypted. Mail that arrives from outside, such as from Gmail, is stored with zero-access encryption, so Proton can't read it once it lands ([Proton](https://proton.me/support/proton-mail-encryption-explained)). Tuta works the same way for mail between Tuta users ([Tuta](https://tuta.com/encryption)), and encrypts outside mail on its servers on arrival ([Tuta transparency report](https://tuta.com/blog/transparency-report)). Mail you send to an ordinary address elsewhere isn't end-to-end encrypted by default. Both let you send a password-protected email instead ([Proton](https://proton.me/mail/pricing); [Tuta](https://tuta.com/encryption)).

The differences are in what surrounds the message:

- **Subject lines.** Proton encrypts them, but not end to end, so that it stays compatible with the OpenPGP standard ([Proton](https://proton.me/support/proton-mail-encryption-explained)). Tuta encrypts subject lines end to end and gives that as one reason it doesn't use PGP ([Tuta](https://tuta.com/encryption)).
- **Who you email.** Neither hides this from the company. Proton says sender and recipient addresses are encrypted, but not end to end ([Proton](https://proton.me/support/proton-mail-encryption-explained)). Tuta says the only unencrypted data are users' own addresses and the senders and recipients of emails ([Tuta](https://tuta.com/encryption)).
- **Contacts.** Proton can read your contacts' display names and email addresses, which it uses for autocomplete, spam filtering and search. Phone numbers, postal addresses, birthdays and notes are zero-access encrypted ([Proton](https://proton.me/support/proton-contacts)). Tuta encrypts the entire address book ([Tuta](https://tuta.com/encryption)).
- **Calendar.** Proton can see when your events happen: start and end times, time zone, repeat rules and whether an event was cancelled. It needs these to send reminders. Titles, descriptions, locations and attendees are end-to-end encrypted ([Proton Calendar privacy policy](https://proton.me/calendar/privacy-policy), July 2025). Tuta says it encrypts entire calendars, including event notifications ([Tuta](https://tuta.com/encryption)).

Proton's use of OpenPGP has one clear benefit. You can exchange end-to-end encrypted mail with people on other PGP-compatible services by importing their public keys ([Proton](https://proton.me/support/how-to-use-pgp)). With Tuta, people outside Tuta get encrypted mail only through a password you share with them once ([Tuta](https://tuta.com/encryption)).

### Post-quantum encryption

Both have added encryption meant to hold up against future quantum computers.

- **Tuta** made its TutaCrypt protocol the default for new accounts on March 11, 2024 ([Tuta, 2025](https://tuta.com/blog/celebrating-one-year-pq-launch)), and says every account was covered by March 2026. It combines the x25519 key exchange with Kyber-1024 ([Tuta](https://tuta.com/blog/post-quantum-cryptography)), which NIST later standardised, with changes, as ML-KEM ([NIST FIPS 203](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.203.pdf)).
- **Proton** launched post-quantum protection on May 5, 2026, for all plans, free included ([Proton](https://proton.me/blog/introducing-post-quantum-encryption)). It is off by default and still rolling out gradually. It covers new encrypted emails only, and it pauses end-to-end encrypted forwarding while it's on ([Proton](https://proton.me/support/mail-post-quantum-protection)).

---

## Open source and audits

Both publish the source code of their apps. Proton lists repositories for Mail, Calendar, Drive, Pass, VPN and its other apps ([Proton](https://proton.me/community/open-source)). Tuta publishes its web, desktop, Android and iOS clients on GitHub under the GPL-3.0 licence ([Tuta](https://tuta.com/open-source); [GitHub](https://github.com/tutao/tutanota)). Neither company's open-source page covers the server code that runs the service.

Published third-party reviews:

- **Proton.** Securitum audited the redesigned Proton Mail and Proton Calendar web apps before release. In Proton's words, it "uncovered no major issues or security vulnerabilities". Proton published the report in July 2021 ([Proton](https://proton.me/blog/security-audit)). SEC Consult audited Proton Mail Bridge, with the report published in April 2020 ([Proton](https://proton.me/blog/bridge-open-source)). Proton's open-source page links audit reports for Mail, Calendar, Drive, VPN and Pass, and none for Meet, Authenticator, Wallet or Lumo ([Proton](https://proton.me/community/open-source)).
- **Tuta.** In August 2026, three researchers at the University of Wuppertal published a formal analysis of TutaCrypt. It proves what security the protocol provides, and how its guarantees weaken if either the classical or the post-quantum part is broken ([IACR Communications in Cryptology](https://cic.iacr.org/p/3/2/15)). It covers the protocol design, and doesn't review Tuta's apps or servers. Tuta says it worked with the university's IT security and cryptography group on this proof ([Tuta, 2025](https://tuta.com/blog/celebrating-one-year-pq-launch)), and the university is Tuta's partner in PQDrive, a research project funded by the German government ([Tuta, 2023](https://tuta.com/blog/pqdrive-project)). Tuta's site also cites a penetration test by SySS GmbH in November 2013, but links no report ([Tuta](https://tuta.com/support#certification)).

---

## Company, jurisdiction and legal orders

**Proton** is Proton AG, based in Geneva. Since June 2024 its primary shareholder has been the non-profit Proton Foundation, and no change of control can happen without the foundation's consent ([Proton](https://proton.me/blog/proton-non-profit-foundation)). In July 2025 Proton said it was moving most of its physical infrastructure out of Switzerland because of legal uncertainty over Swiss government proposals for mass surveillance, starting with its AI assistant, Lumo ([Proton](https://proton.me/blog/lumo-ai)).

Proton acts only on binding requests from Swiss authorities. Foreign police have to go through Swiss legal assistance, because Swiss law bars Proton from handing data straight to foreign authorities ([Proton transparency report](https://proton.me/legal/transparency)). In 2025 Proton Mail received 9,301 legal orders, complied with 8,313 and contested 988 ([Proton transparency report](https://proton.me/legal/transparency)). Proton says it can't decrypt end-to-end encrypted content for anyone. It doesn't keep permanent IP logs by default ([Proton privacy policy](https://proton.me/legal/privacy)), but a binding Swiss order can require it to log one account's IP address. That happened in 2021, in a French investigation into a climate activist ([Proton, 2021](https://proton.me/blog/climate-activist-arrest)). In 2024, after Spanish police sent a request through Swiss police, Proton handed over the recovery email address on an account, an iCloud address. Proton said a recovery address is optional and that it can't encrypt it, because it needs to be able to email it ([TechCrunch, 2024](https://techcrunch.com/2024/05/08/encrypted-services-apple-proton-and-wire-helped-spanish-police-identify-activist/)).

**Tuta** is Tutao GmbH in Hanover ([Tuta](https://tuta.com/imprint)). It stores data in ISO 27001-certified data centres in Germany ([Tuta](https://tuta.com/support#server-location)). It releases a mailbox only on a valid German court order, but German law requires it to give authorities account details it holds, such as name, address and payment data, when they ask ([Tuta transparency report](https://tuta.com/blog/transparency-report)). From January to June 2026 it received 215 requests for account details such as name, address and payment information, and released data in 28. It received 14 requests for stored email and released data in 11. It also received 12 requests for real-time monitoring of a mailbox and released data in 6, and 30 requests for real-time traffic data, such as sender, recipient and IP address, and released data in 26 ([Tuta transparency report](https://tuta.com/blog/transparency-report)).

Under a German order for real-time monitoring, Tuta hands over unencrypted emails that arrive after the order in plain text. End-to-end encrypted emails can only be handed over still encrypted, and mail that arrived before the order can't be decrypted ([Tuta transparency report](https://tuta.com/blog/transparency-report)). Tuta doesn't log IP addresses by default. It logs an individual account's IP address only for serious crimes, after an order from a German judge ([Tuta](https://tuta.com/support#anonymous-email)).

The two reports count requests differently and cover different periods, so their totals aren't comparable. Neither service puts you beyond a court order. What either company can hand over is limited by what it can read, which is why the encryption details above matter.

---

## Free plans and prices

**Proton Free** gives you 500 MB of mail storage, rising to 1 GB once you finish Proton's getting-started checklist. It includes one address, 150 messages a day, three calendars, ten hide-my-email aliases, and the desktop app as a 14-day trial ([Proton](https://proton.me/mail/pricing)). Proton may delete a free account after 12 months without activity, and emails your recovery address 30, 15 and 7 days before ([Proton terms](https://proton.me/legal/terms)).

**Tuta Free** gives you 1 GB, one calendar and three labels, with no extra addresses and no custom domain ([Tuta](https://tuta.com/pricing)). Search on the free plan reaches back four weeks ([Tuta](https://tuta.com/support#search)). Tuta deletes free accounts after six months without a login ([Tuta](https://tuta.com/support#inactive-accounts)).

List prices for one person, October 2026. Proton's are in US dollars, and it also charges in euros, Swiss francs and some local currencies ([Proton](https://proton.me/support/payment-options)). Tuta's are in euros with tax included. Tuta's pricing page currently advertises 50% off, so the price at checkout may be lower ([Tuta](https://tuta.com/pricing)).

| Plan | Paid monthly | Paid yearly | Storage | Addresses | Custom domains |
|---|---|---|---|---|---|
| Proton Mail Plus | $4.99 a month | $47.88 ($3.99 a month) | 15 GB | 10 | 1 |
| Proton Unlimited | $12.99 a month | $119.88 ($9.99 a month) | 500 GB | 15 extra | 3 |
| Tuta Revolutionary | €3.60 a month | €36 (€3 a month) | 20 GB | 15 extra | 3 |
| Tuta Legend | €9.60 a month | €96 (€8 a month) | 500 GB | 30 extra | 10 |

Sources: [Proton pricing](https://proton.me/mail/pricing), [Tuta pricing](https://tuta.com/pricing). Proton Unlimited also includes Proton's VPN, password manager and cloud storage ([Proton](https://proton.me/mail/pricing)). On Tuta's paid plans, addresses on your own domain don't count toward the limit ([Tuta](https://tuta.com/support#aliases)).

---

## Features beyond the inbox

- **Desktop email apps.** Proton Mail Bridge lets Outlook, Apple Mail or [Thunderbird](/directory/mozilla-thunderbird) send and receive your Proton mail, on paid plans only ([Proton](https://proton.me/mail/bridge)). Tuta doesn't support IMAP, POP3 or SMTP, because it can't guarantee end-to-end encryption that way ([Tuta](https://tuta.com/support#imap)). Its Thunderbird add-ons open Tuta Mail and Calendar as a web-app tab inside Thunderbird, without notifications, email import or drag and drop ([Tuta](https://tuta.com/blog/tuta-add-on-in-thunderbird)). Otherwise you use Tuta's own web, mobile and desktop apps, which come with the free plan ([Tuta](https://tuta.com/pricing)).
- **Aliases.** Proton includes hide-my-email aliases: ten on Free and Mail Plus, unlimited on Proton Unlimited ([Proton](https://proton.me/mail/pricing)). Tuta's aliases are extra addresses on the same mailbox. Ones on Tuta's own domains can be deactivated but not deleted ([Tuta](https://tuta.com/support#aliases)). With either service you can also use a separate alias service. [SimpleLogin](/directory/simplelogin) is a Proton AG product ([SimpleLogin](https://simplelogin.io/)), and [addy.io](/directory/addy) is open source and forwards aliases to your real inbox ([addy.io](https://addy.io/)).
- **Custom domains.** Both need a paid plan (see the table above). Once your domain points at either service, our [email security check](/email-security) shows whether its SPF, DKIM and DMARC records are in place.
- **Moving from Gmail.** Proton's Easy Switch copies email, contacts and calendars from Gmail, Outlook, Yahoo and other IMAP services ([Proton](https://proton.me/support/easy-switch)), and every plan includes it ([Proton](https://proton.me/mail/pricing)). Tuta imports .eml and .mbox files, in its desktop app only ([Tuta](https://tuta.com/support#mail-import); [Tuta](https://tuta.com/pricing)).
- **Android notifications.** Tuta doesn't use Google's push service, so you need to turn off battery optimisation for the app to get notifications on time ([Tuta](https://tuta.com/support#notification)). Its Android app is also on F-Droid ([GitHub](https://github.com/tutao/tutanota)).
- **Signing up through a VPN or Tor.** Tuta holds some new accounts for manual approval to stop spam, which often affects VPN and Tor users. Approval usually comes within 24 hours on working days, and the account can't send or receive mail until then ([Tuta](https://tuta.com/support#48)).

---

## Paying without a card

**Proton** takes cards, PayPal, Apple Pay, Google Pay, bank transfer, Bitcoin and cash. Bitcoin isn't offered at sign-up: create a free account first, then upgrade from settings. Cash goes by post to Proton's Geneva office in US dollars, euros or Swiss francs, with your username enclosed, and can't be refunded ([Proton](https://proton.me/support/payment-options)).

**Tuta** takes cards and PayPal, plus bank transfer for business customers in the EU ([Tuta](https://tuta.com/support#payments)). It doesn't take crypto directly, though it says it plans to add Bitcoin. You can buy Tuta gift cards with Bitcoin, Monero or cash from a reseller Tuta names on its support page, then pay from your account balance, so no payment details are linked to your account ([Tuta](https://tuta.com/support#cryptocurrency)).

---

## Who should pick which

**Pick Tuta if:**

- you want subject lines, your whole address book and your calendar end-to-end encrypted ([Tuta](https://tuta.com/encryption))
- you want post-quantum encryption on without changing a setting ([Tuta](https://tuta.com/blog/post-quantum-cryptography))
- you want a low-cost plan with custom domains, and are happy to use Tuta's own apps ([Tuta](https://tuta.com/pricing))

**Pick Proton Mail if:**

- you need Thunderbird, Outlook or Apple Mail as a normal mail account, and will pay for Bridge ([Proton](https://proton.me/mail/bridge))
- you exchange PGP-encrypted mail with people on other services ([Proton](https://proton.me/support/how-to-use-pgp))
- you want built-in aliases, Gmail import, or a VPN and password manager on the same bill ([Proton](https://proton.me/mail/pricing))
- you want published third-party audit reports, which Proton links for Mail, Calendar, Drive, VPN and Pass ([Proton](https://proton.me/community/open-source)). The Mail web-app audit it announced dates from 2021 ([Proton](https://proton.me/blog/security-audit))

**Either way:** mail to and from ordinary addresses isn't end-to-end encrypted, and both companies can see who you email ([Proton](https://proton.me/support/proton-mail-encryption-explained); [Tuta](https://tuta.com/encryption)). Before you move other accounts to your new inbox, save its recovery details, then turn on two-step login ([where to start with privacy](/guides/privacy-where-to-start)). Tuta can't reset a lost password for you. You need your recovery code, and if you lose both your password and your second factor, even the code won't get you back in ([Tuta](https://tuta.com/support#reset)). Proton recommends a recovery phrase, because a password reset without a data recovery method loses everything stored before the reset ([Proton](https://proton.me/support/set-account-recovery-methods)).

---

## FAQ

**Is Tuta more secure than Proton Mail?**

They protect message bodies the same way: end to end between users of the same service, and encrypted on arrival for outside mail. Tuta encrypts more of what surrounds the message, such as subject lines, contacts and calendar times, and has post-quantum encryption on every account ([Tuta](https://tuta.com/encryption); [Tuta](https://tuta.com/blog/post-quantum-cryptography)). Proton links third-party audit reports for Mail, Calendar, Drive, VPN and Pass ([Proton](https://proton.me/community/open-source)). The published review we found for Tuta covers its post-quantum protocol design ([IACR](https://cic.iacr.org/p/3/2/15)).

**Does Proton Mail encrypt subject lines?**

Not end to end. Proton encrypts subject lines on its servers, but keeps them outside the end-to-end encrypted part to stay compatible with OpenPGP ([Proton](https://proton.me/support/proton-mail-encryption-explained)). Tuta encrypts subject lines end to end ([Tuta](https://tuta.com/encryption)).

**Can I use Thunderbird, Outlook or Apple Mail?**

With Proton, yes, through Proton Mail Bridge on a paid plan ([Proton](https://proton.me/mail/bridge)). With Tuta, not as a normal mail account. It doesn't support IMAP, POP3 or SMTP, so you use its own apps ([Tuta](https://tuta.com/support#imap)). Its Thunderbird add-ons open Tuta's web app in a Thunderbird tab, without notifications, email import or drag and drop ([Tuta](https://tuta.com/blog/tuta-add-on-in-thunderbird)).

**Why is my new Tuta account waiting for approval?**

Tuta holds some new accounts for manual approval to stop spam, and this often affects people signing up through a VPN or Tor. It usually approves them within 24 hours on working days. Until then the account can't send or receive mail, so wait before you share the address ([Tuta](https://tuta.com/support#48)).

**Can I pay for Proton Mail or Tuta with cash or crypto?**

Proton takes Bitcoin once you've created a free account, and cash sent by post to Geneva ([Proton](https://proton.me/support/payment-options)). Tuta doesn't take crypto directly, but sells gift cards through a reseller that accepts Bitcoin, Monero or cash ([Tuta](https://tuta.com/support#cryptocurrency)).

**Will my free account be deleted if I don't use it?**

It can be. Tuta deletes free accounts after six months without a login ([Tuta](https://tuta.com/support#inactive-accounts)). Proton may delete a free account after 12 months without activity, and warns your recovery email 30, 15 and 7 days before ([Proton](https://proton.me/legal/terms)).

**Can I keep my Gmail address while I switch?**

Yes. Gmail can forward new mail to either service ([Google](https://support.google.com/mail/answer/10957?hl=en)). Proton's Easy Switch can also copy your old mail, contacts and calendars, and connect your Gmail address so you can send and receive from it in Proton Mail ([Proton](https://proton.me/support/easy-switch)). Google still receives everything sent to your Gmail address, so move your accounts to the new address over time.

**Can police read my Proton Mail or Tuta email?**

Both can be ordered to hand over data under their home country's law, and both say they can't decrypt end-to-end encrypted content ([Proton](https://proton.me/legal/privacy); [Tuta](https://tuta.com/blog/transparency-report)). Under a German real-time monitoring order, Tuta hands over unencrypted emails that arrive after the order in plain text ([Tuta](https://tuta.com/blog/transparency-report)). Under a Swiss order, Proton has had to log an account's IP address ([Proton](https://proton.me/blog/climate-activist-arrest)), and it has handed over an account's recovery email address, which it can't encrypt ([TechCrunch, 2024](https://techcrunch.com/2024/05/08/encrypted-services-apple-proton-and-wire-helped-spanish-police-identify-activist/)). Both publish transparency reports ([Proton](https://proton.me/legal/transparency); [Tuta](https://tuta.com/blog/transparency-report)).

---

## Keep reading

- [Where to start with privacy](/guides/privacy-where-to-start)
- [Proton in the directory](/directory/proton)
- [Tuta in the directory](/directory/tuta)
