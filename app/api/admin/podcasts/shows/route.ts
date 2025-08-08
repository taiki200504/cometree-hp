import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[API] Supabase env missing for shows: check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
      return NextResponse.json({ error: 'Server DB configuration missing' }, { status: 500 })
    }
    const supabase = createAdminClient()
    
    const { data, error } = await supabase
      .from('podcast_shows')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching podcast shows:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch shows' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in podcast shows GET:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[API] Supabase env missing for shows POST')
      return NextResponse.json({ error: 'Server DB configuration missing' }, { status: 500 })
    }
    const supabase = createAdminClient()
    
    const { data, error } = await supabase
      .from('podcast_shows')
      .insert({
        slug: body.slug,
        name: body.name,
        description: body.description,
        cover_image_url: body.cover_image_url,
        color_gradient: body.color_gradient,
        total_episodes: body.total_episodes,
        status: body.status,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating podcast show:', error)
      return NextResponse.json({ error: error.message || 'Failed to create show' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in podcast shows POST:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
} 