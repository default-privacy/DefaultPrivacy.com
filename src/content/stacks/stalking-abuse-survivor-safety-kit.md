---
title: "Digital Safety Kit for Stalking and Abuse Survivors"
slug: stalking-abuse-survivor-safety-kit
description: "A safety-planning first digital kit for stalking and domestic-abuse survivors and the advocates helping them — real tools to lock accounts, pull your data off broker sites, and harden a phone against a known adversary."
category: Threat-Model Stacks
difficulty: beginner
timeToComplete: "25 minutes"
publishedAt: "2026-07-07"
author: Default Privacy
tags:
  - safety
  - stalkerware
  - domestic-abuse
  - threat-model
  - privacy
relatedTools:
  - name: Bitwarden
    href: /directory/bitwarden
  - name: Ente Auth
    href: /directory/ente-auth
  - name: DeleteMe
    href: /directory/deleteme
  - name: Cloaked
    href: /directory/cloaked
  - name: GrapheneOS
    href: /directory/grapheneos
---

Reclaim your accounts, your location, and your devices from someone who already had access.

## Read this first — safety before settings

This kit is for domestic-abuse and stalking survivors, and for the advocates and shelter caseworkers helping them. Your adversary is different from most: **they are known to you, may be technically capable, and likely had prior physical or account access.** That means shared passwords, installed stalkerware, location tracking, data-broker lookups, and cameras or accounts you no longer control.

**Two warnings before you change anything:**

- **Changing settings can tip off the adversary.** If they're monitoring an account and it suddenly locks, that escalation can be dangerous. Where possible, make changes from a device they've never touched, and pace them.
- **If you are in immediate danger, a checklist is not the priority.** Contact a domestic-violence hotline or advocate who can help you build a personal safety plan first. This kit supports that plan; it does not replace it.

What this covers: **account control, data removal, and device hardening.** What it does **not** cover: physical safety, legal protective orders, or a forensic sweep for a hidden tracker — those need a trained advocate.

---

## Step 1 — Take back your accounts (do this from a safe device)

Shared or known passwords are the most common way an abuser keeps a grip. Close that door first.

### [Bitwarden](/directory/bitwarden) — a private vault for fresh, unique passwords
**Badges: public GitHub.** Create one new, strong master password the adversary has never seen, then generate a unique password for every account — email first, because email resets everything else. [KeePass](/directory/keepass) is a fully offline, open-source alternative if you'd rather no data ever leave your device.

### [Ente Auth](/directory/ente-auth) — two-factor codes they can't intercept
**Badges: open-source, public GitHub.** Turning on two-factor authentication means a stolen password alone no longer opens an account. Use an authenticator app rather than SMS, because a phone plan the abuser controls can intercept text codes. [Aegis Authenticator](/directory/aegis-authenticator) is a strong open-source option on Android.

> **Order matters:** secure your email account first, then reset the accounts that recover through it. And check each account's "active sessions" or "logged-in devices" list — signing out an unknown device quietly closes an ongoing snoop.

---

## Step 2 — Pull your personal data off the open market

Data brokers publish your address, phone, and relatives — a stalker's starting map. Removing it makes you harder to physically locate.

### [DeleteMe](/directory/deleteme) — managed removal from broker sites
A paid service that finds and files removals across the major people-search brokers on your behalf, then repeats it, because brokers re-list. This is the low-effort option when your capacity is limited. [Easy Opt Outs](/directory/easy-opt-outs) does the same job at a lower cost.

### [Big Ass Data Broker Opt Out List](/directory/big-ass-data-broker-opt-out-list) — the free DIY route
A maintained reference of broker opt-out links you can work through yourself for free. Slower, but it costs nothing and you control the pace. Prioritize the people-search sites that show a home address.

### [Global Privacy Control](/directory/global-privacy-control) — a standing "do not sell" signal
A browser signal that tells sites not to sell or share your data going forward. It's preventive, not a cleanup — pair it with active removal above.

### [Cloaked](/directory/cloaked) — masked details for new accounts
Generates masked emails, phone numbers, and logins so accounts you open *now* aren't tied to the identifiers the abuser already knows. [MySudo](/directory/mysudo) similarly provides masked identities to compartmentalize a fresh start.

---

## Step 3 — Harden the device in your hand

If the adversary had physical access to your phone, assume monitoring software could be present.

### The stalkerware reality
Hidden monitoring apps can read messages and track location while staying invisible. There is **no single app in this directory that reliably detects all stalkerware** — so don't trust a false all-clear. The most dependable reset is a **factory reset followed by rebuilding from scratch** (not restoring an old backup, which can reinstall the spyware). Do this only after you've secured your accounts and, ideally, with an advocate, because it's a visible change.

### [GrapheneOS](/directory/grapheneos) — a hardened phone for a clean start
**Badges: public GitHub.** If you're able to move to a new device, GrapheneOS is a security-hardened Android build (for Pixel phones) that gives you a clean, controlled slate with tight permission control over what any app can see. [CalyxOS](/directory/calyxos) is a similar privacy-focused option with broader everyday app compatibility.

> **On location tracking:** review which apps have location permission and revoke what you don't need, and check shared-location features (family/find-my services) that an abuser may have enabled. A physical tracker hidden in a car or bag is a real threat but a physical-search problem — bring that to an advocate, not an app.

---

## Tradeoffs at a glance

| Need | Low-effort pick | Free / DIY | Watch out for |
|------|-----------------|------------|---------------|
| Lock accounts | Bitwarden | KeePass | Secure email first |
| 2FA | Ente Auth | Aegis | Avoid SMS codes |
| Remove data | DeleteMe | Big Ass Opt Out List | Brokers re-list |
| New identifiers | Cloaked | — | Don't reuse old ones |
| Clean device | GrapheneOS | Factory reset | Don't restore old backup |

The honest tradeoff: managed services cost money but save scarce energy; the free routes cost time. Either way, work at a pace that keeps you safe from escalation.

---

## FAQ

### How do I check my phone for stalkerware?
There's no perfectly reliable detector, so don't trust a clean scan. Warning signs include fast battery drain, unfamiliar apps, and the abuser knowing things they shouldn't. The dependable fix is a factory reset and rebuilding fresh rather than restoring an old backup — ideally with an advocate, since it's a visible change that could provoke escalation.

### What's the first thing a stalking survivor should do digitally?
Secure your email account from a device the adversary has never used: set a brand-new password they've never seen and turn on app-based two-factor authentication with a tool like Ente Auth. Email recovers every other account, so it comes first — then check the account's active-session list and sign out any unknown device.

### How do I get my home address off the internet?
Your address is republished by data brokers. Use a managed service like DeleteMe or Easy Opt Outs to file removals across them, or work the free Big Ass Data Broker Opt Out List yourself. Brokers re-list over time, so removal has to be repeated, not one-and-done.

### Can an abuser track my location without a physical tracker?
Yes — through shared-location features, family-tracking services, or a monitoring app installed while they had your phone. Review app location permissions, disable location sharing you didn't set up, and if you suspect a monitoring app, plan a clean device reset with an advocate.

### Will changing my passwords alert my abuser?
It can. If they're actively monitoring an account, a sudden lockout may signal that you're taking steps, which can be dangerous. Make changes from a device they can't see, pace them, and coordinate with a domestic-violence advocate so the digital plan matches your physical safety plan.
