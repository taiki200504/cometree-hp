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
  Users, 
  Edit, 
  Trash2, 
  Search,
  Crown,
  Award,
  User,
  Building,
  MessageSquare,
  Image as ImageIcon,
  Eye,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Database,
  Server,
  Network,
  Zap
} from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { Pagination } from '@/components/ui/pagination'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

interface Member {
  id: string
  name: string
  email: string
  role: string
  position: string
  university: string
  profile: string
  image_url?: string
  is_representative: boolean
  representative_message?: string
  category: 'core' | 'advisor' | 'staff'
  tags: string[]
  created_at: string
  updated_at: string
}

interface SystemMetrics {
  totalMembers: number
  coreMembers: number
  advisors: number
  staffMembers: number
  representatives: number
}

export default function MembersManagementPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState<'all' | 'core' | 'advisor' | 'staff'>('all')
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(() => ({
    totalMembers: 0,
    coreMembers: 0,
    advisors: 0,
    staffMembers: 0,
    representatives: 0
  }))
  const itemsPerPage = 10

  const { requireAuth, user, userRole, loading: authLoading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/admin/members')
      if (!response.ok) {
        throw new Error('Failed to fetch members')
      }
      
      const data = await response.json()
      const membersArray = Array.isArray(data) ? data : (data.members || [])
      setMembers(membersArray)
      
      // システムメトリクスを計算
      const metrics = {
        totalMembers: membersArray.length,
        coreMembers: membersArray.filter((m: Member) => m.category === 'core').length,
        advisors: membersArray.filter((m: Member) => m.category === 'advisor').length,
        staffMembers: membersArray.filter((m: Member) => m.category === 'staff').length,
        representatives: membersArray.filter((m: Member) => m.is_representative).length
      }
      setSystemMetrics(metrics)
      
      const total = typeof data?.totalCount === 'number' ? data.totalCount : membersArray.length
      setTotalPages(Math.ceil(total / itemsPerPage))
    } catch (error) {
      console.error('Error fetching members:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch members')
      toast({
        title: "エラー",
        description: "メンバー情報の取得に失敗しました",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [toast])

  // 認証チェックとデータ取得
  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (isAuthenticated) {
      fetchMembers()
    }
  }, [requireAuth, fetchMembers])

  const handleDelete = async (id: string) => {
    if (!confirm('このメンバーを削除しますか？この操作は元に戻せません。')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/members/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "削除完了",
          description: "メンバーを正常に削除しました",
        })
        fetchMembers() // リストを更新
      } else {
        throw new Error('Failed to delete member')
      }
    } catch (error) {
      console.error('Error deleting member:', error)
      toast({
        title: "削除エラー",
        description: "メンバーの削除中にエラーが発生しました",
        variant: "destructive"
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

  const handleFilterChange = (category: 'all' | 'core' | 'advisor' | 'staff') => {
    setFilterCategory(category)
    setCurrentPage(1)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'bg-blue-100 text-blue-800'
      case 'advisor': return 'bg-purple-100 text-purple-800'
      case 'staff': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'core': return 'コアメンバー'
      case 'advisor': return 'アドバイザー'
      case 'staff': return 'スタッフ'
      default: return 'その他'
    }
  }

  // ローディング中の表示
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

  // フィルタリングとページネーション
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.university.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || member.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">メンバー管理</h1>
              <p className="text-gray-600">運営メンバーの管理と編集</p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/admin/members/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                メンバー追加
              </Link>
            </Button>
          </div>
        </div>

        {/* システムメトリクス */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">総メンバー数</p>
                  <p className="text-2xl font-bold text-blue-600">{systemMetrics.totalMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Crown className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">コアメンバー</p>
                  <p className="text-2xl font-bold text-purple-600">{systemMetrics.coreMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">アドバイザー</p>
                  <p className="text-2xl font-bold text-green-600">{systemMetrics.advisors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <User className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">スタッフ</p>
                  <p className="text-2xl font-bold text-orange-600">{systemMetrics.staffMembers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">代表者</p>
                  <p className="text-2xl font-bold text-red-600">{systemMetrics.representatives}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 検索とフィルター */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="メンバーを検索..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterCategory === 'all' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('all')}
            >
              すべて
            </Button>
            <Button
              variant={filterCategory === 'core' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('core')}
            >
              コアメンバー
            </Button>
            <Button
              variant={filterCategory === 'advisor' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('advisor')}
            >
              アドバイザー
            </Button>
            <Button
              variant={filterCategory === 'staff' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('staff')}
            >
              スタッフ
            </Button>
          </div>
        </div>

        {/* メンバーリスト */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>メンバー一覧</span>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <p className="text-red-600">{error}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>メンバー</TableHead>
                      <TableHead>役職</TableHead>
                      <TableHead>大学</TableHead>
                      <TableHead>カテゴリ</TableHead>
                      <TableHead>代表者</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              {member.image_url ? (
                                <Image
                                  src={member.image_url}
                                  alt={member.name}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              ) : (
                                <User className="h-5 w-5 text-gray-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-500">{member.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{member.position}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </TableCell>
                        <TableCell>{member.university}</TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(member.category)}>
                            {getCategoryLabel(member.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {member.is_representative ? (
                            <Badge className="bg-red-100 text-red-800">
                              代表者
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/members/${member.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  編集
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(member.id)}
                                className="text-red-600"
                              >
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
              </div>
            )}
          </CardContent>
        </Card>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}