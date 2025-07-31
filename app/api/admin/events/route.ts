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
  const status = searchParams.get('status') || 'all'
  const offset = (page - 1) * limit

  // Build query
  let query = supabase
    .from('events')
    .select('*', { count: 'exact' })

  // Apply search filter
  if (search) {
    query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`)
  }

  // Apply status filter
  if (status !== 'all') {
    if (status === 'upcoming') {
      query = query.gte('event_date', new Date().toISOString())
    } else if (status === 'past') {
      query = query.lt('event_date', new Date().toISOString())
    }
  }

  // Apply pagination and ordering
  const { data: events, error, count } = await query
    .range(offset, offset + limit - 1)
    .order('event_date', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get metrics
  const { data: metricsData, error: metricsError } = await supabase
    .from('events')
    .select('event_date, registration_count, max_participants')

  if (metricsError) {
    console.error('Error fetching metrics:', metricsError)
  }

  const now = new Date()
  const upcomingEvents = metricsData?.filter(e => new Date(e.event_date) >= now).length || 0
  const pastEvents = metricsData?.filter(e => new Date(e.event_date) < now).length || 0
  const totalRegistrations = metricsData?.reduce((sum, e) => sum + (e.registration_count || 0), 0) || 0

  // Calculate metrics
  const metrics = {
    totalEvents: count || 0,
    upcomingEvents,
    pastEvents,
    totalRegistrations,
    averageRegistrations: metricsData && metricsData.length > 0 
      ? Math.round(metricsData.reduce((sum, e) => sum + (e.registration_count || 0), 0) / metricsData.length)
      : 0
  }

  return NextResponse.json({
    events: events || [],
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
  const eventData = await request.json()
  
  // Validate required fields
  if (!eventData.title || !eventData.description || !eventData.event_date) {
    return NextResponse.json({ 
      error: 'タイトル、説明、開催日は必須項目です。' 
    }, { status: 400 })
  }

  // Set default values
  const dataToInsert = {
    ...eventData,
    registration_count: 0,
    max_participants: eventData.max_participants || 100,
    is_featured: eventData.is_featured || false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  const { data, error } = await supabase
    .from('events')
    .insert([dataToInsert])
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    success: true, 
    event: data?.[0] 
  })
}
