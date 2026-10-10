--
-- Migration 0002: fp_attribute_counts — aggregate browser-attribute frequency corpus
--
-- Pure tallies: one row per (attribute, value), incremented via upsert on each
-- visit. Stores NO PII — no ip, no fingerprintId, no per-visitor id, no raw
-- fingerprint blob, no join key. Just (attribute, value, count). Hand-written
-- (drizzle-kit is broken on this box); apply to a fresh/local Docker DB with psql.
-- The composite primary key backs the onConflictDoUpdate increment in
-- src/lib/analytics/attributes.ts.
--

CREATE TABLE IF NOT EXISTS public.fp_attribute_counts (
    attribute text NOT NULL,
    value text NOT NULL,
    count integer DEFAULT 0 NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
    ALTER TABLE ONLY public.fp_attribute_counts
        ADD CONSTRAINT fp_attribute_counts_pkey PRIMARY KEY (attribute, value);
EXCEPTION WHEN duplicate_table THEN NULL; WHEN duplicate_object THEN NULL;
END $$;
