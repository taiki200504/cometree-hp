"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle, Mail } from 'lucide-react'

export default function AuthErrorPage() {
  const [email, setEmail] = useState('gakusei.union226@gmail.com')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [errorDescription, setErrorDescription] = useState('')
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()

  // URLハッシュフラグメントからエラー情報を取得
  useEffect(() => {
    const processHashFragment = () => {
      try {
        const hash = window.location.hash.substring(1)
        const params = new URLSearchParams(hash)
        
        const errorParam = params.get('error')
        const errorCode = params.get('error_code')
        const errorDesc = params.get('error_description')
        
        if (errorParam) {
          setError(errorParam)
          setErrorDescription(errorDesc || '')
        }
      } catch (err) {
        console.error('Error processing hash fragment:', err)
      }
    }

    processHashFragment()
  }, [])

  const handleResendInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      // 既存のユーザーを削除（もし存在する場合）
      const { data: { users } } = await supabase.auth.admin.listUsers()
      const existingUser = users?.find(u => u.email === email)
      
      if (existingUser) {
        await supabase.auth.admin.deleteUser(existingUser.id)
      }

      // 新しい招待メールを送信
      const { error } = await supabase.auth.admin.inviteUserByEmail(email, {
        redirectTo: `https://gakusei-union-ennb2jxel-union-022b7003.vercel.app/admin/signup`
      })

      if (error) {
        setMessage('招待メールの送信に失敗しました: ' + error.message)
      } else {
        setMessage('新しい招待メールを送信しました。メールをご確認ください。')
      }
    } catch (err) {
      setMessage('予期しないエラーが発生しました。')
    }

    setLoading(false)
  }

  const getErrorMessage = () => {
    switch (error) {
      case 'access_denied':
        return 'アクセスが拒否されました。'
      case 'otp_expired':
        return 'メールリンクの有効期限が切れています。'
      default:
        return errorDescription || '認証エラーが発生しました。'
    }
  }

  const getErrorDescription = () => {
    switch (error) {
      case 'otp_expired':
        return '招待メールの有効期限（24時間）が切れています。新しい招待メールを送信してください。'
      case 'access_denied':
        return 'アクセス権限がありません。管理者に連絡してください。'
      default:
        return '認証処理中にエラーが発生しました。新しい招待メールを送信してください。'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-center">認証エラー</CardTitle>
          <CardDescription className="text-center">
            {getErrorMessage()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              {getErrorDescription()}
            </AlertDescription>
          </Alert>

          <form onSubmit={handleResendInvite} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            {message && (
              <Alert variant={message.includes('失敗') ? 'destructive' : 'default'}>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Mail className="mr-2 h-4 w-4" />
              新しい招待メールを送信
            </Button>
          </form>

          <div className="text-center">
            <Button variant="link" onClick={() => window.location.href = '/admin/login'}>
              ログイン画面に戻る
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 