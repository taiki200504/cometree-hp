"use client"

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
      
      if (session?.user) {
        checkAdminRole(session.user.id)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (session?.user) {
          await checkAdminRole(session.user.id)
        } else {
          setIsAdmin(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single()

      if (!error && data?.role === 'admin') {
        setIsAdmin(true)
        console.log('User is admin:', userId)
      } else {
        setIsAdmin(false)
        console.log('User is not admin or error:', error)
      }
    } catch (err) {
      console.error('Error checking admin role:', err)
      setIsAdmin(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (!error) {
        console.log('Sign in successful, redirecting to dashboard...')
        // 少し遅延を入れてからリダイレクト
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 1000)
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
    if (!loading && !isAdmin) {
      console.log('User is not admin, redirecting to login')
      router.push('/admin/login')
      return false
    }
    return true
  }

  return {
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
    requireAuth,
  }
} 