---
title: "How to Move Your 2FA Codes to a New App or Phone Without Getting Locked Out"
slug: move-2fa-codes-to-a-new-app-or-phone
description: "Two-factor codes live inside one app on one phone, so a lost phone can lock you out of accounts. Here is how to move your codes safely: save recovery codes first, export and import or re-enroll each site, test, then delete the old copy. Covers Google Authenticator, Aegis, 2FAS, Ente Auth, Proton Authenticator and Bitwarden."
category: Privacy
difficulty: beginner
timeToComplete: "30 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - 2fa
  - two-factor authentication
  - authenticator app
  - totp
  - recovery codes
  - aegis
  - 2fas
  - ente auth
  - proton authenticator
  - google authenticator
relatedGuides:
  - bitwarden-vs-proton-pass
  - privacy-where-to-start
  - how-to-build-your-threat-model
relatedTools:
  - name: Aegis Authenticator
    href: /directory/aegis-authenticator
  - name: 2FAS
    href: /directory/2fas
  - name: Ente Auth
    href: /directory/ente-auth
  - name: Proton Authenticator
    href: /directory/proton-authenticator
  - name: Bitwarden Authenticator
    href: /directory/bitwarden-authenticator
  - name: Bitwarden
    href: /directory/bitwarden
  - name: Proton Pass
    href: /directory/protonpass
---

**Last checked: October 2026** · Each claim links to the app's or site's own documentation. Menus change between versions, so follow the app's current instructions for the exact taps.

The safe order is: save a recovery code for every account, move your codes to the new app, test a login on each site, and only then delete the old copy. Most lockouts happen because someone wiped the old phone before the new app was proven to work.

This guide is for apps that make six-digit codes (TOTP apps). It does not cover text-message codes or hardware keys.

---

## Why codes get lost

An authenticator app holds a secret for each account. If that app is wiped, lost or reset, the secrets go with it, and the site will ask for a code you can no longer make. Moving or losing codes was a recurring question on the former Techlore privacy forum.

Two things protect you: a recovery code for every account, and a copy of your authenticator data in a place you control.

---

## Step 1: Save recovery codes first

Most sites let you create one-time recovery or backup codes when you turn on two-factor login. They are the way back in if you lose your phone.

- **Google** gives you a set of 10 backup codes. Each code works once, and creating a new set makes the old set stop working. Google suggests printing them and keeping them somewhere safe like your passport. They can't be downloaded if you are in its Advanced Protection Program ([Google Account Help](https://support.google.com/accounts/answer/1187538)).
- **GitHub** lets you download a recovery codes file at any time after you enable two-factor login. It recommends saving the codes in a secure password manager and not sharing them ([GitHub Docs](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods)).

Do this for your email, your password manager, your phone account and anything with money in it first. Store the codes apart from the phone, such as in a password manager or on paper in a safe place. A recovery code kept only inside the authenticator app is no use when the app is gone.

---

## Step 2: Pick where the codes will live

Choose an app that can export your codes, so you are never stuck again. These are the common choices:

