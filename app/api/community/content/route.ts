import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const contentSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  content: z.string().min(1, 'コンテンツは必須です'),
  type: z.enum(['news', 'event', 'document']),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  organizationId: z.string().uuid(),
})

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    let query = supabase
      .from('organization_content')
      .select('*')
      .eq('organization_id', organizationId)

    if (type) {
      query = query.eq('type', type)
    }
    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'コンテンツの取得に失敗しました' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // 認証チェック
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    const body = await request.json()
    const parsed = contentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: '入力データが無効です', issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { title, content, type, status, organizationId } = parsed.data

    const { data, error } = await supabase
      .from('organization_content')
      .insert({
        title,
        content,
        type,
        status,
        organization_id: organizationId,
        created_by: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'コンテンツの作成に失敗しました' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}
