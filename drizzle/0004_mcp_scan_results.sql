--
-- Migration 0004: mcp_scan_results -- the monthly read-only scan of hosted MCP servers
--
-- One row per (scan, registry server). Probes send initialize and tools/list only.
-- Tool names and the reach flags they triggered are kept here; full tool descriptions
-- go to the gzipped raw file in the vault, not the database, to keep the table small.
-- Additive only. Hand-written; apply to local Docker with psql and to Neon over :443.
--

CREATE TABLE IF NOT EXISTS public.mcp_scan_results (
    scan_id text NOT NULL,
    server_name text NOT NULL,
    registry_version text,
    url text,
    host text,
    outcome text NOT NULL,
    http_status integer,
    protocol_version text,
    server_info jsonb,
    tool_count integer,
    tool_names text[],
    reach text[],
    reach_evidence jsonb,
    read_only_tools integer,
    destructive_tools integer,
    unlabelled_tools integer,
    error text,
    checked_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT mcp_scan_results_pkey PRIMARY KEY (scan_id, server_name),
    CONSTRAINT mcp_scan_results_scan_id_shape CHECK (scan_id ~ '^[0-9]{4}-[0-9]{2}$'),
    CONSTRAINT mcp_scan_results_outcome_known CHECK (outcome IN (
        'listed', 'sign_in', 'refused_url', 'refused_address', 'unreachable', 'not_mcp', 'error',
        'host_capped', 'no_remote'))
);

CREATE INDEX IF NOT EXISTS mcp_scan_results_scan_host_idx ON public.mcp_scan_results (scan_id, host);
