"use client"

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import AdminHeader from '@/components/admin/AdminHeader'

type PodcastShow = { id: string; name: string }

export default function ExternalLinkCreatePage() {
  const router = useRouter()
  const { user, loading, requireAuth } = useAdminAuthSimple()
  const { toast } = useToast()

  const [shows, setShows] = useState<PodcastShow[]>([])
  const [form, setForm] = useState({
    show_id: '',
    platform: 'youtube' as 'youtube' | 'spotify' | 'apple' | 'google' | 'amazon',
    url: '',
    is_active: true,
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
      const res = await fetch('/api/admin/podcasts/external-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      toast({ title: '追加しました' })
      router.push('/admin/podcasts')
    } catch {
      toast({ title: '追加に失敗しました', variant: 'destructive' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader title="外部リンク追加" trail={[{ label: '管理' }, { label: 'ポッドキャスト' }, { label: '外部リンク追加' }]} back={{ href: '/admin/podcasts' }} />
      <div className="p-4 md:p-8">
        <Card className="bg-white shadow border-0">
          <CardHeader>
            <CardTitle>新規リンク</CardTitle>
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
                  <label className="block text-sm font-medium mb-2">プラットフォーム</label>
                  <Select value={form.platform} onValueChange={(v) => setForm({ ...form, platform: v as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="spotify">Spotify</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                      <SelectItem value="amazon">Amazon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL</label>
                <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => router.push('/admin/podcasts')}>キャンセル</Button>
                <Button type="submit">追加</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


