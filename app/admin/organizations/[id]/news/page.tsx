"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react'

interface OrganizationNews {
  id: string
  title: string
  content: string
  category: string
  status: 'draft' | 'published' | 'archived'
  organization_id: string
  created_at: string
  updated_at: string
  view_count: number
}

interface Organization {
  id: string
  name: string
  description: string
}

export default function OrganizationNewsPage({ params }: { params: { id: string } }) {
  const [news, setNews] = useState<OrganizationNews[]>([])
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<OrganizationNews | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    status: 'draft'
  })

  const { requireAuth, loading: authLoading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  const fetchOrganization = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/organizations/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setOrganization(data)
      }
    } catch (error) {
      console.error('Error fetching organization:', error)
    }
  }, [params.id])

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/organizations/${params.id}/news`)
      if (response.ok) {
        const data = await response.json()
        setNews(data)
      }
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (isAuthenticated) {
      fetchOrganization()
      fetchNews()
    }
  }, [requireAuth, fetchOrganization, fetchNews])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingNews 
        ? `/api/admin/organizations/${params.id}/news/${editingNews.id}`
        : `/api/admin/organizations/${params.id}/news`
      
      const method = editingNews ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: editingNews ? "ニュース更新完了" : "ニュース作成完了",
          description: editingNews ? "ニュースを正常に更新しました。" : "ニュースを正常に作成しました。",
        })
        setIsDialogOpen(false)
        setEditingNews(null)
        setFormData({ title: '', content: '', category: 'general', status: 'draft' })
        fetchNews()
      } else {
        throw new Error('Failed to save news')
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: "ニュースの保存中にエラーが発生しました。",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('このニュースを削除しますか？この操作は元に戻せません。')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/organizations/${params.id}/news/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "削除完了",
          description: "ニュースを正常に削除しました。",
        })
        fetchNews()
      } else {
        throw new Error('Failed to delete news')
      }
    } catch (error) {
      toast({
        title: "削除エラー",
        description: "ニュースの削除中にエラーが発生しました。",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (news: OrganizationNews) => {
    setEditingNews(news)
    setFormData({
      title: news.title,
      content: news.content,
      category: news.category,
      status: news.status
    })
    setIsDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingNews(null)
    setFormData({ title: '', content: '', category: 'general', status: 'draft' })
    setIsDialogOpen(true)
  }

  if (authLoading) {
    return <div>Loading...</div>
  }

  if (!organization) {
    return <div>Organization not found</div>
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {organization.name} - ニュース管理
        </h1>
        <p className="text-gray-600">
          加盟団体専用のニュースを管理します
        </p>
      </div>

      <div className="mb-6">
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          ニュース作成
        </Button>
      </div>

      <div className="grid gap-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                      {item.status === 'published' ? '公開' : item.status === 'draft' ? '下書き' : 'アーカイブ'}
                    </Badge>
                    <Badge variant="outline">{item.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="h-4 w-4" />
                      {item.view_count}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">{item.content}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(item.created_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {organization.name}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingNews ? 'ニュース編集' : 'ニュース作成'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">タイトル</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="ニュースのタイトルを入力"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">内容</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="ニュースの内容を入力"
                rows={6}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">カテゴリ</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">一般</SelectItem>
                    <SelectItem value="important">重要</SelectItem>
                    <SelectItem value="event">イベント</SelectItem>
                    <SelectItem value="update">更新</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ステータス</label>
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
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                キャンセル
              </Button>
              <Button type="submit">
                {editingNews ? '更新' : '作成'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 