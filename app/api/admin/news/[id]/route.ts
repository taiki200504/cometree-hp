import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// 個別ニュース取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching news:', error)
      return NextResponse.json({ error: 'ニュースが見つかりません' }, { status: 404 })
    }

    return NextResponse.json({ data })

  } catch (error) {
    console.error('Error in news GET:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// ニュース更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { title, content, excerpt, status, category, featured_image, tags, author } = body

    // バリデーション
    if (!title || !content) {
      return NextResponse.json({ error: 'タイトルと本文は必須です' }, { status: 400 })
    }

    const updateData: any = {
      title,
      content,
      excerpt: excerpt || null,
      status: status || 'draft',
      category: category || 'general',
      featured_image: featured_image || null,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      author: author || 'admin',
      updated_at: new Date().toISOString()
    }

    // 公開状態が変わった場合
    if (status === 'published') {
      updateData.published_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('news')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating news:', error)
      return NextResponse.json({ error: 'ニュースの更新に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ data, message: 'ニュースが正常に更新されました' })

  } catch (error) {
    console.error('Error in news PUT:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// ニュース削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting news:', error)
      return NextResponse.json({ error: 'ニュースの削除に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ message: 'ニュースが正常に削除されました' })

  } catch (error) {
    console.error('Error in news DELETE:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
} 