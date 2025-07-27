import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

// GET a single news article by ID
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

  const { data: article, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ error: `Article not found: ${error.message}` }, { status: 404 })
  }

  return NextResponse.json(article)
}

// PATCH (update) a news article
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

  const { data: updatedArticle, error: updateError } = await supabase
    .from('news')
    .update({
      ...body,
      updated_at: new Date().toISOString(),
      // If published status is changed to true, set the published_at date
      ...(body.is_published && !body.published_at && { published_at: new Date().toISOString() }),
    })
    .eq('id', id)
    .select()
    .single()

  if (updateError) {
    console.error('Error updating news:', updateError)
    if (updateError.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'このスラッグは既に使用されています。' }, { status: 409 })
    }
    return NextResponse.json({ error: `Failed to update article: ${updateError.message}` }, { status: 500 })
  }

  return NextResponse.json(updatedArticle)
}

// DELETE a news article
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
    .from('news')
    .delete()
    .eq('id', id)

  if (deleteError) {
    console.error('Error deleting news:', deleteError)
    return NextResponse.json({ error: `Failed to delete article: ${deleteError.message}` }, { status: 500 })
  }

  return NextResponse.json({ message: 'Article deleted successfully' })
}