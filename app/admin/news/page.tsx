"use client"

import { useState } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  FileText
} from 'lucide-react'
import Link from 'next/link'

export default function AdminNews() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [searchTerm, setSearchTerm] = useState('')

  // サンプルデータ
  const [news] = useState([
    {
      id: 1,
      title: 'UNIÓN新年度活動開始のお知らせ',
      content: '2025年度のUNIÓN活動が本格的に開始されました...',
      author: 'gakusei.union226@gmail.com',
      publishedAt: '2025-01-15',
      status: 'published',
      views: 245
    },
    {
      id: 2,
      title: '加盟団体募集のお知らせ',
      content: '新しい加盟団体を募集しています...',
      author: 'gakusei.union226@gmail.com',
      publishedAt: '2025-01-10',
      status: 'draft',
      views: 0
    },
    {
      id: 3,
      title: 'イベント開催のお知らせ',
      content: '来月開催予定のイベントについて...',
      author: 'gakusei.union226@gmail.com',
      publishedAt: '2025-01-05',
      status: 'published',
      views: 189
    }
  ])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    requireAuth()
    return null
  }

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">公開中</Badge>
      case 'draft':
        return <Badge variant="secondary">下書き</Badge>
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                <FileText className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">ニュース管理</h1>
              </div>
            </div>
            <Button asChild>
              <Link href="/admin/news/create">
                <Plus className="h-4 w-4 mr-2" />
                新規作成
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ニュースを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">すべて</Button>
              <Button variant="outline">公開中</Button>
              <Button variant="outline">下書き</Button>
            </div>
          </div>
        </div>

        {/* News List */}
        <div className="space-y-4">
          {filteredNews.map((item) => (
            <Card key={item.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{item.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{item.publishedAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{item.views} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ニュースが見つかりません</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? '検索条件に一致するニュースがありません。' : 'まだニュースが作成されていません。'}
              </p>
              <Button asChild>
                <Link href="/admin/news/create">
                  <Plus className="h-4 w-4 mr-2" />
                  最初のニュースを作成
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 