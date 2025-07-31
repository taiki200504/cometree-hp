import { createAdminSupabaseClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createAdminSupabaseClient()
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createAdminSupabaseClient()
  const partnerData = await request.json()
  
  const { data, error } = await supabase
    .from('partners')
    .update(partnerData)
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
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
    .from('partners')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Partner deleted successfully' })
}