import { createAdminClient } from '@/lib/supabase/server'
import { DATABASES, NotionDatabase } from '@/lib/notion-client'
import { getCmsConfig } from '@/lib/settings'
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
    const { mode, useNotion } = await getCmsConfig()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const searchRaw = searchParams.get('search') || ''
    const search = searchRaw.toLowerCase()
    const status = searchParams.get('status') || 'all'
    const category = searchParams.get('category') || 'all'
    const offset = (page - 1) * limit

    const notionConfigured = !!process.env.NOTION_TOKEN && !!DATABASES.EVENTS
    const shouldUseNotion = notionConfigured && useNotion && (mode === 'notion' || mode === 'hybrid')

    if (shouldUseNotion) {
      try {
        const notionDb = new NotionDatabase(DATABASES.EVENTS)
        const { data } = await notionDb.query(undefined, undefined, 200)
        let items = (data || []) as any[]

        // Normalize for UI expectations
        items = items.map((e) => ({
          ...e,
          start_date: e.date || e.start_date || null,
          is_published: e.status && e.status !== 'cancelled'
        }))

        if (search) {
          items = items.filter((e) => {
            const hay = `${e.title || ''} ${e.description || ''} ${e.location || ''}`.toLowerCase()
            return hay.includes(search)
          })
        }
        if (status !== 'all') {
          items = items.filter((e) => (e.status || null) === status)
        }
        if (category !== 'all') {
          items = items.filter((e) => (e.category || null) === category)
        }

        items.sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())

        const totalCount = items.length
        const paged = items.slice(offset, offset + limit)
        return NextResponse.json({ events: paged, totalCount, source: 'notion' })
      } catch (e) {
        console.error('[API][events] Notion path error; falling back to Supabase:', e)
        // Fall back below
      }
    }

    const supabase = createAdminClient()

    // Build query
    let query = supabase
      .from('events')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (searchRaw) {
      query = query.or(`title.ilike.%${searchRaw}%,description.ilike.%${searchRaw}%,location.ilike.%${searchRaw}%`)
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
    const { data: events, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }

    // Normalize fields for admin UI expectations
    const normalized = (events || []).map((e: any) => ({
      ...e,
      start_date: e.date || e.start_date || null,
      is_published: e.status && e.status !== 'cancelled'
    }))

    return NextResponse.json({
      events: normalized,
      totalCount: count || 0,
      source: 'supabase'
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
    const eventData = await request.json()
    
    // Validate required fields
    if (!eventData.title || (!eventData.date && !eventData.start_date)) {
      return NextResponse.json({ 
        error: 'タイトルと日時は必須項目です。' 
      }, { status: 400 })
    }

    // Set default values
    const startDate: string = eventData.start_date || eventData.date
    const parsed = new Date(startDate)
    const dataToInsert = {
      title: eventData.title,
      description: eventData.description || null,
      image_url: eventData.image_url || null,
      date: isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10),
      time: isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(11, 19),
      end_time: eventData.end_date ? new Date(eventData.end_date).toISOString().slice(11, 19) : null,
      location: eventData.location || null,
      status: eventData.status || (eventData.is_published ? 'upcoming' : 'cancelled'),
      category: eventData.category || 'general',
      current_participants: eventData.current_participants || 0,
      registration_required: eventData.registration_required || false,
      tags: eventData.tags || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('events')
      .insert([dataToInsert])
      .select()

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
