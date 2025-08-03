import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    
    const { data, error } = await supabase
      .from('podcast_shows')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching podcast shows:', error)
      return NextResponse.json({ error: 'Failed to fetch shows' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in podcast shows GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
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
      return NextResponse.json({ error: 'Failed to create show' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in podcast shows POST:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 