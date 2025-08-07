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
  const { data: post, error } = await supabase
    .from('board_posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!post) {
    return NextResponse.json({ error: '投稿が見つかりません。' }, { status: 404 })
  }

  return NextResponse.json(post)
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
  const postData = await request.json()

  // Validate required fields
  if (!postData.title || !postData.content) {
    return NextResponse.json({ 
      error: 'タイトルとコンテンツは必須項目です。' 
    }, { status: 400 })
  }

  const dataToUpdate = {
    ...postData,
    updated_at: new Date().toISOString()
  }

  // If publishing, set published_at
  if (postData.is_published && !postData.published_at) {
    dataToUpdate.published_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('board_posts')
    .update(dataToUpdate)
    .eq('id', params.id)
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    post: data?.[0] 
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
    .from('board_posts')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    message: '投稿が正常に削除されました。' 
  })
}