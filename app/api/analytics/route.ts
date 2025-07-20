import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d' // 7d, 30d, 90d
    const type = searchParams.get('type') || 'overview' // overview, pages, sources

    const now = new Date()
    let startDate: Date

    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }

    switch (type) {
      case 'overview':
        return await getOverview(startDate, now)
      case 'pages':
        return await getPageAnalytics(startDate, now)
      case 'sources':
        return await getSourceAnalytics(startDate, now)
      default:
        return await getOverview(startDate, now)
    }
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'アクセス解析の取得に失敗しました' }, { status: 500 })
  }
}

async function getOverview(startDate: Date, endDate: Date) {
  // 総ページビュー数
  const { count: totalViews, error: viewsError } = await supabase
    .from('page_views')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())

  if (viewsError) throw viewsError

  // ユニークビジター数（IPアドレスベース）
  const { data: uniqueVisitors, error: visitorsError } = await supabase
    .from('page_views')
    .select('ip_address')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .not('ip_address', 'is', null)

  if (visitorsError) throw visitorsError

  const uniqueIPs = new Set(uniqueVisitors?.map(v => v.ip_address)).size

  // 日別ページビュー数
  const { data: dailyViews, error: dailyError } = await supabase
    .from('page_views')
    .select('created_at')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at', { ascending: true })

  if (dailyError) throw dailyError

  // 日別データを集計
  const dailyData = dailyViews?.reduce((acc, view) => {
    const date = new Date(view.created_at).toLocaleDateString('ja-JP')
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  return NextResponse.json({
    totalViews: totalViews || 0,
    uniqueVisitors: uniqueIPs,
    dailyData: Object.entries(dailyData).map(([date, views]) => ({
      date,
      views
    }))
  })
}

async function getPageAnalytics(startDate: Date, endDate: Date) {
  const { data: pageViews, error } = await supabase
    .from('page_views')
    .select('page_path, page_title')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())

  if (error) throw error

  // ページ別データを集計
  const pageData = pageViews?.reduce((acc, view) => {
    const path = view.page_path || '/'
    const title = view.page_title || path
    
    if (!acc[path]) {
      acc[path] = {
        path,
        title,
        views: 0
      }
    }
    acc[path].views += 1
    return acc
  }, {} as Record<string, { path: string; title: string; views: number }>) || {}

  return NextResponse.json({
    pages: Object.values(pageData).sort((a, b) => b.views - a.views)
  })
}

async function getSourceAnalytics(startDate: Date, endDate: Date) {
  const { data: pageViews, error } = await supabase
    .from('page_views')
    .select('referrer')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())

  if (error) throw error

  // リファラー別データを集計
  const sourceData = pageViews?.reduce((acc, view) => {
    let source = 'direct'
    
    if (view.referrer) {
      try {
        const url = new URL(view.referrer)
        if (url.hostname.includes('google')) {
          source = 'google'
        } else if (url.hostname.includes('facebook')) {
          source = 'facebook'
        } else if (url.hostname.includes('twitter')) {
          source = 'twitter'
        } else if (url.hostname.includes('instagram')) {
          source = 'instagram'
        } else {
          source = 'other'
        }
      } catch {
        source = 'other'
      }
    }

    if (!acc[source]) {
      acc[source] = {
        source,
        views: 0
      }
    }
    acc[source].views += 1
    return acc
  }, {} as Record<string, { source: string; views: number }>) || {}

  return NextResponse.json({
    sources: Object.values(sourceData).sort((a, b) => b.views - a.views)
  })
}

// ページビューを記録するAPI
export async function POST(request: NextRequest) {
  try {
    const { pagePath, pageTitle, userAgent, ipAddress, referrer } = await request.json()

    if (!pagePath) {
      return NextResponse.json({ error: 'ページパスは必須です' }, { status: 400 })
    }

    const { error } = await supabase
      .from('page_views')
      .insert({
        page_path: pagePath,
        page_title: pageTitle,
        user_agent: userAgent,
        ip_address: ipAddress,
        referrer: referrer
      })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Page view recording error:', error)
    return NextResponse.json({ error: 'ページビューの記録に失敗しました' }, { status: 500 })
  }
} 