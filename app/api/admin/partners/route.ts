import { createAdminSupabaseClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: Request) {
  const supabase = createAdminSupabaseClient()
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = (page - 1) * limit

  const { data: partners, error, count } = await supabase
    .from('partners')
    .select('*', { count: 'exact' })
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    partners,
    totalCount: count,
  })
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  const supabase = createAdminSupabaseClient()
  const partnerData = await request.json()
  
  const { data, error } = await supabase
    .from('partners')
    .insert([partnerData])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}