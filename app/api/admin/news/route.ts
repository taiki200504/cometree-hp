import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

// GET handler for fetching news articles
export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })

  // Apply rate limiting
  const ip = request.ip || 'unknown'; // Get client IP address
  const { allowed, remaining, resetAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    );
  }

  // 認証済みユーザーを取得
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError || !session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // ユーザーロールを確認
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (userError || user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // ページネーションのパラメータを取得
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const offset = (page - 1) * limit

  // ニュース記事と総数を取得
  const { data: news, error: newsError, count } = await supabase
    .from('news')
    .select('id, title, is_published, published_at, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (newsError) {
    console.error('Error fetching news:', newsError)
    return NextResponse.json({ error: `Failed to fetch news: ${newsError.message}` }, { status: 500 })
  }

  return NextResponse.json({ news, totalCount: count })
}

// POST handler for creating a new news article
export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })

  // Apply rate limiting
  const ip = request.ip || 'unknown'; // Get client IP address
  const { allowed, remaining, resetAfter } = checkRateLimit(ip);

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

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (userError || user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { title, content, excerpt, slug, is_published } = await request.json()

  // Basic validation
  if (!title || !content || !slug) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data: newArticle, error: insertError } = await supabase
    .from('news')
    .insert({
      title,
      content,
      excerpt,
      slug,
      is_published,
      published_at: is_published ? new Date().toISOString() : null,
      author_id: session.user.id,
    })
    .select()
    .single()

  if (insertError) {
    console.error('Error creating news:', insertError)
    // Handle potential unique constraint violation for slug
    if (insertError.code === '23505') {
        return NextResponse.json({ error: 'このスラッグは既に使用されています。' }, { status: 409 })
    }
    return NextResponse.json({ error: `Failed to create news article: ${insertError.message}` }, { status: 500 })
  }

  return NextResponse.json(newArticle)
}
