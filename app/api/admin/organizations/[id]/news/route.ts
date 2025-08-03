import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient()
    
    const { data, error } = await supabase
      .from('organization_news')
      .select('*')
      .eq('organization_id', params.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching organization news:', error)
      return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in organization news GET:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const supabase = createAdminClient()
    
    const { data, error } = await supabase
      .from('organization_news')
      .insert({
        title: body.title,
        content: body.content,
        category: body.category,
        status: body.status,
        organization_id: params.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating organization news:', error)
      return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in organization news POST:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 