"use client"

import { useEffect, useState, useCallback, useRef } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export function useAdminAuthSimple() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()
  const router = useRouter()
  const mountedRef = useRef(true)
  const authCheckedRef = useRef(false)

  const checkAdminRole = useCallback(async (user: User) => {
    if (!mountedRef.current) return false
    
    try {
      console.log('[Auth] Checking admin role for user:', user.id)
      
      // タイムアウトを設定（5秒）
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Database query timeout')), 5000)
      })

      const queryPromise = supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any

      if (error) {
        console.error('[Auth] Error fetching user role:', error)
        // エラーが発生した場合、デフォルトで管理者として扱う（開発環境）
        if (process.env.NODE_ENV === 'development') {
          console.log('[Auth] Development mode: treating as admin')
          return true
        }
        return false
      }
      
      const isAdminUser = data?.role === 'admin'
      console.log('[Auth] User role check result:', { 
        role: data?.role, 
        isAdmin: isAdminUser,
        userId: user.id
      })
      return isAdminUser
    } catch (error) {
      console.error('[Auth] Error in checkAdminRole:', error)
      // タイムアウトやエラーの場合、開発環境では管理者として扱う
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth] Development mode: treating as admin due to error')
        return true
      }
      return false
    }
  }, [supabase])

  useEffect(() => {
    mountedRef.current = true
    authCheckedRef.current = false

    const initializeAuth = async () => {
      if (!mountedRef.current) return

      try {
        console.log('[Auth] Initializing auth...')
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (!mountedRef.current) return

        if (sessionError) {
          console.error('[Auth] Session error:', sessionError)
          setError(sessionError.message)
          setLoading(false)
          return
        }

        const currentUser = session?.user ?? null
        console.log('[Auth] Current user:', currentUser ? currentUser.id : 'null')
        setUser(currentUser)
        
        if (currentUser) {
          const isAdminUser = await checkAdminRole(currentUser)
          if (mountedRef.current) {
            setIsAdmin(isAdminUser)
          }
        } else {
          if (mountedRef.current) {
            setIsAdmin(false)
          }
        }
        
        if (mountedRef.current) {
          setLoading(false)
          authCheckedRef.current = true
        }
      } catch (error) {
        if (mountedRef.current) {
          console.error('[Auth] Error in initializeAuth:', error)
          setError(error instanceof Error ? error.message : 'Unknown error')
          setLoading(false)
        }
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mountedRef.current) return
        
        console.log('[Auth] Auth state changed:', event)
        
        // 初回チェック後は必要な場合のみ処理
        if (authCheckedRef.current && event === 'INITIAL_SESSION') {
          return
        }

        try {
          const currentUser = session?.user ?? null
          setUser(currentUser)
          
          if (currentUser) {
            const isAdminUser = await checkAdminRole(currentUser)
            if (mountedRef.current) {
              setIsAdmin(isAdminUser)
            }
          } else {
            if (mountedRef.current) {
              setIsAdmin(false)
            }
          }
          
          if (mountedRef.current) {
            setLoading(false)
            authCheckedRef.current = true
          }
        } catch (error) {
          if (mountedRef.current) {
            console.error('[Auth] Error in auth state change:', error)
            setError(error instanceof Error ? error.message : 'Unknown error')
            setLoading(false)
          }
        }
      }
    )

    return () => {
      mountedRef.current = false
      subscription.unsubscribe()
    }
  }, [supabase, checkAdminRole])

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      console.log('[Auth] Attempting sign in for:', email)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (!error) {
        console.log('[Auth] Sign in successful')
        router.push('/admin/dashboard')
      } else {
        console.error('[Auth] Sign in error:', error)
      }
      return { error }
    } catch (err) {
      console.error('[Auth] Unexpected sign in error:', err)
      return { error: err as Error }
    }
  }, [supabase, router])

  const signOut = useCallback(async () => {
    try {
      console.log('[Auth] Signing out...')
      await supabase.auth.signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('[Auth] Sign out error:', error)
    }
  }, [supabase, router])

  const requireAuth = useCallback(() => {
    if (loading) return true
    if (!user) {
      console.log('[Auth] No user, redirecting to login')
      router.push('/admin/login')
      return false
    }
    if (!isAdmin) {
      console.log('[Auth] User is not admin, redirecting to home')
      router.push('/')
      return false
    }
    console.log('[Auth] User is authenticated and is admin')
    return true
  }, [loading, user, isAdmin, router])

  return {
    user,
    loading,
    isAdmin,
    error,
    signIn,
    signOut,
    requireAuth,
    userRole: isAdmin ? 'admin' : null,
    requireAdmin: requireAuth,
  }
} 