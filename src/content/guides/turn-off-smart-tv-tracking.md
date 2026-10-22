---
title: "Smart TV Tracking: How to Turn Off ACR on Roku, Fire TV, Google TV, LG, Vizio, Samsung, TCL and Hisense"
slug: turn-off-smart-tv-tracking
description: "Many smart TVs can recognize what's on the screen, including your game console or laptop over HDMI, and report it for advertising. Here is what automatic content recognition (ACR) is, how to turn it off brand by brand, what a streaming box changes, and where the lawsuits and new laws stand."
category: Privacy
difficulty: beginner
timeToComplete: "15 minutes"
publishedAt: "2026-10-11"
updatedAt: "2026-10-11"
author: Default Privacy
tags:
  - smart tv
  - acr
  - automatic content recognition
  - roku
  - fire tv
  - google tv
  - samsung
  - lg
  - vizio
  - advertising id
relatedGuides:
  - private-dns-and-ad-blocking
  - ring-doorbell-privacy-settings
  - privacy-where-to-start
  - how-to-build-your-threat-model
---

**Last checked: October 2026** · Menu paths below are what each maker or the cited outlet says, with a link, as we checked them on October 10, 2026; menus differ by model year and software version, lawsuits are allegations unless a settlement or ruling is named, and none of this is legal advice.

Your TV may be reporting what's on its screen. That includes shows from an antenna or cable box. It can also include a game console or a laptop plugged in over HDMI, the cable that connects other devices to your TV.

One question runs through this guide:

**What does my TV know about what I watch, and who gets told?**

On most brands there is a switch. On the two brands researchers tested, opting out of the ad and tracking settings stopped the ACR traffic.

---

## The Short Answer

Your TV may report what is on its screen, including a console or cable box plugged in over HDMI. On most brands there is a switch to stop it.

1. Turn off ACR, the feature that identifies what is playing, in your TV brand's settings.
2. Also turn off ad targeting, which is a separate switch, and reset the advertising ID.
3. If you use a streaming box, still turn off ACR on the TV. It can fingerprint the box.
4. Turning it off does not erase data already collected. Menus differ by model year, so check again after a reset.
5. For more protection, keep the TV off your Wi-Fi. A streaming box then does the tracking instead.

## What ACR is

Automatic content recognition (ACR) is a feature that identifies what is playing on your TV. Researchers who studied it call it "a Shazam-like technology." The TV regularly samples what's on screen and matches it against a library of shows and ads ([IMC 2024 paper](https://arxiv.org/abs/2409.06203)).

