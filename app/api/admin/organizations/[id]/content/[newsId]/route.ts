import { createAdminClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string, newsId: string } }
) {
  try {
    const user = await requireAdmin(request)
    console.log('[API] Admin access granted for user:', user.email)
  } catch (error: any) {
    console.error('[API] Admin access denied:', error.message)
    return NextResponse.json({ error: error.message }, { status: 403 })
  }

  try {
    const supabase = createAdminClient()
    const { error } = await supabase
      .from('organization_content')
      .delete()
      .eq('id', params.newsId)
      .eq('organization_id', params.id)

    if (error) {
      console.error('[API] Database error:', error)
      return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
