"use client"

import { useState, useEffect } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Plus,
  Search,
  Filter,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Tag
} from 'lucide-react'
import Link from 'next/link'

interface BoardPost {
  id: string
  title: string
  content: string
  author: string
  category: string
  status: 'published' | 'draft' | 'archived'
  tags: string[]
  createdAt: string
  updatedAt: string
  viewCount: number
  commentCount: number
}

export default function AdminBoard() {
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const [posts, setPosts] = useState<BoardPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  // サンプルデータ
  const samplePosts: BoardPost[] = [
    {
      id: '1',
      title: '新年度の活動について',
      content: '新年度の活動計画についてお知らせします...',
      author: '運営チーム',
      category: 'お知らせ',
      status: 'published',
      tags: ['新年度', '活動'],
      createdAt: '2024-04-01T10:00:00Z',
      updatedAt: '2024-04-01T10:00:00Z',
      viewCount: 156,
      commentCount: 8
    },
    {
      id: '2',
      title: 'イベント参加者募集',
      content: '来月開催予定のイベントの参加者を募集します...',
      author: 'イベント担当',
      category: '募集',
      status: 'published',
      tags: ['イベント', '募集'],
      createdAt: '2024-03-28T14:30:00Z',
      updatedAt: '2024-03-28T14:30:00Z',
      viewCount: 89,
      commentCount: 12
    },
    {
      id: '3',
      title: '技術勉強会の開催',
      content: '技術勉強会を開催します。参加希望者は...',
      author: '技術部',
      category: '勉強会',
      status: 'draft',
      tags: ['技術', '勉強会'],
      createdAt: '2024-03-25T09:15:00Z',
      updatedAt: '2024-03-25T09:15:00Z',
      viewCount: 0,
      commentCount: 0
    }
  ]

  useEffect(() => {
    requireAuth()
    setPosts(samplePosts)
  }, [requireAuth])

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">公開</Badge>
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-800">下書き</Badge>
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-800">アーカイブ</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const colors = {
      'お知らせ': 'bg-blue-100 text-blue-800',
      '募集': 'bg-purple-100 text-purple-800',
      '勉強会': 'bg-orange-100 text-orange-800',
      '質問': 'bg-red-100 text-red-800',
      '雑談': 'bg-green-100 text-green-800'
    }
    return <Badge className={colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>{category}</Badge>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
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
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  ダッシュボード
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">掲示板管理</h1>
              </div>
            </div>
            <Button asChild>
              <Link href="/admin/board/create">
                <Plus className="h-4 w-4 mr-2" />
                新規投稿
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="投稿を検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">すべてのステータス</option>
                <option value="published">公開</option>
                <option value="draft">下書き</option>
                <option value="archived">アーカイブ</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">すべてのカテゴリ</option>
                <option value="お知らせ">お知らせ</option>
                <option value="募集">募集</option>
                <option value="勉強会">勉強会</option>
                <option value="質問">質問</option>
                <option value="雑談">雑談</option>
              </select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>フィルター</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      {getStatusBadge(post.status)}
                      {getCategoryBadge(post.category)}
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {post.content}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString('ja-JP')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.viewCount} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.commentCount} comments</span>
                      </div>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex items-center space-x-2 mt-3">
                        <Tag className="h-4 w-4 text-gray-400" />
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/board/${post.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/board/${post.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
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

        {filteredPosts.length === 0 && (
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">投稿が見つかりません</h3>
              <p className="text-gray-600 mb-4">
                検索条件を変更するか、新しい投稿を作成してください。
              </p>
              <Button asChild>
                <Link href="/admin/board/create">
                  <Plus className="h-4 w-4 mr-2" />
                  新規投稿を作成
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
} 