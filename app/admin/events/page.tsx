"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, PlusCircle, Calendar, Edit, Trash2, Eye, Loader2 } from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { Pagination } from '@/components/ui/pagination'
import { useToast } from '@/components/ui/use-toast' // Import useToast
import AdminHeading from '@/components/admin/AdminHeading'

interface Event {
  id: string
  title: string
  is_published: boolean
  start_date: string
  location: string | null
}

export default function EventsManagementPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10 // 1ページあたりの表示件数

  const { user, loading: authLoading, requireAuth } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast() // Initialize useToast

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/events?page=${currentPage}&limit=${itemsPerPage}`)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'イベントの取得に失敗しました。')
      }
      const result = await response.json()
      setEvents(result.events)
      setTotalPages(Math.ceil(result.totalCount / itemsPerPage))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      toast({
        title: "エラー",
        description: err instanceof Error ? err.message : 'イベントの読み込み中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, toast])

  useEffect(() => {
    requireAuth()
  }, [requireAuth])

  useEffect(() => {
    if (user) {
      fetchEvents()
    }
  }, [user, fetchEvents])

  // 認証チェック
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">読み込み中...</span>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこのイベントを削除しますか？この操作は元に戻せません。')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'イベントの削除に失敗しました。');
      }
      toast({
        title: "成功",
        description: "イベントが正常に削除されました。",
      });
      // 削除後、現在のページを再フェッチして最新の状態を反映
      fetchEvents();
    } catch (error) {
      console.error('Delete error:', error);
      setError(error instanceof Error ? error.message : 'イベントの削除に失敗しました。');
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : 'イベントの削除中に不明なエラーが発生しました。',
        variant: 'destructive',
      });
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">読み込み中...</span>
      </div>
    )
  }

  if (error) {
    return <div className="p-8 text-red-500">エラー: {error}</div>
  }

  return (
    <>
      <AdminHeading
        title="イベント管理"
        actions={(
          <Button asChild>
            <Link href="/admin/events/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              新規作成
            </Link>
          </Button>
        )}
      />
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>タイトル</TableHead>
                <TableHead className="w-32">ステータス</TableHead>
                <TableHead className="w-40">開催日</TableHead>
                <TableHead className="w-48">場所</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length > 0 ? (
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium truncate" title={event.title}>{event.title}</TableCell>
                    <TableCell>
                      <Badge variant={event.is_published ? 'default' : 'secondary'}>
                        {event.is_published ? '公開済み' : '下書き'}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(event.start_date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.location || '未定'}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">メニューを開く</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/events/${event.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            プレビュー
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/admin/events/${event.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(event.id)} className="text-red-600">
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
                  <TableCell colSpan={5} className="text-center">イベントがありません。</TableCell>
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
    </>
  )
}