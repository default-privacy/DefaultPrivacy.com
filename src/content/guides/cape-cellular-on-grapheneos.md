---
title: "Cape Cellular on a De-Googled Pixel: Does It Work?"
slug: cape-cellular-on-grapheneos
description: "Cape works on a Pixel running GrapheneOS if the phone is carrier-unlocked and you switch on eSIM support first. Setup steps, cost, who it suits, and what a carrier can still see from cell towers however private the plan is."
category: Privacy
difficulty: intermediate
timeToComplete: "15 minutes"
publishedAt: "2026-10-21"
updatedAt: "2026-10-21"
author: Default Privacy
tags:
  - cape
  - cape cellular
  - cape mobile
  - grapheneos
  - grapheneos esim
  - pixel esim
  - private cell service
  - privacy carrier
  - imsi rotation
  - cell tower location
relatedGuides:
  - what-still-works-after-switching-to-grapheneos
  - grapheneos-vs-calyxos
  - get-a-second-phone-number
relatedTools:
  - name: Cape
    href: /directory/cape
  - name: GrapheneOS
    href: /directory/grapheneos
---

**Last checked: October 2026** · Each claim links to the provider's own pages. General information, not legal advice.

Yes, Cape works on a Pixel running GrapheneOS. Cape's own setup guide covers it, and the phone needs to be carrier-unlocked and support eSIM. On GrapheneOS you first switch on "eSIM support" in Settings, then activate from the Owner profile. Cape costs $99 a month with taxes and fees included, and it cuts down what your carrier keeps about you. It cannot hide that your phone is on the network, and the network still knows roughly where you are.

---

## What Cape is

