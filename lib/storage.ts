import { createClient } from './supabase/server'
import { put } from '@vercel/blob'
import { NextRequest } from 'next/server'

export type FileUploadResult = {
  url: string
  size: number
  type: string
  filename: string
}

// Supabase Storageを使用したファイルアップロード
export async function uploadToSupabaseStorage(
  file: File,
  bucket: string,
  path: string
): Promise<FileUploadResult> {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) {
    throw new Error(`Upload failed: ${error.message}`)
  }
  
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return {
    url: urlData.publicUrl,
    size: file.size,
    type: file.type,
    filename: file.name
  }
}

// Vercel Blobを使用したファイルアップロード（画像最適化用）
export async function uploadToVercelBlob(
  file: File,
  path: string
): Promise<FileUploadResult> {
  const blob = await put(path, file, {
    access: 'public',
    addRandomSuffix: false
  })
  
  return {
    url: blob.url,
    size: file.size,
    type: file.type,
    filename: file.name
  }
}

// ファイル削除（Supabase Storage）
export async function deleteFromSupabaseStorage(
  bucket: string,
  path: string
): Promise<void> {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])
  
  if (error) {
    throw new Error(`Delete failed: ${error.message}`)
  }
}

// ファイル削除（Vercel Blob）
export async function deleteFromVercelBlob(url: string): Promise<void> {
  // Vercel Blobの削除は現在のSDKでは直接サポートされていないため、
  // 管理画面から手動で削除する必要があります
  console.warn('Vercel Blob deletion requires manual intervention')
}

// 画像最適化用のアップロード（Vercel Blob推奨）
export async function uploadImage(
  file: File,
  category: 'avatars' | 'news' | 'events' | 'documents' | 'organizations'
): Promise<FileUploadResult> {
  const timestamp = Date.now()
  const extension = file.name.split('.').pop()
  const filename = `${category}/${timestamp}.${extension}`
  
  // 画像の場合はVercel Blobを使用（最適化機能あり）
  if (file.type.startsWith('image/')) {
    return uploadToVercelBlob(file, filename)
  }
  
  // その他のファイルはSupabase Storageを使用
  return uploadToSupabaseStorage(file, 'documents', filename)
}

// ファイルサイズ制限チェック
export function validateFileSize(file: File, maxSizeMB: number = 10): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

// ファイルタイプ制限チェック
export function validateFileType(
  file: File,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
): boolean {
  return allowedTypes.includes(file.type)
}

// セキュアなファイル名生成
export function generateSecureFilename(originalName: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  const extension = originalName.split('.').pop()
  return `${timestamp}-${randomString}.${extension}`
}

// バケット一覧
export const STORAGE_BUCKETS = {
  AVATARS: 'avatars',
  NEWS: 'news',
  EVENTS: 'events',
  DOCUMENTS: 'documents',
  ORGANIZATIONS: 'organizations'
} as const

// ファイルカテゴリ別の設定
export const FILE_CONFIGS = {
  avatars: {
    maxSize: 5, // MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    useVercelBlob: true
  },
  news: {
    maxSize: 10,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    useVercelBlob: true
  },
  events: {
    maxSize: 10,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    useVercelBlob: true
  },
  documents: {
    maxSize: 50,
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    useVercelBlob: false
  },
  organizations: {
    maxSize: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
    useVercelBlob: true
  }
} as const 