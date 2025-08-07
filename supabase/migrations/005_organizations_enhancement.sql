-- Enhance organizations table with additional fields
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS contact_phone TEXT;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS member_count INTEGER DEFAULT 0;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS founded_date DATE;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'suspended'));
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS verification_level TEXT DEFAULT 'basic' CHECK (verification_level IN ('basic', 'verified', 'premium'));
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS social_media JSONB DEFAULT '{}';
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'student_group';
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS region TEXT DEFAULT '関東';

-- Create organization events table
CREATE TABLE IF NOT EXISTS organization_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('workshop', 'seminar', 'conference', 'meetup', 'competition', 'other')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  location TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected', 'cancelled', 'completed')),
  budget DECIMAL(10,2),
  requirements TEXT,
  contact_person TEXT,
  contact_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create organization reports table
CREATE TABLE IF NOT EXISTS organization_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('activity', 'financial', 'impact', 'annual')),
  title TEXT NOT NULL,
  content TEXT,
  file_url TEXT,
  period_start DATE,
  period_end DATE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create organization applications table
CREATE TABLE IF NOT EXISTS organization_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  application_type TEXT NOT NULL CHECK (application_type IN ('membership', 'funding', 'partnership', 'event_support', 'media_coverage')),
  title TEXT NOT NULL,
  description TEXT,
  requested_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'completed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  deadline DATE,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_organizations_status ON organizations(status);
CREATE INDEX IF NOT EXISTS idx_organizations_verification_level ON organizations(verification_level);
CREATE INDEX IF NOT EXISTS idx_organizations_created_at ON organizations(created_at);
CREATE INDEX IF NOT EXISTS idx_organization_events_organization_id ON organization_events(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_events_status ON organization_events(status);
CREATE INDEX IF NOT EXISTS idx_organization_events_start_date ON organization_events(start_date);
CREATE INDEX IF NOT EXISTS idx_organization_reports_organization_id ON organization_reports(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_reports_status ON organization_reports(status);
CREATE INDEX IF NOT EXISTS idx_organization_applications_organization_id ON organization_applications(organization_id);
CREATE INDEX IF NOT EXISTS idx_organization_applications_status ON organization_applications(status);

-- Enable RLS for new tables
ALTER TABLE organization_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_applications ENABLE ROW LEVEL SECURITY;

-- RLS policies for organization_events
CREATE POLICY "Allow public read access to approved events" ON organization_events
  FOR SELECT USING (status = 'approved');

-- RLS policies for organization_reports
CREATE POLICY "Allow organization members to manage their reports" ON organization_reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM organizations
      WHERE organizations.id = organization_reports.organization_id
    )
  );

-- RLS policies for organization_applications
CREATE POLICY "Allow organization members to manage their applications" ON organization_applications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM organizations
      WHERE organizations.id = organization_applications.organization_id
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_organization_events_updated_at BEFORE UPDATE ON organization_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organization_reports_updated_at BEFORE UPDATE ON organization_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organization_applications_updated_at BEFORE UPDATE ON organization_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for organizations
INSERT INTO organizations (name, category, region, description, website_url, contact_email, member_count, status, verification_level) VALUES
('東京大学起業サークルTNK', '起業・ビジネス', '関東', '東京大学の起業家を目指す学生のためのサークルです。', 'https://tnk.example.com', 'contact@tnk.example.com', 45, 'active', 'verified'),
('早稲田大学国際交流サークル', '国際交流', '関東', '世界の学生との交流を促進するサークルです。', 'https://international.example.com', 'info@international.example.com', 32, 'active', 'verified'),
('慶應義塾大学ボランティア団体', 'ボランティア・社会貢献', '関東', '地域社会への貢献を目指すボランティア団体です。', 'https://volunteer.example.com', 'volunteer@example.com', 28, 'active', 'premium'),
('京都大学環境サークル', '環境・サステナビリティ', '関西', '環境問題に取り組む学生団体です。', 'https://environment.example.com', 'eco@example.com', 15, 'active', 'basic'),
('大阪大学技術サークル', '技術・研究', '関西', '最新技術の研究開発を行うサークルです。', 'https://tech.example.com', 'tech@example.com', 38, 'active', 'verified');

-- Insert sample organization events
INSERT INTO organization_events (organization_id, title, description, event_type, start_date, end_date, location, max_participants, status) VALUES
((SELECT id FROM organizations WHERE name = '東京大学起業サークルTNK' LIMIT 1), 'スタートアップピッチイベント', '学生起業家によるピッチイベント', 'competition', '2024-03-15 14:00:00+09', '2024-03-15 18:00:00+09', '東京大学本郷キャンパス', 100, 'approved'),
((SELECT id FROM organizations WHERE name = '早稲田大学国際交流サークル' LIMIT 1), 'グローバル学生会議', '世界15カ国からの学生が参加する国際会議', 'conference', '2024-04-20 09:00:00+09', '2024-04-22 17:00:00+09', '早稲田大学', 150, 'approved'),
((SELECT id FROM organizations WHERE name = '慶應義塾大学ボランティア団体' LIMIT 1), '地域清掃活動', '渋谷区での清掃ボランティア活動', 'other', '2024-03-10 09:00:00+09', '2024-03-10 12:00:00+09', '渋谷区', 50, 'completed');

-- Insert sample organization reports
INSERT INTO organization_reports (organization_id, report_type, title, content, period_start, period_end, status) VALUES
((SELECT id FROM organizations WHERE name = '東京大学起業サークルTNK' LIMIT 1), 'activity', '2024年度上半期活動報告', '新規メンバー20名加入、起業支援プログラム実施', '2024-04-01', '2024-09-30', 'submitted'),
((SELECT id FROM organizations WHERE name = '早稲田大学国際交流サークル' LIMIT 1), 'annual', '2024年度年次報告書', '国際交流プログラムの実施状況と成果', '2024-04-01', '2025-03-31', 'draft'),
((SELECT id FROM organizations WHERE name = '慶應義塾大学ボランティア団体' LIMIT 1), 'impact', '地域貢献活動レポート', '年間ボランティア活動の社会への影響', '2024-01-01', '2024-12-31', 'approved');

-- Insert sample organization applications
INSERT INTO organization_applications (organization_id, application_type, title, description, requested_amount, status, priority) VALUES
((SELECT id FROM organizations WHERE name = '京都大学環境サークル' LIMIT 1), 'funding', '環境プロジェクト資金申請', '太陽光発電システム導入プロジェクト', 500000, 'pending', 'high'),
((SELECT id FROM organizations WHERE name = '大阪大学技術サークル' LIMIT 1), 'partnership', '企業連携プログラム申請', '大手IT企業との技術交流プログラム', 0, 'under_review', 'normal'),
((SELECT id FROM organizations WHERE name = '東京大学起業サークルTNK' LIMIT 1), 'media_coverage', 'メディア取材申請', '起業家インタビュー記事の取材', 0, 'approved', 'normal'); 