---
title: "Ring Doorbell Privacy: Settings to Change, Police Access, and Your Neighbor's Camera"
slug: ring-doorbell-privacy-settings
description: "Ring doorbells and cameras record your door, your street and often your neighbors. Here are the settings to change today, how police get Ring video now, what Amazon says it does with your recordings, and what you can do if a neighbor's Ring points at you."
category: Privacy
difficulty: beginner
timeToComplete: "15 minutes"
publishedAt: "2026-10-10"
updatedAt: "2026-10-10"
author: Default Privacy
tags:
  - ring
  - video doorbells
  - home cameras
  - amazon
  - police requests
  - end-to-end encryption
  - search party
  - neighbors
relatedGuides:
  - someones-ai-is-recording-you
  - how-to-build-your-threat-model
  - keep-home-address-off-public-records
  - privacy-where-to-start
relatedTools:
  - name: Breach check
    href: /breach-check
---

**Last checked: October 2026** · Product claims below are what Ring says on its own pages, with a link (start with [Ring's Control Center page](https://ring.com/support/articles/rj2pk/Ring-Control-Center-Information)). Court cases are allegations unless a ruling is named. This is not legal advice: recording law differs by state and country, so talk to a lawyer about a real dispute.

This guide is for two groups of people. Ring owners, and the neighbors their cameras can see and hear.

One question covers both:

**Who can watch this video, and who decides?**

Most of the answer sits in settings only the owner can change.

---

## Settings to change today

Almost everything below lives in the Ring app under the menu (☰) > **Control Center**. Ring says Control Center is where you "manage your account, community, and privacy settings" ([Ring](https://ring.com/support/articles/rj2pk/Ring-Control-Center-Information)).

### 1. Pick your encryption level

Encryption scrambles your video so only someone with the right key can watch it. Ring now offers three levels, all under menu (☰) > Control Center > **Video Encryption** ([Ring](https://ring.com/support/articles/myr75/using-video-end-to-end-encryption)):

- **Standard encryption.** Ring says videos are encrypted in transit and when stored in its cloud ([Ring](https://ring.com/support/articles/rj2pk/Ring-Control-Center-Information)). Ring holds the keys and can decrypt them ([EFF](https://www.eff.org/deeplinks/2026/09/cold-take-amazons-new-encryption-method-still-doesnt-deliver-real-privacy)).
- **TAKE ("Throw Away the Key Encryption").** Announced August 26, 2026. Ring says it runs its cloud features, such as Smart Alerts, "and then throws away and deletes the encryption key" ([TechCrunch](https://techcrunch.com/2026/08/26/ring-introduces-a-new-encryption-standard-makes-it-the-default-for-cloud-features/)). Ring's help page says "Only you and your trusted Shared Users can access your TAKE videos" ([Ring](https://ring.com/support/articles/m508l/Using-TAKE-Throw-Away-the-Key-Encryption)). TAKE applies to your whole account. You can't set it per camera. Video Search, Familiar Faces, Alexa and Fire TV viewing, ring.com viewing and third-party integrations need a temporary pause of TAKE, and video recorded during a pause uses Standard encryption ([Ring](https://ring.com/support/articles/m508l/Using-TAKE-Throw-Away-the-Key-Encryption)).
- **End-to-end encryption (E2EE).** The video is locked with keys only you control. Ring says "no one else, including Ring services, can access your encrypted content" and that Ring cannot help you recover videos if you lose access ([Ring](https://ring.com/support/articles/myr75/using-video-end-to-end-encryption)).

**Is TAKE on for you yet?** We can't say. TechCrunch reported that TAKE becomes the standard for Ring's cloud features worldwide, with a gradual rollout starting September 2026 ([TechCrunch](https://techcrunch.com/2026/08/26/ring-introduces-a-new-encryption-standard-makes-it-the-default-for-cloud-features/)). Ring's help page says it "will gradually become available" and describes turning it on yourself: Video Encryption > "Let's turn on TAKE (Throw Away the Key Encryption)" > Turn On TAKE ([Ring](https://ring.com/support/articles/m508l/Using-TAKE-Throw-Away-the-Key-Encryption)). Open the menu and check.

**What E2EE turns off.** Ring lists Active Warnings, Alexa and Fire TV viewing, Alexa+ Greetings, Bird's Eye View, Familiar Faces, Motion Tracking, Single Event Alert, Unusual Event Alert, Video Descriptions, viewing on ring.com, Shared Users, Smart Alerts, third-party integrations, video links, Video Search and Virtual Security Guard ([Ring](https://ring.com/support/articles/myr75/using-video-end-to-end-encryption)). It needs iOS 17+ or Android 9+, and some older models, such as the first two Video Doorbells, can't use it ([Ring](https://ring.com/support/articles/myr75/using-video-end-to-end-encryption)).

To turn it on: Control Center > Video Encryption > "Let's turn on End-to-End Encryption" > Continue.

**The critique of TAKE.** The Electronic Frontier Foundation (EFF), a digital rights group, says "it's technically still possible for Ring to alter its current practice if compelled to do so by law enforcement." EFF asked Ring whether it could be ordered to keep keys or unencrypted video, and says "the company did not address it." EFF also points out that account recovery keys are stored in the camera itself by default. Ring told EFF that under TAKE it "will not be able to provide encryption keys or decrypted content" ([EFF](https://www.eff.org/deeplinks/2026/09/cold-take-amazons-new-encryption-method-still-doesnt-deliver-real-privacy)).

In short: with E2EE, Ring never receives a key to your video. With TAKE, Ring holds a key for up to 24 hours whenever a cloud feature needs it, then deletes it ([Ring](https://ring.com/privacy)). TAKE keeps more features.

### 2. Turn off Search Party

Search Party uses nearby outdoor Ring cameras to look for a lost dog when a neighbor reports one. A second toggle, Fire Watch, looks for flames or smoke. Ring says you see any match and choose whether to share ([Ring](https://ring.com/support/articles/pkhj7/search-party)).

Ring's help page doesn't say whether it starts on. Rep. Raja Krishnamoorthi wrote to Ring in February 2026 that Search Party "is automatically enabled for Ring devices that save video recordings to the cloud" ([Krishnamoorthi letter](https://krishnamoorthi.house.gov/sites/evo-subsites/krishnamoorthi.house.gov/files/evo-media-document/2026-02-26.krishnamoorthi-to-ring-re-surveillance_0.pdf)). Engadget also reported it is enabled by default ([Engadget](https://www.engadget.com/big-tech/heres-how-to-disable-rings-creepy-search-party-feature-185420455.html)).

To turn it off: menu (☰) > Control Center > **Search Party** > turn off "Search for Lost Pets" and "Natural Hazards (Fire Watch)" ([Ring](https://ring.com/support/articles/pkhj7/search-party)). The setting is per camera, so repeat it for each one ([Engadget](https://www.engadget.com/big-tech/heres-how-to-disable-rings-creepy-search-party-feature-185420455.html)).

### 3. Stop police request emails, or leave Neighbors

Police and fire departments can post "Community Requests" asking nearby owners for video. Ring says participation "is always voluntary" ([Ring](https://ring.com/support/articles/uds27/Community-request)).

- **Stop the emails:** menu (☰) > Control Center > **Public Safety** > opt out of Community Requests email notifications ([Ring](https://ring.com/support/articles/uds27/Community-request)). Requests also come as push notifications, and the email opt-out doesn't stop those ([Ring](https://ring.com/support/articles/uds27/Community-request)).
- **Stop seeing them:** the requests also appear in the Neighbors feed. Turn the feed off at Control Center > **Neighbors** ([Ring](https://ring.com/support/articles/rj2pk/Ring-Control-Center-Information)).

For Community Requests, nothing is sent unless you tap share. If you do, Ring says your home address and account email go to the investigator with the video, and you can't take it back ([Ring](https://ring.com/support/articles/uds27/Community-request)). Warrants and emergency requests work differently (see below).

### 4. Turn off Amazon Sidewalk

Sidewalk is a shared network that lets your Ring device carry "a limited amount of traffic" for neighbors' Sidewalk devices. Ring says it is "enabled by default on Sidewalk-compatible devices" ([Ring](https://ring.com/support/articles/nzhv0/Amazon-Sidewalk-for-Ring-devices)).

To turn it off: menu (☰) > Control Center > **Amazon Sidewalk** > toggle off.

### 5. Decide on audio

Your doorbell's microphone can pick up conversations on the sidewalk (see "If your neighbor has one" below).

To turn it off: menu (☰) > Devices > [your device] > Device Settings > Privacy Settings > **Audio Streaming and Recording**. An "Activate Once" option lets you use Two-Way Talk without turning recording back on ([Ring](https://ring.com/support/articles/g4e2w/using-privacy-features-in-the-ring-app)). Ring says this toggle needs a compatible Ring subscription. Ring's help page doesn't state the default, but Sen. Markey's 2022 findings and Consumer Reports both describe audio recording as on by default ([Markey](https://www.markey.senate.gov/news/press-releases/senator-markeys-probe-into-amazon-ring-reveals-new-privacy-problems), [Consumer Reports](https://www.consumerreports.org/home-garden/home-security-cameras/video-doorbell-cameras-record-audio-too-a4636115889/)).

### 6. Draw Privacy Zones

A Privacy Zone blacks out part of the picture in live and recorded video. You get up to two per device, under Device Settings > Privacy Settings > **Add Privacy Zones** ([Ring](https://ring.com/support/articles/g4e2w/using-privacy-features-in-the-ring-app)).

Two caveats from Ring: "If your camera position moves, the Privacy Zone will change," and motion behind a zone can still trigger a recording ([Ring](https://ring.com/support/articles/g4e2w/using-privacy-features-in-the-ring-app)).

Motion Zones are different. They only change where motion sets off an alert. They hide nothing.

### 7. Shorten how long videos are kept

The US default is "30 days for 4K devices and 60 days for 1080p and 2K devices." You can pick anything from 1 day to 180 days at Control Center > **Video and Snapshot Storage** > Video and Snapshot Storage Time > Edit ([Ring](https://ring.com/support/articles/1nce1/Understanding-and-Adjusting-Your-Video-Storage-Time)).

Changing it needs an active subscription. A shorter setting only applies to videos recorded after you change it ([Ring](https://ring.com/support/articles/1nce1/Understanding-and-Adjusting-Your-Video-Storage-Time)). So delete older ones by hand: tap the History tile, then the pencil icon ([Ring](https://ring.com/support/articles/6shp7/managing-your-ring-videos)). Ring says a video you already shared by link can outlive the original ([Ring](https://ring.com/support/articles/1nce1/Understanding-and-Adjusting-Your-Video-Storage-Time)).

### 8. Leave Familiar Faces off

Familiar Faces is Ring's facial recognition. Once it's on, the camera saves every clear face it sees to a library, and you can name the ones you know. Ring says it "is disabled by default." It needs a Ring Pro plan or similar, and isn't offered in Illinois, Texas, Portland (Oregon) or Quebec. Ring itself says some laws require visitors' "explicit consent" before you turn it on ([Ring](https://ring.com/support/articles/z3yhg/familiar-faces)).

To check: menu (☰) > Pro Features > Manage People.

### 9. Clean up Shared Users

Shared Users can "review, save and share videos" from your account ([Ring](https://ring.com/support/articles/rj2pk/Ring-Control-Center-Information)). An ex-partner or old roommate left on this list can still watch.

Check: Control Center > **Shared Users**. While you're there, look at **Authorized Client Devices** for phones or browsers you don't recognize.

### 10. Protect the login

Ring made two-step verification (a code on top of your password) mandatory for every account in February 2020 ([The Register](https://www.theregister.com/2020/02/19/ring_twofactor_auth/)). That followed incidents where strangers got into cameras, including one in a child's bedroom. Ring said its systems weren't breached ([NBC News](https://www.nbcnews.com/news/us-news/man-hacks-ring-camera-8-year-old-girl-s-bedroom-n1100586)), and The Register reported the break-ins typically used passwords reused from other sites ([The Register](https://www.theregister.com/2020/02/19/ring_twofactor_auth/)). Use a password you don't use anywhere else.

---

## How police get Ring video now

### A short history

- **2022.** Ring reported to Sen. Ed Markey that it had given police video in an emergency, without the owner's consent, 11 times in 2022 so far. At that point 2,161 agencies were on Ring's police service ([Markey](https://www.markey.senate.gov/news/press-releases/senator-markeys-probe-into-amazon-ring-reveals-new-privacy-problems)).
- **January 2024.** Ring ended "Request for Assistance," the in-app tool police used to ask for video ([Ring](https://blog.ring.com/about-ring/ring-announces-new-neighbors-app-features-sunsets-request-for-assistance-post/)).
- **April 2025.** Ring announced it would work with Axon, a police technology company, on "Community Requests" ([Ring](https://blog.ring.com/about-ring/ring-announces-plans-to-work-with-axon-to-bring-community-request-service-to-the-neighbors-app)).
- **September 2025.** Community Requests launched in the US. Video you choose to share goes to "Axon Evidence," Axon's evidence system. Agencies can't see who got a request or who ignored it ([Ring](https://blog.ring.com/about-ring/ring-launches-community-requests-a-new-way-to-help-your-community/)).
- **December 2025.** Markey reported agencies on Neighbors had grown to 2,723 ([Markey](https://www.markey.senate.gov/news/press-releases/just-in-time-for-holiday-deliveries-sen-markeys-probe-exposes-amazons-alarming-privacy-violations-with-facial-recognition-technology-in-ring-doorbell)).
- **February 2026.** Ring and Flock Safety, a license-plate camera company, cancelled a planned integration. Ring's only stated reason: it "would require significantly more time and resources than anticipated." Ring says "no Ring customer videos were ever sent to Flock Safety" ([Ring](https://blog.ring.com/about-ring/ring-and-flock-cancel-partnership/)).

The Axon route is still running. It is how police ask today ([Ring](https://ring.com/support/articles/uds27/Community-request)).

### Warrants and emergencies don't ask you

Community Requests are the voluntary channel. There is a second one that doesn't ask you.

Ring says it doesn't hand over video for a subpoena. It needs a search warrant or a court order ([Ring report](https://assets.ctfassets.net/a3peezndovsu/1OFWf62CbRKrWNLDI1sgB4/bc9459cde8337abdca5540ae3d9dcbbc/Ring_Information_Request_Report_H2_2025.pdf)). For those, Ring says it normally tells you before it hands anything over, unless it is legally barred. It also "reserves the right to respond immediately" when there is imminent danger of death or serious injury, and says it usually tells the owner afterward ([Ring](https://ring.com/support/articles/oi8t6/Learn-About-Ring-Law-Enforcement-Guidelines)).

You can't opt out of warrants or emergency requests. But Ring says that with TAKE or E2EE on, it can only hand over non-video information, and it has no cloud video at all if you don't have a subscription (see What encryption changes below).

### The numbers

Ring publishes a report every six months ([Ring](https://ring.com/law-enforcement-information-requests)):

| Period | Warrants | Requests where content was handed over | Users notified |
|---|---|---|---|
| Jan to Jun 2025 | 2,099 | 977 | 599 |
| Jul to Dec 2025 | 2,276 | 1,077 | 653 |
| Jan to Jun 2026 | 2,063 | 1,068 | 890 |

Sources: [H1 2025](https://assets.ctfassets.net/a3peezndovsu/21hBsHrriB6ojAjKDG0re3/70180f1d6504483a9b0cc579e14d92d9/Ring_Information_Request_Report_H1_2025-1.pdf), [H2 2025](https://assets.ctfassets.net/a3peezndovsu/1OFWf62CbRKrWNLDI1sgB4/bc9459cde8337abdca5540ae3d9dcbbc/Ring_Information_Request_Report_H2_2025.pdf), [H1 2026](https://assets.ctfassets.net/a3peezndovsu/6Pk4adK5p2aCr3ofpULqox/383c4a18c0bee1a7b268a91d2b899f93/Ring_Information_Request_Report_-_H1_2026.pdf).

"Content" in Ring's reports also covers customer service call recordings. The reports don't count emergency requests separately, so the 2022 figure of 11 is the only public figure we found for those.

### What encryption changes

Ring says: "Where TAKE or E2EE is enabled, Ring can only provide non-video information, such as basic subscriber information" ([Ring](https://ring.com/privacy)). Ring separately told EFF that under TAKE it would "only preserve and provide encrypted video files in response to valid legal process" ([EFF](https://www.eff.org/deeplinks/2026/09/cold-take-amazons-new-encryption-method-still-doesnt-deliver-real-privacy)). Those two statements don't fully match. Ring's law enforcement guidelines add that it has no access to video protected by TAKE or E2EE, or to any video if you have no current subscription ([Ring](https://ring.com/support/articles/oi8t6/Learn-About-Ring-Law-Enforcement-Guidelines)). Neither setting stops you from sharing video yourself.

---

## What Amazon does with it

**Sharing.** Ring's privacy notice says it may share your personal information with "our affiliates and subsidiaries" and its service providers ([Ring](https://ring.com/privacy-notice)). Ring's generative AI disclosure names Amazon.com as one of its affiliates ([Ring](https://ring.com/gen-ai-disclosure)).

**Advertising.** The same notice says Ring takes part in advertising networks ([Ring](https://ring.com/privacy-notice)).

**AI training.** Here is exactly what Ring says, and doesn't:

- Ring's privacy page says its research team "may view a small number of video recordings" that are publicly posted, on Neighbors or elsewhere online, or from people who gave explicit permission ([Ring](https://ring.com/privacy)).
- Ring's generative AI disclosure says it may train on "licensed and proprietary datasets, synthetic datasets, open-source datasets, and publicly available content." It doesn't say yes or no about your camera video ([Ring](https://ring.com/gen-ai-disclosure)).
- The privacy notice, updated June 5, 2026, doesn't mention AI training on your videos either way ([Ring](https://ring.com/privacy-notice)).
- For Familiar Faces only, TechCrunch reports Amazon said it doesn't use the face data to train AI models ([TechCrunch](https://techcrunch.com/2025/12/09/amazons-ring-rolls-out-controversial-ai-powered-facial-recognition-feature-to-video-doorbells/)).

If you post a video on Neighbors, assume Ring staff can view it.

**The 2023 FTC case.** In May 2023 the Federal Trade Commission alleged that Ring let employees and contractors watch customers' private videos. It alleged one employee "over several months viewed thousands of video recordings belonging to female users," that Ring used customer videos "to train algorithms... without consent," and that weak security let hackers into about 55,000 US customers' accounts. The proposed settlement required Ring to pay $5.8 million for customer refunds. The order required Ring to delete certain videos and face data, and anything built from them ([FTC](https://www.ftc.gov/news-events/news/press-releases/2023/05/ftc-says-ring-employees-illegally-surveilled-customers-failed-stop-hackers-taking-control-users)).

**Refunds.** In April 2024 the FTC sent 117,044 PayPal payments, more than $5.6 million in total, to owners of certain devices such as indoor cameras ([FTC](https://www.ftc.gov/news-events/news/press-releases/2024/04/ftc-sends-refunds-ring-customers-stemming-2023-settlement-over-charges-company-failed-block)).

**The Familiar Faces lawsuit.** In June 2026 a Virginia man filed a class action, The Register reported. He alleges Familiar Faces collects faceprints of visitors, postal workers and passersby without consent. These are allegations, with no ruling. Ring has said publicly that it doesn't use the data to train AI models ([The Register](https://www.theregister.com/personal-tech/2026/06/03/ring-faces-class-action-over-facial-recognition-feature/5250661)).

---

## If your neighbor has one

### How far it can hear

Consumer Reports tested a Ring Video Doorbell 3 Plus in 2022 and got clear speech at conversational volume from 18 feet, the farthest CR tested in its lab, and 20 feet outdoors in calm weather ([Consumer Reports](https://www.consumerreports.org/home-garden/home-security-cameras/video-doorbell-cameras-record-audio-too-a4636115889/)). An informal tape-measure test in a UK court case found reliable capture up to about 68 feet on an older Ring Video Doorbell 2 ([Fairhurst judgment](https://www.skadden.com/-/media/files/publications/2021/10/privacy-cybersecurity-update/fn5_fairhurstvwoodardjudgment1.pdf), paras 93 to 95).

So expect somewhere between about 20 and 70 feet. Wind and traffic make a big difference.

### The UK ruling: Fairhurst v Woodard

In October 2021 a county court in Oxford ruled on a neighbor's Ring cameras ([judgment](https://www.skadden.com/-/media/files/publications/2021/10/privacy-cybersecurity-update/fn5_fairhurstvwoodardjudgment1.pdf)):

- **The doorbell's video was lawful.** The judge found the neighbor was likely caught "only incidentally as she walks past" (para 134).
- **The doorbell's audio was unlawful.** Its range was "well beyond the range of video," and crime prevention "could surely be achieved by something less" (para 137).
- **A camera aimed at her property was unlawful for video too** (para 135).
- **Her harassment claim succeeded,** based on his conduct toward her, including telling her he had sent her image to the police (para 126). The judge also found he had actively misled her about what the cameras captured (para 133).

It is a county court decision, so other courts can consider it but don't have to follow it ([Inforrm](https://inforrm.org/2021/10/20/case-law-fairhurst-v-woodard-neighbour-cctv-harassment-and-data-protection-claim-succeeds-percy-preston/)).

**Your rights in the UK.** The Information Commissioner's Office (ICO), the UK privacy regulator, says data protection law applies once a home camera or smart doorbell captures beyond the owner's property. You can ask for a copy of footage you're in, ask for it to be deleted, and object to being recorded. The owner should reply within one calendar month. If the owner has a strong reason for the camera, the ICO says it is "unlikely to find it fair or balanced to force a CCTV owner to move their camera" ([ICO](https://ico.org.uk/for-the-public/domestic-cctv-systems/)).

### In the US

Recording law varies by state. Some states require everyone's consent to record a private conversation; our [guide to being recorded by AI](/guides/someones-ai-is-recording-you) has a state table.

Cameras aimed into a neighbor's yard are where owners have lost:

- **Florida, 2021.** A camera mounted 25 feet up, peering over a privacy fence into a neighbor's backyard. The neighbor appealed after being denied an early injunction. The appeals court reversed, saying that position "was dispositive" of the neighbor's likely success on an invasion of privacy claim, and the neighbor didn't need to show the footage was shared ([Jackman v. Cebrink-Swartz](https://flcourts-media.flcourts.gov/content/download/745135/opinion/202384_DC13_05282021_084132_i.pdf)).
- **North Carolina, 2025.** A jury found owners liable for aiming a camera over a neighbor's fence into their backyard during a dispute, and the appeals court upheld it, according to a Wake Forest Law Review case note. The case note's author adds that a camera installed "in the absence of any dispute and not aimed into the private spaces of a neighbor" likely doesn't create liability ([Wake Forest Law Review](https://www.wakeforestlawreview.com/2025/10/careful-where-you-point-that-thing-neighborly-surveillance-camera-dispute-establishes-jnov-standard-for-intrusion-upon-seclusion-claims/)).

In these two cases, the problem was aiming into private space. Neither court ruled on filming the street.

### What to ask

Keep it short and specific:

- "Could you add a Privacy Zone over my window and yard?" Ring allows two per camera ([Ring](https://ring.com/support/articles/g4e2w/using-privacy-features-in-the-ring-app)).
- "Could you turn off audio recording? It picks up our conversations."
- "Could you leave Familiar Faces off?"

---

## If you want video that stays home

These products store video locally or encrypt it end to end. Each has a caveat. Listed in no order.

- **Eufy (Anker).** Says its products "operate locally" where possible and offers end-to-end encryption as an option ([Eufy](https://www.eufy.com/privacy-commitment)). Caveat: in 2022 researchers showed streams could be watched unencrypted, and Anker later admitted it ([9to5Mac](https://9to5mac.com/2023/02/01/eufy-security-camera-encryption/)). In January 2025 three Eufy distributors paid New York $450,000 after the attorney general's investigation found that in certain situations video was not end-to-end encrypted and some live streams could be opened by anyone with the URL ([NY AG](https://ag.ny.gov/press-release/2025/attorney-general-james-secures-450000-companies-selling-home-security-cameras)).
- **Reolink.** Records to microSD, a Home Hub or a recorder without cloud fees ([Reolink](https://reolink.com/product/reolink-home-hub/)). Caveat: the only encryption-at-rest claim we found is for the Home Hub, which Reolink says encrypts footage so it stays protected "even if your devices or SD cards are stolen" ([Reolink](https://reolink.com/product/reolink-home-hub/)).
- **Apple HomeKit Secure Video.** Apple says the video is "end-to-end encrypted." Caveat: it is stored in iCloud and needs an iCloud+ plan and an Apple home hub ([Apple](https://support.apple.com/guide/icloud/icloud-homekit-secure-video-mme054c72692/icloud)).
- **Ubiquiti UniFi Protect.** Says footage "remains local to your UniFi Console" ([Ubiquiti](https://ui.com/physical-security)). Caveat: in December 2023 a cloud glitch let some users see other customers' camera notifications and consoles for about nine hours ([TechCrunch](https://techcrunch.com/2023/12/15/ubiquiti-glitch-exposed-private-video-streams-other-customers)). It also needs a UniFi console ([Ubiquiti](https://ui.com/physical-security)).
- **Frigate (self-hosted).** Free, open-source software that runs object detection on your own computer ([Frigate](https://docs.frigate.video/)). Caveat: you supply the server and IP cameras, and setup is technical.

---

## FAQ

**Can police get my Ring footage without a warrant?**

Sometimes. Ring says it can share video without a warrant in an emergency involving imminent danger of death or serious injury, and usually tells the owner afterward ([Ring](https://ring.com/support/articles/oi8t6/Learn-About-Ring-Law-Enforcement-Guidelines)). Police can also ask you directly through Community Requests, which you can ignore.

**How do I turn off Search Party?**

In the Ring app, open menu (☰) > Control Center > Search Party, then turn off "Search for Lost Pets" and "Natural Hazards (Fire Watch)" ([Ring](https://ring.com/support/articles/pkhj7/search-party)). Repeat it for each camera.

**Is Ring end-to-end encrypted?**

Only if you turn it on. End-to-end encryption is an option under Control Center > Video Encryption, and it switches off features such as Shared Users, Familiar Faces and viewing on ring.com ([Ring](https://ring.com/support/articles/myr75/using-video-end-to-end-encryption)). Ring's newer TAKE option deletes keys after cloud processing, but EFF argues it is weaker ([EFF](https://www.eff.org/deeplinks/2026/09/cold-take-amazons-new-encryption-method-still-doesnt-deliver-real-privacy)).

**Can my neighbor's Ring record my conversations?**

It can pick up speech from roughly 20 feet in Consumer Reports' test, and further in an informal UK test ([Consumer Reports](https://www.consumerreports.org/home-garden/home-security-cameras/video-doorbell-cameras-record-audio-too-a4636115889/)). Whether that is legal depends on where you live. A UK court found a neighbor's Ring audio unlawful in 2021 ([Fairhurst judgment](https://www.skadden.com/-/media/files/publications/2021/10/privacy-cybersecurity-update/fn5_fairhurstvwoodardjudgment1.pdf)). Ask the owner to turn audio off.

**Does Ring use facial recognition?**

Yes, through Familiar Faces, which Ring says is off by default and unavailable in Illinois, Texas, Portland (Oregon) and Quebec ([Ring](https://ring.com/support/articles/z3yhg/familiar-faces)). A June 2026 class action alleges it collects passersby's faceprints without consent ([The Register](https://www.theregister.com/personal-tech/2026/06/03/ring-faces-class-action-over-facial-recognition-feature/5250661)).

**How long does Ring keep my videos?**

In the US, 30 days for 4K devices and 60 days for 1080p and 2K devices by default. You can change it to anything from 1 to 180 days in Control Center ([Ring](https://ring.com/support/articles/1nce1/Understanding-and-Adjusting-Your-Video-Storage-Time)).
