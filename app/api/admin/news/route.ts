import { createClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET() {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  const supabase = createAdminSupabaseClient()
  const { data: news, error } = await supabase.from('news').select('*')

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(news)
}