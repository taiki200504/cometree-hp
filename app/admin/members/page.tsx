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
  Users,
  Crown,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  Award,
  MapPin
} from 'lucide-react'
import Link from 'next/link'

export default function AdminMembers() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [searchTerm, setSearchTerm] = useState('')

  // サンプルデータ
  const [members] = useState([
    {
      id: 1,
      name: '田所 太郎',
      role: '代表',
      position: 'president',
      university: '東京大学',
      department: '法学部',
      grade: '4年',
      email: 'tadokoro@union.example.com',
      phone: '090-1234-5678',
      joinDate: '2023-04-01',
      status: 'active',
      avatar: '/images/team/tadokoro.jpg',
      description: 'UNIÓNの代表として、学生団体連合の運営と発展に取り組んでいます。',
      responsibilities: ['全体統括', '外部連携', '戦略立案'],
      achievements: ['加盟団体数50団体達成', '政府機関との提携実現']
    },
    {
      id: 2,
      name: '田中 花子',
      role: '副代表',
      position: 'vice_president',
      university: '早稲田大学',
      department: '政治経済学部',
      grade: '3年',
      email: 'tanaka@union.example.com',
      phone: '090-2345-6789',
      joinDate: '2023-06-15',
      status: 'active',
      avatar: '/images/team/tanaka.jpg',
      description: '副代表として、イベント企画と広報活動を担当しています。',
      responsibilities: ['イベント企画', '広報活動', '加盟団体サポート'],
      achievements: ['年次総会の成功', 'SNSフォロワー1000人達成']
    },
    {
      id: 3,
      name: '佐藤 次郎',
      role: '事務局長',
      position: 'secretary',
      university: '慶應義塾大学',
      department: '商学部',
      grade: '4年',
      email: 'sato@union.example.com',
      phone: '090-3456-7890',
      joinDate: '2023-09-01',
      status: 'active',
      avatar: '/images/team/sato.jpg',
      description: '事務局長として、日常的な運営業務と財務管理を担当しています。',
      responsibilities: ['事務業務', '財務管理', '会議運営'],
      achievements: ['事務効率化システム導入', '予算管理の改善']
    },
    {
      id: 4,
      name: '鈴木 美咲',
      role: '広報担当',
      position: 'pr',
      university: '上智大学',
      department: '文学部',
      grade: '2年',
      email: 'suzuki@union.example.com',
      phone: '090-4567-8901',
      joinDate: '2024-04-01',
      status: 'active',
      avatar: '/images/team/suzuki.jpg',
      description: '広報担当として、SNS運営とメディア対応を担当しています。',
      responsibilities: ['SNS運営', 'メディア対応', 'コンテンツ制作'],
      achievements: ['Instagram投稿数100件達成', 'プレスリリース配信']
    }
  ])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    requireAuth()
    return null
  }

  const filteredMembers = members.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.university.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getPositionBadge = (position: string) => {
    switch (position) {
      case 'president':
        return <Badge className="bg-red-100 text-red-800 flex items-center space-x-1">
          <Crown className="h-3 w-3" />
          <span>代表</span>
        </Badge>
      case 'vice_president':
        return <Badge className="bg-orange-100 text-orange-800">副代表</Badge>
      case 'secretary':
        return <Badge className="bg-blue-100 text-blue-800">事務局長</Badge>
      case 'pr':
        return <Badge className="bg-purple-100 text-purple-800">広報担当</Badge>
      case 'treasurer':
        return <Badge className="bg-green-100 text-green-800">会計</Badge>
      default:
        return <Badge variant="outline">メンバー</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">アクティブ</Badge>
      case 'inactive':
        return <Badge variant="secondary">非アクティブ</Badge>
      case 'graduated':
        return <Badge className="bg-gray-100 text-gray-800">卒業</Badge>
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
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
                <Users className="h-6 w-6 text-teal-600" />
                <h1 className="text-xl font-bold text-gray-900">運営メンバー管理</h1>
              </div>
            </div>
            <Button asChild>
              <Link href="/admin/members/create">
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
                placeholder="運営メンバーを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">すべて</Button>
              <Button variant="outline">アクティブ</Button>
              <Button variant="outline">代表</Button>
              <Button variant="outline">4年生</Button>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-4">
          {filteredMembers.map((item) => (
            <Card key={item.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.role}</p>
                      </div>
                      <div className="flex space-x-2">
                        {getPositionBadge(item.position)}
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4" />
                        <span>{item.university} {item.department}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>{item.grade}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>加入日: {item.joinDate}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{item.email}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">担当業務</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.responsibilities.map((resp, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {resp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">主な実績</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.achievements.map((achievement, index) => (
                            <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
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
        {filteredMembers.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">運営メンバーが見つかりません</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? '検索条件に一致する運営メンバーがありません。' : 'まだ運営メンバーが登録されていません。'}
              </p>
              <Button asChild>
                <Link href="/admin/members/create">
                  <Plus className="h-4 w-4 mr-2" />
                  最初の運営メンバーを追加
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 