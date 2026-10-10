---
title: "Where to Start With Privacy: The First 10 Changes"
slug: privacy-where-to-start
description: "New to privacy and not sure what to change first? Start with a password manager, two-step login on your email and a check for what has already leaked. Here are the first ten changes in order, and what to skip for now."
category: Privacy
difficulty: beginner
timeToComplete: "10 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - privacy for beginners
  - where to start
  - password manager
  - two-factor authentication
  - credit freeze
  - tracker blocking
  - email aliases
  - data brokers
relatedGuides:
  - how-to-build-your-threat-model
  - how-to-freeze-your-credit
  - was-my-phone-number-in-a-data-breach
  - get-a-second-phone-number
  - remove-name-from-data-brokers
  - how-to-use-ai-chatbots-privately
relatedTools:
  - name: Password check (runs in your browser)
    href: /password-check
  - name: Account breach check
    href: /breach-check
  - name: Bitwarden
    href: /directory/bitwarden
  - name: Ente Auth
    href: /directory/ente-auth
  - name: uBlock Origin
    href: /directory/ublock-origin
  - name: Signal
    href: /directory/signal
  - name: SimpleLogin
    href: /directory/simplelogin
  - name: Opt Out Prescreen
    href: /directory/opt-out-prescreen
---

**Last checked: October 2026** · Factual claims link to their source, usually a regulator, a government security agency or the company's own pages.

Start with your accounts: put your passwords in a password manager, turn on two-step login for your email, and check what has already leaked. If you live in the US, freeze your credit next. After that, work down this list one change at a time. None of it needs technical skill, and most of it costs nothing.

Where to begin without getting overwhelmed was a question beginners asked on the former Techlore privacy forum. This is our answer, in order of how much each change protects you for the effort it takes.

---

## The first ten changes

### 1. Put your passwords in a password manager

