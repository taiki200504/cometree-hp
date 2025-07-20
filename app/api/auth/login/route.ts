import { NextRequest, NextResponse } from 'next/server'
import { signIn, logAccess } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    const { email, password } = await request.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Supabase Authを使用してログイン
    const { user } = await signIn(email, password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    const responseTime = Date.now() - startTime
    
    // アクセスログを記録
    await logAccess(user.id, '/api/auth/login', 'POST', 200, responseTime)
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email
      }
    })
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    // エラーログを記録
    await logAccess(null, '/api/auth/login', 'POST', 500, responseTime)
    
    console.error('Login error:', error)
    
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
} 