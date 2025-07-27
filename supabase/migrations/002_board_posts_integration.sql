-- Board posts table integration
-- This migration adds the complete board_posts table with all necessary columns

-- Drop existing board_posts table if it exists (for clean migration)
DROP TABLE IF EXISTS public.board_posts CASCADE;

-- Create comprehensive board_posts table
CREATE TABLE public.board_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT DEFAULT 'general',
    tags TEXT[] DEFAULT '{}',
    is_anonymous BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    allow_comments BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived', 'hidden', 'deleted')),
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    featured_image TEXT,
    author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_board_posts_status ON public.board_posts(status);
CREATE INDEX idx_board_posts_category ON public.board_posts(category);
CREATE INDEX idx_board_posts_created_at ON public.board_posts(created_at DESC);
CREATE INDEX idx_board_posts_author_id ON public.board_posts(author_id);
CREATE INDEX idx_board_posts_is_pinned ON public.board_posts(is_pinned DESC, created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.board_posts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Public read access for published posts
CREATE POLICY "Board posts public read" ON public.board_posts 
    FOR SELECT USING (status = 'published');

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create board posts" ON public.board_posts 
    FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Users can update their own posts
CREATE POLICY "Users can update their own board posts" ON public.board_posts 
    FOR UPDATE USING (auth.uid() = author_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete their own board posts" ON public.board_posts 
    FOR DELETE USING (auth.uid() = author_id);

-- Admins can manage all posts (override other policies)
CREATE POLICY "Admins can manage all board posts" ON public.board_posts 
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE public.users.id = auth.uid() 
            AND public.users.role = 'admin'
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_board_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_board_posts_updated_at_trigger
    BEFORE UPDATE ON public.board_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_board_posts_updated_at();

-- Insert some sample data
INSERT INTO public.board_posts (
    title, 
    content, 
    category, 
    tags, 
    status, 
    author_id
) VALUES 
(
    'UNION 掲示板へようこそ',
    'UNIONの掲示板へようこそ！ここでは学生同士の交流や情報共有を行っています。\n\n皆さんが自由に投稿できる場所ですので、積極的に活用してください。',
    'お知らせ',
    ARRAY['welcome', 'announcement'],
    'published',
    (SELECT id FROM public.users LIMIT 1)
),
(
    '今月のイベント情報',
    '今月開催予定のイベントについてお知らせします。\n\n- 学生交流会（第1金曜日）\n- 勉強会（毎週水曜日）\n- ボランティア活動（第3土曜日）\n\n詳細は各イベントページをご確認ください。',
    'イベント',
    ARRAY['events', 'monthly'],
    'published',
    (SELECT id FROM public.users LIMIT 1)
),
(
    '新機能のお知らせ',
    '掲示板に新しい機能が追加されました！\n\n- 投稿の検索機能\n- カテゴリ別フィルタリング\n- いいね機能\n\nより使いやすくなりましたので、ぜひお試しください。',
    'お知らせ',
    ARRAY['new-feature', 'update'],
    'published',
    (SELECT id FROM public.users LIMIT 1)
); 