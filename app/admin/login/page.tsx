"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { LogIn, Loader2, AlertCircle } from 'lucide-react'

export default function AdminLogin() {
  const { signIn, user, loading, isAdmin, error: authError } = useAdminAuthSimple()
  const { toast } = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 既にログインしている場合はダッシュボードにリダイレクト
  useEffect(() => {
    if (user && isAdmin) {
      console.log('[Login] User is admin, redirecting to dashboard');
      router.push('/admin/dashboard')
    }
  }, [user, isAdmin, router])

  // 認証エラーがある場合は表示
  useEffect(() => {
    if (authError) {
      console.error('[Login] Auth error:', authError)
      setError(authError)
      toast({
        title: "認証エラー",
        description: authError,
        variant: "destructive"
      })
    }
  }, [authError, toast])

  // 環境変数のチェック（開発環境のみ）
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const requiredEnvVars = [
        'NEXT_PUBLIC_SUPABASE_URL',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY'
      ]
      
      const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
      
      if (missingVars.length > 0) {
        console.error('[Login] Missing environment variables:', missingVars)
        setError(`環境変数が設定されていません: ${missingVars.join(', ')}`)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const { error } = await signIn(formData.email, formData.password)
      
      if (error) {
        setError(error.message)
        toast({
          title: "ログインエラー",
          description: error.message,
          variant: "destructive"
        })
      } else {
        toast({
          title: "ログイン成功",
          description: "管理者ダッシュボードにリダイレクトします",
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'ログイン中にエラーが発生しました'
      setError(errorMessage)
      toast({
        title: "エラー",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // ユーザーが既にログインしている場合は何も表示しない（リダイレクト中）
  if (user && isAdmin) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="text-lg">REDIRECTING TO DASHBOARD...</div>
            <div className="text-sm opacity-75 mt-2">Authentication successful</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 space-y-6 bg-black/70 border border-green-400/30 rounded-lg shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-green-400 mb-2">UNION OPERATIONS CENTER</CardTitle>
            <p className="text-sm opacity-75">ADMIN LOGIN</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-green-400">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full bg-black/50 border-green-400/30 text-green-400 placeholder-green-700 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  placeholder="admin@example.com"
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-green-400">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1 block w-full bg-black/50 border-green-400/30 text-green-400 placeholder-green-700 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? 'AUTHENTICATING...' : 'LOGIN'}
              </Button>
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-400/30 rounded-md">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
                >
                  ページを再読み込み
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 