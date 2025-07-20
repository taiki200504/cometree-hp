import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    // 実際のデータを取得（テーブルが存在しない場合は0を返す）
    const [
      newsCount,
      eventsCount,
      usersCount,
      organizationsCount,
      partnersCount,
      membersCount
    ] = await Promise.allSettled([
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

    // 結果を処理
    const getCount = (result: PromiseSettledResult<any>) => {
      if (result.status === 'fulfilled' && result.value.data !== null) {
        return result.value.count || 0
      }
      return 0
    }

    // ページビュー数（仮の実装）
    const views = 12470 // TODO: 実際のアクセスログから取得

    return NextResponse.json({
      news: getCount(newsCount),
      events: getCount(eventsCount),
      users: getCount(usersCount),
      organizations: getCount(organizationsCount),
      partners: getCount(partnersCount),
      members: getCount(membersCount),
      views
    })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    // エラー時はデフォルト値を返す
    return NextResponse.json({
      news: 0,
      events: 0,
      users: 0,
      organizations: 0,
      partners: 0,
      members: 0,
      views: 0
    })
  }
} 