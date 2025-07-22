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
    const { user, session } = await signIn(email, password)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    const responseTime = Date.now() - startTime
    
    // アクセスログを記録
    await logAccess(user.id, '/api/auth/login', 'POST', 200, responseTime)
    
    // Set-Cookieでアクセストークンを返す
    const response = new NextResponse(JSON.stringify({
      success: true,
      user: {
        id: user.id,
        email: user.email
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
    if (session && session.access_token) {
      response.cookies.set('sb-access-token', session.access_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: true,
        // domain: '.gakusei-union-hp.vercel.app', // 必要なら有効化
        maxAge: 60 * 60 * 24 * 7 // 1週間
      })
    }
    return response;
    
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