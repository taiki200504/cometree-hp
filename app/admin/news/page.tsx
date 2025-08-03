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

  const { requireAdmin, user, userRole, loading: authLoading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  // 認証チェック
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="text-lg">LOADING...</div>
          </div>
        </div>
      </div>
    )
  }

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
    if (isAdmin) {
      fetchArticles()
    }
  }, [isAdmin])

  useEffect(() => {
    requireAdmin()
  }, [requireAdmin])

  if (!requireAdmin()) {
    return null
  }

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
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="text-lg">LOADING NEWS DATABASE...</div>
            <div className="text-sm opacity-75 mt-2">Initializing content management system</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-400" />
          <div className="text-lg">SYSTEM ERROR</div>
          <div className="text-sm opacity-75 mt-2">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-green-400/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center border border-green-400">
                  <FileText className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    NEWS MANAGEMENT
                  </h1>
                  <div className="text-xs opacity-75">CONTENT OPERATIONS CENTER</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30">
                <Link href="/admin/news/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  CREATE ARTICLE
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">TOTAL ARTICLES</p>
                  <p className="text-2xl font-bold text-green-400">{systemMetrics.totalArticles}</p>
                </div>
                <Database className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">PUBLISHED</p>
                  <p className="text-2xl font-bold text-green-400">{systemMetrics.publishedArticles}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">DRAFTS</p>
                  <p className="text-2xl font-bold text-yellow-400">{systemMetrics.draftArticles}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">TOTAL VIEWS</p>
                  <p className="text-2xl font-bold text-blue-400">{systemMetrics.totalViews.toLocaleString()}</p>
                </div>
                <Globe className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">AVG VIEWS</p>
                  <p className="text-2xl font-bold text-purple-400">{systemMetrics.averageViews.toFixed(0)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('all')}
              className={filterStatus === 'all' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              ALL
            </Button>
            <Button
              variant={filterStatus === 'published' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('published')}
              className={filterStatus === 'published' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              PUBLISHED
            </Button>
            <Button
              variant={filterStatus === 'draft' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('draft')}
              className={filterStatus === 'draft' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              DRAFTS
            </Button>
          </div>
        </div>

        {/* Articles Table */}
        <Card className="bg-black/50 border-green-400/30">
          <CardHeader>
            <CardTitle className="text-green-400">NEWS ARTICLES</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-green-400/30">
                  <TableHead className="text-green-400">TITLE</TableHead>
                  <TableHead className="text-green-400 w-32">STATUS</TableHead>
                  <TableHead className="text-green-400 w-48">PUBLISHED</TableHead>
                  <TableHead className="text-green-400 w-48">CREATED</TableHead>
                  <TableHead className="text-green-400 w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <TableRow key={article.id} className="border-green-400/30 hover:bg-green-400/5">
                      <TableCell className="font-medium text-green-400">
                        <div className="max-w-xs truncate" title={article.title}>
                          {article.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={article.is_published ? 'default' : 'secondary'}
                          className={article.is_published ? 'bg-green-400/20 text-green-400 border-green-400/30' : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'}
                        >
                          {article.is_published ? 'PUBLISHED' : 'DRAFT'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm opacity-75">
                        {article.published_at ? new Date(article.published_at).toLocaleDateString() : '-'}
                      </TableCell>
                      <TableCell className="text-sm opacity-75">
                        {new Date(article.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-green-400 hover:bg-green-400/10">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-black border-green-400/30">
                            <DropdownMenuItem 
                              onClick={() => router.push(`/news/${article.id}`)}
                              className="text-green-400 hover:bg-green-400/10"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              PREVIEW
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => router.push(`/admin/news/${article.id}/edit`)}
                              className="text-blue-400 hover:bg-blue-400/10"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              EDIT
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(article.id)} 
                              className="text-red-400 hover:bg-red-400/10"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              DELETE
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-green-400/30">
                    <TableCell colSpan={5} className="text-center text-green-400">
                      No articles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}