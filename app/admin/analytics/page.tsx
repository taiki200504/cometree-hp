"use client"

import { useState, useEffect } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  Download,
  RefreshCw,
  Loader2
} from 'lucide-react'

interface AnalyticsData {
  totalViews: number
  uniqueVisitors: number
  dailyData: Array<{
    date: string
    views: number
  }>
}

interface PageAnalytics {
  pages: Array<{
    path: string
    title: string
    views: number
  }>
}

interface SourceAnalytics {
  sources: Array<{
    source: string
    views: number
  }>
}

export default function AnalyticsPage() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [period, setPeriod] = useState('7d')
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [pageAnalytics, setPageAnalytics] = useState<PageAnalytics | null>(null)
  const [sourceAnalytics, setSourceAnalytics] = useState<SourceAnalytics | null>(null)

  useEffect(() => {
    requireAuth()
    fetchAnalytics()
  }, [requireAuth, period])

  const fetchAnalytics = async () => {
    setIsLoading(true)
    try {
      // 概要データを取得
      const overviewResponse = await fetch(`/api/analytics?period=${period}&type=overview`)
      const overviewData = await overviewResponse.json()
      setAnalyticsData(overviewData)

      // ページ別データを取得
      const pagesResponse = await fetch(`/api/analytics?period=${period}&type=pages`)
      const pagesData = await pagesResponse.json()
      setPageAnalytics(pagesData)

      // ソース別データを取得
      const sourcesResponse = await fetch(`/api/analytics?period=${period}&type=sources`)
      const sourcesData = await sourcesResponse.json()
      setSourceAnalytics(sourcesData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const response = await fetch('/api/analytics/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ period, type: 'all' }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `analytics_${period}_${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('エクスポートに失敗しました')
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-purple-600" />
                <h1 className="text-xl font-bold text-gray-900">アクセス解析</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">過去7日</SelectItem>
                  <SelectItem value="30d">過去30日</SelectItem>
                  <SelectItem value="90d">過去90日</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={fetchAnalytics}>
                <RefreshCw className="h-4 w-4 mr-2" />
                更新
              </Button>
              <Button onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                エクスポート
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">総ページビュー</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData?.totalViews.toLocaleString() || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  前回比 +12%
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ユニークビジター</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData?.uniqueVisitors.toLocaleString() || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  前回比 +8%
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均滞在時間</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2分34秒</div>
                <p className="text-xs text-muted-foreground">
                  前回比 +5%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Page Analytics */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>人気ページ</CardTitle>
              <CardDescription>
                最もアクセスが多いページの一覧
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pageAnalytics?.pages.slice(0, 10).map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{page.title}</p>
                        <p className="text-sm text-gray-500">{page.path}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{page.views.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">ページビュー</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Source Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>トラフィックソース</CardTitle>
                <CardDescription>
                  訪問者の流入元
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sourceAnalytics?.sources.map((source) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="font-medium capitalize">{source.source}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{source.views.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">
                          {((source.views / (sourceAnalytics.sources.reduce((sum, s) => sum + s.views, 0))) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>日別アクセス</CardTitle>
                <CardDescription>
                  日別のページビュー数
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData?.dailyData.slice(-7).map((day) => (
                    <div key={day.date} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{day.date}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ 
                              width: `${(day.views / Math.max(...analyticsData.dailyData.map(d => d.views))) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">
                          {day.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 