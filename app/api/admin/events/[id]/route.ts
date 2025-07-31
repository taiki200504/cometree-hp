import { NextRequest, NextResponse } from 'next/server'
import { createAdminSupabaseClient } from '@/lib/supabaseServer'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  const supabase = createAdminSupabaseClient()
  const eventData = await request.json()

  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  const supabase = createAdminSupabaseClient()
  const { error } = await supabase.from('events').delete().eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Event deleted successfully' })
}
