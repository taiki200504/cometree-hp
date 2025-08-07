import { createClient, createAdminClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

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
    const supabase = createClient()
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

// サインアップ
export async function signUp(email: string, password: string, name?: string) {
  try {
    const supabase = createClient()
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
    const supabase = createAdminClient()
    
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