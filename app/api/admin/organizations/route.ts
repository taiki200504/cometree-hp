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
    const verification = searchParams.get('verification') || 'all'
    const offset = (page - 1) * limit

    // Build base query
    let baseQuery = supabase
      .from('organizations')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (search) {
      // Search only on columns that certainly exist in schema
      baseQuery = baseQuery.or(`name.ilike.%${search}%,description.ilike.%${search}%`)
    }

    // Apply status filter
    if (status !== 'all') {
      baseQuery = baseQuery.eq('status', status)
    }

    // Apply verification filter
    // Apply verification filter if column exists; if not, skip gracefully below
    let query = baseQuery
    if (verification !== 'all') {
      query = baseQuery.eq('verification_level', verification)
    }

    // Apply pagination and ordering
    let { data: organizations, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    // If error due to missing verification_level, retry without that filter
    if (error && (error.message?.includes('verification_level') || error.message?.includes('column') && error.message?.includes('does not exist'))) {
      const retry = await baseQuery
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false })
      organizations = retry.data || []
      count = retry.count || 0
      error = retry.error as any
    }

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
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : createClient()
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