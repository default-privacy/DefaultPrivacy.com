-- Directory Overhaul Apply SQL
-- Applies the agreed category decisions without deleting tools.
-- Run inside a transaction; COMMIT only after reviewing verification queries.

BEGIN;

-- 1) Visibility enum + column
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_visibility') THEN
    CREATE TYPE category_visibility AS ENUM ('public', 'archived', 'review');
  END IF;
END $$;

ALTER TABLE "categories"
  ADD COLUMN IF NOT EXISTS "visibility" category_visibility NOT NULL DEFAULT 'public';

CREATE INDEX IF NOT EXISTS "categories_visibility_idx" ON "categories" ("visibility");

-- 2) Ensure V1 parent categories exist (upsert by slug)
WITH parent_def(name, slug, description, sort_order) AS (
  VALUES
    ('Browser Privacy', 'browser-privacy', 'Browsers, extensions, and web browsing privacy.', 20),
    ('Data Privacy', 'data-privacy', 'Data brokers, opt-out, metadata removal, and personal data protection.', 30),
    ('De-Google', 'de-google', 'De-Googled replacements, app stores, and privacy-friendly frontends.', 35),
    ('Email', 'email', 'Encrypted and private email.', 40),
    ('Hardware', 'hardware', 'Phones, routers, and physical privacy gear.', 50),
    ('Identity and Anonymity', 'identity-and-anonymity', 'Identity protection, aliases, and anonymity tools.', 60),
    ('Mobile', 'mobile', 'Mobile OS and apps.', 70),
    ('Network Privacy', 'network-privacy', 'VPNs, DNS, firewalls, and network security.', 80),
    ('OSINT', 'osint', 'Open-source intelligence and investigation tools.', 90),
    ('Policy and Advocacy', 'policy-and-advocacy', 'Advocacy, policy, and research.', 100),
    ('Productivity and Work', 'productivity-and-work', 'Privacy-preserving productivity (not generic FOSS suites).', 110),
    ('Protection', 'protection', 'Malware, legal shield, asset protection, safety.', 120),
    ('Resources', 'resources', 'Books, podcasts, guides, and learning resources.', 130),
    ('Secure Payments', 'secure-payments', 'Crypto, banking, and private payments.', 140),
    ('Web Services', 'web-services', 'Hosting, messaging, search, and cloud services.', 150)
)
INSERT INTO "categories" (
  "id", "name", "slug", "label", "description", "parent_id", "sort_order", "visibility", "created_at", "updated_at"
)
SELECT
  'v1-parent-' || slug,
  name,
  slug,
  name,
  description,
  NULL,
  sort_order,
  'public'::category_visibility,
  NOW(),
  NOW()
FROM parent_def
ON CONFLICT ("slug") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "label" = EXCLUDED."label",
  "description" = EXCLUDED."description",
  "parent_id" = NULL,
  "sort_order" = EXCLUDED."sort_order",
  "visibility" = 'public'::category_visibility,
  "updated_at" = NOW();

