import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('podcast_external_links')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.error('Error fetching podcast external links:', error)
      return NextResponse.json({ error: 'Failed to fetch external links' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in podcast external links GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
