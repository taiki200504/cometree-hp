"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
  CheckCircle
} from 'lucide-react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { useToast } from '@/components/ui/use-toast'

export default function CreateNewsPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isPublished, setIsPublished] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { requireAdmin, user, userRole, loading: authLoading } = useAdminAuthSimple()
  const router = useRouter()
  const { toast } = useToast()

  // 認証チェック
  if (!authLoading && !requireAdmin()) {
    return null
  }

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
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-green-400" />
            <div className="text-lg">LOADING...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm border-b border-green-400/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-green-400 hover:text-green-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                BACK
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center border border-green-400">
                  <FileText className="h-4 w-4 text-black" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    CREATE NEWS
                  </h1>
                  <div className="text-xs opacity-75">NEWS MANAGEMENT SYSTEM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-black/50 border-green-400/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>新規ニュース作成</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-green-400">
                  タイトル *
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ニュースのタイトルを入力してください"
                  className="bg-black/50 border-green-400/30 text-green-400 placeholder:text-green-400/50"
                  required
                />
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-green-400">
                  コンテンツ *
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="ニュースの内容を入力してください"
                  rows={10}
                  className="bg-black/50 border-green-400/30 text-green-400 placeholder:text-green-400/50"
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
                <Label htmlFor="published" className="text-green-400">
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
                <div className="flex items-center space-x-2 p-4 bg-red-400/10 border border-red-400/30 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="text-red-400">{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="border-green-400/30 text-green-400 hover:bg-green-400/10"
                >
                  キャンセル
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-400/20 text-green-400 border-green-400/30 hover:bg-green-400/30"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      作成中...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      作成
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
