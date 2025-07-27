import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

// GET a single event by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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
  const { id } = params

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json({ error: `Event not found: ${error.message}` }, { status: 404 })
  }

  return NextResponse.json(event)
}

// PATCH (update) an event
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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

  const { data: updatedEvent, error: updateError } = await supabase
    .from('events')
    .update({
      ...body,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (updateError) {
    console.error('Error updating event:', updateError)
    return NextResponse.json({ error: `Failed to update event: ${updateError.message}` }, { status: 500 })
  }

  return NextResponse.json(updatedEvent)
}

// DELETE an event
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
    .from('events')
    .delete()
    .eq('id', id)

  if (deleteError) {
    console.error('Error deleting event:', deleteError)
    return NextResponse.json({ error: `Failed to delete event: ${deleteError.message}` }, { status: 500 })
  }

  return NextResponse.json({ message: 'Event deleted successfully' })
}
