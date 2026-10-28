---
title: "Digital Safety Kit for Stalking and Abuse Survivors"
slug: stalking-abuse-survivor-safety-kit
description: "A safety-planning first kit for stalking and abuse survivors and their advocates: evidence, protective orders and your address, then locking accounts, removing broker listings and hardening a phone."
category: Threat-Model Stacks
difficulty: beginner
timeToComplete: "40 minutes"
publishedAt: "2026-07-07"
updatedAt: "2026-10-28"
quickExit: true
author: Default Privacy
tags:
  - safety
  - stalker
  - stalkerware
  - domestic-abuse
  - harassment
  - tracking
  - airtag
  - monitoring
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

## Read this first: safety before settings

This kit is for domestic-abuse and stalking survivors, and for the advocates and shelter caseworkers helping them. Your adversary is different from most: **they are known to you, may be technically capable, and likely had prior physical or account access.** That means shared passwords, installed stalkerware, location tracking, data-broker lookups, and cameras or accounts you no longer control.

**Two warnings before you change anything:**

- **Changing settings can tip off the adversary.** If they're monitoring an account and it suddenly locks, that escalation can be dangerous. Where possible, make changes from a device they've never touched, and pace them.
- **If you are in immediate danger, a checklist is not the priority.** Contact a domestic-violence hotline or advocate who can help you build a personal safety plan first. This kit supports that plan; it does not replace it.

