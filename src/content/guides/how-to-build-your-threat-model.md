---
title: "How to Build Your Threat Model (Without the Jargon)"
slug: how-to-build-your-threat-model
description: "A threat model is a short list of answers: what you want to protect, from whom, how likely and how bad a problem would be, and how much effort you will spend. Here are the questions, four worked examples, and how the answers change which tools matter."
category: Privacy
difficulty: beginner
timeToComplete: "15 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - threat model
  - threat modeling
  - security plan
  - privacy basics
  - surveillance self-defense
  - domestic abuse
  - journalists
  - online tracking
  - crypto security
relatedGuides:
  - privacy-where-to-start
  - remove-name-from-data-brokers
  - keep-home-address-off-public-records
relatedTools:
  - name: Surveillance Self-Defense
    href: /directory/surveillance-self-defense
  - name: Consumer Reports Security Planner
    href: /directory/consumer-reports-security-planner
  - name: Bitwarden
    href: /directory/bitwarden
  - name: Signal
    href: /directory/signal
  - name: Privacy Badger
    href: /directory/privacy-badger
  - name: SimpleLogin
    href: /directory/simplelogin
  - name: YubiKey
    href: /directory/yubikey
  - name: Trezor
    href: /directory/trezor
  - name: SecureDrop
    href: /directory/securedrop
  - name: Account breach check
    href: /breach-check
---

**Last checked: October 2026** · Each claim links to its source: EFF, CISA, the FBI, the FTC, the Committee to Protect Journalists, survivor-safety organizations, state agencies, or the named organization's or product's own pages.

A threat model is your written answer to a few plain questions: what you want to protect, who you want to protect it from, how likely a problem is, how bad it would be, and how much effort you're willing to spend. The answers tell you which privacy tools matter for you and which you can skip. It takes about fifteen minutes, and your answers won't match anyone else's.

Which browser and which phone to use were among the most asked questions on the former Techlore privacy forum. Both have the same honest answer: it depends on what you're protecting, and from whom. This guide shows you how to work that out.

---

## The questions

The best-known version comes from the Electronic Frontier Foundation's [Surveillance Self-Defense](/directory/surveillance-self-defense) guide. Its module [Your Security Plan](https://ssd.eff.org/module/your-security-plan) (last reviewed October 27, 2023) asks six questions. Here they are in plain words, with what to write down for each.

### 1. What do I want to protect?

EFF calls these your assets. Usually they're information, such as "your emails, contact lists, direct messages, location, or other documents," and sometimes the devices themselves ([EFF](https://ssd.eff.org/module/your-security-plan)). List them. For each one, note where it's kept and who can already get to it.

Typical answers: your home address, where you are, who you talk to, your money and the accounts that move it, photos, health information, what you browse and buy.

### 2. Who do I want to protect it from?

