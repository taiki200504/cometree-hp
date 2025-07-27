"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, PlusCircle, FileText, Edit, Trash2, Eye } from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { Pagination } from '@/components/ui/pagination'
import { useToast } from '@/components/ui/use-toast' // Import useToast // Import Pagination component

interface NewsArticle {
  id: string
  title: string
  is_published: boolean
  published_at: string | null
  created_at: string
}

export default function NewsManagementPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10 // 1ページあたりの表示件数

  const { requireAdmin, user, userRole } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast() // Initialize useToast

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/news?page=${currentPage}&limit=${itemsPerPage}`)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'ニュース記事の取得に失敗しました。')
      }
      const result = await response.json()
      setArticles(result.news)
      setTotalPages(Math.ceil(result.totalCount / itemsPerPage))
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。')
      // Use toast without dependency to avoid re-renders
      if (typeof window !== 'undefined') {
        // Only show toast in browser environment
        toast({
          title: "エラー",
          description: err instanceof Error ? err.message : 'ニュース記事の読み込み中に不明なエラーが発生しました。',
          variant: 'destructive',
        })
      }
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    // Only fetch articles if we have a user and they are an admin
    if (user && userRole === 'admin') {
      fetchArticles()
    }
  }, [user, userRole, fetchArticles])

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこの記事を削除しますか？この操作は元に戻せません。')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '記事の削除に失敗しました。');
      }
      toast({
        title: "成功",
        description: "記事が正常に削除されました。",
      });
      // 削除後、現在のページを再フェッチして最新の状態を反映
      fetchArticles();
    } catch (error) {
      console.error('Delete error:', error);
      setError(error instanceof Error ? error.message : '記事の削除に失敗しました。');
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : '記事の削除中に不明なエラーが発生しました。',
        variant: 'destructive',
      });
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="p-8">読み込み中...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">エラー: {error}</div>
  }

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6" />
            <CardTitle>ニュース管理</CardTitle>
          </div>
          <Button asChild>
            <Link href="/admin/news/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              新規作成
            </Link>
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
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>
                      <Badge variant={article.is_published ? 'default' : 'secondary'}>
                        {article.is_published ? '公開済み' : '下書き'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {article.published_at ? new Date(article.published_at).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>{new Date(article.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">メニューを開く</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/news/${article.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            プレビュー
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/news/${article.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(article.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">ニュース記事がありません。</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  )
}