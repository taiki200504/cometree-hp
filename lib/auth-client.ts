import { createClient } from '@supabase/supabase-js'

// クライアントサイド用のSupabaseクライアント
const createClientSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
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

// クライアントサイド用のサインアップ
export async function signUp(email: string, password: string, name?: string) {
  try {
    const supabase = createClientSupabaseClient()
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
    throw error
  }
}

// クライアントサイド用のサインイン
export async function signIn(email: string, password: string) {
  try {
    const supabase = createClientSupabaseClient()
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
    throw error
  }
}

// クライアントサイド用のサインアウト
export async function signOut() {
  try {
    const supabase = createClientSupabaseClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
}

// 現在のユーザーを取得（クライアントサイド）
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = createClientSupabaseClient()
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