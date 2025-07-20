"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ImageUpload } from '@/components/ui/image-upload'
import { 
  ArrowLeft,
  Save,
  Eye,
  X,
  Plus,
  FileText,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

interface NewsData {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  status: 'published' | 'draft' | 'archived'
  tags: string[]
  featuredImage: string
  seoTitle: string
  seoDescription: string
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export default function EditNews() {
  const router = useRouter()
  const params = useParams()
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newTag, setNewTag] = useState('')
  const [newsData, setNewsData] = useState<NewsData | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'general',
    status: 'draft' as 'published' | 'draft' | 'archived',
    tags: [] as string[],
    featuredImage: '',
    seoTitle: '',
    seoDescription: ''
  })

  useEffect(() => {
    requireAuth()
    if (params.id) {
      fetchNewsData(params.id as string)
    }
  }, [requireAuth, params.id])

  const fetchNewsData = async (id: string) => {
    try {
      // TODO: Supabaseからデータを取得
      // 仮のデータ
      const mockData: NewsData = {
        id,
        title: 'サンプルニュース記事',
        excerpt: 'これはサンプルのニュース記事です。',
        content: '詳細な内容がここに入ります。',
        category: 'general',
        status: 'draft',
        tags: ['サンプル', 'テスト'],
        featuredImage: '',
        seoTitle: 'SEOタイトル',
        seoDescription: 'SEO説明文',
        publishedAt: '',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
      
      setNewsData(mockData)
      setFormData({
        title: mockData.title,
        excerpt: mockData.excerpt,
        content: mockData.content,
        category: mockData.category,
        status: mockData.status,
        tags: mockData.tags,
        featuredImage: mockData.featuredImage,
        seoTitle: mockData.seoTitle,
        seoDescription: mockData.seoDescription
      })
    } catch (error) {
      console.error('Error fetching news:', error)
      alert('ニュースデータの取得に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // バリデーション
      if (!formData.title.trim() || !formData.content.trim()) {
        alert('タイトルと本文は必須です')
        return
      }

      // TODO: Supabaseにデータを更新
      console.log('Updating news:', formData)
      
      // 成功時の処理
      alert('ニュースが正常に更新されました')
      router.push('/admin/news')
    } catch (error) {
      console.error('Error updating news:', error)
      alert('更新中にエラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreview = () => {
    // プレビュー機能（実装予定）
    alert('プレビュー機能は実装予定です')
  }

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

  if (!user || !newsData) {
    return null
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
                  ニュース管理
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">ニュース編集</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePreview} disabled={isSubmitting}>
                <Eye className="h-4 w-4 mr-2" />
                プレビュー
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? '更新中...' : '更新'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>
                ニュース記事の基本情報を編集してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">タイトル *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="ニュースのタイトルを入力"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">概要</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="ニュースの概要を入力"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">本文 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="ニュースの本文を入力"
                  className="mt-1 min-h-[300px]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">カテゴリ</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">一般</SelectItem>
                      <SelectItem value="technology">技術</SelectItem>
                      <SelectItem value="business">ビジネス</SelectItem>
                      <SelectItem value="education">教育</SelectItem>
                      <SelectItem value="events">イベント</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">ステータス</Label>
                  <Select value={formData.status} onValueChange={(value: any) => handleInputChange('status', value)}>
                    <SelectTrigger className="mt-1">
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
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>アイキャッチ画像</CardTitle>
              <CardDescription>
                ニュース記事のアイキャッチ画像を設定してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.featuredImage}
                onChange={(url) => handleInputChange('featuredImage', url)}
                label="アイキャッチ画像"
                placeholder="画像をドラッグ&ドロップまたはクリックして選択"
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>タグ</CardTitle>
              <CardDescription>
                ニュースに関連するタグを追加してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="新しいタグを入力"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>SEO設定</CardTitle>
              <CardDescription>
                検索エンジン最適化のための設定を行ってください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEOタイトル</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder="SEO用のタイトルを入力"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO説明</Label>
                <Textarea
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  placeholder="SEO用の説明文を入力"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
} 