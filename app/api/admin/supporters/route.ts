import { createAdminSupabaseClient } from '@/lib/supabaseServer'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  const supabase = createAdminSupabaseClient()
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const search = searchParams.get('search') || ''
  const supportType = searchParams.get('support_type') || 'all'
  const offset = (page - 1) * limit

  // Build query
  let query = supabase
    .from('supporters')
    .select('*', { count: 'exact' })

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,type.ilike.%${search}%,description.ilike.%${search}%`)
  }

  // Apply support type filter
  if (supportType !== 'all') {
    query = query.eq('support_type', supportType)
  }

  // Apply pagination and ordering
  const { data: supporters, error, count } = await query
    .range(offset, offset + limit - 1)
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get metrics
  const { data: metricsData, error: metricsError } = await supabase
    .from('supporters')
    .select('support_type, is_active')

  if (metricsError) {
    console.error('Error fetching metrics:', metricsError)
  }

  // Calculate metrics
  const metrics = {
    totalSupporters: count || 0,
    activeSupporters: metricsData?.filter(s => s.is_active).length || 0,
    financialSupporters: metricsData?.filter(s => s.support_type === 'financial' && s.is_active).length || 0,
    mediaSupporters: metricsData?.filter(s => s.support_type === 'media' && s.is_active).length || 0,
    collaborationSupporters: metricsData?.filter(s => s.support_type === 'collaboration' && s.is_active).length || 0,
    individualSupporters: metricsData?.filter(s => s.support_type === 'individual' && s.is_active).length || 0
  }

  return NextResponse.json({
    supporters: supporters || [],
    totalCount: count || 0,
    metrics
  })
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 })
  }
  
  const supabase = createAdminSupabaseClient()
  const supporterData = await request.json()
  
  // Validate required fields
  if (!supporterData.name || !supporterData.type || !supporterData.support_type) {
    return NextResponse.json({ 
      error: '名前、タイプ、支援タイプは必須項目です。' 
    }, { status: 400 })
  }

  // Set default values
  const dataToInsert = {
    ...supporterData,
    is_active: supporterData.is_active !== undefined ? supporterData.is_active : true,
    display_order: supporterData.display_order || 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  const { data, error } = await supabase
    .from('supporters')
    .insert([dataToInsert])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
} 