-- 3) Map child categories under the 15 parent categories and set public visibility
WITH map(parent_slug, child_slug) AS (
  SELECT 'de-google', unnest(ARRAY['app-stores','web-frontends','media-clients','voice-assistants'])
  UNION ALL SELECT 'browser-privacy', unnest(ARRAY['ad-blockers','browser-extensions','browser-sync','browsers','host-block-lists'])
  UNION ALL SELECT 'data-privacy', unnest(ARRAY['data-anonymization','data-breaches','data-broker-redaction','data-erasers','data-loss-prevention','disk-cleaners','disposable-id','email-checker','google-analytics','metadata-removal','opt-out-tools','username-checker','whois-lookup'])
  UNION ALL SELECT 'email', unnest(ARRAY['email-aliases','email-clients','email-security-tools','encrypted-email','mail-forwarding','mail-servers','pgp-managers'])
  UNION ALL SELECT 'hardware', unnest(ARRAY['burner-phone','cold-storage','faraday-bags','hardware-devices','laptop','linux-phones','privacy-phones','router-firmware','routers','security-cameras','smart-home','wifi-hotspots','linux-hardware'])
  UNION ALL SELECT 'identity-and-anonymity', unnest(ARRAY['fingerprint-protection','gps-tracking','identity-protection','mix-networks','proxies','proxy-sites','sim-cards','virtual-mailbox','virtual-phone-numbers'])
  UNION ALL SELECT 'mobile', unnest(ARRAY['android-keyboards','desktop-operating-systems','linux','mobile-apps','mobile-device-privacy','mobile-os','mobile-operating-systems'])
  UNION ALL SELECT 'mobile', unnest(ARRAY['mobile-security-apps'])
  UNION ALL SELECT 'network-privacy', unnest(ARRAY['dns-clients','dns-hosting','dns-providers','decentralized-networks','firewalls','intrusion-detection','network-analysis','p2p-messaging','self-hosted-network-security','virtual-machines','virtual-private-networks'])
  UNION ALL SELECT 'osint', unnest(ARRAY['dorking','open-source-intelligence','scanners','website-info','osint-tools','social-media-osint','scanners-hardware'])
  UNION ALL SELECT 'data-privacy', unnest(ARRAY['analytics','online-security-tools'])
  UNION ALL SELECT 'policy-and-advocacy', unnest(ARRAY['advocacy-groups','compliance','policy-and-research'])
  UNION ALL SELECT 'productivity-and-work', unnest(ARRAY['2-factor-authentication','authentication','password-managers','secure-conference-calls'])
  UNION ALL SELECT 'protection', unnest(ARRAY['anti-malware','asset-protection','freedom-and-safety','legal-shield','linux-defenses','mac-os-defences','privacy-consultation','private-investigators','windows-defences','windows-privacy'])
  UNION ALL SELECT 'resources', unnest(ARRAY['books','channels','online-resources','podcasts'])
  UNION ALL SELECT 'secure-payments', unnest(ARRAY['bank-accounts','crypto-exchanges','crypto-wallets','cryptocurrencies','donations','pre-paid-cards','secure-budgeting','tax-solutions','virtual-credit-cards'])
  UNION ALL SELECT 'web-services', unnest(ARRAY['backup-and-sync','cloud-hosting','domain-registrars','encrypted-cloud-storage','file-drop','file-encryption','file-sharing-and-sync','maps','messaging','meta-search-engine','private-search-engine','search-engine','secure-cloud-storage','self-hosting','servers','service-providers','social-media','social-networks','specialized-search-engine','video-and-voice','voip','web-hosting'])
),
parent_ids AS (
  SELECT "id", "slug" FROM "categories"
  WHERE "slug" IN (
    'browser-privacy','data-privacy','de-google','email','hardware',
    'identity-and-anonymity','mobile','network-privacy','osint','policy-and-advocacy',
    'productivity-and-work','protection','resources','secure-payments','web-services'
  )
)
UPDATE "categories" c
SET
  "parent_id" = p."id",
  "visibility" = 'public'::category_visibility,
  "updated_at" = NOW()
FROM map m
JOIN parent_ids p ON p."slug" = m.parent_slug
WHERE c."slug" = m.child_slug
  AND c."id" <> p."id";

-- 4) Decision-driven handling for review categories kept as public
-- (AI/LLM kept public; nested under Web Services for browse consistency)
UPDATE "categories" c
SET
  "parent_id" = p."id",
  "visibility" = 'public'::category_visibility,
  "updated_at" = NOW()
FROM "categories" p
WHERE p."slug" = 'web-services'
  AND c."slug" IN ('ai-tools', 'large-language-models');

-- 5) Archive superfluous categories (base 24 + your 5 decisions)
UPDATE "categories"
SET
  "parent_id" = NULL,
  "visibility" = 'archived'::category_visibility,
  "updated_at" = NOW()
