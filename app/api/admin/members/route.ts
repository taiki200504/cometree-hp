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
  const category = searchParams.get('category') || 'all'
  const offset = (page - 1) * limit

  // Build query
  let query = supabase
    .from('members')
    .select('*', { count: 'exact' })

  // Apply search filter
  if (search) {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,position.ilike.%${search}%,university.ilike.%${search}%`)
  }

  // Apply category filter
  if (category !== 'all') {
    query = query.eq('category', category)
  }

  // Apply pagination and ordering
  const { data: members, error, count } = await query
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get metrics
  const { data: metricsData, error: metricsError } = await supabase
    .from('members')
    .select('category, is_representative')

  if (metricsError) {
    console.error('Error fetching metrics:', metricsError)
  }

  // Calculate metrics
  const metrics = {
    totalMembers: count || 0,
    coreMembers: metricsData?.filter((m: { category: string; }) => m.category === 'core').length || 0,
    advisors: metricsData?.filter((m: { category: string; }) => m.category === 'advisor').length || 0,
    staffMembers: metricsData?.filter((m: { category: string; }) => m.category === 'staff').length || 0,
    representatives: metricsData?.filter((m: { is_representative: boolean; }) => m.is_representative).length || 0
  }

  return NextResponse.json({
    members: members || [],
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
  const memberData = await request.json()
  
  // Validate required fields
  if (!memberData.name || !memberData.email || !memberData.position) {
    return NextResponse.json({ 
      error: '名前、メールアドレス、役職は必須項目です。' 
    }, { status: 400 })
  }

  // Set default values
  const dataToInsert = {
    ...memberData,
    role: memberData.role || 'member',
    category: memberData.category || 'staff',
    is_representative: memberData.is_representative || false,
    tags: memberData.tags || [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  const { data, error } = await supabase
    .from('members')
    .insert([dataToInsert])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}