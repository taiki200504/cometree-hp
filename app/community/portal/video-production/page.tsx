"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ModernHero from '@/components/modern-hero'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Video, 
  Camera, 
  Edit, 
  Play,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Star,
  Upload
} from 'lucide-react'

interface VideoProject {
  id: string
  title: string
  description: string
  type: 'activity' | 'event' | 'interview' | 'promotion'
  duration: string
  status: 'planning' | 'filming' | 'editing' | 'completed'
  organizationName: string
  createdAt: string
  estimatedCompletion: string
}

interface VideoService {
  id: string
  name: string
  description: string
  duration: string
  price: number
  features: string[]
  icon: any
}

export default function VideoProductionPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [projects, setProjects] = useState<VideoProject[]>([])
  const [selectedService, setSelectedService] = useState<string | null>(null)

  // 動画制作サービス
  const videoServices: VideoService[] = [
    {
      id: 'service-1',
      name: '活動紹介動画',
      description: '学生団体の活動内容を紹介する動画を制作します',
      duration: '3-5分',
      price: 0,
      features: ['企画・構成', '撮影', '編集', '音楽選定', '字幕制作'],
      icon: Play
    },
    {
      id: 'service-2',
      name: 'イベント記録動画',
      description: 'イベントの様子を記録し、編集した動画を制作します',
      duration: '5-10分',
      price: 0,
      features: ['イベント撮影', '編集', 'ハイライト制作', 'SNS用短縮版'],
      icon: Camera
    },
    {
      id: 'service-3',
      name: 'インタビュー動画',
      description: 'メンバーや関係者へのインタビュー動画を制作します',
      duration: '2-3分',
      price: 0,
      features: ['インタビュー撮影', '編集', '字幕制作', 'BGM選定'],
      icon: Users
    },
    {
      id: 'service-4',
      name: 'プロモーション動画',
      description: '団体の魅力を伝えるプロモーション動画を制作します',
      duration: '1-2分',
      price: 0,
      features: ['企画・構成', '撮影', '編集', 'アニメーション', '音楽制作'],
      icon: Star
    }
  ]

  useEffect(() => {
    if (!loading && !user) {
      router.push("/community/portal/login")
    }
  }, [user, loading, router])

  const handleProjectRequest = async (formData: any) => {
    const service = videoServices.find(s => s.id === selectedService)
    if (!service) return

    const newProject: VideoProject = {
      id: `project-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      type: formData.type as any,
      duration: service.duration,
      status: 'planning',
      organizationName: user?.user_metadata?.organization_name || 'UNION加盟団体',
      createdAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30日後
    }

    setProjects([...projects, newProject])
    setShowRequestForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800'
      case 'filming':
        return 'bg-yellow-100 text-yellow-800'
      case 'editing':
        return 'bg-purple-100 text-purple-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning':
        return '企画中'
      case 'filming':
        return '撮影中'
      case 'editing':
        return '編集中'
      case 'completed':
        return '完了'
      default:
        return '不明'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#066ff2] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <ModernHero
        subtitle="Video Production Support"
        title="動画制作支援"
        description="プロの動画制作チームによる活動紹介動画の制作支援を無料で提供します。"
        primaryAction={{
          text: "戻る",
          href: "/community/portal",
        }}
      />

      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 利用可能なサービス */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              利用可能なサービス
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoServices.map((service) => {
                const Icon = service.icon
                return (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#066ff2] to-[#ec4faf] rounded-xl flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          無料
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>制作期間: {service.duration}</span>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">含まれるサービス</h4>
                          <div className="space-y-1">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            setSelectedService(service.id)
                            setShowRequestForm(true)
                          }}
                          className="w-full"
                        >
                          制作依頼
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* 制作依頼フォーム */}
          {showRequestForm && selectedService && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-4">制作依頼</h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleProjectRequest({
                    title: formData.get('title'),
                    description: formData.get('description'),
                    type: formData.get('type')
                  })
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">動画タイトル</label>
                      <input
                        name="title"
                        type="text"
                        required
                        className="w-full p-2 border rounded"
                        placeholder="動画のタイトルを入力してください"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">動画の種類</label>
                      <select
                        name="type"
                        required
                        className="w-full p-2 border rounded"
                      >
                        <option value="activity">活動紹介</option>
                        <option value="event">イベント記録</option>
                        <option value="interview">インタビュー</option>
                        <option value="promotion">プロモーション</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">制作内容の詳細</label>
                      <Textarea
                        name="description"
                        required
                        rows={4}
                        className="w-full"
                        placeholder="動画で伝えたい内容や希望する構成を詳しく教えてください"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowRequestForm(false)}
                      className="flex-1"
                    >
                      キャンセル
                    </Button>
                    <Button type="submit" className="flex-1">
                      依頼確定
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 制作プロジェクト履歴 */}
          {projects.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                制作プロジェクト履歴
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {project.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span>制作期間: {project.duration}</span>
                            <span>依頼日: {new Date(project.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusText(project.status)}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            完了予定: {new Date(project.estimatedCompletion).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
