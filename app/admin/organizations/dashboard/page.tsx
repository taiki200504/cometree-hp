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
      const orgResponse = await fetch('/api/admin/organizations?limit=5')
      if (!orgResponse.ok) {
        throw new Error('加盟団体データの取得に失敗しました。')
      }
      const orgData = await orgResponse.json()
      setOrganizations(orgData.organizations || [])
      
      // Fetch recent events
      const eventsResponse = await fetch('/api/admin/organization-events?limit=5')
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json()
        setRecentEvents(eventsData.events || [])
      }
      
      // Fetch recent reports
      const reportsResponse = await fetch('/api/admin/organization-reports?limit=5')
      if (reportsResponse.ok) {
        const reportsData = await reportsResponse.json()
        setRecentReports(reportsData.reports || [])
      }
      
      // Fetch recent applications
      const applicationsResponse = await fetch('/api/admin/organization-applications?limit=5')
      if (applicationsResponse.ok) {
        const applicationsData = await applicationsResponse.json()
        setRecentApplications(applicationsData.applications || [])
      }
      
      // Fetch system metrics
      const metricsResponse = await fetch('/api/admin/organizations/metrics')
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
  }, [toast])

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
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="text-lg">LOADING ORGANIZATION DASHBOARD...</div>
            <div className="text-sm opacity-75 mt-2">Initializing organization management system</div>
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
                  <Building className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    ORGANIZATION DASHBOARD
                  </h1>
                  <div className="text-xs opacity-75">ORGANIZATION MANAGEMENT CENTER</div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button asChild className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30">
                <Link href="/admin/organizations">
                  <Building className="mr-2 h-4 w-4" />
                  MANAGE ORGANIZATIONS
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

        {/* Recent Organizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-black/50 border-green-400/30">
            <CardHeader>
              <CardTitle className="text-green-400">RECENT ORGANIZATIONS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-green-400/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                        <Building className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <div className="font-medium text-green-400">{org.name}</div>
                        <div className="text-sm opacity-75">{org.category || 'No category'}</div>
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
                <Button asChild className="w-full bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30">
                  <Link href="/admin/organizations">
                    VIEW ALL ORGANIZATIONS
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Events */}
          <Card className="bg-black/50 border-green-400/30">
            <CardHeader>
              <CardTitle className="text-green-400">RECENT EVENTS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-green-400/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                        {getEventTypeIcon(event.event_type)}
                      </div>
                      <div>
                        <div className="font-medium text-green-400">{event.title}</div>
                        <div className="text-sm opacity-75">{event.event_type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <div className="text-xs opacity-75">
                        {event.current_participants}/{event.max_participants}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full bg-blue-400/20 text-blue-400 border-blue-400/30 hover:bg-blue-400/30">
                  <Link href="/admin/organization-events">
                    VIEW ALL EVENTS
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-black/50 border-green-400/30">
            <CardHeader>
              <CardTitle className="text-green-400">RECENT APPLICATIONS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-green-400/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                        {getApplicationTypeIcon(app.application_type)}
                      </div>
                      <div>
                        <div className="font-medium text-green-400">{app.title}</div>
                        <div className="text-sm opacity-75">{app.application_type}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(app.status)}>
                        {app.status}
                      </Badge>
                      <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                        {app.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button asChild className="w-full bg-purple-400/20 text-purple-400 border-purple-400/30 hover:bg-purple-400/30">
                  <Link href="/admin/organization-applications">
                    VIEW ALL APPLICATIONS
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border-green-400/30">
            <CardHeader>
              <CardTitle className="text-green-400">RECENT REPORTS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg border border-green-400/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-black" />
                      </div>
                      <div>
                        <div className="font-medium text-green-400">{report.title}</div>
                        <div className="text-sm opacity-75">{report.report_type}</div>
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
                <Button asChild className="w-full bg-orange-400/20 text-orange-400 border-orange-400/30 hover:bg-orange-400/30">
                  <Link href="/admin/organization-reports">
                    VIEW ALL REPORTS
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 