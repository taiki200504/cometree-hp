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
    const supporterType = searchParams.get('supporter_type') || 'all'
    const offset = (page - 1) * limit

    // Build query
    let query = supabase
      .from('supporters')
      .select('*', { count: 'exact' })

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,organization.ilike.%${search}%`)
    }

    // Apply status filter
    if (status !== 'all') {
      query = query.eq('status', status)
    }

    // Apply supporter type filter
    if (supporterType !== 'all') {
      query = query.eq('supporter_type', supporterType)
    }

    // Apply pagination and ordering
    const { data: supporters, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: 'Failed to fetch supporters' }, { status: 500 })
    }

    return NextResponse.json({
      supporters: supporters || [],
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
    const supporterData = await request.json()
    
    // Validate required fields
    if (!supporterData.name || !supporterData.email) {
      return NextResponse.json({ 
        error: '名前とメールアドレスは必須項目です。' 
      }, { status: 400 })
    }

    // Set default values
    const dataToInsert = {
      ...supporterData,
      status: supporterData.status || 'active',
      supporter_type: supporterData.supporter_type || 'individual',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    const { data, error } = await supabase
      .from('supporters')
      .insert([dataToInsert])
      .select()

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: 'Failed to create supporter' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 