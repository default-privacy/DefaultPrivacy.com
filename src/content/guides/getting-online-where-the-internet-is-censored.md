---
title: "Getting Online and Staying Private Where the Internet Is Censored"
slug: getting-online-where-the-internet-is-censored
description: "What the sources say about getting online and staying private under heavy censorship, with an Iran section: how the filtering works in 2026, the law, which tools have evidence behind them, fake VPN warnings, messaging limits, news mirrors, what to prepare before a blackout and where to get help. It also says what nobody has documented."
category: Privacy
difficulty: intermediate
timeToComplete: "20 minutes"
publishedAt: "2026-10-17"
updatedAt: "2026-10-17"
author: Default Privacy
tags:
  - censorship
  - internet shutdown
  - iran
  - circumvention
  - tor
  - bridges
  - psiphon
  - signal proxy
  - briar
  - fake vpn
  - digital security helpline
relatedGuides:
  - signal-vs-simplex
  - apps-without-the-google-play-store
  - how-to-build-your-threat-model
  - private-browsers-compared
relatedTools: []
---

**Last checked: 2026-10-17** · Each claim links to the page it came from. General information, not legal advice. No tool here comes with a promise of safety.

> **How current this is.** Written 2026-10-17. Tool status in Iran changes week to week, and a tool can work on one ISP and fail on another. Check live measurements first (NetBlocks, Cloudflare Radar and OONI are the ones the research names), then the tool's own current instructions. Nobody could test any tool from inside Iran for this guide.

> **Start here.** Five things, each with its sources in the section named.
> 1. The law is disputed and enforcement is documented. Read "The law, and where sources disagree" before you install anything.
> 2. No source shows that any tool works for everyone in Iran today. Measurements conflict. See "What the evidence says about Iran".
> 3. Fake VPN and Starlink apps that carry spyware are documented. See "Fake VPNs and malicious apps".
> 4. Contacting a helpline or a person is not risk-free. Read the warning under "Where to get help" first.
> 5. If a shutdown comes, what you prepared earlier is what you have. See "Before a blackout".

Iran is the main case here. Other countries get a short section at the end.

---

## What the sources establish about Iran

