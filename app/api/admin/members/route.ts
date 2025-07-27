import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

// GET handler for fetching members (users with roles)
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

  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Admin check
  const { data: currentUser, error: currentUserError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (currentUserError || currentUser?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ページネーションのパラメータを取得
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = (page - 1) * limit

  // Fetch all users from public.users table with pagination
  const { data: members, error, count } = await supabase
    .from('users')
    .select('id, email, role, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json({ error: `Failed to fetch members: ${error.message}` }, { status: 500 })
  }

  return NextResponse.json({ members, totalCount: count })
}

// POST handler for creating a new member (user)
export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

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
  const { data: currentUser, error: currentUserError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (currentUserError || currentUser?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { email, password, role } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  try {
    // Create user in auth.users. The handle_new_user trigger will insert into public.users
    const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Automatically confirm email for admin created users
    })

    if (authError) {
      console.error('Error creating auth user:', authError)
      return NextResponse.json({ error: `Failed to create auth user: ${authError.message}` }, { status: 500 })
    }

    // If a specific role is provided and it's not the default 'admin' from trigger, update it.
    // Note: The trigger sets 'admin' by default. If we want to create 'editor', we need to update.
    if (role && role !== 'admin') {
      const { error: updateRoleError } = await supabase
        .from('users')
        .update({ role: role })
        .eq('id', newUser.user.id)
      
      if (updateRoleError) {
        console.error('Error updating user role:', updateRoleError)
        // Consider rolling back user creation if role update fails critically
        return NextResponse.json({ error: `Failed to set user role: ${updateRoleError.message}` }, { status: 500 })
      }
    }

    return NextResponse.json({ message: 'Member created successfully', user: newUser.user })
  } catch (error) {
    console.error('Unexpected error creating member:', error)
    return NextResponse.json({ error: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` }, { status: 500 })
  }
}
