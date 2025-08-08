-- Add visibility column to organization_content to separate public vs private
ALTER TABLE IF EXISTS organization_content
ADD COLUMN IF NOT EXISTS visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('public','private'));

-- Optional index for filtering by visibility
CREATE INDEX IF NOT EXISTS idx_org_content_visibility ON organization_content(visibility);

