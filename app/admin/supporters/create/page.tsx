"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { 
  Save, 
  Loader2, 
  Heart, 
  Building2,
  Award,
  Users,
  Globe,
  Mail,
  ExternalLink,
  Calendar,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import AdminHeading from '@/components/admin/AdminHeading'

export default function CreateSupporterPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    logo_url: '',
    description: '',
    support_type: 'financial' as 'financial' | 'media' | 'collaboration' | 'individual',
    amount: '',
    since: '',
    website_url: '',
    contact_email: '',
    is_active: true,
    display_order: 0
  })

  const router = useRouter()
  const { toast } = useToast()
  const { requireAdmin, user, userRole } = useAdminAuthSimple()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/supporters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '支援者の作成に失敗しました。')
      }

      toast({
        title: "作成完了",
        description: "支援者が正常に作成されました。",
      })

      router.push('/admin/supporters')
    } catch (error) {
      console.error('Create error:', error)
      toast({
        title: "作成エラー",
        description: error instanceof Error ? error.message : '支援者の作成中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getSupportTypeIcon = (supportType: string) => {
    switch (supportType) {
      case 'financial': return <DollarSign className="h-4 w-4" />
      case 'media': return <Award className="h-4 w-4" />
      case 'collaboration': return <Users className="h-4 w-4" />
      case 'individual': return <Heart className="h-4 w-4" />
      default: return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <AdminHeading
          title="支援者の新規追加"
          actions={(<Button asChild variant="outline" size="sm"><Link href="/admin/supporters">一覧へ</Link></Button>)}
        />
        <Card className="bg-white border-0 shadow">
          <CardHeader>
            <CardTitle>支援者情報</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">名称 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="株式会社テックイノベーション"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">区分 *</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    placeholder="プラチナスポンサー"
                    required
                  />
                </div>
              </div>

              {/* Support Type */}
              <div className="space-y-2">
                <Label htmlFor="support_type">支援タイプ *</Label>
                <Select
                  value={formData.support_type}
                  onValueChange={(value) => handleInputChange('support_type', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="financial">資金支援</SelectItem>
                    <SelectItem value="media">メディア支援</SelectItem>
                    <SelectItem value="collaboration">協力・連携</SelectItem>
                    <SelectItem value="individual">個人支援</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">説明 *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="学生の技術力向上を支援し、次世代のエンジニア育成に貢献しています。"
                  required
                />
              </div>

              {/* Amount and Since */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">支援額等</Label>
                  <Input
                    id="amount"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    placeholder="年間100万円"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="since">開始時期</Label>
                  <Input
                    id="since"
                    value={formData.since}
                    onChange={(e) => handleInputChange('since', e.target.value)}
                    placeholder="2022年4月"
                  />
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo_url">ロゴURL</Label>
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => handleInputChange('logo_url', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website_url">Webサイト</Label>
                  <Input
                    id="website_url"
                    value={formData.website_url}
                    onChange={(e) => handleInputChange('website_url', e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <Label htmlFor="contact_email">連絡先メール</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  placeholder="contact@example.com"
                />
              </div>

              {/* Display Order */}
              <div className="space-y-2">
                <Label htmlFor="display_order">表示順</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => handleInputChange('display_order', parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                />
                <Label htmlFor="is_active">アクティブ</Label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/supporters')}
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      作成中...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      追加する
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 