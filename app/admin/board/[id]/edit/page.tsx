"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import RichTextEditor from '@/components/ui/rich-text-editor' // Import RichTextEditor
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Loader2 } from 'lucide-react'

const boardFormSchema = z.object({
  title: z.string().min(3, { message: 'タイトルは3文字以上で入力してください。' }),
  content: z.string().min(10, { message: '本文は10文字以上で入力してください。' }),
})

type BoardFormValues = z.infer<typeof boardFormSchema>

export default function EditBoardPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const postId = params.id as string

  const form = useForm<BoardFormValues>({
    resolver: zodResolver(boardFormSchema),
  })

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/board/${postId}`)
        if (!response.ok) {
          throw new Error('投稿の取得に失敗しました。')
        }
        const data = await response.json()
        form.reset({
          title: data.title,
          content: data.content,
        })
      } catch (error) {
        toast({
          title: "エラー",
          description: error instanceof Error ? error.message : '不明なエラーが発生しました。',
          variant: 'destructive',
        })
      } finally {
        setFetching(false)
      }
    }
    if (postId) {
      fetchPost()
    }
  }, [postId, form, toast])

  const onSubmit = async (data: BoardFormValues) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/board/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '投稿の更新に失敗しました。')
      }

      toast({
        title: "成功",
        description: "掲示板投稿が更新されました。",
      })
      router.push('/admin/board')
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

  if (fetching) {
    return (
      <div className="p-8 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/board">
            <ArrowLeft className="mr-2 h-4 w-4" />
            掲示板一覧に戻る
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>掲示板投稿の編集</CardTitle>
          <CardDescription>投稿の情報を更新してください。</CardDescription>
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
                      <Input {...field} />
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
                        placeholder="投稿の本文"
                      />
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