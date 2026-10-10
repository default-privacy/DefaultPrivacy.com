-- Directory Overhaul Verification SQL
-- Run after applying scripts/sql/directory-overhaul-apply.sql (before COMMIT recommended).

-- 1) Category totals by visibility
SELECT
  c.visibility,
  COUNT(*) AS categories
FROM categories c
GROUP BY c.visibility
ORDER BY c.visibility;

-- 2) Top-level categories that will appear as directory groups
SELECT
  c.slug,
  c.name,
  c.visibility,
  c.sort_order
FROM categories c
WHERE c.parent_id IS NULL
ORDER BY c.sort_order, c.name;

-- 3) Count published tools by category visibility
SELECT
  c.visibility,
  COUNT(DISTINCT t.id) AS published_tools
FROM categories c
JOIN tools_to_categories tc ON tc.category_id = c.id
JOIN tools t ON t.id = tc.tool_id
WHERE t.status = 'Published'
GROUP BY c.visibility
ORDER BY c.visibility;

-- 4) Published tool count per archived category (to confirm what was hidden)
SELECT
  c.slug,
  c.name,
  COUNT(DISTINCT t.id) AS published_tools
FROM categories c
LEFT JOIN tools_to_categories tc ON tc.category_id = c.id
LEFT JOIN tools t ON t.id = tc.tool_id AND t.status = 'Published'
WHERE c.visibility = 'archived'
GROUP BY c.slug, c.name
ORDER BY published_tools DESC, c.slug;

-- 5) Any categories still in review (should be 0 if mapping/decisions are complete)
SELECT
  c.slug,
  c.name
FROM categories c
WHERE c.visibility = 'review'
ORDER BY c.slug;

-- 6) Sanity check: public child categories without a parent
-- (should be 0 after mapping; parent groups are expected NULL parent_id)
SELECT
  c.slug,
  c.name
FROM categories c
WHERE c.visibility = 'public'
  AND c.parent_id IS NULL
  AND c.slug NOT IN (
    'browser-privacy','data-privacy','de-google','email','hardware',
    'identity-and-anonymity','mobile','network-privacy','osint','policy-and-advocacy',
    'productivity-and-work','protection','resources','secure-payments','web-services'
  )
ORDER BY c.slug;

-- 7) Quick dashboard numbers
SELECT
  (SELECT COUNT(*) FROM categories) AS total_categories,
  (SELECT COUNT(*) FROM categories WHERE visibility = 'public') AS public_categories,
  (SELECT COUNT(*) FROM categories WHERE visibility = 'archived') AS archived_categories,
  (SELECT COUNT(*) FROM categories WHERE visibility = 'review') AS review_categories,
  (SELECT COUNT(*) FROM tools WHERE status = 'Published') AS total_published_tools,
  (SELECT COUNT(DISTINCT t.id)
   FROM tools t
   JOIN tools_to_categories tc ON tc.tool_id = t.id
   JOIN categories c ON c.id = tc.category_id
   WHERE t.status = 'Published' AND c.visibility = 'public') AS public_visible_tools;
