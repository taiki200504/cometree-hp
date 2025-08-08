"use client"

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AdminHeader from '@/components/admin/AdminHeader'

type PodcastShow = {
  id: string
  name: string
}

export default function PodcastEpisodeCreatePage() {
  const router = useRouter()
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const { toast } = useToast()

  const [shows, setShows] = useState<PodcastShow[]>([])
  const [form, setForm] = useState({
    show_id: '',
    title: '',
    description: '',
    episode_number: 1,
    duration_minutes: 30,
    published_at: '',
    audio_url: '',
    video_url: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
  })

  const loadShows = useCallback(async () => {
    const res = await fetch('/api/admin/podcasts/shows')
    if (res.ok) {
      const data = await res.json()
      setShows(data.map((s: any) => ({ id: s.id, name: s.name })))
    }
  }, [])

  useEffect(() => {
    const authed = requireAuth()
    if (!authed) return
    loadShows()
  }, [requireAuth, loadShows])

  if (loading) return <div className="p-8">読み込み中...</div>
  if (!user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/podcasts/episodes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      toast({ title: '作成しました' })
      router.push('/admin/podcasts')
    } catch {
      toast({ title: '作成に失敗しました', variant: 'destructive' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="エピソード作成" trail={[{ label: '管理' }, { label: 'ポッドキャスト' }, { label: 'エピソード作成' }]} back={{ href: '/admin/podcasts' }} />
      <div className="p-4 md:p-8">
        <Card className="bg-white shadow border-0">
          <CardHeader>
            <CardTitle>新規エピソード</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">番組</label>
                  <Select value={form.show_id} onValueChange={(v) => setForm({ ...form, show_id: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="番組を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {shows.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ステータス</label>
                  <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">下書き</SelectItem>
                      <SelectItem value="published">公開</SelectItem>
                      <SelectItem value="archived">アーカイブ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">タイトル</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">説明</label>
                <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">エピソード番号</label>
                  <Input type="number" min={1} value={form.episode_number} onChange={(e) => setForm({ ...form, episode_number: parseInt(e.target.value) || 1 })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">長さ（分）</label>
                  <Input type="number" min={0} value={form.duration_minutes} onChange={(e) => setForm({ ...form, duration_minutes: parseInt(e.target.value) || 0 })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">公開日時</label>
                  <Input type="datetime-local" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">音声URL</label>
                  <Input value={form.audio_url} onChange={(e) => setForm({ ...form, audio_url: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">動画URL</label>
                  <Input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.push('/admin/podcasts')}>キャンセル</Button>
                <Button type="submit">作成</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


