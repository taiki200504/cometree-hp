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
  ArrowLeft, 
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
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-green-400/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" className="text-green-400 hover:bg-green-400/10">
                <Link href="/admin/supporters">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  BACK
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center border border-green-400">
                  <Heart className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    CREATE SUPPORTER
                  </h1>
                  <div className="text-xs opacity-75">ADD NEW SPONSOR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-black/50 border-green-400/30">
          <CardHeader>
            <CardTitle className="text-green-400">SUPPORTER INFORMATION</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-green-400">NAME *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                    placeholder="株式会社テックイノベーション"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-green-400">TYPE *</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                    placeholder="プラチナスポンサー"
                    required
                  />
                </div>
              </div>

              {/* Support Type */}
              <div className="space-y-2">
                <Label htmlFor="support_type" className="text-green-400">SUPPORT TYPE *</Label>
                <Select
                  value={formData.support_type}
                  onValueChange={(value) => handleInputChange('support_type', value as any)}
                >
                  <SelectTrigger className="bg-black/50 border-green-400/50 text-green-400 focus:border-green-400 focus:ring-green-400/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-green-400/30">
                    <SelectItem value="financial" className="text-green-400 hover:bg-green-400/10">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>資金支援</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="media" className="text-green-400 hover:bg-green-400/10">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>メディア支援</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="collaboration" className="text-green-400 hover:bg-green-400/10">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>協力・連携</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="individual" className="text-green-400 hover:bg-green-400/10">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4" />
                        <span>個人支援</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-green-400">DESCRIPTION *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20 min-h-[100px]"
                  placeholder="学生の技術力向上を支援し、次世代のエンジニア育成に貢献しています。"
                  required
                />
              </div>

              {/* Amount and Since */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-green-400">AMOUNT</Label>
                  <Input
                    id="amount"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className="bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                    placeholder="年間100万円"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="since" className="text-green-400">SINCE</Label>
                  <Input
                    id="since"
                    value={formData.since}
                    onChange={(e) => handleInputChange('since', e.target.value)}
                    className="bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                    placeholder="2022年4月"
                  />
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo_url" className="text-green-400">LOGO URL</Label>
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => handleInputChange('logo_url', e.target.value)}
                    className="bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website_url" className="text-green-400">WEBSITE URL</Label>
                  <Input
                    id="website_url"
                    value={formData.website_url}
                    onChange={(e) => handleInputChange('website_url', e.target.value)}
                    className="bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <Label htmlFor="contact_email" className="text-green-400">CONTACT EMAIL</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  className="bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                  placeholder="contact@example.com"
                />
              </div>

              {/* Display Order */}
              <div className="space-y-2">
                <Label htmlFor="display_order" className="text-green-400">DISPLAY ORDER</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => handleInputChange('display_order', parseInt(e.target.value) || 0)}
                  className="bg-black/50 border-green-400/50 text-green-400 placeholder:text-green-400/50 focus:border-green-400 focus:ring-green-400/20"
                  placeholder="0"
                />
              </div>

              {/* Active Status */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                  className="data-[state=checked]:bg-green-400"
                />
                <Label htmlFor="is_active" className="text-green-400">ACTIVE</Label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/supporters')}
                  className="border-green-400/30 text-green-400 hover:bg-green-400/10"
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      CREATING...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      CREATE SUPPORTER
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