Cape is a US mobile carrier that says it asks for and keeps as little as it can. It says it collects the minimum data needed, deletes it as soon as possible and never sells it ([Cape](https://www.cape.co)). It doesn't ask for your name or address when you pay ([Cape FAQs](https://www.cape.co/faqs)). Its privacy policy says it collects only your phone number and zip code ([Cape Privacy Policy](https://www.cape.co/privacy-policy)).

It runs on other carriers' towers. Cape says it uses their cell towers but routes your traffic through its own core network, and that AT&T is among its partners ([Cape FAQs](https://www.cape.co/faqs)). Its main extras:

- **Identifier rotation.** Your SIM's identifier (the IMSI) normally never changes, so anyone with network access can follow it. Cape says it rotates yours daily ([Cape blog](https://www.cape.co/blog/product-feature-identifier-rotation)). Cape's FAQ says this works on Pixels, including GrapheneOS ([Cape FAQs](https://www.cape.co/faqs)).
- **Short log retention.** Cape says the call and text records it generates are kept for 1 day, though partners that connect it to other networks may keep data longer ([Cape Privacy Policy](https://www.cape.co/privacy-policy)).
- **Real numbers.** Cape says its numbers are real mobile numbers, not VoIP, and you can port yours in ([Cape FAQs](https://www.cape.co/faqs)).

Those are Cape's claims. Cape also reports an audit of its call-log deletion ([Cape blog](https://www.cape.co/blog/disappearing-call-logs-audit)) and SOC 2 Type 2 compliance ([Cape blog](https://www.cape.co/blog/soc-2-type-2-compliance)). We have not tested any of it.

---

## How it works on GrapheneOS

**Which phones.** Cape's compatibility page says the phone must support eSIM and be unlocked from any previous carrier. It lists Pixel 6 and later (6, 6 Pro, 6a, 7, 7 Pro, 7a, 8, 8 Pro, 9 series, 10 series, 11 series) and the Pixel Fold. It also says Android must be version 13 or higher ([Cape Device Compatibility](https://support.cape.co/hc/en-gb/articles/42330770199444-Cape-Device-Compatibility); [Cape FAQs](https://www.cape.co/faqs)). GrapheneOS itself only runs on certain Pixels, so check [its install page](https://grapheneos.org/install/) first.

**eSIM or physical SIM.** Cape's requirements list says eSIM. We found no physical SIM option in Cape's pages. Installing GrapheneOS needs a phone the carrier hasn't locked ([GrapheneOS FAQ](https://grapheneos.org/faq)), so buy unlocked.

**The eSIM toggle.** GrapheneOS ships with basic eSIM support, but adding and managing eSIMs needs proprietary Google code that is off by default. GrapheneOS says managing eSIMs doesn't depend on Google Play and never shares data with it, even when Play is installed ([GrapheneOS usage guide](https://grapheneos.org/usage)). The switch is Settings > Network & internet > eSIM support ([GrapheneOS usage guide](https://grapheneos.org/usage)).

**Setup, per Cape's guide** ([Cape: Activating on GrapheneOS](https://support.cape.co/hc/en-gb/articles/32653935478164-Activating-Cape-Service-on-GrapheneOS)):

1. In the Owner profile, turn on eSIM support and restart when asked.
2. Install the Cape app from Accrescent or from the Google Play Store.
3. Open the app and follow the activation steps.

**Do you need Google Play?** No. Cape says without Play Services you can't get its push notifications or use Network Lock, and it is working on UnifiedPush as an alternative ([Cape: Activating on GrapheneOS](https://support.cape.co/hc/en-gb/articles/32653935478164-Activating-Cape-Service-on-GrapheneOS)). Installing Play on GrapheneOS is optional and sandboxed ([GrapheneOS usage guide](https://grapheneos.org/usage)).

**Known snags.**

- Activation must happen in the Owner profile. After that, calls, texts and data work in other profiles. If your identifier rotates while you're in a secondary profile, you may lose service until you switch back ([Cape: Activating on GrapheneOS](https://support.cape.co/hc/en-gb/articles/32653935478164-Activating-Cape-Service-on-GrapheneOS)). Cape says Android 17 and later improve this if the Cape app is installed and opened once in both profiles ([Cape: Secondary User FAQ](https://support.cape.co/hc/en-gb/articles/47843481136532-Android-Secondary-User-FAQ)).
- Cape's network needs VoLTE (calls over 4G/5G). If GrapheneOS drops that setting, calls and texts stop. Cape's fix is in the SIM's carrier settings overrides ([Cape: Troubleshooting on GrapheneOS](https://support.cape.co/hc/en-gb/articles/47184777620244-Troubleshooting-Call-and-Text-Issues-on-GrapheneOS)).

---

## Cost and who it's for

Cape's FAQ says $99 a month with taxes and fees included. It is offering $70 a month for life to anyone who joins before 12/31/26 ([Cape FAQs](https://www.cape.co/faqs)). If you buy a Pixel through Cape, it says it will install GrapheneOS for $50 ([Cape FAQs](https://www.cape.co/faqs)).

It makes sense if you already use GrapheneOS and your worry is what your carrier builds about you over time: a fixed identifier, long call records, a name and address on file. Cape partners with the EFF on free and discounted service for journalists and activists ([Cape](https://www.cape.co)).

It makes less sense if you want a cheap line, need a physical SIM, or want to hide from the network itself.

---

## What a carrier still sees

No plan changes how cellular works. GrapheneOS says connecting to a carrier "inherently depends on you identifying yourself to it" ([GrapheneOS FAQ](https://grapheneos.org/faq)). Cape says there is "no silver bullet" for privacy on cellular networks ([Cape FAQs](https://www.cape.co/faqs)).

- **Roughly where you are.** Cape's policy lists cell ID, which identifies the area a tower covers, as data it receives whenever your phone connects. It keeps it up to 30 days, and partners may keep it longer ([Cape Privacy Policy](https://www.cape.co/privacy-policy)).
- **Your phone number and your IP address.** The policy says IP addresses in call records are deleted after a day, and the IMEI (your phone's hardware ID) may be captured by partners for fraud and stolen-phone screening, kept for 1 to 360 days ([Cape Privacy Policy](https://www.cape.co/privacy-policy)).
- **Your location on a 911 call.** Cape says it is shared automatically ([Cape FAQs](https://www.cape.co/faqs)).
- **Court orders.** Cape says it complies with CALEA, the federal wiretap law, but challenges requests without legal process and hands over only what it has ([Cape FAQs](https://www.cape.co/faqs)).
- **Calls and texts.** GrapheneOS says legacy calls and texts trust the carrier and network and are not secure ([GrapheneOS FAQ](https://grapheneos.org/faq)). Use an encrypted messenger such as [Signal](/directory/signal).
- **Your phone as a tracker.** Airplane mode turns the cellular radio off, so the carrier can't track the device through it ([GrapheneOS FAQ](https://grapheneos.org/faq)).

Cape's daily rotation is meant to scatter that trail across many identifiers ([Cape FAQs](https://www.cape.co/faqs)). It makes the trail messier, not empty.

Other carriers and privacy services exist, but we haven't verified any here. For a second number, see [Get a second phone number](/guides/get-a-second-phone-number).

---

## FAQ

**Does Cape work on GrapheneOS?**

Yes. Cape has a setup guide for it and says its service supports GrapheneOS on Pixels ([Cape: Activating on GrapheneOS](https://support.cape.co/hc/en-gb/articles/32653935478164-Activating-Cape-Service-on-GrapheneOS); [Cape FAQs](https://www.cape.co/faqs)).

**Do I need Google Play to use Cape on GrapheneOS?**

No. You can install the Cape app from Accrescent. Without Play Services you lose push notifications and Network Lock, per Cape ([Cape: Activating on GrapheneOS](https://support.cape.co/hc/en-gb/articles/32653935478164-Activating-Cape-Service-on-GrapheneOS)).

**Does eSIM on GrapheneOS send data to Google?**

GrapheneOS says eSIM management doesn't need Google Play and never shares data with it, and won't connect to a Google service unless the carrier uses one ([GrapheneOS usage guide](https://grapheneos.org/usage)).

**Can I use Cape with a physical SIM?**

Cape's requirements say the phone must support eSIM ([Cape Device Compatibility](https://support.cape.co/hc/en-gb/articles/42330770199444-Cape-Device-Compatibility)). We found no physical SIM option.

**How much does Cape cost?**

$99 a month with taxes and fees included, or $70 a month for life if you join before 12/31/26 ([Cape FAQs](https://www.cape.co/faqs)). Prices may have changed, so check Cape's site.

**Can Cape see where I am?**

Roughly, yes. It receives the cell ID of the tower you connect to and keeps it up to 30 days ([Cape Privacy Policy](https://www.cape.co/privacy-policy)).

**Does GrapheneOS stop the carrier tracking me?**

Not while the cellular radio is on. Airplane mode stops tracking through the radio ([GrapheneOS FAQ](https://grapheneos.org/faq)).

---

## Keep reading

- [What still works after switching to GrapheneOS](/guides/what-still-works-after-switching-to-grapheneos)
- [GrapheneOS vs CalyxOS](/guides/grapheneos-vs-calyxos)
- [Get a second phone number](/guides/get-a-second-phone-number)
