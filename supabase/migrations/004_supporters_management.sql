-- Create supporters table
CREATE TABLE IF NOT EXISTS supporters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  support_type TEXT NOT NULL DEFAULT 'financial' CHECK (support_type IN ('financial', 'media', 'collaboration', 'individual')),
  amount TEXT,
  since TEXT,
  website_url TEXT,
  contact_email TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_supporters_type ON supporters(type);
CREATE INDEX IF NOT EXISTS idx_supporters_support_type ON supporters(support_type);
CREATE INDEX IF NOT EXISTS idx_supporters_is_active ON supporters(is_active);
CREATE INDEX IF NOT EXISTS idx_supporters_display_order ON supporters(display_order);

-- Create RLS policies for supporters
ALTER TABLE supporters ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active supporters
CREATE POLICY "Allow public read access to active supporters" ON supporters
  FOR SELECT USING (is_active = true);

-- Allow admin users to manage supporters
CREATE POLICY "Allow admin users to manage supporters" ON supporters
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create trigger to update updated_at
CREATE TRIGGER update_supporters_updated_at BEFORE UPDATE ON supporters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO supporters (name, type, logo_url, description, support_type, amount, since, website_url, contact_email, display_order) VALUES
('株式会社テックイノベーション', 'プラチナスポンサー', '/placeholder.svg?height=80&width=200&text=TechInnovation', '学生の技術力向上を支援し、次世代のエンジニア育成に貢献しています。', 'financial', '年間100万円', '2022年4月', 'https://techinnovation.example.com', 'contact@techinnovation.example.com', 1),
('一般社団法人学生支援機構', 'ゴールドスポンサー', '/placeholder.svg?height=80&width=200&text=StudentSupport', '全国の学生団体の活動を支援し、学生の社会参画を促進しています。', 'financial', '年間50万円', '2021年10月', 'https://student-support.example.com', 'info@student-support.example.com', 2),
('株式会社メディアパートナーズ', 'メディアパートナー', '/placeholder.svg?height=80&width=200&text=MediaPartners', '学生の声を社会に届けるメディア支援を行っています。', 'media', '番組制作支援', '2023年1月', 'https://mediapartners.example.com', 'partnership@mediapartners.example.com', 3),
('NPO法人ユースエンパワーメント', '協力団体', '/placeholder.svg?height=80&width=200&text=YouthEmpowerment', '若者の社会参画と能力開発を支援する非営利団体です。', 'collaboration', 'プログラム連携', '2022年8月', 'https://youth-empowerment.example.com', 'info@youth-empowerment.example.com', 4),
('株式会社キャリアサポート', 'シルバースポンサー', '/placeholder.svg?height=80&width=200&text=CareerSupport', '学生のキャリア形成と就職活動を支援しています。', 'financial', '年間30万円', '2023年4月', 'https://career-support.example.com', 'support@career-support.example.com', 5),
('個人支援者の皆様', '個人サポーター', '/placeholder.svg?height=80&width=200&text=Individual', '多くの個人の方々からもご支援をいただいています。', 'individual', '月額1,000円〜', '2021年設立時より', NULL, 'donate@union.example.com', 6); 