---
title: "How to Get Apps Without the Google Play Store"
slug: apps-without-the-google-play-store
description: "Install and update Android apps without Google Play: F-Droid, Accrescent, Obtainium, the GrapheneOS App Store, Aurora Store and direct APKs. What each one trusts, how to check a signing key, and which private keyboards replace Gboard."
category: Privacy
difficulty: intermediate
timeToComplete: "15 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - play store
  - f-droid
  - accrescent
  - obtainium
  - aurora store
  - sideloading
  - apk
  - keyboard
  - grapheneos
  - de-google
relatedGuides:
  - what-still-works-after-switching-to-grapheneos
relatedTools:
  - name: F-Droid
    href: /directory/f-droid
  - name: Accrescent
    href: /directory/accrescent
  - name: Obtainium
    href: /directory/obtainium
  - name: Aurora Store
    href: /directory/aurora-store
  - name: HeliBoard
    href: /directory/heliboard
  - name: FUTO Keyboard
    href: /directory/futo-keyboard
  - name: GrapheneOS
    href: /directory/grapheneos
  - name: CalyxOS
    href: /directory/calyxos
---

**Last checked: October 2026** · Each claim links to the project's own documentation or repository.

You can run an Android phone without the Google Play Store by installing apps from other sources: F-Droid, Accrescent, Obtainium, the GrapheneOS App Store, or APK files downloaded straight from a developer. Each source trusts a different party, so the choice matters more than the install button. Most privacy-focused apps are available this way. Apps that exist only on Play are the gap, and there are ways to handle them.

---

## Why people leave the Play Store

