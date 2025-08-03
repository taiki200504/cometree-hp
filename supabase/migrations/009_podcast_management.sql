-- Create podcast_shows table
CREATE TABLE IF NOT EXISTS podcast_shows (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  color_gradient TEXT DEFAULT 'from-blue-400 to-blue-600',
  total_episodes INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create podcast_episodes table
CREATE TABLE IF NOT EXISTS podcast_episodes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  show_id UUID REFERENCES podcast_shows(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  episode_number INTEGER,
  duration_minutes INTEGER,
  published_at TIMESTAMP WITH TIME ZONE,
  audio_url TEXT,
  video_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create podcast_external_links table
CREATE TABLE IF NOT EXISTS podcast_external_links (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  show_id UUID REFERENCES podcast_shows(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('youtube', 'spotify', 'apple', 'google', 'amazon')),
  url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(show_id, platform)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_podcast_shows_slug ON podcast_shows(slug);
CREATE INDEX IF NOT EXISTS idx_podcast_shows_status ON podcast_shows(status);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_show_id ON podcast_episodes(show_id);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_status ON podcast_episodes(status);
CREATE INDEX IF NOT EXISTS idx_podcast_episodes_published_at ON podcast_episodes(published_at);
CREATE INDEX IF NOT EXISTS idx_podcast_external_links_show_id ON podcast_external_links(show_id);

-- Enable RLS
ALTER TABLE podcast_shows ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE podcast_external_links ENABLE ROW LEVEL SECURITY;

-- RLS policies for podcast_shows
CREATE POLICY "Public can view active podcast shows" ON podcast_shows
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage all podcast shows" ON podcast_shows
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- RLS policies for podcast_episodes
CREATE POLICY "Public can view published podcast episodes" ON podcast_episodes
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all podcast episodes" ON podcast_episodes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- RLS policies for podcast_external_links
CREATE POLICY "Public can view active external links" ON podcast_external_links
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage all external links" ON podcast_external_links
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_podcast_shows_updated_at BEFORE UPDATE ON podcast_shows
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_podcast_episodes_updated_at BEFORE UPDATE ON podcast_episodes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_podcast_external_links_updated_at BEFORE UPDATE ON podcast_external_links
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial podcast shows data
INSERT INTO podcast_shows (slug, name, description, cover_image_url, color_gradient, total_episodes, status) VALUES 
('yuniraji', 'ユニラジ', '学生の声を届けるトークバラエティ番組', '/images/podcast/yuniraji.JPG', 'from-blue-400 to-blue-600', 45, 'active'),
('cocomiyu', 'ここみゆの夢ぐらし', '心と未来をつなぐ対話番組', '/images/podcast/cocomiyu.jpg', 'from-pink-400 to-pink-600', 32, 'active'),
('genepoli', 'ジェネポリ', 'Z世代の政治・社会問題討論番組', '/images/podcast/genepoli.png', 'from-purple-400 to-purple-600', 28, 'active'),
('career', 'キャリアみっけ隊', '学生のキャリア形成支援番組', '/images/podcast/career.png', 'from-green-400 to-green-600', 21, 'active')
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  cover_image_url = EXCLUDED.cover_image_url,
  color_gradient = EXCLUDED.color_gradient,
  total_episodes = EXCLUDED.total_episodes,
  status = EXCLUDED.status; 