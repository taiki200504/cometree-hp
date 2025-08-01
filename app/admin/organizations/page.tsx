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

  const { requireAdmin, user, userRole } = useAdminAuthSimple()
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
    if (user && userRole === 'admin') {
      fetchOrganizations()
    }
  }, [user, userRole, fetchOrganizations])

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
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
          <div className="text-lg">LOADING ORGANIZATIONS...</div>
          <div className="text-sm opacity-75 mt-2">Initializing organization management system</div>
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
                  <Building className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    ORGANIZATION MANAGEMENT
                  </h1>
                  <div className="text-xs opacity-75">MANAGE ORGANIZATIONS AND MEMBERS</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30">
                <Link href="/admin/organizations/dashboard">
                  <Database className="mr-2 h-4 w-4" />
                  DASHBOARD
                </Link>
              </Button>
              <Button asChild className="bg-blue-400/20 text-blue-400 border-blue-400/30 hover:bg-blue-400/30">
                <Link href="/admin/organizations/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  ADD ORGANIZATION
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">TOTAL ORGANIZATIONS</p>
                  <p className="text-2xl font-bold text-green-400">{systemMetrics.totalOrganizations}</p>
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
                  <p className="text-2xl font-bold text-blue-400">{systemMetrics.activeOrganizations}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">VERIFIED</p>
                  <p className="text-2xl font-bold text-purple-400">{systemMetrics.verifiedOrganizations}</p>
                </div>
                <Star className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">TOTAL MEMBERS</p>
                  <p className="text-2xl font-bold text-orange-400">{systemMetrics.totalMembers}</p>
                </div>
                <Users className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">PENDING APPLICATIONS</p>
                  <p className="text-2xl font-bold text-yellow-400">{systemMetrics.pendingApplications}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-black/50 border-green-400/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-75">APPROVED EVENTS</p>
                  <p className="text-2xl font-bold text-red-400">{systemMetrics.approvedEvents}</p>
                </div>
                <Calendar className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="bg-black/50 border-green-400/30 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                <Input
                  placeholder="Search organizations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black/30 border-green-400/30 text-green-400 placeholder-green-400/50"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-black/30 border border-green-400/30 text-green-400 rounded-md px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              
              <select
                value={filterVerification}
                onChange={(e) => setFilterVerification(e.target.value)}
                className="bg-black/30 border border-green-400/30 text-green-400 rounded-md px-3 py-2"
              >
                <option value="all">All Verification</option>
                <option value="basic">Basic</option>
                <option value="verified">Verified</option>
                <option value="premium">Premium</option>
              </select>
              
              <Button 
                onClick={() => fetchOrganizations()}
                className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30"
              >
                <Filter className="mr-2 h-4 w-4" />
                APPLY FILTERS
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Organizations Table */}
        <Card className="bg-black/50 border-green-400/30">
          <CardHeader>
            <CardTitle className="text-green-400">ORGANIZATIONS LIST</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-green-400/30">
                    <TableHead className="text-green-400">ORGANIZATION</TableHead>
                    <TableHead className="text-green-400">CATEGORY</TableHead>
                    <TableHead className="text-green-400">REGION</TableHead>
                    <TableHead className="text-green-400">MEMBERS</TableHead>
                    <TableHead className="text-green-400">STATUS</TableHead>
                    <TableHead className="text-green-400">VERIFICATION</TableHead>
                    <TableHead className="text-green-400">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizations.length > 0 ? (
                    organizations.map((org) => (
                      <TableRow key={org.id} className="border-green-400/20 hover:bg-green-400/5">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                              {org.logo_url ? (
                                <Image
                                  src={org.logo_url}
                                  alt={org.name}
                                  width={40}
                                  height={40}
                                  className="rounded-lg"
                                />
                              ) : (
                                <Building className="h-5 w-5 text-black" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-green-400">{org.name}</div>
                              <div className="text-sm opacity-75">{org.contact_email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-green-400">{org.category || '-'}</TableCell>
                        <TableCell className="text-green-400">{org.region || '-'}</TableCell>
                        <TableCell className="text-green-400">{org.member_count}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(org.status)}>
                            {org.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getVerificationColor(org.verification_level)}>
                            {org.verification_level}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0 text-green-400 hover:bg-green-400/20">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-black/90 border-green-400/30">
                              <DropdownMenuItem 
                                onClick={() => router.push(`/admin/organizations/${org.id}/edit`)}
                                className="text-green-400 hover:bg-green-400/20"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => router.push(`/admin/organizations/${org.id}`)}
                                className="text-blue-400 hover:bg-blue-400/20"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(org.id)} 
                                className="text-red-400 hover:bg-red-400/20"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="border-green-400/20">
                      <TableCell colSpan={7} className="text-center text-green-400">
                        No organizations found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}