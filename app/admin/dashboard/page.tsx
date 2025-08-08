"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  Users, 
  FileText, 
  Calendar, 
  Building, 
  Handshake, 
  Heart, 
  BarChart3, 
  Settings, 
  Plus,
  ArrowRight,
  TrendingUp,
  Eye,
  MessageSquare,
  Star
} from 'lucide-react'
import Link from 'next/link'
import AdminHeader from '@/components/admin/AdminHeader'

interface DashboardStats {
  totalMembers: number
  totalNews: number
  totalEvents: number
  totalOrganizations: number
  totalPartners: number
  totalSupporters: number
  totalBoardPosts: number
  recentActivity: number
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical'
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    totalNews: 0,
    totalEvents: 0,
    totalOrganizations: 0,
    totalPartners: 0,
    totalSupporters: 0,
    totalBoardPosts: 0,
    recentActivity: 0,
    systemHealth: 'excellent'
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)

  const { requireAuth, loading: authLoading, signOut } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  const fetchStats = useCallback(async () => {
    try {
      setIsLoadingStats(true)
      
      const [membersRes, newsRes, eventsRes, organizationsRes, partnersRes, supportersRes, boardRes] = await Promise.all([
        fetch('/api/admin/members'),
        fetch('/api/admin/news'),
        fetch('/api/admin/events'),
        fetch('/api/admin/organizations'),
        fetch('/api/admin/partners'),
        fetch('/api/admin/supporters'),
        fetch('/api/admin/board')
      ])

      const members = await membersRes.json()
      const news = await newsRes.json()
      const events = await eventsRes.json()
      const organizations = await organizationsRes.json()
      const partners = await partnersRes.json()
      const supporters = await supportersRes.json()
      const board = await boardRes.json()

      const totalMembers = members.totalCount ?? members.members?.length ?? 0
      const totalNews = news.totalCount ?? news.news?.length ?? 0
      const totalEvents = events.totalCount ?? events.events?.length ?? 0
      const totalOrganizations = organizations.totalCount ?? organizations.organizations?.length ?? 0
      const totalPartners = partners.totalCount ?? partners.partners?.length ?? 0
      const totalSupporters = supporters.totalCount ?? supporters.supporters?.length ?? 0
      const totalBoardPosts = board.totalCount ?? board.posts?.length ?? 0

      setStats({
        totalMembers,
        totalNews,
        totalEvents,
        totalOrganizations,
        totalPartners,
        totalSupporters,
        totalBoardPosts,
        recentActivity: totalMembers + totalNews + totalEvents,
        systemHealth: 'excellent'
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      toast({
        title: "エラー",
        description: "統計データの取得に失敗しました",
        variant: "destructive"
      })
    } finally {
      setIsLoadingStats(false)
    }
  }, [toast])

  // データ取得
  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (isAuthenticated) {
      fetchStats()
    }
  }, [requireAuth, fetchStats])

  // 認証チェック（一度だけ実行）
  useEffect(() => {
    if (!authLoading) {
      const isAuthenticated = requireAuth()
      if (!isAuthenticated) {
        return // リダイレクトが実行されるので何もしない
      }
    }
  }, [authLoading, requireAuth])

  // ローディング中の表示
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <div className="text-lg">INITIALIZING ADMIN DASHBOARD...</div>
            <div className="text-sm opacity-75 mt-2">Loading system components</div>
          </div>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      title: "メンバー追加",
      description: "新しいメンバーを登録",
      icon: <Users className="h-6 w-6" />,
      href: "/admin/members/create",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "ニュース作成",
      description: "新しいニュースを投稿",
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/news/create",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "イベント作成",
      description: "新しいイベントを登録",
      icon: <Calendar className="h-6 w-6" />,
      href: "/admin/events/create",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "団体追加",
      description: "新しい加盟団体を登録",
      icon: <Building className="h-6 w-6" />,
      href: "/admin/organizations/create",
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ]

  const managementSections = [
    {
      title: "メンバー管理",
      description: "運営メンバーの管理",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/members",
      count: stats.totalMembers,
      color: "text-blue-600"
    },
    {
      title: "ニュース管理",
      description: "ニュース記事の管理",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/news",
      count: stats.totalNews,
      color: "text-green-600"
    },
    {
      title: "イベント管理",
      description: "イベントの管理",
      icon: <Calendar className="h-5 w-5" />,
      href: "/admin/events",
      count: stats.totalEvents,
      color: "text-purple-600"
    },
    {
      title: "掲示板管理",
      description: "掲示板投稿の管理",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/board",
      count: stats.totalBoardPosts,
      color: "text-violet-600"
    },
    {
      title: "加盟団体管理",
      description: "加盟団体の管理",
      icon: <Building className="h-5 w-5" />,
      href: "/admin/organizations",
      count: stats.totalOrganizations,
      color: "text-orange-600"
    },
    {
      title: "提携企業管理",
      description: "提携企業の管理",
      icon: <Handshake className="h-5 w-5" />,
      href: "/admin/partners",
      count: stats.totalPartners,
      color: "text-indigo-600"
    },
    {
      title: "支援者管理",
      description: "支援者の管理",
      icon: <Heart className="h-5 w-5" />,
      href: "/admin/supporters",
      count: stats.totalSupporters,
      color: "text-pink-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="UNION 管理者ダッシュボード" trail={[{label:'管理'}, {label:'ダッシュボード'}]} />
      <div className="p-4 md:p-8">
        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">総メンバー数</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{isLoadingStats ? '...' : stats.totalMembers}</div>
              <p className="text-xs text-gray-600">運営メンバー</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">ニュース記事</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{isLoadingStats ? '...' : stats.totalNews}</div>
              <p className="text-xs text-gray-600">公開済み記事</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">イベント数</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{isLoadingStats ? '...' : stats.totalEvents}</div>
              <p className="text-xs text-gray-600">登録済みイベント</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-900">加盟団体</CardTitle>
              <Building className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{isLoadingStats ? '...' : stats.totalOrganizations}</div>
              <p className="text-xs text-gray-600">加盟団体数</p>
            </CardContent>
          </Card>
        </div>

        {/* クイックアクション */}
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">クイックアクション</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${action.color} text-white`}>
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <Button asChild size="sm" className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                      <Link href={action.href}>
                        <Plus className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 管理セクション */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">管理セクション</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementSections.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gray-100 ${section.color}`}>
                        {section.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900">{section.title}</CardTitle>
                        <p className="text-sm text-gray-600">{section.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{section.count}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={section.href}>
                      管理画面へ
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 追加機能 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">統計・分析</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">サイトの統計データと分析結果を確認</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/stats">
                  統計を見る
                  <TrendingUp className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Settings className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">システム設定</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">システム設定と環境変数の管理</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/settings">
                  設定を開く
                  <Settings className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">ポッドキャスト管理</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">ポッドキャスト番組とエピソードの管理</p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/podcasts">
                  ポッドキャスト管理
                  <Star className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
