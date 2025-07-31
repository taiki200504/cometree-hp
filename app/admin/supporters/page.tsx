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

  // 認証チェック
  useEffect(() => {
    if (!authLoading && !requireAdmin()) {
      return
    }
  }, [authLoading, requireAdmin])

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
    if (user && userRole === 'admin') {
      fetchSupporters()
    }
  }, [user, userRole, fetchSupporters])

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
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="text-lg">LOADING SUPPORTERS DATABASE...</div>
            <div className="text-sm opacity-75 mt-2">Initializing supporter management system</div>
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
                  <Heart className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    SUPPORTERS MANAGEMENT
                  </h1>
                  <div className="text-xs opacity-75">SPONSOR OPERATIONS CENTER</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30">
                <Link href="/admin/supporters/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  ADD SUPPORTER
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">TOTAL SUPPORTERS</p>
                  <p className="text-2xl font-bold text-green-400">{systemMetrics.totalSupporters}</p>
                </div>
                <Database className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">ACTIVE</p>
                  <p className="text-2xl font-bold text-blue-400">{systemMetrics.activeSupporters}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">FINANCIAL</p>
                  <p className="text-2xl font-bold text-purple-400">{systemMetrics.financialSupporters}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">MEDIA</p>
                  <p className="text-2xl font-bold text-orange-400">{systemMetrics.mediaSupporters}</p>
                </div>
                <Award className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">COLLABORATION</p>
                  <p className="text-2xl font-bold text-yellow-400">{systemMetrics.collaborationSupporters}</p>
                </div>
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">INDIVIDUAL</p>
                  <p className="text-2xl font-bold text-red-400">{systemMetrics.individualSupporters}</p>
                </div>
                <Heart className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 h-4 w-4" />
            <Input
              placeholder="Search supporters..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filterSupportType === 'all' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('all')}
              className={filterSupportType === 'all' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              ALL
            </Button>
            <Button
              variant={filterSupportType === 'financial' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('financial')}
              className={filterSupportType === 'financial' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              FINANCIAL
            </Button>
            <Button
              variant={filterSupportType === 'media' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('media')}
              className={filterSupportType === 'media' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              MEDIA
            </Button>
            <Button
              variant={filterSupportType === 'collaboration' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('collaboration')}
              className={filterSupportType === 'collaboration' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              COLLABORATION
            </Button>
            <Button
              variant={filterSupportType === 'individual' ? 'default' : 'outline'}
              onClick={() => handleFilterChange('individual')}
              className={filterSupportType === 'individual' ? 'bg-green-400 text-black' : 'border-green-400/30 text-green-400 hover:bg-green-400/10'}
            >
              INDIVIDUAL
            </Button>
          </div>
        </div>

        {/* Supporters Table */}
        <Card className="bg-black/50 border-green-400/30">
          <CardHeader>
            <CardTitle className="text-green-400">SUPPORTERS</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-green-400/30">
                  <TableHead className="text-green-400">SUPPORTER</TableHead>
                  <TableHead className="text-green-400">TYPE</TableHead>
                  <TableHead className="text-green-400">SUPPORT TYPE</TableHead>
                  <TableHead className="text-green-400">AMOUNT</TableHead>
                  <TableHead className="text-green-400">STATUS</TableHead>
                  <TableHead className="text-green-400 w-20"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supporters.length > 0 ? (
                  supporters.map((supporter) => (
                    <TableRow key={supporter.id} className="border-green-400/30 hover:bg-green-400/5">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                            {supporter.logo_url ? (
                              <Image
                                src={supporter.logo_url}
                                alt={supporter.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-green-400">{supporter.name}</div>
                            <div className="text-sm opacity-75">{supporter.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30">
                          {supporter.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getSupportTypeIcon(supporter.support_type)}
                          <Badge className={getSupportTypeColor(supporter.support_type)}>
                            {getSupportTypeLabel(supporter.support_type)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm opacity-75">
                        {supporter.amount}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={supporter.is_active ? 'bg-green-400/20 text-green-400 border-green-400/30' : 'bg-red-400/20 text-red-400 border-red-400/30'}
                        >
                          {supporter.is_active ? 'ACTIVE' : 'INACTIVE'}
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
                              onClick={() => router.push(`/admin/supporters/${supporter.id}/edit`)}
                              className="text-blue-400 hover:bg-blue-400/10"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              EDIT
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => router.push(`/admin/supporters/${supporter.id}`)}
                              className="text-green-400 hover:bg-green-400/10"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              VIEW
                            </DropdownMenuItem>
                            {supporter.website_url && (
                              <DropdownMenuItem 
                                onClick={() => window.open(supporter.website_url, '_blank')}
                                className="text-purple-400 hover:bg-purple-400/10"
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                WEBSITE
                              </DropdownMenuItem>
                            )}
                            {supporter.contact_email && (
                              <DropdownMenuItem 
                                onClick={() => window.open(`mailto:${supporter.contact_email}`)}
                                className="text-orange-400 hover:bg-orange-400/10"
                              >
                                <Mail className="mr-2 h-4 w-4" />
                                EMAIL
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => handleDelete(supporter.id)} 
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
                      No supporters found.
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