-- Add admin user to existing users table
INSERT INTO public.users (id, email, role)
SELECT 
    (SELECT id FROM auth.users WHERE email = 'gakusei.union226@gmail.com' LIMIT 1),
    'gakusei.union226@gmail.com',
    'admin'
WHERE NOT EXISTS (
    SELECT 1 FROM public.users WHERE email = 'gakusei.union226@gmail.com'
);

-- Update existing user to admin if exists
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'gakusei.union226@gmail.com';

-- Check current users
SELECT id, email, role, created_at FROM public.users; 