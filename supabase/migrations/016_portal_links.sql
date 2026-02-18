-- portal_links: Admin-managed links displayed in the member portal
create table if not exists public.portal_links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  description text,
  badge text,
  color text,
  category text default 'external', -- e.g., quick, service, external, document
  visible boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Updated at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists portal_links_set_updated_at on public.portal_links;
create trigger portal_links_set_updated_at
before update on public.portal_links
for each row
execute procedure public.set_updated_at();

-- Enable RLS
alter table public.portal_links enable row level security;

-- Select: allow authenticated users to read only visible links
drop policy if exists "Allow authenticated read visible portal links" on public.portal_links;
create policy "Allow authenticated read visible portal links"
on public.portal_links
for select
to authenticated
using (visible = true);

-- Admin writes are performed via service role through server-side API; no direct client write policies.


