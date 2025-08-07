"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ModernHero from '@/components/modern-hero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  FileText, 
  Image, 
  Calendar, 
  Users, 
  Settings,
  Upload,
  Edit,
  Save,
  Trash2,
  Eye,
  Plus,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  content: string
  type: 'news' | 'event' | 'document'
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
  organizationId: string
}

export default function CMSPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'news' as 'news' | 'event' | 'document',
    status: 'draft' as 'draft' | 'published' | 'archived'
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/community/portal/login")
    } else if (user) {
      fetchContentItems()
    }
  }, [user, loading, router])

  const fetchContentItems = async () => {
    try {
      // 実際のAPIからデータを取得
      const response = await fetch(`/api/community/content?organizationId=${user?.id}`)
      if (response.ok) {
        const data = await response.json()
        setContentItems(data)
      }
    } catch (error) {
      console.error('Error fetching content items:', error)
      // モックデータを使用
      setContentItems([
        {
          id: '1',
          title: '活動報告',
          content: '先週の活動内容について報告します。',
          type: 'news',
          status: 'published',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          organizationId: user?.id || ''
        }
      ])
    }
  }

  const handleCreate = async () => {
    try {
      const newItem: ContentItem = {
        id: `item-${Date.now()}`,
        title: formData.title,
        content: formData.content,
        type: formData.type,
        status: formData.status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        organizationId: user?.id || ''
      }

      // 実際のAPIを呼び出してコンテンツを作成
      const response = await fetch('/api/community/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })

      if (response.ok) {
        setContentItems([...contentItems, newItem])
        setShowCreateForm(false)
        setFormData({ title: '', content: '', type: 'news', status: 'draft' })
      }
    } catch (error) {
      console.error('Error creating content:', error)
    }
  }

  const handleUpdate = async (item: ContentItem) => {
    try {
      const updatedItem = { ...item, ...formData, updatedAt: new Date().toISOString() }
      
      // 実際のAPIを呼び出してコンテンツを更新
      const response = await fetch(`/api/community/content/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      })

      if (response.ok) {
        setContentItems(contentItems.map(c => c.id === item.id ? updatedItem : c))
        setEditingItem(null)
        setFormData({ title: '', content: '', type: 'news', status: 'draft' })
      }
    } catch (error) {
      console.error('Error updating content:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      // 実際のAPIを呼び出してコンテンツを削除
      const response = await fetch(`/api/community/content/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setContentItems(contentItems.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error('Error deleting content:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <FileText className="h-4 w-4" />
      case 'event':
        return <Calendar className="h-4 w-4" />
      case 'document':
        return <Image className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#066ff2] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Content Management System"
        title="コンテンツ管理"
        description="団体の活動内容やイベント情報を管理できます。"
        primaryAction={{
          text: "戻る",
          href: "/community/portal",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ヘッダー */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              コンテンツ一覧
            </h2>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              新規作成
            </Button>
          </div>

          {/* コンテンツ一覧 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <Badge className={getStatusColor(item.status)}>
                        {item.status === 'published' ? '公開' : 
                         item.status === 'draft' ? '下書き' : 'アーカイブ'}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingItem(item)
                          setFormData({
                            title: item.title,
                            content: item.content,
                            type: item.type,
                            status: item.status
                          })
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {item.content}
                  </p>
                  <div className="mt-4 text-xs text-gray-500">
                    更新日: {new Date(item.updatedAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 作成・編集フォーム */}
          {(showCreateForm || editingItem) && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
                <h3 className="text-lg font-bold mb-4">
                  {editingItem ? 'コンテンツ編集' : '新規コンテンツ作成'}
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  if (editingItem) {
                    handleUpdate(editingItem)
                  } else {
                    handleCreate()
                  }
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">タイトル</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">種類</label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: 'news' | 'event' | 'document') => 
                          setFormData({...formData, type: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="news">ニュース</SelectItem>
                          <SelectItem value="event">イベント</SelectItem>
                          <SelectItem value="document">資料</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">ステータス</label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: 'draft' | 'published' | 'archived') => 
                          setFormData({...formData, status: value})
                        }
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
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">内容</label>
                      <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        rows={6}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowCreateForm(false)
                        setEditingItem(null)
                        setFormData({ title: '', content: '', type: 'news', status: 'draft' })
                      }}
                      className="flex-1"
                    >
                      キャンセル
                    </Button>
                    <Button type="submit" className="flex-1">
                      {editingItem ? '更新' : '作成'}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
