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
  Building, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Star,
  Users,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2,
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

interface Organization {
  id: string
  name: string
  category: string | null
  region: string | null
  description: string | null
  website_url: string | null
  contact_email: string | null
  contact_phone: string | null
  logo_url: string | null
  member_count: number
  status: string
  verification_level: string
  created_at: string
  updated_at: string
}

interface SystemMetrics {
  totalOrganizations: number
  activeOrganizations: number
  verifiedOrganizations: number
  totalMembers: number
  pendingApplications: number
  approvedEvents: number
}

export default function OrganizationsManagementPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(() => ({
    totalOrganizations: 0,
    activeOrganizations: 0,
    verifiedOrganizations: 0,
    totalMembers: 0,
    pendingApplications: 0,
    approvedEvents: 0
  }))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterVerification, setFilterVerification] = useState<string>('all')
  const itemsPerPage = 10

  const { requireAdmin, user, userRole, loading: authLoading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  const fetchOrganizations = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        status: filterStatus,
        verification: filterVerification
      })
      
      const response = await fetch(`/api/admin/organizations?${params}`)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '加盟団体の取得に失敗しました。')
      }
      const result = await response.json()
      setOrganizations(result.organizations)
      setTotalPages(Math.ceil(result.totalCount / itemsPerPage))
      
      // Fetch system metrics
      const metricsResponse = await fetch('/api/admin/organizations/metrics')
      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json()
        setSystemMetrics(metricsData.metrics || systemMetrics)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      toast({
        title: "エラー",
        description: err instanceof Error ? err.message : '加盟団体の読み込み中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [currentPage, itemsPerPage, searchTerm, filterStatus, filterVerification, toast, systemMetrics])

  useEffect(() => {
    requireAdmin()
  }, [requireAdmin])

  useEffect(() => {
    if (user && userRole === 'admin') {
      fetchOrganizations()
    }
  }, [user, userRole, fetchOrganizations])

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
    if (!confirm('本当にこの団体を削除しますか？この操作は元に戻せません。')) {
      return
    }
    try {
      const response = await fetch(`/api/admin/organizations/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '団体の削除に失敗しました。');
      }
      toast({
        title: "成功",
        description: "団体が正常に削除されました。",
      });
      // 削除後、現在のページを再フェッチして最新の状態を反映
      fetchOrganizations();
    } catch (error) {
      console.error('Delete error:', error);
      setError(error instanceof Error ? error.message : '団体の削除に失敗しました。');
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : '団体の削除中に不明なエラーが発生しました。',
        variant: 'destructive',
      });
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-400/20 text-green-400 border-green-400/30'
      case 'inactive': return 'bg-gray-400/20 text-gray-400 border-gray-400/30'
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'
      case 'suspended': return 'bg-red-400/20 text-red-400 border-red-400/30'
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30'
    }
  }

  const getVerificationColor = (level: string) => {
    switch (level) {
      case 'premium': return 'bg-purple-400/20 text-purple-400 border-purple-400/30'
      case 'verified': return 'bg-blue-400/20 text-blue-400 border-blue-400/30'
      case 'basic': return 'bg-gray-400/20 text-gray-400 border-gray-400/30'
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30'
    }
  }

  if (loading) {
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
    return <div className="p-8 text-red-500">エラー: {error}</div>
  }

  return (
    <div className="p-4 md:p-8">
      <Card className="max-w-screen-lg mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <Building className="h-6 w-6 text-gray-700" />
            <CardTitle>加盟団体管理</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/organizations/dashboard">
                <Database className="mr-2 h-4 w-4" />ダッシュボード
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/organizations/create">
                <PlusCircle className="mr-2 h-4 w-4" />新規追加
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">総数</div><div className="text-2xl font-semibold">{systemMetrics.totalOrganizations}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">アクティブ</div><div className="text-2xl font-semibold">{systemMetrics.activeOrganizations}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">認証済</div><div className="text-2xl font-semibold">{systemMetrics.verifiedOrganizations}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">メンバー総数</div><div className="text-2xl font-semibold">{systemMetrics.totalMembers}</div></CardContent></Card>
            <Card><CardContent className="p-4"><div className="text-xs text-gray-500">承認済イベント</div><div className="text-2xl font-semibold">{systemMetrics.approvedEvents}</div></CardContent></Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="団体を検索…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="border rounded-md px-3 py-2">
              <option value="all">全ステータス</option>
              <option value="active">アクティブ</option>
              <option value="inactive">非アクティブ</option>
              <option value="pending">審査中</option>
              <option value="suspended">停止</option>
            </select>
            <select value={filterVerification} onChange={(e) => setFilterVerification(e.target.value)} className="border rounded-md px-3 py-2">
              <option value="all">全認証レベル</option>
              <option value="basic">Basic</option>
              <option value="verified">Verified</option>
              <option value="premium">Premium</option>
            </select>
            <Button onClick={() => fetchOrganizations()} variant="outline">
              <Filter className="mr-2 h-4 w-4" />絞り込み
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>団体</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>地域</TableHead>
                <TableHead>メンバー数</TableHead>
                <TableHead>状態</TableHead>
                <TableHead>認証</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.length > 0 ? organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100">
                        {org.logo_url ? (
                          <Image src={org.logo_url} alt={org.name} width={40} height={40} className="object-cover" />
                        ) : (
                          <Image src={`/placeholder.svg?height=40&width=40&text=${encodeURIComponent(org.name)}`} alt={org.name} width={40} height={40} className="object-cover opacity-70" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{org.name}</div>
                        <div className="text-xs text-gray-500">{org.contact_email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{org.category || '-'}</TableCell>
                  <TableCell>{org.region || '-'}</TableCell>
                  <TableCell>{org.member_count}</TableCell>
                  <TableCell>
                    <Badge variant={org.status === 'active' ? 'default' : 'secondary'}>{org.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{org.verification_level}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">メニューを開く</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => router.push(`/admin/organizations/${org.id}/edit`)}>
                          <Edit className="mr-2 h-4 w-4" />編集
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/admin/organizations/${org.id}/content`)}>
                          <FileText className="mr-2 h-4 w-4" />コンテンツ
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/admin/organizations/${org.id}`)}>
                          <Eye className="mr-2 h-4 w-4" />詳細
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(org.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />削除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-gray-500">加盟団体がありません。</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="mt-6">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}