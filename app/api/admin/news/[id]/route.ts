import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  const supabase = createAdminClient()
  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!news) {
    return NextResponse.json({ error: 'ニュースが見つかりません。' }, { status: 404 })
  }

  return NextResponse.json(news)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  const supabase = createAdminClient()
  const newsData = await request.json()

  // Validate required fields
  if (!newsData.title || !newsData.content) {
    return NextResponse.json({ 
      error: 'タイトルとコンテンツは必須項目です。' 
    }, { status: 400 })
  }

  const dataToUpdate = {
    ...newsData,
    updated_at: new Date().toISOString()
  }

  // If publishing, set published_at
  if (newsData.is_published && !newsData.published_at) {
    dataToUpdate.published_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('news')
    .update(dataToUpdate)
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    news: data?.[0] 
  })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    message: 'ニュースが正常に削除されました。' 
  })
}