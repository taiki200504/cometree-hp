import { createAdminSupabaseClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  const supabase = createAdminSupabaseClient()
  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!event) {
    return NextResponse.json({ error: 'イベントが見つかりません。' }, { status: 404 })
  }

  return NextResponse.json(event)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  const supabase = createAdminSupabaseClient()
  const eventData = await request.json()

  // Validate required fields
  if (!eventData.title || !eventData.description || !eventData.event_date) {
    return NextResponse.json({ 
      error: 'タイトル、説明、開催日は必須項目です。' 
    }, { status: 400 })
  }

  const dataToUpdate = {
    ...eventData,
    updated_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('events')
    .update(dataToUpdate)
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    event: data?.[0] 
  })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  const supabase = createAdminSupabaseClient()
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    message: 'イベントが正常に削除されました。' 
  })
}
