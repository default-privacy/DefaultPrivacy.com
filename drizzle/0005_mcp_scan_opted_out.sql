--
-- Migration 0005: allow outcome 'opted_out' in mcp_scan_results (an owner asked not to be
-- scanned; the scan never contacts the host). Widens a CHECK constraint; no data changes.
--
ALTER TABLE public.mcp_scan_results DROP CONSTRAINT IF EXISTS mcp_scan_results_outcome_known;
ALTER TABLE public.mcp_scan_results ADD CONSTRAINT mcp_scan_results_outcome_known CHECK (outcome IN (
    'listed', 'sign_in', 'refused_url', 'refused_address', 'unreachable', 'not_mcp', 'error',
    'host_capped', 'no_remote', 'opted_out'));
