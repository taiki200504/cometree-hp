"use client"

import { useState } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Handshake,
  Building,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function AdminPartners() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [searchTerm, setSearchTerm] = useState('')

  // サンプルデータ
  const [partners] = useState([
    {
      id: 1,
      name: '日本学生支援機構',
      shortName: 'JASSO',
      type: 'government',
      status: 'active',
      partnershipLevel: 'platinum',
      website: 'https://www.jasso.go.jp',
      email: 'info@jasso.go.jp',
      phone: '03-5253-4111',
      location: '東京都千代田区',
      partnershipDate: '2019-03-01',
      description: '学生の修学支援を目的とした独立行政法人。奨学金事業や留学生支援事業を実施。',
      benefits: ['奨学金制度の利用', '留学生支援プログラム', '就職支援サービス']
    },
    {
      id: 2,
      name: '株式会社リクルート',
      shortName: 'リクルート',
      type: 'corporate',
      status: 'active',
      partnershipLevel: 'gold',
      website: 'https://www.recruit.co.jp',
      email: 'partnership@recruit.co.jp',
      phone: '03-6835-3000',
      location: '東京都千代田区',
      partnershipDate: '2020-01-15',
      description: '人材サービス、教育、旅行、住宅など幅広い事業を展開する総合サービス企業。',
      benefits: ['就職支援プログラム', 'インターンシップ機会', 'キャリア相談サービス']
    },
    {
      id: 3,
      name: '東京商工リサーチ',
      shortName: 'TSR',
      type: 'research',
      status: 'active',
      partnershipLevel: 'silver',
      website: 'https://www.tsr-net.co.jp',
      email: 'contact@tsr-net.co.jp',
      phone: '03-3270-8711',
      location: '東京都中央区',
      partnershipDate: '2021-06-20',
      description: '企業情報調査・分析の専門機関。企業の信用調査や市場調査を提供。',
      benefits: ['企業情報データベース', '市場調査レポート', '起業支援情報']
    }
  ])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    requireAuth()
    return null
  }

  const filteredPartners = partners.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.shortName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">アクティブ</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">審査中</Badge>
      case 'expired':
        return <Badge variant="secondary">期限切れ</Badge>
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'government':
        return <Badge className="bg-blue-100 text-blue-800">政府機関</Badge>
      case 'corporate':
        return <Badge className="bg-purple-100 text-purple-800">企業</Badge>
      case 'research':
        return <Badge className="bg-orange-100 text-orange-800">研究機関</Badge>
      case 'ngo':
        return <Badge className="bg-green-100 text-green-800">NGO</Badge>
      default:
        return <Badge variant="outline">その他</Badge>
    }
  }

  const getPartnershipLevelBadge = (level: string) => {
    switch (level) {
      case 'platinum':
        return <Badge className="bg-gray-100 text-gray-800 flex items-center space-x-1">
          <Star className="h-3 w-3" />
          <span>プラチナ</span>
        </Badge>
      case 'gold':
        return <Badge className="bg-yellow-100 text-yellow-800 flex items-center space-x-1">
          <Star className="h-3 w-3" />
          <span>ゴールド</span>
        </Badge>
      case 'silver':
        return <Badge className="bg-gray-100 text-gray-800 flex items-center space-x-1">
          <Star className="h-3 w-3" />
          <span>シルバー</span>
        </Badge>
      default:
        return <Badge variant="outline">標準</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ダッシュボード
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Handshake className="h-6 w-6 text-amber-600" />
                <h1 className="text-xl font-bold text-gray-900">提携団体管理</h1>
              </div>
            </div>
            <Button asChild>
              <Link href="/admin/partners/create">
                <Plus className="h-4 w-4 mr-2" />
                新規追加
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="提携団体を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">すべて</Button>
              <Button variant="outline">アクティブ</Button>
              <Button variant="outline">プラチナ</Button>
              <Button variant="outline">企業</Button>
            </div>
          </div>
        </div>

        {/* Partners List */}
        <div className="space-y-4">
          {filteredPartners.map((item) => (
            <Card key={item.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {item.shortName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.shortName}</p>
                      </div>
                      <div className="flex space-x-2">
                        {getTypeBadge(item.type)}
                        {getStatusBadge(item.status)}
                        {getPartnershipLevelBadge(item.partnershipLevel)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>提携日: {item.partnershipDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {item.website}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{item.email}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">提供サービス</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.benefits.map((benefit, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredPartners.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Handshake className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">提携団体が見つかりません</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? '検索条件に一致する提携団体がありません。' : 'まだ提携団体が登録されていません。'}
              </p>
              <Button asChild>
                <Link href="/admin/partners/create">
                  <Plus className="h-4 w-4 mr-2" />
                  最初の提携団体を追加
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 