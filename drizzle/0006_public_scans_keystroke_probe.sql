--
-- Migration 0006: public_scans.keystroke_probe. The scanner now types a nonsense word into a
-- page's fields (never submitting) and records which outside hosts received it. Stored as
-- { leaks: [...], inputs: n }; NULL on scans that predate the probe.
--
ALTER TABLE public.public_scans ADD COLUMN IF NOT EXISTS keystroke_probe json;
