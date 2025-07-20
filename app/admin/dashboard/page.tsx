"use client"

import { useEffect } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function AdminDashboard() {
  const { user, loading, signOut, requireAuth } = useAdminAuthSimple()

  useEffect(() => {
    requireAuth()
  }, [requireAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">管理画面ダッシュボード</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ログイン中: {user.email}
            </span>
            <Button onClick={signOut} variant="outline">
              ログアウト
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ニュース管理</CardTitle>
              <CardDescription>
                ニュース記事の作成、編集、削除
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                ニュース管理へ
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>イベント管理</CardTitle>
              <CardDescription>
                イベントの作成、編集、削除
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                イベント管理へ
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ユーザー管理</CardTitle>
              <CardDescription>
                ユーザーの管理と権限設定
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                ユーザー管理へ
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>統計情報</CardTitle>
              <CardDescription>
                サイトの統計情報と分析
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                統計情報へ
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>設定</CardTitle>
              <CardDescription>
                サイト設定とシステム管理
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                設定へ
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ログ</CardTitle>
              <CardDescription>
                システムログとアクセス履歴
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                ログへ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
