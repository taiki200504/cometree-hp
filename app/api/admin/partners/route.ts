import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

// GET handler for fetching partners
export async function GET(request: NextRequest) {
  // Apply rate limiting (admin route)
  const ip = request.ip || 'unknown'; // Get client IP address
  const { allowed, remaining, resetAfter } = checkRateLimit(ip, true);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    );
  }

  const supabase = createRouteHandlerClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // ページネーションのパラメータを取得
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = (page - 1) * limit

  // 提携団体と総数を取得
  const { data: partners, error, count } = await supabase
    .from('partners')
    .select('id, name, category, is_active', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ error: `Failed to fetch partners: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ partners, totalCount: count })
}

// POST handler for creating a new partner
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })

  // Apply rate limiting (admin route)
  const ip = request.ip || 'unknown'; // Get client IP address
  const { allowed, remaining, resetAfter } = checkRateLimit(ip, true);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    );
  }

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Admin check
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (userError || user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()

  if (!body.name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data: newPartner, error: insertError } = await supabase
    .from('partners')
    .insert({ ...body })
    .select()
    .single()

  if (insertError) {
    console.error('Error creating partner:', insertError)
    return NextResponse.json({ error: `Failed to create partner: ${insertError.message}` }, { status: 500 })
  }

  return NextResponse.json(newPartner)
}
