-- Create organization_content table for organization-specific content management
CREATE TABLE IF NOT EXISTS organization_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'news' CHECK (type IN ('news', 'event', 'document', 'announcement')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_name TEXT,
  featured_image TEXT,
  tags TEXT[] DEFAULT '{}',
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_organization_content_organization_id ON organization_content(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_content_type ON organization_content(type);
CREATE INDEX IF NOT EXISTS idx_organization_content_status ON organization_content(status);
CREATE INDEX IF NOT EXISTS idx_organization_content_created_at ON organization_content(created_at DESC);

-- Enable Row Level Security
ALTER TABLE organization_content ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Public read access for published content
CREATE POLICY "Organization content public read" ON organization_content 
    FOR SELECT USING (status = 'published');

-- Organization members can read their organization's content
CREATE POLICY "Organization members can read content" ON organization_content 
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = organization_content.organization_id
            AND om.user_id = auth.uid()
            AND om.is_active = true
        )
    );

-- Organization admins can manage their organization's content
CREATE POLICY "Organization admins can manage content" ON organization_content 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM organization_members om
            WHERE om.organization_id = organization_content.organization_id
            AND om.user_id = auth.uid()
            AND om.role IN ('admin', 'leader')
            AND om.is_active = true
        )
    );

-- Admin users can manage all content
CREATE POLICY "Admin users can manage all content" ON organization_content 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Create trigger for updated_at
CREATE TRIGGER update_organization_content_updated_at BEFORE UPDATE ON organization_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
