---
title: "How Your Email Gets Out Before You Press Subscribe, and How Some Sites Know It Without a Form"
slug: how-your-email-gets-out-before-you-press-subscribe
description: "Type your email into a signup box and change your mind. On thousands of sites it has already left, often as a hash that ad networks use to recognise you everywhere. A second family of companies skips the form entirely and matches your connection to an email on file. Here is how both work, who runs them, and what blocks them."
category: Privacy
difficulty: beginner
timeToComplete: "12 minutes"
publishedAt: "2026-11-05"
updatedAt: "2026-11-05"
author: Default Privacy
tags:
  - email tracking
  - hashed email
  - identity resolution
  - visitor identification
  - data brokers
  - third-party cookies
  - RB2B
  - Retention.com
relatedGuides:
  - email-aliases-simplelogin-vs-addy
  - remove-name-from-data-brokers
relatedTools:
  - name: Website privacy scanner
    href: /scanner
  - name: uBlock Origin
    href: /directory/ublock-origin
  - name: SimpleLogin
    href: /directory/simplelogin
  - name: Firefox
    href: /directory/firefox
---

**Last checked: November 2026** · US-focused · Each claim links to its source: the vendor's own documentation or the research that measured it. Where we say "we found", it's our own reading as of November 5, 2026.

You type your email into a newsletter box, then close the tab. On thousands of sites it has already gone out. A 2022 study of the top 100,000 websites found email addresses sent to tracking, marketing and analytics companies before the form was submitted on [1,844 sites in its EU crawl and 2,950 in its US crawl](https://www.usenix.org/system/files/sec22-senol.pdf), ["even when users change their minds and leave the site without submitting the form."](https://www.usenix.org/system/files/sec22-senol.pdf) Most of it travels as a hash, a scrambled form of your address that every site computes the same way, so it works as an identifier that you can never clear.

A second group of companies doesn't wait for a form at all. They match your connection to an email already on file and hand it to the site you're visiting. One of them, Retention.com, also runs RB2B, which tells a business the names of the people reading its website.

## The Short Answer

Your email is an identifier, and its hash is the same identifier. Treat typing it anywhere as handing it over.

1. Use a different alias per site. A hash of an alias only ever matches that one site.
2. Use a browser that blocks third-party cookies by default. It weakens the cookie networks the no-form matchers draw on.
3. Run uBlock Origin. Its default lists block most of the form collectors named below. They do not block RB2B or Retention.com.
4. Opt out of Retention.com's database. One form covers RB2B too.
5. Don't type an email into a form you haven't decided to submit.

## Why a hashed email is still your email

Ad networks don't need your address. They need a label that is the same on every site. So the industry agreed on a recipe. Unified ID 2.0, an ad-industry standard built to replace the tracking cookie, spells it out: ["An email hash is a Base64-encoded SHA-256 hash of a normalized email address."](https://unifiedid.com/docs/getting-started/gs-normalization-encoding) Before hashing, the address is lowercased and trimmed, and for Gmail the dots and plus-tags are stripped, so JANESaoirse@gmail.com ["normalizes to janesaoirse@gmail.com"](https://unifiedid.com/docs/getting-started/gs-normalization-encoding) and produces the same hash as jane.saoirse+shopping@gmail.com.

The result is a string that any two companies can compare without either one sending the other an email address. LiveIntent, which runs ads inside newsletters, describes its whole business as ["replacing the cookie with an equally ubiquitous – but far more stable – identifier: the hashed email address."](https://www.liveintent.com/authenticated-bridge/) LiveRamp's version is a RampID: ["every time a user provides their email address, an encrypted envelope containing a RampID is generated, which is then used in the bidstream"](https://docs.liveramp.com/privacy-manager/en/authenticated-traffic-solution.html), meaning the auctions that sell ad space on the page you're reading.

A cookie dies when you clear it. A hash of your email is the same on your phone, your laptop and your work machine, and it's the same next year.

## Who collects it before you submit

The 2022 study, Leaky Forms, from Radboud University, KU Leuven and the University of Lausanne, filled in forms on the top 100,000 sites, never pressed submit, and watched the network. Its [table of the biggest collectors](https://www.usenix.org/system/files/sec22-senol.pdf) in the US crawl is led by LiveRamp, Taboola, Bounce Exchange, Adobe's Bizible, Awin, FullStory, Listrak, Yahoo, AdRoll, Yandex, Criteo and Neustar.

Two behaviours show up in that table:

- **Sent key by key.** FullStory, Bizible, Listrak, Yahoo and Yandex received the address as it was typed. These are session recorders, marketing tags and identity endpoints; every keystroke goes out.
- **Sent after you finished typing.** LiveRamp, Taboola, Criteo, Neustar, Awin and Bounce Exchange got it once, after the field was filled. The crawler moved to the next field with Tab and never pressed submit.

The researchers found LiveRamp collecting the MD5, SHA-1 and SHA-256 hashes of an email typed into the login forms on [WebMD and Fox News](https://www.usenix.org/system/files/sec22-senol.pdf). Facebook's pixel has a setting that does the same. The study summarises Meta's documentation: ["Automatic Advanced Matching captures hashed customer data including email addresses, phone numbers, first and last names; from checkout, sign-in and registration forms."](https://www.usenix.org/system/files/sec22-senol.pdf) The study saw it send a hashed email on 17 EU sites without a submit, and the researchers believe the script treats clicks on unrelated buttons as a submit.

When the researchers wrote to the companies, Taboola said that in certain cases it collects email hashes before submission for personalisation and that ["they keep email hashes for at most 13 months"](https://www.usenix.org/system/files/sec22-senol.pdf). The researchers add that Taboola said it only collects after consent, but their ["findings and subsequent manual verification showed that was not always the case."](https://www.usenix.org/system/files/sec22-senol.pdf)

## The sites that know your email without a form

A graph that holds hashed emails next to IP addresses and cookies can also be read in reverse. Retention.com, based in Austin, describes its product as exactly that: ["resolve anonymous visitors to a hashed email (HEM), then enrich that identity with business profile data."](https://retention.com/solutions/website-deanonymization/) A site doesn't even need to run a script. In Retention.com's words: ["Simply pass an IP address and user agent to Retention.com, and we return a HEM when a match is available."](https://retention.com/solutions/website-deanonymization/)

Its privacy policy says what the cookies are for. They don't hold directly identifying information, but ["it may be possible for our third-party business partners to combine it with other information in order to identify your email address"](https://retention.com/privacy-policy/), and one listed purpose is ["Creating “identity” graphs or associations between data points, to help locate users across various channels"](https://retention.com/privacy-policy/).

RB2B is the same company's product for businesses. Its own description: ["Install one line of code in your site header and RB2B identifies the actual people and companies visiting your website, then delivers their names, LinkedIn profiles, business emails and firmographics"](https://www.rb2b.com/about) to the site's sales tools. RB2B says it ["is built by Retention.com"](https://www.rb2b.com/about), ["an identity data company based in Austin, Texas"](https://www.rb2b.com/about), and that ["more than 100,000 websites use RB2B"](https://www.rb2b.com/about).

Retention.com doesn't publish where its graph comes from beyond ["data you voluntarily have submitted to us, e.g., your email address"](https://retention.com/privacy-policy/) and partners. But the two halves run on the same currency. A hashed email leaked from a form is the kind of record a graph like this is built from, and a site running RB2B is reading one.

## What to do

### 1. Use an alias per site

An alias is a forwarding address that only one site knows. Its hash matches nothing anywhere else, so the identifier stops working as an identifier. SimpleLogin and addy.io do this; our [email aliases guide](/guides/email-aliases-simplelogin-vs-addy) compares them.

### 2. Block third-party cookies by default

The no-form matchers draw on cookies, device IDs and IP addresses gathered across many sites. Cookies are the part you can cut. Firefox's Total Cookie Protection ["works by creating a separate “cookie jar” for each website you visit."](https://blog.mozilla.org/en/mozilla/firefox-rolls-out-total-cookie-protection-by-default-to-all-users-worldwide/) Brave ["blocks both third-party cookies and third-party storage (e.g. storage in iframes) by default"](https://brave.com/shields/). Either one means the cookie a data broker set on one site can't be read on the next.

### 3. Run uBlock Origin

We checked its default lists against the Leaky Forms table: LiveRamp, Taboola, Bounce Exchange, Awin, FullStory, AdRoll, Yandex and Criteo are blocked. We found no rule for RB2B's loader or for Retention.com in any of uBlock's default lists, and a site can also do the lookup on its own server from your IP address. That's why step 2 and step 4 still matter.

### 4. Opt out of Retention.com

One form covers the whole family, RB2B included. The opt-out page says ["All US residents may exercise their right to opt-out by submitting this form or calling 1-(855) 306-2455"](https://app.retention.com/optout). It asks for the email you want removed and a zip code, which is the point: it can only remove what it can match.

### 5. Don't type what you haven't decided to send

Leaky Forms is the measurement of a habit: starting a form and abandoning it. The collectors above treat the first keystroke as the signal. If you're not sure you want the newsletter, don't start.

## Check a site yourself

Our [website scanner](/scanner) flags visitor-identification scripts, including RB2B and Retention.com, and the session recorders that send what you type. It also types a nonsense word into a page's fields, submits nothing, and reports which outside companies it saw receive it.

## FAQ

**Is a hashed email anonymous?**
No. The same address always makes the same hash, so anyone holding a list of hashes can match you across sites. The Leaky Forms authors note that ["even hashed or encrypted email addresses"](https://www.usenix.org/system/files/sec22-senol.pdf) can be linked to a person.

**Does GDPR stop this in Europe?**
The study ran from the EU as well as the US and still found it on 1,844 sites, fewer than the US but far from zero. Some collectors do hold back in Europe: the paper notes LiveRamp refused its EU requests outright. On the few sites where the study could find a consent banner, rejecting everything barely changed the number of leaks.

**I never signed up for anything. How does a site have my email?**
Through a match on your IP address and browser against a graph the company already holds. Retention.com documents accepting an IP address and user agent and returning a hashed email, and its privacy policy lists data you submitted, email opens, browsing and data compilers among its sources. The fix is cutting the links: alias per site, no third-party cookies, and the opt-out.

**Will a VPN help?**
It changes the IP address the matcher sees, which weakens an IP-based lookup. It does nothing about a hash you type into a form.

## Keep reading

- [Email aliases: SimpleLogin vs addy.io](/guides/email-aliases-simplelogin-vs-addy)
- [Remove your name from data brokers](/guides/remove-name-from-data-brokers)
