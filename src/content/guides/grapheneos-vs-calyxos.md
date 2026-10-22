---
title: "GrapheneOS vs CalyxOS: Which Privacy Phone OS Should You Choose?"
slug: grapheneos-vs-calyxos
description: "GrapheneOS and CalyxOS both replace Android with a privacy-focused version. They differ on phones supported, how they handle Google apps, how often they update, and how much hardening they add. This guide sets out what each project says about itself, including CalyxOS's pause in official releases and its return in July 2026."
category: Privacy
difficulty: intermediate
timeToComplete: "15 minutes"
publishedAt: "2026-10-10"
updatedAt: "2026-10-10"
author: Default Privacy
tags:
  - grapheneos
  - calyxos
  - privacy phone
  - custom rom
  - microg
  - degoogled android
  - pixel
relatedGuides:
  - what-still-works-after-switching-to-grapheneos
  - apps-without-the-google-play-store
  - how-to-build-your-threat-model
  - private-browsers-compared
relatedTools:
  - name: GrapheneOS
    href: /directory/grapheneos
  - name: CalyxOS
    href: /directory/calyxos
  - name: Aurora Store
    href: /directory/aurora-store
  - name: F-Droid
    href: /directory/f-droid
  - name: Seedvault
    href: /directory/seedvault
  - name: Murena e/OS
    href: /directory/e-os
---

**Last checked: October 2026** · Everything below is what each project says on its own site, with a link. We have not installed or tested either one for this guide, and both change often, so check the linked pages.

If you can use a recent Google Pixel, GrapheneOS is the stronger choice on what the two projects document: more hardening, a sandboxed way to run Google apps, and a steady release record. Choose CalyxOS if you need a phone that GrapheneOS doesn't support, such as a Fairphone or a Motorola, or if you prefer its microG approach to Google apps.

This is our reading of the sources, not a ranking from either project. The "Which one" section at the end says where we could be wrong.

---

## The Short Answer

If you can use a recent Pixel, GrapheneOS is the stronger choice on what the two projects document. Choose CalyxOS if your phone is one GrapheneOS doesn't support, or if you prefer its microG approach to Google apps. We did not test either.

1. Pick GrapheneOS if you own or will buy a Pixel. For a new phone, GrapheneOS advises a Pixel 8 or newer.
2. Pick CalyxOS if you own a Fairphone, a Motorola from its list, or a SHIFTphone.
3. Back up first. Installing wipes the phone.
4. Check each project's own pages before you install, since both change often.

## What they have in common

