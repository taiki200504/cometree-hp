import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

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