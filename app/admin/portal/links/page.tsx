"use client"

import { useEffect, useState } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'

type PortalLink = {
  id: string
  title: string
  url: string
  description?: string | null
  badge?: string | null
  color?: string | null
  category?: string | null
  visible: boolean
  sort_order: number
}

export default function AdminPortalLinksPage() {
  const { requireAuth } = useAdminAuthSimple()
  const [links, setLinks] = useState<PortalLink[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<PortalLink | null>(null)
  const [form, setForm] = useState<Omit<PortalLink, 'id'>>({
    title: '',
    url: '',
    description: '',
    badge: '',
    color: '',
    category: 'external',
    visible: true,
    sort_order: 0,
  })

  useEffect(() => {
    const ok = requireAuth()
    if (ok) load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function load() {
    setLoading(true)
    const res = await fetch('/api/admin/portal/links')
    const json = await res.json()
    setLinks(json)
    setLoading(false)
  }

  function openCreate() {
    setEditing(null)
    setForm({ title: '', url: '', description: '', badge: '', color: '', category: 'external', visible: true, sort_order: 0 })
    setIsOpen(true)
  }

  function openEdit(link: PortalLink) {
    setEditing(link)
    setForm({
      title: link.title,
      url: link.url,
      description: link.description ?? '',
      badge: link.badge ?? '',
      color: link.color ?? '',
      category: link.category ?? 'external',
      visible: link.visible,
      sort_order: link.sort_order,
    })
    setIsOpen(true)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? { id: editing.id, ...form } : form
    const res = await fetch('/api/admin/portal/links', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) {
      setIsOpen(false)
      await load()
    }
  }

  async function remove(id: string) {
    const res = await fetch(`/api/admin/portal/links?id=${id}`, { method: 'DELETE' })
    if (res.ok) await load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Portal Links</h1>
          <p className="text-muted-foreground">加盟団体ポータルに表示する限定リンクを管理します。</p>
        </div>
        <Button onClick={openCreate}>新規リンク</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>リンク一覧</CardTitle>
          <CardDescription>{links.length} 件</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>タイトル</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>表示</TableHead>
                <TableHead>順序</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6}>Loading...</TableCell></TableRow>
              ) : links.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium">{l.title}</TableCell>
                  <TableCell className="truncate max-w-[320px]">{l.url}</TableCell>
                  <TableCell>{l.category}</TableCell>
                  <TableCell>{l.visible ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{l.sort_order}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="secondary" size="sm" onClick={() => openEdit(l)}>編集</Button>
                    <Button variant="destructive" size="sm" onClick={() => remove(l.id)}>削除</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'リンクを編集' : 'リンクを作成'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">タイトル</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input id="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Input id="description" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="badge">バッジ</Label>
                <Input id="badge" value={form.badge ?? ''} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">カラー（クラス名）</Label>
                <Input id="color" value={form.color ?? ''} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="bg-blue-500 など" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリ</Label>
                <Input id="category" value={form.category ?? ''} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">表示順</Label>
                <Input id="sort_order" type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="visible" checked={form.visible} onCheckedChange={(v) => setForm({ ...form, visible: v })} />
              <Label htmlFor="visible">表示する</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit">{editing ? '更新' : '作成'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}


