"use client"

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar,
  MapPin,
  User,
  Eye,
  Tag,
  X,
  ExternalLink,
  Loader2,
  CheckCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface PreviewData {
  title: string
  content: string
  excerpt?: string
  category?: string
  tags?: string[]
  featuredImage?: string
  author?: string
  date?: string
  location?: string
  time?: string
  endTime?: string
  maxParticipants?: number
  currentParticipants?: number
  registrationRequired?: boolean
  type: 'news' | 'event' | 'board'
}

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  data: PreviewData
  onPublish?: () => Promise<void>
}

export function PreviewModal({ isOpen, onClose, data, onPublish }: PreviewModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const { toast } = useToast()

  const handlePublish = async () => {
    if (!onPublish) {
      toast({
        title: "情報",
        description: "公開機能は実装中です",
      })
      return
    }

    setIsLoading(true)
    try {
      await onPublish()
      setIsPublished(true)
      toast({
        title: "成功",
        description: "正常に公開されました",
      })
      
      // 少し遅延してからモーダルを閉じる
      setTimeout(() => {
        onClose()
        setIsPublished(false)
      }, 2000)
    } catch (error) {
      console.error('Error publishing:', error)
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : '公開中にエラーが発生しました',
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderNewsPreview = () => (
    <article className="space-y-6">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {data.date && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(data.date).toLocaleDateString('ja-JP')}</span>
            </div>
          )}
          {data.author && (
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{data.author}</span>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {data.title}
        </h1>

        {data.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {data.excerpt}
          </p>
        )}

        <div className="flex items-center space-x-4">
          {data.category && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {data.category}
            </Badge>
          )}
          {data.tags?.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Featured Image */}
      {data.featuredImage && (
        <div className="aspect-video overflow-hidden rounded-lg">
          <Image
            src={data.featuredImage}
            alt={data.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {data.content}
        </div>
      </div>
    </article>
  )

  const renderEventPreview = () => (
    <article className="space-y-6">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {data.title}
        </h1>

        {data.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed">
            {data.excerpt}
          </p>
        )}

        <div className="flex items-center space-x-4">
          {data.category && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {data.category}
            </Badge>
          )}
          {data.tags?.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Event Details */}
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.date && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">開催日</p>
                <p className="text-gray-600">{new Date(data.date).toLocaleDateString('ja-JP')}</p>
              </div>
            </div>
          )}
          
          {data.time && (
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">時間</p>
                <p className="text-gray-600">
                  {data.time}
                  {data.endTime && ` - ${data.endTime}`}
                </p>
              </div>
            </div>
          )}

          {data.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">場所</p>
                <p className="text-gray-600">{data.location}</p>
              </div>
            </div>
          )}

          {data.maxParticipants && (
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">定員</p>
                <p className="text-gray-600">
                  {data.currentParticipants || 0} / {data.maxParticipants}人
                </p>
              </div>
            </div>
          )}
        </div>

        {data.registrationRequired && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-blue-800 text-sm font-medium">
              ※ このイベントは事前申し込みが必要です
            </p>
          </div>
        )}
      </div>

      {/* Featured Image */}
      {data.featuredImage && (
        <div className="aspect-video overflow-hidden rounded-lg">
          <Image
            src={data.featuredImage}
            alt={data.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {data.content}
        </div>
      </div>
    </article>
  )

  const renderBoardPreview = () => (
    <article className="space-y-6">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {data.date && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(data.date).toLocaleDateString('ja-JP')}</span>
            </div>
          )}
          {data.author && (
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{data.author}</span>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          {data.title}
        </h1>

        <div className="flex items-center space-x-4">
          {data.category && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {data.category}
            </Badge>
          )}
          {data.tags?.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {data.content}
        </div>
      </div>
    </article>
  )

  const renderPreview = () => {
    switch (data.type) {
      case 'news':
        return renderNewsPreview()
      case 'event':
        return renderEventPreview()
      case 'board':
        return renderBoardPreview()
      default:
        return renderNewsPreview()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">プレビュー</DialogTitle>
              <DialogDescription>
                {data.type === 'news' && 'ニュース記事のプレビュー'}
                {data.type === 'event' && 'イベントのプレビュー'}
                {data.type === 'board' && '掲示板投稿のプレビュー'}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview Content */}
          <div className="border rounded-lg p-6 bg-white">
            {renderPreview()}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">プレビューモード</span>
            </div>
            
            <div className="flex items-center space-x-3">
              {isPublished && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">公開完了</span>
                </div>
              )}
              
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                キャンセル
              </Button>
              
              {onPublish && (
                <Button
                  onClick={handlePublish}
                  disabled={isLoading || isPublished}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      公開中...
                    </>
                  ) : isPublished ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      公開済み
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      公開する
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 