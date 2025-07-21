-- Temporarily disable RLS to test table access
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Check if table exists and has data
SELECT COUNT(*) as user_count FROM public.users;

-- Check specific user
SELECT id, email, role, created_at 
FROM public.users 
WHERE email = 'gakusei.union226@gmail.com';

-- Re-enable RLS after testing
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY; 