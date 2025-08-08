"use client"

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Building, 
  Users, 
  Calendar, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  Trash2,
  Loader2,
  Database,
  Server,
  Network,
  Zap,
  Globe,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Star,
  Award
} from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

interface Organization {
  id: string
  name: string
  category: string | null
  region: string | null
  description: string | null
  website_url: string | null
  contact_email: string | null
  contact_phone: string | null
  member_count: number
  status: string
  verification_level: string
  created_at: string
}

interface OrganizationEvent {
  id: string
  title: string
  event_type: string
  start_date: string
  status: string
  max_participants: number
  current_participants: number
}

interface OrganizationReport {
  id: string
  title: string
  report_type: string
  status: string
  submitted_at: string | null
}

interface OrganizationApplication {
  id: string
  title: string
  application_type: string
  status: string
  priority: string
  requested_amount: number | null
  submitted_at: string
}

interface SystemMetrics {
  totalOrganizations: number
  activeOrganizations: number
  pendingApplications: number
  approvedEvents: number
  totalMembers: number
  verifiedOrganizations: number
}

export default function OrganizationDashboardPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [recentEvents, setRecentEvents] = useState<OrganizationEvent[]>([])
  const [recentReports, setRecentReports] = useState<OrganizationReport[]>([])
  const [recentApplications, setRecentApplications] = useState<OrganizationApplication[]>([])
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>(() => ({
    totalOrganizations: 0,
    activeOrganizations: 0,
    pendingApplications: 0,
    approvedEvents: 0,
    totalMembers: 0,
    verifiedOrganizations: 0
  }))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { requireAdmin, user, userRole } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      
      // Fetch organizations
      const orgResponse = await fetch('/api/admin/organizations?limit=5', { cache: 'no-store' })
      if (!orgResponse.ok) {
        throw new Error('加盟団体データの取得に失敗しました。')
      }
      const orgData = await orgResponse.json()
      setOrganizations(orgData.organizations || [])
      
      // Fetch recent events
      const eventsResponse = await fetch('/api/admin/organizations/events?limit=5', { cache: 'no-store' })
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json()
        setRecentEvents(eventsData.events || [])
      }

      // Fetch recent reports
      const reportsResponse = await fetch('/api/admin/organizations/reports?limit=5', { cache: 'no-store' })
      if (reportsResponse.ok) {
        const reportsData = await reportsResponse.json()
        setRecentReports(reportsData.reports || [])
      }

      // Fetch recent applications
      const applicationsResponse = await fetch('/api/admin/organizations/applications?limit=5', { cache: 'no-store' })
      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json()
        setRecentApplications(applicationsData.applications || [])
      }
      
      // Fetch system metrics
      const metricsResponse = await fetch('/api/admin/organizations/metrics', { cache: 'no-store' })
      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json()
        setSystemMetrics(metricsData.metrics || systemMetrics)
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました。')
      toast({
        title: "システムエラー",
        description: err instanceof Error ? err.message : 'ダッシュボードデータの読み込み中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [toast, systemMetrics])

  useEffect(() => {
    if (user && userRole === 'admin') {
      fetchDashboardData()
    }
  }, [user, userRole, fetchDashboardData])

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

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop': return <Users className="h-4 w-4" />
      case 'seminar': return <FileText className="h-4 w-4" />
      case 'conference': return <Globe className="h-4 w-4" />
      case 'meetup': return <Users className="h-4 w-4" />
      case 'competition': return <Award className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const getApplicationTypeIcon = (type: string) => {
    switch (type) {
      case 'funding': return <TrendingUp className="h-4 w-4" />
      case 'partnership': return <Users className="h-4 w-4" />
      case 'membership': return <Building className="h-4 w-4" />
      case 'event_support': return <Calendar className="h-4 w-4" />
      case 'media_coverage': return <ExternalLink className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-700">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-3 text-gray-400" />
          <div className="text-sm">読み込み中...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-red-500" />
          <div className="text-gray-900 font-medium">エラーが発生しました</div>
          <div className="text-sm text-gray-600 mt-1">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">加盟団体ダッシュボード</h1>
            <p className="text-gray-600 mt-1">加盟団体データと申請・レポートの概況</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href="/admin/organizations/create">
                <Plus className="mr-2 h-4 w-4" /> 新規団体
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/organizations">
                <Building className="mr-2 h-4 w-4" /> 団体一覧
              </Link>
            </Button>
          </div>
        </div>
        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-white border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">総団体数</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.totalOrganizations}</p>
                </div>
                <Database className="h-6 w-6 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">稼働中</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.activeOrganizations}</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">認証済み</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.verifiedOrganizations}</p>
                </div>
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">総メンバー</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.totalMembers}</p>
                </div>
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">承認待ち</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.pendingApplications}</p>
                </div>
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-0 shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">承認済イベント</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.approvedEvents}</p>
                </div>
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Organizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white border-0 shadow">
            <CardHeader>
              <CardTitle className="text-gray-900">最近の加盟団体</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Building className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{org.name}</div>
                        <div className="text-sm text-gray-600">{org.category || '未分類'}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(org.status)}>
                        {org.status}
                      </Badge>
                      <Badge className={getVerificationColor(org.verification_level)}>
                        {org.verification_level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/admin/organizations">すべての加盟団体を見る</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Events */}
          <Card className="bg-white border-0 shadow">
            <CardHeader>
              <CardTitle className="text-gray-900">最近のイベント</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        {getEventTypeIcon(event.event_type)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-600">{event.event_type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <div className="text-xs text-gray-600">
                        {event.current_participants}/{event.max_participants}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/admin/organizations/events">すべてのイベントを見る</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white border-0 shadow">
            <CardHeader>
              <CardTitle className="text-gray-900">最近の申請</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        {getApplicationTypeIcon(app.application_type)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{app.title}</div>
                        <div className="text-sm text-gray-600">{app.application_type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                      <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                        {app.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/admin/organizations/applications">すべての申請を見る</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow">
            <CardHeader>
              <CardTitle className="text-gray-900">最近のレポート</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{report.title}</div>
                        <div className="text-sm text-gray-600">{report.report_type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link href="/admin/organizations/reports">すべてのレポートを見る</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 