> **Get help first.** In the US, the National Domestic Violence Hotline (The Hotline) is free, confidential and open 24/7: call **1-800-799-7233**, text **START** to **88788**, or chat on [thehotline.org](https://www.thehotline.org/). Outside the US, the Coalition Against Stalkerware lists support organizations by country ([stopstalkerware.org](https://stopstalkerware.org/resources/)). Safety Net's [technology safety plan](https://www.techsafety.org/resources-survivors/technology-safety-plan) is written for exactly this situation.
>
> **This visit can be seen.** If someone may be monitoring your phone or computer, they may be able to see that you opened this page. Read it from a device they have never had access to, such as a library computer or a trusted friend's phone.
>
> **Save evidence before you change or remove anything.** Removing monitoring software or resetting a phone also deletes the evidence of it. Take screenshots and keep a dated log first. Safety Net has [documentation tips](https://www.techsafety.org/documentationtips). For the full plan, read our guide [How to build your threat model](/guides/how-to-build-your-threat-model).

What this covers: **physical safety basics (evidence, police, protective orders, routines, trackers, your address), then account control, data removal, and device hardening.** It gives the general steps. A trained advocate can build them into a plan for your situation, and a forensic sweep for a hidden tracker needs one.

---

## Step 0: Physical safety, evidence and protective orders

Changing a setting or signing a device out can alert the person watching, so plan visible changes with a trained advocate; in the US the National Domestic Violence Hotline is free, confidential and open 24/7 (call 1-800-799-7233, text START to 88788).

If you are in immediate danger, call 911 ([OVW](https://www.justice.gov/ovw/stalking)). SPARC, a stalking resource center supported by grants from the US Justice Department's Office on Violence Against Women, says its safety tips are "not designed to replace a personalized safety plan created with the assistance of a professional" ([SPARC safety strategies](https://www.stalkingawareness.org/wp-content/uploads/2022/05/Safety-Strategies.pdf)). The same goes for this step.

### Keep a log and save the evidence

**What to do.** Safety Net suggests logging every incident, "even if you are not sure if you want to involve the police or courts": the date and time, the place, any witnesses, the technology involved, a short description of what the person did, and police details if you reported it ([Safety Net](https://www.techsafety.org/documentationtips)). SPARC has a [documentation log](https://www.stalkingawareness.org/documentation-log/) template in 10 languages. Save texts, emails, voicemails and letters ([The Hotline](https://www.thehotline.org/resources/stalking-safety-planning/)). Don't delete threatening emails: "A forwarded email will not have the same information, so forwarding to someone else is not enough" ([Safety Net](https://www.techsafety.org/documentationtips)).

**The limit.** Some messaging apps "notify the other person if you take a screenshot of your conversation", and some do the same for screen recordings. Safety Net can't list which ones, so test with a friend or look it up first ([Safety Net](https://www.techsafety.org/documentationtips)). Reporting a post to the app may get it removed, and "this could remove potential evidence", so document it first ([Safety Net](https://www.techsafety.org/documentationtips)). Safety Net also warns that in some cases, when abusers know victims are documenting, "they might escalate the abuse" ([Safety Net](https://www.techsafety.org/documentationtips)). Keep the log somewhere they can't reach.

### Report to the police

**What to do.** The US Office on Violence Against Women says: "Contact your local police department to report stalking and stalking-related incidents and/or threats" ([OVW](https://www.justice.gov/ovw/stalking)). SPARC says to explain "why the stalker's actions are causing you fear", and to log any police reports ([SPARC](https://www.stalkingawareness.org/what-to-do-if-you-are-being-stalked/)). If you are working with the police, Safety Net suggests asking them to send a preservation letter (a letter asking the phone company to keep its records) "as soon as possible", so the phone company knows not to destroy the data ([Safety Net](https://www.techsafety.org/documentationtips)). VictimConnect, an "anonymous and confidential" hotline that serves victims of "all crime types", is another option: call or text 1-855-484-2846 ([VictimConnect](https://victimconnect.org/)).

**The limit.** The legal definition of stalking "varies from state to state", so The Hotline says it "may be helpful" to reach out to local police or a legal advocate to learn the laws in your area ([The Hotline](https://www.thehotline.org/resources/stalking-safety-planning/)). Safety Net says police "capacity to investigate your complaint may vary depending on resources and knowledge" ([Safety Net](https://www.techsafety.org/location-tracking)).

### Ask about a protective order

**What to do.** A protective order is a court order. SPARC says orders could, for example, bar the person from contacting you, from abusing or threatening you, or from going to places like your home, work or school ([SPARC](https://www.stalkingawareness.org/what-to-do-if-you-are-being-stalked/)). The Hotline says "You can apply for a protective order at courthouses" ([The Hotline](https://www.thehotline.org/get-help/domestic-violence-legal-help/)). SPARC says civil protection orders usually don't require a police report or criminal charges ([SPARC](https://www.stalkingawareness.org/what-to-do-if-you-are-being-stalked/)). If you get one, SPARC suggests keeping a copy with you and giving one to security at work or school ([SPARC safety strategies](https://www.stalkingawareness.org/wp-content/uploads/2022/05/Safety-Strategies.pdf)).

**Where to get help.** Names and kinds of orders differ by state, so "check with local victim advocates to learn what orders are available" where you live ([SPARC](https://www.stalkingawareness.org/what-to-do-if-you-are-being-stalked/)). [WomensLaw.org](https://www.womenslaw.org/laws), a project of the National Network to End Domestic Violence, explains each state's laws in plain language. For civil legal aid, the Legal Services Corporation, which funds legal aid for low-income Americans, has a [lookup](https://www.lsc.gov/about-lsc/what-legal-aid/i-need-legal-help) that takes "an address or city", so you can search by city. In California, for example, there is "no court fee to file" for a domestic violence restraining order, you "do not have to have a lawyer", and your court's self-help center can help with the forms ([California Courts](https://selfhelp.courts.ca.gov/DV-restraining-order)). Other states differ.

**The limit.** The Hotline says an order "might not prevent stalking, but it will allow you to report any violations of the order to the local police" ([The Hotline](https://www.thehotline.org/resources/stalking-safety-planning/)). Orders "depend on your partner's adherence to the law and law enforcement's willingness to enforce the protective order", and one "should never replace a safety plan" ([The Hotline](https://www.thehotline.org/resources/protective-restraining-orders/)).

### Change your routines and tell people

**What to do.** "Change your routine by using a different bank or grocery store, and taking a different route to work or school" ([The Hotline](https://www.thehotline.org/resources/stalking-safety-planning/)). Tell family, friends and neighbors that you are being stalked, and what they should do if the person contacts them ([SPARC safety strategies](https://www.stalkingawareness.org/wp-content/uploads/2022/05/Safety-Strategies.pdf)). The Hotline suggests a code word you can text a friend when you need help, describing the person's vehicles and license plates so others can warn you, and asking for police patrols when the person frequents your neighborhood ([The Hotline](https://www.thehotline.org/resources/stalking-safety-planning/)). SPARC suggests giving security and friends at work or school a picture of the person ([SPARC safety strategies](https://www.stalkingawareness.org/wp-content/uploads/2022/05/Safety-Strategies.pdf)).

**The limit.** SPARC says "Stalkers often escalate their behavior when the victim reacts", so think through how the person may react to each change before you make it ([SPARC safety strategies](https://www.stalkingawareness.org/wp-content/uploads/2022/05/Safety-Strategies.pdf)).

### Home basics

**What to do.** The Hotline lists "deadbolts, window locks or gates, visible security cameras, and motion-activated outdoor lights" ([The Hotline](https://www.thehotline.org/resources/stalking-safety-planning/)). SPARC adds changing locks if possible, packing "a bag with important items in case you need to leave quickly", and identifying escape routes out of your house and teaching them to your children ([SPARC safety strategies](https://www.stalkingawareness.org/wp-content/uploads/2022/05/Safety-Strategies.pdf)). If you have a Ring or other camera, check who else can watch it ([Ring guide](/guides/ring-doorbell-privacy-settings#9-clean-up-shared-users)).

**The limit.** SPARC says to consider your own camera "depending on your state law", so check that first ([SPARC safety strategies](https://www.stalkingawareness.org/wp-content/uploads/2022/05/Safety-Strategies.pdf)). It also lists hacking "into wireless networks or home devices" and installing "cameras to monitor you" among the things stalkers may do at home, so when you do Step 1, include the accounts for any camera or smart-home device the person once had access to.

### If you find a GPS tracker or AirTag

**What to do.** Safety Net says to check your car "in the trunk, under the hood, inside the bumper, and under and between the seats", that "a trusted mechanic or law enforcement" may be able to find it, and that a device "can be as small as a quarter" ([Safety Net](https://www.techsafety.org/location-tracking)). If you feel unsafe, Google says to go to a safe public location and contact law enforcement or a trusted contact, and Apple says to contact local law enforcement, who can work with Apple to request information related to the item ([Apple](https://support.apple.com/en-us/119874); [Google](https://support.google.com/android/answer/13658562?hl=en)). Before you change anything, screenshot the alert and the map ([Google](https://support.google.com/android/answer/13658562?hl=en)), and photograph where you found it. Google says you can turn it off, or "keep it turned on if you're concerned that turning it off could be unsafe" ([Google](https://support.google.com/android/answer/13658562?hl=en)). If you do turn it off, get the serial number first. Google warns that some trackers, if turned off, "may be factory reset", and then police "can't get additional information about these trackers, like who its owner is" ([Google](https://support.google.com/android/answer/13658562?hl=en)). Our [tracker guide](/guides/family-location-apps-and-airtags#if-you-find-one) has the phone steps, what the alerts miss, and what disabling does.

**The limit.** Turning off Bluetooth or Location Services on your iPhone "does not prevent the owner" of an AirTag "from being able to see the location" of it ([Apple](https://support.apple.com/en-us/119874)). Safety Net warns that "Making changes will often alert the other person, and they might become more abusive", that "They might try to track you another way", and that changes "might also erase evidence" ([Safety Net](https://www.techsafety.org/location-tracking)).

### Keep your address off records

**What to do.** Many states run an Address Confidentiality Program (ACP), also called Safe at Home in some states, for people whose safety is at risk from domestic violence, stalking, harassment or rape. Participants get "a free, forwardable address or a P.O. box to use in place of their actual address", and you usually apply through a counselor, often found at victim assistance centers ([NASS, October 2022](https://www.nass.org/sites/default/files/reports/NASS-White-Paper-Voters-ACP-Programs-Oct22.pdf)). Our [mailing-address guide](/guides/get-a-mailing-address-that-isnt-your-home#when-an-address-confidentiality-program-is-the-better-route) covers how an ACP works. If you are moving, the [Low Profile stack](/stacks/start-over-privately#step-0-safety-check-first-if-you-are-leaving-someone) covers when to apply and the rest of the move.

**The limit.** The National Association of Secretaries of State (NASS) notes that "each state's program will differ" ([NASS, October 2022](https://www.nass.org/sites/default/files/reports/NASS-White-Paper-Voters-ACP-Programs-Oct22.pdf)). Washington says "ACP participation does not guarantee safety", and that private businesses and federal agencies "are not required to accept the ACP substitute address but may work with a participant upon request" ([Washington Secretary of State](https://www.sos.wa.gov/statewide-programs/address-confidentiality-program-acp)).

---

## Step 1: Take back your accounts (do this from a safe device)

Shared or known passwords are the most common way an abuser keeps a grip. Close that door first.

### [Bitwarden](/directory/bitwarden): a private vault for fresh, unique passwords
**Badges: public GitHub.** Create one new, strong master password the adversary has never seen, then generate a unique password for every account. Email first, because email resets everything else. [KeePass](/directory/keepass) is a fully offline, open-source alternative if you'd rather no data ever leave your device.

### [Ente Auth](/directory/ente-auth): two-factor codes they can't intercept
**Badges: open-source, public GitHub.** Turning on two-factor authentication means a stolen password alone no longer opens an account. Use an authenticator app rather than SMS, because a phone plan the abuser controls can intercept text codes. [Aegis Authenticator](/directory/aegis-authenticator) is a strong open-source option on Android.

> **Order matters:** secure your email account first, then reset the accounts that recover through it. Then check each account's "active sessions" or "logged-in devices" list. Signing out a device they use will cut off their access, **and they will likely notice.** Screenshot the list first, and plan the timing with an advocate.

---

## Step 2: Pull your personal data off the open market

Data brokers publish your address, phone, and relatives. That is a stalker's starting map. Removing it makes you harder to physically locate.

### [DeleteMe](/directory/deleteme): managed removal from broker sites
A paid service that finds and files removals across the major people-search brokers on your behalf, then repeats it, because brokers re-list. This is the low-effort option when your capacity is limited. [Easy Opt Outs](/directory/easy-opt-outs) does the same job at a lower cost.

### [Big Ass Data Broker Opt Out List](/directory/big-ass-data-broker-opt-out-list): the free DIY route
A maintained reference of broker opt-out links you can work through yourself for free. Slower, but it costs nothing and you control the pace. Prioritize the people-search sites that show a home address.

### [Global Privacy Control](/directory/global-privacy-control): a standing "do not sell" signal
A browser signal that tells sites not to sell or share your data going forward. It's preventive, not a cleanup. Pair it with active removal above.

### [Cloaked](/directory/cloaked): masked details for new accounts
Generates masked emails, phone numbers, and logins so accounts you open *now* aren't tied to the identifiers the abuser already knows. [MySudo](/directory/mysudo) similarly provides masked identities to compartmentalize a fresh start.

---

## Step 3: Harden the device in your hand

If the adversary had physical access to your phone, assume monitoring software could be present.

### The stalkerware reality
Hidden monitoring apps can read messages and track location while staying invisible. There is **no single app in this directory that reliably detects all stalkerware**, so don't trust a false all-clear. The most dependable reset is a **factory reset followed by rebuilding from scratch** (not restoring an old backup, which can reinstall the spyware). **A reset deletes the evidence**, so document what you've seen first (screenshots, a dated log), and talk to an advocate about whether you need it for a protective order. Do the reset only after you've secured your accounts and, ideally, with an advocate, because it's a visible change.

### [GrapheneOS](/directory/grapheneos): a hardened phone for a clean start
**Badges: public GitHub.** If you're able to move to a new device, GrapheneOS is a security-hardened Android build (for Pixel phones) that gives you a clean, controlled slate with tight permission control over what any app can see. [CalyxOS](/directory/calyxos) is a similar privacy-focused option with broader everyday app compatibility.

> **On location tracking:** review which apps have location permission and revoke what you don't need, and check shared-location features (family/find-my services) that an abuser may have enabled. A physical tracker hidden in a car or bag is a real threat but a physical-search problem. See Step 0 and bring it to an advocate, not an app.

---

## Tradeoffs at a glance

| Need | Low-effort pick | Free / DIY | Watch out for |
|------|-----------------|------------|---------------|
| Evidence and orders | Talk to an advocate | SPARC log, WomensLaw.org | Some apps flag screenshots |
| Address on records | Talk to an advocate | State ACP (free address) | Doesn't guarantee safety |
| Lock accounts | Bitwarden | KeePass | Secure email first |
| 2FA | Ente Auth | Aegis | Avoid SMS codes |
| Remove data | DeleteMe | Big Ass Opt Out List | Brokers re-list |
| New identifiers | Cloaked | None | Don't reuse old ones |
| Clean device | GrapheneOS | Factory reset | Don't restore old backup |

The honest tradeoff: managed services cost money but save scarce energy; the free routes cost time. Either way, work at a pace that keeps you safe from escalation.

---

## FAQ

### How do I check my phone for stalkerware?
There's no perfectly reliable detector, so don't trust a clean scan. Warning signs include fast battery drain, unfamiliar apps, and the abuser knowing things they shouldn't. The dependable fix is a factory reset and rebuilding fresh rather than restoring an old backup. Save evidence first, because a reset deletes it, and do it with an advocate, since it's a visible change that could provoke escalation.

### What's the first thing a stalking survivor should do digitally?
Secure your email account from a device the adversary has never used: set a brand-new password they've never seen and turn on app-based two-factor authentication with a tool like Ente Auth. Email recovers every other account, so it comes first. Then check the account's active-session list. Signing out a device they use will likely be noticed, so screenshot the list and plan that step with an advocate.

### How do I get my home address off the internet?
Your address is republished by data brokers. Use a managed service like DeleteMe or Easy Opt Outs to file removals across them, or work the free Big Ass Data Broker Opt Out List yourself. Brokers re-list over time, so removal has to be repeated, not one-and-done.

### Can an abuser track my location without a physical tracker?
Yes, through shared-location features, family-tracking services, or a monitoring app installed while they had your phone. Review app location permissions, disable location sharing you didn't set up, and if you suspect a monitoring app, plan a clean device reset with an advocate.

### Will changing my passwords alert my abuser?
It can. If they're actively monitoring an account, a sudden lockout may signal that you're taking steps, which can be dangerous. Make changes from a device they can't see, pace them, and coordinate with a domestic-violence advocate so the digital plan matches your physical safety plan.

### How do I hide from a stalker?
Start with an advocate and a safety plan, and call 911 if you are in immediate danger. Keep a dated log, vary your routes, tell people you trust, and ask about a protective order and your state's Address Confidentiality Program (Step 0). Then lock down your accounts and pull your address off broker sites. Changing a setting or signing a device out can alert the person watching, so plan visible changes with a trained advocate.

### How do I get a protective order?
The Hotline says you can apply at courthouses ([The Hotline](https://www.thehotline.org/get-help/domestic-violence-legal-help/)). Names, kinds and rules differ by state, so ask a local advocate or read your state's page on [WomensLaw.org](https://www.womenslaw.org/laws). SPARC says civil orders usually don't require a police report or criminal charges ([SPARC](https://www.stalkingawareness.org/what-to-do-if-you-are-being-stalked/)). An order "should never replace a safety plan" ([The Hotline](https://www.thehotline.org/resources/protective-restraining-orders/)).

### I found a GPS tracker or AirTag. What should I do?
If you feel unsafe, Google says to go to a safe public location and contact law enforcement or a trusted contact, and Apple says to contact local law enforcement ([Apple](https://support.apple.com/en-us/119874); [Google](https://support.google.com/android/answer/13658562?hl=en)). Before you change anything, screenshot the alert and the map, and photograph where you found it. Google says you can also keep it turned on if turning it off could be unsafe. If you do turn it off, get the serial number first, because some trackers may reset when turned off, and then police can't learn who owns them ([Google](https://support.google.com/android/answer/13658562?hl=en)). Changes can alert the other person, so plan it with an advocate ([Safety Net](https://www.techsafety.org/location-tracking)). Our [tracker guide](/guides/family-location-apps-and-airtags#if-you-find-one) has the full steps.
