import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

// GET a single partner by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Apply rate limiting
  const ip = request.ip || 'unknown'; // Get client IP address
  const { allowed, remaining, resetAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    );
  }
  const supabase = createRouteHandlerClient({ cookies })
  const { id } = params

  const { data: partner, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching partner:', error)
    return NextResponse.json({ error: `Partner not found: ${error.message}` }, { status: 404 })
  }

  return NextResponse.json(partner)
}

// PATCH (update) a partner
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  // Apply rate limiting
  const ip = request.ip || 'unknown'; // Get client IP address
  const { allowed, remaining, resetAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    );
  }
  const supabase = createRouteHandlerClient({ cookies })
  const { id } = params

  // Admin auth check
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()
  if (userError || user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()

  const { data: updatedPartner, error: updateError } = await supabase
    .from('partners')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (updateError) {
    console.error('Error updating partner:', updateError)
    return NextResponse.json({ error: `Failed to update partner: ${updateError.message}` }, { status: 500 })
  }

  return NextResponse.json(updatedPartner)
}

// DELETE a partner
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  // Apply rate limiting
  const ip = request.ip || 'unknown'; // Get client IP address
  const { allowed, remaining, resetAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    );
  }
  const supabase = createRouteHandlerClient({ cookies })
  const { id } = params

  // Admin auth check
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()
  if (userError || user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { error: deleteError } = await supabase
    .from('partners')
    .delete()
    .eq('id', id)

  if (deleteError) {
    console.error('Error deleting partner:', deleteError)
    return NextResponse.json({ error: `Failed to delete partner: ${deleteError.message}` }, { status: 500 })
  }

  return NextResponse.json({ message: 'Partner deleted successfully' })
}
