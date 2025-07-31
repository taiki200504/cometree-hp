import { createAdminSupabaseClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: Request) {
  const supabase = createAdminSupabaseClient()
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = (page - 1) * limit

  const { data: members, error, count } = await supabase
    .from('members')
    .select('*', { count: 'exact' })
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    members,
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
  const memberData = await request.json()
  
  const { data, error } = await supabase
    .from('members')
    .insert([memberData])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}