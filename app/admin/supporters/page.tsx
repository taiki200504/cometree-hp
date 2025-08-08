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
  Heart, 
  Edit, 
  Trash2, 
  Search,
  Building2,
  Award,
  Users,
  Eye,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Database,
  Server,
  Network,
  Zap,
  Globe,
  ExternalLink,
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { Pagination } from '@/components/ui/pagination'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

interface Supporter {
  id: string
  name: string
  type: string
  logo_url?: string
  description: string
  support_type: 'financial' | 'media' | 'collaboration' | 'individual'
  amount: string
  since: string
  website_url?: string
  contact_email?: string
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

interface SystemMetrics {
  totalSupporters: number
  activeSupporters: number
  financialSupporters: number
  mediaSupporters: number
  collaborationSupporters: number
  individualSupporters: number
}

export default function SupportersManagementPage() {
  const [supporters, setSupporters] = useState<Supporter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSupportType, setFilterSupportType] = useState<'all' | 'financial' | 'media' | 'collaboration' | 'individual'>('all')
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(() => ({
    totalSupporters: 0,
    activeSupporters: 0,
    financialSupporters: 0,
    mediaSupporters: 0,
    collaborationSupporters: 0,
    individualSupporters: 0
  }))
  const itemsPerPage = 10

  const { requireAdmin, user, userRole, loading: authLoading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  const fetchSupporters = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        support_type: filterSupportType
      })
      
      const response = await fetch(`/api/admin/supporters?${params}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '支援者の取得に失敗しました。')
      }
      const result = await response.json()
      setSupporters(result.supporters || [])
      setTotalPages(Math.ceil((result.totalCount || 0) / itemsPerPage))
      
      // Update system metrics
      if (result.metrics) {
        setSystemMetrics(result.metrics)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。')
      toast({
        title: "システムエラー",
        description: err instanceof Error ? err.message : '支援者の読み込み中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, searchTerm, filterSupportType, toast])

  useEffect(() => {
    requireAdmin()
  }, [requireAdmin])

  useEffect(() => {
    if (user && userRole === 'admin') {
      fetchSupporters()
    }
  }, [user, userRole, fetchSupporters])

  // 認証チェック
  if (authLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>読み込み中...</span>
        </div>
      </div>
    )
  }

  if (!user || userRole !== 'admin') {
    return null
  }

  const handleDelete = async (id: string) => {
    if (!confirm('この支援者を削除しますか？この操作は元に戻せません。')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/supporters/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '支援者の削除に失敗しました。')
      }
      toast({
        title: "削除完了",
        description: "支援者が正常に削除されました。",
      })
      fetchSupporters()
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: "削除エラー",
        description: error instanceof Error ? error.message : '支援者の削除中に不明なエラーが発生しました。',
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

  const handleFilterChange = (supportType: 'all' | 'financial' | 'media' | 'collaboration' | 'individual') => {
    setFilterSupportType(supportType)
    setCurrentPage(1)
  }

  const getSupportTypeColor = (supportType: string) => {
    switch (supportType) {
      case 'financial': return 'bg-blue-400/20 text-blue-400 border-blue-400/30'
      case 'media': return 'bg-purple-400/20 text-purple-400 border-purple-400/30'
      case 'collaboration': return 'bg-green-400/20 text-green-400 border-green-400/30'
      case 'individual': return 'bg-pink-400/20 text-pink-400 border-pink-400/30'
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30'
    }
  }

  const getSupportTypeLabel = (supportType: string) => {
    switch (supportType) {
      case 'financial': return '資金支援'
      case 'media': return 'メディア支援'
      case 'collaboration': return '協力・連携'
      case 'individual': return '個人支援'
      default: return 'その他'
    }
  }

  const getSupportTypeIcon = (supportType: string) => {
    switch (supportType) {
      case 'financial': return <DollarSign className="h-4 w-4" />
      case 'media': return <Award className="h-4 w-4" />
      case 'collaboration': return <Users className="h-4 w-4" />
      case 'individual': return <Heart className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  if (loading && supporters.length === 0) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>読み込み中...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-red-500">エラー: {error}</div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-screen-lg mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-gray-700" />
            <CardTitle>支援者管理</CardTitle>
          </div>
          <Button asChild>
            <Link href="/admin/supporters/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              新規追加
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="支援者を検索…"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filterSupportType === 'all' ? 'default' : 'outline'} onClick={() => handleFilterChange('all')}>すべて</Button>
              <Button variant={filterSupportType === 'financial' ? 'default' : 'outline'} onClick={() => handleFilterChange('financial')}>資金</Button>
              <Button variant={filterSupportType === 'media' ? 'default' : 'outline'} onClick={() => handleFilterChange('media')}>メディア</Button>
              <Button variant={filterSupportType === 'collaboration' ? 'default' : 'outline'} onClick={() => handleFilterChange('collaboration')}>連携</Button>
              <Button variant={filterSupportType === 'individual' ? 'default' : 'outline'} onClick={() => handleFilterChange('individual')}>個人</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">総数</div><div className="text-2xl font-semibold">{systemMetrics.totalSupporters}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">アクティブ</div><div className="text-2xl font-semibold">{systemMetrics.activeSupporters}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">資金</div><div className="text-2xl font-semibold">{systemMetrics.financialSupporters}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">メディア</div><div className="text-2xl font-semibold">{systemMetrics.mediaSupporters}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">連携</div><div className="text-2xl font-semibold">{systemMetrics.collaborationSupporters}</div></CardContent></Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>支援者</TableHead>
                <TableHead>区分</TableHead>
                <TableHead>支援タイプ</TableHead>
                <TableHead>金額等</TableHead>
                <TableHead>状態</TableHead>
                <TableHead className="w-20" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {supporters.length > 0 ? supporters.map((supporter) => (
                <TableRow key={supporter.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100">
                        {supporter.logo_url ? (
                          <Image src={supporter.logo_url} alt={supporter.name} fill className="object-cover" />
                        ) : (
                          <Image src={`/placeholder.svg?height=40&width=40&text=${encodeURIComponent(supporter.name)}`} alt={supporter.name} fill className="object-cover opacity-70" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{supporter.name}</div>
                        <div className="text-xs text-gray-500 line-clamp-1">{supporter.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{supporter.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getSupportTypeIcon(supporter.support_type)}
                      <Badge variant="outline">{getSupportTypeLabel(supporter.support_type)}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{supporter.amount}</TableCell>
                  <TableCell>
                    <Badge variant={supporter.is_active ? 'default' : 'secondary'}>
                      {supporter.is_active ? 'アクティブ' : '非アクティブ'}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => router.push(`/admin/supporters/${supporter.id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />編集
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/admin/supporters/${supporter.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />表示
                        </DropdownMenuItem>
                        {supporter.website_url && (
                          <DropdownMenuItem onClick={() => window.open(supporter.website_url!, '_blank')}>
                            <ExternalLink className="mr-2 h-4 w-4" />公式サイト
                          </DropdownMenuItem>
                        )}
                        {supporter.contact_email && (
                          <DropdownMenuItem onClick={() => window.open(`mailto:${supporter.contact_email}`)}>
                            <Mail className="mr-2 h-4 w-4" />メール
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleDelete(supporter.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />削除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">支援者がありません。</TableCell>
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
  )
} 