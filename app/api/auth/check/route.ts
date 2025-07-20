import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, logAccess } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // 現在のユーザーを取得
    const user = await getCurrentUser()
    
    const responseTime = Date.now() - startTime
    
    if (user) {
      // アクセスログを記録
      await logAccess(user.id, '/api/auth/check', 'GET', 200, responseTime)
      
      return NextResponse.json({
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          organization_id: user.organization_id
        }
      })
    } else {
      // アクセスログを記録
      await logAccess(null, '/api/auth/check', 'GET', 401, responseTime)
      
      return NextResponse.json({
        authenticated: false,
        user: null
      })
    }
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    // エラーログを記録
    await logAccess(null, '/api/auth/check', 'GET', 500, responseTime)
    
    console.error('Auth check error:', error)
    
    return NextResponse.json(
      { error: 'Authentication check failed' },
      { status: 500 }
    )
  }
} 