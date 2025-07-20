"use client"

import { useEffect, useState } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Loader2, 
  FileText, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  Bell,
  TrendingUp,
  Activity
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { user, loading, signOut, requireAuth } = useAdminAuthSimple()
  const [stats, setStats] = useState({
    news: 0,
    events: 0,
    users: 0,
    organizations: 0,
    partners: 0,
    members: 0,
    views: 0
  })

  // データ取得
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  useEffect(() => {
    requireAuth()
  }, [requireAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const menuItems = [
    {
      title: 'ニュース管理',
      description: 'ニュース記事の作成・編集・削除',
      icon: <FileText className="h-6 w-6" />,
      href: '/admin/news',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      count: stats.news,
      actions: [
        { label: '新規作成', icon: <Plus className="h-4 w-4" />, href: '/admin/news/create' },
        { label: '一覧表示', icon: <Eye className="h-4 w-4" />, href: '/admin/news' }
      ]
    },
    {
      title: 'イベント管理',
      description: 'イベントの作成・編集・削除',
      icon: <Calendar className="h-6 w-6" />,
      href: '/admin/events',
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      count: stats.events,
      actions: [
        { label: '新規作成', icon: <Plus className="h-4 w-4" />, href: '/admin/events/create' },
        { label: '一覧表示', icon: <Eye className="h-4 w-4" />, href: '/admin/events' }
      ]
    },
    {
      title: 'ユーザー管理',
      description: '管理者アカウントの管理',
      icon: <Users className="h-6 w-6" />,
      href: '/admin/users',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      count: stats.users,
      actions: [
        { label: 'ユーザー一覧', icon: <Users className="h-4 w-4" />, href: '/admin/users' },
        { label: '権限設定', icon: <Settings className="h-4 w-4" />, href: '/admin/users/permissions' }
      ]
    },
    {
      title: '統計情報',
      description: 'サイト統計の更新と分析',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/admin/stats',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      count: stats.views,
      actions: [
        { label: '統計表示', icon: <TrendingUp className="h-4 w-4" />, href: '/admin/stats' },
        { label: '分析レポート', icon: <Activity className="h-4 w-4" />, href: '/admin/stats/reports' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">U</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  UNIÓN 管理画面
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors" />
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  オンライン
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  <p className="text-xs text-gray-500">管理者</p>
                </div>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>ログアウト</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            お疲れ様です、{user.email?.split('@')[0]}さん
          </h2>
          <p className="text-gray-600">
            今日もUNIÓNの管理をお願いします。最新の統計情報と管理機能をご利用ください。
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ニュース記事</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.news}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">イベント</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.events}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">管理者</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">月間PV</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.views.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Card key={item.title} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    {item.count}
                  </Badge>
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  {item.actions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                      asChild
                    >
                      <Link href={action.href}>
                        {action.icon}
                        <span>{action.label}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>クイックアクション</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Button variant="outline" className="flex items-center space-x-2" asChild>
                  <Link href="/admin/news/create">
                    <Plus className="h-4 w-4" />
                    <span>ニュース作成</span>
                  </Link>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2" asChild>
                  <Link href="/admin/events/create">
                    <Plus className="h-4 w-4" />
                    <span>イベント作成</span>
                  </Link>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2" asChild>
                  <Link href="/admin/organizations/create">
                    <Plus className="h-4 w-4" />
                    <span>加盟団体追加</span>
                  </Link>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2" asChild>
                  <Link href="/admin/partners/create">
                    <Plus className="h-4 w-4" />
                    <span>提携団体追加</span>
                  </Link>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2" asChild>
                  <Link href="/admin/stats">
                    <BarChart3 className="h-4 w-4" />
                    <span>統計確認</span>
                  </Link>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2" asChild>
                  <Link href="/admin/settings">
                    <Settings className="h-4 w-4" />
                    <span>設定</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
