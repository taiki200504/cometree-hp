import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { logAccess } from '@/lib/auth' // logAccessは引き続き使用

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    )
  }

  const supabase = createRouteHandlerClient({ cookies })
  
  // signInWithPasswordはセッションを自動的にCookieに保存します
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    const responseTime = Date.now() - startTime
    // ログイン失敗のログを記録
    await logAccess(null, '/api/auth/login', 'POST', 401, responseTime)
    return NextResponse.json(
      { error: 'Invalid credentials' }, 
      { status: 401 }
    )
  }

  // ユーザーのロールを確認
  const { data: userRole, error: roleError } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (roleError || userRole?.role !== 'admin') {
    const responseTime = Date.now() - startTime
    // 管理者権限がない場合もログを記録
    await logAccess(data.user.id, '/api/auth/login', 'POST', 403, responseTime)
    // 念のためサインアウトさせておく
    await supabase.auth.signOut()
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    )
  }

  const responseTime = Date.now() - startTime
  // ログイン成功のログを記録
  await logAccess(data.user.id, '/api/auth/login', 'POST', 200, responseTime)

  // 成功レスポンスにロール情報を含める
  return NextResponse.json({ 
    success: true, 
    user: { ...data.user, role: userRole.role } 
  })
} 