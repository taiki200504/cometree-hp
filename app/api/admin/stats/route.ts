import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // 実際のデータを取得
    const [
      newsCount,
      eventsCount,
      usersCount,
      organizationsCount,
      partnersCount,
      membersCount
    ] = await Promise.all([
      // ニュース記事数
      supabase
        .from('news')
        .select('id', { count: 'exact', head: true }),
      
      // イベント数
      supabase
        .from('events')
        .select('id', { count: 'exact', head: true }),
      
      // ユーザー数
      supabase
        .from('users')
        .select('id', { count: 'exact', head: true }),
      
      // 加盟団体数
      supabase
        .from('organizations')
        .select('id', { count: 'exact', head: true }),
      
      // 提携団体数
      supabase
        .from('partners')
        .select('id', { count: 'exact', head: true }),
      
      // 運営メンバー数
      supabase
        .from('members')
        .select('id', { count: 'exact', head: true })
    ])

    // ページビュー数（仮の実装）
    const views = 12470 // TODO: 実際のアクセスログから取得

    return NextResponse.json({
      news: newsCount.count || 0,
      events: eventsCount.count || 0,
      users: usersCount.count || 0,
      organizations: organizationsCount.count || 0,
      partners: partnersCount.count || 0,
      members: membersCount.count || 0,
      views
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
} 