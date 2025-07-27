"use client"

import { useEffect, useState, useCallback, useMemo } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
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
  Activity,
  Building,
  Handshake,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'

interface Stats {
  news: number
  events: number
  users: number
  organizations: number
  partners: number
  members: number
  views: number
  boardPosts: number
}

export default function AdminDashboard() {
  const { user, loading, signOut, userRole } = useAdminAuthSimple()
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    news: 0,
    events: 0,
    users: 0,
    organizations: 0,
    partners: 0,
    members: 0,
    views: 0,
    boardPosts: 0
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)
  const [isUpdatingStats, setIsUpdatingStats] = useState(false)

  // データ取得関数
  const fetchStats = useCallback(async () => {
    try {
      setStatsError(null); // Reset error on new fetch
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        if (data.error) {
          setStatsError(data.error);
        } else {
          setStats(data)
        }
      } else {
        const errorData = await response.json();
        setStatsError(errorData.error || '統計データの取得に失敗しました。');
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStatsError(error instanceof Error ? error.message : '不明なエラーが発生しました。');
    } finally {
      setIsLoadingStats(false)
    }
  }, [])

  // データ取得
  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  // 認証と権限チェックを統合
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/admin/login')
        return
      }
      
      if (userRole !== 'admin') {
        console.log('Not admin, redirecting to login')
        router.push('/admin/login')
        return
      }
      
      console.log('Dashboard access granted for user:', user.email, 'Role:', userRole)
    }
  }, [loading, user, userRole, router])

  // ローディング中または認証エラーの場合はローディング画面を表示
  if (loading || !user || userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">
            {loading ? '読み込み中...' : '認証確認中...'}
          </p>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut();
  };

  const handleUpdateStats = async () => {
    setIsUpdatingStats(true);
    try {
      const response = await fetch('/api/admin/stats/update', {
        method: 'POST',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '統計データの更新に失敗しました。');
      }
      // 更新後、統計データを再フェッチして表示を更新
      fetchStats();
    } catch (error) {
      console.error('Error updating stats:', error);
      // ここでトースト通知などを表示することも可能
    } finally {
      setIsUpdatingStats(false);
    }
  };

  const menuItems = useMemo(() => [
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
      title: '掲示板管理',
      description: '掲示板投稿の管理',
      icon: <MessageSquare className="h-6 w-6" />,
      href: '/admin/board',
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
      count: stats.boardPosts || 0,
      actions: [
        { label: '新規投稿', icon: <Plus className="h-4 w-4" />, href: '/admin/board/create' },
        { label: '一覧表示', icon: <Eye className="h-4 w-4" />, href: '/admin/board' }
      ]
    },
    {
      title: '加盟団体管理',
      description: '加盟団体の管理',
      icon: <Building className="h-6 w-6" />,
      href: '/admin/organizations',
      color: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      count: stats.organizations,
      actions: [
        { label: '新規追加', icon: <Plus className="h-4 w-4" />, href: '/admin/organizations/create' },
        { label: '一覧表示', icon: <Eye className="h-4 w-4" />, href: '/admin/organizations' }
      ]
    },
    {
      title: '提携団体管理',
      description: '提携団体の管理',
      icon: <Handshake className="h-6 w-6" />,
      href: '/admin/partners',
      color: 'bg-gradient-to-r from-amber-500 to-amber-600',
      count: stats.partners,
      actions: [
        { label: '新規追加', icon: <Plus className="h-4 w-4" />, href: '/admin/partners/create' },
        { label: '一覧表示', icon: <Eye className="h-4 w-4" />, href: '/admin/partners' }
      ]
    },
    {
      title: '運営メンバー管理',
      description: '運営メンバーの管理',
      icon: <Users className="h-6 w-6" />,
      href: '/admin/members',
      color: 'bg-gradient-to-r from-teal-500 to-teal-600',
      count: stats.members,
      actions: [
        { label: '新規追加', icon: <Plus className="h-4 w-4" />, href: '/admin/members/create' },
        { label: '一覧表示', icon: <Eye className="h-4 w-4" />, href: '/admin/members' }
      ]
    },
    {
      title: 'アクセス解析',
      description: 'サイト統計の更新と分析',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/admin/analytics',
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      count: stats.views,
      actions: [
        { label: '統計表示', icon: <TrendingUp className="h-4 w-4" />, href: '/admin/analytics' },
        { label: '分析レポート', icon: <Activity className="h-4 w-4" />, href: '/admin/analytics/reports' }
      ]
    }
  ], [stats])

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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ようこそ、{user.email}さん
          </h2>
          <p className="text-gray-600 mb-4">
            今日もUNIÓNの管理をお疲れ様です。以下の機能からお選びください。
          </p>
          <Button onClick={handleUpdateStats} disabled={isUpdatingStats}>
            {isUpdatingStats && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            統計データを更新
          </Button>
        </div>

        {/* Stats Overview */}
        {isLoadingStats ? (
          <div className="mb-8 flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : statsError ? (
          <div className="mb-8 text-red-500 text-center py-8">
            <p>{statsError}</p>
            <p className="text-sm text-gray-500">統計データの読み込み中にエラーが発生しました。Supabaseの接続や環境変数を確認してください。</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">ニュース</p>
                    <p className="text-2xl font-bold">{stats.news}</p>
                  </div>
                  <FileText className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">イベント</p>
                    <p className="text-2xl font-bold">{stats.events}</p>
                  </div>
                  <Calendar className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">ページビュー</p>
                    <p className="text-2xl font-bold">{stats.views.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">加盟団体</p>
                    <p className="text-2xl font-bold">{stats.organizations}</p>
                  </div>
                  <Building className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {item.count}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {item.actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start group-hover:border-blue-300 group-hover:text-blue-600 transition-colors"
                      asChild
                    >
                      <Link href={action.href}>
                        {action.icon}
                        <span className="ml-2">{action.label}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">クイックアクション</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1" asChild>
              <Link href="/admin/news/create">
                <FileText className="h-6 w-6" />
                <span>ニュース作成</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1" asChild>
              <Link href="/admin/events/create">
                <Calendar className="h-6 w-6" />
                <span>イベント作成</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1" asChild>
              <Link href="/admin/analytics">
                <BarChart3 className="h-6 w-6" />
                <span>統計確認</span>
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
