-- access_logs: used by lib/auth.ts logAccess() for optional request logging
CREATE TABLE IF NOT EXISTS public.access_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  response_time INTEGER NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_access_logs_timestamp ON public.access_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_access_logs_user_id ON public.access_logs(user_id);

ALTER TABLE public.access_logs ENABLE ROW LEVEL SECURITY;

-- No direct access from anon/authenticated; app uses service role to insert
CREATE POLICY "No public access" ON public.access_logs
  FOR ALL USING (false);

COMMENT ON TABLE public.access_logs IS 'Request access log for auth/check and optional analytics; insert-only from app (service role).';
