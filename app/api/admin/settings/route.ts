import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'
import { SystemSettingsSchema } from '@/lib/settings'

const FIXED_SETTINGS_ID = '00000000-0000-0000-0000-000000000001'

// GET: Fetch system settings (single row)
export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Forbidden' }, { status: 403 })
  }

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('system_settings')
      .select('settings, updated_at')
      .eq('id', FIXED_SETTINGS_ID)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('[Settings][GET] DB error:', error)
      return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
    }

    return NextResponse.json({ settings: data?.settings || {}, updatedAt: data?.updated_at || null })
  } catch (error) {
    console.error('[Settings][GET] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT: Update system settings (merge/replace)
export async function PUT(request: NextRequest) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const incoming = body?.settings ?? {}

    if (typeof incoming !== 'object' || Array.isArray(incoming)) {
      return NextResponse.json({ error: 'Invalid settings payload' }, { status: 400 })
    }

    // Validate and strip unknowns using Zod
    const parsed = SystemSettingsSchema.safeParse(incoming)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Read current settings for deep-merge semantics
    const { data: currentRow } = await supabase
      .from('system_settings')
      .select('settings')
      .eq('id', FIXED_SETTINGS_ID)
      .single()

    const currentSettings = (currentRow?.settings as any) || {}
    const nextSettings = {
      ...currentSettings,
      ...(parsed.data || {}),
      site: { ...(currentSettings?.site || {}), ...(parsed.data?.site || {}) },
      cms: { ...(currentSettings?.cms || {}), ...(parsed.data?.cms || {}) },
      notifications: { ...(currentSettings?.notifications || {}), ...(parsed.data as any)?.notifications || {} },
      security: { ...(currentSettings?.security || {}), ...(parsed.data as any)?.security || {} },
      appearance: { ...(currentSettings?.appearance || {}), ...(parsed.data as any)?.appearance || {} },
    }

    // Upsert single-row settings
    const { data, error } = await supabase
      .from('system_settings')
      .upsert({ id: FIXED_SETTINGS_ID, settings: nextSettings, updated_at: new Date().toISOString() }, { onConflict: 'id' })
      .select('settings, updated_at')
      .single()

    if (error) {
      console.error('[Settings][PUT] DB error:', error)
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
    }

    return NextResponse.json({ settings: data?.settings || {}, updatedAt: data?.updated_at || null })
  } catch (error) {
    console.error('[Settings][PUT] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

