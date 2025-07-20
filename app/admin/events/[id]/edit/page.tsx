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
  Calendar,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

interface EventData {
  id: string
  title: string
  description: string
  date: string
  time: string
  endTime: string
  location: string
  maxParticipants: number
  currentParticipants: number
  registrationRequired: boolean
  registrationDeadline: string
  contactEmail: string
  contactPhone: string
  category: string
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  tags: string[]
  featuredImage: string
  gallery: string[]
  createdAt: string
  updatedAt: string
}

export default function EditEvent() {
  const router = useRouter()
  const params = useParams()
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [newTag, setNewTag] = useState('')
  const [eventData, setEventData] = useState<EventData | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    maxParticipants: 0,
    registrationRequired: false,
    registrationDeadline: '',
    contactEmail: '',
    contactPhone: '',
    category: 'general',
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
    tags: [] as string[],
    featuredImage: '',
    gallery: [] as string[]
  })

  useEffect(() => {
    requireAuth()
    if (params.id) {
      fetchEventData(params.id as string)
    }
  }, [requireAuth, params.id])

  const fetchEventData = async (id: string) => {
    try {
      // TODO: Supabaseからデータを取得
      // 仮のデータ
      const mockData: EventData = {
        id,
        title: 'サンプルイベント',
        description: 'これはサンプルのイベントです。',
        date: '2024-12-31',
        time: '14:00',
        endTime: '16:00',
        location: 'オンライン',
        maxParticipants: 100,
        currentParticipants: 25,
        registrationRequired: true,
        registrationDeadline: '2024-12-30',
        contactEmail: 'event@example.com',
        contactPhone: '03-1234-5678',
        category: 'general',
        status: 'upcoming',
        tags: ['サンプル', 'オンライン'],
        featuredImage: '',
        gallery: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      }
      
      setEventData(mockData)
      setFormData({
        title: mockData.title,
        description: mockData.description,
        date: mockData.date,
        time: mockData.time,
        endTime: mockData.endTime,
        location: mockData.location,
        maxParticipants: mockData.maxParticipants,
        registrationRequired: mockData.registrationRequired,
        registrationDeadline: mockData.registrationDeadline,
        contactEmail: mockData.contactEmail,
        contactPhone: mockData.contactPhone,
        category: mockData.category,
        status: mockData.status,
        tags: mockData.tags,
        featuredImage: mockData.featuredImage,
        gallery: mockData.gallery
      })
    } catch (error) {
      console.error('Error fetching event:', error)
      alert('イベントデータの取得に失敗しました')
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
      if (!formData.title.trim() || !formData.date || !formData.time) {
        alert('イベント名、開催日、開始時刻は必須です')
        return
      }

      // TODO: Supabaseにデータを更新
      console.log('Updating event:', formData)
      
      // 成功時の処理
      alert('イベントが正常に更新されました')
      router.push('/admin/events')
    } catch (error) {
      console.error('Error updating event:', error)
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

  if (!user || !eventData) {
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
                <Link href="/admin/events">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  イベント管理
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">イベント編集</h1>
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
                イベントの基本情報を編集してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">イベント名 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="イベント名を入力"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">説明</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="イベントの詳細説明を入力"
                  className="mt-1 min-h-[150px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">開催日 *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="time">開始時刻 *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="endTime">終了時刻</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">開催場所</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="開催場所を入力"
                  className="mt-1"
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
                      <SelectItem value="workshop">ワークショップ</SelectItem>
                      <SelectItem value="seminar">セミナー</SelectItem>
                      <SelectItem value="meetup">ミートアップ</SelectItem>
                      <SelectItem value="conference">カンファレンス</SelectItem>
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
                      <SelectItem value="upcoming">開催予定</SelectItem>
                      <SelectItem value="ongoing">開催中</SelectItem>
                      <SelectItem value="completed">終了</SelectItem>
                      <SelectItem value="cancelled">中止</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Settings */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>参加申込設定</CardTitle>
              <CardDescription>
                参加申込に関する設定を行ってください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="registrationRequired"
                  checked={formData.registrationRequired}
                  onChange={(e) => handleInputChange('registrationRequired', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="registrationRequired">参加申込が必要</Label>
              </div>

              {formData.registrationRequired && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxParticipants">最大参加者数</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={formData.maxParticipants}
                      onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value) || 0)}
                      placeholder="最大参加者数を入力"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="registrationDeadline">申込締切</Label>
                    <Input
                      id="registrationDeadline"
                      type="date"
                      value={formData.registrationDeadline}
                      onChange={(e) => handleInputChange('registrationDeadline', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>連絡先情報</CardTitle>
              <CardDescription>
                イベントに関する問い合わせ先を設定してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactEmail">連絡先メールアドレス</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="連絡先メールアドレスを入力"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">連絡先電話番号</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="連絡先電話番号を入力"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>イベント画像</CardTitle>
              <CardDescription>
                イベントのメイン画像を設定してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.featuredImage}
                onChange={(url) => handleInputChange('featuredImage', url)}
                label="イベント画像"
                placeholder="画像をドラッグ&ドロップまたはクリックして選択"
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>タグ</CardTitle>
              <CardDescription>
                イベントに関連するタグを追加してください
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
        </form>
      </main>
    </div>
  )
} 