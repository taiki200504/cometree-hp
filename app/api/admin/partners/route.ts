import { createAdminClient, createClient } from '@/lib/supabase/server'
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
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : createClient()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const partnershipLevel = searchParams.get('partnership_level') || 'all'
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('partners')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply status filter
    if (status !== 'all') {
      query = query.eq('status', status)
    }

    // Apply partnership level filter
    if (partnershipLevel !== 'all') {
      query = query.eq('partnership_level', partnershipLevel)
    }

    // Apply pagination and ordering
    const { data: rawPartners, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch partners' }, { status: 500 })
    }

    // Shape DB → UI
    const partners = (rawPartners || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      category: p.category ?? null,
      is_active: (p.status ?? 'active') === 'active',
      logo_url: p.logo_url ?? null,
      website_url: p.website ?? null,
      created_at: p.created_at,
      updated_at: p.updated_at,
    }))

    return NextResponse.json({ partners, totalCount: count || partners.length })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
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
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : createClient()
    const partnerData = await request.json()
    
    // Validate required fields
    if (!partnerData.name) {
      return NextResponse.json({ 
        error: 'パートナー名は必須項目です。' 
      }, { status: 400 })
    }

    // Set default values
    const dataToInsert = {
      name: partnerData.name,
      description: partnerData.description ?? null,
      category: partnerData.category ?? null,
      logo_url: partnerData.logo_url ?? null,
      website: partnerData.website_url ?? partnerData.website ?? null,
      status: partnerData.is_active === false ? 'inactive' : (partnerData.status || 'active'),
      partnership_level: partnerData.partnership_level || 'basic',
      benefits: partnerData.benefits || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    
    const { data, error } = await supabase
      .from('partners')
      .insert([dataToInsert])
      .select()

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: error.message || 'Failed to create partner' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}