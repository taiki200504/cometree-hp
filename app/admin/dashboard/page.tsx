"use client"

import { useEffect } from 'react'
import { useAdminAuth } from '@/hooks/use-admin-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  FileText, 
  Calendar, 
  Building, 
  Handshake, 
  BarChart3,
  Plus,
  Edit,
  Settings,
  LogOut
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user, loading, isAdmin, signOut, requireAuth } = useAdminAuth()

  useEffect(() => {
    requireAuth()
  }, [requireAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  const menuItems = [
    {
      title: 'ニュース管理',
      description: 'ニュース記事の作成・編集・削除',
      icon: <FileText className="h-6 w-6" />,
      href: '/admin/news',
      color: 'bg-blue-500',
      count: 12
    },
    {
      title: 'イベント管理',
      description: 'イベントの作成・編集・削除',
      icon: <Calendar className="h-6 w-6" />,
      href: '/admin/events',
      color: 'bg-green-500',
      count: 5
    },
    {
      title: '加盟団体管理',
      description: '加盟団体の情報管理',
      icon: <Building className="h-6 w-6" />,
      href: '/admin/organizations',
      color: 'bg-purple-500',
      count: 25
    },
    {
      title: '提携企業管理',
      description: '提携企業の情報管理',
      icon: <Handshake className="h-6 w-6" />,
      href: '/admin/partners',
      color: 'bg-orange-500',
      count: 8
    },
    {
      title: '統計データ管理',
      description: 'サイト統計の更新',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/admin/stats',
      color: 'bg-red-500',
      count: 1
    },
    {
      title: 'ユーザー管理',
      description: '管理者アカウントの管理',
      icon: <Users className="h-6 w-6" />,
      href: '/admin/users',
      color: 'bg-indigo-500',
      count: 3
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                UNIÓN 管理画面
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user.email}
              </span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ダッシュボード
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            サイトの管理機能にアクセスできます
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">ニュース記事</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">イベント</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Building className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">加盟団体</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">25</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Handshake className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">提携企業</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button asChild className="flex-1">
                    <Link href={item.href}>
                      <Edit className="h-4 w-4 mr-2" />
                      管理
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
