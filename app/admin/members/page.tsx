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
import { useToast } from '@/components/ui/use-toast'
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
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalMembers: 0,
    coreMembers: 0,
    advisors: 0,
    staffMembers: 0,
    representatives: 0
  })
  const itemsPerPage = 10

  const { requireAdmin, user, userRole, loading: authLoading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  // 認証チェック
  useEffect(() => {
    if (!authLoading && !requireAdmin()) {
      return
    }
  }, [authLoading, requireAdmin])

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        category: filterCategory
      })
      
      const response = await fetch(`/api/admin/members?${params}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'メンバーの取得に失敗しました。')
      }
      const result = await response.json()
      setMembers(result.members || [])
      setTotalPages(Math.ceil((result.totalCount || 0) / itemsPerPage))
      
      // Update system metrics
      if (result.metrics) {
        setSystemMetrics(result.metrics)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。')
      toast({
        title: "システムエラー",
        description: err instanceof Error ? err.message : 'メンバーの読み込み中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, searchTerm, filterCategory, toast])

  useEffect(() => {
    if (user && userRole === 'admin') {
      fetchMembers()
    }
  }, [user, userRole, fetchMembers])

  const handleDelete = async (id: string) => {
    if (!confirm('このメンバーを削除しますか？この操作は元に戻せません。')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/members/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'メンバーの削除に失敗しました。')
      }
      toast({
        title: "削除完了",
        description: "メンバーが正常に削除されました。",
      })
      fetchMembers()
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: "削除エラー",
        description: error instanceof Error ? error.message : 'メンバーの削除中に不明なエラーが発生しました。',
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

  const handleFilterChange = (category: 'all' | 'core' | 'advisor' | 'staff') => {
    setFilterCategory(category)
    setCurrentPage(1)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'bg-blue-400/20 text-blue-400 border-blue-400/30'
      case 'advisor': return 'bg-purple-400/20 text-purple-400 border-purple-400/30'
      case 'staff': return 'bg-green-400/20 text-green-400 border-green-400/30'
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30'
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

  if (loading && members.length === 0) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="text-lg">LOADING MEMBERS DATABASE...</div>
            <div className="text-sm opacity-75 mt-2">Initializing member management system</div>
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
                  <Users className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    MEMBERS MANAGEMENT
                  </h1>
                  <div className="text-xs opacity-75">TEAM OPERATIONS CENTER</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30">
                <Link href="/admin/members/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  ADD MEMBER
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
                  <p className="text-xs opacity-75">TOTAL MEMBERS</p>
                  <p className="text-2xl font-bold text-green-400">{systemMetrics.totalMembers}</p>
                </div>
                <Database className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">CORE MEMBERS</p>
                  <p className="text-2xl font-bold text-blue-400">{systemMetrics.coreMembers}</p>
                </div>
                <Crown className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">ADVISORS</p>
                  <p className="text-2xl font-bold text-purple-400">{systemMetrics.advisors}</p>
                </div>
                <Award className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">STAFF</p>
                  <p className="text-2xl font-bold text-orange-400">{systemMetrics.staffMembers}</p>
                </div>
                <User className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">REPRESENTATIVES</p>
                  <p className="text-2xl font-bold text-red-400">{systemMetrics.representatives}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-4 w-4" />
            <Input
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterCategory === 'all' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('all')}
              className={filterCategory === 'all' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              ALL
            </Button>
            <Button
              variant={filterCategory === 'core' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('core')}
              className={filterCategory === 'core' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              CORE
            </Button>
            <Button
              variant={filterCategory === 'advisor' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('advisor')}
              className={filterCategory === 'advisor' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              ADVISORS
            </Button>
            <Button
              variant={filterCategory === 'staff' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('staff')}
              className={filterCategory === 'staff' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              STAFF
            </Button>
          </div>
        </div>

        {/* Members Table */}
        <Card className="bg-black/50 border-green-400/30">
          <CardHeader>
            <CardTitle className="text-green-400">TEAM MEMBERS</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-green-400/30">
                  <TableHead className="text-green-400">MEMBER</TableHead>
                  <TableHead className="text-green-400">POSITION</TableHead>
                  <TableHead className="text-green-400">CATEGORY</TableHead>
                  <TableHead className="text-green-400">UNIVERSITY</TableHead>
                  <TableHead className="text-green-400">STATUS</TableHead>
                  <TableHead className="text-green-400 w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.length > 0 ? (
                  members.map((member) => (
                    <TableRow key={member.id} className="border-green-400/30 hover:bg-green-400/5">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            {member.image_url ? (
                              <Image
                                src={member.image_url}
                                alt={member.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                <User className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-green-400">{member.name}</div>
                            <div className="text-sm opacity-75">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-green-400">{member.position}</div>
                          {member.is_representative && (
                            <Badge className="mt-1 bg-red-400/20 text-red-400 border-red-400/30">
                              REPRESENTATIVE
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(member.category)}>
                          {getCategoryLabel(member.category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm opacity-75">
                        {member.university}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={member.role === 'admin' ? 'default' : 'secondary'}
                          className={member.role === 'admin' ? 'bg-green-400/20 text-green-400 border-green-400/30' : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'}
                        >
                          {member.role.toUpperCase()}
                        </Badge>
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
                              onClick={() => router.push(`/admin/members/${member.id}/edit`)}
                              className="text-blue-400 hover:bg-blue-400/10"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              EDIT
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => router.push(`/admin/members/${member.id}`)}
                              className="text-green-400 hover:bg-green-400/10"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              VIEW
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(member.id)} 
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
                    <TableCell colSpan={6} className="text-center text-green-400">
                      No members found.
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