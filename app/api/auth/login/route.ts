import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { z } from 'zod'
import { logAccess } from '@/lib/auth' // logAccessは引き続き使用
import { checkRateLimit } from '@/lib/rate-limiter' // Import rate limiter

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  // Apply rate limiting
  const ip = request.ip || 'unknown'; // Get client IP address
  const { allowed, remaining, resetAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests', retryAfter: resetAfter / 1000 },
      { status: 429, headers: { 'Retry-After': `${resetAfter / 1000}` } }
    );
  }

  const body = await request.json()
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { email, password } = parsed.data;

  const cookieStore = await cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
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