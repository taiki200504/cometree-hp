import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('podcast_episodes')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching podcast episodes:', error)
      return NextResponse.json({ error: 'Failed to fetch episodes' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in podcast episodes GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
