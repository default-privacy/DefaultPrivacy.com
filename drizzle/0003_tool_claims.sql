--
-- Migration 0003: tool_claims -- every sourced fact and caveat about a tool
--
-- One row per (tool, attribute) with the value its sources support, or one row per
-- caveat (attribute = 'caveat', sort_order 1..n). The tools columns stay the value of
-- record; a gated column value (is_no_kyc, accepts_crypto, is_security_audited) counts
-- as checked only while a claim with the same value exists. Additive only.
-- Hand-written and applied with scripts/apply-tool-claims-migration.ts (not in
-- drizzle/meta/_journal.json, so run-migrations.ts will not pick it up).
--

CREATE TABLE IF NOT EXISTS public.tool_claims (
    tool_id text NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
    attribute text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    value jsonb,
    note text,
    source_urls text[] NOT NULL,
    checked_on date NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT tool_claims_pkey PRIMARY KEY (tool_id, attribute, sort_order),
    CONSTRAINT tool_claims_has_source CHECK (cardinality(source_urls) >= 1),
    CONSTRAINT tool_claims_shape CHECK (
        CASE WHEN attribute = 'caveat'
             THEN note IS NOT NULL AND value IS NULL AND sort_order >= 1
             ELSE sort_order = 0
        END),
    CONSTRAINT tool_claims_attribute_known CHECK (attribute IN (
        'caveat', 'description', 'githubUrl', 'jurisdiction',
        'logsIp', 'logsMetadata', 'e2ee', 'zeroKnowledge',
        'requiresEmail', 'requiresPhone', 'requiresRealName',
        'hasFreeTier', 'acceptsCrypto', 'isNoKyc',
        'isOpenSource', 'isSecurityAudited', 'platforms'))
);
