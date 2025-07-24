"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, PlusCircle, Users, Edit, Trash2 } from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { Pagination } from '@/components/ui/pagination'
import { useToast } from '@/components/ui/use-toast' // Import useToast // Import Pagination component

interface Member {
  id: string
  email: string
  role: string
  created_at: string
}

export default function MembersManagementPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 10 // 1ページあたりの表示件数

  const { requireAdmin } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast() // Initialize useToast

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/members?page=${currentPage}&limit=${itemsPerPage}`)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '運営メンバーの取得に失敗しました。')
      }
      const result = await response.json()
      setMembers(result.members)
      setTotalPages(Math.ceil(result.totalCount / itemsPerPage))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      toast({
        title: "エラー",
        description: err instanceof Error ? err.message : '運営メンバーの読み込み中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, toast])

  useEffect(() => {
    if (!requireAdmin()) return
    fetchMembers()
  }, [requireAdmin, fetchMembers])

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこのメンバーを削除しますか？この操作は元に戻せません。')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/members/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'メンバーの削除に失敗しました。');
      }
      toast({
        title: "成功",
        description: "メンバーが正常に削除されました。",
      });
      // 削除後、現在のページを再フェッチして最新の状態を反映
      fetchMembers();
    } catch (error) {
      console.error('Delete error:', error);
      setError(error instanceof Error ? error.message : 'メンバーの削除に失敗しました。');
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : 'メンバーの削除中に不明なエラーが発生しました。',
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
            <Users className="h-6 w-6" />
            <CardTitle>運営メンバー管理</CardTitle>
          </div>
          <Button asChild>
            <Link href="/admin/members/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              新規追加
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>メールアドレス</TableHead>
                <TableHead className="w-32">ロール</TableHead>
                <TableHead className="w-48">作成日</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.length > 0 ? (
                members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.email}</TableCell>
                    <TableCell>
                      <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(member.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">メニューを開く</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/admin/members/${member.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            編集
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(member.id)} className="text-red-600">
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
                  <TableCell colSpan={4} className="text-center">運営メンバーがいません。</TableCell>
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