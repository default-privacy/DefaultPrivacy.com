---
title: "Dox Yourself First: The OSINT Self-Audit Stack"
slug: osint-yourself-exposure-check
description: "A runnable self-audit for finding what the open internet already knows about you — map your public footprint, test what your browser leaks, then close the loop with vetted removal and masking tools."
category: Threat-Model Stacks
difficulty: intermediate
timeToComplete: "1-2 hours"
publishedAt: "2026-07-07"
author: Default Privacy
tags:
  - osint
  - self-audit
  - data-brokers
  - threat-model
  - opt-out
relatedTools:
  - name: Browser Leaks
    href: /directory/browser-leaks
  - name: AmIUnique Timeline
    href: /directory/amiunique-timeline
  - name: Easy Opt Outs
    href: /directory/easy-opt-outs
  - name: SimpleLogin
    href: /directory/simplelogin
  - name: Global Privacy Control
    href: /directory/global-privacy-control
---

# Dox Yourself First: The OSINT Self-Audit Stack

*Find what the open internet already knows about you — before someone with worse intentions does.*

## Who this is for and what it defends against

Open-source intelligence, or OSINT, is the practice of assembling a picture of a person from nothing but public sources: search results, leaked breach data, reused usernames, exposed emails, and public records. Anyone can do it to you. The prudent move is to do it to yourself **first**, see what's exposed, and shut it down.

This is a **runnable self-audit**, not a tool dump. You'll map your own footprint with free methods, test what your browser leaks, and then **close the loop** with vetted removal and masking tools — the step most OSINT guides skip. It defends against your assembled public footprint being used for stalking, social engineering, or credential attacks.

Scope, honestly: this audits **public and broker-held** exposure. It won't reveal private records held under warrant, and it can't guarantee permanent removal — brokers re-list. Treat it as hygiene you repeat, not a one-time fix.

## Step 1 — Map your footprint (free, methodical)

Start with reconnaissance, the same way an analyst would. No tools to install yet — just disciplined searching.

- **Search your identifiers.** Run your full name, each email, each phone number, and every username you've reused, in quotes, across a few independent search engines. Use different engines so you're not seeing one index's blind spots — [Brave Search](/directory/brave-search) (independent index, audited) and [Mojeek](/directory/mojeek) (independent index) surface results a single provider filters out.
- **Enumerate reused usernames.** A handle you've used since forever ties accounts together across platforms. Write down every username you've reused; that list is your linkage map, and shrinking it is half the remediation.
- **Check your emails against known breaches.** Assume any email older than a few years is in a public breach corpus. Search each one against a reputable breach-lookup service and note where it appears — those are your reused-password danger zones.
- **Review public records and domain registrations.** If you've ever registered a domain, a WHOIS lookup may expose the name, address, and phone you used. Note anything not already behind registration privacy.

Document every hit in one list. That list **is** your attack surface.

## Step 2 — Test what your device leaks

Your footprint isn't only historical — your browser leaks a live, trackable identity right now.

### [Browser Leaks](/directory/browser-leaks)
Runs a battery of tests showing exactly what your browser exposes — IP, DNS, WebRTC, and more. It turns "am I leaking?" into a concrete, fixable list.

### [AmIUnique Timeline](/directory/amiunique-timeline)
Shows how identifiable your browser fingerprint is — the combination of settings that lets sites recognize you without cookies. The more unique you are, the easier you are to follow across the web.

## Step 3 — Close the loop: remove and remediate

A finding you don't act on is just anxiety. This is where the self-audit pays off — turning your exposure list into removals.

### Get off the broker record
- **[Easy Opt Outs](/directory/easy-opt-outs)** — affordable, hands-off opt-outs across the major data brokers.
- **[DeleteMe](/directory/deleteme)** — removes personal info from brokers as an ongoing service, since brokers re-list.
- **[Big Ass Data Broker Opt Out List](/directory/big-ass-data-broker-opt-out-list)** — the DIY reference if you'd rather file the opt-outs yourself, for free.
- **[Global Privacy Control](/directory/global-privacy-control)** — a browser-level signal that tells sites to reject the sale of your data going forward.

### Cut the linkage for next time
- **[SimpleLogin](/directory/simplelogin)** (open-source) or **[Addy](/directory/addy)** (public GitHub) — give every service a unique email alias so a single leak can't be correlated across your accounts.
- **[Firefox Private Relay](/directory/firefox-private-relay)** (open-source) — masks email and phone so the identifiers you hand out aren't your real ones.
- **[Cloaked](/directory/cloaked)** and **[MySudo](/directory/mysudo)** — masked identities, emails, and numbers so future sign-ups never touch your real footprint.

