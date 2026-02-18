import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('portal_links')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  await requireAdmin(request)
  const body = await request.json()
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('portal_links')
    .insert({
      title: body.title,
      url: body.url,
      description: body.description ?? null,
      badge: body.badge ?? null,
      color: body.color ?? null,
      category: body.category ?? 'external',
      visible: body.visible ?? true,
      sort_order: body.sort_order ?? 0,
    })
    .select('*')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function PUT(request: NextRequest) {
  await requireAdmin(request)
  const body = await request.json()
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('portal_links')
    .update({
      title: body.title,
      url: body.url,
      description: body.description ?? null,
      badge: body.badge ?? null,
      color: body.color ?? null,
      category: body.category ?? 'external',
      visible: body.visible ?? true,
      sort_order: body.sort_order ?? 0,
    })
    .eq('id', body.id)
    .select('*')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json(data)
}

export async function DELETE(request: NextRequest) {
  await requireAdmin(request)
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('portal_links')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}


