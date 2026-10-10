---
title: "Was My Phone Number in a Data Breach? How to Check, and What to Do"
slug: was-my-phone-number-in-a-data-breach
description: "Probably, and no site can tell you for sure. Have I Been Pwned no longer searches phone numbers, so check your email instead. Then lock your number at your carrier, move logins off text codes and treat texts with suspicion."
category: Privacy
difficulty: beginner
timeToComplete: "10 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - data breach
  - phone number
  - have i been pwned
  - sim swap
  - port-out
  - two-factor authentication
  - smishing
  - people search
relatedGuides:
  - remove-name-from-data-brokers
  - get-a-second-phone-number
relatedTools:
  - name: Account breach check
    href: /breach-check
  - name: Have I Been Pwned
    href: /directory/have-i-been-pwned
  - name: Aegis Authenticator
    href: /directory/aegis-authenticator
  - name: 2FAS
    href: /directory/2fas
  - name: Ente Auth
    href: /directory/ente-auth
  - name: YubiKey
    href: /directory/yubikey
  - name: Signal
    href: /directory/signal
---

**Last checked: October 2026** · Each claim links to its source: the breach service itself, the carrier's own support pages, or the company or US agency that published it.

Probably, and no website can tell you for sure. Have I Been Pwned [stopped searching phone numbers on its website](https://www.troyhunt.com/have-i-been-pwned-2-0-is-now-live/) in May 2025, and phone numbers appear in 379 of the 1,043 breaches it holds ([HIBP breach list](https://haveibeenpwned.com/PwnedWebsites), counted October 9, 2026). Treat your number as already public: lock it at your carrier, take it out of your logins, and be suspicious of texts.

This was the most-viewed question on the former Techlore privacy forum. Here is the full answer.

---

## How to check

### Search your email on Have I Been Pwned

The search box on [Have I Been Pwned](/directory/have-i-been-pwned) (HIBP) asks for [your email address](https://haveibeenpwned.com/). Phone numbers were only ever made searchable for one incident, the 2021 Facebook leak, and HIBP [dropped phone search from the website](https://www.troyhunt.com/have-i-been-pwned-2-0-is-now-live/) on May 19, 2025. Its API [still accepts numbers](https://www.troyhunt.com/have-i-been-pwned-2-0-is-now-live/), but it needs a [paid subscription key](https://haveibeenpwned.com/API/v3), and the announcement says "don't expect to see more data there."

Your email is the better route anyway. Almost every breach HIBP holds includes email addresses: 1,036 of the 1,043 list them ([HIBP breach list](https://haveibeenpwned.com/PwnedWebsites), October 2026).

1. Search your email address on [HIBP](https://haveibeenpwned.com/).
2. Open each breach it finds. Each breach page lists the compromised data. If that list includes phone numbers, as the [Facebook entry](https://haveibeenpwned.com/Breach/Facebook) does, and you gave that service your number, assume your number was in it.
3. Turn on [Notify Me](https://haveibeenpwned.com/NotifyMe). It's free, and it emails you when your address turns up in a new breach.

A clean result doesn't clear your number. A phone-only leak, such as the [2024 Free Mobile breach](https://haveibeenpwned.com/Breach/FreeMobile), can't show up in an email search. A leak can also hold far more phone numbers than email addresses: the Facebook data held [over 500 million phone numbers but only a few million email addresses](https://www.troyhunt.com/the-facebook-phone-numbers-are-now-searchable-in-have-i-been-pwned/).

Our [breach check](/breach-check) page walks you through the HIBP email search and the recovery steps that follow. It doesn't check phone numbers, and it never asks for your email.

### See where your number shows up on Google

Google's [Results about you](https://support.google.com/websearch/answer/12719076) tells you whether your phone number, home address or email address appears in Google Search results, and lets you ask for a result to be removed. You give Google the details to look for, and it can notify you when new matches appear. Google keeps some results it considers valuable to the public, such as government, news and business sites, and some of these features are still rolling out to adults in certain markets.

This finds public listings, such as people-search pages. It doesn't search breach data.

### Be careful with other lookup sites

Some sites offer to check your number against "the dark web." Before you type it into one, read its privacy policy: you would be handing your number to one more database. A lookup can show a match. It can never prove your number is safe.

---

## What someone can do with your number

**Take over the number.** In a SIM swap, a criminal gets your number moved to a SIM card or eSIM they control ([Verizon](https://www.verizon.com/about/account-security/sim-swapping)). The FBI says they do it by impersonating you to the carrier, phishing carrier staff, or [paying off a carrier employee](https://www.ic3.gov/PSA/2022/PSA220208) (February 2022). An unauthorized port-out does the same by moving your number to another carrier ([Verizon](https://www.verizon.com/about/account-security/unauthorized-port-outs)). Either way, your calls and texts go to them. In 2021 the FBI received 1,611 SIM-swap complaints, with losses of more than $68 million ([FBI](https://www.ic3.gov/PSA/2022/PSA220208)).

**Reset your accounts.** Once they control your number, they can send "Forgot Password" or "Account Recovery" requests to accounts tied to it, receive the texted code and log in ([FBI](https://www.ic3.gov/PSA/2022/PSA220208)). The FTC warns they can then [take over your bank, email or social media accounts and lock you out](https://consumer.ftc.gov/consumer-alerts/2019/10/sim-swap-scams-how-protect-yourself).

**Text you scams.** Anyone with your number can text you. Scam texts claim there's a problem with your account or a payment, promise prizes or gift cards, or ask for passwords and account numbers ([FTC](https://consumer.ftc.gov/articles/how-recognize-and-report-spam-text-messages)).

**Look you up.** People-search sites sell reports compiled from many sources. The FTC says that if someone has "just one piece of information about you, like your name or phone number," they [could buy a report](https://consumer.ftc.gov/articles/what-know-about-people-search-sites-sell-your-information) that tells them a lot about you. Numbers get matched to people at scale, too. Facebook says the data that leaked in 2021 was [scraped through its contact importer](https://about.fb.com/news/2021/04/facts-on-news-reports-about-facebook-data/) before September 2019, by uploading phone numbers and seeing which profiles matched.

---

## What to do

### 1. Lock your number at your carrier

T-Mobile, Verizon and AT&T each offer free locks against SIM swaps and port-outs. You have to switch them on yourself. If you're on someone else's plan, such as a family or work account, the account holder may need to turn them on or off for you ([Verizon](https://www.verizon.com/about/account-security/sim-swapping), [T-Mobile](https://www.t-mobile.com/support/plans-features/help-with-t-mobile-account-fraud), [AT&T](https://www.att.com/support/article/wireless/000102016/)).

| Carrier | What to turn on | Where |
|---|---|---|
| T-Mobile | **SIM Protection** (postpaid and prepaid accounts) and **Port Out Protection** (postpaid, prepaid and Metro), both free. Port Out Protection has to be added to each line separately ([T-Mobile](https://www.t-mobile.com/support/plans-features/help-with-t-mobile-account-fraud)) | T-Life app or T-Mobile.com |
| Verizon | **SIM Protection** blocks SIM and device changes. **Number Lock** blocks moves to another carrier. Both are at no cost ([SIM swaps](https://www.verizon.com/about/account-security/sim-swapping), [port-outs](https://www.verizon.com/about/account-security/unauthorized-port-outs)) | My Verizon app (postpaid): Account tab > Edit Profile and Settings > Security ([Verizon](https://www.verizon.com/about/account-security/sim-swapping)). Website: Account > Account settings > Security settings ([Verizon](https://www.verizon.com/support/knowledge-base-309294/)) |
| AT&T | **Wireless Account Lock**, free ([AT&T](https://www.att.com/support/article/wireless/000102016/)). While it's on, the SIM [can't be changed](https://www.att.com/support/article/wireless/KM1001034/) and the number [can't be transferred](https://www.att.com/support/article/wireless/KM1447526/) | AT&T app |

- **Set a strong account PIN as well.** T-Mobile requires 6 to 15 digits and refuses sequences, repeats, the start or end of your phone number, your Social Security number and your date of birth ([T-Mobile](https://www.t-mobile.com/support/plans-features/help-with-t-mobile-account-fraud)). Those are good rules for any carrier's PIN.
- **On another carrier,** ask whether it offers a SIM lock or a port-out lock. If it doesn't, set an account PIN.
- **Switch the lock off before you change phones or carriers.** T-Mobile shows an error if SIM Protection is still on ([T-Mobile](https://www.t-mobile.com/support/plans-features/help-with-t-mobile-account-fraud)). Verizon keeps SIM changes blocked for 15 minutes after you turn SIM Protection off ([Verizon](https://www.verizon.com/support/knowledge-base-309294/)).
- **Don't rely on the lock alone.** The FBI says some SIM swaps are carried out by [carrier employees who have been paid off](https://www.ic3.gov/PSA/2022/PSA220208). Step 2 makes a stolen number far less useful.

### 2. Take your number out of your logins

A texted code is the weakest kind of two-factor login. NIST's digital identity guidelines (SP 800-63B, revised in 2025) name codes sent by text or phone call as their only ["restricted" authenticator](https://pages.nist.gov/800-63-4/sp800-63b.html#restricted), which an organization should accept only after it has weighed the risk. The FBI recommends [authenticator apps, physical security tokens or biometrics](https://www.ic3.gov/PSA/2022/PSA220208) instead.

1. **Start with your main email,** then your bank, your carrier account and your password manager. Whoever controls your email can reset most of your other accounts.
2. **Switch each one from text codes** to an authenticator app such as [Aegis](/directory/aegis-authenticator), [2FAS](/directory/2fas) or [Ente Auth](/directory/ente-auth), or to a passkey or a security key such as a [YubiKey](/directory/yubikey). A passkey signs you in the same way you unlock your phone or computer, and the FIDO Alliance, which sets the standard, calls passkeys [phishing-resistant by design](https://fidoalliance.org/passkeys/).
3. **Save each account's backup codes** somewhere offline, and turn on your authenticator app's backup or export before you rely on it, so losing your phone doesn't lock you out.
4. **Check how each account lets you back in.** If a text message alone can reset the password, your number is still a way in ([FBI](https://www.ic3.gov/PSA/2022/PSA220208)). Where the account offers other recovery options, consider removing the phone number, and turn off text codes once the app or passkey works.
5. **Lock your Signal account.** [Signal](/directory/signal) registers accounts by phone number, and your Signal PIN [can also serve as a registration lock](https://support.signal.org/hc/en-us/articles/360007059792-Signal-PIN). Turn it on under Settings > Account. Keep the PIN safe: if you forget it with the lock on, you can be locked out for up to 7 days.

### 3. Treat texts and calls as untrusted

- **Don't tap links in unexpected texts or reply with details.** The FTC says ["legitimate companies won't ask for information about your account by text."](https://consumer.ftc.gov/articles/how-recognize-and-report-spam-text-messages) If a message might be real, contact the company using a number or website you already know.
- **Never give your carrier PIN or password to someone who calls you.** Hang up and call your carrier's customer service line yourself ([FBI](https://www.ic3.gov/PSA/2022/PSA220208)).
- **Report scam texts.** Forward them to 7726 (SPAM), which helps your carrier block similar messages, and report them at [ReportFraud.ftc.gov](https://reportfraud.ftc.gov/) ([FTC](https://consumer.ftc.gov/articles/how-recognize-and-report-spam-text-messages)).
- **A login code you didn't ask for** can mean someone is trying to sign in to or reset that account. Don't share the code with anyone, and change that account's password.

### 4. Use a second number for sign-ups

Keep your real number for your bank, your carrier, work and the people you know. Give shops, apps and loyalty programs a second number, so the next breach leaks a number that isn't tied to your logins. See [how to get a second phone number](/guides/get-a-second-phone-number).

### 5. Get your number off people-search sites

Work through the [data broker removal guide](/guides/remove-name-from-data-brokers), and use Google's [Results about you](https://support.google.com/websearch/answer/12719076) to find listings in search. The FTC says you can opt out of people-search sites ["one by one, for free, or pay a service"](https://consumer.ftc.gov/articles/what-know-about-people-search-sites-sell-your-information) to do it for you. After you opt out, a site stops selling your existing information. Your details can still appear in relatives' or neighbors' reports, and can come back up for sale if your public records change.

---

## If someone has taken over your number

Watch for:

- **Your phone suddenly can't text or call** in a place where it normally works. The FBI says to [watch for changes in SMS connectivity](https://www.ic3.gov/PSA/2022/PSA220208).
- **Your carrier tells you a new SIM or device is being activated,** or that your number is being moved, and you didn't ask for it ([SIM swaps](https://www.verizon.com/about/account-security/sim-swapping), [port-outs](https://www.verizon.com/about/account-security/unauthorized-port-outs)).
- **Password-reset or login alerts** you didn't trigger.

What to do, following the [FBI's steps](https://www.ic3.gov/PSA/2022/PSA220208):

1. **Call your carrier right away from another phone.** Verizon customers can dial *611, which Verizon says works even if your device has been deactivated, or 1-800-922-0204 ([Verizon](https://www.verizon.com/about/account-security/sim-swapping)). T-Mobile says to [contact it as soon as possible](https://www.t-mobile.com/support/plans-features/help-with-t-mobile-account-fraud). On AT&T or any other carrier, call its customer service line.
2. **Change the passwords** on your email and financial accounts.
3. **Ask your bank** to put an alert on your accounts for suspicious logins and transactions.
4. **Report it** to the FBI's [Internet Crime Complaint Center](https://www.ic3.gov/) and your local police.
5. **If someone opened accounts in your name,** [IdentityTheft.gov](https://www.identitytheft.gov/) has step-by-step advice for reporting it and fixing your credit. A [credit freeze](/guides/how-to-freeze-your-credit) is free and stops new credit accounts being opened in your name while it's in place ([FTC](https://consumer.ftc.gov/articles/what-know-about-credit-freezes-and-fraud-alerts)).

---

## FAQ

**Can I check my phone number on Have I Been Pwned?**

Not on the website. HIBP dropped phone number search from its site in May 2025 and now searches email addresses ([Troy Hunt](https://www.troyhunt.com/have-i-been-pwned-2-0-is-now-live/)). Its paid API still accepts numbers, but the only phone numbers ever loaded came from the 2021 Facebook leak. Search your email instead, and check each breach's list of compromised data for phone numbers.

**Is there a free site I can trust to check my phone number?**

We don't know of one that checks breach data and that we can vouch for. Google's [Results about you](https://support.google.com/websearch/answer/12719076) shows where your number appears in Google Search, which covers people-search listings but not breaches. Before you type your number into any other checker, read its privacy policy.

**What can a scammer do with just my phone number?**

Text or call you with scams, look you up on people-search sites, and try to take over the number through your carrier. If they take it over, they can receive your login codes and reset accounts tied to it ([FBI](https://www.ic3.gov/PSA/2022/PSA220208)).

**Should I change my phone number after a breach?**

Usually it helps less than it seems. You'd have to update every account that uses the number, and the new one is exposed again as soon as you start giving it out. Lock the number at your carrier and move your logins off text codes instead. A new number makes more sense if you're being harassed or targeted.

**Are text message codes better than nothing?**

Yes. NIST still allows them as a second factor, though a [restricted one](https://pages.nist.gov/800-63-4/sp800-63b.html#restricted). Switch to an authenticator app, a passkey or a security key wherever an account offers one.

**Does a carrier PIN stop SIM swapping?**

It helps, and the carriers' locks go further: T-Mobile's SIM Protection, Verizon's SIM Protection and AT&T's Wireless Account Lock block SIM changes until you switch them off yourself. The FBI says some SIM swaps are done by [carrier employees who have been paid off](https://www.ic3.gov/PSA/2022/PSA220208), so move your logins off text codes as well.

**How would I know if my number has been taken over?**

Your phone stops being able to call or text for no clear reason, your carrier tells you about a SIM, device or number transfer you didn't ask for, or you get password-reset alerts you didn't trigger. Call your carrier from another phone straight away ([FBI](https://www.ic3.gov/PSA/2022/PSA220208)).

---

## Keep reading

- [Remove your name from data brokers](/guides/remove-name-from-data-brokers)
- [Get a second phone number](/guides/get-a-second-phone-number)
- [How to freeze your credit](/guides/how-to-freeze-your-credit)
- [Account breach check](/breach-check)
