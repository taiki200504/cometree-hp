"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/ui/image-upload'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  ArrowLeft, 
  Save, 
  FileText, 
  Eye, 
  EyeOff,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Eye as EyeIcon
} from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useToast } from '@/components/ui/use-toast'
import { PreviewModal } from '@/components/ui/preview-modal'

export default function CreateNewsPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [headerImage, setHeaderImage] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const { requireAdmin, user, userRole, loading: authLoading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  // 認証チェック
  useEffect(() => {
    requireAdmin()
  }, [requireAdmin])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setError('タイトルとコンテンツは必須項目です。')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          is_published: isPublished,
          header_image_url: headerImage,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'ニュースの作成に失敗しました。')
      }

      toast({
        title: "作成完了",
        description: "ニュースが正常に作成されました。",
      })

      router.push('/admin/news')
    } catch (error) {
      console.error('Error creating news:', error)
      setError(error instanceof Error ? error.message : '不明なエラーが発生しました。')
      toast({
        title: "作成エラー",
        description: error instanceof Error ? error.message : 'ニュースの作成中に不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-700">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-3 text-gray-400" />
          <div className="text-sm">読み込み中...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" /> 戻る
          </Button>
          <h1 className="text-xl font-bold text-gray-900">ニュース作成</h1>
        </div>
        <Card className="bg-white border-0 shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <FileText className="h-5 w-5" /> 新規ニュース作成
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">タイトル *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ニュースのタイトルを入力してください"
                  required
                />
              </div>

              {/* Header Image */}
              <div className="space-y-2">
                <Label>ヘッダー画像</Label>
                <ImageUpload value={headerImage} onChange={setHeaderImage} />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">コンテンツ *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="ニュースの内容を入力してください"
                  rows={10}
                  required
                />
              </div>

              {/* Published Status */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
                <Label htmlFor="published">
                  {isPublished ? (
                    <span className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>公開</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1">
                      <EyeOff className="h-4 w-4" />
                      <span>下書き</span>
                    </span>
                  )}
                </Label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-red-600 text-sm">{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowPreview(true)} disabled={!title.trim() || !content.trim()}>
                  <EyeIcon className="mr-2 h-4 w-4" /> プレビュー
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  キャンセル
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      作成中...
                    </>
                  ) : (
                    <><Save className="mr-2 h-4 w-4" />作成</>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        data={{
          title,
          content,
          excerpt: content.substring(0, 100) + '...',
          category: 'お知らせ',
          tags: ['UNION'],
          author: 'UNION編集部',
          date: new Date().toISOString(),
          type: 'news'
        }}
        onPublish={async () => {
          // プレビューから直接公開する機能
          setIsPublished(true)
          setShowPreview(false)
          toast({
            title: "公開設定",
            description: "公開状態に設定されました。作成ボタンを押して保存してください。",
          })
        }}
      />
    </div>
  )
}
