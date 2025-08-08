"use client"

import { ReactNode } from 'react'
import { useAdminAuthSimple } from '@/hooks/use-admin-auth-simple'

export default function AdminGuard({ children }: { children: ReactNode }) {
  const { loading, requireAdmin } = useAdminAuthSimple()

  // 一度だけ認証チェック（未認証なら内部でリダイレクト）
  const ok = requireAdmin()

  if (loading || !ok) {
    return null
  }

  return <>{children}</>
}
