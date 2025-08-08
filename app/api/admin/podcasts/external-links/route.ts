import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[API] Supabase env missing for external-links')
      return NextResponse.json({ error: 'Server DB configuration missing' }, { status: 500 })
    }
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('podcast_external_links')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Error fetching podcast external links:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch external links' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in podcast external links GET:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
