"use client"

import { useState, useEffect } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Upload,
  Calendar,
  Loader2
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ImageUpload } from '@/components/ui/image-upload'
import { PreviewModal } from '@/components/ui/preview-modal'
import { useToast } from '@/hooks/use-toast'

interface NewsData {
  id: string
  title: string
  content: string
  excerpt?: string
  status: string
  category: string
  featured_image?: string
  tags: string[]
  author: string
}

export default function EditNews({ params }: { params: { id: string } }) {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState<NewsData>({
    id: '',
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',
    category: 'general',
    featured_image: '',
    tags: [],
    author: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPreview, setShowPreview] = useState(false)

  // ニュースデータを取得
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/admin/news/${params.id}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'ニュースの取得に失敗しました')
        }

        setFormData({
          ...result.data,
          tags: result.data.tags || []
        })
      } catch (error) {
        console.error('Error fetching news:', error)
        toast({
          title: "エラー",
          description: error instanceof Error ? error.message : 'ニュースの取得に失敗しました',
          variant: "destructive"
        })
        router.push('/admin/news')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchNews()
    }
  }, [params.id, router, toast])

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    requireAuth()
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // バリデーション
      if (!formData.title.trim() || !formData.content.trim()) {
        toast({
          title: "エラー",
          description: "タイトルと本文は必須です",
          variant: "destructive"
        })
        return
      }

      const response = await fetch(`/api/admin/news/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: Array.isArray(formData.tags) ? formData.tags : []
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '更新に失敗しました')
      }

      toast({
        title: "成功",
        description: "ニュースが正常に更新されました",
      })

      router.push('/admin/news')
    } catch (error) {
      console.error('Error updating news:', error)
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : '更新中にエラーが発生しました',
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/news">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ニュース一覧
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">ニュース編集</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={handlePreview}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                プレビュー
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSubmitting ? '更新中...' : '更新'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>
                ニュースの基本情報を編集してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">タイトル *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="ニュースのタイトルを入力"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">要約</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt || ''}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="ニュースの要約を入力（任意）"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">本文 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="ニュースの本文を入力"
                  rows={10}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">カテゴリー</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="カテゴリーを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">一般</SelectItem>
                      <SelectItem value="event">イベント</SelectItem>
                      <SelectItem value="announcement">お知らせ</SelectItem>
                      <SelectItem value="press">プレスリリース</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ステータスを選択" />
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
                <Label htmlFor="tags">タグ</Label>
                <Input
                  id="tags"
                  value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                  onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                  placeholder="タグをカンマ区切りで入力（例: イベント, お知らせ, 重要）"
                />
              </div>
            </CardContent>
          </Card>

          {/* 画像設定 */}
          <Card>
            <CardHeader>
              <CardTitle>画像設定</CardTitle>
              <CardDescription>
                ニュースのアイキャッチ画像を設定してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.featured_image || ''}
                onChange={(url) => handleInputChange('featured_image', url)}
                label="アイキャッチ画像"
                placeholder="画像をドラッグ&ドロップまたはクリックして選択"
              />
            </CardContent>
          </Card>
        </form>
      </main>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        data={{
          ...formData,
          type: 'news',
          date: new Date().toISOString(),
          author: user.email
        }}
      />
    </div>
  )
} 