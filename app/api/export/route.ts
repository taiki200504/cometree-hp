import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { type, ids, format = 'csv' } = await request.json()

    if (!type || !ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: '無効なリクエストです' }, { status: 400 })
    }

    let data: any[] = []
    let filename = ''

    // データを取得
    switch (type) {
      case 'news':
        const { data: newsData, error: newsError } = await supabase
          .from('news')
          .select('*')
          .in('id', ids)
        
        if (newsError) throw newsError
        data = newsData || []
        filename = 'news_export'
        break

      case 'events':
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .in('id', ids)
        
        if (eventsError) throw eventsError
        data = eventsData || []
        filename = 'events_export'
        break

      case 'board_posts':
        const { data: boardData, error: boardError } = await supabase
          .from('board_posts')
          .select('*')
          .in('id', ids)
        
        if (boardError) throw boardError
        data = boardData || []
        filename = 'board_posts_export'
        break

      case 'organizations':
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .select('*')
          .in('id', ids)
        
        if (orgError) throw orgError
        data = orgData || []
        filename = 'organizations_export'
        break

      case 'partners':
        const { data: partnerData, error: partnerError } = await supabase
          .from('partners')
          .select('*')
          .in('id', ids)
        
        if (partnerError) throw partnerError
        data = partnerData || []
        filename = 'partners_export'
        break

      case 'members':
        const { data: memberData, error: memberError } = await supabase
          .from('members')
          .select('*')
          .in('id', ids)
        
        if (memberError) throw memberError
        data = memberData || []
        filename = 'members_export'
        break

      default:
        return NextResponse.json({ error: 'サポートされていないタイプです' }, { status: 400 })
    }

    if (data.length === 0) {
      return NextResponse.json({ error: 'エクスポートするデータが見つかりません' }, { status: 404 })
    }

    // フォーマットに応じてデータを変換
    let exportData: string
    let contentType: string

    if (format === 'csv') {
      exportData = convertToCSV(data)
      contentType = 'text/csv'
      filename += '.csv'
    } else if (format === 'json') {
      exportData = JSON.stringify(data, null, 2)
      contentType = 'application/json'
      filename += '.json'
    } else {
      return NextResponse.json({ error: 'サポートされていないフォーマットです' }, { status: 400 })
    }

    // レスポンスを返す
    return new NextResponse(exportData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'エクスポート中にエラーが発生しました' }, { status: 500 })
  }
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return ''

  // ヘッダーを取得
  const headers = Object.keys(data[0])
  
  // CSVヘッダー行
  const csvHeader = headers.map(header => `"${header}"`).join(',')
  
  // CSVデータ行
  const csvRows = data.map(row => {
    return headers.map(header => {
      const value = row[header]
      // 配列の場合は文字列に変換
      if (Array.isArray(value)) {
        return `"${value.join(', ')}"`
      }
      // null/undefinedの場合は空文字
      if (value === null || value === undefined) {
        return '""'
      }
      // 文字列に変換してエスケープ
      return `"${String(value).replace(/"/g, '""')}"`
    }).join(',')
  })
  
  return [csvHeader, ...csvRows].join('\n')
} 