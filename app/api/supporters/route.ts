import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get active supporters from the database
    const { data: supporters, error } = await supabase
      .from('supporters')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching supporters:', error)
      return NextResponse.json(
        { error: '支援者情報の取得に失敗しました。' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      supporters: supporters || [],
      totalCount: supporters?.length || 0
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。' },
      { status: 500 }
    )
  }
} 