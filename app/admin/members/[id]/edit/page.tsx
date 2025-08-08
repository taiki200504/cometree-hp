"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ImageUpload from '@/components/ui/image-upload'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import AdminHeading from '@/components/admin/AdminHeading'

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

export default function EditMemberPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const memberId = params.id as string

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

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/admin/members/${memberId}`)
        if (!response.ok) {
          throw new Error('メンバーの取得に失敗しました。')
        }
        const data = await response.json()
        form.reset({
          name: data.name || '',
          email: data.email || '',
          position: data.position || '',
          university: data.university || '',
          profile: data.profile || '',
          category: data.category || 'staff',
          is_representative: !!data.is_representative,
          representative_message: data.representative_message || '',
          image_url: data.image_url || data.avatar_url || '',
        })
      } catch (error) {
        toast({
          title: 'エラー',
          description: error instanceof Error ? error.message : '不明なエラーが発生しました。',
          variant: 'destructive',
        })
      } finally {
        setFetching(false)
      }
    }
    if (memberId) fetchMember()
  }, [memberId, form, toast])

  const onSubmit = async (data: MemberFormValues) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/members/${memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'メンバーの更新に失敗しました。')
      }
      toast({ title: '成功', description: '運営メンバーの情報が更新されました。' })
      router.push('/admin/members')
    } catch (error) {
      toast({
        title: 'エラー',
        description: error instanceof Error ? error.message : '不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="p-8 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <AdminHeading
        title="運営メンバーの編集"
        subtitle="メンバーの情報を更新してください。"
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/members">一覧へ</Link>
          </Button>
        }
      />
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>名前 *</FormLabel>
                      <FormControl>
                        <Input placeholder="山田 太郎" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>メールアドレス *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@university.ac.jp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>役職 *</FormLabel>
                      <FormControl>
                        <Input placeholder="代表、副代表、企画部長など" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>大学名 *</FormLabel>
                      <FormControl>
                        <Input placeholder="○○大学" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>カテゴリ *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="カテゴリを選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="core">コアメンバー</SelectItem>
                        <SelectItem value="advisor">顧問・アドバイザー</SelectItem>
                        <SelectItem value="staff">スタッフ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>プロフィール *</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="経歴・専門分野・活動内容など" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>プロフィール画像</FormLabel>
                    <FormControl>
                      <ImageUpload value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="representative_message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>代表メッセージ</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="代表としてのメッセージ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  更新する
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
