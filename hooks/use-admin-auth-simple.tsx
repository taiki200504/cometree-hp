"use client"

import { useEffect, useState, useCallback } from 'react'
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

  const checkAdminRole = useCallback(async (user: User) => {
    try {
      console.log('[Auth] Checking admin role for user:', user.id)
      console.log('[Auth] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
      console.log('[Auth] User object:', user)
      
      // タイムアウトを設定（10秒）
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Database query timeout')), 10000)
      })

      const queryPromise = supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any

      console.log('[Auth] Database query result:', { data, error })

      if (error) {
        console.error('[Auth] Error fetching user role:', error)
        console.error('[Auth] Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
        return false
      }
      
      const isAdminUser = data?.role === 'admin'
      console.log('[Auth] User role check result:', { 
        role: data?.role, 
        isAdmin: isAdminUser,
        userId: user.id,
        dataExists: !!data
      })
      return isAdminUser
    } catch (error) {
      console.error('[Auth] Error in checkAdminRole:', error)
      console.error('[Auth] Error stack:', error instanceof Error ? error.stack : 'No stack trace')
      return false
    }
  }, [supabase])

  useEffect(() => {
    let mounted = true

    const getSession = async () => {
      try {
        console.log('[Auth] Getting session...')
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (!mounted) return

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
          if (mounted) {
            setIsAdmin(isAdminUser)
          }
        } else {
          if (mounted) {
            setIsAdmin(false)
          }
        }
        if (mounted) {
          setLoading(false)
        }
      } catch (error) {
        if (mounted) {
          console.error('[Auth] Error in getSession:', error)
          setError(error instanceof Error ? error.message : 'Unknown error')
          setLoading(false)
        }
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        
        console.log('[Auth] Auth state changed:', event)
        try {
          const currentUser = session?.user ?? null
          setUser(currentUser)
          
          if (currentUser) {
            const isAdminUser = await checkAdminRole(currentUser)
            if (mounted) {
              setIsAdmin(isAdminUser)
            }
          } else {
            if (mounted) {
              setIsAdmin(false)
            }
          }
          if (mounted) {
            setLoading(false)
          }
        } catch (error) {
          if (mounted) {
            console.error('[Auth] Error in auth state change:', error)
            setError(error instanceof Error ? error.message : 'Unknown error')
            setLoading(false)
          }
        }
      }
    )

    return () => {
      mounted = false
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
    if (loading) return true // Don't redirect while loading

    if (!user) {
      console.log('[Auth] No user, redirecting to login')
      router.push('/admin/login')
      return false
    }
    if (!isAdmin) {
      console.log('[Auth] User is not admin, redirecting to home')
      router.push('/') // Or a dedicated "unauthorized" page
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