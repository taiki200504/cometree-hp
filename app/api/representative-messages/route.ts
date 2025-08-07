import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get representative messages from the database
    const { data: messages, error } = await supabase
      .from('representative_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching representative messages:', error)
      return NextResponse.json(
        { error: '代表メッセージの取得に失敗しました。' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      messages: messages || [],
      totalCount: messages?.length || 0
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。' },
      { status: 500 }
    )
  }
} 