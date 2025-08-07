import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limiter'
import { z } from 'zod'

// GET handler for fetching public board posts
export async function GET(request: NextRequest) {
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
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const offset = (page - 1) * limit

    let query = supabase
      .from('board_posts')
      .select(`
        id,
        title,
        content,
        category,
        tags,
        author_id,
        created_at,
        updated_at,
        view_count,
        comment_count,
        users!board_posts_author_id_fkey(email)
      `, { count: 'exact' })

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: posts, error, count } = await query

    if (error) {
      console.error('Error fetching board posts:', error)
      return NextResponse.json({ error: 'Failed to fetch board posts' }, { status: 500 })
    }

    // Transform data to include author email
    const transformedPosts = posts?.map((post: any) => ({
      ...post,
      author: post.users?.email || 'Unknown'
    })) || []

    return NextResponse.json({
      posts: transformedPosts,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
        hasNext: offset + limit < (count || 0),
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error in board API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST handler for creating a new board post (authenticated users only)
export async function POST(request: NextRequest) {
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
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const postSchema = z.object({
      title: z.string().min(1, { message: "Title is required" }).max(255),
      content: z.string().min(1, { message: "Content is required" }),
      category: z.string().optional(),
    });

    const body = await request.json();
    const parsed = postSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { title, content, category } = parsed.data;

    const { data: newPost, error: insertError } = await supabase
      .from('board_posts')
      .insert({
        title,
        content,
        category: category || 'general',
        author_id: session.user.id,
        view_count: 0,
        comment_count: 0
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating board post:', insertError)
      return NextResponse.json({ error: 'Failed to create board post' }, { status: 500 })
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error in board POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 