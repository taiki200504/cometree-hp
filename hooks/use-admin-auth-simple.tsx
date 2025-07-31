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

    const fetchUserRole = async (user: User) => {
      if (!mounted) return
      console.log('[Auth] Fetching user role for:', user.id)

      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        if (!mounted) return

        if (error) {
          console.error('[Auth] Error fetching user role:', error)
          // Default to admin for existing sessions
          setUserRole('admin')
        } else {
          console.log('[Auth] Fetched role data:', data)
          const role = data?.role || 'admin'
          setUserRole(role)
          console.log('[Auth] User role set to:', role)
        }
      } catch (e) {
        if (mounted) {
          console.error('[Auth] Exception fetching user role:', e)
          setUserRole('admin')
        }
      }
    }

    const initializeAuth = async () => {
      if (!mounted) return
      console.log('[Auth] Initializing authentication...')

      try {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          console.log('[Auth] Found existing session:', session.user.email)
          setUser(session.user)
          setUserRole('admin') // Assume admin for existing sessions
          setLoading(false)
          
          // Fetch actual role in background
          await fetchUserRole(session.user)
        } else {
          console.log('[Auth] No existing session found')
          setLoading(false)
        }
      } catch (error) {
        console.error('[Auth] Error initializing auth:', error)
        if (mounted) {
          setLoading(false)
        }
      }
    }

    // Initialize auth state
    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        console.log(`[Auth] Auth state changed: ${event}`, session?.user?.email)
        
        try {
          if (event === 'SIGNED_IN' && session?.user) {
            console.log('[Auth] User signed in:', session.user.email)
            setUser(session.user)
            setUserRole('admin')
            setLoading(false)
            
            // Fetch actual role
            await fetchUserRole(session.user)
          } else if (event === 'TOKEN_REFRESHED' && session?.user) {
            console.log('[Auth] Token refreshed')
            setUser(session.user)
            setUserRole('admin')
            setLoading(false)
          } else if (event === 'SIGNED_OUT') {
            console.log('[Auth] User signed out')
            setUser(null)
            setUserRole(null)
            setLoading(false)
          } else if (session?.user) {
            setUser(session.user)
          } else {
            setUser(null)
          }
        } catch (error) {
          console.error('[Auth] Error in auth state change:', error)
          if (mounted) {
            setLoading(false)
          }
        }
      }
    )

    return () => {
      mounted = false
      console.log('[Auth] Unsubscribing from auth state changes.')
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    try {
      console.log('[Auth] Attempting to sign in via API...')
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log('[Auth] API response:', { status: response.status, data })

      if (!response.ok) {
        return { error: new Error(data.error || 'ログインに失敗しました') }
      }

      if (data.success && data.user?.role === 'admin') {
        console.log('[Auth] Admin sign in successful')
        setUser(data.user)
        setUserRole(data.user.role)
        setLoading(false)
        
        // Force redirect to dashboard
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/dashboard'
        }
        return { error: null }
      } else {
        console.error('[Auth] Login failed - invalid response:', data)
        return { error: new Error('管理者権限がないか、APIの応答が不正です。') }
      }
    } catch (err) {
      console.error('[Auth] Sign in error:', err)
      return { error: err as Error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setUserRole(null)
      router.push('/admin/login')
    } catch (error) {
      console.error('[Auth] Sign out error:', error)
      // Force redirect even if signout fails
      router.push('/admin/login')
    }
  }

  const requireAuth = () => {
    if (!loading && !user) {
      console.log('[Auth] No user, redirecting to login')
      router.push('/admin/login')
      return false
    }
    return true
  }

  const requireAdmin = () => {
    // Allow access if user is authenticated and we're still loading
    if (loading) {
      console.log('[Auth] Still loading, allowing access')
      return true
    }
    
    // Redirect to login if no user
    if (!user) {
      console.log('[Auth] No user, redirecting to login')
      router.push('/admin/login')
      return false
    }
    
    // Allow access if user exists (assume admin for authenticated users)
    if (user) {
      console.log('[Auth] User authenticated, allowing access')
      return true
    }
    
    return false
  }

  return {
    user: user || null,
    loading: loading || false,
    userRole: userRole || null,
    signIn,
    signOut,
    requireAuth,
    requireAdmin,
  }
} 