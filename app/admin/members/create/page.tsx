"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Loader2, User, Crown, Award, Users } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useToast } from '@/hooks/use-toast'

const memberFormSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  position: z.string().min(1, '役職は必須です'),
  university: z.string().min(1, '大学名は必須です'),
  profile: z.string().min(1, 'プロフィールは必須です'),
  category: z.enum(['core', 'advisor', 'staff'], {
    required_error: 'カテゴリを選択してください',
  }),
  is_representative: z.boolean().default(false),
  representative_message: z.string().optional(),
  image_url: z.string().optional(),
})

type MemberFormValues = z.infer<typeof memberFormSchema>

export default function CreateMemberPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: '',
      email: '',
      position: '',
      university: '',
      profile: '',
      category: 'staff',
      is_representative: false,
      representative_message: '',
      image_url: '',
    },
  })

  const onSubmit = async (data: MemberFormValues) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'メンバーの作成に失敗しました。')
      }

      toast({
        title: "成功",
        description: "新しいメンバーが追加されました。",
      })
      router.push('/admin/members')
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : '不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'core':
        return <Crown className="h-4 w-4" />
      case 'advisor':
        return <Award className="h-4 w-4" />
      case 'staff':
        return <Users className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'core':
        return 'コアメンバー'
      case 'advisor':
        return '顧問・アドバイザー'
      case 'staff':
        return 'スタッフ'
      default:
        return 'その他'
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/members">
            <ArrowLeft className="mr-2 h-4 w-4" />
            メンバー一覧に戻る
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            メンバーの新規追加
          </CardTitle>
          <CardDescription>
            新しいメンバーの情報を入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">名前 *</Label>
                <Input
                  id="name"
                  placeholder="山田 太郎"
                  {...form.register('name')}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@university.ac.jp"
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">役職 *</Label>
                <Input
                  id="position"
                  placeholder="代表、副代表、企画部長など"
                  {...form.register('position')}
                />
                {form.formState.errors.position && (
                  <p className="text-sm text-red-500">{form.formState.errors.position.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">大学名 *</Label>
                <Input
                  id="university"
                  placeholder="○○大学"
                  {...form.register('university')}
                />
                {form.formState.errors.university && (
                  <p className="text-sm text-red-500">{form.formState.errors.university.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">カテゴリ *</Label>
              <Select
                value={form.watch('category')}
                onValueChange={(value) => form.setValue('category', value as 'core' | 'advisor' | 'staff')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリを選択" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4" />
                      コアメンバー
                    </div>
                  </SelectItem>
                  <SelectItem value="advisor">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      顧問・アドバイザー
                    </div>
                  </SelectItem>
                  <SelectItem value="staff">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      スタッフ
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile">プロフィール *</Label>
              <Textarea
                id="profile"
                placeholder="メンバーの経歴、専門分野、UNIONでの活動内容などを記載してください"
                rows={4}
                {...form.register('profile')}
              />
              {form.formState.errors.profile && (
                <p className="text-sm text-red-500">{form.formState.errors.profile.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">プロフィール画像URL</Label>
              <Input
                id="image_url"
                type="url"
                placeholder="https://example.com/image.jpg"
                {...form.register('image_url')}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_representative"
                checked={form.watch('is_representative')}
                onCheckedChange={(checked) => form.setValue('is_representative', checked)}
              />
              <Label htmlFor="is_representative">代表者として設定</Label>
            </div>

            {form.watch('is_representative') && (
              <div className="space-y-2">
                <Label htmlFor="representative_message">代表メッセージ</Label>
                <Textarea
                  id="representative_message"
                  placeholder="代表としてのメッセージを記載してください"
                  rows={3}
                  {...form.register('representative_message')}
                />
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/members')}
              >
                キャンセル
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                メンバーを追加
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
