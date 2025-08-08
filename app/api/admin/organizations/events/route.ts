import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try { await requireAdmin(request) } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 403 }) }
  const supabase = createAdminClient()
  const { searchParams } = new URL(request.url)
  const orgId = searchParams.get('organization_id') || undefined
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  let query = supabase.from('organization_events').select('*').order('start_date', { ascending: false }).limit(limit)
  if (orgId) query = query.eq('organization_id', orgId)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ events: data || [] })
}

export async function POST(request: NextRequest) {
  try { await requireAdmin(request) } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 403 }) }
  const supabase = createAdminClient()
  const body = await request.json()
  const { data, error } = await supabase.from('organization_events').insert({
    organization_id: body.organization_id,
    title: body.title,
    event_type: body.event_type,
    start_date: body.start_date,
    status: body.status ?? 'upcoming',
    max_participants: body.max_participants,
    current_participants: body.current_participants ?? 0,
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}


