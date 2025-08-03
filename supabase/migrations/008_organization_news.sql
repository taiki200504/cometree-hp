-- Create organization_news table
CREATE TABLE IF NOT EXISTS organization_news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_organization_news_organization_id ON organization_news(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_news_status ON organization_news(status);
CREATE INDEX IF NOT EXISTS idx_organization_news_category ON organization_news(category);
CREATE INDEX IF NOT EXISTS idx_organization_news_created_at ON organization_news(created_at);

-- Enable RLS
ALTER TABLE organization_news ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can manage all organization news" ON organization_news
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Organization members can view their own news" ON organization_news
  FOR SELECT USING (
    organization_id IN (
      SELECT id FROM organizations
      WHERE id = organization_news.organization_id
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER update_organization_news_updated_at BEFORE UPDATE ON organization_news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 