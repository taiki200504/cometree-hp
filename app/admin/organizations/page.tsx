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
  Building,
  Users,
  Globe,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

export default function AdminOrganizations() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [searchTerm, setSearchTerm] = useState('')

  // サンプルデータ
  const [organizations] = useState([
    {
      id: 1,
      name: '東京大学学生自治会',
      shortName: '東大自治会',
      type: 'university',
      status: 'active',
      members: 1500,
      university: '東京大学',
      location: '東京都文京区',
      website: 'https://www.todai-jichikai.jp',
      email: 'info@todai-jichikai.jp',
      phone: '03-3812-2111',
      joinedDate: '2020-04-01',
      description: '東京大学の学生自治組織として、学生生活の向上と権利保護に取り組んでいます。'
    },
    {
      id: 2,
      name: '早稲田大学学生連合',
      shortName: '早大連合',
      type: 'university',
      status: 'active',
      members: 1200,
      university: '早稲田大学',
      location: '東京都新宿区',
      website: 'https://www.waseda-union.org',
      email: 'contact@waseda-union.org',
      phone: '03-3203-4141',
      joinedDate: '2020-06-15',
      description: '早稲田大学の学生団体連合として、学生活動の活性化を目指しています。'
    },
    {
      id: 3,
      name: '慶應義塾大学学生協議会',
      shortName: '慶大協議会',
      type: 'university',
      status: 'pending',
      members: 800,
      university: '慶應義塾大学',
      location: '東京都港区',
      website: 'https://www.keio-council.jp',
      email: 'info@keio-council.jp',
      phone: '03-3453-4511',
      joinedDate: '2024-12-01',
      description: '慶應義塾大学の学生協議会として、学生の声を大学に届ける活動を行っています。'
    }
  ])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    requireAuth()
    return null
  }

  const filteredOrganizations = organizations.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.shortName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.university.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">アクティブ</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">審査中</Badge>
      case 'inactive':
        return <Badge variant="secondary">非アクティブ</Badge>
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'university':
        return <Badge className="bg-blue-100 text-blue-800">大学</Badge>
      case 'college':
        return <Badge className="bg-purple-100 text-purple-800">短期大学</Badge>
      case 'technical':
        return <Badge className="bg-orange-100 text-orange-800">専門学校</Badge>
      default:
        return <Badge variant="outline">その他</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
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
                <Building className="h-6 w-6 text-indigo-600" />
                <h1 className="text-xl font-bold text-gray-900">加盟団体管理</h1>
              </div>
            </div>
            <Button asChild>
              <Link href="/admin/organizations/create">
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
                placeholder="加盟団体を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">すべて</Button>
              <Button variant="outline">アクティブ</Button>
              <Button variant="outline">審査中</Button>
              <Button variant="outline">大学</Button>
            </div>
          </div>
        </div>

        {/* Organizations List */}
        <div className="space-y-4">
          {filteredOrganizations.map((item) => (
            <Card key={item.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
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
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>{item.university}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>メンバー: {item.members.toLocaleString()}人</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>加盟日: {item.joinedDate}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 text-sm text-gray-500">
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
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{item.phone}</span>
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
        {filteredOrganizations.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">加盟団体が見つかりません</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? '検索条件に一致する加盟団体がありません。' : 'まだ加盟団体が登録されていません。'}
              </p>
              <Button asChild>
                <Link href="/admin/organizations/create">
                  <Plus className="h-4 w-4 mr-2" />
                  最初の加盟団体を追加
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 