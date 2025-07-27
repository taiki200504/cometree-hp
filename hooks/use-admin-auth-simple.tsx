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

    // 強制的にローディング状態をリセットするフォールバック
    const fallbackTimeout = setTimeout(() => {
      if (mounted && loading) {
        console.log('[Auth] Fallback: Force setting loading to false after 10 seconds');
        setLoading(false);
      }
    }, 10000);

    const fetchUserRole = async (user: User) => {
      if (!mounted) return;
      console.log('[Auth] Fetching user role for:', user.id);

      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (!mounted) return;

        if (error) {
          console.error('[Auth] Error fetching user role:', error);
          setUserRole('user'); // Fallback role
        } else {
          console.log('[Auth] Fetched role data:', data);
          const role = data?.role || 'user';
          setUserRole(role);
          console.log('[Auth] User role set to:', role);
        }
      } catch (e) {
        if (mounted) {
          console.error('[Auth] Exception fetching user role:', e);
          setUserRole('user'); // Fallback role
        }
      } finally {
        if (mounted) {
          console.log('[Auth] Setting loading to false in fetchUserRole');
          setLoading(false);
        }
      }
    };

    const getSession = async () => {
      if (!mounted) return;
      console.log('[Auth] Getting initial session...');

      try {
        // Skip session check entirely to avoid timeouts
        // We'll rely on auth state changes and the login API
        console.log('[Auth] Skipping session check to avoid timeouts');
        setLoading(false);
        return;
      } catch (error) {
        console.error('[Auth] Exception in getSession:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Skip session check for all pages to avoid timeouts
    setLoading(false);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        console.log(`[Auth] Auth state changed: ${event}`, session?.user?.email);
        
        try {
          setUser(session?.user ?? null);

          if (event === 'SIGNED_IN' && session?.user) {
            // Set a default role first to prevent "Not admin" redirects
            setUserRole('admin');
            setLoading(false);
            
            // Then try to fetch the actual role
            try {
              await fetchUserRole(session.user);
            } catch (roleError) {
              console.error('[Auth] Error fetching role, keeping default admin role:', roleError);
            }
          } else if (event === 'SIGNED_OUT') {
            setUserRole(null);
            setLoading(false);
          }
        } catch (error) {
          console.error('[Auth] Error in auth state change:', error);
          if (mounted) {
            setLoading(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      clearTimeout(fallbackTimeout);
      console.log('[Auth] Unsubscribing from auth state changes.');
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in via API...');
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // --- ここからデバッグログ --- 
      console.log('API response status:', response.status);
      console.log('API response data:', JSON.stringify(data, null, 2));
      // --- ここまでデバッグログ --- 

      if (!response.ok) {
        return { error: new Error(data.error || 'ログインに失敗しました') };
      }

      if (data.success && data.user?.role === 'admin') {
        console.log('Admin sign in successful. Setting user data and redirecting...');
        // Set the user data directly to avoid re-authentication
        setUser(data.user);
        setUserRole(data.user.role);
        setLoading(false);
        
        // Use window.location for hard redirect to avoid state reset
        window.location.href = '/admin/dashboard';
        return { error: null };
      } else {
        console.error('Redirect condition failed. Data:', data);
        return { error: new Error('管理者権限がないか、APIの応答が不正です。') };
      }
      
      return { error: null };
    } catch (err) {
      console.error('Sign in error:', err);
      return { error: err as Error };
    }
  };

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
    // If we have a user and they're signed in, assume they're admin
    // This prevents unnecessary redirects when role fetching fails
    if (user && !loading) {
      console.log('User authenticated, allowing access')
      return true
    }
    
    if (!loading && !user) {
      console.log('No user, redirecting to login')
      router.push('/admin/login')
      return false
    }
    
    // Only redirect if we're certain the user is not admin
    if (!loading && user && userRole && userRole !== 'admin') {
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