> **Next stop: the removal deep-dive.** The opt-out layer above is the summary. When you're ready to work through every broker systematically, the data-broker removal stack is the companion guide that closes this loop for good.

## Tradeoffs — what a self-audit can and can't do

| Reality | What it means |
|---|---|
| Brokers re-list | Opt-out is recurring, not one-and-done |
| DIY vs. service | Free lists cost time; DeleteMe/Easy Opt Outs cost money, save hours |
| Aliases are forward-looking | They protect new sign-ups, not the exposure already out there |
| You can't remove everything | Court records and some public data are permanent; manage, don't erase |

The honest call: a self-audit **structures** your exposure into something you can act on and shrink over time. It does not make you disappear — anyone promising that is selling something.

## Frequently asked questions

### How do I dox myself, or run an OSINT self-audit?
Work in three passes. First, map your footprint by searching your name, emails, phone numbers, and reused usernames across independent search engines and checking your emails against breach corpora. Second, test what your browser leaks with tools like Browser Leaks and AmIUnique. Third, act on every finding — file broker opt-outs and switch new sign-ups to email aliases and masked identities.

### Where does my personal information actually leak from?
Four main sources: data brokers that compile and sell profiles, old breaches that expose reused emails and passwords, reused usernames that link your accounts across platforms, and public records like domain WHOIS registrations. A self-audit checks each source so you know which ones are exposing you.

### Can I actually remove myself from data broker sites?
Largely, yes — but it recurs. You can file opt-outs yourself for free using a DIY reference list, or use a service like Easy Opt Outs or DeleteMe to handle it and keep re-filing as brokers re-list you. Add Global Privacy Control to signal, going forward, that sites should not sell your data.

### How often should I audit my online exposure?
Treat it like a recurring checkup — roughly every few months, and again after any major breach news or a big life change like a move or a new job. Brokers re-list and new accounts accumulate, so a single audit is a snapshot, not a permanent state.

### What's the difference between deleting an account and opting out?
Deleting removes an account you control on a specific service. Opting out tells a data broker — a company you never signed up with — to stop compiling and selling a profile about you. Most of your exposed footprint is broker-held, which is why opt-outs, not deletions, do the heavy lifting in this stack.

---

*Audit yourself on a schedule. The exposure you find and close is exposure an adversary never gets to use.*

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "Dox Yourself First: The OSINT Self-Audit Stack",
  "description": "A runnable OSINT self-audit for finding and removing your public footprint before an adversary does.",
  "author": { "@type": "Organization", "name": "Default Privacy" },
  "publisher": { "@type": "Organization", "name": "Default Privacy" },
  "datePublished": "2026-07-07"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How do I dox myself, or run an OSINT self-audit?", "acceptedAnswer": { "@type": "Answer", "text": "Work in three passes: map your footprint by searching your name, emails, phone numbers, and reused usernames and checking emails against breach corpora; test what your browser leaks with Browser Leaks and AmIUnique; then act on findings with broker opt-outs and email aliases." } },
    { "@type": "Question", "name": "Where does my personal information actually leak from?", "acceptedAnswer": { "@type": "Answer", "text": "Four main sources: data brokers that sell profiles, old breaches that expose reused emails, reused usernames that link accounts, and public records like domain WHOIS registrations." } },
    { "@type": "Question", "name": "Can I actually remove myself from data broker sites?", "acceptedAnswer": { "@type": "Answer", "text": "Largely yes, but it recurs. File opt-outs yourself with a DIY list, or use a service like Easy Opt Outs or DeleteMe to keep re-filing as brokers re-list you, and add Global Privacy Control going forward." } },
    { "@type": "Question", "name": "How often should I audit my online exposure?", "acceptedAnswer": { "@type": "Answer", "text": "Every few months, and again after major breach news or a life change like a move or new job. Brokers re-list and accounts accumulate, so one audit is a snapshot, not a permanent state." } },
    { "@type": "Question", "name": "What's the difference between deleting an account and opting out?", "acceptedAnswer": { "@type": "Answer", "text": "Deleting removes an account you control on a service. Opting out tells a data broker you never signed up with to stop compiling and selling a profile. Most exposure is broker-held, so opt-outs do the heavy lifting." } }
  ]
}
</script>
