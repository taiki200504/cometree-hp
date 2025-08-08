"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, PlusCircle, MessageSquare, Edit, Trash2, Eye, Loader2 } from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { Pagination } from '@/components/ui/pagination'
import { useToast } from '@/hooks/use-toast'
import AdminHeading from '@/components/admin/AdminHeading'

interface BoardPost {
  id: string
  title: string
  content: string
  author_name?: string
  is_published: boolean
  created_at: string
  updated_at: string
  view_count: number
  likes_count: number
}

export default function BoardManagementPage() {
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 10

  const { requireAuth, user, userRole } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/admin/board?page=${currentPage}&limit=${itemsPerPage}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch posts')
      }
      
      const result = await response.json()
      setPosts(result.posts || [])
      setTotalCount(result.totalCount || 0)
      setTotalPages(Math.ceil((result.totalCount || 0) / itemsPerPage))
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError(err instanceof Error ? err.message : '投稿の読み込みに失敗しました。')
      toast({
        title: "エラー",
        description: "掲示板投稿の取得に失敗しました",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, toast])

  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (isAuthenticated && user && userRole === 'admin') {
      fetchPosts()
    }
  }, [requireAuth, user, userRole, fetchPosts])

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこの投稿を削除しますか？この操作は元に戻せません。')) {
      return
    }
    
    try {
      const response = await fetch(`/api/admin/board/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete the post.')
      }
      
      toast({
        title: "削除完了",
        description: "投稿を正常に削除しました",
      })
      fetchPosts() // Refresh the list
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: "削除エラー",
        description: "投稿の削除中にエラーが発生しました",
        variant: "destructive"
      })
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
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
              <Button 
                onClick={fetchPosts} 
                className="mt-4"
                variant="outline"
              >
                再試行
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <AdminHeading
        title="掲示板管理"
        actions={(
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{totalCount}件</Badge>
            <Button asChild>
              <Link href="/admin/board/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                新規投稿
              </Link>
            </Button>
          </div>
        )}
      />
      <Card>
        <CardContent>
          {posts.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>タイトル</TableHead>
                    <TableHead className="w-40">投稿者</TableHead>
                    <TableHead className="w-32">ステータス</TableHead>
                    <TableHead className="w-28">閲覧数</TableHead>
                    <TableHead className="w-28">いいね数</TableHead>
                    <TableHead className="w-40">作成日</TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium max-w-sm truncate" title={post.title}>
                        {post.title}
                      </TableCell>
                      <TableCell>{post.author_name || '管理者'}</TableCell>
                      <TableCell>
                        <Badge variant={post.is_published ? "default" : "secondary"}>
                          {post.is_published ? '公開' : '下書き'}
                        </Badge>
                      </TableCell>
                      <TableCell>{post.view_count || 0}</TableCell>
                      <TableCell>{post.likes_count || 0}</TableCell>
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
                            <DropdownMenuItem onClick={() => router.push(`/board/${post.id}`)}>
                              <Eye className="mr-2 h-4 w-4" />
                              プレビュー
                            </DropdownMenuItem>
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
                  ))}
                </TableBody>
              </Table>
              
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">まだ投稿がありません</p>
              <Button asChild>
                <Link href="/admin/board/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  最初の投稿を作成
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}