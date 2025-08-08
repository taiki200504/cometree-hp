import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('podcast_episodes')
      .select('*')
      .eq('id', params.id)
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
    const body = await request.json()
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('podcast_episodes')
      .update({
        show_id: body.show_id,
        title: body.title,
        description: body.description,
        episode_number: body.episode_number,
        duration_minutes: body.duration_minutes,
        published_at: body.published_at,
        audio_url: body.audio_url,
        video_url: body.video_url,
        status: body.status,
        view_count: body.view_count,
      })
      .eq('id', params.id)
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
    const supabase = createAdminClient()
    const { error } = await supabase
      .from('podcast_episodes')
      .delete()
      .eq('id', params.id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
}


