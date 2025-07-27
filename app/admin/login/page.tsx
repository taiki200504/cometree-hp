"use client"

import { useState, useEffect } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AdminLogin() {
  const { signIn, user, loading, userRole } = useAdminAuthSimple()
  const { toast } = useToast()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // 既にログインしている場合はダッシュボードにリダイレクト
  useEffect(() => {
    if (!loading && user && userRole === 'admin') {
      router.push('/admin/dashboard')
    }
  }, [user, loading, userRole, router])

  // ローディングが終了し、ユーザーがログインしていない場合はログインフォームを表示
  useEffect(() => {
    if (!loading && !user) {
      // ログインフォームを表示する準備ができた
    }
  }, [loading, user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

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
          description: "ダッシュボードにリダイレクトしています...",
        })
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('ログイン中にエラーが発生しました')
      toast({
        title: "エラー",
        description: "ログイン中にエラーが発生しました",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // エラーをクリア
    if (error) setError('')
  }

  // ローディング中はスピナーを表示（タイムアウト付き）
  if (loading) {
    console.log('[Login] Loading state, showing spinner');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">読み込み中...</p>
          <p className="text-sm text-gray-500 mt-2">長時間読み込みが続く場合は、ページを再読み込みしてください</p>
        </div>
      </div>
    )
  }

  // 既にログインしている場合はダッシュボードにリダイレクト
  if (user && userRole === 'admin') {
    console.log('[Login] User is admin, redirecting to dashboard');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">ダッシュボードにリダイレクト中...</p>
        </div>
      </div>
    )
  }

  // ログインフォームを表示
  console.log('[Login] Showing login form', { user, userRole, loading });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              UNIÓN
            </h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            管理画面ログイン
          </h2>
          <p className="text-gray-600">
            管理者アカウントでログインしてください
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">ログイン</CardTitle>
            <CardDescription className="text-center">
              メールアドレスとパスワードを入力してください
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="admin@union.example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">パスワード</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="パスワードを入力"
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ログイン中...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    ログイン
                  </>
                )}
              </Button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  管理者アカウントをお持ちでない場合
                </p>
                <p className="text-xs text-gray-500">
                  システム管理者にお問い合わせください
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2025 UNIÓN. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
} 