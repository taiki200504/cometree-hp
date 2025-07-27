"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, PlusCircle, MessageSquare, Edit, Trash2, Eye } from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { Pagination } from '@/components/ui/pagination'

interface BoardPost {
  id: string
  title: string
  created_at: string
  author_id: string // Assuming author_id is available
}

export default function BoardManagementPage() {
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10 // 1ページあたりの表示件数

  const { requireAdmin } = useAdminAuthSimple()
  const router = useRouter()

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/board?page=${currentPage}&limit=${itemsPerPage}`)
      if (!response.ok) {
        throw new Error('Failed to fetch board posts')
      }
      const result = await response.json()
      setPosts(result.boardPosts)
      setTotalPages(Math.ceil(result.totalCount / itemsPerPage))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage])

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      if (requireAdmin()) {
        await fetchPosts()
      }
    }
    checkAuthAndFetch()
  }, [requireAdmin, fetchPosts])

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこの投稿を削除しますか？この操作は元に戻せません。')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/board/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the post.');
      }
      fetchPosts(); // Refresh the list
    } catch (error) {
      console.error('Delete error:', error);
      setError(error instanceof Error ? error.message : '投稿の削除に失敗しました。');
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
            <MessageSquare className="h-6 w-6" />
            <CardTitle>掲示板管理</CardTitle>
          </div>
          <Button asChild>
            <Link href="/admin/board/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              新規投稿
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>タイトル</TableHead>
                <TableHead className="w-48">作成日</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{new Date(post.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">メニューを開く</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {/* プレビュー機能は別途実装が必要な場合あり */}
                          {/* <DropdownMenuItem onClick={() => router.push(`/board/${post.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            プレビュー
                          </DropdownMenuItem> */}
                          <DropdownMenuItem onClick={() => router.push(`/admin/board/${post.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(post.id)} className="text-red-600">
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
                  <TableCell colSpan={3} className="text-center">掲示板の投稿がありません。</TableCell>
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