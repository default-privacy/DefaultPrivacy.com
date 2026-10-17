---
title: "What Still Works After Switching to GrapheneOS?"
slug: what-still-works-after-switching-to-grapheneos
description: "Most apps, Android Auto, calls, texts and the Pixel camera keep working on GrapheneOS. Google Wallet tap-to-pay does not, and some banking and other apps refuse to run. Here is what changes and what to do before you switch."
category: Privacy
difficulty: intermediate
timeToComplete: "12 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-17"
author: Default Privacy
tags:
  - grapheneos
  - android auto
  - banking apps
  - play store
  - keyboard
  - sandboxed google play
  - tap to pay
  - de-google
  - android
relatedTools:
  - name: GrapheneOS
    href: /directory/grapheneos
  - name: Accrescent
    href: /directory/accrescent
  - name: Obtainium
    href: /directory/obtainium
  - name: HeliBoard
    href: /directory/heliboard
  - name: EteSync
    href: /directory/etesync
  - name: Organic Maps
    href: /directory/organic-maps
  - name: FUTO Keyboard
    href: /directory/futo-keyboard
  - name: DAVx⁵
    href: /directory/davx5
  - name: Seedvault
    href: /directory/seedvault
  - name: Molly
    href: /directory/molly
---

**Last checked: October 2026** · Each claim links to GrapheneOS's own documentation, a GrapheneOS staff post, or the named app's own site.

