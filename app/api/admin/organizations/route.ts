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
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[API] Supabase env missing: check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
      return NextResponse.json({ error: 'Server is not configured for database access. Please set SUPABASE_SERVICE_ROLE_KEY on the server.' }, { status: 500 })
    }
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || 'all'
    const verification = searchParams.get('verification') || 'all'
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('organizations')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%`)
    }

    // Apply status filter
    if (status !== 'all') {
      query = query.eq('status', status)
    }

    // Apply verification filter
    if (verification !== 'all') {
      query = query.eq('verification_level', verification)
    }

    // Apply pagination and ordering
    const { data: organizations, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: error.message || 'Failed to fetch organizations' }, { status: 500 })
    }

    return NextResponse.json({
      organizations: organizations || [],
      totalCount: count || 0
    })
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
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('[API] Supabase env missing: check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
      return NextResponse.json({ error: 'Server is not configured for database access. Please set SUPABASE_SERVICE_ROLE_KEY on the server.' }, { status: 500 })
    }
    const supabase = createAdminClient()
    const organizationData = await request.json()
    
    // Validate required fields
    if (!organizationData.name) {
      return NextResponse.json({ 
        error: '団体名は必須項目です。' 
      }, { status: 400 })
    }

    // Set default values
    const dataToInsert = {
      ...organizationData,
      status: organizationData.status || 'active',
      verification_level: organizationData.verification_level || 'basic',
      member_count: organizationData.member_count || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('organizations')
      .insert([dataToInsert])
      .select()

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: error.message || 'Failed to create organization' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}