A password manager creates, stores and fills in a different strong password for every account. That is what the US Cybersecurity and Infrastructure Security Agency (CISA) [recommends](https://www.cisa.gov/secure-our-world/use-strong-passwords), with each password at least 16 characters long.

**Why it matters:** when one site leaks a password you reused, every other account with that password is open too.

[Bitwarden](/directory/bitwarden) has a free plan with unlimited passwords and devices ([Bitwarden](https://bitwarden.com/pricing/)). [Proton Pass](/directory/protonpass) is another option. [KeePassXC](/directory/keepass-xc) keeps your passwords in an encrypted file you control, with no cloud account ([KeePassXC](https://keepassxc.org/)), so back that file up yourself with Database > Save Database Backup ([KeePassXC](https://keepassxc.org/docs/KeePassXC_UserGuide#_database_backup_options)). Move your email and bank passwords in first, then the rest as you log in to each site.

Write your master password down and keep it somewhere safe at home. Bitwarden, for one, can't reset it for you ([Bitwarden](https://bitwarden.com/help/forgot-master-password/)).

To test how strong a password is, use our [password check](/password-check). It runs in your browser. Your password is never sent to our server, and the breach lookup sends only the first five characters of a scrambled (hashed) copy of it to Have I Been Pwned ([API documentation](https://haveibeenpwned.com/API/v3#PwnedPasswords)). Don't type a real password into any other site that offers to check it.

### 2. Turn on two-step login, starting with your email

Two-step login, also called two-factor or multi-factor authentication, asks for a second proof after your password, usually a short code. The Federal Trade Commission (FTC) suggests starting with your bank, credit cards, email, social media, tax filing site and payment apps ([FTC](https://consumer.ftc.gov/articles/use-two-factor-authentication-protect-your-accounts)). Do email first, because password resets for most of your other accounts go there.

Use an authenticator app where you can. The FTC says an app is safer than a text message, because someone who takes over your number with a SIM swap receives your texted codes ([FTC](https://consumer.ftc.gov/articles/use-two-factor-authentication-protect-your-accounts)). [Ente Auth](/directory/ente-auth) runs on phones and computers and keeps an end-to-end encrypted backup of your codes ([Ente](https://ente.com/auth/)). [2FAS](/directory/2fas) is another choice, and on Android, so is [Aegis](/directory/aegis-authenticator) ([Aegis](https://getaegis.app/)).

For your most important accounts, the FTC calls a hardware security key such as a [YubiKey](/directory/yubikey) the strongest option. Where a site offers a passkey, use it: passkeys are built to resist phishing ([FIDO Alliance](https://fidoalliance.org/passkeys/)).

Save each account's recovery codes somewhere safe when you set this up, so a lost phone doesn't lock you out ([Google](https://support.google.com/accounts/answer/1187538?hl=en)).

### 3. Find out what has already leaked

Our [breach check](/breach-check) walks you through checking your email address on [Have I Been Pwned](/directory/have-i-been-pwned), which tracks known data breaches ([Have I Been Pwned](https://haveibeenpwned.com/)). For each breach it lists, change that site's password, and the password anywhere else you reused it.

Your phone number may be out there too. [Was my phone number in a data breach?](/guides/was-my-phone-number-in-a-data-breach) covers how to check and what to do next.

**Why it matters:** a breach tells you which passwords other people may already have, so you know what to fix first.

### 4. Turn on automatic updates

Set your phone, computer, browser and apps to update themselves. Updates patch the security holes criminals use to get into devices, and automatic updates install as soon as they're available, with nothing for you to do ([CISA](https://www.cisa.gov/secure-our-world/update-software)). Restart when your device asks.

### 5. Freeze your credit (US)

"While a credit freeze is in place, nobody can open a new credit account in your name, including you," the FTC says. It costs nothing to place or lift, doesn't affect your credit score, and lasts until you lift it. You place it separately at Equifax, Experian and TransUnion ([FTC](https://consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts), August 2025). When you apply for credit, the FTC suggests lifting it only at the bureau that lender uses.

**Why it matters:** it is the one step on this list aimed squarely at someone opening accounts in your name. Step by step: [How to freeze your credit](/guides/how-to-freeze-your-credit).

### 6. Block trackers in your browser

- **Firefox:** Enhanced Tracking Protection is on by default. Its Standard setting blocks social media trackers, cross-site tracking cookies, cryptominers and known fingerprinters ([Mozilla](https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop)). Add [uBlock Origin](/directory/ublock-origin), which its developer says works best on Firefox ([uBlock Origin](https://github.com/gorhill/uBlock)).
- **Brave:** Shields are on for every site by default and block third-party ads, trackers and cross-site cookies ([Brave](https://brave.com/shields/)).
- **Chrome:** Google removed the last Manifest V2 extensions from the Chrome Web Store on August 31, 2026, uBlock Origin among them, and Chrome had already switched them off for every user in July 2025 ([Chrome](https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline), [uBlock Origin](https://github.com/gorhill/uBlock)). The uBlock Origin project lists [uBlock Origin Lite](https://github.com/uBlockOrigin/uBOL-home) for Chrome's newer extension format, or you can switch to [Firefox](/directory/firefox) or [Brave](/directory/brave-browser).

### 7. Turn off ad tracking and trim location access on your phone

- **iPhone ad tracking:** go to Settings > Privacy & Security > Tracking and turn off Allow Apps to Request to Track. When it asks, choose to have apps you allowed before stop tracking too. Apps then can't read your advertising identifier and are treated as if you asked them not to track you ([Apple](https://support.apple.com/en-us/102420)).
- **Android ad tracking:** go to Settings > Privacy > Ads and tap Delete Advertising ID. Apps that ask for it then get a string of zeros. Older Android versions use a different menu ([Google](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en)).
- **Location:** on iPhone, check Settings > Privacy & Security > Location Services ([Apple](https://support.apple.com/en-us/102515)). On Android, go to Settings > Security & privacy > Privacy > Permission manager > Location ([Google](https://support.google.com/android/answer/9431959?hl=en)). Set each app to "while using" or off unless it truly needs your location in the background.

**Why it matters:** Apple describes this kind of tracking as following your activity "across other companies' apps and websites for the purposes of advertising or sharing with data brokers" ([Apple](https://support.apple.com/en-us/102420)).

### 8. Keep private conversations private

Move personal chats to [Signal](/directory/signal). Messages and calls are end-to-end encrypted, and Signal says it can't read your messages or listen to your calls ([Signal](https://signal.org/)). Start with the few people you talk to most.

Treat an AI chatbot with the same care. What you type goes to the company that runs it, so check whether your chats train its models and turn that off if you can. Anthropic, for example, may keep Claude chats for up to five years if you let it train on them. If you don't, a chat you delete is removed from its back-end storage within 30 days, unless its safety systems flagged it ([Anthropic](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)). [How to use AI chatbots privately](/guides/how-to-use-ai-chatbots-privately) covers the settings.

### 9. Stop handing out your real email address and phone number

Use an email alias for shopping, newsletters and sign-ups: a separate address that forwards mail to your real inbox ([SimpleLogin](https://simplelogin.io/)). Give each site its own alias. If one starts getting spam, you'll know which site it came from and can switch that alias off ([addy.io](https://addy.io/)). [SimpleLogin](/directory/simplelogin), [addy.io](/directory/addy) and [Firefox Relay](/directory/firefox-private-relay) all do this. If you use Sign in with Apple, choose Hide My Email and Apple creates a unique forwarding address for that app ([Apple](https://support.apple.com/en-us/105078)).

Your phone number is harder to replace than an email alias, so save it for people and services you trust. [Get a second phone number](/guides/get-a-second-phone-number) covers the options for everything else.

### 10. Get off data broker lists and stop prescreened offers

- **Prescreened offers:** opt out of "preapproved" credit and insurance mail at [OptOutPrescreen](/directory/opt-out-prescreen) or 1-888-567-8688. That covers five years, and signing and mailing the Permanent Opt-Out Election form makes it permanent. The major credit bureaus run the site and phone line ([FTC](https://consumer.ftc.gov/articles/what-know-about-prescreened-offers-credit-and-insurance)).
- **People-search sites:** work through them with [How to remove your name from data broker sites](/guides/remove-name-from-data-brokers).
- **In California:** the state's Delete Request and Opt-out Platform (DROP) lets residents send one free deletion request to every registered data broker. Brokers had to start processing requests on August 1, 2026, and status updates can take up to 90 days ([CalPrivacy](https://privacy.ca.gov/drop/)).

---

## What to skip for now

- **A VPN as your first purchase.** A VPN hides your browsing from your internet provider and shows it to the VPN company instead. The Electronic Frontier Foundation (EFF) says a VPN "is not a tool for anonymity" and that companies have many other ways to track you ([EFF Surveillance Self-Defense](https://ssd.eff.org/module/choosing-vpn-thats-right-you), reviewed July 2026). Steps 1 to 7 come first.
- **Switching your phone's operating system.** [GrapheneOS](/directory/grapheneos) can be worth it later. Installing it wipes the phone ([GrapheneOS](https://grapheneos.org/install/web)), and Google Wallet tap-to-pay stops working on a custom operating system ([Google Wallet Help](https://support.google.com/wallet/answer/12200245?hl=en)). [What still works after switching to GrapheneOS](/guides/what-still-works-after-switching-to-grapheneos) covers the trade-offs.
- **Running your own servers.** Hosting your own email, cloud storage or VPN makes its updates, backups and security your job. It's a poor first project.
- **Paying before you've done the free steps.** A credit freeze costs nothing ([FTC](https://consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts)), and so does DROP for Californians ([CalPrivacy](https://privacy.ca.gov/drop/)). Do those first, then decide whether a paid removal or monitoring service adds anything for you.
- **Changing everything in one weekend.** One change a week is plenty. A setup you keep using beats a perfect one you abandon.

---

## When the basics are done

Decide what you're protecting and from whom. [How to build your threat model](/guides/how-to-build-your-threat-model) shows which of the harder steps are worth it for you. If your home address is the worry, read [How to keep your home address off public records](/guides/keep-home-address-off-public-records).

To ask questions as you go, [connect your AI assistant to our directory](/ai). It's free and needs no account.

---

## FAQ

**I'm overwhelmed. If I only do one thing, what should it be?**

Give your email account a unique password from a password manager and turn on two-step login. Password resets for most of your other accounts go to your email, so protecting it protects them. CISA recommends a password manager and a different strong password for every account ([CISA](https://www.cisa.gov/secure-our-world/use-strong-passwords)).

**Do I need a VPN to be private online?**

Not to start. A VPN moves what your internet provider can see to the VPN company, and the EFF says it "is not a tool for anonymity" ([EFF](https://ssd.eff.org/module/choosing-vpn-thats-right-you)). Do the first ten changes above, then decide whether you want one.

**Is it safe to type my password into a password checker?**

Only ours. Our [password check](/password-check) runs in your browser, never sends your password to our server, and its breach lookup sends only the first five characters of a hashed copy ([API documentation](https://haveibeenpwned.com/API/v3#PwnedPasswords)). You usually can't tell what another site does with what you type, so don't use one.

**Is a free password manager good enough?**

For most people, yes. Bitwarden's free plan includes unlimited passwords and devices ([Bitwarden](https://bitwarden.com/pricing/)), and KeePassXC is free and open source ([KeePassXC](https://keepassxc.org/)).

**Is a texted code good enough for two-step login?**

Turn it on wherever it's the only choice. CISA lists a code by text as a form of two-step login ([CISA](https://www.cisa.gov/secure-our-world/turn-mfa)). Where you can, use an authenticator app: the FTC says it's safer because a SIM swap can't intercept it ([FTC](https://consumer.ftc.gov/articles/use-two-factor-authentication-protect-your-accounts)).

**Does freezing my credit hurt my credit score?**

No. A freeze doesn't affect your score, costs nothing to place or lift, and lasts until you lift it ([FTC](https://consumer.ftc.gov/articles/what-know-about-credit-freezes-fraud-alerts)).

**I don't live in the US. Which steps apply to me?**

The credit freeze, OptOutPrescreen and DROP are US programs. The other changes, from password managers and two-step login to tracker blocking, phone settings, Signal and email aliases, work anywhere.
