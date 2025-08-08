"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import AdminHeading from '@/components/admin/AdminHeading'
import ImageUpload from '@/components/ui/image-upload' // Import ImageUpload

const orgFormSchema = z.object({
  name: z.string().min(2, { message: '団体名は2文字以上で入力してください。' }),
  description: z.string().optional(),
  logo_url: z.string().url({ message: '有効なURLを入力してください。' }).optional().or(z.literal('')),
  category: z.string().optional(),
  region: z.string().optional(),
  website_url: z.string().url({ message: '有効なURLを入力してください。' }).optional().or(z.literal('')),
  is_active: z.boolean().default(true),
})

type OrgFormValues = z.infer<typeof orgFormSchema>

export default function CreateOrganizationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<OrgFormValues>({
    resolver: zodResolver(orgFormSchema),
    defaultValues: {
      name: '',
      description: '',
      logo_url: '',
      category: '',
      region: '',
      website_url: '',
      is_active: true,
    },
  })

  const onSubmit = async (data: OrgFormValues) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '団体の作成に失敗しました。')
      }

      toast({
        title: "成功",
        description: "新しい加盟団体が追加されました。",
      })
      router.push('/admin/organizations')
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

  return (
    <div className="p-4 md:p-8">
      <AdminHeading
        title="加盟団体の新規追加"
        subtitle="新しい団体の情報を入力してください。"
        actions={
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/organizations">一覧へ</Link>
          </Button>
        }
      />
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>団体名</FormLabel>
                    <FormControl>
                      <Input placeholder="団体名" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>詳細</FormLabel>
                    <FormControl>
                      <Textarea placeholder="団体の詳細" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="logo_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ロゴ</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>カテゴリ</FormLabel>
                    <FormControl>
                      <Input placeholder="例: 学生団体" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>地域</FormLabel>
                    <FormControl>
                      <Input placeholder="例: 東京都" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ウェブサイト</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>ステータス</FormLabel>
                      <CardDescription>
                        団体の状態をアクティブにします。
                      </CardDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  追加する
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}