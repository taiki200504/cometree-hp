-- Create members table
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'member',
  position TEXT NOT NULL,
  university TEXT,
  profile TEXT,
  image_url TEXT,
  is_representative BOOLEAN DEFAULT FALSE,
  representative_message TEXT,
  category TEXT NOT NULL DEFAULT 'staff' CHECK (category IN ('core', 'advisor', 'staff')),
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create representative_messages table
CREATE TABLE IF NOT EXISTS representative_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_position TEXT NOT NULL,
  author_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_members_category ON members(category);
CREATE INDEX IF NOT EXISTS idx_members_is_representative ON members(is_representative);
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at);

-- Create RLS policies for members
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Allow public read access to members
CREATE POLICY "Allow public read access to members" ON members
  FOR SELECT USING (true);

-- Allow admin users to manage members
CREATE POLICY "Allow admin users to manage members" ON members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create RLS policies for representative_messages
ALTER TABLE representative_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to representative messages
CREATE POLICY "Allow public read access to representative messages" ON representative_messages
  FOR SELECT USING (true);

-- Allow admin users to manage representative messages
CREATE POLICY "Allow admin users to manage representative messages" ON representative_messages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_representative_messages_updated_at BEFORE UPDATE ON representative_messages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO members (name, email, role, position, university, profile, category, is_representative, tags) VALUES
('三島大毅', 'mishima@union.example.com', 'admin', '代表', '立教大学経済学部2年', '地域創生からDAOまで幅広く挑戦。「学生発のムーブメントを世の中へ」が信条。', 'core', true, ARRAY['地域創生', 'DAO', 'ムーブメント']),
('高柳茉白', 'takayanagi@union.example.com', 'admin', '副代表', '慶應義塾大学総合政策学部2年', '偏見低減の研究者。UNIONではPJ統括を担当。', 'core', false, ARRAY['研究', 'PJ統括']),
('肥後翔太', 'higo@union.example.com', 'member', '法人営業部 部長', '東京大学経済学部1年', 'スタートアップ支援とスポンサー開拓を担当。', 'core', false, ARRAY['営業', 'スタートアップ']),
('吉田乃々香', 'yoshida@union.example.com', 'member', 'コンテンツ制作部 部長', '立教大学法学部2年', 'Podcast / 映像制作のプロデューサー。', 'core', false, ARRAY['コンテンツ', 'Podcast', '映像制作']),
('阪野侑希', 'sakano@union.example.com', 'member', 'コミュニティマネジメント部 部長', '高校3年生', 'UNION内外のイベント企画からコミュニティの運営、エンゲージメント政策を統括。', 'core', false, ARRAY['イベント', 'コミュニティ', 'エンゲージメント']),
('永野佑夏', 'nagano@union.example.com', 'member', 'BO部 部長', '創価大学経営学部1年', '人事や経理など、UNIONを裏から支える。', 'core', false, ARRAY['人事', '経理', '運営']);

INSERT INTO representative_messages (title, content, author_name, author_position) VALUES
('学生から熱狂を生み出せる世界を作る', '私たちUNIONは、学生の声を社会に響かせることを使命としています。今の日本社会では、自分の行動で国や社会を変えられると思う若者が少ない状況です。しかし、学生団体には社会を動かすタネが秘められています。私たちは、そのタネを育て、学生から変えようとする空気感・世界観を作り出す未来を目指しています。', '三島大毅', '代表'); 