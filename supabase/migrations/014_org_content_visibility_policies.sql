-- Adjust public read policy to respect visibility
-- Drop old policy if present
DROP POLICY IF EXISTS "Organization content public read" ON organization_content;

-- Recreate with visibility condition
CREATE POLICY "Organization content public read" ON organization_content
  FOR SELECT USING (status = 'published' AND visibility = 'public');

