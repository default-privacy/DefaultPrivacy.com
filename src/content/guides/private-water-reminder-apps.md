---
title: "A Private Way to Get Reminded to Drink Water"
slug: private-water-reminder-apps
description: "The most private water reminder is the Reminders or Clock app already on your phone. If you want an app, open-source ones on F-Droid say they need no account and no tracking. Here is why health apps are a privacy problem and how to check any app before you install it."
category: Privacy
difficulty: beginner
timeToComplete: "6 minutes"
publishedAt: "2026-10-21"
updatedAt: "2026-10-21"
author: Default Privacy
tags:
  - water reminder app
  - drink water reminder
  - private habit tracker
  - health app privacy
  - open source android apps
  - f-droid
  - app trackers
  - exodus privacy
relatedGuides:
  - apps-without-the-google-play-store
  - privacy-where-to-start
  - turn-off-ai-on-your-phone
relatedTools:
  - name: F-Droid
    href: /directory/f-droid
---

**Last checked: October 2026** · Each claim links to the app's own page, a regulator or the vendor's help pages. General information, not legal advice.

The most private water reminder is a repeating reminder or alarm in the app that came with your phone. It needs no new app and no account. If you want a tracker with a progress ring, some open-source apps on F-Droid say they have no account, no ads and no tracking. Check that claim before you trust it, using the steps below.

---

## Why a water app is worth a second look

Health and habit apps hold things you may not want sold: your routine, your body and sometimes your medical details. US regulators have gone after health apps for passing that data on.

- **Flo Health**, a period and fertility tracker, settled with the FTC in 2021. The FTC's headline says the app "Shared Sensitive Health Data with Facebook, Google, and Others", and the order requires Flo to get users' consent before sharing their health data ([FTC, June 2021](https://www.ftc.gov/news-events/news/press-releases/2021/06/ftc-finalizes-order-flo-health-fertility-tracking-app-shared-sensitive-health-data-facebook-google)).
- **GoodRx**, a prescription discount app, agreed to pay a $1.5 million civil penalty for failing to report its unauthorized disclosure of health data to Facebook, Google and other companies, under an order the FTC proposed in 2023 ([FTC, February 2023](https://www.ftc.gov/news-events/news/press-releases/2023/02/ftc-enforcement-action-bar-goodrx-sharing-consumers-sensitive-health-info-advertising)).
- **BetterHelp**, an online counseling service, was ordered to pay $7.8 million. The FTC said it shared sensitive health data with third parties such as Facebook and Snapchat for advertising after promising to keep it private ([FTC, July 2023](https://www.ftc.gov/news-events/news/press-releases/2023/07/ftc-gives-final-approval-order-banning-betterhelp-sharing-sensitive-health-data-advertising)).

A water log is far less sensitive than those. The lesson is smaller: a free app with an account and ad tools can send your habits somewhere, and you rarely see it happen.

---

## Option 1: no app at all (the most private)

Your phone can already nag you every day.

- **iPhone.** In Reminders, open a reminder's details, turn on Date or Time, tap Repeat, then choose how often ([Apple Support](https://support.apple.com/guide/iphone/add-details-iphec7a1de82/ios)). Add one per time of day you want a nudge.
- **Android.** In the Clock app, set an alarm for each time of day and set it to repeat. Menus differ between phone makers ([Android Help](https://support.google.com/android/answer/2840926?hl=en)). Name the alarm "Water".

The limit: these apps don't log how much you drank, and they only remind you at the times you pick. If your phone backs up to a cloud, the reminders may be backed up too. Check your backup settings if that matters to you.

---

## Option 2: an open-source app from F-Droid

[F-Droid](/directory/f-droid) is an app store for Android that lists only open-source apps. Two water apps there that say they stay on your phone:

- **Drink Water!** Its page says "No accounts, no cloud, no ads, no tracking" and "nothing sent off your phone." It needs Android 12 or newer and is MIT licensed, and the permissions listed are notifications, running at startup, scheduling timed actions, a foreground service and keeping the phone awake. No internet permission is listed ([F-Droid](https://f-droid.org/en/packages/com.jjrapps.bebeagua/)).
- **FillMeUp!** (formerly Water Reminder) says "No ads, no tracking, no internet required" and is AGPL-3.0 licensed. The listed permissions are notifications, running at startup, scheduling timed actions and scheduling alarms. Unlike the other two apps here, F-Droid says this build is signed by the developer, not by F-Droid ([F-Droid](https://f-droid.org/en/packages/com.david.waterreminder/)). The code is on [Codeberg](https://codeberg.org/DavidCRicardo/FillMeUp).

If you want a general habit tracker, Loop Habit Tracker is a long-running one (last F-Droid release August 2025). Its README says it "doesn't require an Internet connection or online account registration" and is GPLv3 ([README](https://github.com/iSoron/uhabits/blob/dev/README.md), [F-Droid](https://f-droid.org/en/packages/org.isoron.uhabits/)).

The limits: these are small projects, and "open source" means anyone can read the code, not that anyone has audited it. These are the developers' own claims, backed by the permission lists. We did not audit the code. iPhone users have no F-Droid, so for iOS the built-in option above is the simplest.

---

## How to check any app before you install it

1. **Look at the permissions.** A water reminder needs notifications. It does not need your contacts, location or internet. On F-Droid the permissions are listed on each app's page.
2. **Look for an account.** If it asks you to sign up to log a glass of water, it is collecting something.
3. **Run it through Exodus Privacy.** Exodus is a French non-profit. It publishes reports on the trackers and permissions inside Android apps ([Exodus on F-Droid](https://f-droid.org/packages/org.eu.exodus_privacy.exodusprivacy/)). Search for the app on [reports.exodus-privacy.eu.org](https://reports.exodus-privacy.eu.org/) and read the tracker count. It only has reports for apps it has analysed, so a small F-Droid app may have none. No tool catches everything, so treat zero trackers as a good sign, not proof.
4. **Check F-Droid's labels.** F-Droid marks apps with a "Tracking" Anti-Feature when an app "tracks and/or reports your activity to somewhere" ([F-Droid docs](https://f-droid.org/en/docs/Anti-Features/)).

---

## FAQ

**Is there a private water reminder app?**

Yes. On Android, Drink Water! and FillMeUp! on F-Droid both say they have no tracking and no account ([Drink Water!](https://f-droid.org/en/packages/com.jjrapps.bebeagua/), [FillMeUp!](https://f-droid.org/en/packages/com.david.waterreminder/)). On any phone, a repeating reminder in the built-in app needs nothing new.

**Are free water reminder apps safe?**

Some are fine and some are not. A free app with ads often includes ad or analytics tools, and Exodus Privacy reports show which ones ([Exodus](https://f-droid.org/packages/org.eu.exodus_privacy.exodusprivacy/)). The FTC cases above involved health apps that shared data with Facebook, Google and others ([FTC](https://www.ftc.gov/news-events/news/press-releases/2023/07/ftc-gives-final-approval-order-banning-betterhelp-sharing-sensitive-health-data-advertising)).

**Do I need an account to track water?**

No. The apps above work without one. If an app insists on an account for a simple log, pick another.

**What if I use an iPhone?**

F-Droid is Android only. Use the built-in Reminders app with the Repeat option ([Apple Support](https://support.apple.com/guide/iphone/add-details-iphec7a1de82/ios)).

---

## Keep reading

- [Apps without the Google Play Store](/guides/apps-without-the-google-play-store)
- [Privacy: where to start](/guides/privacy-where-to-start)
- [Turn off AI on your phone](/guides/turn-off-ai-on-your-phone)
