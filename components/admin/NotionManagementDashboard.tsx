'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Database, 
  RefreshCw, 
  BarChart3, 
  Search, 
  Download, 
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap
} from 'lucide-react'

interface SyncStatus {
  overall: 'healthy' | 'degraded' | 'error'
  databases: Array<{
    type: string
    status: 'connected' | 'error' | 'not_configured'
    lastCheck: string
  }>
  checkedAt: string
}

interface ContentAnalytics {
  summary: {
    totalContent: number
    totalPublished: number
    totalDrafts: number
  }
  byType: Array<{
    type: string
    total: number
    published: number
    drafts: number
    lastUpdated: string
    publishRate: string
  }>
  generatedAt: string
}

export function NotionManagementDashboard() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus | null>(null)
  const [analytics, setAnalytics] = useState<ContentAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [lastSync, setLastSync] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('databases')

  // 同期状態を取得
  const fetchSyncStatus = async () => {
    try {
      const response = await fetch('/api/admin/notion/sync-status')
      if (response.ok) {
        const data = await response.json()
        setSyncStatus(data)
      }
    } catch (error) {
      console.error('Failed to fetch sync status:', error)
    }
  }

  // コンテンツ分析を取得
  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/notion/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    }
  }

  // 全コンテンツ同期実行
  const handleSyncAll = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/notion/sync-all', {
        method: 'POST'
      })
      if (response.ok) {
        const result = await response.json()
        setLastSync(new Date().toLocaleString())
        await fetchSyncStatus()
        await fetchAnalytics()
      }
    } catch (error) {
      console.error('Sync failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // バックアップ作成
  const handleCreateBackup = async () => {
    try {
      const response = await fetch('/api/admin/notion/backup', {
        method: 'POST'
      })
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `notion-backup-${new Date().toISOString().split('T')[0]}.json`
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Backup failed:', error)
    }
  }

  useEffect(() => {
    fetchSyncStatus()
    fetchAnalytics()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
      case 'degraded':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'error':
      case 'degraded':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notion データベース管理</h1>
          <p className="text-muted-foreground">
            サイトコンテンツのNotion統合管理ダッシュボード
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateBackup} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            バックアップ
          </Button>
          <Button onClick={handleSyncAll} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? '同期中...' : '全て同期'}
          </Button>
        </div>
      </div>

      {/* 同期状態概要 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">全体状態</CardTitle>
            {syncStatus && getStatusIcon(syncStatus.overall)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {syncStatus?.overall === 'healthy' ? '正常' : '要確認'}
            </div>
            <p className="text-xs text-muted-foreground">
              最終確認: {syncStatus?.checkedAt ? new Date(syncStatus.checkedAt).toLocaleString() : '-'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総コンテンツ数</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics?.summary.totalContent || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              公開中: {analytics?.summary.totalPublished || 0} / 
              下書き: {analytics?.summary.totalDrafts || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">最終同期</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {lastSync ? '完了' : '未実行'}
            </div>
            <p className="text-xs text-muted-foreground">
              {lastSync || '同期を実行してください'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 詳細タブ */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="databases">データベース状態</TabsTrigger>
          <TabsTrigger value="analytics">コンテンツ分析</TabsTrigger>
          <TabsTrigger value="tools">管理ツール</TabsTrigger>
        </TabsList>

        <TabsContent value="databases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>データベース接続状態</CardTitle>
              <CardDescription>
                各Notionデータベースの接続状況を確認できます
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {syncStatus?.databases.map((db) => (
                  <div key={db.type} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(db.status)}
                      <div>
                        <p className="font-medium">{db.type}</p>
                        <p className="text-sm text-muted-foreground">
                          最終確認: {new Date(db.lastCheck).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(db.status)}>
                      {db.status === 'connected' ? '接続中' : 
                       db.status === 'error' ? 'エラー' : '未設定'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics?.byType.map((type) => (
              <Card key={type.type}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{type.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{type.total}</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>公開率</span>
                      <span>{type.publishRate}%</span>
                    </div>
                    <Progress value={parseFloat(type.publishRate)} className="h-2" />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    公開: {type.published} / 下書き: {type.drafts}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  コンテンツ検索
                </CardTitle>
                <CardDescription>
                  全データベース横断検索機能
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  検索機能を開く
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  一括インポート
                </CardTitle>
                <CardDescription>
                  CSVファイルからの一括データインポート
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  インポート開始
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default NotionManagementDashboard