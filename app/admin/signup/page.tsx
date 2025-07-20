"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'

export default function AdminSignupPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [processingToken, setProcessingToken] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const searchParams = useSearchParams()

  // URLハッシュフラグメントからトークン情報を処理
  useEffect(() => {
    const processHashFragment = async () => {
      try {
        // URLハッシュフラグメントを取得
        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        
        const accessToken = params.get('access_token')
        const refreshToken = params.get('refresh_token')
        const type = params.get('type')
        
        if (type === 'invite' && accessToken && refreshToken) {
          // セッションを設定
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          
          if (error) {
            console.error('Session setting error:', error)
            setError('セッションの設定に失敗しました: ' + error.message)
          } else {
            // セッション設定成功
            console.log('Session set successfully')
          }
        }
      } catch (err) {
        console.error('Token processing error:', err)
        setError('トークンの処理に失敗しました')
      } finally {
        setProcessingToken(false)
      }
    }

    processHashFragment()
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (password.length < 8) {
      setError('パスワードは8文字以上で入力してください。')
      return
    }
    if (password !== confirmPassword) {
      setError('パスワードが一致しません。')
      return
    }
    
    setLoading(true)
    
    try {
      // 現在のユーザー情報を取得
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('ユーザー情報が見つかりません。再度招待メールからアクセスしてください。')
        setLoading(false)
        return
      }

      // パスワードを更新
      const { error } = await supabase.auth.updateUser({ password })
      
      if (error) {
        setError('アカウントの設定に失敗しました: ' + error.message)
      } else {
        setSuccess('アカウントが正常に設定されました。管理画面に移動します...')
        setTimeout(() => {
          router.push('/admin/dashboard')
        }, 2000)
      }
    } catch (err) {
      setError('予期しないエラーが発生しました。')
    }
    
    setLoading(false)
  }

  if (processingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>認証情報を処理中...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">管理者アカウント設定</CardTitle>
          <CardDescription className="text-center">
            管理者アカウントのパスワードを設定してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="8文字以上で入力"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">パスワード（確認）</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                placeholder="パスワードを再入力"
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              アカウントを設定
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 