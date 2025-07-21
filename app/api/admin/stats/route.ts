import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    // 各テーブルの件数を取得
    const [
      { count: newsCount },
      { count: eventsCount },
      { count: usersCount },
      { count: organizationsCount },
      { count: partnersCount },
      { count: membersCount },
      { count: boardPostsCount },
      { count: viewsCount }
    ] = await Promise.all([
      supabase.from('news').select('*', { count: 'exact', head: true }),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('organizations').select('*', { count: 'exact', head: true }),
      supabase.from('partners').select('*', { count: 'exact', head: true }),
      supabase.from('members').select('*', { count: 'exact', head: true }),
      supabase.from('board_posts').select('*', { count: 'exact', head: true }),
      supabase.from('page_views').select('*', { count: 'exact', head: true })
    ])

    return NextResponse.json({
      news: newsCount || 0,
      events: eventsCount || 0,
      users: usersCount || 0,
      organizations: organizationsCount || 0,
      partners: partnersCount || 0,
      members: membersCount || 0,
      boardPosts: boardPostsCount || 0,
      views: viewsCount || 0
    })

  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({
      news: 0,
      events: 0,
      users: 0,
      organizations: 0,
      partners: 0,
      members: 0,
      boardPosts: 0,
      views: 0
    })
  }
} 