import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// GET handler for fetching board posts
export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
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

  // Pagination parameters
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = (page - 1) * limit

  // Fetch board posts and total count
  const { data: boardPosts, error: boardPostsError, count } = await supabase
    .from('board_posts')
    .select('id, title, created_at, author_id', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (boardPostsError) {
    console.error('Error fetching board posts:', boardPostsError)
    return NextResponse.json({ error: 'Failed to fetch board posts' }, { status: 500 })
  }

  return NextResponse.json({ boardPosts, totalCount: count })
}

// POST handler for creating a new board post
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
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

  const { title, content } = await request.json()

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
  }

  const { data: newPost, error: insertError } = await supabase
    .from('board_posts')
    .insert({
      title,
      content,
      author_id: session.user.id,
    })
    .select()
    .single()

  if (insertError) {
    console.error('Error creating board post:', insertError)
    return NextResponse.json({ error: 'Failed to create board post' }, { status: 500 })
  }

  return NextResponse.json(newPost)
}
