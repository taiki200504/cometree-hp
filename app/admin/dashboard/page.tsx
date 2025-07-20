"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Download,
  Upload,
  Settings,
  Bell,
  BarChart3,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  // モック統計データ
  const stats = [
    {
      title: "総メンバー数",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-600",
    },
    {
      title: "今月の投稿数",
      value: "89",
      change: "+23%",
      trend: "up",
      icon: <FileText className="h-6 w-6" />,
      color: "text-green-600",
    },
    {
      title: "今月のイベント",
      value: "15",
      change: "+5%",
      trend: "up",
      icon: <Calendar className="h-6 w-6" />,
      color: "text-purple-600",
    },
    {
      title: "アクティブ率",
      value: "78%",
      change: "+8%",
      trend: "up",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-orange-600",
    },
  ]

  // モックニュース記事データ
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "東京大学起業サークル、新たなスタートアップを設立",
      author: "管理者",
      status: "published",
      category: "起業・ビジネス",
      publishDate: "2025年1月18日",
      views: 1250,
      comments: 23,
    },
    {
      id: 2,
      title: "早稲田大学国際交流サークル、グローバル学生会議を開催",
      author: "編集者A",
      status: "published",
      category: "国際交流",
      publishDate: "2025年1月15日",
      views: 890,
      comments: 15,
    },
    {
      id: 3,
      title: "慶應義塾大学ボランティア団体、地域清掃活動で表彰",
      author: "編集者B",
      status: "draft",
      category: "ボランティア・社会貢献",
      publishDate: "下書き",
      views: 0,
      comments: 0,
    },
  ])

  // モックイベントデータ
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "UNION年次総会2025",
      date: "2025年3月15日",
      time: "14:00-17:00",
      location: "東京国際フォーラム",
      status: "upcoming",
      participants: 245,
      maxParticipants: 300,
    },
    {
      id: 2,
      title: "学生起業家ピッチコンテスト",
      date: "2025年2月28日",
      time: "13:00-18:00",
      location: "渋谷スカイ",
      status: "upcoming",
      participants: 89,
      maxParticipants: 150,
    },
    {
      id: 3,
      title: "新春交流会",
      date: "2025年1月20日",
      time: "18:00-21:00",
      location: "品川プリンスホテル",
      status: "completed",
      participants: 156,
      maxParticipants: 200,
    },
  ])

  // モックユーザーデータ
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "田中太郎",
      email: "tanaka@example.com",
      university: "東京大学",
      role: "member",
      joinDate: "2024年4月1日",
      lastActive: "2025年1月18日",
      status: "active",
    },
    {
      id: 2,
      name: "佐藤花子",
      email: "sato@example.com",
      university: "早稲田大学",
      role: "moderator",
      joinDate: "2024年3月15日",
      lastActive: "2025年1月17日",
      status: "active",
    },
    {
      id: 3,
      name: "鈴木一郎",
      email: "suzuki@example.com",
      university: "慶應義塾大学",
      role: "member",
      joinDate: "2024年9月1日",
      lastActive: "2025年1月10日",
      status: "inactive",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">公開中</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">下書き</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">開催予定</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">終了</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800">アクティブ</Badge>
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">非アクティブ</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">管理画面</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">UNION学生団体連合の管理ダッシュボード</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                レポート出力
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                設定
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                通知
              </Button>
            </div>
          </div>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.change} 前月比
                    </p>
                  </div>
                  <div className={`${stat.color}`}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* メインコンテンツ */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">概要</TabsTrigger>
            <TabsTrigger value="articles">記事管理</TabsTrigger>
            <TabsTrigger value="events">イベント管理</TabsTrigger>
            <TabsTrigger value="users">ユーザー管理</TabsTrigger>
            <TabsTrigger value="analytics">分析</TabsTrigger>
          </TabsList>

          {/* 概要タブ */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>最近の活動</CardTitle>
                  <CardDescription>直近の重要な活動をまとめて表示</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">新しい記事が公開されました</p>
                        <p className="text-xs text-gray-500">2時間前</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">新規ユーザーが15名登録</p>
                        <p className="text-xs text-gray-500">5時間前</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">イベント申込み締切が近づいています</p>
                        <p className="text-xs text-gray-500">1日前</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>今週の予定</CardTitle>
                  <CardDescription>管理者向けの重要な予定</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">月次レポート作成</p>
                        <p className="text-xs text-gray-500">1月20日 締切</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">運営会議</p>
                        <p className="text-xs text-gray-500">1月22日 14:00</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">新機能リリース</p>
                        <p className="text-xs text-gray-500">1月25日 予定</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 記事管理タブ */}
          <TabsContent value="articles" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>記事管理</CardTitle>
                    <CardDescription>ニュース記事の作成・編集・公開管理</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    新規記事作成
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="記事を検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">すべて</option>
                    <option value="published">公開中</option>
                    <option value="draft">下書き</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">タイトル</th>
                        <th className="text-left py-3 px-4 font-medium">作成者</th>
                        <th className="text-left py-3 px-4 font-medium">ステータス</th>
                        <th className="text-left py-3 px-4 font-medium">カテゴリ</th>
                        <th className="text-left py-3 px-4 font-medium">公開日</th>
                        <th className="text-left py-3 px-4 font-medium">閲覧数</th>
                        <th className="text-left py-3 px-4 font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {articles.map((article) => (
                        <tr key={article.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900 dark:text-white line-clamp-2">
                              {article.title}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{article.author}</td>
                          <td className="py-3 px-4">{getStatusBadge(article.status)}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{article.category}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{article.publishDate}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{article.views}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* イベント管理タブ */}
          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>イベント管理</CardTitle>
                    <CardDescription>イベントの作成・編集・参加者管理</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    新規イベント作成
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">イベント名</th>
                        <th className="text-left py-3 px-4 font-medium">日時</th>
                        <th className="text-left py-3 px-4 font-medium">場所</th>
                        <th className="text-left py-3 px-4 font-medium">ステータス</th>
                        <th className="text-left py-3 px-4 font-medium">参加者</th>
                        <th className="text-left py-3 px-4 font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900 dark:text-white">{event.title}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                            {event.date}
                            <br />
                            <span className="text-sm">{event.time}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{event.location}</td>
                          <td className="py-3 px-4">{getStatusBadge(event.status)}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                            {event.participants}/{event.maxParticipants}名
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ユーザー管理タブ */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>ユーザー管理</CardTitle>
                    <CardDescription>メンバーの管理・権限設定</CardDescription>
                  </div>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    CSVインポート
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">名前</th>
                        <th className="text-left py-3 px-4 font-medium">メール</th>
                        <th className="text-left py-3 px-4 font-medium">大学</th>
                        <th className="text-left py-3 px-4 font-medium">権限</th>
                        <th className="text-left py-3 px-4 font-medium">参加日</th>
                        <th className="text-left py-3 px-4 font-medium">ステータス</th>
                        <th className="text-left py-3 px-4 font-medium">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.university}</td>
                          <td className="py-3 px-4">
                            <Badge variant={user.role === "moderator" ? "default" : "secondary"}>
                              {user.role === "moderator" ? "モデレーター" : "メンバー"}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{user.joinDate}</td>
                          <td className="py-3 px-4">{getStatusBadge(user.status)}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 分析タブ */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>アクセス統計</CardTitle>
                  <CardDescription>サイトのアクセス状況</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">グラフデータを読み込み中...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ユーザー行動</CardTitle>
                  <CardDescription>ユーザーの行動パターン分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">ページビュー</span>
                      <span className="text-sm text-gray-600">15,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">セッション時間</span>
                      <span className="text-sm text-gray-600">4分32秒</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">直帰率</span>
                      <span className="text-sm text-gray-600">32%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">新規ユーザー</span>
                      <span className="text-sm text-gray-600">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
