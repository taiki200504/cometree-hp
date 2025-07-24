import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

// GET a single organization by ID
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

  const { data: organization, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching organization:', error)
    return NextResponse.json({ error: `Organization not found: ${error.message}` }, { status: 404 })
  }

  return NextResponse.json(organization)
}

// PATCH (update) an organization
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

  const { data: updatedOrganization, error: updateError } = await supabase
    .from('organizations')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (updateError) {
    console.error('Error updating organization:', updateError)
    return NextResponse.json({ error: `Failed to update organization: ${updateError.message}` }, { status: 500 })
  }

  return NextResponse.json(updatedOrganization)
}

// DELETE an organization
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
    .from('organizations')
    .delete()
    .eq('id', id)

  if (deleteError) {
    console.error('Error deleting organization:', deleteError)
    return NextResponse.json({ error: `Failed to delete organization: ${deleteError.message}` }, { status: 500 })
  }

  return NextResponse.json({ message: 'Organization deleted successfully' })
}
