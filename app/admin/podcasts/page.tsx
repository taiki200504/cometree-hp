"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Mic, 
  ExternalLink,
  Play,
  Settings,
  BarChart3,
  Link as LinkIcon
} from 'lucide-react'
import Link from 'next/link'

interface PodcastShow {
  id: string
  slug: string
  name: string
  description: string
  cover_image_url: string
  color_gradient: string
  total_episodes: number
  status: 'active' | 'inactive' | 'archived'
  created_at: string
  updated_at: string
}

interface PodcastEpisode {
  id: string
  show_id: string
  title: string
  description: string
  episode_number: number
  duration_minutes: number
  published_at: string
  audio_url: string
  video_url: string
  status: 'draft' | 'published' | 'archived'
  view_count: number
  created_at: string
  updated_at: string
}

interface ExternalLink {
  id: string
  show_id: string
  platform: 'youtube' | 'spotify' | 'apple' | 'google' | 'amazon'
  url: string
  is_active: boolean
}

export default function PodcastManagementPage() {
  const [shows, setShows] = useState<PodcastShow[]>([])
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([])
  const [externalLinks, setExternalLinks] = useState<ExternalLink[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('shows')
  
  // Dialog states
  const [showDialog, setShowDialog] = useState(false)
  const [editingShow, setEditingShow] = useState<PodcastShow | null>(null)
  const [showFormData, setShowFormData] = useState({
    slug: '',
    name: '',
    description: '',
    cover_image_url: '',
    color_gradient: 'from-blue-400 to-blue-600',
    total_episodes: 0,
    status: 'active' as const
  })

  const { requireAuth, loading: authLoading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  const fetchShows = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/podcasts/shows')
      if (response.ok) {
        const data = await response.json()
        setShows(data)
      }
    } catch (error) {
      console.error('Error fetching shows:', error)
    }
  }, [])

  const fetchEpisodes = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/podcasts/episodes')
      if (response.ok) {
        const data = await response.json()
        setEpisodes(data)
      }
    } catch (error) {
      console.error('Error fetching episodes:', error)
    }
  }, [])

  const fetchExternalLinks = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/podcasts/external-links')
      if (response.ok) {
        const data = await response.json()
        setExternalLinks(data)
      }
    } catch (error) {
      console.error('Error fetching external links:', error)
    }
  }, [])

  useEffect(() => {
    const isAuthenticated = requireAuth()
    if (isAuthenticated) {
      fetchShows()
      fetchEpisodes()
      fetchExternalLinks()
      setLoading(false)
    }
  }, [requireAuth, fetchShows, fetchEpisodes, fetchExternalLinks])

  const handleShowSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingShow 
        ? `/api/admin/podcasts/shows/${editingShow.id}`
        : '/api/admin/podcasts/shows'
      
      const method = editingShow ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(showFormData)
      })

      if (response.ok) {
        toast({
          title: editingShow ? "番組更新完了" : "番組作成完了",
          description: editingShow ? "番組を正常に更新しました。" : "番組を正常に作成しました。",
        })
        setShowDialog(false)
        setEditingShow(null)
        setShowFormData({
          slug: '',
          name: '',
          description: '',
          cover_image_url: '',
          color_gradient: 'from-blue-400 to-blue-600',
          total_episodes: 0,
          status: 'active'
        })
        fetchShows()
      } else {
        throw new Error('Failed to save show')
      }
    } catch (error) {
      toast({
        title: "エラー",
        description: "番組の保存中にエラーが発生しました。",
        variant: "destructive"
      })
    }
  }

  const handleShowDelete = async (id: string) => {
    if (!confirm('この番組を削除しますか？この操作は元に戻せません。')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/podcasts/shows/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "削除完了",
          description: "番組を正常に削除しました。",
        })
        fetchShows()
      } else {
        throw new Error('Failed to delete show')
      }
    } catch (error) {
      toast({
        title: "削除エラー",
        description: "番組の削除中にエラーが発生しました。",
        variant: "destructive"
      })
    }
  }

  const handleShowEdit = (show: PodcastShow) => {
    setEditingShow(show)
    setShowFormData({
      slug: show.slug,
      name: show.name,
      description: show.description,
      cover_image_url: show.cover_image_url,
      color_gradient: show.color_gradient,
      total_episodes: show.total_episodes,
      status: show.status
    })
    setShowDialog(true)
  }

  const handleShowCreate = () => {
    setEditingShow(null)
    setShowFormData({
      slug: '',
      name: '',
      description: '',
      cover_image_url: '',
      color_gradient: 'from-blue-400 to-blue-600',
      total_episodes: 0,
      status: 'active'
    })
    setShowDialog(true)
  }

  if (authLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          ポッドキャスト管理
        </h1>
        <p className="text-gray-600">
          ポッドキャスト番組とエピソードを管理します
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shows">番組管理</TabsTrigger>
          <TabsTrigger value="episodes">エピソード管理</TabsTrigger>
          <TabsTrigger value="links">外部リンク管理</TabsTrigger>
        </TabsList>

        <TabsContent value="shows" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">番組一覧</h2>
            <Button onClick={handleShowCreate} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              番組作成
            </Button>
          </div>

          <div className="grid gap-4">
            {shows.map((show) => (
              <Card key={show.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r rounded-lg flex items-center justify-center">
                        {show.cover_image_url ? (
                          <img 
                            src={show.cover_image_url} 
                            alt={show.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ) : (
                          <Mic className="h-8 w-8 text-white" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{show.name}</CardTitle>
                        <p className="text-sm text-gray-600">{show.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={show.status === 'active' ? 'default' : 'secondary'}>
                            {show.status === 'active' ? '公開' : show.status === 'inactive' ? '非公開' : 'アーカイブ'}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {show.total_episodes} エピソード
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/podcasts/shows/${show.id}/episodes`)}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShowEdit(show)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShowDelete(show.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="episodes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">エピソード一覧</h2>
            <Button onClick={() => router.push('/admin/podcasts/episodes/create')}>
              <Plus className="h-4 w-4 mr-2" />
              エピソード作成
            </Button>
          </div>

          <div className="grid gap-4">
            {episodes.map((episode) => (
              <Card key={episode.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{episode.title}</CardTitle>
                      <p className="text-sm text-gray-600">{episode.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span>エピソード {episode.episode_number}</span>
                        <span>{episode.duration_minutes}分</span>
                        <span>{episode.view_count} 視聴</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={episode.status === 'published' ? 'default' : 'secondary'}>
                        {episode.status === 'published' ? '公開' : episode.status === 'draft' ? '下書き' : 'アーカイブ'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/podcasts/episodes/${episode.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">外部リンク管理</h2>
            <Button onClick={() => router.push('/admin/podcasts/external-links/create')}>
              <Plus className="h-4 w-4 mr-2" />
              リンク追加
            </Button>
          </div>

          <div className="grid gap-4">
            {externalLinks.map((link) => (
              <Card key={link.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <LinkIcon className="h-5 w-5 text-blue-500" />
                      <div>
                        <CardTitle className="text-lg capitalize">{link.platform}</CardTitle>
                        <p className="text-sm text-gray-600">{link.url}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={link.is_active ? 'default' : 'secondary'}>
                        {link.is_active ? '有効' : '無効'}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/podcasts/external-links/${link.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingShow ? '番組編集' : '番組作成'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleShowSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">スラッグ</label>
                <Input
                  value={showFormData.slug}
                  onChange={(e) => setShowFormData({ ...showFormData, slug: e.target.value })}
                  placeholder="yuniraji"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ステータス</label>
                <Select
                  value={showFormData.status}
                  onValueChange={(value) => setShowFormData({ ...showFormData, status: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">公開</SelectItem>
                    <SelectItem value="inactive">非公開</SelectItem>
                    <SelectItem value="archived">アーカイブ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">番組名</label>
              <Input
                value={showFormData.name}
                onChange={(e) => setShowFormData({ ...showFormData, name: e.target.value })}
                placeholder="ユニラジ"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">説明</label>
              <Textarea
                value={showFormData.description}
                onChange={(e) => setShowFormData({ ...showFormData, description: e.target.value })}
                placeholder="番組の説明を入力"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">カバー画像URL</label>
              <Input
                value={showFormData.cover_image_url}
                onChange={(e) => setShowFormData({ ...showFormData, cover_image_url: e.target.value })}
                placeholder="/images/podcast/yuniraji.JPG"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">カラーグラデーション</label>
                <Select
                  value={showFormData.color_gradient}
                  onValueChange={(value) => setShowFormData({ ...showFormData, color_gradient: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="from-blue-400 to-blue-600">ブルー</SelectItem>
                    <SelectItem value="from-pink-400 to-pink-600">ピンク</SelectItem>
                    <SelectItem value="from-purple-400 to-purple-600">パープル</SelectItem>
                    <SelectItem value="from-green-400 to-green-600">グリーン</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">エピソード数</label>
                <Input
                  type="number"
                  value={showFormData.total_episodes}
                  onChange={(e) => setShowFormData({ ...showFormData, total_episodes: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDialog(false)}
              >
                キャンセル
              </Button>
              <Button type="submit">
                {editingShow ? '更新' : '作成'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
} 