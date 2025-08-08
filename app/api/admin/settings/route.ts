import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

const FIXED_SETTINGS_ID = '00000000-0000-0000-0000-000000000001'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('system_settings')
    .select('*')
    .eq('id', FIXED_SETTINGS_ID)
    .single()
  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ settings: data?.settings || null })
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  const supabase = createAdminClient()
  const body = await request.json()
  const payload = {
    id: FIXED_SETTINGS_ID,
    settings: body.settings ?? {},
    updated_at: new Date().toISOString(),
  }
  const { error } = await supabase
    .from('system_settings')
    .upsert(payload, { onConflict: 'id' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

