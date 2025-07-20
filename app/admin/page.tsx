"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'
import { Loader2 } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const { user, loading } = useAdminAuthSimple()

  useEffect(() => {
    if (!loading) {
      if (user) {
        // ユーザーがログインしている場合はダッシュボードにリダイレクト
        router.push('/admin/dashboard')
      } else {
        // ユーザーがログインしていない場合はログインページにリダイレクト
        router.push('/admin/login')
      }
    }
  }, [user, loading, router])

  // ローディング中はスピナーを表示
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
