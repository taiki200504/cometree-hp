"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Eye,
  Share2,
  Bookmark
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
  viewCount: number
}

export default function NewsDetail() {
  const params = useParams()
  const [newsData, setNewsData] = useState<NewsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchNewsData(params.id as string)
    }
  }, [params.id])

  const fetchNewsData = async (id: string) => {
    try {
      // TODO: Supabaseからデータを取得
      // 仮のデータ
      const mockData: NewsData = {
        id,
        title: 'UNIÓN新年度の活動について',
        excerpt: '新年度の活動計画と今後の展望についてお知らせします。',
        content: `
          <p>UNIÓNでは、新年度を迎え、より多くの学生や社会人とのつながりを深めていくことを目指しています。</p>
          
          <h2>主な活動内容</h2>
          <ul>
            <li>月例勉強会の開催</li>
            <li>企業との連携プロジェクト</li>
            <li>学生向けキャリア支援</li>
            <li>技術交流イベント</li>
          </ul>
          
          <p>これらの活動を通じて、参加者の皆様の成長とネットワーク構築をサポートしていきます。</p>
          
          <h2>今後の予定</h2>
          <p>4月からは新しいプロジェクトも始動予定です。詳細は追ってお知らせいたします。</p>
        `,
        category: 'general',
        status: 'published',
        tags: ['新年度', '活動', 'お知らせ'],
        featuredImage: '/images/news-sample.jpg',
        seoTitle: 'UNIÓN新年度の活動について',
        seoDescription: '新年度の活動計画と今後の展望についてお知らせします。',
        publishedAt: '2024-04-01T10:00:00Z',
        createdAt: '2024-04-01T10:00:00Z',
        updatedAt: '2024-04-01T10:00:00Z',
        viewCount: 156
      }
      
      setNewsData(mockData)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!newsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">ニュースが見つかりません</h1>
          <p className="text-gray-600 mb-4">お探しのニュースは存在しないか、削除された可能性があります。</p>
          <Button asChild>
            <Link href="/news">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ニュース一覧に戻る
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/news">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ニュース一覧
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                シェア
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                ブックマーク
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="space-y-8">
          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(newsData.publishedAt).toLocaleDateString('ja-JP')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{newsData.viewCount} views</span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {newsData.title}
            </h1>

            {newsData.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {newsData.excerpt}
              </p>
            )}

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {newsData.category}
              </Badge>
              {newsData.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Featured Image */}
          {newsData.featuredImage && (
            <div className="relative">
              <img
                src={newsData.featuredImage}
                alt={newsData.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: newsData.content }}
              />
            </CardContent>
          </Card>

          {/* Article Footer */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                シェア
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                ブックマーク
              </Button>
            </div>
            <div className="text-sm text-gray-500">
              最終更新: {new Date(newsData.updatedAt).toLocaleDateString('ja-JP')}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
