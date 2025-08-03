import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string; newsId: string } }
) {
  try {
    const body = await request.json()
    const supabase = createAdminClient()
    
    const { data, error } = await supabase
      .from('organization_news')
      .update({
        title: body.title,
        content: body.content,
        category: body.category,
        status: body.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.newsId)
      .eq('organization_id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating organization news:', error)
      return NextResponse.json({ error: 'Failed to update news' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in organization news PUT:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; newsId: string } }
) {
  try {
    const supabase = createAdminClient()
    
    const { error } = await supabase
      .from('organization_news')
      .delete()
      .eq('id', params.newsId)
      .eq('organization_id', params.id)

    if (error) {
      console.error('Error deleting organization news:', error)
      return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in organization news DELETE:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 