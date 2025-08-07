import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { logAccess } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const supabase = createClient()

  try {
    // Supabase Authを使用してログアウト
    await supabase.auth.signOut()
    
    const responseTime = Date.now() - startTime
    
    // アクセスログを記録
    await logAccess(null, '/api/auth/logout', 'POST', 200, responseTime)
    
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    // エラーログを記録
    await logAccess(null, '/api/auth/logout', 'POST', 500, responseTime)
    
    console.error('Logout error:', error)
    
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
} 