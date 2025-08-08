import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
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
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category') || 'all'
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('news')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }

    // Apply status filter
    if (status !== 'all') {
      query = query.eq('status', status)
    }

    // Apply category filter
    if (category !== 'all') {
      query = query.eq('category', category)
    }

    // Apply pagination and ordering
    const { data: news, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
    }

    const shaped = (news || []).map((n: any) => ({
      ...n,
      is_published: n.status === 'published'
    }))

    return NextResponse.json({
      news: shaped,
      totalCount: count || 0
    })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdmin(request)
    console.log('[API] Admin access granted for user:', user.email)
  } catch (error: any) {
    console.error('[API] Admin access denied:', error.message)
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  
  try {
    const supabase = createAdminClient()
    const newsData = await request.json()
    
    // Validate required fields
    if (!newsData.title || !newsData.content) {
      return NextResponse.json({ 
        error: 'タイトルとコンテンツは必須項目です。' 
      }, { status: 400 })
    }

    const wantPublished = !!newsData.is_published || newsData.status === 'published'
    // Map header_image_url -> featured_image (DB column)
    const featuredImage: string | null = newsData.header_image_url ?? newsData.featured_image ?? null
    // Set default values (avoid unknown columns)
    const dataToInsert = {
      title: newsData.title,
      content: newsData.content,
      excerpt: newsData.excerpt ?? null,
      category: newsData.category || 'general',
      status: wantPublished ? 'published' : (newsData.status || 'draft'),
      tags: newsData.tags || [],
      featured_image: featuredImage,
      published_at: wantPublished ? (newsData.published_at || new Date().toISOString()) : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('news')
      .insert([dataToInsert])
      .select()

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: 'Failed to create news' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}