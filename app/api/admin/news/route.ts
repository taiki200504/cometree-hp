import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ニュース一覧取得
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    let query = supabase
      .from('news')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    // 検索フィルター
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
    }

    // ステータスフィルター
    if (status) {
      query = query.eq('status', status)
    }

    // ページネーション
    const from = (page - 1) * limit
    const to = from + limit - 1
    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error('Error fetching news:', error)
      return NextResponse.json({ error: 'ニュースの取得に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    })

  } catch (error) {
    console.error('Error in news GET:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// ニュース作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, status, category, featured_image, tags, author } = body

    // バリデーション
    if (!title || !content) {
      return NextResponse.json({ error: 'タイトルと本文は必須です' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('news')
      .insert({
        title,
        content,
        excerpt: excerpt || null,
        status: status || 'draft',
        category: category || 'general',
        featured_image: featured_image || null,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        author: author || 'admin',
        published_at: status === 'published' ? new Date().toISOString() : null
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating news:', error)
      return NextResponse.json({ error: 'ニュースの作成に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ data, message: 'ニュースが正常に作成されました' })

  } catch (error) {
    console.error('Error in news POST:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 