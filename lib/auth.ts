import { createServerSupabaseClient, createAdminSupabaseClient } from './supabase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type User = {
  id: string
  email: string
  name: string
  role: 'user' | 'admin' | 'moderator'
  organization_id?: string
}

// サーバーサイドでのユーザー取得
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }

    // ユーザープロファイル情報を取得
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return null
    }

    return {
      id: user.id,
      email: user.email!,
      name: profile.name,
      role: profile.role,
      organization_id: profile.organization_id
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// 認証が必要なページでの使用
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }
  
  return user
}

// 管理者権限が必要なページでの使用
export async function requireAdmin(): Promise<User> {
  const user = await requireAuth()
  
  if (user.role !== 'admin') {
    redirect('/auth/login')
  }
  
  return user
}

// 加盟団体メンバー権限が必要なページでの使用
export async function requireOrganizationMember(): Promise<User> {
  const user = await requireAuth()
  
  if (!user.organization_id) {
    redirect('/auth/login')
  }
  
  return user
}

// ログイン処理
export async function signIn(email: string, password: string) {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data
}

// ログアウト処理
export async function signOut() {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(error.message)
  }
}

// ユーザー登録処理
export async function signUp(email: string, password: string, name: string, organization_id?: string) {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        organization_id
      }
    }
  })
  
  if (error) {
    throw new Error(error.message)
  }
  
  // ユーザープロファイルを作成
  if (data.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email: data.user.email!,
        name,
        role: 'user',
        organization_id,
        is_active: true
      })
    
    if (profileError) {
      throw new Error(profileError.message)
    }
  }
  
  return data
}

// パスワードリセット
export async function resetPassword(email: string) {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  })
  
  if (error) {
    throw new Error(error.message)
  }
}

// ユーザー情報更新
export async function updateUserProfile(userId: string, updates: Partial<User>) {
  const supabase = createServerSupabaseClient()
  
  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
  
  if (error) {
    throw new Error(error.message)
  }
}

// 組織情報取得
export async function getOrganization(organizationId: string) {
  const supabase = createServerSupabaseClient()
  
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', organizationId)
    .single()
  
  if (error) {
    throw new Error(error.message)
  }
  
  return data
}

// アクセスログ記録
export async function logAccess(userId: string | null, endpoint: string, method: string, statusCode: number, responseTime: number) {
  try {
    const supabase = createAdminSupabaseClient()
    
    await supabase
      .from('access_logs')
      .insert({
        user_id: userId,
        endpoint,
        method,
        status_code: statusCode,
        response_time: responseTime
      })
  } catch (error) {
    console.error('Error logging access:', error)
  }
}
