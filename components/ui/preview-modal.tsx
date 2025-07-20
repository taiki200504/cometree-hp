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
  ExternalLink
} from 'lucide-react'

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
}

export function PreviewModal({ isOpen, onClose, data }: PreviewModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePublish = async () => {
    setIsLoading(true)
    try {
      // TODO: 実際の公開処理
      console.log('Publishing:', data)
      alert('公開処理は実装予定です')
    } catch (error) {
      console.error('Error publishing:', error)
      alert('公開中にエラーが発生しました')
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
        <div className="relative">
          <img
            src={data.featuredImage}
            alt={data.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </article>
  )

  const renderEventPreview = () => (
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
          {data.time && (
            <span>{data.time}</span>
          )}
          {data.endTime && (
            <span>〜 {data.endTime}</span>
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
        {data.location && (
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{data.location}</span>
          </div>
        )}

        {data.registrationRequired && (
          <div className="flex items-center justify-between">
            <span className="text-gray-700">参加者数</span>
            <span className="font-medium">
              {data.currentParticipants || 0}
              {data.maxParticipants && ` / ${data.maxParticipants}`}
            </span>
          </div>
        )}
      </div>

      {/* Featured Image */}
      {data.featuredImage && (
        <div className="relative">
          <img
            src={data.featuredImage}
            alt={data.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
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

        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {data.title}
        </h1>

        <div className="flex items-center space-x-4">
          {data.category && (
            <Badge variant="secondary" className="bg-pink-100 text-pink-800">
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
        <div className="relative">
          <img
            src={data.featuredImage}
            alt={data.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
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
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>プレビュー</span>
          </DialogTitle>
          <DialogDescription>
            公開時の表示を確認できます
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {renderPreview()}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              閉じる
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              新しいタブで開く
            </Button>
          </div>
          <Button onClick={handlePublish} disabled={isLoading}>
            {isLoading ? '公開中...' : '公開する'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 