-- Create board_posts table
CREATE TABLE IF NOT EXISTS board_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security for board_posts
ALTER TABLE board_posts ENABLE ROW LEVEL SECURITY;

-- Policies for board_posts
-- Allow authenticated users to read all posts
CREATE POLICY "Board posts public read" ON board_posts FOR SELECT USING (true);

-- Allow authenticated users to create posts
CREATE POLICY "Authenticated users can create board posts" ON board_posts FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Allow users to update their own posts
CREATE POLICY "Users can update their own board posts" ON board_posts FOR UPDATE USING (auth.uid() = author_id);

-- Allow users to delete their own posts
CREATE POLICY "Users can delete their own board posts" ON board_posts FOR DELETE USING (auth.uid() = author_id);

-- Allow admins to manage all posts (override other policies)
CREATE POLICY "Admins can manage all board posts" ON board_posts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE public.users.id = auth.uid() AND public.users.role = 'admin')
);
