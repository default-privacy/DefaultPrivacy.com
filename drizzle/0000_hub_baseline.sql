-- 0000_hub_baseline — squashed hub-only baseline (v5 is formation-free).
-- Supersedes an earlier migration lineage, archived outside this repository.
-- Creates only the 11 directory/tools/analytics tables + their 6 enums.
-- Regenerated from the live hub schema (WS2, v5 separation remediation).

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.10
-- Dumped by pg_dump version 17.10

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

--
-- Name: category_visibility; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.category_visibility AS ENUM (
    'public',
    'archived',
    'review'
);

--
-- Name: jurisdiction_risk; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.jurisdiction_risk AS ENUM (
    'low',
    'medium',
    'high',
    'five_eyes',
    'fourteen_eyes'
);

--
-- Name: privacy_grade; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.privacy_grade AS ENUM (
    'A',
    'B',
    'C',
    'D',
    'F'
);

--
-- Name: tag_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.tag_type AS ENUM (
    'attribute',
    'platform',
    'custom'
);

--
-- Name: tool_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.tool_status AS ENUM (
    'Draft',
    'Scheduled',
    'Published'
);

--
-- Name: api_daily_stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.api_daily_stats (
    id text NOT NULL,
    date timestamp without time zone NOT NULL,
    endpoint text NOT NULL,
    total_requests integer DEFAULT 0 NOT NULL,
    success_count integer DEFAULT 0 NOT NULL,
    error_count integer DEFAULT 0 NOT NULL,
    rate_limited_count integer DEFAULT 0 NOT NULL,
    avg_response_time_ms integer,
    unique_ips integer DEFAULT 0,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

--
-- Name: api_request_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.api_request_logs (
    id text NOT NULL,
    endpoint text NOT NULL,
    method text NOT NULL,
    status_code integer NOT NULL,
    response_time_ms integer,
    rate_limit_tier text,
    rate_limit_remaining integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    label text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    description text,
    parent_id text,
    sort_order integer DEFAULT 0 NOT NULL,
    visibility public.category_visibility DEFAULT 'public'::public.category_visibility NOT NULL
);

--
-- Name: policy_analyses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.policy_analyses (
    id text NOT NULL,
    url text NOT NULL,
    domain text NOT NULL,
    policy_text text,
    policy_url text,
    scraped_at timestamp without time zone,
    summary text,
    data_collected json DEFAULT '[]'::json,
    third_party_sharing json DEFAULT '[]'::json,
    retention_period text,
    red_flags json DEFAULT '[]'::json,
    positives json DEFAULT '[]'::json,
    score public.privacy_grade,
    score_numeric integer,
    score_rationale text,
    service_type text,
    ai_model text NOT NULL,
    prompt_version text DEFAULT 'v1'::text NOT NULL,
    analysis_version integer DEFAULT 1 NOT NULL,
    error text,
    is_partial boolean DEFAULT false NOT NULL,
    view_count integer DEFAULT 0 NOT NULL,
    share_count integer DEFAULT 0 NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

--
-- Name: public_scans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.public_scans (
    id text NOT NULL,
    url text NOT NULL,
    domain text NOT NULL,
    scanned_at timestamp without time zone DEFAULT now() NOT NULL,
    scan_duration integer NOT NULL,
    scan_version text DEFAULT '1.0'::text NOT NULL,
    overall_score integer NOT NULL,
    grade public.privacy_grade NOT NULL,
    tracker_score integer NOT NULL,
    cookie_score integer NOT NULL,
    security_score integer NOT NULL,
    third_party_score integer NOT NULL,
    fingerprint_score integer NOT NULL,
    trackers_found json,
    cookies_found json,
    headers_found json,
    third_party_reqs json,
    fingerprint_apis json,
    tracker_names json DEFAULT '[]'::json,
    tracker_count integer DEFAULT 0 NOT NULL,
    cookie_count integer DEFAULT 0 NOT NULL,
    third_party_count integer DEFAULT 0 NOT NULL,
    has_google_analytics boolean DEFAULT false NOT NULL,
    has_facebook_pixel boolean DEFAULT false NOT NULL,
    has_third_party_cookies boolean DEFAULT false NOT NULL,
    has_fingerprinting boolean DEFAULT false NOT NULL,
    respects_dnt boolean DEFAULT false NOT NULL,
    has_https boolean DEFAULT true NOT NULL,
    has_hsts boolean DEFAULT false NOT NULL,
    has_csp boolean DEFAULT false NOT NULL,
    has_privacy_policy boolean DEFAULT false NOT NULL,
    summary text,
    recommendations json DEFAULT '[]'::json,
    scan_error text,
    is_partial boolean DEFAULT false NOT NULL,
    view_count integer DEFAULT 1 NOT NULL,
    share_count integer DEFAULT 0 NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    description text,
    color text DEFAULT '#6b7280'::text,
    sort_order integer DEFAULT 0 NOT NULL,
    type public.tag_type DEFAULT 'custom'::public.tag_type NOT NULL
);

--
-- Name: tool_privacy_audits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tool_privacy_audits (
    id text NOT NULL,
    tool_id text NOT NULL,
    scanned_at timestamp without time zone DEFAULT now() NOT NULL,
    scan_duration integer NOT NULL,
    target_url text NOT NULL,
    scan_version text DEFAULT '1.0'::text NOT NULL,
    overall_score integer NOT NULL,
    grade public.privacy_grade NOT NULL,
    tracker_score integer NOT NULL,
    cookie_score integer NOT NULL,
    security_score integer NOT NULL,
    third_party_score integer NOT NULL,
    fingerprint_score integer NOT NULL,
    trackers_found json,
    cookies_found json,
    headers_found json,
    third_party_reqs json,
    fingerprint_apis json,
    has_google_analytics boolean DEFAULT false NOT NULL,
    has_facebook_pixel boolean DEFAULT false NOT NULL,
    has_third_party_cookies boolean DEFAULT false NOT NULL,
    has_fingerprinting boolean DEFAULT false NOT NULL,
    respects_dnt boolean DEFAULT false NOT NULL,
    has_https boolean DEFAULT true NOT NULL,
    has_hsts boolean DEFAULT false NOT NULL,
    has_csp boolean DEFAULT false NOT NULL,
    has_privacy_policy boolean DEFAULT false NOT NULL,
    scan_error text,
    is_partial boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

--
-- Name: tools; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tools (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    website_url text NOT NULL,
    affiliate_url text,
    tagline text,
    description text,
    content text,
    favicon_url text,
    screenshot_url text,
    last_audited_at timestamp without time zone,
    is_deprecated boolean DEFAULT false NOT NULL,
    deprecated_reason text,
    deprecated_at timestamp without time zone,
    alternative_tool_id text,
    github_url text,
    subreddit text,
    status public.tool_status DEFAULT 'Draft'::public.tool_status NOT NULL,
    content_type text DEFAULT 'tool'::text NOT NULL,
    is_featured boolean DEFAULT false NOT NULL,
    is_affiliated boolean DEFAULT false NOT NULL,
    is_url_valid boolean DEFAULT true NOT NULL,
    latest_privacy_score integer,
    submitter_name text,
    submitter_email text,
    submitter_note text,
    owner_id text,
    published_at timestamp without time zone,
    last_content_generated_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    jurisdiction text,
    jurisdiction_risk public.jurisdiction_risk,
    logs_ip boolean,
    logs_metadata boolean,
    e2ee boolean,
    zero_knowledge boolean,
    requires_email boolean,
    requires_phone boolean,
    requires_real_name boolean,
    has_free_tier boolean,
    accepts_crypto boolean,
    is_no_kyc boolean,
    is_open_source boolean,
    is_security_audited boolean,
    audit_date timestamp without time zone,
    auditor text,
    audit_url text,
    platforms json,
    last_verified timestamp without time zone,
    ado_score integer
);

--
-- Name: tools_to_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tools_to_categories (
    tool_id text NOT NULL,
    category_id text NOT NULL
);

--
-- Name: tools_to_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tools_to_tags (
    tool_id text NOT NULL,
    tag_id text NOT NULL
);

--
-- Name: usage_counts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usage_counts (
    id text NOT NULL,
    day timestamp without time zone NOT NULL,
    kind text NOT NULL,
    key text NOT NULL,
    count integer DEFAULT 0 NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);

--
-- Name: api_daily_stats api_daily_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.api_daily_stats
    ADD CONSTRAINT api_daily_stats_pkey PRIMARY KEY (id);

--
-- Name: api_request_logs api_request_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.api_request_logs
    ADD CONSTRAINT api_request_logs_pkey PRIMARY KEY (id);

--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);

--
-- Name: categories categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_unique UNIQUE (slug);

--
-- Name: policy_analyses policy_analyses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.policy_analyses
    ADD CONSTRAINT policy_analyses_pkey PRIMARY KEY (id);

--
-- Name: public_scans public_scans_domain_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.public_scans
    ADD CONSTRAINT public_scans_domain_unique UNIQUE (domain);

--
-- Name: public_scans public_scans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.public_scans
    ADD CONSTRAINT public_scans_pkey PRIMARY KEY (id);

--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);

--
-- Name: tags tags_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_slug_unique UNIQUE (slug);

--
-- Name: tool_privacy_audits tool_privacy_audits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tool_privacy_audits
    ADD CONSTRAINT tool_privacy_audits_pkey PRIMARY KEY (id);

--
-- Name: tools tools_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT tools_pkey PRIMARY KEY (id);

--
-- Name: tools tools_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT tools_slug_unique UNIQUE (slug);

--
-- Name: tools_to_categories tools_to_categories_tool_id_category_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools_to_categories
    ADD CONSTRAINT tools_to_categories_tool_id_category_id_pk PRIMARY KEY (tool_id, category_id);

--
-- Name: tools_to_tags tools_to_tags_tool_id_tag_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools_to_tags
    ADD CONSTRAINT tools_to_tags_tool_id_tag_id_pk PRIMARY KEY (tool_id, tag_id);

--
-- Name: usage_counts usage_counts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usage_counts
    ADD CONSTRAINT usage_counts_pkey PRIMARY KEY (id);

--
-- Name: tools tools_website_url_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools
    ADD CONSTRAINT tools_website_url_unique UNIQUE (website_url);

--
-- Name: api_daily_stats_date_endpoint_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX api_daily_stats_date_endpoint_idx ON public.api_daily_stats USING btree (date, endpoint);


--
-- Name: usage_counts_day_kind_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX usage_counts_day_kind_key_idx ON public.usage_counts USING btree (day, kind, key);

--
-- Name: api_logs_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX api_logs_created_at_idx ON public.api_request_logs USING btree (created_at);

--
-- Name: api_logs_endpoint_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX api_logs_endpoint_idx ON public.api_request_logs USING btree (endpoint);

--
-- Name: api_logs_status_code_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX api_logs_status_code_idx ON public.api_request_logs USING btree (status_code);

--
-- Name: categories_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_parent_id_idx ON public.categories USING btree (parent_id);

--
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX categories_slug_idx ON public.categories USING btree (slug);

--
-- Name: categories_sort_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_sort_order_idx ON public.categories USING btree (sort_order);

--
-- Name: categories_visibility_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_visibility_idx ON public.categories USING btree (visibility);

--
-- Name: policy_analyses_domain_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX policy_analyses_domain_idx ON public.policy_analyses USING btree (domain);

--
-- Name: policy_analyses_expires_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX policy_analyses_expires_at_idx ON public.policy_analyses USING btree (expires_at);

--
-- Name: policy_analyses_score_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX policy_analyses_score_idx ON public.policy_analyses USING btree (score);

--
-- Name: public_scans_domain_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX public_scans_domain_idx ON public.public_scans USING btree (domain);

--
-- Name: public_scans_expires_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX public_scans_expires_at_idx ON public.public_scans USING btree (expires_at);

--
-- Name: public_scans_grade_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX public_scans_grade_idx ON public.public_scans USING btree (grade);

--
-- Name: tags_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tags_name_idx ON public.tags USING btree (name);

--
-- Name: tags_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tags_type_idx ON public.tags USING btree (type);

--
-- Name: tool_audits_grade_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tool_audits_grade_idx ON public.tool_privacy_audits USING btree (grade);

--
-- Name: tool_audits_scanned_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tool_audits_scanned_at_idx ON public.tool_privacy_audits USING btree (scanned_at);

--
-- Name: tool_audits_tool_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tool_audits_tool_id_idx ON public.tool_privacy_audits USING btree (tool_id);

--
-- Name: tools_ado_score_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tools_ado_score_idx ON public.tools USING btree (ado_score);

--
-- Name: tools_jurisdiction_risk_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tools_jurisdiction_risk_idx ON public.tools USING btree (jurisdiction_risk);

--
-- Name: tools_last_verified_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tools_last_verified_idx ON public.tools USING btree (last_verified);

--
-- Name: tools_name_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tools_name_idx ON public.tools USING btree (name);

--
-- Name: tools_privacy_score_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tools_privacy_score_idx ON public.tools USING btree (latest_privacy_score);

--
-- Name: tools_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tools_slug_idx ON public.tools USING btree (slug);

--
-- Name: tools_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tools_status_idx ON public.tools USING btree (status);

--
-- Name: categories categories_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_fk FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL;

--
-- Name: tool_privacy_audits tool_privacy_audits_tool_id_tools_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tool_privacy_audits
    ADD CONSTRAINT tool_privacy_audits_tool_id_tools_id_fk FOREIGN KEY (tool_id) REFERENCES public.tools(id) ON DELETE CASCADE;

--
-- Name: tools_to_categories tools_to_categories_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools_to_categories
    ADD CONSTRAINT tools_to_categories_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;

--
-- Name: tools_to_categories tools_to_categories_tool_id_tools_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools_to_categories
    ADD CONSTRAINT tools_to_categories_tool_id_tools_id_fk FOREIGN KEY (tool_id) REFERENCES public.tools(id) ON DELETE CASCADE;

--
-- Name: tools_to_tags tools_to_tags_tag_id_tags_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools_to_tags
    ADD CONSTRAINT tools_to_tags_tag_id_tags_id_fk FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;

--
-- Name: tools_to_tags tools_to_tags_tool_id_tools_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tools_to_tags
    ADD CONSTRAINT tools_to_tags_tool_id_tools_id_fk FOREIGN KEY (tool_id) REFERENCES public.tools(id) ON DELETE CASCADE;

--
-- PostgreSQL database dump complete
--

