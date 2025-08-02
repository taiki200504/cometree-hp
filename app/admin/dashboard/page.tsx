"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Cpu, 
  HardDrive, 
  Network, 
  Activity, 
  Clock, 
  Users, 
  Eye, 
  TrendingUp,
  Shield,
  Bell,
  LogOut,
  Loader2,
  Plus,
  FileText,
  MessageSquare,
  Building,
  Handshake,
  Heart,
  BarChart3,
  Database,
  Settings,
  UserCheck,
  Calendar,
  Star
} from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useToast } from '@/components/ui/use-toast'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface Stats {
  news: number
  events: number
  users: number
  organizations: number
  partners: number
  members: number
  supporters: number
  views: number
  boardPosts: number
}

interface SystemMetrics {
  cpu: number
  memory: number
  network: number
  storage: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>(() => ({
    news: 0,
    events: 0,
    users: 0,
    organizations: 0,
    partners: 0,
    members: 0,
    supporters: 0,
    views: 0,
    boardPosts: 0
  }))
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(() => ({
    cpu: 45,
    memory: 62,
    network: 78,
    storage: 35
  }))
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)
  const [isUpdatingStats, setIsUpdatingStats] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => new Date())

  // リアルタイムシステムメトリクス更新
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      setSystemMetrics(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(85, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(50, Math.min(95, prev.network + (Math.random() - 0.5) * 8)),
        storage: Math.max(25, Math.min(60, prev.storage + (Math.random() - 0.5) * 3))
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // データ取得関数
  const fetchStats = useCallback(async () => {
    try {
      setStatsError(null)
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        if (data.error) {
          setStatsError(data.error)
        } else {
          setStats(data)
        }
      } else {
        const errorData = await response.json()
        setStatsError(errorData.error || '統計データの取得に失敗しました。')
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStatsError(error instanceof Error ? error.message : '不明なエラーが発生しました。')
    } finally {
      setIsLoadingStats(false)
    }
  }, [])

  const { requireAdmin, user, userRole, loading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  // データ取得
  useEffect(() => {
    if (user && userRole === 'admin') {
      fetchStats()
    }
  }, [user, userRole, fetchStats])

  // 認証と権限チェックを統合
  useEffect(() => {
    if (loading) {
      console.log('Still loading, waiting for auth state...')
      return
    }
    
    if (!user) {
      console.log('No user, redirecting to login')
      router.push('/admin/login')
      return
    }
    
    console.log('Dashboard access granted for user:', user.email, 'Role:', userRole)
  }, [loading, user, userRole, router])

  // ローディング中の表示
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Cpu className="h-8 w-8 animate-pulse text-blue-400" />
                <span className="text-2xl font-bold text-blue-400">UNION オペレーションセンター</span>
              </div>
              <div className="text-sm opacity-75">ダッシュボードを初期化中...</div>
            </div>
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-400" />
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>認証システム: オンライン</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>データベース: オンライン</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>API ゲートウェイ: オンライン</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (response.ok) {
        router.push('/admin/login')
        toast({
          title: "ログアウト完了",
          description: "正常にログアウトしました。",
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: "ログアウトエラー",
        description: "ログアウト中にエラーが発生しました。",
        variant: 'destructive',
      })
    }
  }

  const handleUpdateStats = async () => {
    setIsUpdatingStats(true)
    try {
      await fetchStats()
      toast({
        title: "統計更新完了",
        description: "統計データを正常に更新しました。",
      })
    } catch (error) {
      toast({
        title: "統計更新エラー",
        description: "統計データの更新中にエラーが発生しました。",
        variant: 'destructive',
      })
    } finally {
      setIsUpdatingStats(false)
    }
  }

  const handleAddTestData = async (type: 'members' | 'supporters' | 'news') => {
    try {
      const response = await fetch(`/api/admin/${type}/test-data`, { method: 'POST' })
      if (response.ok) {
        toast({
          title: "テストデータ追加完了",
          description: `${type === 'members' ? 'メンバー' : type === 'supporters' ? 'サポーター' : 'ニュース'}のテストデータを正常に追加しました。`,
        })
        fetchStats() // 統計を更新
      } else {
        throw new Error('Failed to add test data')
      }
    } catch (error) {
      toast({
        title: "テストデータ追加エラー",
        description: "テストデータの追加中にエラーが発生しました。",
        variant: 'destructive',
      })
    }
  }

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-red-400'
    if (value >= 60) return 'text-yellow-400'
    return 'text-blue-400'
  }

  const getStatusIcon = (value: number) => {
    if (value >= 80) return '🔴'
    if (value >= 60) return '🟡'
    return '🟢'
  }

  const managementCards = [
    {
      title: 'ニュース管理',
      description: 'ニュース記事の管理',
      icon: <FileText className="h-6 w-6" />,
      href: '/admin/news',
      color: 'from-blue-500 to-blue-600',
      count: stats.news,
      actions: [
        { label: '新規作成', icon: <Plus className="h-4 w-4" />, href: '/admin/news/create' },
        { label: '一覧表示', icon: <Eye className="h-4 w-4" />, href: '/admin/news' }
      ]
    },
    {
      title: 'イベント管理',
      description: 'イベントの管理',
      icon: <Calendar className="h-6 w-6" />,
      href: '/admin/events',
      color: 'from-green-500 to-green-600',
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
      color: 'from-purple-500 to-purple-600',
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
      color: 'from-indigo-500 to-indigo-600',
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
      color: 'from-amber-500 to-amber-600',
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
      color: 'from-teal-500 to-teal-600',
      count: stats.members,
      actions: [
        { label: '新規追加', icon: <Plus className="h-4 w-4" />, href: '/admin/members/create' },
        { label: '一覧表示', icon: <Eye className="h-4 w-4" />, href: '/admin/members' }
      ]
    },
    {
      title: '支援者管理',
      description: '支援者の管理',
      icon: <Heart className="h-6 w-6" />,
      href: '/admin/supporters',
      color: 'from-red-500 to-red-600',
      count: stats.supporters,
      actions: [
        { label: '新規追加', icon: <Plus className="h-4 w-4" />, href: '/admin/supporters/create' },
        { label: '一覧表示', icon: <Eye className="h-4 w-4" />, href: '/admin/supporters' }
      ]
    },
    {
      title: 'アクセス解析',
      description: 'サイト統計の更新と分析',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/admin/analytics',
      color: 'from-orange-500 to-orange-600',
      count: stats.views,
      actions: [
        { label: '統計表示', icon: <TrendingUp className="h-4 w-4" />, href: '/admin/analytics' },
        { label: '統計データ', icon: <Activity className="h-4 w-4" />, href: '/admin/stats' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-mono">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-blue-400/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center border border-blue-400 shadow-lg">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    UNION オペレーションセンター
                  </h1>
                  <div className="text-xs opacity-75">管理者ダッシュボード</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" />
                <Badge variant="secondary" className="bg-blue-400/20 text-blue-400 border-blue-400/30">
                  オンライン
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-400">{user?.email}</p>
                  <p className="text-xs opacity-75">管理者</p>
                </div>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="flex items-center space-x-2 border-blue-400/30 text-blue-400 hover:bg-blue-400/10">
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-blue-400 mb-2">
                ようこそ、{user?.email?.split('@')[0]?.toUpperCase()}
              </h2>
              <p className="text-sm opacity-75 mb-4">
                UNION オペレーションセンター - {currentTime.toLocaleString('ja-JP')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleUpdateStats} disabled={isUpdatingStats} className="bg-blue-400/20 text-blue-400 border-blue-400/30 hover:bg-blue-400/30">
                {isUpdatingStats && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                統計更新
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10">
                    テストデータ追加
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white/10 backdrop-blur-md border-blue-400/30">
                  <DropdownMenuItem onClick={() => handleAddTestData('members')} className="text-blue-400 hover:bg-blue-400/10">
                    メンバーデータ追加
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAddTestData('supporters')} className="text-blue-400 hover:bg-blue-400/10">
                    サポーターデータ追加
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAddTestData('news')} className="text-blue-400 hover:bg-blue-400/10">
                    ニュースデータ追加
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-blue-400/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-400">CPU使用率</CardTitle>
                <Cpu className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemMetrics.cpu.toFixed(1)}%</div>
              <div className={`text-xs ${getStatusColor(systemMetrics.cpu)}`}>
                {getStatusIcon(systemMetrics.cpu)} {systemMetrics.cpu >= 80 ? '高負荷' : systemMetrics.cpu >= 60 ? '注意' : '正常'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-blue-400/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-400">メモリ使用率</CardTitle>
                <HardDrive className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemMetrics.memory.toFixed(1)}%</div>
              <div className={`text-xs ${getStatusColor(systemMetrics.memory)}`}>
                {getStatusIcon(systemMetrics.memory)} {systemMetrics.memory >= 80 ? '高負荷' : systemMetrics.memory >= 60 ? '注意' : '正常'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-blue-400/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-400">ネットワーク</CardTitle>
                <Network className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemMetrics.network.toFixed(1)}%</div>
              <div className={`text-xs ${getStatusColor(systemMetrics.network)}`}>
                {getStatusIcon(systemMetrics.network)} {systemMetrics.network >= 80 ? '高負荷' : systemMetrics.network >= 60 ? '注意' : '正常'}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-blue-400/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-400">ストレージ</CardTitle>
                <Activity className="h-4 w-4 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{systemMetrics.storage.toFixed(1)}%</div>
              <div className={`text-xs ${getStatusColor(systemMetrics.storage)}`}>
                {getStatusIcon(systemMetrics.storage)} {systemMetrics.storage >= 80 ? '高負荷' : systemMetrics.storage >= 60 ? '注意' : '正常'}
              </div>
            </CardContent>
          </Card>
        </div>



        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {managementCards.map((card, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-md border-blue-400/30 hover:bg-white/20 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
                    {card.icon}
                  </div>
                  <Badge variant="secondary" className="bg-blue-400/20 text-blue-400 border-blue-400/30">
                    {card.count}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold text-white">{card.title}</CardTitle>
                <p className="text-sm opacity-75">{card.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  {card.actions.map((action, actionIndex) => (
                    <Button
                      key={actionIndex}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-blue-400/30 text-blue-400 hover:bg-blue-400/10"
                      onClick={() => router.push(action.href)}
                    >
                      {action.icon}
                      <span className="ml-1">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Error Display */}
        {statsError && (
          <div className="mt-8 p-4 bg-red-400/10 border border-red-400/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span className="text-red-400">統計データエラー: {statsError}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