The usual reasons are a phone with no Google account, a de-Googled system such as [GrapheneOS](/directory/grapheneos) or [CalyxOS](/directory/calyxos), or simply not wanting one company to see every app you install. GrapheneOS ships [without Google apps and services](https://grapheneos.org/faq#google-services), so its users need another way to get apps from day one.

If you use GrapheneOS, start with its own [usage guide](https://grapheneos.org/usage). It is the authority on your system and may differ from anything here. For how well apps run afterward, see [What Still Works After Switching to GrapheneOS](/guides/what-still-works-after-switching-to-grapheneos).

---

## The sources, and what each one trusts

| Source | How it works | What you trust |
|---|---|---|
| [F-Droid](/directory/f-droid) | A catalogue of free and open source apps | F-Droid's build and signing process, unless the app is reproducible |
| [Accrescent](/directory/accrescent) | A store where developers keep their own signing keys | Accrescent's signing-key pinning, plus the developer |
| [Obtainium](/directory/obtainium) | Installs and updates apps from developers' release pages | The developer's release page, and you check the key |
| GrapheneOS App Store | The store built into GrapheneOS | The GrapheneOS project |
| [Aurora Store](/directory/aurora-store) | A client for Google Play's catalogue | Google's servers and Aurora's login service |
| Direct APK | A file you download yourself | The website you got it from, and you check the key |

### F-Droid

F-Droid's catalogue is free and open source software. Apps that are not set up for reproducible builds are [signed with F-Droid's own keys](https://f-droid.org/en/docs/FAQ_-_App_Developers/), with a separate key for each app, so you trust F-Droid to have built what the source says. F-Droid says its [signing is done on an offline machine](https://f-droid.org/en/docs/Security_Model/). When an app builds reproducibly, F-Droid can [copy the developer's own signature onto its build](https://f-droid.org/docs/Reproducible_Builds/). Apps that track you are [flagged with an Anti-Feature label](https://f-droid.org/en/docs/Anti-Features/) and hidden by default.

### Accrescent

Accrescent is a newer store that is [still in alpha](https://accrescent.app/). Its design avoids trusting the store with your apps: it [pins each app's signing key](https://accrescent.app/) so a first install is verified, it does not sign apps for developers, and it needs no account. It runs on Android 10 and up. Its site recommends the GrapheneOS App Store as the way to install it on GrapheneOS.

### Obtainium

Obtainium [installs and updates apps straight from their release pages](https://github.com/ImranR98/Obtainium), including GitHub, GitLab, Codeberg and F-Droid. With GitHub, GitLab or Codeberg sources you get the developer's own build. The cost is that nothing reviews the app for you, and the project notes that some sources [rely on web scraping that can break](https://github.com/ImranR98/Obtainium#limitations). Obtainium also lists F-Droid, IzzyOnDroid, APKPure and Aptoide as sources. Those are third-party repositories or mirrors, so prefer the developer's own releases.

### The GrapheneOS App Store

On GrapheneOS, the [App Store](https://grapheneos.org/usage#sandboxed-google-play) is where you install the project's own apps and optional sandboxed Google Play. [Accrescent says](https://accrescent.app/) it is available there too. Android Auto [can only be installed through it](https://grapheneos.org/usage#android-auto). Use it first, and add other sources only for what it lacks.

### Aurora Store

Aurora Store lets you [search and download apps from Google Play](https://gitlab.com/AuroraOSS/AuroraStore). It does not own or host any apps. Everything comes from Google Play. You can log in with your own account or an anonymous one.

What the anonymous login does: you don't use your own Google account. GrapheneOS notes that Aurora [fetches shared account credentials from Aurora's service by default](https://grapheneos.org/usage#sandboxed-google-play). Aurora says that server [is not very reliable](https://gitlab.com/AuroraOSS/AuroraStore).

Download Aurora only from its [official website](https://auroraoss.com/), [GitLab](https://gitlab.com/AuroraOSS/AuroraStore), [IzzyOnDroid](https://apt.izzysoft.de/fdroid/index/apk/com.aurora.store) or [F-Droid](https://f-droid.org/packages/com.aurora.store/), as its README advises.

What it does not do: your requests still go to Google and the login goes through Aurora's service. It does not turn Play apps into private apps. Whatever the app itself collects stays the same. Aurora also [cannot download or update paid apps](https://gitlab.com/AuroraOSS/AuroraStore). Its [Exodus Privacy integration](https://gitlab.com/AuroraOSS/AuroraStore) shows trackers in an app before you install it.

### Direct APK downloads

An APK is the Android app file. Download it only from the developer's own site or repository, never from a search result. Android [allows an update only if its certificate matches](https://developer.android.com/studio/publish/app-signing) the installed version's, which is why a changed key is a warning sign.

On a stock Android phone, installing an APK means allowing "install unknown apps" for the app you use to open the file, and Google [warns that apps from unknown sources can put your device and personal information at risk](https://support.google.com/android/answer/9457058). Allow it only for the one app that needs it, and turn it off afterwards. Google also says that installing outside Play can [send information about those apps to Google](https://support.google.com/android/answer/9457058) through Play Protect.

**Dated note, October 2026:** Google's [Android developer verification](https://developer.android.com/developer-verification) program began protections on 30 September 2026 for apps from participating stores in Brazil, Indonesia, Singapore and Thailand on certified devices, with a global rollout planned for 2027. Google describes an [advanced flow](https://developer.android.com/developer-verification) for installing apps from unverified developers. GrapheneOS is not a certified Android device, so this should not apply to it, but other phones may be affected. Check Google's page for current rules.

---

## What to check before you install

**1. Source.** Is this the developer's official release page? Follow the link from the project's own site or repository, not a search engine.

**2. Signing key.** Many projects publish the SHA-256 fingerprint of their signing certificate. Obtainium's README, for example, [lists its own package ID and certificate hash](https://github.com/ImranR98/Obtainium#installation). On a computer, `apksigner verify --print-certs app.apk` [prints the certificate](https://developer.android.com/tools/apksigner) so you can compare it. On the phone, Privacy Guides' [Verified Apps](https://github.com/privacyguides/verified-apps-android) checks installed apps against a database of known-good fingerprints. It cannot verify itself. Its README says that on GrapheneOS the best route is to install Accrescent from the GrapheneOS App Store, then download AppVerifier from Accrescent.

**3. Key stays the same.** If the fingerprint changes between versions, stop. Android [allows an update only if the certificates match](https://developer.android.com/studio/publish/app-signing).

**4. Permissions.** Does a keyboard, flashlight or notes app ask for the network, contacts or location? Check before installing, and deny what the app does not need. F-Droid's [Anti-Feature labels](https://f-droid.org/en/docs/Anti-Features/) for tracking are a quick screen.

**5. Same app, same source.** An app installed from one source cannot be updated from another that signs it differently, because the certificates differ. F-Droid's own build of an app and the developer's build may be signed by [different keys](https://f-droid.org/en/docs/FAQ_-_App_Developers/). Pick one source per app and stay with it.

---

## Updates

Updates are your job, and each source handles them differently. Accrescent [updates unattended on Android 12 and up](https://accrescent.app/). Obtainium [notifies you when a new release appears](https://github.com/ImranR98/Obtainium). A directly downloaded APK never updates itself. Aurora Store [can ignore updates for specific apps](https://gitlab.com/AuroraOSS/AuroraStore). Using fewer sources means fewer places to forget.

---

## Apps that only exist on the Play Store

Work down this list:

1. **Look for the developer's own APK or an F-Droid listing.** Many apps publish both.
2. **Look for an alternative** in the [Default Privacy directory](/directory).
3. **Use the app's website.** Many services work in a browser.
4. **Use Aurora Store** for free apps, accepting what it does and doesn't hide above.
5. **On GrapheneOS, install sandboxed Google Play** from the App Store. It runs as an ordinary app, and GrapheneOS suggests [putting it in a separate user or work profile](https://grapheneos.org/usage#sandboxed-google-play) for apps that depend on it.

Some apps refuse systems Google has not certified. Banking apps are the common case. See the [banking section](/guides/what-still-works-after-switching-to-grapheneos) of our GrapheneOS guide and GrapheneOS's [banking apps page](https://grapheneos.org/usage#banking-apps).

---

## Private keyboards after Gboard

GrapheneOS ships without Google apps, and its built-in keyboard has historically lacked swipe typing ([GrapheneOS said so in 2023](https://grapheneos.social/@GrapheneOS/111274269511296031)), so check yours. Three options:

- **[HeliBoard](/directory/heliboard)** is open source and [does not use the internet permission](https://github.com/HeliBorg/HeliBoard), so it cannot connect to a network. Suggestions come from dictionaries you add. It has clipboard history, themes and a split keyboard. Glide (swipe) typing works only [if you add a closed-source library yourself](https://github.com/HeliBorg/HeliBoard), because none is bundled. The README says that library is Google's proprietary "swypelibs", which can be extracted from GApps packages.
- **[FUTO Keyboard](/directory/futo-keyboard)** includes [swipe typing and autocorrect](https://keyboard.futo.tech), with offline voice input via the separate [FUTO Voice Input](https://voiceinput.futo.org) add-on. It is paid: [$6.99 through FUTO Pay or $11.99 on Google Play](https://docs.keyboard.futo.org/), a one-time payment. HeliBoard and FlorisBoard are free. Its license is source-available, not open source. The [FUTO Source First License](https://github.com/futo-org/android-keyboard/blob/master/LICENSE.md) lets you modify it only for non-commercial purposes and share it only free of charge. FUTO says it is still in active development, so some languages may be missing.
- **[FlorisBoard](https://florisboard.org/)** is a free and open source keyboard that its README says is [currently in beta](https://github.com/florisboard/florisboard). It is on F-Droid. We have not verified its feature list for this guide, so check the project page before relying on it.

**What you lose.** Gboard itself, and with it Google's voice typing and swipe typing. FUTO Keyboard with its Voice Input add-on replaces both on the device, with the price and license trade-offs above. HeliBoard has no voice input of its own in its feature list and no swipe until you add the library. Language coverage varies, so check that your language is supported before you switch.

---

## FAQ

**Is it safe to install apps outside the Play Store?**

It can be, if you pick the source deliberately and check the signing key. Android [allows an update only if the certificate matches the installed one](https://developer.android.com/studio/publish/app-signing), so a later update can't swap in another publisher's build. A random APK site gives you none of that, so avoid them.

**Which source should I start with?**

On GrapheneOS, we suggest the App Store, then F-Droid for the rest. That order is our suggestion, not GrapheneOS guidance. On other phones, F-Droid, and Obtainium for apps released on GitHub or Codeberg. Follow [GrapheneOS's usage guide](https://grapheneos.org/usage) if that is your system.

**Does Aurora Store make me anonymous to Google?**

No. The anonymous login keeps your own account out of it, but the app files and requests still come from [Google Play](https://gitlab.com/AuroraOSS/AuroraStore) and the login goes through Aurora's service. It is a convenience for fetching free apps without an account.

**Is F-Droid or Accrescent more secure?**

They trust different things. F-Droid builds most apps itself and [signs them with its own keys](https://f-droid.org/en/docs/FAQ_-_App_Developers/). Accrescent [lets developers keep their own signing keys](https://accrescent.app/) but is in alpha. Neither is a reason to ignore permissions.

**Can I use more than one source?**

Yes, but install each app from one source only. Differing signatures stop one source updating an app installed by another.

**Is FUTO Keyboard open source?**

No. Its code is public, but the [license](https://github.com/futo-org/android-keyboard/blob/master/LICENSE.md) restricts modification and redistribution to non-commercial use, so it is source-available. [HeliBoard](https://github.com/HeliBorg/HeliBoard) is open source.

**Can I get swipe typing without Google?**

Yes. FUTO Keyboard includes it, for a one-time fee. HeliBoard supports it only after you add a closed-source library, which the project does not ship.

**What if an app I need only exists on the Play Store?**

Try the developer's APK, a web version, or an alternative. If none work, sandboxed Google Play on GrapheneOS runs it in a [separate profile](https://grapheneos.org/usage#sandboxed-google-play).
