import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limiter'
import { sql } from '@supabase/supabase-js'

// GET a single board post by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()

  // Apply rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { allowed, remaining, resetAfter } = checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    )
  }

  try {
    const { id } = params

    // Increment view count
    await supabase
      .from('board_posts')
      .update({ view_count: supabase.sql`view_count + 1` })
      .eq('id', id)

    // Fetch the post with author information
    const { data: post, error } = await supabase
      .from('board_posts')
      .select(`
        *,
        users!board_posts_author_id_fkey(email)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching board post:', error)
      return NextResponse.json({ error: 'Board post not found' }, { status: 404 })
    }

    // Transform data to include author email
    const transformedPost = {
      ...post,
      author: post.users?.email || 'Unknown'
    }

    return NextResponse.json(transformedPost)
  } catch (error) {
    console.error('Error in board GET API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH (update) a board post
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()

  // Apply rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { allowed, remaining, resetAfter } = checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    )
  }

  try {
    const { id } = params
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const body = await request.json()

    // Check if user is the author or admin
    const { data: post, error: fetchError } = await supabase
      .from('board_posts')
      .select('author_id')
      .eq('id', id)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: 'Board post not found' }, { status: 404 })
    }

    // Check if user is admin
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const isAdmin = !userError && user?.role === 'admin'
    const isAuthor = post.author_id === session.user.id

    if (!isAdmin && !isAuthor) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { data: updatedPost, error: updateError } = await supabase
      .from('board_posts')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating board post:', updateError)
      return NextResponse.json({ error: 'Failed to update board post' }, { status: 500 })
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error in board PATCH API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE a board post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()

  // Apply rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const { allowed, remaining, resetAfter } = checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    )
  }

  try {
    const { id } = params
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Check if user is the author or admin
    const { data: post, error: fetchError } = await supabase
      .from('board_posts')
      .select('author_id')
      .eq('id', id)
      .single()

    if (fetchError) {
      return NextResponse.json({ error: 'Board post not found' }, { status: 404 })
    }

    // Check if user is admin
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const isAdmin = !userError && user?.role === 'admin'
    const isAuthor = post.author_id === session.user.id

    if (!isAdmin && !isAuthor) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { error: deleteError } = await supabase
      .from('board_posts')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Error deleting board post:', deleteError)
      return NextResponse.json({ error: 'Failed to delete board post' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Board post deleted successfully' })
  } catch (error) {
    console.error('Error in board DELETE API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 