EFF calls these adversaries. Its examples are "your boss, law enforcement, your former partner, your business competition, your government, or a hacker on a public network," plus trusted people who might be careless with their own security ([EFF](https://ssd.eff.org/module/your-security-plan)).

Name real ones. "Hackers" is too vague to plan against. "A scammer who phishes my email password" is something you can act on.

### 3. How likely is it?

EFF calls this risk: "the likelihood that a particular threat against a particular asset will actually occur." A threat is something that could happen. Risk is how probable it is. EFF's example: a building could collapse anywhere, but the risk is far greater in San Francisco, where earthquakes are common, than in Stockholm ([EFF](https://ssd.eff.org/module/your-security-plan)).

Weigh capability against motive. EFF points out that your phone company can see all your phone records, yet the risk that it posts them online to harm your reputation is low ([EFF](https://ssd.eff.org/module/your-security-plan)).

CISA says online criminals "look for easy targets, like people who don't take basic precautions," and its four basic steps cover phishing, weak passwords, accounts protected by a password alone, and out-of-date software ([CISA Secure Our World](https://www.cisa.gov/secure-our-world)).

### 4. How bad would it be?

EFF suggests you "write down what your adversary might want to do with your private data" ([EFF](https://ssd.eff.org/module/your-security-plan)). The same piece of information can be minor for one person and dangerous for another. A leaked shopping history means more ads. A leaked new address, for someone who has left a violent partner, is a safety problem.

### 5. How much trouble am I willing to go through?

"There is no perfect option for security," EFF says. People have different priorities and resources, so you balance "convenience, cost, and privacy" ([EFF](https://ssd.eff.org/module/your-security-plan)). Write down your limits: money, time, technical skill, and the people in your life who won't change apps.

### 6. Who are my allies?

Your privacy overlaps with the people you live, work and talk with. A threat to them can reach you, and the reverse. EFF suggests agreeing with them what you share and how, and it warns about the "insider threat," someone in your trusted circle who could betray your security ([EFF](https://ssd.eff.org/module/your-security-plan)).

### Write it on one page

- **Protecting:**
- **From:**
- **How likely:** high, medium or low
- **How bad:** minor, serious or dangerous
- **What I will do, and what I won't:**
- **Who I'm doing this with:**
- **Review date:**

EFF says your plan "can change as your situation changes" and suggests marking a date on your calendar to review it ([EFF](https://ssd.eff.org/module/your-security-plan)). It also notes that, depending on who your adversaries are, the list itself might be something to destroy when you're done. If someone else can reach your notes or devices, keep it somewhere they can't.

Software teams use a four-question version from the [Threat Modeling Manifesto](https://www.threatmodelingmanifesto.org/): "What are we working on? What can go wrong? What are we going to do about it? Did we do a good enough job?" It's the same idea.

If you'd rather answer questions on a screen, Consumer Reports' [Security Planner](/directory/consumer-reports-security-planner) asks a few questions and builds a free, customized plan ([Security Planner](https://securityplanner.consumerreports.org/)).

---

## Four worked examples

Each example answers the questions briefly, then shows what that means for tools.

### Someone leaving an abusive partner

**Safety comes before settings.** In the US, the National Domestic Violence Hotline is free, confidential and open 24/7: call 800-799-7233, text START to 88788, or chat with an advocate on its site ([The Hotline](https://www.thehotline.org/)). Outside the US, the Coalition Against Stalkerware lists support organizations by country ([Coalition Against Stalkerware](https://stopstalkerware.org/resources/)). Advocates can help you build a personal safety plan. Privacy steps support that plan. They can't replace it.

- **Protecting:** your location, a new address, your messages and searches, your accounts.
- **From:** one known person. Safety Net, a project of the National Network to End Domestic Violence, notes that someone who seems to know too much may be monitoring your devices, getting into your accounts, tracking your location or searching for you online ([Safety Net](https://www.techsafety.org/resources-survivors/technology-safety-plan)).
- **How likely:** high. They know you and they're motivated.
- **How bad:** possibly physical harm.
- **Effort:** whatever keeps you safe, at a pace that doesn't alert them.

**What that means for tools.** The adversary is close, so the order of your steps matters more than which apps you pick.

1. **Use a safer device.** Safety Net suggests a device the person "hasn't had physical or remote access to" ([Safety Net](https://www.techsafety.org/resources-survivors/technology-safety-plan)). Anyone monitoring your phone "would be able to see any searches for help or resources" ([Coalition Against Stalkerware](https://stopstalkerware.org/information-for-survivors/)), and the Hotline warns that internet use "can be monitored and is impossible to erase completely" ([The Hotline](https://www.thehotline.org/)).
2. **Plan changes before you make them.** Some abusers "may escalate their controlling and dangerous behavior if they feel they've lost access" ([Safety Net](https://www.techsafety.org/resources-survivors/technology-safety-plan)). Removing stalkerware or making big changes "may be detected by the abuser and could increase the abuse and harassment," and deleting stalkerware also deletes evidence of it ([Coalition Against Stalkerware](https://stopstalkerware.org/information-for-survivors/)). Work out the timing with an advocate.
3. **Review what you share.** On an iPhone with iOS 16 or later, Safety Check (Settings > Privacy & Security > Safety Check) lets you review and stop sharing with people and apps, and every screen has a Quick Exit button. Apple's guide says to "consider potential impacts to your safety and privacy" before you change anything ([Apple](https://support.apple.com/guide/personal-safety/safety-check-iphone-ios-16-ips2aad835e1/web)).
4. **Keep a new address off government records.** Some states run address confidentiality programs that give survivors a substitute address. California's Safe at Home and Washington's Address Confidentiality Program both say they work best as part of a safety plan ([California](https://www.sos.ca.gov/registries/safe-home), [Washington](https://www.sos.wa.gov/statewide-programs/address-confidentiality-program-acp)). For the rest of the address trail, see [Keep your home address off public records](/guides/keep-home-address-off-public-records).

A VPN or a new phone operating system does little while someone still has access to your accounts. The [Digital Safety Kit for Stalking and Abuse Survivors](/stacks/stalking-abuse-survivor-safety-kit) goes through account and device steps in order.

### A journalist

- **Protecting:** sources' identities, unpublished material, who you talk to.
- **From:** the people and organizations you report on, online harassers, and legal demands for records.
- **How likely:** it depends on the beat. The Committee to Protect Journalists (CPJ) encourages journalists "to complete a risk assessment before starting their assignments" ([CPJ Digital Safety Kit](https://cpj.org/2019/07/digital-safety-kit-journalists/), updated February 20, 2026).
- **How bad:** an exposed source carries the cost, and they trusted you.
- **Effort:** high for sensitive stories, ordinary for the rest.

**What that means for tools.** Who you talk to can matter as much as what you say. CPJ explains that metadata, such as phone numbers, time stamps and call length, "can be used to create a picture of who you communicate with," and that it "is often not encrypted and can be subpoenaed by law enforcement" ([CPJ](https://cpj.org/2019/07/digital-safety-kit-journalists/)).

- **[Signal](/directory/signal)** with a username, so you give out the username instead of your phone number, plus a registration lock ([CPJ](https://cpj.org/2019/07/digital-safety-kit-journalists/)).
- **A security key** such as [YubiKey](/directory/yubikey), which CPJ suggests for people at high risk of hacking ([CPJ](https://cpj.org/2019/07/digital-safety-kit-journalists/)).
- **[SecureDrop](/directory/securedrop)**, an open-source system that media organizations and NGOs can install "to securely accept documents from anonymous sources" ([SecureDrop](https://securedrop.org/)).
- **[Dangerzone](/directory/dangerzone)**, a free tool from Freedom of the Press Foundation that converts "potentially dangerous PDFs, office documents, or images" into safe PDFs ([Dangerzone](https://dangerzone.rocks/)).

Travel is its own risk. CPJ's kit says to assume your devices "could be subject to the same level of scrutiny as notebooks and printed material in your luggage," and to get advice from your employer or a lawyer if you might be stopped at a border ([CPJ](https://cpj.org/2019/07/digital-safety-kit-journalists/)). The [Journalist's Privacy Stack](/stacks/journalist-privacy-stack) covers the full setup.

### A shopper tired of being tracked

- **Protecting:** what you browse and buy, your email address, phone number and card numbers.
- **From:** advertisers, data brokers, and whoever breaches the next store's customer list.
- **How likely:** high. Run any shop through our [privacy scanner](/scanner) to see the trackers and cookies it loads.
- **How bad:** usually more ads and more spam. After a breach, phishing or card fraud.
- **Effort:** low. You want settings you change once.

**What that means for tools.** You don't need anything elaborate. You need fewer copies of your data in fewer places.

- **Block trackers in the browser.** [Privacy Badger](/directory/privacy-badger), from EFF, learns to block trackers by how they behave and sends the Global Privacy Control signal ([Privacy Badger](https://privacybadger.org/)). [uBlock Origin](/directory/ublock-origin) blocks ads and trackers; its developer says it works best on [Firefox](/directory/firefox), and it is no longer in Chrome's extension store ([uBlock Origin](https://github.com/gorhill/uBlock)).
- **Send an opt-out automatically.** California residents can opt out of the sale or sharing of their data "via the GPC" ([California Attorney General](https://oag.ca.gov/privacy/ccpa)), and the [Global Privacy Control](/directory/global-privacy-control) project says other state privacy laws require it too ([GPC](https://globalprivacycontrol.org/)).
- **Stop app tracking on iPhone.** Turn off Allow Apps to Request to Track in Settings > Privacy & Security > Tracking. Apps that ask are treated as if you tapped Ask App Not to Track, which blocks the advertising identifier ([Apple](https://support.apple.com/en-us/102420)).
- **Hand out aliases.** [SimpleLogin](/directory/simplelogin) and [Addy](/directory/addy) give each site its own address that forwards to your inbox, and you can switch one off if it leaks ([SimpleLogin](https://simplelogin.io/), [SimpleLogin docs](https://simplelogin.io/docs/getting-started/delete-alias/), [Addy](https://addy.io/)). In the US, [Privacy.com](/directory/privacy-com) offers merchant-locked virtual cards ([Privacy.com](https://www.privacy.com/)).
- **Clear out the brokers.** Work through [Remove your name from data brokers](/guides/remove-name-from-data-brokers).

Tor, a new phone operating system and self-hosting can wait. They solve problems this person doesn't have yet.

### A crypto holder

- **Protecting:** your funds, the keys and accounts that control them, and the link between your name and what you hold.
- **From:** scammers, phishers, SIM swappers, and anyone who learns what you hold.
- **How likely:** scams are common. In 2025, people reported more than $11.3 billion in cryptocurrency-related losses to the FBI's Internet Crime Complaint Center, $7.2 billion of it from investment fraud ([FBI IC3 2025 report](https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf)).
- **How bad:** usually permanent. Crypto payments "typically are not reversible" and lack the legal protections credit and debit cards have ([FTC, May 2022](https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams)).
- **Effort:** high for your keys, modest everywhere else.

**What that means for tools.**

- **Guard the recovery phrase, and keep a backup.** "Never share your wallet backup (recovery seed) with anyone," never make digital copies of it, and store it "in a safe and secure location." If a message asks for it, assume it's a scam ([Trezor](https://trezor.io/learn/security-privacy/personal-security-standards/scams-and-phishing)). Bitcoin.org says a backup kept in a safe place "can protect you against computer failures and many human mistakes," and that, unlike your bank, there are "very limited password recovery options" ([Bitcoin.org](https://bitcoin.org/en/secure-your-wallet)).
- **Keep savings offline.** Bitcoin.org suggests keeping only small amounts on a phone or computer for everyday use, and says an offline wallet "provides the highest level of security for savings" ([Bitcoin.org](https://bitcoin.org/en/secure-your-wallet)). Hardware wallets in our directory include [Trezor](/directory/trezor) and [ColdCard](/directory/coldcard), which holds Bitcoin only ([ColdCard](https://coldcard.com/)).
- **Drop text-message codes.** In a SIM swap, criminals move your number to their own SIM card, then use the texted codes to reset your passwords. The FBI recommends strong methods such as standalone authenticator apps or physical security tokens ([FBI, February 2022](https://www.ic3.gov/PSA/2022/PSA220208)). [Ente Auth](/directory/ente-auth) and [YubiKey](/directory/yubikey) both fit. Save each account's backup codes when you switch, so a lost phone or key doesn't lock you out ([CPJ](https://cpj.org/2019/07/digital-safety-kit-journalists/)).
- **Keep your holdings quiet.** The FBI advises: "Do not advertise information about financial assets, including ownership or investment of cryptocurrency, on social media websites and forums" ([FBI](https://www.ic3.gov/PSA/2022/PSA220208)). Bitcoin transactions are "public, traceable, and permanently stored," and posting an address publicly "is not a good idea" unless you want public payments ([Bitcoin.org](https://bitcoin.org/en/protect-your-privacy)).
- **Know the scam scripts.** "Only scammers will guarantee profits or big returns," and someone from a dating app who wants to teach you crypto investing is running a scam ([FTC](https://consumer.ftc.gov/articles/what-know-about-cryptocurrency-and-scams)).

---

## How your answers change the tools

| | Abuse survivor | Journalist | Shopper | Crypto holder |
|---|---|---|---|---|
| Main adversary | A known person who may have had access | People you report on, legal demands | Advertisers, data brokers | Scammers, phishers, SIM swappers |
| First priority | A safety plan with an advocate | Protecting sources and metadata | Fewer trackers, fewer copies of your data | The recovery phrase |
| Matters most | Safer device, sharing review, address program | Signal, security key, SecureDrop | Tracker blocker, aliases, broker opt-outs | Hardware wallet, app or key instead of texts |
| Lower priority at first | VPN, new phone OS | Depends on the beat | Tor, new phone OS | VPN |

Everyone shares one base layer, CISA's four steps: recognize and report phishing, use strong passwords and a password manager, turn on multifactor authentication, and update your software ([CISA](https://www.cisa.gov/secure-our-world)). [Bitwarden](/directory/bitwarden) covers the passwords, and our [breach check](/breach-check) shows you how to check whether your email address appears in known breaches, and what to do if it does.

---

## Common mistakes

**Copying someone else's setup.** A journalist's setup costs a shopper time and money for threats they don't face. A shopper's setup does nothing about an ex-partner who knows your passcode. "Not everyone has the same priorities, concerns, or access to resources" ([EFF](https://ssd.eff.org/module/your-security-plan)).

**Going "max privacy" and giving up.** Trying to "protect all your data from everything all the time is impractical and exhausting" ([EFF](https://ssd.eff.org/module/your-security-plan)). Privacy Guides makes the same point: the most secure tools cost "a lot of usability" ([Privacy Guides](https://www.privacyguides.org/en/basics/threat-modeling/)). Pick the two or three changes that cover your likely threats and stop there for now. A setup you keep using beats a stricter one you abandon in a week.

**Skipping the basics for exotic tools.** A hardened phone won't help if your email password is reused and has already leaked. Do CISA's four steps first.

**Expecting a tool to do more than it does.** "A VPN is not a tool for anonymity," EFF says, because companies can still track you through GPS, cookies, tracking pixels and fingerprinting ([EFF, last reviewed July 28, 2026](https://ssd.eff.org/module/choosing-vpn-thats-right-you)). Encrypted messaging protects what you say, while metadata can still show who you talk to ([CPJ](https://cpj.org/2019/07/digital-safety-kit-journalists/)).

**Leaving out the people around you.** Your partner, family and coworkers share your accounts, photos and group chats. Bring them into the plan ([EFF](https://ssd.eff.org/module/your-security-plan)).

**Never looking at it again.** A move, a new job, a breakup or a windfall changes your answers. Put the review date on your calendar.

---

## Turn your answers into a plan

1. Answer the six questions on one page.
2. Circle the two threats that are both likely and bad.
3. Pick one change for each.
4. Add the base layer: password manager, multifactor authentication, updates, phishing awareness.
5. Set a review date.

To find tools, search the [directory](/directory), or connect your AI assistant to it through [Use Default Privacy in your AI](/ai) and ask with your answers in hand. New to all of this? Start with [Where to Start With Privacy](/guides/privacy-where-to-start) and the [Privacy Starter Kit](/stacks/privacy-starter-kit).

---

## FAQ

**What is a threat model, in plain words?**

It's a short written answer to: what am I protecting, from whom, how likely is a problem, how bad would it be, and how much effort will I spend. EFF calls it a security plan ([EFF](https://ssd.eff.org/module/your-security-plan)).

**Do I need a threat model if I have nothing to hide?**

You still have things to protect: your bank account, your email and your home address. For most people a threat model is about scams, breaches and tracking, and it points you to the basics CISA recommends to everyone ([CISA](https://www.cisa.gov/secure-our-world)).

**How often should I update my threat model?**

Whenever your situation changes. EFF suggests revisiting it frequently and marking a review date on your calendar ([EFF](https://ssd.eff.org/module/your-security-plan)).

**Is there a tool that builds a threat model for me?**

Consumer Reports' [Security Planner](/directory/consumer-reports-security-planner) asks a few questions and gives you a free, customized plan ([Security Planner](https://securityplanner.consumerreports.org/)). It's a good start, but your own answers still decide what matters.

**Does a VPN cover my threat model?**

No single tool does. EFF says a VPN "is not a tool for anonymity," and companies can still track you in other ways ([EFF](https://ssd.eff.org/module/choosing-vpn-thats-right-you)). EFF also says a VPN you trust may be useful on a Wi-Fi network when you don't know who runs it. It does nothing about a phished password.

**I think my partner is monitoring my phone. What should I do first?**

Reach out from a device they have never had access to, and talk to an advocate before you remove anything ([Safety Net](https://www.techsafety.org/resources-survivors/technology-safety-plan)). Removing monitoring software can alert the person who installed it and deletes evidence ([Coalition Against Stalkerware](https://stopstalkerware.org/information-for-survivors/)). In the US, the National Domestic Violence Hotline is at 800-799-7233, or text START to 88788 ([The Hotline](https://www.thehotline.org/)).

**What's the biggest threat to a crypto holder?**

For most, scams. People reported more than $11.3 billion in cryptocurrency-related losses to the FBI's Internet Crime Complaint Center in 2025 ([FBI IC3](https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf)). Keep your recovery phrase private and backed up ([Trezor](https://trezor.io/learn/security-privacy/personal-security-standards/scams-and-phishing)), use an authenticator app or security key instead of text codes, and don't advertise what you hold ([FBI](https://www.ic3.gov/PSA/2022/PSA220208)).

---

## Keep reading

- [Where to Start With Privacy: The First 10 Changes](/guides/privacy-where-to-start)
- [The Privacy Starter Kit](/stacks/privacy-starter-kit)
- [Threat model in the glossary](/glossary/threat-model)
- [Remove your name from data brokers](/guides/remove-name-from-data-brokers)
