"use client"

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export function useAdminAuthSimple() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<string | null>(null)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!mounted) return
        
        setUser(session?.user ?? null)
        
        if (session?.user) {
          try {
            // ユーザーの役割を取得
            const { data: userData, error } = await supabase
              .from('users')
              .select('role')
              .eq('id', session.user.id)
              .single()
            
            if (!mounted) return
            
            if (error) {
              console.warn('Error fetching user role:', error)
              setUserRole('user') // デフォルト値
            } else {
              setUserRole(userData?.role || 'user')
            }
          } catch (roleError) {
            console.warn('Error fetching user role:', roleError)
            if (mounted) setUserRole('user') // デフォルト値
          }
        }
        
        if (mounted) setLoading(false)
        console.log('Initial session:', session?.user?.email, 'Role:', userRole)
      } catch (error) {
        console.error('Error getting session:', error)
        if (mounted) setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          try {
            // ユーザーの役割を取得
            const { data: userData, error } = await supabase
              .from('users')
              .select('role')
              .eq('id', session.user.id)
              .single()
            
            if (!mounted) return
            
            if (error) {
              console.warn('Error fetching user role:', error)
              setUserRole('user') // デフォルト値
            } else {
              setUserRole(userData?.role || 'user')
            }
          } catch (roleError) {
            console.warn('Error fetching user role:', roleError)
            if (mounted) setUserRole('user') // デフォルト値
          }
        } else {
          setUserRole(null)
        }
        
        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in...')
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (!error && data.user) {
        console.log('Sign in successful, checking user role...')
        
        // ユーザーの役割を確認
        console.log('Fetching user role for user ID:', data.user.id)
        const { data: userData, error: roleError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single()
        
        console.log('User data response:', userData, 'Error:', roleError)
        
        if (roleError) {
          console.warn('Error fetching user role:', roleError)
          return { error: new Error('ユーザー情報の取得に失敗しました') }
        }
        
        if (userData?.role !== 'admin') {
          await supabase.auth.signOut()
          return { error: new Error('管理者権限がありません') }
        }
        
        console.log('Admin role confirmed, redirecting to dashboard...')
        // 認証状態が確実に更新されてからリダイレクト
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 500)
      }
      
      return { error }
    } catch (err) {
      console.error('Sign in error:', err)
      return { error: err as Error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const requireAuth = () => {
    if (!loading && !user) {
      console.log('No user, redirecting to login')
      router.push('/admin/login')
      return false
    }
    return true
  }

  const requireAdmin = () => {
    if (!loading && !user) {
      console.log('No user, redirecting to login')
      router.push('/admin/login')
      return false
    }
    
    if (!loading && user && userRole !== 'admin') {
      console.log('Not admin, redirecting to login')
      router.push('/admin/login')
      return false
    }
    
    return true
  }

  return {
    user,
    loading,
    userRole,
    signIn,
    signOut,
    requireAuth,
    requireAdmin,
  }
} 