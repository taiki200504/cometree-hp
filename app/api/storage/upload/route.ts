import { NextRequest, NextResponse } from 'next/server'
import { uploadImage, validateFileSize, validateFileType, FILE_CONFIGS } from '@/lib/storage'
import { requireAuth, logAccess } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // 認証チェック
    const user = await requireAuth()
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as keyof typeof FILE_CONFIGS
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }
    
    if (!category || !FILE_CONFIGS[category]) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      )
    }
    
    const config = FILE_CONFIGS[category]
    
    // ファイルサイズチェック
    if (!validateFileSize(file, config.maxSize)) {
      return NextResponse.json(
        { error: `File size must be less than ${config.maxSize}MB` },
        { status: 400 }
      )
    }
    
    // ファイルタイプチェック
    if (!validateFileType(file, config.allowedTypes)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      )
    }
    
    // ファイルアップロード
    const result = await uploadImage(file, category)
    
    const responseTime = Date.now() - startTime
    
    // アクセスログを記録
    await logAccess(user.id, '/api/storage/upload', 'POST', 200, responseTime)
    
    return NextResponse.json(result)
    
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    // エラーログを記録
    await logAccess(null, '/api/storage/upload', 'POST', 500, responseTime)
    
    console.error('File upload error:', error)
    
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
} 