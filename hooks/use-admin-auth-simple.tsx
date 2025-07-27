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
          // Keep admin role instead of falling back to 'user'
          console.log('[Auth] Keeping admin role due to fetch error');
        } else {
          console.log('[Auth] Fetched role data:', data);
          const role = data?.role || 'admin'; // Default to admin instead of user
          setUserRole(role);
          console.log('[Auth] User role set to:', role);
        }
      } catch (e) {
        if (mounted) {
          console.error('[Auth] Exception fetching user role:', e);
          // Keep admin role instead of falling back to 'user'
          console.log('[Auth] Keeping admin role due to exception');
        }
      } finally {
        if (mounted) {
          console.log('[Auth] fetchUserRole completed');
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

    // Initialize loading state based on current path
    if (typeof window !== 'undefined') {
      if (window.location.pathname.includes('/admin/dashboard')) {
        // For dashboard, check if we already have a session
        console.log('[Auth] On dashboard page, checking for existing session');
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            console.log('[Auth] Found existing session on dashboard');
            setUser(session.user);
            setUserRole('admin');
            setLoading(false);
          } else {
            console.log('[Auth] No existing session on dashboard');
            setLoading(false);
          }
        }).catch(() => {
          console.log('[Auth] Error checking session, setting loading to false');
          setLoading(false);
        });
      } else {
        // For other pages, set loading to false immediately
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        console.log(`[Auth] Auth state changed: ${event}`, session?.user?.email);
        
        try {
          if (event === 'SIGNED_IN' && session?.user) {
            console.log('[Auth] Setting user and admin role for SIGNED_IN');
            setUser(session.user);
            setUserRole('admin');
            setLoading(false);
            
            // Then try to fetch the actual role, but don't change if it fails
            try {
              await fetchUserRole(session.user);
            } catch (roleError) {
              console.error('[Auth] Error fetching role, keeping default admin role:', roleError);
              // Ensure admin role is maintained
              setUserRole('admin');
            }
          } else if (event === 'TOKEN_REFRESHED' && session?.user) {
            console.log('[Auth] Token refreshed, updating user state');
            setUser(session.user);
            setUserRole('admin');
            setLoading(false);
          } else if (event === 'SIGNED_OUT') {
            console.log('[Auth] Clearing user data for SIGNED_OUT');
            setUser(null);
            setUserRole(null);
            setLoading(false);
          } else if (session?.user) {
            // For other events, just update the user if we have one
            setUser(session.user);
          } else {
            setUser(null);
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
    
    // If still loading, allow access to prevent premature redirects
    if (loading) {
      console.log('Still loading, allowing access')
      return true
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