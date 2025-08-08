"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { 
  MoreHorizontal, 
  PlusCircle, 
  FileText, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Calendar,
  Clock,
  Globe,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Database,
  Server,
  Network,
  Zap,
  TrendingUp
} from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { Pagination } from '@/components/ui/pagination'
import { useToast } from '@/components/ui/use-toast'
import AdminHeader from '@/components/admin/AdminHeader'

interface NewsArticle {
  id: string
  title: string
  content: string
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  view_count?: number
  author_id?: string
}

interface SystemMetrics {
  totalArticles: number
  publishedArticles: number
  draftArticles: number
  totalViews: number
  averageViews: number
}

export default function NewsManagementPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(() => ({
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalViews: 0,
    averageViews: 0
  }))
  const itemsPerPage = 10

  const { requireAdmin, user, userRole, loading: authLoading, isAdmin } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        status: filterStatus
      })
      
      const response = await fetch(`/api/admin/news?${params}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'ニュース記事の取得に失敗しました。')
      }
      const result = await response.json()
      setArticles(result.news || [])
      setTotalPages(Math.ceil((result.totalCount || 0) / itemsPerPage))
      
      // Update system metrics
      if (result.metrics) {
        setSystemMetrics(result.metrics)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。')
      toast({
        title: "システムエラー",
        description: err instanceof Error ? err.message : 'ニュース記事の読み込み中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, searchTerm, filterStatus, toast])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  // 認証チェック
  // レイアウト側で認証ガード済み

  const handleDelete = async (id: string) => {
    if (!confirm('この記事を削除しますか？この操作は元に戻せません。')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '記事の削除に失敗しました。')
      }
      toast({
        title: "削除完了",
        description: "記事が正常に削除されました。",
      })
      fetchArticles()
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: "削除エラー",
        description: error instanceof Error ? error.message : '記事の削除中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleFilterChange = (status: 'all' | 'published' | 'draft') => {
    setFilterStatus(status)
    setCurrentPage(1)
  }

  if (loading && articles.length === 0) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">読み込み中...</span>
      </div>
    )
  }
 
  if (error) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              <p className="text-lg font-semibold mb-2">エラーが発生しました</p>
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
 
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="ニュース管理" trail={[{ label: '管理' }, { label: 'ニュース' }]} createLink={{ href: '/admin/news/create', label: '新規記事' }} />
      <div className="p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">総記事数</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.totalArticles}</p>
                </div>
                <Database className="h-6 w-6 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">公開済み</p>
                  <p className="text-2xl font-bold text-green-600">{systemMetrics.publishedArticles}</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">下書き</p>
                  <p className="text-2xl font-bold text-yellow-600">{systemMetrics.draftArticles}</p>
                </div>
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">総閲覧数</p>
                  <p className="text-2xl font-bold text-blue-600">{systemMetrics.totalViews.toLocaleString()}</p>
                </div>
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">平均閲覧</p>
                  <p className="text-2xl font-bold text-purple-600">{systemMetrics.averageViews.toFixed(0)}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="記事を検索..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant={filterStatus === 'all' ? 'default' : 'outline'} onClick={() => handleFilterChange('all')}>すべて</Button>
            <Button variant={filterStatus === 'published' ? 'default' : 'outline'} onClick={() => handleFilterChange('published')}>公開</Button>
            <Button variant={filterStatus === 'draft' ? 'default' : 'outline'} onClick={() => handleFilterChange('draft')}>下書き</Button>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-gray-900">記事一覧</CardTitle>
            <Button asChild>
              <Link href="/admin/news/create"><PlusCircle className="mr-2 h-4 w-4" /> 新規記事</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>タイトル</TableHead>
                  <TableHead className="w-32">ステータス</TableHead>
                  <TableHead className="w-48">公開日</TableHead>
                  <TableHead className="w-48">作成日</TableHead>
                  <TableHead className="w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">
                        <div className="max-w-xs truncate" title={article.title}>{article.title}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={article.is_published ? 'default' : 'secondary'}>
                          {article.is_published ? '公開' : '下書き'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {article.published_at ? new Date(article.published_at).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(article.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">メニューを開く</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/news/${article.id}`)}>プレビュー</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/admin/news/${article.id}/edit`)}>編集</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(article.id)} className="text-red-600">削除</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-gray-500">記事が見つかりません</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}