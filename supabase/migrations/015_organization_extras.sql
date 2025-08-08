-- Organization-specific supplemental tables

CREATE TABLE IF NOT EXISTS public.organization_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  event_type TEXT DEFAULT 'general',
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'upcoming',
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_org_events_org_id ON public.organization_events(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_events_start_date ON public.organization_events(start_date);

CREATE TABLE IF NOT EXISTS public.organization_reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  report_type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'draft',
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_org_reports_org_id ON public.organization_reports(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_reports_submitted_at ON public.organization_reports(submitted_at);

CREATE TABLE IF NOT EXISTS public.organization_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  application_type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'pending',
  priority TEXT DEFAULT 'normal',
  requested_amount NUMERIC,
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_org_apps_org_id ON public.organization_applications(organization_id);
CREATE INDEX IF NOT EXISTS idx_org_apps_submitted_at ON public.organization_applications(submitted_at);

-- Enable RLS
ALTER TABLE public.organization_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_applications ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies: Admins can manage, org members can read their org
DROP POLICY IF EXISTS "Admins manage org events" ON public.organization_events;
DROP POLICY IF EXISTS "Admins manage org reports" ON public.organization_reports;
DROP POLICY IF EXISTS "Admins manage org applications" ON public.organization_applications;

CREATE POLICY "Admins manage org events" ON public.organization_events FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','editor'))
);
CREATE POLICY "Admins manage org reports" ON public.organization_reports FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','editor'))
);
CREATE POLICY "Admins manage org applications" ON public.organization_applications FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role IN ('admin','editor'))
);

-- Updated_at triggers
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_organization_events_updated_at'
  ) THEN
    CREATE TRIGGER update_organization_events_updated_at
      BEFORE UPDATE ON public.organization_events
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_organization_reports_updated_at'
  ) THEN
    CREATE TRIGGER update_organization_reports_updated_at
      BEFORE UPDATE ON public.organization_reports
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_organization_applications_updated_at'
  ) THEN
    CREATE TRIGGER update_organization_applications_updated_at
      BEFORE UPDATE ON public.organization_applications
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;


