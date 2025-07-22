-- このSQLはデバッグ目的で users テーブルの Row Level Security (RLS) を一時的に無効化します。
-- これにより、クライアントサイドからの読み取りがブロックされているかどうかの切り分けを行います。
-- 問題解決後は、必ず再度RLSを有効化してください。
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;