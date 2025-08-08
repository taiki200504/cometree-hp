import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin(request)
    console.log('[API] Admin access granted for user:', user.email)
  } catch (error: any) {
    console.error('[API] Admin access denied:', error.message)
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || 'all'
    const status = searchParams.get('status') || 'all'
    const visibility = searchParams.get('visibility') || 'all'
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('organization_content')
      .select('*', { count: 'exact' })
      .eq('organization_id', params.id)

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,author_name.ilike.%${search}%`)
    }

    // Apply type filter
    if (type !== 'all') {
      query = query.eq('type', type)
    }

    // Apply status filter
    if (status !== 'all') {
      query = query.eq('status', status)
    }

    // Apply visibility filter
    if (visibility !== 'all') {
      query = query.eq('visibility', visibility)
    }

    // Apply pagination and ordering
    const { data: contentItems, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch content items' }, { status: 500 })
    }

    return NextResponse.json({
      contentItems: contentItems || [],
      totalCount: count || 0
    })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAdmin(request)
    console.log('[API] Admin access granted for user:', user.email)
  } catch (error: any) {
    console.error('[API] Admin access denied:', error.message)
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  
  try {
    const supabase = createAdminClient()
    const contentData = await request.json()
    
    // Validate required fields
    if (!contentData.title || !contentData.content) {
      return NextResponse.json({ 
        error: 'タイトルとコンテンツは必須項目です。' 
      }, { status: 400 })
    }

    // Set default values
    const dataToInsert = {
      ...contentData,
      organization_id: params.id,
      author_name: contentData.author_name || '管理者',
      status: contentData.status || 'draft',
      type: contentData.type || 'news',
      tags: contentData.tags || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('organization_content')
      .insert([dataToInsert])
      .select()

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: 'Failed to create content' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      content: data?.[0] 
    })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
