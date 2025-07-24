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
import RichTextEditor from '@/components/ui/rich-text-editor'
import ImageUpload from '@/components/ui/image-upload'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Loader2 } from 'lucide-react'

const newsFormSchema = z.object({
  title: z.string().min(3, { message: 'タイトルは3文字以上で入力してください。' }),
  content: z.string().min(10, { message: '本文は10文字以上で入力してください。' }),
  excerpt: z.string().optional(),
  image_url: z.string().url({ message: '有効なURLを入力してください。' }).optional().or(z.literal('')),
  slug: z.string().min(3, { message: 'スラッグは3文字以上で入力してください。' }).regex(/^[a-z0-9-]+$/, { message: 'スラッグは小文字の英数字とハイフンのみ使用できます。' }),
  is_published: z.boolean().default(false),
})

type NewsFormValues = z.infer<typeof newsFormSchema>

export default function CreateNewsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      image_url: '',
      slug: '',
      is_published: false,
    },
  })

  const onSubmit = async (data: NewsFormValues) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '記事の作成に失敗しました。')
      }

      toast({
        title: "成功",
        description: "新しいニュース記事が作成されました。",
      })
      router.push('/admin/news')
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
      <div className="mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/news">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ニュース一覧に戻る
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>ニュース記事の新規作成</CardTitle>
          <CardDescription>新しい記事の情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タイトル</FormLabel>
                    <FormControl>
                      <Input placeholder="記事のタイトル" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>本文</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="記事の本文"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>スラッグ</FormLabel>
                    <FormControl>
                      <Input placeholder="example-slug" {...field} />
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
                    <FormLabel>画像</FormLabel>
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
                name="is_published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>公開ステータス</FormLabel>
                      <CardDescription>
                        オンにすると、記事がウェブサイトに公開されます。
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
                  作成する
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
