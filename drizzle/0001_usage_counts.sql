--
-- Migration 0001: usage_counts — first-party, no-PII demand telemetry
--
-- Aggregate-only usage counting: one row per (day, kind, key), incremented via
-- upsert. Stores NO PII. Hand-written (drizzle-kit is broken on this box); apply
-- to a fresh/local Docker DB with psql. The unique index backs the
-- onConflictDoUpdate increment in src/lib/analytics/usage.ts.
--

CREATE TABLE IF NOT EXISTS public.usage_counts (
    id text NOT NULL,
    day timestamp without time zone NOT NULL,
    kind text NOT NULL,
    key text NOT NULL,
    count integer DEFAULT 0 NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
    ALTER TABLE ONLY public.usage_counts
        ADD CONSTRAINT usage_counts_pkey PRIMARY KEY (id);
EXCEPTION WHEN duplicate_table THEN NULL; WHEN duplicate_object THEN NULL;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS usage_counts_day_kind_key_idx
    ON public.usage_counts USING btree (day, kind, key);
