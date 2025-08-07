"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MoreHorizontal, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  FileText,
  Calendar,
  Newspaper,
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2,
  ArrowLeft,
  Save,
  X
} from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useToast } from '@/components/ui/use-toast'
import { Pagination } from '@/components/ui/pagination'

interface ContentItem {
  id: string
  title: string
  content: string
  type: 'news' | 'event' | 'document'
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
  organization_id: string
  organizations?: {
    name: string
    category: string
  }
}

interface Organization {
  id: string
  name: string
  category: string
  description: string
}

export default function OrganizationContentPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { requireAdmin, user, userRole, loading: authLoading } = useAdminAuthSimple()

  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'news' as 'news' | 'event' | 'document',
    status: 'draft' as 'draft' | 'published' | 'archived'
  })

  const organizationId = params.id as string

  const fetchOrganization = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/organizations/${organizationId}`)
      if (response.ok) {
        const data = await response.json()
        setOrganization(data.organization)
      }
    } catch (error) {
      console.error('Error fetching organization:', error)
    }
  }, [organizationId])

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        type: filterType !== 'all' ? filterType : '',
        status: filterStatus !== 'all' ? filterStatus : ''
      })
      
      const response = await fetch(`/api/admin/organizations/${organizationId}/content?${params}`)
      if (!response.ok) {
        throw new Error('コンテンツの取得に失敗しました')
      }
      
      const data = await response.json()
      setContentItems(data.content)
      setTotalPages(data.totalPages)
    } catch (error) {
      setError(error instanceof Error ? error.message : '不明なエラーが発生しました')
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : 'コンテンツの読み込み中にエラーが発生しました',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }, [organizationId, currentPage, filterType, filterStatus, toast])

  useEffect(() => {
    requireAdmin()
  }, [requireAdmin])

  useEffect(() => {
    if (user && userRole === 'admin') {
      fetchOrganization()
      fetchContent()
    }
  }, [user, userRole, fetchOrganization, fetchContent])

  const handleCreate = async () => {
    try {
      const response = await fetch(`/api/admin/organizations/${organizationId}/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "成功",
          description: "コンテンツが正常に作成されました",
        })
        setShowCreateForm(false)
        setFormData({ title: '', content: '', type: 'news', status: 'draft' })
        fetchContent()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'コンテンツの作成に失敗しました')
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : 'コンテンツの作成中にエラーが発生しました',
        variant: 'destructive',
      })
    }
  }

  const handleUpdate = async (item: ContentItem) => {
    try {
      const response = await fetch(`/api/community/content/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "成功",
          description: "コンテンツが正常に更新されました",
        })
        setEditingItem(null)
        setFormData({ title: '', content: '', type: 'news', status: 'draft' })
        fetchContent()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'コンテンツの更新に失敗しました')
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : 'コンテンツの更新中にエラーが発生しました',
        variant: 'destructive',
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('本当にこのコンテンツを削除しますか？この操作は元に戻せません。')) {
      return
    }

    try {
      const response = await fetch(`/api/community/content/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: "成功",
          description: "コンテンツが正常に削除されました",
        })
        fetchContent()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'コンテンツの削除に失敗しました')
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : 'コンテンツの削除中にエラーが発生しました',
        variant: 'destructive',
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <Newspaper className="h-4 w-4" />
      case 'event':
        return <Calendar className="h-4 w-4" />
      case 'document':
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />公開</Badge>
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />下書き</Badge>
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800"><AlertTriangle className="h-3 w-3 mr-1" />アーカイブ</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

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

  if (!user || userRole !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-green-400/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-green-400 hover:text-green-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                BACK
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center border border-green-400">
                  <FileText className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    CONTENT MANAGEMENT
                  </h1>
                  <div className="text-xs opacity-75">
                    {organization?.name || 'Loading...'}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30"
              >
                <Plus className="mr-2 h-4 w-4" />
                ADD CONTENT
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/50 border-green-400/30 text-green-400 placeholder-green-400/50"
          />
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-black/50 border-green-400/30 text-green-400">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-black border-green-400/30">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="event">Event</SelectItem>
              <SelectItem value="document">Document</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="bg-black/50 border-green-400/30 text-green-400">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-black border-green-400/30">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={fetchContent}
            className="bg-blue-400/20 text-blue-400 border-blue-400/30 hover:bg-blue-400/30"
          >
            <Filter className="mr-2 h-4 w-4" />
            APPLY
          </Button>
        </div>

        {/* Content Table */}
        <Card className="bg-black/50 border-green-400/30">
          <CardHeader>
            <CardTitle className="text-green-400">Content Items</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-green-400" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-green-400/30">
                    <TableHead className="text-green-400">Title</TableHead>
                    <TableHead className="text-green-400">Type</TableHead>
                    <TableHead className="text-green-400">Status</TableHead>
                    <TableHead className="text-green-400">Created</TableHead>
                    <TableHead className="text-green-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentItems.map((item) => (
                    <TableRow key={item.id} className="border-green-400/30">
                      <TableCell className="text-green-400">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(item.type)}
                          <span className="font-medium">{item.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-green-400 capitalize">{item.type}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-green-400">
                        {new Date(item.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4 text-green-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-black border-green-400/30">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingItem(item)
                                setFormData({
                                  title: item.title,
                                  content: item.content,
                                  type: item.type,
                                  status: item.status
                                })
                              }}
                              className="text-green-400 hover:bg-green-400/20"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(item.id)}
                              className="text-red-400 hover:bg-red-400/20"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Create/Edit Form Modal */}
      {(showCreateForm || editingItem) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-black border border-green-400/30 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-green-400">
                {editingItem ? 'Edit Content' : 'Create New Content'}
              </h3>
              <Button
                variant="ghost"
                onClick={() => {
                  setShowCreateForm(false)
                  setEditingItem(null)
                  setFormData({ title: '', content: '', type: 'news', status: 'draft' })
                }}
                className="text-green-400 hover:text-green-300"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-400 mb-2">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-black/50 border-green-400/30 text-green-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-400 mb-2">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="bg-black/50 border-green-400/30 text-green-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">Type</label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as any })}>
                    <SelectTrigger className="bg-black/50 border-green-400/30 text-green-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-green-400/30">
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">Status</label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as any })}>
                    <SelectTrigger className="bg-black/50 border-green-400/30 text-green-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-green-400/30">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false)
                    setEditingItem(null)
                    setFormData({ title: '', content: '', type: 'news', status: 'draft' })
                  }}
                  className="border-green-400/30 text-green-400 hover:bg-green-400/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingItem ? () => handleUpdate(editingItem) : handleCreate}
                  className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {editingItem ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
