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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-700">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-3 text-gray-400" />
          <div className="text-sm">ダッシュボードへリダイレクト中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md p-8 space-y-6 bg-white border-0 shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">UNION 管理ログイン</CardTitle>
            <p className="text-sm text-gray-600">管理者アカウントでサインイン</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                  placeholder="admin@example.com"
                  autoComplete="username"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="mt-1"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? '認証中...' : 'ログイン'}
              </Button>
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 