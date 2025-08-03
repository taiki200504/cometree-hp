"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, BarChart3, TrendingUp, Users } from 'lucide-react'
import { useAdminAuth } from '@/hooks/use-admin-auth'

interface AnalyticsData {
  date: string
  activeUsers: string
  pageViews: string
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { requireAuth } = useAdminAuth()

  useEffect(() => {
    requireAuth()
  }, [requireAuth])

  // 最新のデータ（今日）を取得
  const todayData = analyticsData[analyticsData.length - 1]

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-6 w-6" />
            <CardTitle>アクセス解析</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">過去7日間のウェブサイトアクセスデータ</CardDescription>
          
          {todayData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">今日のページビュー</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayData.pageViews}</div>
                  <p className="text-xs text-muted-foreground">
                    {todayData.date} のデータ
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">今日のユーザー数</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{todayData.activeUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    {todayData.date} のデータ
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <p className="text-center text-muted-foreground">データがありません。</p>
          )}

          {/* 詳細なデータ表示（テーブルなど） */}
          {analyticsData.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">日別データ</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">アクティブユーザー</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ページビュー</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {analyticsData.map((data, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.activeUsers}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.pageViews}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}