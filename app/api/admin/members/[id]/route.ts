import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

// GET a single member by ID
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

  const { data: member, error } = await supabase
    .from('users') // Assuming 'members' refers to 'users' table
    .select('id, email, role')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching member:', error)
    return NextResponse.json({ error: `Member not found: ${error.message}` }, { status: 404 })
  }

  return NextResponse.json(member)
}

// PATCH (update) a member
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
  const { data: currentUser, error: currentUserError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()
  if (currentUserError || currentUser?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await request.json()
  const { email, role } = body // Only email and role are expected to be updatable for now

  // Update public.users table
  const { data: updatedMember, error: updateError } = await supabase
    .from('users')
    .update({ email, role, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (updateError) {
    console.error('Error updating member:', updateError)
    return NextResponse.json({ error: `Failed to update member: ${updateError.message}` }, { status: 500 })
  }

  // Optionally, update auth.users email if it's different
  if (email && updatedMember.email !== email) {
    const { error: authUpdateError } = await supabase.auth.admin.updateUserById(
      id,
      { email: email }
    )
    if (authUpdateError) {
      console.error('Error updating auth user email:', authUpdateError)
      return NextResponse.json({ error: `Failed to update auth user email: ${authUpdateError.message}` }, { status: 500 })
      // Decide if you want to roll back public.users update or just log
    }
  }

  return NextResponse.json(updatedMember)
}

// DELETE a member
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
  const { data: currentUser, error: currentUserError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()
  if (currentUserError || currentUser?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Delete from auth.users, which should cascade delete from public.users if foreign key is set up
  const { error: deleteError } = await supabase.auth.admin.deleteUser(id)

  if (deleteError) {
    console.error('Error deleting member:', deleteError)
    return NextResponse.json({ error: `Failed to delete member: ${deleteError.message}` }, { status: 500 })
  }

  return NextResponse.json({ message: 'Member deleted successfully' })
}
