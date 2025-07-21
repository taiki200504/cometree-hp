import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

// Supabaseクライアントの作成
const createServerSupabaseClient = async () => {
  const cookieStore = await cookies()
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          cookie: cookieStore.toString(),
        },
      },
    }
  )
}

const createAdminSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// ユーザー型定義
export interface User {
  id: string
  email: string
  name?: string
  role?: string
  organization_id?: string
}

// 現在のユーザーを取得
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // ユーザーの詳細情報を取得
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('name, role, organization_id')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Profile fetch error:', profileError)
    }

    return {
      id: user.id,
      email: user.email!,
      name: profile?.name || user.user_metadata?.name,
      role: profile?.role || 'user',
      organization_id: profile?.organization_id
    }
  } catch (error) {
    console.error('getCurrentUser error:', error)
    return null
  }
}

// サインイン
export async function signIn(email: string, password: string) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw error
    }

    return { success: true, user: data.user }
  } catch (error) {
    console.error('Sign in error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Sign in failed' }
  }
}

// サインアップ
export async function signUp(email: string, password: string, name?: string) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0]
        }
      }
    })

    if (error) {
      throw error
    }

    return { success: true, user: data.user }
  } catch (error) {
    console.error('Sign up error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Sign up failed' }
  }
}

// サインアウト
export async function signOut() {
  try {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Sign out error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Sign out failed' }
  }
}

// 認証が必要なミドルウェア
export async function requireAuth(request: NextRequest) {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  return user
}

// 管理者認証が必要なミドルウェア
export async function requireAdmin(request: NextRequest) {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error('Authentication required')
  }
  
  if (user.role !== 'admin') {
    throw new Error('Admin access required')
  }
  
  return user
}

// アクセスログを記録
export async function logAccess(
  userId: string | null,
  endpoint: string,
  method: string,
  statusCode: number,
  responseTime: number
) {
  try {
    const supabase = createAdminSupabaseClient()
    
    await supabase
      .from('access_logs')
      .insert({
        user_id: userId,
        endpoint,
        method,
        status_code: statusCode,
        response_time: responseTime,
        timestamp: new Date().toISOString()
      })
  } catch (error) {
    console.error('Log access error:', error)
  }
}

// サーバーサイドのSupabaseクライアントをエクスポート
export { createServerSupabaseClient, createAdminSupabaseClient } 