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
        console.log('[Auth] Fallback: Force setting loading to false after 20 seconds');
        setLoading(false);
      }
    }, 20000);

    const fetchUserRole = async (user: User) => {
      if (!mounted) return;
      console.log('[Auth] Fetching user role for:', user.id);
      
      // タイムアウトを設定 (increased for production)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Role fetch timeout')), 30000);
      });

      try {
        const rolePromise = supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        const { data, error } = await Promise.race([rolePromise, timeoutPromise]) as any;

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
      
      // セッション取得のタイムアウトを設定 (increased for production)
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Session fetch timeout')), 30000);
      });

      try {
        const sessionPromise = supabase.auth.getSession();
        const { data: { session }, error } = await Promise.race([sessionPromise, timeoutPromise]) as any;
        
        if (!mounted) return;

        if (error) {
          console.error('[Auth] Error in getSession:', error);
          setLoading(false);
          return;
        }

        console.log('[Auth] Initial session user:', session?.user?.email);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchUserRole(session.user);
        } else {
          setUserRole(null);
          setLoading(false);
        }
      } catch (error) {
        console.error('[Auth] Exception in getSession:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        console.log(`[Auth] Auth state changed: ${event}`, session?.user?.email);
        
        try {
          setUser(session?.user ?? null);

          if (event === 'SIGNED_IN' && session?.user) {
            await fetchUserRole(session.user);
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
        console.log('Admin sign in successful. Redirecting to dashboard...');
        router.push('/admin/dashboard');
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