| App | Platforms | What its own pages say |
|---|---|---|
| [Aegis Authenticator](/directory/aegis-authenticator) | Android | Open source (GPL-3.0). Vault is encrypted with AES-256-GCM and unlocks with a password or biometrics. Exports as plaintext or encrypted, and can make automatic backups to a location you choose ([Aegis on GitHub](https://github.com/beemdevelopment/Aegis)) |
| [2FAS](/directory/2fas) | iPhone, Android | No account needed, works offline, cloud and manual backup, open source and source available ([2FAS](https://2fas.com/)) |
| [Ente Auth](/directory/ente-auth) | Phone, desktop, web | Open source. Offers end-to-end encrypted cloud backups and sync, and can also be used offline without an account. Imports from other apps in bulk and exports your data ([Ente Auth](https://ente.io/auth/)) |
| [Proton Authenticator](/directory/proton-authenticator) | Android, Apple devices | Imports from several apps. Syncing between devices needs a Proton account, or iCloud on Apple devices ([Proton Support](https://proton.me/support/sync-2fa-codes)) |
| [Bitwarden Authenticator](/directory/bitwarden-authenticator) | See Bitwarden | Has its own import and export page ([Bitwarden Help](https://bitwarden.com/help/authenticator-import-export/)) |
| Google Authenticator | Phone | Syncs codes to your Google Account when you sign in, or transfers them by QR code ([Google Account Help](https://support.google.com/accounts/answer/1066447)) |

Which one is right depends on whether you want your codes synced through a company's servers, kept only on the phone, or inside a password manager. See [Bitwarden vs Proton Pass](/guides/bitwarden-vs-proton-pass) if you are weighing the password-manager route.

**A tradeoff to know about:** if your password manager also makes your codes, one stolen vault gives an attacker both the password and the second factor. A separate authenticator app keeps them apart. That is a design choice for your own risk, not a rule.

---

## Step 3: Move the codes

There are two routes. Use the first where it works, and the second for anything it misses.

### Route A: Export from the old app, import into the new one

Many apps can import each other's files. Aegis lists these as import sources: 2FAS, Authenticator Plus, Authy, andOTP, FreeOTP, FreeOTP+, Google Authenticator, Microsoft Authenticator, Steam, TOTP Authenticator and WinAuth. It says root access is required for some of them ([Aegis on GitHub](https://github.com/beemdevelopment/Aegis)). Proton Authenticator imports from 2FAS, Aegis, Bitwarden Authenticator, Ente Auth, Google Authenticator, LastPass Authenticator, Proton Authenticator and Proton Pass ([Proton Support](https://proton.me/support/import-2fa-codes)).

Google Authenticator does it with a QR code. On the old phone open the menu, choose Transfer codes, then Export codes, and pick the accounts. If you pick more than one, the app may make more than one QR code. On the new phone choose Import codes and scan each one ([Google Account Help](https://support.google.com/accounts/answer/1066447)).

Two cautions:

- **An export file is a set of master keys.** Aegis can export in plaintext, which means anyone who gets the file can generate your codes. Choose the encrypted export where there is one, and delete the file when you are done.
- **A QR code export on screen is the same thing.** Scan it somewhere private and don't photograph it.

### Route B: Re-enroll each account

If your old app can't export, Proton's own advice is to delete the codes and create new ones in the new app ([Proton Support](https://proton.me/support/import-2fa-codes)). In practice that means, for each account:

1. Log in to the site while the old app still works.
2. Open its security settings and turn two-factor login off, or choose "change authenticator" if it offers it.
3. Turn it back on and scan the new QR code with the new app.
4. Save the new recovery codes the site gives you. They replace the old ones.

Route B is tedious but safe, and it gives each account a fresh secret. Do your most important accounts first.

---

## Step 4: Test before you delete anything

For each account, log out and log back in using a code from the **new** app. Don't trust that it worked because the code looked right.

Keep the old phone, with the old app intact, until every account has passed. A factory reset is the last step, not the first.

---

## Step 5: Back up the new app

A new app with no backup is the same trap again. Pick one way to back up and check that it works:

- **Aegis:** it can make automatic backups of the vault to a location you choose ([Aegis on GitHub](https://github.com/beemdevelopment/Aegis)).
- **Proton Authenticator:** on Apple devices your data is periodically saved to iCloud, and on Android you choose the location and how often. Turn backups on under Settings in the Security section ([Proton Support](https://proton.me/support/back-up-2fa-codes)).
- **Ente Auth and 2FAS:** both describe cloud backup, and 2FAS also lists manual backup ([Ente Auth](https://ente.io/auth/); [2FAS](https://2fas.com/)).

Store an encrypted backup somewhere other than the phone: another device, a drive or your password manager's file storage. Remember its password, because a backup you can't open is worth nothing.

---

## If you already lost the phone

1. **Use a recovery code** if you saved one for that account. It is built for this.
2. **No code? Use the site's account recovery.** Each site has its own process. Expect it to take time, and expect to prove who you are.
3. **Start with your email.** If you control your email, you can often get back into everything else. If your email's two-factor login is the one you lost, that is the first account to recover.

We can't recover an account for you. Only the site that holds it can.

---

## FAQ

**Can I just take a screenshot of the QR codes?**

You can, but a screenshot of a QR code is a copy of the master key for that account, and it lives in your photo library and any cloud backup of it. If you keep one, treat it like a password. A better option is an encrypted export from the app.

**Are text-message codes easier to move?**

Yes, they follow your phone number, not an app, so a new phone with the same number keeps receiving them. The tradeoff is that your number becomes part of your security. Our guide on [phone numbers in data breaches](/guides/was-my-phone-number-in-a-data-breach) covers the number side.

**Is it safe to sync my codes to the cloud?**

It depends on who holds the key. Ente Auth describes its backups as end-to-end encrypted ([Ente Auth](https://ente.io/auth/)). Google Authenticator syncs codes to your Google Account when you sign in ([Google Account Help](https://support.google.com/accounts/answer/1066447)). If you don't want any company to hold a copy, choose an app that works offline, like Aegis or 2FAS, and make your own encrypted backups.

**What if my app is no longer updated?**

Move off it while it still works. An abandoned authenticator can't be repaired once the phone or OS it runs on stops working. Export first, import into an app that is being maintained, and test.

**What if a site won't let me change my authenticator?**

Look for "recovery" or "reset two-factor" in its help pages, or contact support while you still have a working code. Do not wipe your old app until you have an answer.

**Should I use a hardware key instead?**

A hardware key is a good second factor and many sites support one. It is a separate topic, and you still need recovery codes and a second key in case one is lost. See [how to build your threat model](/guides/how-to-build-your-threat-model) to decide how much protection you need.
