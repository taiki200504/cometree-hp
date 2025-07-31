"use client"

import { useEffect, useState, useCallback } from 'react'
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
  MessageSquare,
  Shield,
  Zap,
  Cpu,
  Database,
  Server,
  Network,
  Globe,
  Target,
  Rocket,
  AlertTriangle,
  CheckCircle,
  Clock,
  Monitor,
  Terminal,
  Satellite,
  Radar,
  Wifi,
  Signal,
  Battery,
  HardDrive,

  Cpu as CpuIcon,
  Heart
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

interface SystemMetrics {
  cpu: number
  memory: number
  network: number
  storage: number
  uptime: string
  activeConnections: number
  responseTime: number
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
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 62,
    network: 78,
    storage: 34,
    uptime: '15d 7h 23m',
    activeConnections: 127,
    responseTime: 142
  })
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [statsError, setStatsError] = useState<string | null>(null)
  const [isUpdatingStats, setIsUpdatingStats] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // リアルタイムシステムメトリクス更新
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
      setSystemMetrics(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(85, prev.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(50, Math.min(95, prev.network + (Math.random() - 0.5) * 8)),
        storage: Math.max(25, Math.min(60, prev.storage + (Math.random() - 0.5) * 3)),
        activeConnections: Math.max(100, Math.min(200, prev.activeConnections + Math.floor((Math.random() - 0.5) * 20))),
        responseTime: Math.max(80, Math.min(200, prev.responseTime + (Math.random() - 0.5) * 30))
      }))
    }, 5000) // 3秒から5秒に変更
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
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Cpu className="h-8 w-8 animate-pulse" />
                <span className="text-2xl font-bold">UNION OPERATIONS CENTER</span>
              </div>
              <div className="text-sm opacity-75">Initializing Dashboard...</div>
            </div>
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Authentication: ONLINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>Database: ONLINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span>API Gateway: ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ローディング中または認証エラーの場合はローディング画面を表示
  if (loading || !user || userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
          <p className="text-lg">
            {loading ? 'INITIALIZING...' : 'AUTHENTICATING...'}
          </p>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const handleUpdateStats = async () => {
    setIsUpdatingStats(true)
    try {
      const response = await fetch('/api/admin/stats/update', {
        method: 'POST',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '統計データの更新に失敗しました。')
      }
      fetchStats()
    } catch (error) {
      console.error('Error updating stats:', error)
    } finally {
      setIsUpdatingStats(false)
    }
  }

  const getStatusColor = (value: number) => {
    if (value < 50) return 'text-green-400'
    if (value < 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusIcon = (value: number) => {
    if (value < 50) return <CheckCircle className="h-4 w-4 text-green-400" />
    if (value < 80) return <AlertTriangle className="h-4 w-4 text-yellow-400" />
    return <AlertTriangle className="h-4 w-4 text-red-400" />
  }

  const menuItems = [
    {
      title: 'ニュース管理',
      description: 'ニュース記事の作成・編集・削除',
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
      description: 'イベントの作成・編集・削除',
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
      color: 'from-pink-500 to-pink-600',
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
      count: 0, // TODO: Add supporters count to stats
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
    },
    {
      title: '加盟団体管理',
      description: '加盟団体の情報とイベント申請を管理',
      icon: <Building className="h-6 w-6" />,
      href: '/admin/organizations',
      color: 'from-purple-500 to-purple-600',
      count: stats.organizations,
      actions: [
        { label: '団体一覧', icon: <Eye className="h-4 w-4" />, href: '/admin/organizations' },
        { label: 'ダッシュボード', icon: <Database className="h-4 w-4" />, href: '/admin/organizations/dashboard' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-green-400/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center border border-green-400">
                  <Shield className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    UNION OPS
                  </h1>
                  <div className="text-xs opacity-75">OPERATIONS CENTER</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-green-400 hover:text-green-300 cursor-pointer transition-colors" />
                <Badge variant="secondary" className="bg-green-400/20 text-green-400 border-green-400/30">
                  ONLINE
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-green-400">{user.email}</p>
                  <p className="text-xs opacity-75">ADMINISTRATOR</p>
                </div>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="flex items-center space-x-2 border-green-400/30 text-green-400 hover:bg-green-400/10">
                  <LogOut className="h-4 w-4" />
                  <span>LOGOUT</span>
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
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                WELCOME, {user.email?.split('@')[0]?.toUpperCase()}
              </h2>
              <p className="text-sm opacity-75 mb-4">
                UNION Operations Center - {currentTime.toLocaleString()}
              </p>
            </div>
            <Button onClick={handleUpdateStats} disabled={isUpdatingStats} className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30">
              {isUpdatingStats && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              UPDATE STATS
            </Button>
          </div>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">CPU USAGE</p>
                  <p className={`text-2xl font-bold ${getStatusColor(systemMetrics.cpu)}`}>{systemMetrics.cpu.toFixed(1)}%</p>
                </div>
                <CpuIcon className="h-8 w-8 text-green-400" />
              </div>
              {getStatusIcon(systemMetrics.cpu)}
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">MEMORY</p>
                  <p className={`text-2xl font-bold ${getStatusColor(systemMetrics.memory)}`}>{systemMetrics.memory.toFixed(1)}%</p>
                </div>
                <HardDrive className="h-8 w-8 text-green-400" />
              </div>
              {getStatusIcon(systemMetrics.memory)}
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">NETWORK</p>
                  <p className={`text-2xl font-bold ${getStatusColor(systemMetrics.network)}`}>{systemMetrics.network.toFixed(1)}%</p>
                </div>
                <Network className="h-8 w-8 text-green-400" />
              </div>
              {getStatusIcon(systemMetrics.network)}
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">STORAGE</p>
                  <p className={`text-2xl font-bold ${getStatusColor(systemMetrics.storage)}`}>{systemMetrics.storage.toFixed(1)}%</p>
                </div>
                <HardDrive className="h-8 w-8 text-green-400" />
              </div>
              {getStatusIcon(systemMetrics.storage)}
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        {isLoadingStats ? (
          <div className="mb-8 flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-green-400" />
          </div>
        ) : statsError ? (
          <div className="mb-8 text-red-400 text-center py-8">
            <p>{statsError}</p>
            <p className="text-sm opacity-75">統計データの読み込み中にエラーが発生しました。</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs opacity-90">NEWS</p>
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
                    <p className="text-xs opacity-90">EVENTS</p>
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
                    <p className="text-xs opacity-90">VIEWS</p>
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
                    <p className="text-xs opacity-90">ORGANIZATIONS</p>
                    <p className="text-2xl font-bold">{stats.organizations}</p>
                  </div>
                  <Building className="h-8 w-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* System Status */}
        <div className="mb-8 p-6 bg-black/50 border border-green-400/30 rounded-lg">
          <h3 className="text-lg font-bold mb-4">SYSTEM STATUS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Uptime</span>
              </span>
              <span className="text-green-400">{systemMetrics.uptime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Signal className="h-4 w-4" />
                <span>Connections</span>
              </span>
              <span className="text-green-400">{systemMetrics.activeConnections}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Response Time</span>
              </span>
              <span className="text-green-400">{systemMetrics.responseTime}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Battery className="h-4 w-4" />
                <span>Status</span>
              </span>
              <span className="text-green-400">OPERATIONAL</span>
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-green-400/30 bg-black/50 backdrop-blur-sm hover:bg-black/70">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                    {item.icon}
                  </div>
                  <Badge variant="secondary" className="bg-green-400/20 text-green-400 border-green-400/30">
                    {item.count}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-green-400 group-hover:text-green-300 transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="text-sm opacity-75">
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
                      className="w-full justify-start border-green-400/30 text-green-400 hover:bg-green-400/10 group-hover:border-green-400 transition-colors"
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
      </main>
    </div>
  )
}
