"use client"

import { useEffect, useState, useCallback } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export function useAdminAuthSimple() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClientComponentClient()
  const router = useRouter()

  const checkAdminRole = useCallback(async (user: User) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching user role:', error)
        return false
      }
      
      return data?.role === 'admin'
    } catch (error) {
      console.error('Error in checkAdminRole:', error)
      return false
    }
  }, [supabase])

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const currentUser = session?.user ?? null
      setUser(currentUser)
      
      if (currentUser) {
        const isAdminUser = await checkAdminRole(currentUser)
        setIsAdmin(isAdminUser)
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
        
        if (currentUser) {
          const isAdminUser = await checkAdminRole(currentUser)
          setIsAdmin(isAdminUser)
        } else {
          setIsAdmin(false)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, checkAdminRole])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (!error) {
        router.push('/admin/dashboard')
      }
      
      return { error }
    } catch (err) {
      return { error: err as Error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const requireAuth = useCallback(() => {
    if (loading) return true // Don't redirect while loading

    if (!user) {
      router.push('/admin/login')
      return false
    }
    if (!isAdmin) {
      router.push('/') // Or a dedicated "unauthorized" page
      return false
    }
    return true
  }, [loading, user, isAdmin, router])

  // Automatically run requireAuth on loading state change
  useEffect(() => {
    if(!loading) {
        requireAuth();
    }
  }, [loading, requireAuth])

  return {
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
    requireAuth,
    userRole: isAdmin ? 'admin' : null,
    requireAdmin: requireAuth,
  }
} 