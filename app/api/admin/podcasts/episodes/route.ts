import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[API] Supabase env missing for episodes')
      return NextResponse.json({ error: 'Server DB configuration missing' }, { status: 500 })
    }
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('podcast_episodes')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching podcast episodes:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch episodes' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in podcast episodes GET:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