Most of your phone keeps working. Calls, texts, the camera, Android Auto and nearly every Play Store app run on GrapheneOS, many of them through an optional, sandboxed copy of Google Play. The real losses are Google Wallet tap-to-pay and the banking and [other apps](https://discuss.grapheneos.org/d/31710/5) that refuse any system Google hasn't certified.

---

## What you give up, and what you keep

GrapheneOS ships with no Google apps or services and [will never bundle them](https://grapheneos.org/faq#google-services). You can install Google Play yourself as a [regular, sandboxed app](https://grapheneos.org/usage#sandboxed-google-play). GrapheneOS staff say you can run mainstream apps that way [without giving up a large amount of privacy](https://discuss.grapheneos.org/d/36187/3) (June 2026).

| Area | On GrapheneOS, October 2026 |
|---|---|
| Play Store apps | Work with sandboxed Google Play, including in-app purchases and license checks ([usage guide](https://grapheneos.org/usage#sandboxed-google-play)) |
| Android Auto | Works, as an opt-in extension of sandboxed Google Play ([usage guide](https://grapheneos.org/usage#android-auto)) |
| Calls, SMS, MMS, VoLTE, 5G | Generally work on carriers Google supports for Pixels. Wi-Fi calling and visual voicemail vary ([usage guide](https://grapheneos.org/usage#carrier-functionality)) |
| Camera | Same capabilities and quality as the stock OS when you compare the same app ([usage guide](https://grapheneos.org/usage#camera)) |
| Push notifications | Work, including Google's push service for apps in a profile with Google Play ([staff, May 2026](https://discuss.grapheneos.org/d/35691/4)) |
| Maps and location | Google Maps runs with sandboxed Google Play; location sharing needs two extra permissions ([usage guide](https://grapheneos.org/usage#sandboxed-google-play-location-sharing)). [Organic Maps](/directory/organic-maps) works fully offline ([Organic Maps](https://organicmaps.app/)) |
| Banking apps | Many work, but the usage guide calls them [a particularly problematic class](https://grapheneos.org/usage#banking-apps). Some refuse systems Google hasn't certified, and one that works today can stop working after an update ([June 2026 example](https://discuss.grapheneos.org/d/36505/1)) |
| Google Wallet tap-to-pay | Does not work ([Google Wallet Help](https://support.google.com/wallet/answer/12200245?hl=en)) |
| Features that need Google Play built into the OS | Unavailable. GrapheneOS never uses Google Play as the backend for system services ([usage guide](https://grapheneos.org/usage#sandboxed-google-play-limitations)) |

---

## Keyboards after Gboard

The built-in keyboard is the basic Android Open Source Project (AOSP) keyboard. It has no swipe typing, [as the project said in 2023](https://grapheneos.social/@GrapheneOS/111274269511296031), and no release since has added it ([changelog](https://grapheneos.org/releases)). In June 2026 staff called it one of the [old AOSP apps they plan to replace](https://discuss.grapheneos.org/d/36187/3) and said there's no pressure to use it.

- **[FUTO Keyboard](/directory/futo-keyboard)** runs fully offline, with swipe typing and offline voice input. Its code is published under FUTO's own [source-first licence](https://github.com/futo-org/android-keyboard/blob/master/LICENSE.md), which allows modification only for non-commercial use. FUTO's voice input also works with [other compatible keyboards](https://keyboard.futo.tech/).
- **[HeliBoard](/directory/heliboard)** is open source. Swipe typing works only if you add a closed-source Google library yourself, because the app [doesn't include one](https://github.com/HeliBorg/HeliBoard).
- **[FlorisBoard](/directory/florisboard)** is open source and still describes itself as [in beta](https://github.com/florisboard/florisboard).
- **Gboard** is still [on the Play Store](https://play.google.com/store/apps/details?id=com.google.android.inputmethod.latin). If you keep it, you can switch off its [Network permission](https://grapheneos.org/features#network-permission-toggle) at install time, and GrapheneOS will tell the app the network is down.

---

## Getting apps without the Play Store

GrapheneOS has its own [App Store](https://grapheneos.org/features#grapheneos-app-repository) for its apps and for sandboxed Google Play. Beyond that, roughly in the order GrapheneOS staff recommend:

1. **[Accrescent](/directory/accrescent).** Staff call it ["the preferred source of apps"](https://discuss.grapheneos.org/d/35071/15) (April 2026). It installs from the GrapheneOS App Store, needs no account, and verifies each app's signing key even on first install ([Accrescent](https://accrescent.app/)). It is still labelled alpha.
2. **The Play Store, through sandboxed Google Play.** The usage guide calls it [the most secure way to install and update Play Store apps](https://grapheneos.org/usage#sandboxed-google-play-installation). Installing requires a signed-in Google account.
3. **Developers' own releases.** GrapheneOS [recommends them over F-Droid's builds](https://x.com/GrapheneOS/status/1886861104770322780) (February 2025), so treat [F-Droid](/directory/f-droid) as a fallback. [Obtainium](/directory/obtainium) installs and updates apps straight from release pages such as GitHub ([Obtainium](https://obtainium.imranr.dev/)). The same GrapheneOS post says most people can't be expected to manage Obtainium plus signature checks.
4. **[Aurora Store](/directory/aurora-store)** fetches Play Store apps using shared accounts from Aurora's service by default, instead of your own ([usage guide](https://grapheneos.org/usage#sandboxed-google-play-installation)). Staff note it [lacks proper automatic updates](https://discuss.grapheneos.org/d/35691/4).

---

## Sandboxed Google Play: do you need it, how private is it, which profile?

**Do you need it?** Only if your apps need it. Staff say most apps [just work](https://discuss.grapheneos.org/d/35691/4), and an app that requires Google Play has to sit in a profile where it's installed. Common reasons to install it: most [banking apps](https://grapheneos.org/usage#banking-apps), apps that only support Google's push service ([staff](https://discuss.grapheneos.org/d/35691/4)), [Android Auto](https://grapheneos.org/usage#android-auto) and [RCS in Google Messages](https://grapheneos.org/usage#rcs).

**How private is it?** It runs as an ordinary app with [no special access](https://grapheneos.org/usage#sandboxed-google-play). It can't read other apps' data, gets permissions only when you grant them, and only apps in the same profile can use it. Signing into a Google account is [optional](https://grapheneos.org/usage#sandboxed-google-play-installation) unless you install apps or make in-app purchases through the Play Store, or use an app that signs you in with your Google account. What it doesn't change: whatever you or your apps send to Google still reaches Google. Apps using Google's push service, for example, receive messages [through Google's servers](https://grapheneos.org/faq#notifications).

**Which profile?** The usage guide calls the Owner (main) profile [the simplest choice](https://grapheneos.org/usage#sandboxed-google-play-installation), and Google Play stays sandboxed there. To limit which apps can use it, install it in a separate user, a work profile or Private Space. Staff point out the last two [sit inside the Owner profile](https://discuss.grapheneos.org/d/35691/4), so you don't have to switch users. One catch: RCS in Google Messages is [only known to work in the Owner profile](https://grapheneos.org/usage#rcs).

For push notifications to arrive in the background, give Google Play services a [battery optimization exception](https://grapheneos.org/usage#sandboxed-google-play-installation). Signal [works without Google Play](https://grapheneos.org/faq#notifications), but staff say its fallback connection drains more battery and suggest [Molly](/directory/molly) with [UnifiedPush](/directory/unifiedpush) instead ([staff, May 2026](https://discuss.grapheneos.org/d/35691/4)).

---

## Banking apps and tap-to-pay

**Banking apps.** For many banking apps, installing sandboxed Google Play in the same profile [is enough](https://grapheneos.org/usage#banking-apps). The usage guide describes two further obstacles:

- **Google's integrity check.** The usage guide uses its old name, SafetyNet, which Google [replaced with the Play Integrity API](https://developer.android.com/privacy-and-security/safetynet/deprecation-timeline). Play Integrity asks Google whether the phone is ["a genuine and certified Android device"](https://developer.android.com/google/play/integrity/verdicts). GrapheneOS [isn't certified by Google](https://grapheneos.org/usage#banking-apps), and staff say it [has never passed](https://discuss.grapheneos.org/d/36505/3) the device or strong integrity checks. An app that demands them will refuse, and no GrapheneOS setting changes that. GrapheneOS shows a notice when an app uses this API, though using it doesn't always mean the app blocks GrapheneOS ([staff, June 2026](https://discuss.grapheneos.org/d/31710/5)). Banks can support GrapheneOS through Android's [hardware attestation API](https://grapheneos.org/articles/attestation-compatibility-guide) instead.
- **Anti-tampering code.** If you turned off native code debugging in Settings > Security & privacy > Exploit protection, turn it back on. Some apps' anti-tampering code [clashes with that setting](https://grapheneos.org/usage#banking-apps).

Before you switch, look up your bank on the community-maintained [PrivSec.dev compatibility list](https://privsec.dev/posts/android/banking-applications-compatibility-with-grapheneos/) (last updated October 1, 2026). GrapheneOS's usage guide points to it and makes [no guarantee](https://grapheneos.org/usage#banking-apps) about its accuracy. If your bank's app refuses, check whether its website covers what you need.

**Tap-to-pay.** Google Wallet can't make contactless payments on a phone that runs a custom ROM, has an unlocked bootloader, or isn't certified by Google ([Google Wallet Help](https://support.google.com/wallet/answer/12200245?hl=en)). NFC itself is [fully supported](https://discuss.grapheneos.org/d/27904/2), and other payment apps use it: staff name Curve Pay, PayPal and many European banks. As of August 2025, Curve Pay and PayPal tap-to-pay were [limited to Europe](https://discuss.grapheneos.org/d/24640/2), with Curve covering the UK and the European Economic Area. In June 2026 staff said phone tap-to-pay on GrapheneOS is [mostly available in Europe](https://discuss.grapheneos.org/d/36187/3). Elsewhere, plan on carrying a contactless card.

---

## Contacts and calendar sync

To sync without Google, use a sync app that plugs into the phone's own contacts and calendar:

- **[DAVx⁵](/directory/davx5)** syncs contacts, calendars and tasks with any CalDAV or CardDAV server and works with your existing apps. [Nextcloud's Android instructions](https://docs.nextcloud.com/server/latest/user_manual/en/groupware/sync_android.html) use it with a [Nextcloud](/directory/nextcloud) server. As of June 2023, DAVx⁵ said syncing a Google account's contacts and calendars [seemed possible](https://www.davx5.com/tested-with/google), with occasional server errors, though neither Google nor DAVx⁵ officially supports it.
- **[EteSync](/directory/etesync)** adds end-to-end encryption and [works with your existing apps](https://www.etesync.com/).
- **[Proton](/directory/proton)** and **[Tuta](/directory/tuta)** offer encrypted calendars in their own apps ([Proton Calendar](https://proton.me/calendar), [Tuta Calendar](https://tuta.com/calendar)). As of October 2026, an [open request in Proton's repository](https://github.com/ProtonMail/android-calendar/issues/17) says Proton Calendar events can't be shared with other apps on the phone.

To carry contacts over, export them from Google Contacts as a [vCard file](https://support.google.com/contacts/answer/7199294?hl=en) and import it on the new phone.

---

## Backups and moving from your old phone

Installing GrapheneOS [wipes the phone](https://grapheneos.org/install/web#unlocking-the-bootloader), so copy your data off first. GrapheneOS doesn't use Google's backup service. It uses [Seedvault](https://grapheneos.org/faq#google-services), which makes [encrypted backups](https://grapheneos.org/features#encrypted-backups) to a local drive or to any cloud storage app.

Know its limits. Staff say a Seedvault backup is [hard to use without another GrapheneOS device](https://discuss.grapheneos.org/d/27234/6), and that some apps, Signal among them, [don't work with external backup systems](https://discuss.grapheneos.org/d/25190/2). Use those apps' own encrypted backups. GrapheneOS also plans to [replace Seedvault](https://grapheneos.org/features#encrypted-backups) with a new implementation.

For photos and files, use a flash drive or USB file transfer. On a Mac, USB transfer needs an app such as [OpenMTP](https://openmtp.ganeshrvel.com/) ([FAQ](https://grapheneos.org/faq#file-transfer)).

---

## Android Auto

Android Auto has worked on GrapheneOS since release [2023123000](https://grapheneos.org/releases#2023123000) at the end of December 2023. How it works as of October 2026, per the [usage guide](https://grapheneos.org/usage#android-auto):

- Install it from the GrapheneOS App Store. It can't come from the Play Store, and it needs sandboxed Google Play.
- Set it up at Settings > Apps > Sandboxed Google Play > Android Auto. It starts with no privileged access. You grant the wired or wireless permissions it needs, and wired needs far less.
- Some cars need the wireless permissions even over a cable.
- Allow notification access to see messages on the car screen.
- Apps appear in the car only if they were installed from the Play Store and support Android Auto. Staff said in June 2026 they [plan to relax this](https://discuss.grapheneos.org/d/36137/6).

---

## Calls, texts and eSIM

- **Carrier features.** GrapheneOS aims to work with every carrier Google officially supports for Pixels. Some features may not work on some carriers, Wi-Fi calling varies because it can depend on Google apps GrapheneOS doesn't ship, and visual voicemail doesn't currently work for AT&T customers in the US ([usage guide](https://grapheneos.org/usage#carrier-functionality)).
- **eSIM.** eSIMs already on the phone work. To add or manage one, turn on Settings > Network & internet > eSIM support. It doesn't need Google Play ([usage guide](https://grapheneos.org/usage#esim-support)).
- **Leaving an iPhone.** If texts go missing, deregister your number from Apple iMessage ([usage guide](https://grapheneos.org/usage#carrier-functionality)).
- **RCS.** Works in Google Messages with sandboxed Google Play ([usage guide](https://grapheneos.org/usage#rcs)).

---

## Camera

GrapheneOS includes its own camera app. Google's Pixel Camera also runs, with full use of the camera hardware, and doesn't need sandboxed Google Play to run ([usage guide](https://grapheneos.org/usage#pixel-camera)). It normally comes from the [Play Store](https://play.google.com/store/apps/details?id=com.google.android.GoogleCamera), though, and installing from the Play Store needs sandboxed Google Play and a signed-in Google account ([usage guide](https://grapheneos.org/usage#sandboxed-google-play-installation)).

---

## Smartwatches and wearables

Watch companion apps follow the same rule as any app: only apps in the same profile as sandboxed Google Play can use it ([usage guide](https://grapheneos.org/usage#sandboxed-google-play)). Google Wallet on a Wear OS watch needs Google Play services on the phone, and once a card is on the watch it [pays without the phone](https://support.google.com/wallet/answer/12059876?hl=en). GrapheneOS hasn't documented whether Wallet tap-to-pay works on a watch paired with a GrapheneOS phone, so treat it as unconfirmed. Staff do say [most people don't have issues with Pixel Watches](https://discuss.grapheneos.org/d/36187/7) on GrapheneOS. For an open-source route, [Gadgetbridge](/directory/gadgetbridge) manages watches and bands without the vendor's app; check its [device list](https://gadgetbridge.org/gadgets/) first.

---

## Before you switch

1. **Check your phone.** As of October 2026 GrapheneOS supports the Pixel 6 through Pixel 10 series, plus the Pixel Fold and Pixel Tablet ([FAQ](https://grapheneos.org/faq#supported-devices)). Older models are running out: Google's minimum support ends October 2026 for the Pixel 6 and 6 Pro, July 2027 for the 6a and October 2027 for the 7 and 7 Pro, and official updates typically end shortly after ([device lifetime table](https://grapheneos.org/faq#device-lifetime)). If you're buying a phone, get a Pixel 8 or newer, where GrapheneOS's [recommended devices](https://grapheneos.org/faq#recommended-devices) start. It said in August 2026 that the Pixel 11 [doesn't yet meet its security standards](https://discuss.grapheneos.org/d/41564/1). Avoid carrier-locked Pixels, which may not unlock ([FAQ](https://grapheneos.org/faq#supported-devices)).
2. **Check your bank and payment apps** on the [PrivSec.dev list](https://privsec.dev/posts/android/banking-applications-compatibility-with-grapheneos/), and decide how you'll pay in shops. If your bank approves sign-ins or payments in its own app, set up a backup sign-in method with the bank first, and keep your old phone working until the bank's app runs on GrapheneOS.
3. **List the apps you rely on** and where each will come from: Accrescent, the Play Store or the developer.
4. **Back up** photos, files, contacts (as a vCard) and each messenger's own backup.
5. **Move two-factor codes** to an authenticator such as [Aegis](/directory/aegis-authenticator), test each one, and save every account's recovery codes before you wipe anything.
6. **Get the hardware ready.** The web installer needs a computer with 2 GB of free memory and 32 GB of free storage, or another Android phone, plus a good USB-C cable ([install guide](https://grapheneos.org/install/web#prerequisites)). Use an [official install method](https://grapheneos.org/install); GrapheneOS warns that third-party guides are often out of date.
7. **Know the way back.** You can [reinstall the stock OS](https://grapheneos.org/install/web#replacing-grapheneos-with-the-stock-os) later. That wipes the phone again, because unlocking and relocking the bootloader each [erase all data](https://grapheneos.org/install/web#unlocking-the-bootloader), so back up first.

---

## FAQ

**Will my apps still work on GrapheneOS?**

Most will. GrapheneOS staff say most apps just work, and apps that need Google Play work once sandboxed Google Play is installed in the same profile ([staff, May 2026](https://discuss.grapheneos.org/d/35691/4)). The exceptions are apps that demand Google's device certification.

**Do I need a Google account on GrapheneOS?**

Not for the phone itself. You need one to install apps or make in-app purchases through the Play Store, and for apps that sign you in with a Google account ([usage guide](https://grapheneos.org/usage#sandboxed-google-play-installation)). Accrescent needs no account ([Accrescent](https://accrescent.app/)).

**Does Google Pay or Google Wallet tap-to-pay work on GrapheneOS?**

No. Google Wallet doesn't make contactless payments on custom ROMs or phones Google hasn't certified ([Google Wallet Help](https://support.google.com/wallet/answer/12200245?hl=en)). In Europe, Curve Pay, PayPal and many banks' own apps offer tap-to-pay that works on GrapheneOS ([staff, November 2025](https://discuss.grapheneos.org/d/27904/2)).

**Why does my banking app say my device isn't supported?**

If GrapheneOS shows a Play Integrity notice for the app, the app is checking for a Google-certified system, and GrapheneOS isn't one ([staff, June 2026](https://discuss.grapheneos.org/d/31710/5); [usage guide](https://grapheneos.org/usage#banking-apps)). Check the [PrivSec.dev list](https://privsec.dev/posts/android/banking-applications-compatibility-with-grapheneos/), and ask your bank to support GrapheneOS through [hardware attestation](https://grapheneos.org/articles/attestation-compatibility-guide). If there's no notice, check you didn't hide it for that app, and try turning native code debugging back on. Staff also suggest updating to the latest GrapheneOS release, which may carry a fix ([staff, June 2026](https://discuss.grapheneos.org/d/36505/3)).

**Does Android Auto work on GrapheneOS?**

Yes, since the end of December 2023 ([changelog](https://grapheneos.org/releases#2023123000)). Install it from the GrapheneOS App Store, set it up under Settings > Apps > Sandboxed Google Play > Android Auto, and use car apps installed from the Play Store ([usage guide](https://grapheneos.org/usage#android-auto)).

**Is sandboxed Google Play a privacy risk?**

It gets no special access and can't read other apps' data ([usage guide](https://grapheneos.org/usage#sandboxed-google-play)). Anything you or your apps send to Google, such as push notifications through Google's servers, still reaches Google ([FAQ](https://grapheneos.org/faq#notifications)).

**Can I restore my Google backup from my old phone?**

Not through Google's device backup. GrapheneOS never uses Google Play as the backend for system services ([usage guide](https://grapheneos.org/usage#sandboxed-google-play-limitations)), and its backup service is Seedvault ([FAQ](https://grapheneos.org/faq#google-services)). Move data app by app: contacts as a vCard, photos over USB, and each messenger's own backup. Data stored in an app's own cloud account comes back when you sign in to that app.

**Can I go back to the stock Pixel OS?**

Yes. The install guide explains how to [reinstall the stock OS](https://grapheneos.org/install/web#replacing-grapheneos-with-the-stock-os) and fully return the phone to a stock state. Going back wipes the phone again, so back up first.

**Does the Cape mobile carrier work on GrapheneOS?**

Cape says it supports "Google Pixel (including GrapheneOS)" on Android 13 or higher, works on eSIM-compatible phones, and offers its ID Rotation feature on those Pixels ([Cape FAQ](https://www.cape.co/faqs)). It requires Cape's app, which creates the key pair you log in with, and links its app on Google Play ([Cape](https://www.cape.co/)). Cape says it asks for a phone number and zip code at sign-up, not your name ([Cape Privacy Policy](https://www.cape.co/privacy-policy)).

---

## Keep reading

- [De-Google your Android phone](/stacks/degoogle-android-phone)
- [GrapheneOS in the glossary](/glossary/grapheneos)
- [GrapheneOS in the directory](/directory/grapheneos)
