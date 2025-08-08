"use client"

import { useState, useEffect } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  User,
  Shield,
  Mail,
  Calendar,
  Activity,
  MoreHorizontal
} from 'lucide-react'
import Link from 'next/link'
import AdminHeading from '@/components/admin/AdminHeading'

export default function AdminUsers() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [searchTerm, setSearchTerm] = useState('')

  // サンプルデータ
  const [users] = useState([
    {
      id: 1,
      email: 'gakusei.union226@gmail.com',
      name: 'UNIÓN管理者',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-01-15 14:30',
      createdAt: '2024-12-01',
      loginCount: 45
    },
    {
      id: 2,
      email: 'admin2@union.example.com',
      name: '副管理者',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-01-14 09:15',
      createdAt: '2024-12-15',
      loginCount: 23
    },
    {
      id: 3,
      email: 'editor@union.example.com',
      name: '編集者',
      role: 'editor',
      status: 'inactive',
      lastLogin: '2025-01-10 16:45',
      createdAt: '2025-01-05',
      loginCount: 8
    }
  ])

  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (isAuthenticated) {
      // fetchUsers() // This function is not defined in the original file, so it's commented out.
    }
  }, [requireAuth])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    requireAuth()
    return null
  }

  const filteredUsers = users.filter(item =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-100 text-red-800">管理者</Badge>
      case 'editor':
        return <Badge className="bg-blue-100 text-blue-800">編集者</Badge>
      default:
        return <Badge variant="outline">一般</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">アクティブ</Badge>
      case 'inactive':
        return <Badge variant="secondary">非アクティブ</Badge>
      default:
        return <Badge variant="outline">不明</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <AdminHeading
          title="ユーザー管理"
          actions={(
            <Button asChild>
              <Link href="/admin/users/create">
                <Plus className="h-4 w-4 mr-2" />新規追加
              </Link>
            </Button>
          )}
        />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ユーザーを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">すべて</Button>
              <Button variant="outline">管理者</Button>
              <Button variant="outline">編集者</Button>
              <Button variant="outline">アクティブ</Button>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((item) => (
            <Card key={item.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        {getRoleBadge(item.role)}
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>最終ログイン: {item.lastLogin}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4" />
                        <span>ログイン回数: {item.loginCount}回</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>作成日: {item.createdAt}</span>
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
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">ユーザーが見つかりません</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm ? '検索条件に一致するユーザーがありません。' : 'まだユーザーが登録されていません。'}
              </p>
              <Button asChild>
                <Link href="/admin/users/create">
                  <Plus className="h-4 w-4 mr-2" />
                  最初のユーザーを追加
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 