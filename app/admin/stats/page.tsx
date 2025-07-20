"use client"

import { useState } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  FileText,
  Calendar,
  Download,
  RefreshCw,
  BarChart3,
  Activity,
  Globe
} from 'lucide-react'
import Link from 'next/link'

export default function AdminStats() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [timeRange, setTimeRange] = useState('30d')

  // サンプルデータ
  const [stats] = useState({
    overview: {
      totalViews: 12470,
      totalUsers: 345,
      totalNews: 12,
      totalEvents: 5
    },
    trends: {
      views: {
        current: 12470,
        previous: 11890,
        change: '+4.9%'
      },
      users: {
        current: 345,
        previous: 312,
        change: '+10.6%'
      },
      news: {
        current: 12,
        previous: 10,
        change: '+20.0%'
      }
    },
    topPages: [
      { path: '/', views: 3240, change: '+12%' },
      { path: '/about', views: 1890, change: '+8%' },
      { path: '/news', views: 1560, change: '+15%' },
      { path: '/events', views: 980, change: '+5%' },
      { path: '/contact', views: 720, change: '+3%' }
    ],
    recentActivity: [
      { type: 'news', action: '新規作成', title: 'UNIÓN新年度活動開始のお知らせ', time: '2時間前' },
      { type: 'event', action: '更新', title: '加盟団体交流会', time: '4時間前' },
      { type: 'user', action: 'ログイン', title: 'gakusei.union226@gmail.com', time: '6時間前' },
      { type: 'stats', action: '統計更新', title: '日次統計データ', time: '1日前' }
    ]
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    requireAuth()
    return null
  }

  const getTrendIcon = (change: string) => {
    const isPositive = change.startsWith('+')
    return isPositive ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <FileText className="h-4 w-4 text-blue-600" />
      case 'event':
        return <Calendar className="h-4 w-4 text-green-600" />
      case 'user':
        return <Users className="h-4 w-4 text-purple-600" />
      case 'stats':
        return <BarChart3 className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ダッシュボード
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-orange-600" />
                <h1 className="text-xl font-bold text-gray-900">統計情報</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                更新
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                エクスポート
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">期間:</span>
            <div className="flex space-x-1">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                >
                  {range === '7d' && '7日間'}
                  {range === '30d' && '30日間'}
                  {range === '90d' && '90日間'}
                  {range === '1y' && '1年間'}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総ページビュー</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.overview.totalViews.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(stats.trends.views.change)}
                    <span className="text-sm text-green-600">{stats.trends.views.change}</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">総ユーザー数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.overview.totalUsers.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(stats.trends.users.change)}
                    <span className="text-sm text-green-600">{stats.trends.users.change}</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ニュース記事</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.overview.totalNews}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {getTrendIcon(stats.trends.news.change)}
                    <span className="text-sm text-green-600">{stats.trends.news.change}</span>
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">イベント数</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.overview.totalEvents}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-sm text-gray-500">前月比</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Pages and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>人気ページ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.topPages.map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-500 w-6">{index + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{page.path}</p>
                        <p className="text-xs text-gray-500">{page.views.toLocaleString()} views</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(page.change)}
                      <span className="text-xs text-green-600">{page.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>最近のアクティビティ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.title}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Placeholder */}
        <div className="mt-8">
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>アクセス推移</CardTitle>
              <CardDescription>過去30日間のページビュー推移</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">グラフ表示エリア</p>
                  <p className="text-sm text-gray-400">Chart.js または Recharts で実装予定</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
} 