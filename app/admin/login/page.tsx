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
  AlertCircle,
  Shield,
  Zap,
  Cpu,
  Network,
  Database,
  Server
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
  const [systemStatus, setSystemStatus] = useState({
    database: 'online',
    api: 'online',
    auth: 'online'
  })

  // システムステータスをシミュレート
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        database: Math.random() > 0.05 ? 'online' : 'warning',
        api: Math.random() > 0.02 ? 'online' : 'warning',
        auth: Math.random() > 0.01 ? 'online' : 'warning'
      }))
    }, 10000) // 10秒間隔に変更
    return () => clearInterval(interval)
  }, [])

  // 既にログインしている場合はダッシュボードにリダイレクト
  useEffect(() => {
    if (user && userRole === 'admin') {
      console.log('[Login] User is admin, redirecting to dashboard');
      router.push('/admin/dashboard')
    }
  }, [user, userRole, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      console.log('[Login] Attempting login with:', formData.email)
      console.log('[Login] Form data:', { email: formData.email, password: formData.password ? '***' : 'empty' })
      
      const { error } = await signIn(formData.email, formData.password)
      
      if (error) {
        console.error('[Login] Login failed:', error.message)
        setError(error.message)
        toast({
          title: "アクセス拒否",
          description: error.message,
          variant: "destructive"
        })
      } else {
        console.log('[Login] Login successful, redirecting...')
        toast({
          title: "アクセス許可",
          description: "認証成功。ダッシュボードにリダイレクトしています...",
        })
      }
    } catch (err) {
      console.error('[Login] Unexpected error:', err)
      const errorMessage = err instanceof Error ? err.message : '認証中にエラーが発生しました'
      setError(errorMessage)
      toast({
        title: "システムエラー",
        description: errorMessage,
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
    if (error) setError('')
  }

  // ローディング中はスピナーを表示
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Cpu className="h-8 w-8 animate-pulse" />
                <span className="text-2xl font-bold">UNION OPERATIONS CENTER</span>
              </div>
              <div className="text-sm opacity-75">Initializing Security Protocols...</div>
            </div>
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus.database === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span>Database: {systemStatus.database}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus.api === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span>API Gateway: {systemStatus.api}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${systemStatus.auth === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span>Auth Service: {systemStatus.auth}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ユーザーが既にログインしている場合は何も表示しない（リダイレクト中）
  if (user && userRole === 'admin') {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="text-lg">Access Granted</div>
            <div className="text-sm opacity-75">Redirecting to Operations Dashboard...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* 背景アニメーション */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => ( // 50から20に削減
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl flex items-center justify-center border-2 border-green-400">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  UNION OPS
                </h1>
                <div className="text-xs opacity-75">OPERATIONS CENTER</div>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              ADMINISTRATOR ACCESS
            </h2>
            <p className="text-sm opacity-75">
              Enter your credentials to access the operations dashboard
            </p>
          </div>

          {/* System Status */}
          <div className="mb-6 p-4 bg-black/50 border border-green-400/30 rounded-lg">
            <div className="text-sm font-semibold mb-3">SYSTEM STATUS</div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Database className="h-3 w-3" />
                  <span>Database</span>
                </span>
                <span className={`px-2 py-1 rounded text-xs ${systemStatus.database === 'online' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'}`}>
                  {systemStatus.database.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Server className="h-3 w-3" />
                  <span>API Gateway</span>
                </span>
                <span className={`px-2 py-1 rounded text-xs ${systemStatus.api === 'online' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'}`}>
                  {systemStatus.api.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Shield className="h-3 w-3" />
                  <span>Auth Service</span>
                </span>
                <span className={`px-2 py-1 rounded text-xs ${systemStatus.auth === 'online' ? 'bg-green-400/20 text-green-400' : 'bg-yellow-400/20 text-yellow-400'}`}>
                  {systemStatus.auth.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <Card className="bg-black/50 border-green-400/30 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg text-center">AUTHENTICATION</CardTitle>
              <CardDescription className="text-center text-xs opacity-75">
                Enter your administrator credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-semibold">EMAIL ADDRESS</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="admin@union.example.com"
                      className="pl-10 bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-semibold">PASSWORD</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-green-400"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-400/30 rounded-md">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-black font-bold hover:from-green-300 hover:to-blue-300 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      AUTHENTICATING...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      ACCESS SYSTEM
                    </>
                  )}
                </Button>
              </form>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-green-400/30">
                <div className="text-center">
                  <p className="text-xs opacity-75 mb-2">
                    Need administrator access?
                  </p>
                  <p className="text-xs opacity-50">
                    Contact system administrator for credentials
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-8">
            <div className="text-xs opacity-50 space-y-1">
              <p>© 2025 UNION OPERATIONS CENTER</p>
              <p>SECURE ADMINISTRATIVE INTERFACE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 