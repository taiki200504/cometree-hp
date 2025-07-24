import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// GET a single board post by ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createRouteHandlerClient({ cookies })
  const { id } = params

  const { data: post, error } = await supabase
    .from('board_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching board post:', error)
    return NextResponse.json({ error: 'Board post not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}

// PATCH (update) a board post
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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
}

// DELETE a board post
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
    .from('board_posts')
    .delete()
    .eq('id', id)

  if (deleteError) {
    console.error('Error deleting board post:', deleteError)
    return NextResponse.json({ error: 'Failed to delete board post' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Board post deleted successfully' })
}
