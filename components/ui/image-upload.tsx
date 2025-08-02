"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, UploadCloud, XCircle } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface ImageUploadProps {
  value?: string // Current image URL
  onChange: (url: string) => void
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "エラー",
        description: "ファイルを選択してください。",
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/storage/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '画像のアップロードに失敗しました。')
      }

      const data = await response.json()
      onChange(data.url) // Pass the public URL to the parent component
      toast({
        title: "成功",
        description: "画像をアップロードしました。",
      })
    } catch (error) {
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : '不明なエラーが発生しました。',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
      setFile(null) // Clear selected file after upload
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    onChange('') // Clear the URL in the parent component
    setFile(null)
  }

  return (
    <div className="space-y-4">
      {previewUrl && (
        <div className="relative w-48 h-48 rounded-md overflow-hidden">
          <Image src={previewUrl} alt="Preview" width={192} height={192} className="w-full h-full object-cover" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={handleRemove}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!previewUrl && (
        <div className="flex items-center justify-center w-full">
          <Label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">クリックしてアップロード</span> またはドラッグ＆ドロップ
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG, GIF (最大 800x400px)</p>
            </div>
            <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
          </Label>
        </div>
      )}
      {file && !loading && (
        <Button onClick={handleUpload} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          画像をアップロード
        </Button>
      )}
    </div>
  )
}