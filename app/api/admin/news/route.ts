import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  
  const supabase = createAdminClient()
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || 'all'
  const offset = (page - 1) * limit

  // Build query
  let query = supabase
    .from('news')
    .select('*', { count: 'exact' })

  // Apply search filter
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
  }

  // Apply status filter
  if (status !== 'all') {
    if (status === 'published') {
      query = query.eq('is_published', true)
    } else if (status === 'draft') {
      query = query.eq('is_published', false)
    }
  }

  // Apply pagination and ordering
  const { data: news, error, count } = await query
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get metrics
  const { data: metricsData, error: metricsError } = await supabase
    .from('news')
    .select('is_published, view_count')

  if (metricsError) {
    console.error('Error fetching metrics:', metricsError)
  }

  // Calculate metrics
  const metrics = {
    totalArticles: count || 0,
    publishedArticles: metricsData?.filter((n: { is_published: boolean; }) => n.is_published).length || 0,
    draftArticles: metricsData?.filter((n: { is_published: boolean; }) => !n.is_published).length || 0,
    totalViews: metricsData?.reduce((sum: number, n: { view_count: number; }) => sum + (n.view_count || 0), 0) || 0,
    averageViews: metricsData && metricsData.length > 0 
      ? Math.round(metricsData.reduce((sum: number, n: { view_count: number; }) => sum + (n.view_count || 0), 0) / metricsData.length)
      : 0
  }

  return NextResponse.json({
    news: news || [],
    totalCount: count || 0,
    metrics
  })
}

export async function POST(request: NextRequest) {
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

  // Set default values
  const dataToInsert = {
    ...newsData,
    is_published: newsData.is_published || false,
    published_at: newsData.is_published ? new Date().toISOString() : null,
    view_count: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  const { data, error } = await supabase
    .from('news')
    .insert([dataToInsert])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    news: data?.[0] 
  })
}