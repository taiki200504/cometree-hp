import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)
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

export async function POST(request: NextRequest) {
  try {
    await requireAdmin(request)
    const body = await request.json()
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[API] Supabase env missing for episodes POST')
      return NextResponse.json({ error: 'Server DB configuration missing' }, { status: 500 })
    }
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('podcast_episodes')
      .insert({
        show_id: body.show_id,
        title: body.title,
        description: body.description,
        episode_number: body.episode_number,
        duration_minutes: body.duration_minutes,
        published_at: body.published_at,
        audio_url: body.audio_url,
        video_url: body.video_url,
        status: body.status ?? 'draft',
        view_count: body.view_count ?? 0,
      })
      .select()
      .single()
    if (error) {
      console.error('Error creating episode:', error)
      return NextResponse.json({ error: error.message || 'Failed to create episode' }, { status: 500 })
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in podcast episodes POST:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
