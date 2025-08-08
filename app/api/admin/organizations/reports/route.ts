import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try { await requireAdmin(request) } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 403 }) }
  const supabase = createAdminClient()
  const { searchParams } = new URL(request.url)
  const orgId = searchParams.get('organization_id') || undefined
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  let query = supabase.from('organization_reports').select('*').order('submitted_at', { ascending: false }).limit(limit)
  if (orgId) query = query.eq('organization_id', orgId)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ reports: data || [] })
}

export async function POST(request: NextRequest) {
  try { await requireAdmin(request) } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 403 }) }
  const supabase = createAdminClient()
  const body = await request.json()
  const { data, error } = await supabase.from('organization_reports').insert({
    organization_id: body.organization_id,
    title: body.title,
    report_type: body.report_type,
    status: body.status ?? 'draft',
    submitted_at: body.submitted_at ?? null,
  }).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}


