-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE news_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
CREATE TYPE board_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role user_role DEFAULT 'viewer',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table
CREATE TABLE public.news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'general',
    status news_status DEFAULT 'draft',
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    seo_title TEXT,
    seo_description TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0
);

-- Create events table
CREATE TABLE public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    end_time TIME,
    location TEXT,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    registration_required BOOLEAN DEFAULT false,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    contact_email TEXT,
    contact_phone TEXT,
    category TEXT DEFAULT 'general',
    status event_status DEFAULT 'upcoming',
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    gallery TEXT[] DEFAULT '{}',
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0
);

-- Create board_posts table
CREATE TABLE public.board_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT DEFAULT 'お知らせ',
    status board_status DEFAULT 'draft',
    tags TEXT[] DEFAULT '{}',
    is_pinned BOOLEAN DEFAULT false,
    allow_comments BOOLEAN DEFAULT true,
    featured_image TEXT,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0
);

-- Create organizations table
CREATE TABLE public.organizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    type TEXT DEFAULT 'student_group',
    status TEXT DEFAULT 'active',
    member_count INTEGER DEFAULT 0,
    location TEXT,
    website TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    logo_url TEXT,
    joined_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partners table
CREATE TABLE public.partners (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    partnership_level TEXT DEFAULT 'basic',
    benefits TEXT[] DEFAULT '{}',
    website TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    logo_url TEXT,
    partnership_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create members table
CREATE TABLE public.members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    responsibilities TEXT,
    achievements TEXT[] DEFAULT '{}',
    contact_email TEXT,
    contact_phone TEXT,
    avatar_url TEXT,
    join_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE public.comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES public.board_posts(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_email TEXT,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create page_views table for analytics
CREATE TABLE public.page_views (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_path TEXT NOT NULL,
    page_title TEXT,
    user_agent TEXT,
    ip_address INET,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_news_status ON public.news(status);
CREATE INDEX idx_news_category ON public.news(category);
CREATE INDEX idx_news_created_at ON public.news(created_at);
CREATE INDEX idx_events_date ON public.events(date);
CREATE INDEX idx_events_status ON public.events(status);
CREATE INDEX idx_board_posts_status ON public.board_posts(status);
CREATE INDEX idx_board_posts_category ON public.board_posts(category);
CREATE INDEX idx_board_posts_is_pinned ON public.board_posts(is_pinned);
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_board_posts_updated_at BEFORE UPDATE ON public.board_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON public.members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.board_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);

-- News policies
CREATE POLICY "News are viewable by everyone" ON public.news FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage news" ON public.news FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Events policies
CREATE POLICY "Events are viewable by everyone" ON public.events FOR SELECT USING (status != 'cancelled');
CREATE POLICY "Admins can manage events" ON public.events FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Board posts policies
CREATE POLICY "Board posts are viewable by everyone" ON public.board_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage board posts" ON public.board_posts FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Organizations, partners, members policies
CREATE POLICY "Organizations are viewable by everyone" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "Admins can manage organizations" ON public.organizations FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

CREATE POLICY "Partners are viewable by everyone" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Admins can manage partners" ON public.partners FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

CREATE POLICY "Members are viewable by everyone" ON public.members FOR SELECT USING (true);
CREATE POLICY "Admins can manage members" ON public.members FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON public.comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Admins can manage comments" ON public.comments FOR ALL USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);

-- Page views policies (admin only)
CREATE POLICY "Admins can view page views" ON public.page_views FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin', 'editor'))
);
CREATE POLICY "Anyone can insert page views" ON public.page_views FOR INSERT WITH CHECK (true); 