**It sends a fingerprint.** A fingerprint here is a short code computed from the picture or sound, which a server can match to a known show. The same researchers found that "the hash of content rather than raw content is sent to ACR servers" ([IMC 2024 paper](https://arxiv.org/html/2409.06203)). The makers describe it the same way. Roku says its ACR "generates an encrypted fingerprint from a sample of pixels on your screen" and "will not match to personal videos" ([Roku](https://support.roku.com/article/using-more-ways-to-watch-on-your-roku-tv)).

**It runs often.** The study measured two brands. "LG likely batches the frames captured every 10ms and sends the resultant content fingerprint every 15 seconds." Samsung, they concluded, likely "sends the fingerprints every minute" ([IMC 2024 paper](https://arxiv.org/html/2409.06203)).

**It sees what you plug in.** The researchers found ACR traffic "when using smart TV as an external display using HDMI" ([IMC 2024 paper](https://arxiv.org/html/2409.06203)). So a console, cable box, laptop or streaming stick plugged into the TV can be fingerprinted by the TV itself.

**Turning it off worked.** After the researchers opted out of all advertising and tracking options on the LG and Samsung sets they tested, they saw "a complete absence of communication with any previously identified ACR domains" ([IMC 2024 paper](https://arxiv.org/html/2409.06203)).

**What LG says its version does.** In a September 12, 2026 statement, LG said its ACR "uses audio fingerprinting technology using the TV's internal audio processor (not a speaker)." On claims that its TVs listen in, it said they "do not continuously record or transmit users' conversations." It said ACR runs on "Live TV, HDMI-connected devices, and LG Channels" and "does not operate within third-party streaming apps such as Netflix or YouTube." LG also confirmed that "nearby Wi-Fi information supports approximate location estimation for ACR" when you accept its agreements ([LG](https://www.lg.com/us/newsroom/corporate/statement-understanding-privacy-on-lg-smart-tvs)).

Brands differ in scope. Vizio's Viewing Data covers "gaming content," devices plugged into an HDMI port, and "third-party apps," and Vizio also collects the hardware (MAC) addresses of available Wi-Fi access points ([Vizio](https://www.vizio.com/en/terms/privacy-policy/viewing-data-privacy-policy)).

---

## Turn it off, brand by brand

Most brands have two separate switches. One is the ACR switch. The other controls ad targeting, usually through an advertising ID (a code your TV gives advertisers so they can recognize it). Turn off both.

Brands are roughly ordered by how sure we are of the path. Most of the first come from the maker's own pages. The last rely on outlets or have no path.

### Roku TVs and Roku players

**Feature name:** Automatic Content Recognition (ACR), under Smart TV Experience. Consumer Reports' 2025 test set labeled it "Use Info from TV Inputs" ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)).

**Path:** Home > Settings > Privacy > Smart TV Experience. Highlight "Automatic Content Recognition (ACR)" and press OK so the box is unchecked. You can also do it online at my.roku.com > Privacy Settings > Smart TV Experience, and set it to No ([Roku](https://support.roku.com/article/using-more-ways-to-watch-on-your-roku-tv)). If you see the Smart TV Experience screen, Roku offers "Agree" or "Manage preferences." Pick Manage preferences, then Decline ([Roku](https://support.roku.com/article/using-more-ways-to-watch-on-your-roku-tv)).

Roku says "ACR is not enabled out of the box" ([Roku](https://support.roku.com/article/using-more-ways-to-watch-on-your-roku-tv)). Check anyway, in case you agreed during setup.

**Also switch off:** Personalize Ads under Settings > Privacy > Advertising, and reset the advertising ID there ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)). Roku's own page confirms the Advertising menu ([Roku](https://support.roku.com/article/manage-ad-preferences)).

**What it doesn't stop:** Roku says "the data that was collected or used while the setting was enabled will be retained by Roku" ([Roku](https://support.roku.com/article/using-more-ways-to-watch-on-your-roku-tv)). Turning it off now does not erase the past.

**How it's verified:** Roku's help page, last updated June 23, 2026.

### Amazon Fire TV (sticks, Cube and Fire TV smart TVs)

**Feature names:** Device Usage Data, Collect App Usage Data, Interest-based Ads, and on TVs, over-the-air viewing data.

**Path:** Settings > Preferences > Privacy Settings. Turn off Device Usage Data (used for marketing and product improvement), Collect App Usage Data (which apps you open, and for how long) and Interest-based Ads (which tells apps not to use your advertising ID to profile you) ([Amazon](https://www.amazon.com/gp/help/customer/display.html?nodeId=GQFYXZHZB2H629WN)).

On smart TVs with Fire TV built in, Amazon says you can also opt out of sharing your antenna viewing in the same menu ([Amazon](https://www.amazon.com/gp/help/customer/display.html?nodeId=GQFYXZHZB2H629WN)). Consumer Reports calls the toggle "Collect App and Over-the-Air Usage" ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)). Consumer Reports also found a newer option, Manage Sharing From Apps, which stops third-party apps sending viewing information to Amazon ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)).

**What it doesn't stop:** Amazon still collects what it needs for Parental Controls and the "Recents" row. Prime Video and other Amazon services have their own settings ([Amazon](https://www.amazon.com/gp/help/customer/display.html?nodeId=GQFYXZHZB2H629WN)). Amazon's help page doesn't address HDMI. Consumer Reports says Amazon told it Fire TV doesn't collect data from a cable box or other non-Amazon devices ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)). A 2026 class action alleges ACR on Fire TVs, and Amazon has moved to dismiss it ([Manypenny v. Amazon](https://www.courtlistener.com/docket/73305241/manypenny-v-amazoncom-inc/)).

**How it's verified:** Amazon's help page, read live and in an [archived copy](http://web.archive.org/web/20261006120735/https://www.amazon.com/gp/help/customer/display.html?nodeId=GQFYXZHZB2H629WN) (archived copy, October 6, 2026).

### Google TV, Chromecast and Google TV Streamer

**Feature name:** advertising ID. Google's help pages list no ACR switch.

**Path:** Settings > Privacy > Ads > "Reset advertising ID" or "Delete advertising ID." Google says "You can't turn off ads." If you delete the ID, a new one isn't assigned, but "you may still receive ads based on other factors" ([Google](https://support.google.com/googletv/answer/13392198?hl=en)).

**What it doesn't stop:** Consumer Reports says you can't fully opt out of Google's collection if you want smart features, and that ACR on a Google TV set comes from the TV maker, such as Sony, TCL or Hisense ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)). So also follow your TV brand's steps below.

**How it's verified:** Google's help page, for the ad ID only.

### Sony (BRAVIA)

**Feature name:** Samba Interactive TV, run by a third company, Samba TV.

**Path on older Android TV models:** Sony's support page says to go to System Preferences > Samba Interactive TV and disable it. "By disabling it, Samba Interactive TV stops collecting your TV's content viewing history." To reset the ad ID: System Preferences > Samba Interactive TV > Privacy > "Reset device advertising ID" ([Sony](http://web.archive.org/web/20260423201309/https://www.sony.com/electronics/support/articles/00182856) (archived copy, April 23, 2026)).

**Path on newer Google TV models:** Consumer Reports says the path is Settings > All Settings > Samba Interactive TV. It also says to decline Sony's own "Provide Sony Smart TV Features," "Provide Program Recommendations," "Perform Product Improvements" and "Share TV Data" ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)). Newer Sony sets run Google TV, so the Google TV ad ID steps above apply too.

**What it doesn't stop:** Turning it off does not delete history already collected. Sony says to contact Samba TV at privacy@samba.tv for that. Sony also says Samba "does not recognize content played by installed apps like Netflix, Hulu, or YouTube" ([Sony](http://web.archive.org/web/20260423201309/https://www.sony.com/electronics/support/articles/00182856) (archived copy, April 23, 2026)).

**How it's verified:** Sony's own page for older models, through an archive copy. Sony's site blocked us, and we could not read a current Sony page for 2025 and 2026 models.

### LG (webOS)

**Feature names:** Viewing Information Agreement (this turns on ACR), Interest-Based Cross Device Advertising Agreement and Voice Information Agreement ([LG](https://www.lg.com/us/newsroom/corporate/statement-understanding-privacy-on-lg-smart-tvs)), plus a setting called Live Plus, which Consumer Reports says runs on ACR ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)).

**Path:** LG's help page says: press Settings on the remote and select All Settings. Select Support, then Privacy & Terms, then User Agreements. LG notes the path "may vary slightly depending on the TV's release year" ([LG](https://www.lg.com/us/support/help-library/lg-tv-how-to-agree-to-the-user-agreements--20155154186594)). That page is about agreeing. Consumer Reports says the same User Agreements screen holds the controls for Viewing Information, Voice Information and Interest-Based Cross-Device Advertising ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)).

**Also switch off:** Live Plus. Pocket-lint gives the path as Settings > Settings > General > System > Additional Settings > Live Plus ([Pocket-lint](https://www.pocket-lint.com/how-to-turn-off-acr-on-an-lg-tv/)). Malwarebytes calls the second step All Settings ([Malwarebytes](https://www.malwarebytes.com/blog/news/2026/03/samsung-tvs-stop-spying-on-viewers-in-texas-heres-how-to-disable-acr-anywhere)). ZDNet gives the same route and adds Additional Settings > Advertisement > "Limit AD Tracking" on ([ZDNet](https://www.zdnet.com/home-and-office/home-entertainment/how-to-disable-acr-tv/)). Pocket-lint also says you can ask LG to delete past data under Support > Privacy & Terms > "Delete My Viewing Information" ([Pocket-lint](https://www.pocket-lint.com/how-to-turn-off-acr-on-an-lg-tv/)).

**What it doesn't stop:** LG says ACR doesn't run inside apps like Netflix or YouTube, so turning it off changes nothing about what those apps collect. LG says "ACR data collection stops" when you disable it, and that declining "does not prevent users from using core smart TV functionality." It also says ACR, voice and interest-based ads are "not enabled by default" ([LG](https://www.lg.com/us/newsroom/corporate/statement-understanding-privacy-on-lg-smart-tvs)).

In September 2026, researchers including Gamers Nexus claimed an LG TV on an HDMI source sent location data to Alphonso, the ad company that became LG Ad Solutions, "as frequently as 20 times per minute," eCoustics reported ([eCoustics](https://www.ecoustics.com/news/lg-smart-tv-privacy-acr/)). LG's September statement says only that it uses nearby Wi-Fi information to estimate a TV's approximate location for ACR ([LG](https://www.lg.com/us/newsroom/corporate/statement-understanding-privacy-on-lg-smart-tvs)). LG calls LG Ad Solutions "a majority-owned affiliate" ([LG](https://www.lg.com/us/newsroom/corporate/statement-understanding-privacy-on-lg-smart-tvs)). eCoustics found no LG response to the specific data fields or frequency in the test ([eCoustics](https://www.ecoustics.com/news/lg-smart-tv-privacy-acr/)).

**How it's verified:** LG's help page (dated July 28, 2026) and statement. The Live Plus path comes from outlets.

### Vizio (now owned by Walmart)

**Feature name:** Viewing Data. Consumer Reports says older sets may call it "Smart Interactivity" ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)).

**Path on 2020 to 2024 sets:** Vizio's 2024 manual says: "Press the MENU button on your remote go to All Settings > Admin & Privacy, then select Viewing Data to turn the feature on or off" ([Vizio manual](https://www.vizio.com/content/dam/asset-portal/us/en/2024/tv/documentation/hd-fhd/2024_VIZIO_HD_FHD_UM_v2.pdf)).

**Newer sets:** Vizio's Viewing Data policy gives the path All Settings > Privacy & Legal > Viewing Data, and All Settings > Admin & Privacy > Viewing Data on older TVs ([Vizio](https://www.vizio.com/en/terms/privacy-policy/viewing-data-privacy-policy)).

**Sets made before 2020:** Malwarebytes gives Menu > System > Reset & Admin > Viewing Data ([Malwarebytes](https://www.malwarebytes.com/blog/news/2026/03/samsung-tvs-stop-spying-on-viewers-in-texas-heres-how-to-disable-acr-anywhere)). That matches the menu Vizio's FAQ lists for sets made before 2020 ([Vizio](https://www.vizio.com/en/terms/privacy-policy/ads-and-privacy-faq)).

**Also switch off:** Limited Ad Tracking, and reset the TV Advertiser ID. Vizio's paths by era ([Vizio](https://www.vizio.com/en/terms/privacy-policy/ads-and-privacy-faq)):

- After 2024: Menu > Privacy & Legal > Advertising > Limited Ad Tracking
- Before 2024: Menu > Admin & Privacy > Advertising > Limited Ad Tracking
- Before 2020: Menu > System > Reset & Admin > Advertising > Limited Ad Tracking

**What it does and doesn't do:** Vizio says turning Viewing Data off "will trigger the deletion of historical logs of Viewing Data" and won't affect how the TV works. But it "will not, however, affect or limit Activity Data collection." Opting out of sale through your Walmart account doesn't stop collection either: "Your Viewing Data will still be collected unless you toggle off Viewing Data collection on your VIZIO OS products." The setting is per TV ([Vizio](https://www.vizio.com/en/terms/privacy-policy/viewing-data-privacy-policy)).

**How it's verified:** Vizio's policy page, 2024 manual and FAQ. The pre-2020 path comes from an outlet.

### Samsung (Tizen)

**Feature name:** Viewing Information Services. Samsung's page says it collects "Smart TV viewing history, such as programs viewed and the amount of time spent watching them," a "Personalized Service ID" and your IP address. It says you can opt out in "the Settings menu" but gives no path ([Samsung](https://www.samsung.com/us/support/answer/ANS10010616/)).

**Path:** Pocket-lint says the path on newer software is Home > Settings > All Settings > General & Privacy > Privacy Choices > Viewing Information Services, and that older TVs may show "Terms & Privacy" in place of "Privacy Choices" ([Pocket-lint](https://www.pocket-lint.com/samsung-tv-disable-acr/)). Consumer Reports says the path is Settings > All Settings > General & Privacy > Terms & Privacy ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)). Malwarebytes also lists Settings > Support > Terms & Privacy > Privacy Choices ([Malwarebytes](https://www.malwarebytes.com/blog/news/2026/03/samsung-tvs-stop-spying-on-viewers-in-texas-heres-how-to-disable-acr-anywhere)). If one doesn't match your TV, try the others.

**Also switch off:** "Interest-Based Advertisements" on the same screen. Consumer Reports says you'll "still get ads, but they will be less targeted." For voice, it points to Settings > All Settings > Advanced Features > Voice ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)).

**What you give up:** Samsung says its Vision AI Companion, on some 2025 models, needs you to accept the Smart Hub and Viewing Information Service terms. "The service is unavailable if not agreed" ([Samsung](https://www.samsung.com/sg/support/tv-audio-video/what-is-the-vision-ai-companion-on-your-samsung-tv/)). That page is Samsung's Singapore site, and it lists the US among the regions.

**How it's verified:** Samsung's page names the feature. Every path comes from outlets. Samsung says ACR only runs if you opted in during setup or later. Pocket-lint says it's on by default on many sets. We can't settle that without a TV.

### TCL

TCL sells Google TV, Roku TV and Fire TV models in the US. On a TCL Roku TV, use the Roku steps ([ZDNet](https://www.zdnet.com/home-and-office/home-entertainment/how-to-disable-acr-tv/)). On a TCL Fire TV, use the Fire TV steps.

**What TCL itself says:** TCL's support page covers only the Google TV ad ID: Settings > Privacy > Ads > "Reset Advertising ID" or "Delete Advertising ID" ([TCL](https://support.tcl.com/en_US/can-i-change-the-ad-settings-on-my-tcl-google-tv)). We found no TCL page that names an ACR switch.

**What an outlet found on one model:** Pocket-lint tested a TCL 75QM7L Google TV ([Pocket-lint](https://www.pocket-lint.com/your-tcl-tv-is-spying-on-you-so-heres-how-you-disable-the-settings-responsible-for-that/)). It says to:

1. Pocket-lint first turns off an automatic picture setting: go to All Settings > Display and Sound > Picture and deselect the "automated content recognition" option at the bottom.
2. Go to Settings > Privacy > "Terms & Privacy" or "User Agreement," deselect the optional items, then press "Agree" to save. There is no Save button.
3. Turn off Usage & Diagnostics under Privacy, then under Ads choose "Reset advertising ID" or "Limit ad tracking".

Consumer Reports says you can withdraw consent later under Settings > Privacy > User Agreements ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)).

**How it's verified:** one hands-on review of one model, plus Consumer Reports. Low confidence on other models.

### Hisense

**We have no verified path for Hisense.** Use the Roku or Fire TV steps if your Hisense runs one of those ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)).

On Hisense Android-based sets (the notice doesn't name Google TV), Hisense calls ACR the "Enhanced Viewing Service." Its notice says you can turn it off "anytime through your smart TV 'Settings'," without naming the menu. When on, it "will continuously analyze audio from any onscreen content," including consoles and set-top boxes. It also says resetting the "SmartTV Identifier" does not stop targeted ads. Only turning the feature off does ([Hisense](https://www.hisense-usa.com/compliance/android-enhanced-viewing-service-)).

For other Hisense sets, ZDNet says to look under Settings > System > Privacy for "Smart TV Experience, Viewing Information Services, or something similar" ([ZDNet](https://www.zdnet.com/home-and-office/home-entertainment/how-to-disable-acr-tv/)). ZDNet doesn't name the software or confirm the label.

---

## A streaming box doesn't fully escape it

**The TV can still fingerprint the box.** ACR works over HDMI, as the research above found. Turn ACR off on the TV even if you only watch through a box.

**The box tracks you too.** In June 2025, Amazon Ads and Roku announced "a shared ad identifier delivering logged-in reach to an estimated 80M U.S. CTV households." It lets Amazon's ad platform "recognize logged-in viewers across the Roku OS and devices" ([Amazon Ads](https://advertising.amazon.com/library/news/roku-amazon-ads-partnership)). Neither company says Roku's ACR data goes to Amazon. What they share is a logged-in ad identity and data about the ads Roku serves you.

**Apple TV describes no ACR.** Apple's pages describe no ACR feature. Apple does collect "the content you watch, and where you watch it in the Apple TV app and in connected apps" ([Apple](https://www.apple.com/legal/privacy/data/en/apple-tv-app/)). Apple says its ad platform does not link your data with data from third parties for targeted advertising or ad measurement, and "does not share user or device data with data brokers" ([Apple](https://www.apple.com/legal/privacy/data/en/apple-advertising/)).

On an Apple TV, switch off:

- **Play history:** Settings > Apps > TV > "Use Play History" ([Apple](https://www.apple.com/legal/privacy/data/en/apple-tv-app/)).
- **App tracking:** Settings > General > Privacy & Security > Tracking, then turn off "Allow Apps to Request to Track" ([Apple](https://support.apple.com/en-us/102420)).
- **Location for ads:** Settings > General > Privacy & Security > Location Services ([Apple](https://www.apple.com/legal/privacy/data/en/apple-advertising/)).

Apps like Netflix still log what you watch inside them, and the TV can still fingerprint an Apple TV over HDMI.

---

## Going further

**Keep the TV offline.** If the TV never joins your Wi-Fi, its own ACR has nowhere to send fingerprints. Use a streaming box for apps, and remember the box then does the tracking.

**Block tracking at the network.** A DNS blocker such as Pi-hole or NextDNS stops devices from reaching known tracking domains. Our [private DNS and ad blocking guide](/guides/private-dns-and-ad-blocking) covers setup.

There's a catch with TVs. A 2020 study of 220 US homes summarized that "72% of smart TVs use hard-coded Google DNS servers" in place of the DNS server your router hands out. Its results count 68% of smart TVs contacting Google DNS. The authors note this "renders network-level blocking solutions... invalid" ([Mazhar and Shafiq, 2020](https://arxiv.org/pdf/2001.08288)). The traffic was collected over 19 days in February 2018, and contacting Google DNS doesn't show that every lookup skipped the router. The common fix is a router rule that sends all DNS traffic to your blocker, plus blocking public DNS servers ([LabZilla](https://labzilla.io/blog/force-dns-pihole)).

---

## The legal picture

**Texas sued five makers.** On December 15, 2025, Texas Attorney General Ken Paxton sued Sony, Samsung, LG, Hisense and TCL, calling their disclosures "hidden, vague, and misleading" ([The Record](https://therecord.media/texas-sues-5-smart-tv-makers-over-acr-tech)). Samsung settled in February 2026 and must get Texas consumers' "express consent" before collecting ACR data ([Texas AG](https://www.texasattorneygeneral.gov/news/releases/attorney-general-paxton-secures-major-agreement-samsung-ensure-texans-are-protected-smart-tvs)). LG settled in May 2026 on similar terms, for Texas residents only, with no money and no admission of wrongdoing. LG's consent requirement starts 180 days after the judgment takes effect ([judgment](https://www.texasattorneygeneral.gov/sites/default/files/images/press/LG.pdf)). The cases against Sony, Hisense and TCL were still ongoing as of LG's settlement ([Texas AG](https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-secures-major-agreement-lg-protect-texans-privacy-and-stop-data-being)).

**Kentucky passed a law.** From July 1, 2027, companies covered by Kentucky's privacy law must "Not collect automatic content recognition data without a consumer's consent." That covers content from "external inputs," such as a console or cable box. It doesn't cover data about what you watch on the company's own services ([Act text](https://apps.legislature.ky.gov/law/acts/26RS/documents/0118.pdf)).

Private class actions over ACR are also pending, including one against Hisense ([Severino v. Hisense](https://www.courtlistener.com/docket/73331232/severino-v-hisense-usa-corporation/)) and one against Amazon ([Manypenny v. Amazon](https://www.courtlistener.com/docket/73305241/manypenny-v-amazoncom-inc/)).

Unless you're a Texan with a Samsung set (or an LG set, once its consent rule starts), or in Kentucky from mid-2027, the switches above are your main protection.

---

## FAQ

**Is my smart TV watching me?**

It watches the screen. Many smart TVs can use ACR to identify what's playing by sending fingerprints of the picture or sound ([IMC 2024 paper](https://arxiv.org/html/2409.06203)). LG says its ACR uses "the TV's internal audio processor (not a speaker)" ([LG](https://www.lg.com/us/newsroom/corporate/statement-understanding-privacy-on-lg-smart-tvs)). Turn it off with the steps above.

**How do I turn off ACR on a Samsung TV?**

Pocket-lint says to go to Settings > All Settings > General & Privacy > Privacy Choices and turn off Viewing Information Services. Older TVs may say Terms & Privacy ([Pocket-lint](https://www.pocket-lint.com/samsung-tv-disable-acr/)). Turn off Interest-Based Advertisements too ([Consumer Reports](https://www.consumerreports.org/electronics/privacy/how-to-turn-off-smart-tv-snooping-features-a4840102036/)).

**Does turning off ACR stop all tracking?**

No. Ad IDs, app usage and apps like Netflix are separate. Vizio says turning off Viewing Data doesn't limit its Activity Data ([Vizio](https://www.vizio.com/en/terms/privacy-policy/viewing-data-privacy-policy)). Roku keeps data it already collected ([Roku](https://support.roku.com/article/using-more-ways-to-watch-on-your-roku-tv)).

**Does ACR work on my game console?**

It can. Researchers found ACR traffic when the TV was used as a display over HDMI ([IMC 2024 paper](https://arxiv.org/html/2409.06203)). Vizio lists "gaming content" in its Viewing Data ([Vizio](https://www.vizio.com/en/terms/privacy-policy/viewing-data-privacy-policy)).

**Is Roku better than the TV's own apps?**

It moves the tracking. Roku has its own ACR, which it says is off by default ([Roku](https://support.roku.com/article/using-more-ways-to-watch-on-your-roku-tv)). Roku also shares a logged-in ad identity with Amazon ([Amazon Ads](https://advertising.amazon.com/library/news/roku-amazon-ads-partnership)). The TV can still fingerprint the Roku over HDMI, so switch off the TV's ACR as well.

**Do updates turn tracking back on?**

We found no source showing that software updates reset these switches. Factory resets do change them. Vizio says a reset sets Viewing Data to off ([Vizio](https://www.vizio.com/en/terms/privacy-policy/viewing-data-privacy-policy)). Menus move between model years, so check again after a reset, a big update, or a new TV.