- **Two long shutdowns in 2026.** Al Jazeera wrote on 14 October 2026 that Iran's people "have undergone two lengthy state-imposed global internet shutdowns in 2026 – for three weeks during nationwide protests in January and for 88 days at the start of the ongoing war" ([Al Jazeera](https://www.aljazeera.com/news/2026/10/14/iran-targets-starlink-as-tool-of-war-with-hints-at-internet-restrictions)). Amnesty says the internet "was restored, with restrictions, on 26 May 2026" ([Amnesty, 28 May 2026](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)).
- **An allowlist.** On 28 January 2026 Filterwatch wrote that the state "has shifted to a 'white-listed' model" where "the global internet is blocked by default, and only specifically authorized services are permitted to function." Then, "Instagram, Telegram, YouTube, and X remain accessible only through circumvention tools" ([Filterwatch](https://filter.watch/english/2026/01/28/network-monitoring-january-2026-from-regional-disuptions-to-total-blackout-and-whitelisted-access/)).
- **Tiered access.** Amnesty describes "Internet Pro" services open to "a small number of pre-approved users", tied to registered SIM cards and identity checks ([Amnesty](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)). Filterwatch reports a February 2026 strategic document that "formally mandates the capability to disconnect the domestic network from the global internet during crises" ([Filterwatch, 6 March 2026](https://filter.watch/english/2026/03/06/network-monitoring-february-2026-a-new-phase-of-selective-internet-in-iran/)).
- **Latest in the research.** Filterwatch, 14 October 2026: users reported "widespread VPN instability and short, recurring disruptions", and a fresh decline in Iranian traffic on Cloudflare's network "heightens concerns that filtering tactics are shifting toward specifically targeting censorship-circumvention tools." Its summary says these signs "suggest filtering is shifting toward selectively targeting circumvention tools." That is a concern the report raises. It also describes an "identity–phone–IP" chain built from identity checks and registered identities on domestic servers ([Filterwatch](https://filter.watch/english/2026/10/14/network-monitoring-september-2026-regime-fear-of-filtering-failure/)).

### What is blocked, measured

OONI Probe is a test app volunteers run on their own networks. An "anomaly" is a measurement that looked different from a working connection. OONI's FAQ says: "An anomalous measurement does not necessarily contain evidence of internet censorship, as it might be a false positive" ([OONI FAQ](https://ooni.org/support/faq/)). The figures below are the research notes' own calculation from OONI's public data for Iran, 1 September to 15 October 2026 (45 days); each test name links to its query. The data is live, so counts drift as late measurements arrive. OONI returned zero "confirmed" blocks for all six tests. "Failed" is the API's failure count: measurements that returned an error rather than OK or anomalous. OONI's FAQ does not say what causes them. Anyone can run OONI Probe, and EFF warns that "running the tool can put you at risk because whoever runs your network will know you're running the software" ([EFF Surveillance Self-Defense](https://ssd.eff.org/module/understanding-and-circumventing-network-censorship)).

| Test | Measurements | Anomalous | OK | Failed |
|---|---|---|---|---|
| [Signal](https://api.ooni.org/api/v1/aggregation?probe_cc=IR&since=2026-09-01&until=2026-10-16&test_name=signal) | 6,324 | 96.0% | 2.2% | 1.8% |
| [Telegram](https://api.ooni.org/api/v1/aggregation?probe_cc=IR&since=2026-09-01&until=2026-10-16&test_name=telegram) | 6,400 | 97.5% | 2.4% | 0.1% |
| [WhatsApp](https://api.ooni.org/api/v1/aggregation?probe_cc=IR&since=2026-09-01&until=2026-10-16&test_name=whatsapp) | 6,413 | 88.9% | 2.5% | 8.6% |
| [Facebook Messenger](https://api.ooni.org/api/v1/aggregation?probe_cc=IR&since=2026-09-01&until=2026-10-16&test_name=facebook_messenger) | 6,385 | 86.2% | 13.7% | 0.1% |
| [Psiphon](https://api.ooni.org/api/v1/aggregation?probe_cc=IR&since=2026-09-01&until=2026-10-16&test_name=psiphon) | 6,191 | 77.4% | 22.5% | 0.1% |
| [Tor (default test)](https://api.ooni.org/api/v1/aggregation?probe_cc=IR&since=2026-09-01&until=2026-10-16&test_name=tor) | 6,001 | 21.8% | 78.1% | 0.1% |

OONI's Signal test checks whether a TLS connection and an HTTP GET request to Signal's server backends succeed, and its page does not mention proxies ([OONI](https://ooni.org/nettest/signal/)). Its Tor test page lists only Tor directory authorities and obfs4 bridges and does not mention WebTunnel or Snowflake, so the 78.1% OK figure appears to describe default Tor reachability ([OONI](https://ooni.org/nettest/tor/)). Its Psiphon test starts a Psiphon tunnel with Psiphon's code, then tries to fetch a web page, and it reports failure if the tunnel does not start or cannot fetch ([OONI](https://ooni.org/nettest/psiphon/)).

---

## The law, and where sources disagree

**VPNs.** Freedom House says the Supreme Council of Cyberspace "officially prohibited the use of VPNs without obtaining a license" in February 2024, "after criminalizing the sale and distribution of these tools earlier in 2023," and that some analysts say it overstepped its authority by prohibiting use ([Freedom House, 2024](https://freedomhouse.org/country/iran/freedom-net/2024)). Filterwatch's legal analysis, titled "The use of VPNs is prohibited, but not criminalized," says the prohibition "does not equate to the criminalization of VPN use" ([Filterwatch, 4 March 2024](https://filter.watch/english/2024/03/04/the-use-of-vpns-is-prohibited-but-not-criminalized/)). On sale and distribution the two disagree as well: Filterwatch says "the production, sale, and use of tools for circumventing filtering have not been defined as crimes in the law" ([Filterwatch, 4 March 2024](https://filter.watch/english/2024/03/04/the-use-of-vpns-is-prohibited-but-not-criminalized/)). Filterwatch wrote this before the 2025 Espionage Law and the 2026 shutdowns ([Amnesty Report 2025/26](https://www.amnesty.org/en/location/middle-east-and-north-africa/middle-east/iran/report-iran/)). The research found no resolution.

**2026 threats.** Amnesty reports text messages from police, the Ministry of Intelligence and the IRGC threatening VPN and satellite users with "arrest, prosecution, asset seizures, and other punishments under the Espionage Law, which provides for the death penalty" ([Amnesty](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)).

**Arrests and convictions.** Arrests over satellite gear and circumvention tools are reported. Article 19 says Iranians "are being arrested and tortured for the use of Starlink and circumvention tools", that state media reported "multiple cases of people being arrested for selling and possessing Starlink terminals", and that Hesam Alaeeddin, "detained in Teheran over alleged use of Starlink equipment, died after being severely beaten by government agents" ([Article 19, 19 May 2026, archived copy](https://web.archive.org/web/20260527070834/https://www.article19.org/resources/iran-stop-repression-of-people-seeking-internet-access/)). Amnesty's account of the same death differs: its source says he was arrested in April 2026 while seeking information about his brother, who had been detained over alleged possession of a Starlink device, and that he died in suspicious circumstances in detention ([Amnesty, 28 May 2026](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)). Amnesty also says the threatening texts went to "individuals, identified through their digital activity, who circumvent internet restrictions", and that they referenced "IP addresses, VPN or satellite internet use" ([Amnesty](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)). The UN Fact-Finding Mission describes convictions "based on information contained on their private phones confiscated by security forces and on their social media posts" ([UN Fact-Finding Mission, 13 March 2026](https://www.ohchr.org/sites/default/files/documents/hrbodies/hrcouncil/sessions-regular/session61/ahrc61crp-2.pdf)). Against that evidence, no source found for this guide documents a conviction for VPN use alone, or says whether anyone was arrested for a VPN app alone. That reflects the sources found, and other cases may exist.

**Scale.** These counts come from the authorities or from human-rights groups and cannot be checked here. Amnesty reports that Iran's police chief announced on 17 May 2026 that more than 6,500 "traitors and spies" had been arrested since 28 February 2026. Amnesty's own figures for the same period are more than 6,000 people arbitrarily arrested and "at least 39 political executions" ([Amnesty, 28 May 2026](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)). Amnesty's annual report says authorities announced the arrests of 21,000 people in August 2025 in relation to the conflict with Israel, and that "the highest number of executions since 1989 was recorded" in its 2025 entry ([Amnesty Report 2025/26](https://www.amnesty.org/en/location/middle-east-and-north-africa/middle-east/iran/report-iran/)). No source found counts arrests specifically for circumvention tools.

**Starlink and satellite gear.** Sources give different penalties, and two attach death to other triggers:

- UN mission: Article 5 of the 2025 espionage law covers the "use, possession, purchase, sale, or importation of unlicensed electronic or satellite internet communication tools, such as Starlink," so it is not limited to Starlink. The default punishments are "long prison terms." Death may be imposed if the person "is considered an enemy agent," a term the law does not define, and when the conduct is found to be "corruption on earth" it carries the death penalty ([UN](https://www.ohchr.org/sites/default/files/documents/hrbodies/hrcouncil/sessions-regular/session61/ahrc61crp-2.pdf)).
- Article 19: in 2025, two years in prison for using, buying or selling terminals, 10 years or more for importing or distributing ([Article 19, archived copy](https://web.archive.org/web/20260527070834/https://www.article19.org/resources/iran-stop-repression-of-people-seeking-internet-access/)).
- Al Jazeera: baseline sentences "between six months and two years" for using or possessing, up to five years for importing and distributing. If paired with national security or espionage charges, individuals can face the death penalty ([Al Jazeera](https://www.aljazeera.com/news/2026/10/14/iran-targets-starlink-as-tool-of-war-with-hints-at-internet-restrictions)).
- Amnesty: the Ministry of Intelligence said on 17 March 2026 that acquiring or using such systems is "a criminal offence punishable by death" ([Amnesty](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)).

**Sending information abroad.** The UN mission says Article 4 of the 2025 espionage law criminalizes sending "videos, images, or information to foreign media networks" or "hostile virtual [digital] pages," if contrary to national security, with long prison terms "in the absence of more severe punishment". It says a separate clause of Article 4, on publishing content that causes public fear or acts against national security, carries the death penalty if the conduct amounts to "corruption on earth" ([UN](https://www.ohchr.org/sites/default/files/documents/hrbodies/hrcouncil/sessions-regular/session61/ahrc61crp-2.pdf)). Amnesty reads the law as prescribing "the death penalty for peaceful activities, including sending information to journalists abroad" ([Amnesty Report 2025/26](https://www.amnesty.org/en/location/middle-east-and-north-africa/middle-east/iran/report-iran/)). CPJ reports that in July 2026 Iran's Intelligence Ministry published a list of "hostile" media outlets, including BBC Persian and Voice of America, "and journalists", warning that giving them information or interviews could lead to prosecution under the espionage law ([CPJ, 27 August 2026](https://cpj.org/2026/08/the-cost-of-truth-inside-irans-mounting-media-crackdown/)). The UN mission notes the law tells the Ministry to publish which outlets it considers "hostile" and that it had not yet done so ([UN](https://www.ohchr.org/sites/default/files/documents/hrbodies/hrcouncil/sessions-regular/session61/ahrc61crp-2.pdf)).

---

## What the state can see and do

Each item is attributed and dated. None says what any one person's risk is.

- **Phones are searched.** HRW reports armed agents "routinely stopping vehicles and searching cars and passengers' mobile phones" ([HRW, 24 February 2026](https://www.hrw.org/news/2026/02/24/iran-tsunami-of-arbitrary-arrests-enforced-disappearances)). On 2 September 2025 Amnesty and HRW said that authorities "have conducted invasive vehicle and mobile phone searches, arresting people for 'collaborating' with Israel, often based merely on social media posts on their phones, according to state media reports" ([HRW, 2 September 2025](https://www.hrw.org/news/2025/09/02/iran-authorities-unleash-wave-of-oppression-after-hostilities-with-israel)). The UN mission links convictions to information on confiscated phones (law section above). No source found says which extraction tools are used.
- **SIMs are tied to identity.** Buying a SIM requires real-name registration with a passport or identifying documents ([Freedom House, 2024](https://freedomhouse.org/country/iran/freedom-net/2024)). Documents sent to The Intercept and shared with Citizen Lab in October 2022 appear to be plans for a mobile network. Citizen Lab says the regulator "aims to" use the system to "allow or deny a user's access to mobile services, and view historical voice, SMS, and data usage," and that the regulator's rules require operators to give it direct access to their systems. Whether it is deployed as described is not shown ([Citizen Lab, 16 January 2023](https://citizenlab.ca/research/uncovering-irans-mobile-legal-intercept-system/)).
- **Fake cell towers.** Filterwatch reported in April 2025 that devices which "impersonate legitimate telecom towers" and capture a phone's IMSI (its SIM identifier) cover, by its studies, 30 to 35 square kilometers of central Isfahan. It says these devices, surveillance cameras, access to government databases and telecom operators' cooperation together form a system used to identify, track and intimidate women over dress, including by threatening texts ([Filterwatch, 17 April 2025](https://filter.watch/english/2025/04/17/investigated-report-isfahan-targeted-with-imsi-catchers-and-surveillance-cameras/)).
- **SIMs are cut as punishment.** Filterwatch lists SIM blocks against journalists, political and civil activists, and also against Instagram users, fashion workers and women in Isfahan who did not observe mandatory hijab. For some groups, restoring service was conditional on removing content, posting pro-government content, or signing a written undertaking ([Filterwatch, 15 October 2026](https://filter.watch/english/2026/10/15/cyber-threat-intelligence-report-march-to-september-2026/)). Amnesty says threatening texts warned of blocking cell phone services and SIM cards ([Amnesty](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)).
- **Spyware.** Miaan's July 2025 report says: "For the first time, three Iranian victims of mercenary spyware were identified." It describes three cyberattacks in May 2025, two in Iran and one in Europe ([Miaan, July 2025](https://miaan.org/wp-content/uploads/2025/07/Iran-Cyber-Threat-Intelligence-Report_-Wartime-Cyber-Crackdown-and-the-Emergence-of-Mercenary-Spyware-Attacks.pdf)).
- **Fake apps and voice-clone phishing.** Fake VPN and Starlink-themed apps are covered in the next section. Filterwatch also reports attackers using AI-generated or manipulated audio of trusted people, in some cases to steal Telegram authentication codes ([Filterwatch, 15 October 2026](https://filter.watch/english/2026/10/15/cyber-threat-intelligence-report-march-to-september-2026/)).

### Fake VPNs and malicious apps

Filterwatch's report covers 22 March to 22 September 2026 and draws on cases recorded by the Digital Security Helpline. These percentages are shares of the helpline's recorded cases and attack classifications. They do not measure how common any attack is in Iran. The report found phishing in 47.1% of recorded attack classifications. Telegram appeared in 51.5% of the cases; its uses included "fraudulent VPN sales". Malicious Android apps were pushed with pretexts such as "access to the open internet". In one of the three malware cases the report describes, the Starlink/VPN case, "the attacker exploited the need of users inside Iran for tools to circumvent internet restrictions." Two samples had Android manifests that could be examined. Their permissions could enable reading SMS and authentication codes, and the report adds that the permissions "alone" do not prove those capabilities were used ([Filterwatch, 15 October 2026](https://filter.watch/english/2026/10/15/cyber-threat-intelligence-report-march-to-september-2026/)).

- Lookout found four samples of DCHSpy spyware, reported by The Hacker News on 21 July 2025. The report says they are suspected to be passed off as Earth VPN, Comodo VPN and Hide VPN. One Earth VPN sample was distributed as a file named "starlink_vpn(1.3.0)-3012 (1).apk", which it says indicates Starlink-related lures ([The Hacker News](https://thehackernews.com/2025/07/iran-linked-dchspy-android-malware.html)).
- Recorded Future, in a report that refers to the conflict subsiding "since April 2026", says it is "highly likely" that TAG-182 targets Iranians inside and outside the country with lures including "free download tools and fake VPN applications" ([Recorded Future](https://www.recordedfuture.com/research/nexus-tag182-disseminates-markirat)).
- A Citizen Lab and Arizona State University paper on Google Play VPN apps found that for two of the three app families it studied, the clients share hard-coded Shadowsocks passwords, which would let an attacker decrypt the traffic of all their clients. The paper does not study Iran ([FOCI 2025](https://www.petsymposium.org/foci/2025/foci-2025-0008.pdf)).

---

## Kinds of tool

These groupings are this guide's own, built from the tools' documents.

1. **Tor with bridges.** Bridges are relays "not listed publicly, so an adversary cannot identify them easily." Tor lists four disguises: obfs4 "makes Tor traffic look random", meek makes it "look like you are browsing a major web site", Snowflake makes it "look like you're placing a video call", and WebTunnel makes it "appear as if you're accessing a website via HTTPS" ([Tor Project](https://support.torproject.org/tor-browser/circumvention/unblocking-tor/)).
2. **Proxy apps that act like a VPN** (Psiphon, Lantern). Psiphon says it is "built to keep working even where VPNs are actively blocked" and "is not a full anonymity tool" ([Psiphon FAQ](https://psiphon.ca/en/faq.html)).
3. **Volunteer bridges.** People abroad run a proxy and users inside connect through it: Psiphon calls it Conduit ([Psiphon blog](https://blog.psiphon.ca/2026/04/09/psiphon-network-building-the-infrastructure-of-internet-freedom/)), Lantern calls it "Action Mode" ([Lantern FAQ](https://lantern.io/faq)).
4. **Private-server proxies** (Outline, Xray and V2Ray configs, Signal's proxy). Someone runs a server and shares a key or link. Outline says a censor cannot easily list such servers like public VPN servers ([Outline FAQ](https://getoutline.org/en-GB/faq/)). A link from a stranger routes your traffic through the stranger's server.
5. **Commercial VPNs** (Proton VPN is the one with a source here). They need an account and app first. Proton's page for China, written for people travelling there, says "the single most effective measure you can take is to set up Proton VPN before you arrive" ([Proton](https://protonvpn.com/support/does-protonvpn-work-in-china)).

### What the evidence says about Iran

- **Tor.** Tor's blocked-countries page covers China, Russia, Turkmenistan and Belarus, with no Iran section ([Tor Project](https://support.torproject.org/tor-browser/circumvention/connecting-from-censored-regions/)). On the Tor forum a user wrote on 2 February 2026 that no connection method worked in Iran, while a Tor team member said on 29 January that censorship was back to the "normal" level, and on 20 April that dnstt (a DNS tunnel) "seems to work (yes, it is very slow)" ([Tor forum](https://forum.torproject.org/t/tor-not-working-in-iran/21144)). A staff-flagged post on 9 September 2026 said "Many people in Iran are currently using Tor applications successfully" and gave no figures or transport. In the same thread a user who said they live in Iran wrote on 4 June that Tor "doesn't connect anymore" and that it had not connected for about two years, and a Snowflake proxy volunteer wrote on 6 October that 5 October was "a bad day for Iran", and later edited that his method of counting timeouts was flawed ([Tor forum](https://forum.torproject.org/t/21688)). Tor Metrics modelled estimates for Iran, 25 September to 15 October 2026: direct users fell from about 78,900 to 49,100 (the last point has low coverage) ([Tor Metrics, relay users](https://metrics.torproject.org/userstats-relay-country.csv?country=ir)). In the bridge file, WebTunnel users rose from about 5,900 to 9,400 and obfs4 users from a range of about 9,600 to 11,700 to a range of about 16,000 to 18,300. Snowflake moved from about 2,400 to 2,700 ([Tor Metrics, bridge users](https://metrics.torproject.org/userstats-bridge-combined.csv?country=ir)).
- **Psiphon.** Psiphon says it recorded "more than 9.5 million unique daily users inside the country" on 30 January 2026, which is the vendor's own claim ([Psiphon blog](https://blog.psiphon.ca/2026/06/16/to-russians-with-love/)). OONI's Psiphon test in Iran was 71.8% anomalous from 28 to 31 January 2026 (567 measurements) ([OONI API](https://api.ooni.org/api/v1/aggregation?probe_cc=IR&test_name=psiphon&since=2026-01-28&until=2026-02-01)) and 77.4% anomalous from 1 September to 15 October (table above). OONI's test starts a Psiphon tunnel and tries to fetch a web page; an anomalous result is not proof of blocking ([OONI](https://ooni.org/nettest/psiphon/); [OONI FAQ](https://ooni.org/support/faq/)). A preprint on the January 2026 shutdown, which dates the nationwide total shutdown 8 to 18 January (Al Jazeera counts three weeks), found that "none of the circumvention techniques based on common Internet connectivity could work" ([arXiv, 30 March 2026](https://arxiv.org/html/2603.28753v1)). Psiphon's claim, the preprint and OONI cover different days, and the research does not resolve them.
- **Proton, Mullvad, Lantern, Outline, Xray.** No primary source found says whether any currently works in Iran. Freedom House reported NordVPN, Proton VPN and TunnelBear all inaccessible in its 2023-24 coverage period ([Freedom House, 2024](https://freedomhouse.org/country/iran/freedom-net/2024)).
- **Full shutdown.** Filterwatch heard of VPNs that showed "connected" but passed no data ([Filterwatch, March 2026](https://filter.watch/wp-content/uploads/sites/2/2026/03/Resilience-Amid-Isolation-in-Irans-2026-Shutdown.pdf)). The same report says "a few protocols and proxy platforms had minor successes" and that Napsternet proxy configurations were frequently mentioned, while the proxies' security status was unclear ([Filterwatch, March 2026](https://filter.watch/wp-content/uploads/sites/2/2026/03/Resilience-Amid-Isolation-in-Irans-2026-Shutdown.pdf)).

### Named tools

The research confirmed that the audit reports exist and when, and did not read their findings. "No logs" lines are vendor claims.

| Tool | Cost, licence | Audit on record | Release in notes |
|---|---|---|---|
| Tor Browser, Snowflake, WebTunnel | Free, volunteer-run ([Snowflake](https://snowflake.torproject.org/)) | Cure53, Jan to Feb 2024: censorship circumvention tools (Snowflake and WebTunnel among them) and UI changes in Tor Browser, plus OnionShare. It did not cover all of Tor Browser ([PDF](https://www.torproject.org/static/findoc/code_audits/Cure53_audit_jan_2024.pdf)) | Tor Browser 15.0.25, 2026-10-12 ([dist](https://dist.torproject.org/torbrowser/15.0.25/)); Snowflake v2.15.1, 2026-10-07 ([GitLab](https://gitlab.torproject.org/tpo/anti-censorship/pluggable-transports/snowflake/-/releases)) |
| Orbot (Tor for phones) | Free, BSD-3-Clause ([Guardian Project](https://guardianproject.info/apps/org.torproject.android/)) | None located | Recent GitHub tags are release candidates and betas, the newest 17.9.7-RC-1 (2026-10-09). This guide did not confirm which build the Guardian Project page, F-Droid or Google Play serves, so check the version it shows against Guardian Project's page ([GitHub releases](https://github.com/guardianproject/orbot-android/releases)) |
| Psiphon | Open source, GPL-3.0 per GitHub ([Trust Center](https://psiphon.ca/en/trust-center.html); [GitHub](https://github.com/Psiphon-Labs/psiphon-tunnel-core)). Some versions are paid subscriptions ([Psiphon FAQ](https://psiphon.ca/en/faq.html)) | Newest listed: Cure53, May 2024, of the tunnel core and a Conduit integration codebase ([Trust Center](https://psiphon.ca/en/trust-center.html)) | Tunnel core v2.0.41, 2026-09-01 ([releases](https://github.com/Psiphon-Labs/psiphon-tunnel-core/releases)); Conduit CLI 2.1.0, 2026-09-30 ([releases](https://github.com/Psiphon-Inc/conduit/releases)) |
| Lantern | Free tier with a daily data cap, optional Pro, open source, GPL-3.0 per GitHub ([FAQ](https://lantern.io/faq); [GitHub](https://github.com/getlantern/lantern)) | NCC Group 2020, re-checked winter 2022; newer audit for v10 unconfirmed ([NCC](https://www.nccgroup.com/research/public-report-lantern-and-replica-security-assessment/)) | Newest non-beta v10 release: v10.0.0, 2026-09-18. Betas up to v10.0.3-beta-5 (2026-10-16) exist ([GitHub releases](https://github.com/getlantern/lantern/releases)) |
| Outline | Free, Apache-2.0 ([GitHub](https://github.com/OutlineFoundation/outline-apps)) | Cure53 audited the Outline SDK in January 2024. Earlier audits: 2018 and 2022 ([Outline](https://support.getoutline.org/about/security-and-privacy/)) | GitHub shows v1.10.1, 2023-03-20; store versions unconfirmed ([GitHub releases](https://github.com/OutlineFoundation/outline-apps/releases)) |

---

## Getting the software when stores and sites are blocked

Whether any route below is reachable from Iran today is unconfirmed. These are the routes the vendors provide.

Two sources bear on carrying these apps. EFF warns that "anyone who can see your network activity may notice that you are using Tor" ([EFF Surveillance Self-Defense](https://ssd.eff.org/module/understanding-and-circumventing-network-censorship)), and HRW reports armed agents "searching cars and passengers' mobile phones" ([HRW, 24 February 2026](https://www.hrw.org/news/2026/02/24/iran-tsunami-of-arbitrary-arrests-enforced-disappearances)). No source found says what happens when circumvention apps are found on a searched phone. See "Phones and accounts" below before you install.

- **Tor Browser.** "If it's blocked, use our official mirrors or GetTor." GetTor answers with links and a signature, through the Telegram bot @GetTor_Bot or by email to gettor@torproject.org ([Tor Project](https://support.torproject.org/tor-browser/getting-started/downloading/)). Tor's pages disagree on where the operating-system word goes: one says in the body of the message, with "windows", "osx", "linux" or "android" ([Tor Project](https://support.torproject.org/tor-browser/getting-started/downloading/)), the other says in the subject, with "windows", "macos", "linux" or "android" ([Tor Project](https://support.torproject.org/tor-browser/circumvention/connecting-from-censored-regions/)). OONI's Telegram test was mostly anomalous in Iran (table above), so the email routes may be the ones that reach you. Check each bot handle exactly against Tor's page. Access Now's guidance says attackers "could use lookalike email addresses or user names to impersonate people you know or support teams from services that you use," although the report is not about Iran ([Access Now](https://www.accessnow.org/wp-content/uploads/2026/04/Espionage-for-repression-forensic-analysis-of-a-cross-border-hack-for-hire-campaign-targeting-civil-society-in-MENA-2026.pdf)). This guide found no report of a fake GetTor bot. There is no Tor Browser for iOS, and Tor recommends Onion Browser, which has weaker protections ([Tor Project](https://support.torproject.org/tor-browser/getting-started/installing/)).
- **Bridges.** Message @GetBridgesBot on Telegram with /obfs4 or /webtunnel, email bridges@torproject.org from a Gmail or Riseup address, or use bridges.torproject.org ([Tor Project](https://support.torproject.org/tor-browser/circumvention/getting-bridges/)).
- **Psiphon.** Send a blank email to get@psiphon3.com. Psiphon warns that "Many email providers block executable attachments, so the file may not arrive" ([Psiphon FAQ](https://psiphon.ca/en/faq.html)).
- **Lantern.** GitHub releases, or a blank email to download@lantern.io ([Lantern FAQ](https://lantern.io/faq)).
- **Signal.** The APK is published with its signing-certificate fingerprint, and Signal says "Most users should not do this under normal circumstances" ([Signal](https://signal.org/android/apk/)).
- **Briar.** "Share this app offline" makes a hotspot without internet that a nearby phone can download the app from ([Briar](https://briarproject.org/quick-start/)).

No source covers how to verify a file a friend sends you.

---

## Messaging, and its real limits

**Signal.** Signal said "Signal is currently blocked in Iran" in September 2022 ([Signal blog](https://signal.org/blog/run-a-proxy/)). Its help page now says: "If Signal is blocked in your country, use a proxy to get started with and continue using Signal. All traffic remains opaque to the proxy operator" ([Signal Support](https://support.signal.org/hc/en-us/articles/360056052052-Proxy-Support)). Limits:

- Signal Desktop has no proxy. The page says "The technique used for your phone is currently not possible" ([Signal Support](https://support.signal.org/hc/en-us/articles/360056052052-Proxy-Support)).
- No dated source shows that a Signal proxy currently works in Iran. OONI's direct Signal test was 96.0% anomalous (table above) and its page does not mention proxies ([OONI](https://ooni.org/nettest/signal/)).
- A proxy needs a route to the proxy server. Signal's pages do not claim it works during a full shutdown ([Signal Support](https://support.signal.org/hc/en-us/articles/360056052052-Proxy-Support)).
- Registering needs a number that "must be able to receive an insecure SMS or phone call" ([Signal Support](https://support.signal.org/hc/en-us/articles/360007318691-Register-a-phone-number)), and so does re-registering ([Signal Support](https://support.signal.org/hc/en-us/articles/360007318111-Can-I-use-Signal-when-I-travel)). No source found measures whether SMS arrives in Iran during shutdowns. Phone service itself was affected in January ([Wikipedia](https://en.wikipedia.org/wiki/2026_Internet_blackout_in_Iran)).

See also [Signal vs SimpleX](/guides/signal-vs-simplex).

**Briar.** It syncs directly between devices and "can sync via Bluetooth, Wi-Fi or memory cards" if the internet is down ([Briar](https://briarproject.org/how-it-works/)). Limits:

- The phone app is Android only; the manual describes Android installs ([Briar manual](https://briarproject.org/manual/)). A desktop beta exists for Linux, Windows and macOS, latest 0.6.5-beta of 20 February 2026 ([Briar](https://briarproject.org/download-briar-desktop/)).
- Range is "around 10 metres", and Briar "will only synchronize messages with your contacts, not with nearby strangers" ([Briar quick start](https://briarproject.org/quick-start/)).
- Adding a contact nearby takes a QR scan and a location permission ([Briar quick start](https://briarproject.org/quick-start/)). Adding one at a distance needs the internet ([Briar manual](https://briarproject.org/manual/)). Contacts are something to add in person before a blackout.
- On 9 July 2026 Briar announced maintenance mode: "the project is still active but we're only making essential security updates and bugfixes for now." Its known issues include "high battery usage and unreliable background operation on Android" ([Briar news](https://briarproject.org/news/2026-maintenance-mode/)).
- "If you uninstall Briar or forget your password, there's no way to recover your account" ([Briar manual](https://briarproject.org/manual/)).
- No source found shows whether Briar's internet mode, which uses Tor, works in Iran now.

**Delta Chat.** A Filterwatch report of 10 March 2026, described as a collaboration between Miaan, ASL19, Kentik, IODA, Cloudflare, Holistic Resilience and DeltaChat, says it "remains one of the main functional tools, with servers inside the country allowing users to communicate securely within Iran" ([Filterwatch, 10 March 2026](https://filter.watch/english/2026/03/10/investigative-report-irans-strategic-internet-shutdown-of-february-28/)). DeltaChat is named as a collaborator on that report, and the report is seven months old. Whether its relays are blocked is unconfirmed.

**Session, SimpleX, Bridgefy.** Session says "You don't need a mobile number or an email to make an account" ([Session FAQ](https://getsession.org/faq)), but its foundation said in April 2026 that donations covered essential infrastructure for three months ([CyberInsider](https://cyberinsider.com/session-says-funding-will-last-until-july-pauses-development/)). Session's own post of 13 October 2026 says it "is currently raising funds to help deploy Protocol v2" and lists releases shipped in October 2026: iOS 2.15.5, Android 1.33.6 and Desktop 1.18.2 ([Session](https://getsession.org/blog/session-protocol-v2-update)). Researchers analysing Bridgefy in 2021 wrote that "Bridgefy, as analysed, permitted its users to be tracked, offered no authenticity, no effective confidentiality protections" ([ePrint 2021/214](https://eprint.iacr.org/2021/214)). No source found says whether Iran blocks Session or SimpleX.

---

## News: onion mirrors

These outlets send an "onion-location" header that points Tor Browser to a Tor address. The research checked the headers on 2026-10-17. Check each address against the outlet's own page before relying on it.

| Outlet | Onion address, checked 2026-10-17 | Page checked |
|---|---|---|
| BBC (Persian) | `https://www.bbcweb3hytmzhn5d532owbu6oqadra5z3ar726vq5kgwwn6aucdccrad.onion/persian` | [bbc.com/persian](https://www.bbc.com/persian) |
| DW (Persian) | `http://www.dwnewsgngmhlplxy6o2twtfgjnrnjxbegbwqx6wnotdhkzt562tszfid.onion/fa-ir/` | [dw.com/fa-ir](https://www.dw.com/fa-ir/) |
| Radio Farda | `https://www.farda7tcb3bmdtmsmwx7wofkxxjrcw4iiizin7zzcju2oega74cnzbid.onion/` | [radiofarda.com](https://www.radiofarda.com) |

DW says that in Tor Browser, typing dw.com makes the browser offer the onion address ([DW](https://www.dw.com/en/deutsche-welle-websites-accessible-via-tor-protocol/a-51338328)). RSF says it built a mirror site for BBC Persian that Iranians can reach "without having to use a VPN or a special browser such as Tor". The page is dated 19 December 2023, and RSF says that if the government blocks the links it can create new ones ([RSF](https://rsf.org/en/bbc-news-persian-can-be-accessed-again-online-iran-thanks-rsf-mirror-site)).

---

## Before a blackout

Each item ties to a source above and has a limit. No source found says what happens when circumvention apps are found on a searched phone (see the note under "Getting the software"), and "Phones and accounts" below covers what sources exist.

1. **Install and register Signal while the network works.** Re-registering needs SMS or a call ([Signal Support](https://support.signal.org/hc/en-us/articles/360007318111-Can-I-use-Signal-when-I-travel)).
2. **Save more than one Signal proxy link from people you trust.** Signal says to share them privately where possible ([Signal Support](https://support.signal.org/hc/en-us/articles/360056052052-Proxy-Support)). No dated source shows that a Signal proxy currently works in Iran.
3. **Install Tor Browser and test a bridge type while the network works.** Tools that need ordinary connectivity did not work in the 2026 shutdown ([arXiv](https://arxiv.org/html/2603.28753v1)).
4. **Keep a second circumvention tool, and add Briar contacts in person.** Reports above show tools fail on some networks and weeks and work on others, and Briar syncs only with contacts ([Briar quick start](https://briarproject.org/quick-start/)).
5. **Download offline material.** Persian Wikipedia is on the Kiwix server in sizes from 2.4 GB to 13 GB in the October 2026 builds ([Kiwix](https://download.kiwix.org/zim/wikipedia/)). Organic Maps is an offline maps app ([Organic Maps](https://organicmaps.app/)).
6. **Save the onion addresses above.**

---

## Phones and accounts

No Iran-specific guide on hiding apps or protecting a phone at a checkpoint from Amnesty, HRW, Access Now, Article 19 or CPJ turned up. That gap exists, and this guide does not fill it with its own tips. Two general sources do exist.

- Security in a Box (Front Line Defenders and Tactical Tech), "What to do when you risk being arrested", 2025-09-10: remove apps with sensitive information, and "If you don't want or cannot delete these apps, consider hiding them"; avoid biometrics; use "at least a 6-digit PIN"; enable disappearing messages ([Security in a Box](https://securityinabox.org/en/blog/2025-09-detentions/index.html)). It was not written for Iran and does not discuss whether deleting apps could look suspicious.
- EFF Surveillance Self-Defense warns that running OONI Probe "can put you at risk because whoever runs your network will know you're running the software", and that "anyone who can see your network activity may notice that you are using Tor" ([EFF SSD](https://ssd.eff.org/module/understanding-and-circumventing-network-censorship)).

---

## If you are outside Iran and contact people inside

Only sourced facts are included.

- Amnesty reports arrests "based on social media posts and/or contact with journalists abroad" ([Amnesty Report 2025/26](https://www.amnesty.org/en/location/middle-east-and-north-africa/middle-east/iran/report-iran/)), and text messages saying that photographing areas damaged in air strikes and sharing such content with media or online platforms is "collaborating with the enemy" ([Amnesty](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)).
- Authorities took "punitive measures against the families of journalists, dissidents, protesters and human rights defenders based outside Iran" ([Amnesty Report 2025/26](https://www.amnesty.org/en/location/middle-east-and-north-africa/middle-east/iran/report-iran/)).
- Impersonation is documented. Attackers copy a trusted person's name and photo, then send "a link disguised as an invitation to a meeting" that collects a Telegram code. Nearly 16% of cases involved activists, journalists and organisations based abroad. The report's guidance: two-factor authentication, reviewing active sessions, and verifying identities "through an independent communication channel" ([Filterwatch, 15 October 2026](https://filter.watch/english/2026/10/15/cyber-threat-intelligence-report-march-to-september-2026/)).

---

## Where to get help

**Read this before you contact anyone from inside Iran.** No source checked says which route is safest from inside Iran. Plain email, and Telegram or WhatsApp handles, may be seen or impersonated, as the sources below show. Both organisations below publish a PGP key for email ([Access Now](https://www.accessnow.org/help/); [Miaan](https://miaan.org/projects/miaan-digital-security-helpdesk/)). OONI's Telegram and WhatsApp tests were mostly anomalous in Iran (table above). Filterwatch reports that Telegram was the most frequently recorded platform in attacks, with account and channel impersonation among its uses, and that attackers impersonated civil society organisations ([Filterwatch, 15 October 2026](https://filter.watch/english/2026/10/15/cyber-threat-intelligence-report-march-to-september-2026/)). Access Now warns that attackers "could use lookalike email addresses or user names to impersonate people you know or support teams from services that you use" ([Access Now](https://www.accessnow.org/wp-content/uploads/2026/04/Espionage-for-repression-forensic-analysis-of-a-cross-border-hack-for-hire-campaign-targeting-civil-society-in-MENA-2026.pdf)). No source found documents a fake digital-security helpline specifically, so treat a helpline handle that reaches you in a message the way those sources treat any impersonation. Get handles only from the organisation's own site.

**Access Now Digital Security Helpline.** "Our 24/7 services are available with support in ten languages: English, Spanish, French, German, Portuguese, Russian, Tagalog, Arabic, Italian, and Ukrainian. We respond to all requests within two hours." It is a "free-of-charge resource for civil society", serving "civil society groups & activists, media organizations, journalists & bloggers, and human rights defenders". Email help@accessnow.org; the PGP fingerprint on the page is 6CE6 221C 98EC F399 A04C 41B8 C46B ED33 32E8 A2BC. Persian is not in that list ([Access Now](https://www.accessnow.org/help/)).

**Miaan Digital Security Helpdesk.** Miaan's own page (fetched live on 2026-10-17, and matching an archived snapshot of 2025-12-31) says it is "Available in Persian and English", and lists Signal and WhatsApp at +46 766 860 503, Telegram @miaan_helpline_bot and helpdesk[at]miaan.org ([Miaan](https://miaan.org/projects/miaan-digital-security-helpdesk/); [archive snapshot](https://web.archive.org/web/20251231192448/https://miaan.org/projects/miaan-digital-security-helpdesk/)). Get the handle from miaan.org itself. Impersonation of trusted people and organisations is documented (see "If you are outside Iran").

---

## Wider than Iran

Freedom on the Net 2025 (country pages published 2025-11-12, covering 1 June 2024 to 31 May 2025) scores countries from 0 (least free) to 100. All five below are "Not Free."

- **China, 9.** "People face severe legal and extralegal repercussions for online activities like ... communicating with family members and others overseas" ([Freedom House](https://freedomhouse.org/country/china/freedom-net/2025)).
- **Russia, 17.** Roskomnadzor ordered Signal blocked in August 2024 and Viber in December 2024 ([Freedom House](https://freedomhouse.org/country/russia/freedom-net/2025)).
- **Turkey, 31.** Social media access was throttled for 42 hours during protests in March 2025 ([Freedom House](https://freedomhouse.org/country/turkey/freedom-net/2025)).
- **Myanmar, 9.** Authorities blocked Signal and major VPNs in June and July 2024 ([Freedom House](https://freedomhouse.org/country/myanmar/freedom-net/2025)).
- **Iran, 13**, for a period that ends before the 2026 shutdowns ([Freedom House](https://freedomhouse.org/country/iran/freedom-net/2025)).

These are one-line facts from a score report and carry no advice for those countries.

---

## Persian-language availability

Existence only. The research did not check how complete each translation is.

| Item | Persian found | Source |
|---|---|---|
| Signal | App strings and a Persian proxy article | [Signal Support](https://support.signal.org/hc/fa/articles/360056052052) |
| Briar | Persian manual link, Android strings | [Briar manual](https://briarproject.org/manual/) |
| Delta Chat | Android, iOS and desktop strings | [Android](https://github.com/deltachat/deltachat-android/tree/main/src/main/res/values-fa), [iOS](https://github.com/deltachat/deltachat-ios/tree/main/deltachat-ios/fa.lproj), [desktop](https://github.com/deltachat/deltachat-desktop/blob/main/_locales/fa.xml) |
| Session, SimpleX | Android strings (Session); app resources (SimpleX) | [session-android](https://github.com/session-foundation/session-android/tree/dev/app/src/main/res/values-b+fa+IR) |
| Tor support site | Yes; Tor Browser's own languages unconfirmed | [Tor Project](https://support.torproject.org/tor-browser/circumvention/unblocking-tor/) |
| Psiphon site | Persian and Dari | [Psiphon](https://psiphon.ca/en/download.html) |
| Tails docs | None on the pages checked | [Tails](https://tails.net/doc/about/requirements/index.en.html) |
| EFF Surveillance Self-Defense | None on the translations page fetched | [EFF SSD](https://ssd.eff.org/en/other-translations) |
| Access Now helpline | Not in its language list | [Access Now](https://www.accessnow.org/help/) |
| Miaan helpdesk | Yes (live page and archive snapshot) | [Miaan](https://web.archive.org/web/20251231192448/https://miaan.org/projects/miaan-digital-security-helpdesk/) |

---

## FAQ

**Is using a VPN illegal in Iran?**

The sources disagree. Freedom House reports a February 2024 prohibition of unlicensed VPNs and says sale and distribution were criminalized in 2023 ([Freedom House](https://freedomhouse.org/country/iran/freedom-net/2024)). Filterwatch, in March 2024, says use is "prohibited, but not criminalized" and that production, sale and use "have not been defined as crimes in the law", before the 2025 Espionage Law and the 2026 events ([Filterwatch](https://filter.watch/english/2024/03/04/the-use-of-vpns-is-prohibited-but-not-criminalized/)). In 2026 authorities texted people identified through their digital activity, citing IP addresses and VPN use, with threats of arrest ([Amnesty](https://www.amnesty.org/en/latest/news/2026/05/iran-mass-arbitrary-arrests-and-political-executions-mark-intensifying-repression/)). Article 19 says people are being arrested and tortured for using Starlink and circumvention tools ([Article 19, archived copy](https://web.archive.org/web/20260527070834/https://www.article19.org/resources/iran-stop-repression-of-people-seeking-internet-access/)). No source found documents a conviction for VPN use alone.

**Which tool works in Iran?**

No source says one tool works everywhere. Tor Metrics modelled estimates show obfs4 and WebTunnel users rising and direct users falling from 25 September to 15 October 2026, and estimates of users are not evidence that a bridge works for you ([Tor Metrics](https://metrics.torproject.org/userstats-bridge-combined.csv?country=ir)). Psiphon says it had more than 9.5 million daily users inside Iran on 30 January 2026 ([Psiphon](https://blog.psiphon.ca/2026/06/16/to-russians-with-love/)). OONI's Psiphon test was 71.8% anomalous on 28 to 31 January 2026 and 77.4% anomalous from 1 September to 15 October, and an anomaly is not proof of blocking ([OONI](https://api.ooni.org/api/v1/aggregation?probe_cc=IR&test_name=psiphon&since=2026-01-28&until=2026-02-01); [OONI FAQ](https://ooni.org/support/faq/)). Try more than one and expect change.

**Can I trust a VPN app I found on Telegram?**

The sources point the other way. Filterwatch reports malicious apps pushed over Telegram that exploited the need for circumvention tools, in cases its helpline recorded ([Filterwatch](https://filter.watch/english/2026/10/15/cyber-threat-intelligence-report-march-to-september-2026/)).

**Should I get Starlink?**

This guide does not recommend it. Reported penalties run from months in prison to death, depending on the source and the charge: Al Jazeera says death is possible if Starlink use is paired with national security or espionage charges, and the UN mission names "enemy agent" and "corruption on earth" as triggers (law section above). An Iranian official said "We have several systems for cutting off Starlink satellite terminals" ([Al Jazeera](https://www.aljazeera.com/news/2026/10/14/iran-targets-starlink-as-tool-of-war-with-hints-at-internet-restrictions)).

---

## Keep reading

- [Signal vs SimpleX](/guides/signal-vs-simplex)
- [How to build your threat model](/guides/how-to-build-your-threat-model)
- [Apps without the Google Play Store](/guides/apps-without-the-google-play-store)
- [Private browsers compared](/guides/private-browsers-compared)
