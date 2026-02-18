-- Contact form submissions (for site contact form)
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON public.contact_inquiries(created_at);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Only backend (service role) can insert; no public read
CREATE POLICY "No public access" ON public.contact_inquiries
  FOR ALL USING (false);

COMMENT ON TABLE public.contact_inquiries IS 'Contact form submissions from site; insert-only from app.';
