"use client"

import { useState, useEffect } from 'react'
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
  FileText,
  Loader2,
  Filter
} from 'lucide-react'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

interface NewsItem {
  id: string
  title: string
  content: string
  excerpt?: string
  author: string
  status: string
  category: string
  created_at: string
  published_at?: string
  views?: number
}

export default function AdminNews() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [news, setNews] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  useEffect(() => {
    fetchNews()
  }, [searchTerm, statusFilter])

  const fetchNews = async () => {
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (statusFilter) params.append('status', statusFilter)
      params.append('limit', '50')

      const response = await fetch(`/api/admin/news?${params}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'ニュースの取得に失敗しました')
      }

      setNews(result.data || [])
    } catch (error) {
      console.error('Error fetching news:', error)
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : 'ニュースの取得に失敗しました',
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('このニュースを削除しますか？この操作は取り消せません。')) {
      return
    }

    setIsDeleting(id)
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || '削除に失敗しました')
      }

      toast({
        title: "成功",
        description: "ニュースが正常に削除されました",
      })

      // リストを更新
      setNews(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error deleting news:', error)
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : '削除に失敗しました',
        variant: "destructive"
      })
    } finally {
      setIsDeleting(null)
    }
  }

  if (loading) {
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
    requireAuth()
    return null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">公開中</Badge>
      case 'draft':
        return <Badge variant="secondary">下書き</Badge>
      case 'archived':
        return <Badge variant="outline">アーカイブ</Badge>
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="ニュースを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">すべてのステータス</option>
                <option value="published">公開中</option>
                <option value="draft">下書き</option>
                <option value="archived">アーカイブ</option>
              </select>
            </div>
          </div>
        </div>

        {/* News List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : news.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ニュースがありません</h3>
              <p className="text-gray-500 mb-4">新しいニュースを作成してください</p>
              <Button asChild>
                <Link href="/admin/news/create">
                  <Plus className="h-4 w-4 mr-2" />
                  ニュースを作成
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {news.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        {getStatusBadge(item.status)}
                      </div>
                      
                      {item.excerpt && (
                        <p className="text-gray-600 line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(item.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{item.author}</span>
                        </div>
                        {item.views !== undefined && (
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{item.views} views</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/news/${item.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={isDeleting === item.id}
                        className="text-red-600 hover:text-red-700"
                      >
                        {isDeleting === item.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
} 