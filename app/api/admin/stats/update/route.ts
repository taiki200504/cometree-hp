import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })

  // Admin auth check
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()
  if (userError || user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    // 各テーブルの最新の件数を取得
    const [
      { count: newsCount },
      { count: eventsCount },
      { count: usersCount },
      { count: organizationsCount },
      { count: partnersCount },
    ] = await Promise.all([
      supabase.from('news').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('organizations').select('*', { count: 'exact', head: true }),
      supabase.from('partners').select('*', { count: 'exact', head: true }),
    ])

    // stats テーブルを更新
    const { data, error: updateError } = await supabase
      .from('stats')
      .update({
        news_count: newsCount || 0,
        event_count: eventsCount || 0,
        user_count: usersCount || 0,
        organization_count: organizationsCount || 0,
        partner_count: partnersCount || 0,
        updated_at: new Date().toISOString(),
      })
      .eq('id', '70d8dd7c-05b2-4d8e-bd55-77617129e8bd')
      .select()
      .single()

    if (updateError) {
      console.error('Error updating stats table:', updateError)
      return NextResponse.json({ error: 'Failed to update stats table' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Stats updated successfully', data })

  } catch (error) {
    console.error('Error in stats update API:', error)
    return NextResponse.json({ error: 'An unexpected error occurred during stats update' }, { status: 500 })
  }
}
