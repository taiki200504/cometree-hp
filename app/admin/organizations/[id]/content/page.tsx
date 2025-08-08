"use client"

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { 
  MoreHorizontal, 
  PlusCircle, 
  FileText, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Filter,
  Calendar,
  User,
  Globe,
  Building,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Pagination } from '@/components/ui/pagination'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

interface ContentItem {
  id: string
  title: string
  content: string
  type: 'news' | 'event' | 'document' | 'announcement'
  status: 'draft' | 'published' | 'archived'
  organization_id: string
  created_at: string
  updated_at: string
  author_name?: string
  featured_image?: string
  tags: string[]
}

interface Organization {
  id: string
  name: string
  description?: string
  logo_url?: string
}

export default function OrganizationContentPage() {
  const params = useParams()
  const router = useRouter()
  const organizationId = params.id as string
  
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'news' | 'event' | 'document' | 'announcement'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'archived'>('all')
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'news' as 'news' | 'event' | 'document' | 'announcement',
    status: 'draft' as 'draft' | 'published' | 'archived',
    featured_image: '',
    tags: [] as string[]
  })
  const itemsPerPage = 10

  const { requireAuth, user, userRole } = useAdminAuthSimple()
  const { toast } = useToast()

  const fetchOrganization = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/organizations/${organizationId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch organization')
      }
      const data = await response.json()
      setOrganization(data)
    } catch (error) {
      console.error('Error fetching organization:', error)
      setError('組織情報の取得に失敗しました')
    }
  }, [organizationId])

  const fetchContentItems = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        type: filterType,
        status: filterStatus
      })
      
      const response = await fetch(`/api/admin/organizations/${organizationId}/content?${params}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch content items')
      }
      
      const result = await response.json()
      setContentItems(result.contentItems || [])
      setTotalPages(Math.ceil((result.totalCount || 0) / itemsPerPage))
    } catch (error) {
      console.error('Error fetching content items:', error)
      setError(error instanceof Error ? error.message : 'コンテンツの読み込みに失敗しました')
      toast({
        title: "エラー",
        description: "コンテンツの取得に失敗しました",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [organizationId, currentPage, itemsPerPage, searchTerm, filterType, filterStatus, toast])

  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (isAuthenticated && user && userRole === 'admin') {
      fetchOrganization()
      fetchContentItems()
    }
  }, [requireAuth, user, userRole, fetchOrganization, fetchContentItems])

  const handleCreateContent = async () => {
    try {
      const response = await fetch(`/api/admin/organizations/${organizationId}/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          organization_id: organizationId,
          author_name: user?.name || '管理者'
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create content')
      }

      toast({
        title: "成功",
        description: "コンテンツを作成しました",
      })
      setShowCreateDialog(false)
      setFormData({
        title: '',
        content: '',
        type: 'news',
        status: 'draft',
        featured_image: '',
        tags: []
      })
      fetchContentItems()
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : 'コンテンツの作成に失敗しました',
        variant: "destructive"
      })
    }
  }

  const handleDeleteContent = async (id: string) => {
    if (!confirm('このコンテンツを削除しますか？この操作は元に戻せません。')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/organizations/${organizationId}/content/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete content')
      }

      toast({
        title: "削除完了",
        description: "コンテンツを正常に削除しました",
      })
      fetchContentItems()
    } catch (error) {
      toast({
        title: "削除エラー",
        description: "コンテンツの削除中にエラーが発生しました",
        variant: "destructive"
      })
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news': return <FileText className="h-4 w-4" />
      case 'event': return <Calendar className="h-4 w-4" />
      case 'document': return <FileText className="h-4 w-4" />
      case 'announcement': return <AlertTriangle className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'news': return 'ニュース'
      case 'event': return 'イベント'
      case 'document': return 'ドキュメント'
      case 'announcement': return 'お知らせ'
      default: return 'その他'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">読み込み中...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              <p className="text-lg font-semibold mb-2">エラーが発生しました</p>
              <p>{error}</p>
              <Button 
                onClick={fetchContentItems} 
                className="mt-4"
                variant="outline"
              >
                再試行
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <Button variant="outline" size="sm" onClick={() => router.push('/admin/organizations')}>
          <Building className="mr-2 h-4 w-4" />
          組織一覧に戻る
        </Button>
      </div>

      {organization && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              {organization.name} - コンテンツ管理
            </CardTitle>
            {organization.description && (
              <p className="text-gray-600">{organization.description}</p>
            )}
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6" />
            <CardTitle>コンテンツ管理</CardTitle>
            <Badge variant="secondary" className="ml-2">
              {contentItems.length}件
            </Badge>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                新規コンテンツ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>新規コンテンツ作成</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">タイトル *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="コンテンツのタイトル"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">タイプ *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="news">ニュース</SelectItem>
                        <SelectItem value="event">イベント</SelectItem>
                        <SelectItem value="document">ドキュメント</SelectItem>
                        <SelectItem value="announcement">お知らせ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">ステータス *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">下書き</SelectItem>
                        <SelectItem value="published">公開</SelectItem>
                        <SelectItem value="archived">アーカイブ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">コンテンツ *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="コンテンツの詳細"
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured_image">画像URL</Label>
                  <Input
                    id="featured_image"
                    type="url"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                  >
                    キャンセル
                  </Button>
                  <Button onClick={handleCreateContent}>
                    作成
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="コンテンツを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={(value) => setFilterType(value as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="news">ニュース</SelectItem>
                  <SelectItem value="event">イベント</SelectItem>
                  <SelectItem value="document">ドキュメント</SelectItem>
                  <SelectItem value="announcement">お知らせ</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="draft">下書き</SelectItem>
                  <SelectItem value="published">公開</SelectItem>
                  <SelectItem value="archived">アーカイブ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {contentItems.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>タイトル</TableHead>
                    <TableHead>タイプ</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>作成者</TableHead>
                    <TableHead className="w-48">作成日</TableHead>
                    <TableHead className="w-20"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium max-w-xs truncate">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <span>{getTypeLabel(item.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status === 'published' ? '公開' : 
                           item.status === 'draft' ? '下書き' : 'アーカイブ'}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.author_name || '管理者'}</TableCell>
                      <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">メニューを開く</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => router.push(`/admin/organizations/${organizationId}/content/${item.id}/edit`)}>
                              <Edit className="mr-2 h-4 w-4" />
                              編集
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteContent(item.id)} className="text-red-600">
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
              
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">まだコンテンツがありません</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                最初のコンテンツを作成
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