Both projects replace the Android that came on your phone with a version that has Google's apps and services removed or contained. Both depend on Android's open source code. Android says that, starting in 2026, it publishes source code to the Android Open Source Project in Q2 and Q4 ([Android](https://source.android.com/docs/whatsnew)). Neither project's pages that we read explain how that change affects them.

Both use verified boot, which checks that the system hasn't been altered. CalyxOS says it uses verified boot, including re-locking the bootloader ([CalyxOS](https://calyxos.org/docs/guide/device-support/)). GrapheneOS tells you to check the verified boot key hash after installing to confirm you have genuine GrapheneOS ([GrapheneOS FAQ](https://grapheneos.org/faq)).

---

## Which phones

This is the biggest practical difference.

- **GrapheneOS** officially supports Pixel phones, from the Pixel 6 up to the Pixel 10a and the Pixel Fold and Tablet. It recommends buying a Pixel 8 or newer, for better security and a minimum support guarantee of 7 years from launch. Pixels from the 8th generation on also support hardware memory tagging, which GrapheneOS uses by default ([GrapheneOS FAQ](https://grapheneos.org/faq)). A phone locked by a carrier, which mainly happens in the US, can prevent installing GrapheneOS ([GrapheneOS FAQ](https://grapheneos.org/faq)).
- **CalyxOS** supports Pixels, and also the Fairphone 5 and the Fairphone (Gen. 6, beta), several Motorola moto g models, and the SHIFTphone 8. It publishes estimated support dates for each: for example, Pixel 9 devices to August 2031, the Fairphone 5 to September 2031 and the Pixel 10a to March 2033, all marked as estimates ([CalyxOS](https://calyxos.org/docs/guide/device-support/)). It lists several older devices as no longer supported ([CalyxOS](https://calyxos.org/)).

If you already own a Pixel 6 or newer, both are options. If you own a Fairphone or a Motorola from CalyxOS's list, only CalyxOS applies. If you plan to buy a phone for this, GrapheneOS's own advice is a Pixel 8 or newer.

---

## Google apps: sandboxed Play vs microG

Many apps expect Google Play Services. The two projects solve this differently.

**GrapheneOS: Sandboxed Google Play.** GrapheneOS offers a compatibility layer that lets you install the official Google Play releases as ordinary apps in the standard app sandbox. It says Google Play receives no special access or privileges, and that you install it inside a specific user or work profile. It says the vast majority of Play services functionality works, and a small subset of privileged functionality is unavailable ([GrapheneOS features](https://grapheneos.org/features)). It is optional.

**CalyxOS: microG.** microG is an open-source replacement for parts of Google Play Services, and CalyxOS says it is optional. In the default setup, microG is on with no Google account and with push notifications enabled. CalyxOS says that when microG first registers with Google, your IP address and device model information are sent to Google, and that Google's Advertising ID is completely disabled. If you add a Google Account, your account name is sent too. CalyxOS describes its approach as "harm reduction", saying it is not 100% perfect privacy but very good ([CalyxOS microG](https://calyxos.org/docs/guide/microg/)). It also explains that microG needs an Android feature called signature spoofing, and says it limited it to one signature for one program, microG ([CalyxOS microG](https://calyxos.org/docs/guide/microg/)).

In plain terms: GrapheneOS keeps Google's code inside a cage you can choose to open. CalyxOS replaces some of it with different code that still talks to Google for push notifications and sends some data when it registers. Which you prefer depends on how much you want to avoid contact with Google's servers, and how many of your apps need to work.

For what works under either approach, see [what still works after switching to GrapheneOS](/guides/what-still-works-after-switching-to-grapheneos) and [apps without the Google Play Store](/guides/apps-without-the-google-play-store).

---

## Security features

GrapheneOS publishes a long feature list. Its features page lists, among others: attack surface reduction, exploit mitigations, improved sandboxing, a network permission toggle, a sensors permission toggle, PIN scrambling, auto reboot, a duress PIN, storage and contact scopes, a hardened browser and WebView called Vanadium, and an Auditor app for attestation ([GrapheneOS features](https://grapheneos.org/features)). It says it is heavily focused on protecting against unknown vulnerabilities ([GrapheneOS features](https://grapheneos.org/features)). See also [private browsers compared](/guides/private-browsers-compared) for Vanadium.

CalyxOS describes itself as privacy and security for everyday users, with proactive security recommendations and automatic updates. Its home page lists Signal, F-Droid and Aurora Store for apps, and bundled VPN options from Tor and Riseup ([CalyxOS](https://calyxos.org/)). Its July 2026 release notes point to Seedvault for backing up and restoring your data ([CalyxOS](https://calyxos.org/news/2026/07/01/calyxos-official-release-is-back/)). It also redesigned its signing process around a hardware security module, which it presented at FOSDEM 2026 ([CalyxOS](https://calyxos.org/news/2026/02/10/calyxos-hsm-signing/)).

**Our reading:** GrapheneOS documents a much longer list of hardening measures than CalyxOS does on the pages we read. That does not prove one is safer in practice. We did not test either, and a feature list is not an audit.

---

## Updates and reliability

This is where the two differ most, and CalyxOS is open about its own history.

CalyxOS's news page shows a post titled "Last OTA update before the new CalyxOS release" on 27 August 2025, followed by progress reports through 2026. On 1 July 2026 it published a post saying CalyxOS is "officially back from the hiatus" with release 7.2.2.0, and that people on older releases need a clean install ([CalyxOS news](https://calyxos.org/news/); [CalyxOS](https://calyxos.org/news/2026/07/01/calyxos-official-release-is-back/)). Since then it has posted security and feature updates in August and September 2026, and began rolling out Android 17 on 1 October 2026. On 5 October it said it had received reports of new issues with the Android 17 update and changed its release schedule ([CalyxOS](https://calyxos.org/news/2026/10/01/android-17-is-here/)). CalyxOS is run by the Calyx Institute, a 501(c)(3) non-profit ([CalyxOS](https://calyxos.org/)).

GrapheneOS's releases page lists a long run of releases through 2026, the latest tag being 2026100600 ([GrapheneOS releases](https://grapheneos.org/releases)).

If you rely on your phone for security, a gap in updates matters. The gap has ended, and CalyxOS now ships updates again, but its recent release record is shorter than GrapheneOS's.

---

## Installing

GrapheneOS has two official installation methods: a WebUSB-based installer it recommends for most people and a command-line guide for technical users ([GrapheneOS FAQ](https://grapheneos.org/faq)). CalyxOS offers a Web Installer and a device-flasher tool, and says a recent tool update made installation from macOS available again ([CalyxOS](https://calyxos.org/news/2026/10/01/android-17-is-here/)). Either way, installing wipes the phone, so back up first.

---

## When this is overkill

A custom phone operating system replaces your phone's software and changes which apps work. If what you want is less tracking on the phone you already have, start smaller: our [starter guide](/guides/privacy-where-to-start) covers settings, tracker blocking and a private browser, and [private browsers compared](/guides/private-browsers-compared) covers the browser. Move to GrapheneOS or CalyxOS when your [threat model](/guides/how-to-build-your-threat-model) says the phone itself is what needs protecting.

---

## Which one

| You have or want | Our reading |
|---|---|
| A recent Pixel, and you want the most hardening | GrapheneOS |
| To use Google apps without giving them system access | GrapheneOS (sandboxed Play) |
| A Fairphone, Motorola or SHIFTphone | CalyxOS |
| A simple setup that keeps push notifications working | CalyxOS, with microG's trade-offs above |
| To buy a new phone for this | A Pixel 8 or newer with GrapheneOS, per GrapheneOS's own advice |

**Strongest case against GrapheneOS:** it only supports Pixels. That ties your privacy phone to Google hardware, and a Fairphone buyer can't use it. **Strongest case against CalyxOS:** it paused official releases between August 2025 and July 2026, and its Android 17 rollout is still settling.

---

## FAQ

**Is GrapheneOS better than CalyxOS?**

On the pages we read, GrapheneOS documents more hardening and has a steadier release record, so it is our pick if you can use a Pixel. CalyxOS supports more phones. We did not test either ([GrapheneOS features](https://grapheneos.org/features); [CalyxOS](https://calyxos.org/)).

**Can I use banking apps and Google apps on either?**

GrapheneOS offers sandboxed Google Play for apps that need it ([GrapheneOS features](https://grapheneos.org/features)). CalyxOS uses microG for many apps ([CalyxOS microG](https://calyxos.org/docs/guide/microg/)). Whether a given banking app works varies. Our guide to [what still works on GrapheneOS](/guides/what-still-works-after-switching-to-grapheneos) covers it for GrapheneOS.

**Does microG send my data to Google?**

CalyxOS says that when microG registers with Google, your IP address and device model are sent to Google, and that push notifications come from Google servers. With microG disabled it says no information is sent to any server ([CalyxOS microG](https://calyxos.org/docs/guide/microg/)).

**Was CalyxOS discontinued?**

No. It paused official releases and returned on 1 July 2026 ([CalyxOS](https://calyxos.org/news/2026/07/01/calyxos-official-release-is-back/)). It is shipping updates now.

**Which phone should I buy?**

GrapheneOS recommends the Pixel 8 and newer for better security and a 7-year minimum support guarantee ([GrapheneOS FAQ](https://grapheneos.org/faq)). CalyxOS lists estimated support end dates for each phone it supports ([CalyxOS](https://calyxos.org/docs/guide/device-support/)).

**What other options are there?**

Murena's e/OS is another de-Googled Android in our directory; see [e/OS](/directory/e-os). Compare it against your threat model before you choose, and see [how to build your threat model](/guides/how-to-build-your-threat-model).