WHERE "slug" IN (
  '3d-graphics','animation','app-store','audio-editors-recorders','backend','blogging-platforms',
  'casting-streaming','cloud-productivity-suites','code-hosting','design-tools','desktop','devops',
  'digital-notes','image-editors','learning','news-readers','online-courses','online-tools',
  'productivity','rss-readers','testing','video-editors','video-platforms','ebook-reader',
  'llcs','trusts','digital-estate-planning','documents','team-collaboration',
  'audio-editors-and-recorders','ebook-readers','streaming-and-media-players',
  'offshore-banking','tax-planning-and-optimization','expatriation-and-citizenship',
  'second-passports-and-residency','nomad-resources'
);

-- 6) Defensive default: any uncategorized leftovers become review
UPDATE "categories"
SET
  "visibility" = 'review'::category_visibility,
  "updated_at" = NOW()
WHERE "slug" NOT IN (
  -- 15 parent slugs
  'de-google','browser-privacy','data-privacy','email','hardware',
  'identity-and-anonymity','mobile','network-privacy','osint','policy-and-advocacy',
  'productivity-and-work','protection','resources','secure-payments','web-services',
  -- public children from mapping
  'web-frontends','media-clients','app-stores','voice-assistants','ad-blockers','browser-extensions','browser-sync','browsers','host-block-lists',
  'data-anonymization','data-breaches','data-broker-redaction','data-erasers','data-loss-prevention',
  'disk-cleaners','disposable-id','email-checker','google-analytics','metadata-removal',
  'opt-out-tools','username-checker','whois-lookup',
  'email-aliases','email-clients','email-security-tools','encrypted-email','mail-forwarding','mail-servers','pgp-managers',
  'burner-phone','cold-storage','faraday-bags','hardware-devices','laptop','linux-phones','privacy-phones','linux-hardware',
  'router-firmware','routers','security-cameras','smart-home','wifi-hotspots',
  'fingerprint-protection','gps-tracking','identity-protection','mix-networks','proxies','proxy-sites',
  'sim-cards','virtual-mailbox','virtual-phone-numbers',
  'android-keyboards','desktop-operating-systems','linux','mobile-apps','mobile-device-privacy','mobile-os','mobile-operating-systems',
  'mobile-security-apps',
  'dns-clients','dns-hosting','dns-providers','decentralized-networks','firewalls','intrusion-detection',
  'network-analysis','p2p-messaging','self-hosted-network-security','virtual-machines','virtual-private-networks',
  'dorking','open-source-intelligence','scanners','website-info','osint-tools','social-media-osint','scanners-hardware',
  'analytics','online-security-tools',
  'advocacy-groups','compliance','policy-and-research',
  '2-factor-authentication','authentication','password-managers','secure-conference-calls',
  'anti-malware','asset-protection','freedom-and-safety','legal-shield','linux-defenses','mac-os-defences',
  'privacy-consultation','private-investigators','windows-defences','windows-privacy',
  'books','channels','online-resources','podcasts',
  'bank-accounts','crypto-exchanges','crypto-wallets','cryptocurrencies','donations','pre-paid-cards',
  'secure-budgeting','tax-solutions','virtual-credit-cards',
  'backup-and-sync','cloud-hosting','domain-registrars','encrypted-cloud-storage','file-drop','file-encryption',
  'file-sharing-and-sync','maps','messaging','meta-search-engine','private-search-engine','search-engine',
  'secure-cloud-storage','self-hosting','servers','service-providers','social-media','social-networks',
  'specialized-search-engine','video-and-voice','voip','web-hosting',
  -- review decisions kept public
  'ai-tools','large-language-models',
  -- archived slugs
  '3d-graphics','animation','app-store','audio-editors-recorders','backend','blogging-platforms',
  'casting-streaming','cloud-productivity-suites','code-hosting','design-tools','desktop','devops',
  'digital-notes','image-editors','learning','news-readers','online-courses','online-tools',
  'productivity','rss-readers','testing','video-editors','video-platforms','ebook-reader',
  'llcs','trusts','digital-estate-planning','documents','team-collaboration',
  'audio-editors-and-recorders','ebook-readers','streaming-and-media-players',
  'offshore-banking','tax-planning-and-optimization','expatriation-and-citizenship',
  'second-passports-and-residency','nomad-resources'
);

-- Stop here for review first.
-- COMMIT;
-- ROLLBACK;
